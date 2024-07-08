/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/src/env/index.js":
/*!*******************************!*\
  !*** ./dist/src/env/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.env = void 0;\n__webpack_require__(/*! dotenv/config */ \"dotenv/config\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nconst envSchema = zod_1.z.object({\n    NODE_ENV: zod_1.z.enum(['dev', 'test', 'production']).default('production'),\n    DATABASE_URL: zod_1.z.string(),\n    HOST: zod_1.z.string().default('0.0.0.0'),\n    PORT: zod_1.z.coerce.number().default(3333)\n});\nconst _env = envSchema.safeParse(process.env);\nif (!_env.success)\n    throw new Error('Invalid environment variables', { cause: _env.error.issues });\nexports.env = _env.data;\n\n\n//# sourceURL=webpack://backend/./dist/src/env/index.js?");

/***/ }),

/***/ "./dist/src/http/app.js":
/*!******************************!*\
  !*** ./dist/src/http/app.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.load_routes = exports.app = void 0;\nconst errors_1 = __webpack_require__(/*! ./errors */ \"./dist/src/http/errors.js\");\nconst static_1 = __importDefault(__webpack_require__(/*! @fastify/static */ \"@fastify/static\"));\nconst cors_1 = __importDefault(__webpack_require__(/*! @fastify/cors */ \"@fastify/cors\"));\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nconst fastify_1 = __importDefault(__webpack_require__(/*! fastify */ \"fastify\"));\nconst env_1 = __webpack_require__(/*! ../env */ \"./dist/src/env/index.js\");\nconst glob_1 = __webpack_require__(/*! glob */ \"glob\");\nconst path_1 = __importDefault(__webpack_require__(/*! path */ \"path\"));\nexports.app = (0, fastify_1.default)();\nexports.app.register(cors_1.default, { origin: '*' });\nexports.app.register(static_1.default, { root: path_1.default.join(process.cwd(), '/web/public') });\nexports.app.get('/', (_, res) => res.sendFile('index.html'));\nasync function load_routes() {\n    try {\n        const context = __webpack_require__(\"./dist/src/http/routes sync recursive \\\\.js$\");\n        const routes = context.keys().map(context);\n        await Promise.all(routes.map(async (route) => { await exports.app.register(route.default || route); }));\n    }\n    catch {\n        const routes = glob_1.glob.sync(path_1.default.join(__dirname, './routes/*/*'));\n        await Promise.all(routes.map(async (path) => exports.app.register((await __webpack_require__(\"./dist/src/http lazy recursive ^.*$\")(`${path}`)).default)));\n    }\n}\nexports.load_routes = load_routes;\nexports.app.setErrorHandler((error, _, reply) => {\n    if (error instanceof zod_1.ZodError)\n        return reply.status(400).send({ message: 'Validation error.', issues: error.issues });\n    if (error instanceof errors_1.BadRequestError)\n        return reply.status(400).send({ message: error.message });\n    if (error instanceof errors_1.NotFoundError)\n        return reply.status(404).send({ message: error.message });\n    if (error instanceof errors_1.ForbiddenError)\n        return reply.status(403).send({ message: error.message });\n    if (env_1.env.NODE_ENV !== 'production')\n        console.log(error);\n    return reply.status(500).send({ message: 'Internal server error.' });\n});\n\n\n//# sourceURL=webpack://backend/./dist/src/http/app.js?");

/***/ }),

/***/ "./dist/src/http/errors.js":
/*!*********************************!*\
  !*** ./dist/src/http/errors.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ForbiddenError = exports.NotFoundError = exports.BadRequestError = void 0;\nclass BadRequestError extends Error {\n}\nexports.BadRequestError = BadRequestError;\nclass NotFoundError extends Error {\n}\nexports.NotFoundError = NotFoundError;\nclass ForbiddenError extends Error {\n}\nexports.ForbiddenError = ForbiddenError;\n\n\n//# sourceURL=webpack://backend/./dist/src/http/errors.js?");

/***/ }),

/***/ "./dist/src/http/routes/event-management/active-batch.js":
/*!***************************************************************!*\
  !*** ./dist/src/http/routes/event-management/active-batch.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.get('/active-batch/:id', async (req, res) => {\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const { id } = paramSchema.parse(req.params);\n        const ticket = await prisma_1.prisma.ticket.findUnique({ where: { id, active: true } });\n        if (!ticket)\n            throw new errors_1.NotFoundError('Ticket not found.');\n        const batch = await prisma_1.prisma.batch.findFirst({\n            where: { ticket_id: id, active: true, amount: { gt: 0 } }\n        });\n        return res.status(200).send({ batch });\n    });\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://backend/./dist/src/http/routes/event-management/active-batch.js?");

/***/ }),

/***/ "./dist/src/http/routes/event-management/create-batches.js":
/*!*****************************************************************!*\
  !*** ./dist/src/http/routes/event-management/create-batches.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst auth_1 = __webpack_require__(/*! ../../utils/auth */ \"./dist/src/http/utils/auth.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.post('/create-batches/:id', async (req, res) => {\n        if (await (0, auth_1.get_auth)(req) != 'admin')\n            throw new errors_1.ForbiddenError('No privileges.');\n        const bodySchema = zod_1.z.object({\n            batches: zod_1.z.object({\n                amount: zod_1.z.coerce.number().int().min(0),\n                price_in_cents: zod_1.z.coerce.number().int().min(1),\n                half_price_in_cents: zod_1.z.optional(zod_1.z.number().int().min(1))\n            }).array()\n        });\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const { batches } = bodySchema.parse(req.body);\n        const { id } = paramSchema.parse(req.params);\n        const ticket = await prisma_1.prisma.ticket.findUnique({ where: { id, active: true } });\n        if (!ticket)\n            throw new errors_1.NotFoundError('Ticket not found.');\n        for (let batch of batches) {\n            if (ticket.allow_half && !batch.half_price_in_cents)\n                throw new errors_1.BadRequestError('No price set to half.');\n            if (!batch.half_price_in_cents)\n                batch.half_price_in_cents = batch.price_in_cents * 0.5;\n        }\n        const query = batches.map(b => ({ ...b, ticket_id: id }));\n        const batch_ids = (await prisma_1.prisma.batch.createManyAndReturn({ data: query })).map(b => b.id);\n        return res.status(201).send({ ids: batch_ids });\n    });\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://backend/./dist/src/http/routes/event-management/create-batches.js?");

/***/ }),

/***/ "./dist/src/http/routes/event-management/create-event.js":
/*!***************************************************************!*\
  !*** ./dist/src/http/routes/event-management/create-event.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst auth_1 = __webpack_require__(/*! ../../utils/auth */ \"./dist/src/http/utils/auth.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.post('/events', async (req, res) => {\n        if (await (0, auth_1.get_auth)(req) != 'admin')\n            throw new errors_1.ForbiddenError('No privileges.');\n        const bodySchema = zod_1.z.object({\n            name: zod_1.z.string(),\n            description: zod_1.z.optional(zod_1.z.string()),\n            local: zod_1.z.string(),\n            address: zod_1.z.string(),\n            image: zod_1.z.optional(zod_1.z.string().url()),\n            latitude: zod_1.z.coerce.number().refine(v => Math.abs(v) <= 90),\n            longitude: zod_1.z.coerce.number().refine(v => Math.abs(v) <= 180),\n            date: zod_1.z.coerce.date().min(new Date(new Date().getTime() - (24 * 60 * 60 * 1e3)))\n        });\n        const data = bodySchema.parse(req.body);\n        const event = await prisma_1.prisma.event.create({ data });\n        return res.status(201).send({ id: event.id });\n    });\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://backend/./dist/src/http/routes/event-management/create-event.js?");

/***/ }),

/***/ "./dist/src/http/routes/event-management/create-ticket.js":
/*!****************************************************************!*\
  !*** ./dist/src/http/routes/event-management/create-ticket.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst auth_1 = __webpack_require__(/*! ../../utils/auth */ \"./dist/src/http/utils/auth.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.post('/ticket/:id', async (req, res) => {\n        if (await (0, auth_1.get_auth)(req) != 'admin')\n            throw new errors_1.ForbiddenError('No privileges.');\n        const bodySchema = zod_1.z.object({\n            name: zod_1.z.string(),\n            allow_half: zod_1.z.coerce.boolean(),\n            batches: zod_1.z.optional(zod_1.z.object({\n                amount: zod_1.z.coerce.number().int().min(0),\n                price_in_cents: zod_1.z.coerce.number().int().min(1),\n                half_price_in_cents: zod_1.z.optional(zod_1.z.coerce.number().int().min(1))\n            }).array())\n        });\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const { name, allow_half, batches } = bodySchema.parse(req.body);\n        const { id } = paramSchema.parse(req.params);\n        if (!await prisma_1.prisma.event.findUnique({ where: { id, active: true } }))\n            throw new errors_1.NotFoundError('Event not found.');\n        if (batches)\n            for (let batch of batches)\n                if (allow_half && !batch.half_price_in_cents)\n                    throw new errors_1.BadRequestError('No price set to half.');\n        const ticket = await prisma_1.prisma.ticket.create({\n            data: { event_id: id, name, allow_half, batches: { create: batches } }\n        });\n        return res.status(201).send({ id: ticket.id });\n    });\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://backend/./dist/src/http/routes/event-management/create-ticket.js?");

/***/ }),

/***/ "./dist/src/http/routes/event-management/edit-batch.js":
/*!*************************************************************!*\
  !*** ./dist/src/http/routes/event-management/edit-batch.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst auth_1 = __webpack_require__(/*! ../../utils/auth */ \"./dist/src/http/utils/auth.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.put('/edit-batch/:id', async (req, res) => {\n        if (await (0, auth_1.get_auth)(req) != 'admin')\n            throw new errors_1.ForbiddenError('No privileges.');\n        const bodySchema = zod_1.z.object({\n            amount: zod_1.z.optional(zod_1.z.number().min(0)),\n            price_in_cents: zod_1.z.optional(zod_1.z.number().min(1)),\n            half_price_in_cents: zod_1.z.optional(zod_1.z.number().min(1))\n        });\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const data = bodySchema.parse(req.body);\n        const { id } = paramSchema.parse(req.params);\n        for (let entry of Object.entries(data))\n            if (entry[1] === null)\n                delete data[entry[0]];\n        if (!Object.entries(data).length)\n            throw new errors_1.BadRequestError('Sent no data.');\n        const batch = await prisma_1.prisma.batch.findUnique({ where: { id, active: true } });\n        if (!batch)\n            throw new errors_1.NotFoundError('Batch not found.');\n        if (!batch.half_price_in_cents && !data.half_price_in_cents)\n            data.half_price_in_cents = data.price_in_cents * 0.5;\n        await prisma_1.prisma.batch.update({ where: { id }, data });\n        return res.status(204).send();\n    });\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://backend/./dist/src/http/routes/event-management/edit-batch.js?");

/***/ }),

/***/ "./dist/src/http/routes/event-management/edit-event.js":
/*!*************************************************************!*\
  !*** ./dist/src/http/routes/event-management/edit-event.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst auth_1 = __webpack_require__(/*! ../../utils/auth */ \"./dist/src/http/utils/auth.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.put('/edit-event/:id', async (req, res) => {\n        if (await (0, auth_1.get_auth)(req) != 'admin')\n            throw new errors_1.ForbiddenError('No privileges.');\n        const bodySchema = zod_1.z.object({\n            name: zod_1.z.optional(zod_1.z.string()),\n            description: zod_1.z.optional(zod_1.z.optional(zod_1.z.string())),\n            local: zod_1.z.optional(zod_1.z.string()),\n            address: zod_1.z.optional(zod_1.z.string()),\n            image: zod_1.z.optional(zod_1.z.string().url()),\n            latitude: zod_1.z.optional(zod_1.z.coerce.number().refine(v => Math.abs(v) <= 90)),\n            longitude: zod_1.z.optional(zod_1.z.coerce.number().refine(v => Math.abs(v) <= 180)),\n            date: zod_1.z.optional(zod_1.z.coerce.date().min(new Date(new Date().getTime() - (24 * 60 * 60 * 1e3))))\n        });\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const data = bodySchema.parse(req.body);\n        const { id } = paramSchema.parse(req.params);\n        for (let entry of Object.entries(data))\n            if (entry[1] === null)\n                delete data[entry[0]];\n        if (!Object.entries(data).length)\n            throw new errors_1.BadRequestError('Sent no data.');\n        const event = await prisma_1.prisma.event.findUnique({ where: { id, active: true } });\n        if (!event)\n            throw new errors_1.NotFoundError('Event not found.');\n        await prisma_1.prisma.event.update({ where: { id }, data });\n        return res.status(204).send();\n    });\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://backend/./dist/src/http/routes/event-management/edit-event.js?");

/***/ }),

/***/ "./dist/src/http/routes/event-management/edit-ticket.js":
/*!**************************************************************!*\
  !*** ./dist/src/http/routes/event-management/edit-ticket.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst auth_1 = __webpack_require__(/*! ../../utils/auth */ \"./dist/src/http/utils/auth.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.put('/edit-ticket/:id', async (req, res) => {\n        if (await (0, auth_1.get_auth)(req) != 'admin')\n            throw new errors_1.ForbiddenError('No privileges.');\n        const bodySchema = zod_1.z.object({\n            name: zod_1.z.optional(zod_1.z.string()),\n            allow_half: zod_1.z.optional(zod_1.z.coerce.boolean())\n        });\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const data = bodySchema.parse(req.body);\n        const { id } = paramSchema.parse(req.params);\n        for (let entry of Object.entries(data))\n            if (entry[1] === null)\n                delete data[entry[0]];\n        if (!Object.entries(data).length)\n            throw new errors_1.BadRequestError('Sent no data.');\n        const ticket = await prisma_1.prisma.ticket.findUnique({ where: { id, active: true } });\n        if (!ticket)\n            throw new errors_1.NotFoundError('Ticket not found.');\n        await prisma_1.prisma.ticket.update({ where: { id }, data });\n        return res.status(204).send();\n    });\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://backend/./dist/src/http/routes/event-management/edit-ticket.js?");

/***/ }),

/***/ "./dist/src/http/routes/event-management/get-all-events.js":
/*!*****************************************************************!*\
  !*** ./dist/src/http/routes/event-management/get-all-events.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nasync function default_1(app) {\n    app.get('/all-events', async (_, res) => {\n        const events = await prisma_1.prisma.event.findMany({ where: { active: true } });\n        return res.status(200).send({ events });\n    });\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://backend/./dist/src/http/routes/event-management/get-all-events.js?");

/***/ }),

/***/ "./dist/src/http/routes/event-management/get-batch.js":
/*!************************************************************!*\
  !*** ./dist/src/http/routes/event-management/get-batch.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.get('/batch/:id', async (req, res) => {\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const { id } = paramSchema.parse(req.params);\n        const batch = await prisma_1.prisma.batch.findUnique({ where: { id, active: true } });\n        if (!batch)\n            throw new errors_1.NotFoundError('Batch not found.');\n        return res.status(200).send({ batch });\n    });\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://backend/./dist/src/http/routes/event-management/get-batch.js?");

/***/ }),

/***/ "./dist/src/http/routes/event-management/get-event-tickets.js":
/*!********************************************************************!*\
  !*** ./dist/src/http/routes/event-management/get-event-tickets.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.get('/event-tickets/:id', async (req, res) => {\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const { id } = paramSchema.parse(req.params);\n        const event = await prisma_1.prisma.event.findUnique({ where: { id, active: true } });\n        if (!event)\n            throw new errors_1.NotFoundError('Event not found.');\n        const tickets = await prisma_1.prisma.ticket.findMany({\n            where: { event_id: id, active: true }\n        });\n        return res.status(200).send({ tickets });\n    });\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://backend/./dist/src/http/routes/event-management/get-event-tickets.js?");

/***/ }),

/***/ "./dist/src/http/routes/event-management/get-event.js":
/*!************************************************************!*\
  !*** ./dist/src/http/routes/event-management/get-event.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.get('/events/:id', async (req, res) => {\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const { id } = paramSchema.parse(req.params);\n        const event = await prisma_1.prisma.event.findUnique({ where: { id, active: true } });\n        if (!event)\n            throw new errors_1.NotFoundError('Event not found.');\n        const tickets = await prisma_1.prisma.ticket.findMany({ where: { event_id: id, active: true } });\n        for (let i in tickets) {\n            const batches = await prisma_1.prisma.batch.findMany({ where: { ticket_id: tickets[i].id, active: true } });\n            tickets[i].batches = batches;\n        }\n        return res.status(200).send({ event, tickets });\n    });\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://backend/./dist/src/http/routes/event-management/get-event.js?");

/***/ }),

/***/ "./dist/src/http/routes/event-management/get-ticket-batches.js":
/*!*********************************************************************!*\
  !*** ./dist/src/http/routes/event-management/get-ticket-batches.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.get('/ticket-batches/:id', async (req, res) => {\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const { id } = paramSchema.parse(req.params);\n        const ticket = await prisma_1.prisma.ticket.findUnique({ where: { id, active: true } });\n        if (!ticket)\n            throw new errors_1.NotFoundError('Ticket not found.');\n        const batches = await prisma_1.prisma.batch.findMany({\n            where: { ticket_id: id, active: true },\n            orderBy: { created_at: 'asc' }\n        });\n        return res.status(200).send({ batches });\n    });\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://backend/./dist/src/http/routes/event-management/get-ticket-batches.js?");

/***/ }),

/***/ "./dist/src/http/routes/event-management/get-ticket.js":
/*!*************************************************************!*\
  !*** ./dist/src/http/routes/event-management/get-ticket.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.get('/ticket/:id', async (req, res) => {\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const { id } = paramSchema.parse(req.params);\n        const ticket = await prisma_1.prisma.ticket.findUnique({ where: { id, active: true } });\n        if (!ticket)\n            throw new errors_1.NotFoundError('Ticket not found.');\n        return res.status(200).send({ ticket });\n    });\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://backend/./dist/src/http/routes/event-management/get-ticket.js?");

/***/ }),

/***/ "./dist/src/http/routes/event-management/remove-batch.js":
/*!***************************************************************!*\
  !*** ./dist/src/http/routes/event-management/remove-batch.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst recursive_deletion_1 = __webpack_require__(/*! ../../utils/recursive-deletion */ \"./dist/src/http/utils/recursive-deletion.js\");\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst auth_1 = __webpack_require__(/*! ../../utils/auth */ \"./dist/src/http/utils/auth.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.delete('/batch/:id', async (req, res) => {\n        if (await (0, auth_1.get_auth)(req) != 'admin')\n            throw new errors_1.ForbiddenError('No privileges.');\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const { id } = paramSchema.parse(req.params);\n        try {\n            await (0, recursive_deletion_1.deleteBatch)(id);\n        }\n        catch {\n            throw new errors_1.BadRequestError('Batch not found.');\n        }\n        return res.status(204).send();\n    });\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://backend/./dist/src/http/routes/event-management/remove-batch.js?");

/***/ }),

/***/ "./dist/src/http/routes/event-management/remove-event.js":
/*!***************************************************************!*\
  !*** ./dist/src/http/routes/event-management/remove-event.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst recursive_deletion_1 = __webpack_require__(/*! ../../utils/recursive-deletion */ \"./dist/src/http/utils/recursive-deletion.js\");\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst auth_1 = __webpack_require__(/*! ../../utils/auth */ \"./dist/src/http/utils/auth.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.delete('/event/:id', async (req, res) => {\n        if (await (0, auth_1.get_auth)(req) != 'admin')\n            throw new errors_1.ForbiddenError('No privileges.');\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const { id } = paramSchema.parse(req.params);\n        try {\n            await (0, recursive_deletion_1.deleteEvent)(id);\n        }\n        catch {\n            throw new errors_1.BadRequestError('Event not found.');\n        }\n        return res.status(204).send({ id });\n    });\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://backend/./dist/src/http/routes/event-management/remove-event.js?");

/***/ }),

/***/ "./dist/src/http/routes/event-management/remove-ticket.js":
/*!****************************************************************!*\
  !*** ./dist/src/http/routes/event-management/remove-ticket.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst recursive_deletion_1 = __webpack_require__(/*! ../../utils/recursive-deletion */ \"./dist/src/http/utils/recursive-deletion.js\");\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst auth_1 = __webpack_require__(/*! ../../utils/auth */ \"./dist/src/http/utils/auth.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.delete('/ticket/:id', async (req, res) => {\n        if (await (0, auth_1.get_auth)(req) != 'admin')\n            throw new errors_1.ForbiddenError('No privileges.');\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const { id } = paramSchema.parse(req.params);\n        try {\n            await (0, recursive_deletion_1.deleteTicket)(id);\n        }\n        catch {\n            throw new errors_1.BadRequestError('Ticket not found.');\n        }\n        return res.status(204).send();\n    });\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://backend/./dist/src/http/routes/event-management/remove-ticket.js?");

/***/ }),

/***/ "./dist/src/http/routes/ticket-instance/create-ticket-instance.js":
/*!************************************************************************!*\
  !*** ./dist/src/http/routes/ticket-instance/create-ticket-instance.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.post('/ticket-instance/:id', async (req, res) => {\n        const bodySchema = zod_1.z.object({\n            price_in_cents: zod_1.z.number(),\n            is_half: zod_1.z.coerce.boolean(),\n            is_test: zod_1.z.optional(zod_1.z.coerce.boolean())\n        });\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const data = bodySchema.parse(req.body);\n        const { id } = paramSchema.parse(req.params);\n        const batch = await prisma_1.prisma.batch.findUnique({ where: { id, active: true } });\n        if (!batch)\n            throw new errors_1.NotFoundError('Batch not found.');\n        if (!data.is_test) {\n            try {\n                await prisma_1.prisma.batch.update({ where: { id, amount: { gt: 0 } }, data: { amount: { decrement: 1 } } });\n            }\n            catch (_) {\n                throw new errors_1.BadRequestError('No more tickets on stock.');\n            }\n        }\n        const ticket_instance = await prisma_1.prisma.ticketInstance.create({ data: { ...data, batch_id: id } });\n        return res.status(201).send({ id: ticket_instance.id });\n    });\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://backend/./dist/src/http/routes/ticket-instance/create-ticket-instance.js?");

/***/ }),

/***/ "./dist/src/http/routes/ticket-instance/get-ticket-instance.js":
/*!*********************************************************************!*\
  !*** ./dist/src/http/routes/ticket-instance/get-ticket-instance.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.get('/ticket-instance/:id', async (req, res) => {\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const { id } = paramSchema.parse(req.params);\n        const ticket_instance = await prisma_1.prisma.ticketInstance.findUnique({ where: { id } });\n        if (!ticket_instance)\n            throw new errors_1.NotFoundError('Ticket instance not found.');\n        const batch = await prisma_1.prisma.batch.findUnique({ where: { id: ticket_instance.batch_id } });\n        const ticket = await prisma_1.prisma.ticket.findUnique({ where: { id: batch?.ticket_id } });\n        const event = await prisma_1.prisma.event.findUnique({ where: { id: ticket?.event_id } });\n        return res.status(200).send({ ticket_instance, ticket, event });\n    });\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://backend/./dist/src/http/routes/ticket-instance/get-ticket-instance.js?");

/***/ }),

/***/ "./dist/src/http/routes/ticket-instance/undo-ticket-instance-validation.js":
/*!*********************************************************************************!*\
  !*** ./dist/src/http/routes/ticket-instance/undo-ticket-instance-validation.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst auth_1 = __webpack_require__(/*! ../../utils/auth */ \"./dist/src/http/utils/auth.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.put('/undo-validation/:id', async (req, res) => {\n        if (!['admin', 'portaria'].includes(await (0, auth_1.get_auth)(req) || ''))\n            throw new errors_1.ForbiddenError('No privileges.');\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const { id } = paramSchema.parse(req.params);\n        const ticket_instance = await prisma_1.prisma.ticketInstance.findUnique({ where: { id } });\n        if (!ticket_instance)\n            throw new errors_1.NotFoundError('Ticket instance not found.');\n        if (!ticket_instance.validated_at)\n            throw new errors_1.BadRequestError('Ticket is already valid.');\n        await prisma_1.prisma.ticketInstance.update({ where: { id }, data: { validated_at: null } });\n        return res.status(204).send();\n    });\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://backend/./dist/src/http/routes/ticket-instance/undo-ticket-instance-validation.js?");

/***/ }),

/***/ "./dist/src/http/routes/ticket-instance/validate-ticket-instance.js":
/*!**************************************************************************!*\
  !*** ./dist/src/http/routes/ticket-instance/validate-ticket-instance.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst auth_1 = __webpack_require__(/*! ../../utils/auth */ \"./dist/src/http/utils/auth.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.put('/validate-ticket-instance/:id', async (req, res) => {\n        if (!['admin', 'portaria'].includes(await (0, auth_1.get_auth)(req) || ''))\n            throw new errors_1.ForbiddenError('No privileges.');\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const { id } = paramSchema.parse(req.params);\n        const ticket_instance = await prisma_1.prisma.ticketInstance.findUnique({ where: { id } });\n        if (!ticket_instance)\n            throw new errors_1.NotFoundError('Ticket instance not found.');\n        if (ticket_instance.validated_at)\n            throw new errors_1.BadRequestError('Ticket already validated.');\n        if (!ticket_instance.validated_at)\n            await prisma_1.prisma.ticketInstance.update({ where: { id }, data: { validated_at: new Date() } });\n        return res.status(204).send();\n    });\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://backend/./dist/src/http/routes/ticket-instance/validate-ticket-instance.js?");

/***/ }),

/***/ "./dist/src/http/routes/user-management/create-user.js":
/*!*************************************************************!*\
  !*** ./dist/src/http/routes/user-management/create-user.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst auth_1 = __webpack_require__(/*! ../../utils/auth */ \"./dist/src/http/utils/auth.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.post('/user', async (req, res) => {\n        if (await (0, auth_1.get_auth)(req) != 'admin')\n            throw new errors_1.ForbiddenError('No privileges.');\n        const bodySchema = zod_1.z.object({\n            name: zod_1.z.string(),\n            password: zod_1.z.string(),\n            role: zod_1.z.enum(['admin', 'portaria'])\n        });\n        const data = bodySchema.parse(req.body);\n        const user = await prisma_1.prisma.user.create({ data });\n        return res.status(201).send({ id: user.id });\n    });\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://backend/./dist/src/http/routes/user-management/create-user.js?");

/***/ }),

/***/ "./dist/src/http/routes/user-management/edit-user.js":
/*!***********************************************************!*\
  !*** ./dist/src/http/routes/user-management/edit-user.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst auth_1 = __webpack_require__(/*! ../../utils/auth */ \"./dist/src/http/utils/auth.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.put('/edit-user/:id', async (req, res) => {\n        if (await (0, auth_1.get_auth)(req) != 'admin')\n            throw new errors_1.ForbiddenError('No privileges.');\n        const bodySchema = zod_1.z.object({\n            name: zod_1.z.optional(zod_1.z.string()),\n            password: zod_1.z.optional(zod_1.z.string()),\n            role: zod_1.z.optional(zod_1.z.enum(['admin', 'portaria']))\n        });\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const data = bodySchema.parse(req.body);\n        const { id } = paramSchema.parse(req.params);\n        for (let entry of Object.entries(data))\n            if (entry[1] === null)\n                delete data[entry[0]];\n        if (!Object.entries(data).length)\n            throw new errors_1.BadRequestError('Sent no data.');\n        const user = await prisma_1.prisma.user.findUnique({ where: { id } });\n        if (!user)\n            throw new errors_1.NotFoundError('User not found.');\n        if (!user.editable)\n            throw new errors_1.BadRequestError('No privileges.');\n        await prisma_1.prisma.user.update({ where: { id }, data });\n        return res.status(204).send();\n    });\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://backend/./dist/src/http/routes/user-management/edit-user.js?");

/***/ }),

/***/ "./dist/src/http/routes/user-management/get-all-users.js":
/*!***************************************************************!*\
  !*** ./dist/src/http/routes/user-management/get-all-users.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nasync function default_1(app) {\n    app.get('/all-users', async (_, res) => {\n        const users = await prisma_1.prisma.user.findMany({ orderBy: { created_at: 'asc' } });\n        return res.status(200).send({ users });\n    });\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://backend/./dist/src/http/routes/user-management/get-all-users.js?");

/***/ }),

/***/ "./dist/src/http/routes/user-management/login.js":
/*!*******************************************************!*\
  !*** ./dist/src/http/routes/user-management/login.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.post('/login', async (req, res) => {\n        const bodySchema = zod_1.z.object({\n            name: zod_1.z.string(),\n            password: zod_1.z.string()\n        });\n        const data = bodySchema.parse(req.body);\n        const user = await prisma_1.prisma.user.findFirst({ where: { name: data.name, password: data.password } });\n        if (!user)\n            throw new errors_1.BadRequestError('Invalid credentials.');\n        const session = await prisma_1.prisma.session.create({ data: { user_id: user.id } });\n        return res.status(200).send({ session_id: session.id, name: user.name, role: user.role });\n    });\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://backend/./dist/src/http/routes/user-management/login.js?");

/***/ }),

/***/ "./dist/src/http/routes/user-management/remove-session.js":
/*!****************************************************************!*\
  !*** ./dist/src/http/routes/user-management/remove-session.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst auth_1 = __webpack_require__(/*! ../../utils/auth */ \"./dist/src/http/utils/auth.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.delete('/session/:id', async (req, res) => {\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const { id } = paramSchema.parse(req.params);\n        if (await (0, auth_1.get_auth)(req) != 'admin' && id != req.headers['authorization']?.split(' ')[1])\n            throw new errors_1.ForbiddenError('No privileges.');\n        const session = await prisma_1.prisma.session.findUnique({ where: { id } });\n        if (!session)\n            throw new errors_1.NotFoundError('Session not found.');\n        await prisma_1.prisma.session.delete({ where: { id } });\n        return res.status(204).send({ id });\n    });\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://backend/./dist/src/http/routes/user-management/remove-session.js?");

/***/ }),

/***/ "./dist/src/http/routes/user-management/remove-user.js":
/*!*************************************************************!*\
  !*** ./dist/src/http/routes/user-management/remove-user.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst auth_1 = __webpack_require__(/*! ../../utils/auth */ \"./dist/src/http/utils/auth.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.delete('/user/:id', async (req, res) => {\n        if (await (0, auth_1.get_auth)(req) != 'admin')\n            throw new errors_1.ForbiddenError('No privileges.');\n        const paramSchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const { id } = paramSchema.parse(req.params);\n        const user = await prisma_1.prisma.user.findUnique({ where: { id } });\n        if (!user)\n            throw new errors_1.NotFoundError('User not found.');\n        if (!user.editable)\n            throw new errors_1.BadRequestError('No privileges.');\n        await prisma_1.prisma.user.delete({ where: { id } });\n        return res.status(204).send({ id });\n    });\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://backend/./dist/src/http/routes/user-management/remove-user.js?");

/***/ }),

/***/ "./dist/src/http/routes/user-management/session-login.js":
/*!***************************************************************!*\
  !*** ./dist/src/http/routes/user-management/session-login.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst errors_1 = __webpack_require__(/*! ../../errors */ \"./dist/src/http/errors.js\");\nconst prisma_1 = __webpack_require__(/*! ../../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nconst auth_1 = __webpack_require__(/*! ../../utils/auth */ \"./dist/src/http/utils/auth.js\");\nconst zod_1 = __webpack_require__(/*! zod */ \"zod\");\nasync function default_1(app) {\n    app.post('/session-login', async (req, res) => {\n        if (await (0, auth_1.get_auth)(req) != 'admin')\n            throw new errors_1.ForbiddenError('No privileges.');\n        const bodySchema = zod_1.z.object({ id: zod_1.z.string().cuid() });\n        const { id } = bodySchema.parse(req.body);\n        const session = await prisma_1.prisma.session.findUnique({ where: { id } });\n        if (!session)\n            throw new errors_1.NotFoundError('Session not found.');\n        const user = await prisma_1.prisma.user.findFirst({ where: { id: session.user_id } });\n        if (!user)\n            throw new errors_1.BadRequestError('Invalid credentials.');\n        return res.status(200).send({ name: user.name, role: user.role });\n    });\n}\nexports[\"default\"] = default_1;\n\n\n//# sourceURL=webpack://backend/./dist/src/http/routes/user-management/session-login.js?");

/***/ }),

/***/ "./dist/src/http/routes sync recursive \\.js$":
/*!******************************************!*\
  !*** ./dist/src/http/routes/ sync \.js$ ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./event-management/active-batch.js\": \"./dist/src/http/routes/event-management/active-batch.js\",\n\t\"./event-management/create-batches.js\": \"./dist/src/http/routes/event-management/create-batches.js\",\n\t\"./event-management/create-event.js\": \"./dist/src/http/routes/event-management/create-event.js\",\n\t\"./event-management/create-ticket.js\": \"./dist/src/http/routes/event-management/create-ticket.js\",\n\t\"./event-management/edit-batch.js\": \"./dist/src/http/routes/event-management/edit-batch.js\",\n\t\"./event-management/edit-event.js\": \"./dist/src/http/routes/event-management/edit-event.js\",\n\t\"./event-management/edit-ticket.js\": \"./dist/src/http/routes/event-management/edit-ticket.js\",\n\t\"./event-management/get-all-events.js\": \"./dist/src/http/routes/event-management/get-all-events.js\",\n\t\"./event-management/get-batch.js\": \"./dist/src/http/routes/event-management/get-batch.js\",\n\t\"./event-management/get-event-tickets.js\": \"./dist/src/http/routes/event-management/get-event-tickets.js\",\n\t\"./event-management/get-event.js\": \"./dist/src/http/routes/event-management/get-event.js\",\n\t\"./event-management/get-ticket-batches.js\": \"./dist/src/http/routes/event-management/get-ticket-batches.js\",\n\t\"./event-management/get-ticket.js\": \"./dist/src/http/routes/event-management/get-ticket.js\",\n\t\"./event-management/remove-batch.js\": \"./dist/src/http/routes/event-management/remove-batch.js\",\n\t\"./event-management/remove-event.js\": \"./dist/src/http/routes/event-management/remove-event.js\",\n\t\"./event-management/remove-ticket.js\": \"./dist/src/http/routes/event-management/remove-ticket.js\",\n\t\"./ticket-instance/create-ticket-instance.js\": \"./dist/src/http/routes/ticket-instance/create-ticket-instance.js\",\n\t\"./ticket-instance/get-ticket-instance.js\": \"./dist/src/http/routes/ticket-instance/get-ticket-instance.js\",\n\t\"./ticket-instance/undo-ticket-instance-validation.js\": \"./dist/src/http/routes/ticket-instance/undo-ticket-instance-validation.js\",\n\t\"./ticket-instance/validate-ticket-instance.js\": \"./dist/src/http/routes/ticket-instance/validate-ticket-instance.js\",\n\t\"./user-management/create-user.js\": \"./dist/src/http/routes/user-management/create-user.js\",\n\t\"./user-management/edit-user.js\": \"./dist/src/http/routes/user-management/edit-user.js\",\n\t\"./user-management/get-all-users.js\": \"./dist/src/http/routes/user-management/get-all-users.js\",\n\t\"./user-management/login.js\": \"./dist/src/http/routes/user-management/login.js\",\n\t\"./user-management/remove-session.js\": \"./dist/src/http/routes/user-management/remove-session.js\",\n\t\"./user-management/remove-user.js\": \"./dist/src/http/routes/user-management/remove-user.js\",\n\t\"./user-management/session-login.js\": \"./dist/src/http/routes/user-management/session-login.js\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./dist/src/http/routes sync recursive \\\\.js$\";\n\n//# sourceURL=webpack://backend/./dist/src/http/routes/_sync_\\.js$?");

/***/ }),

/***/ "./dist/src/http/server.js":
/*!*********************************!*\
  !*** ./dist/src/http/server.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst env_1 = __webpack_require__(/*! ../env */ \"./dist/src/env/index.js\");\nconst app_1 = __webpack_require__(/*! ./app */ \"./dist/src/http/app.js\");\nasync function main() {\n    await (0, app_1.load_routes)();\n    app_1.app.listen({ host: env_1.env.HOST, port: env_1.env.PORT }, (_, addr) => console.log(`Server running at ${addr}`));\n}\nmain();\n\n\n//# sourceURL=webpack://backend/./dist/src/http/server.js?");

/***/ }),

/***/ "./dist/src/http/utils/auth.js":
/*!*************************************!*\
  !*** ./dist/src/http/utils/auth.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.get_user = exports.get_auth = void 0;\nconst prisma_1 = __webpack_require__(/*! ../../lib/prisma */ \"./dist/src/lib/prisma.js\");\nasync function get_auth(req) {\n    const id = req.headers['authorization']?.split(' ')[1];\n    if (id == 'test')\n        return 'admin';\n    const session = await prisma_1.prisma.session.findFirst({ where: { id } });\n    if (!session)\n        return;\n    const user = await prisma_1.prisma.user.findUnique({ where: { id: session.user_id } });\n    if (!user)\n        return;\n    return user.role;\n}\nexports.get_auth = get_auth;\n// please god forgive me i dont want to change all the files\nasync function get_user(req) {\n    const id = req.headers['authorization']?.split(' ')[1];\n    const session = await prisma_1.prisma.session.findFirst({ where: { id } });\n    if (!session)\n        return;\n    const user = await prisma_1.prisma.user.findUnique({ where: { id: session.user_id } });\n    if (!user)\n        return;\n    return user;\n}\nexports.get_user = get_user;\n\n\n//# sourceURL=webpack://backend/./dist/src/http/utils/auth.js?");

/***/ }),

/***/ "./dist/src/http/utils/recursive-deletion.js":
/*!***************************************************!*\
  !*** ./dist/src/http/utils/recursive-deletion.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.deleteTicket = exports.deleteEvent = exports.deleteBatch = void 0;\nconst client_1 = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\nconst prisma = new client_1.PrismaClient();\nasync function deleteBatch(id) {\n    await prisma.batch.update({\n        where: { id, active: true },\n        data: { active: false }\n    });\n}\nexports.deleteBatch = deleteBatch;\nasync function deleteTicket(id) {\n    await prisma.ticket.update({\n        where: { id, active: true },\n        data: { active: false }\n    });\n    const batches = await prisma.batch.findMany({\n        where: { ticket_id: id, active: true }\n    });\n    for (let batch of batches)\n        await deleteBatch(batch.id);\n}\nexports.deleteTicket = deleteTicket;\nasync function deleteEvent(id) {\n    await prisma.event.update({\n        where: { id, active: true },\n        data: { active: false }\n    });\n    const tickets = await prisma.ticket.findMany({\n        where: { event_id: id, active: true }\n    });\n    for (let ticket of tickets)\n        await deleteTicket(ticket.id);\n}\nexports.deleteEvent = deleteEvent;\n\n\n//# sourceURL=webpack://backend/./dist/src/http/utils/recursive-deletion.js?");

/***/ }),

/***/ "./dist/src/http lazy recursive ^.*$":
/*!***************************************************!*\
  !*** ./dist/src/http/ lazy ^.*$ namespace object ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./app\": [\n\t\t\"./dist/src/http/app.js\",\n\t\t7\n\t],\n\t\"./app.js\": [\n\t\t\"./dist/src/http/app.js\",\n\t\t7\n\t],\n\t\"./errors\": [\n\t\t\"./dist/src/http/errors.js\",\n\t\t9\n\t],\n\t\"./errors.js\": [\n\t\t\"./dist/src/http/errors.js\",\n\t\t9\n\t],\n\t\"./routes/event-management/active-batch\": [\n\t\t\"./dist/src/http/routes/event-management/active-batch.js\",\n\t\t9\n\t],\n\t\"./routes/event-management/active-batch.js\": [\n\t\t\"./dist/src/http/routes/event-management/active-batch.js\",\n\t\t9\n\t],\n\t\"./routes/event-management/create-batches\": [\n\t\t\"./dist/src/http/routes/event-management/create-batches.js\",\n\t\t9\n\t],\n\t\"./routes/event-management/create-batches.js\": [\n\t\t\"./dist/src/http/routes/event-management/create-batches.js\",\n\t\t9\n\t],\n\t\"./routes/event-management/create-event\": [\n\t\t\"./dist/src/http/routes/event-management/create-event.js\",\n\t\t9\n\t],\n\t\"./routes/event-management/create-event.js\": [\n\t\t\"./dist/src/http/routes/event-management/create-event.js\",\n\t\t9\n\t],\n\t\"./routes/event-management/create-ticket\": [\n\t\t\"./dist/src/http/routes/event-management/create-ticket.js\",\n\t\t9\n\t],\n\t\"./routes/event-management/create-ticket.js\": [\n\t\t\"./dist/src/http/routes/event-management/create-ticket.js\",\n\t\t9\n\t],\n\t\"./routes/event-management/edit-batch\": [\n\t\t\"./dist/src/http/routes/event-management/edit-batch.js\",\n\t\t9\n\t],\n\t\"./routes/event-management/edit-batch.js\": [\n\t\t\"./dist/src/http/routes/event-management/edit-batch.js\",\n\t\t9\n\t],\n\t\"./routes/event-management/edit-event\": [\n\t\t\"./dist/src/http/routes/event-management/edit-event.js\",\n\t\t9\n\t],\n\t\"./routes/event-management/edit-event.js\": [\n\t\t\"./dist/src/http/routes/event-management/edit-event.js\",\n\t\t9\n\t],\n\t\"./routes/event-management/edit-ticket\": [\n\t\t\"./dist/src/http/routes/event-management/edit-ticket.js\",\n\t\t9\n\t],\n\t\"./routes/event-management/edit-ticket.js\": [\n\t\t\"./dist/src/http/routes/event-management/edit-ticket.js\",\n\t\t9\n\t],\n\t\"./routes/event-management/get-all-events\": [\n\t\t\"./dist/src/http/routes/event-management/get-all-events.js\",\n\t\t9\n\t],\n\t\"./routes/event-management/get-all-events.js\": [\n\t\t\"./dist/src/http/routes/event-management/get-all-events.js\",\n\t\t9\n\t],\n\t\"./routes/event-management/get-batch\": [\n\t\t\"./dist/src/http/routes/event-management/get-batch.js\",\n\t\t9\n\t],\n\t\"./routes/event-management/get-batch.js\": [\n\t\t\"./dist/src/http/routes/event-management/get-batch.js\",\n\t\t9\n\t],\n\t\"./routes/event-management/get-event\": [\n\t\t\"./dist/src/http/routes/event-management/get-event.js\",\n\t\t9\n\t],\n\t\"./routes/event-management/get-event-tickets\": [\n\t\t\"./dist/src/http/routes/event-management/get-event-tickets.js\",\n\t\t9\n\t],\n\t\"./routes/event-management/get-event-tickets.js\": [\n\t\t\"./dist/src/http/routes/event-management/get-event-tickets.js\",\n\t\t9\n\t],\n\t\"./routes/event-management/get-event.js\": [\n\t\t\"./dist/src/http/routes/event-management/get-event.js\",\n\t\t9\n\t],\n\t\"./routes/event-management/get-ticket\": [\n\t\t\"./dist/src/http/routes/event-management/get-ticket.js\",\n\t\t9\n\t],\n\t\"./routes/event-management/get-ticket-batches\": [\n\t\t\"./dist/src/http/routes/event-management/get-ticket-batches.js\",\n\t\t9\n\t],\n\t\"./routes/event-management/get-ticket-batches.js\": [\n\t\t\"./dist/src/http/routes/event-management/get-ticket-batches.js\",\n\t\t9\n\t],\n\t\"./routes/event-management/get-ticket.js\": [\n\t\t\"./dist/src/http/routes/event-management/get-ticket.js\",\n\t\t9\n\t],\n\t\"./routes/event-management/remove-batch\": [\n\t\t\"./dist/src/http/routes/event-management/remove-batch.js\",\n\t\t9\n\t],\n\t\"./routes/event-management/remove-batch.js\": [\n\t\t\"./dist/src/http/routes/event-management/remove-batch.js\",\n\t\t9\n\t],\n\t\"./routes/event-management/remove-event\": [\n\t\t\"./dist/src/http/routes/event-management/remove-event.js\",\n\t\t9\n\t],\n\t\"./routes/event-management/remove-event.js\": [\n\t\t\"./dist/src/http/routes/event-management/remove-event.js\",\n\t\t9\n\t],\n\t\"./routes/event-management/remove-ticket\": [\n\t\t\"./dist/src/http/routes/event-management/remove-ticket.js\",\n\t\t9\n\t],\n\t\"./routes/event-management/remove-ticket.js\": [\n\t\t\"./dist/src/http/routes/event-management/remove-ticket.js\",\n\t\t9\n\t],\n\t\"./routes/ticket-instance/create-ticket-instance\": [\n\t\t\"./dist/src/http/routes/ticket-instance/create-ticket-instance.js\",\n\t\t9\n\t],\n\t\"./routes/ticket-instance/create-ticket-instance.js\": [\n\t\t\"./dist/src/http/routes/ticket-instance/create-ticket-instance.js\",\n\t\t9\n\t],\n\t\"./routes/ticket-instance/get-ticket-instance\": [\n\t\t\"./dist/src/http/routes/ticket-instance/get-ticket-instance.js\",\n\t\t9\n\t],\n\t\"./routes/ticket-instance/get-ticket-instance.js\": [\n\t\t\"./dist/src/http/routes/ticket-instance/get-ticket-instance.js\",\n\t\t9\n\t],\n\t\"./routes/ticket-instance/undo-ticket-instance-validation\": [\n\t\t\"./dist/src/http/routes/ticket-instance/undo-ticket-instance-validation.js\",\n\t\t9\n\t],\n\t\"./routes/ticket-instance/undo-ticket-instance-validation.js\": [\n\t\t\"./dist/src/http/routes/ticket-instance/undo-ticket-instance-validation.js\",\n\t\t9\n\t],\n\t\"./routes/ticket-instance/validate-ticket-instance\": [\n\t\t\"./dist/src/http/routes/ticket-instance/validate-ticket-instance.js\",\n\t\t9\n\t],\n\t\"./routes/ticket-instance/validate-ticket-instance.js\": [\n\t\t\"./dist/src/http/routes/ticket-instance/validate-ticket-instance.js\",\n\t\t9\n\t],\n\t\"./routes/user-management/create-user\": [\n\t\t\"./dist/src/http/routes/user-management/create-user.js\",\n\t\t9\n\t],\n\t\"./routes/user-management/create-user.js\": [\n\t\t\"./dist/src/http/routes/user-management/create-user.js\",\n\t\t9\n\t],\n\t\"./routes/user-management/edit-user\": [\n\t\t\"./dist/src/http/routes/user-management/edit-user.js\",\n\t\t9\n\t],\n\t\"./routes/user-management/edit-user.js\": [\n\t\t\"./dist/src/http/routes/user-management/edit-user.js\",\n\t\t9\n\t],\n\t\"./routes/user-management/get-all-users\": [\n\t\t\"./dist/src/http/routes/user-management/get-all-users.js\",\n\t\t9\n\t],\n\t\"./routes/user-management/get-all-users.js\": [\n\t\t\"./dist/src/http/routes/user-management/get-all-users.js\",\n\t\t9\n\t],\n\t\"./routes/user-management/login\": [\n\t\t\"./dist/src/http/routes/user-management/login.js\",\n\t\t9\n\t],\n\t\"./routes/user-management/login.js\": [\n\t\t\"./dist/src/http/routes/user-management/login.js\",\n\t\t9\n\t],\n\t\"./routes/user-management/remove-session\": [\n\t\t\"./dist/src/http/routes/user-management/remove-session.js\",\n\t\t9\n\t],\n\t\"./routes/user-management/remove-session.js\": [\n\t\t\"./dist/src/http/routes/user-management/remove-session.js\",\n\t\t9\n\t],\n\t\"./routes/user-management/remove-user\": [\n\t\t\"./dist/src/http/routes/user-management/remove-user.js\",\n\t\t9\n\t],\n\t\"./routes/user-management/remove-user.js\": [\n\t\t\"./dist/src/http/routes/user-management/remove-user.js\",\n\t\t9\n\t],\n\t\"./routes/user-management/session-login\": [\n\t\t\"./dist/src/http/routes/user-management/session-login.js\",\n\t\t9\n\t],\n\t\"./routes/user-management/session-login.js\": [\n\t\t\"./dist/src/http/routes/user-management/session-login.js\",\n\t\t9\n\t],\n\t\"./server\": [\n\t\t\"./dist/src/http/server.js\",\n\t\t9\n\t],\n\t\"./server.js\": [\n\t\t\"./dist/src/http/server.js\",\n\t\t9\n\t],\n\t\"./utils/auth\": [\n\t\t\"./dist/src/http/utils/auth.js\",\n\t\t9\n\t],\n\t\"./utils/auth.js\": [\n\t\t\"./dist/src/http/utils/auth.js\",\n\t\t9\n\t],\n\t\"./utils/recursive-deletion\": [\n\t\t\"./dist/src/http/utils/recursive-deletion.js\",\n\t\t9\n\t],\n\t\"./utils/recursive-deletion.js\": [\n\t\t\"./dist/src/http/utils/recursive-deletion.js\",\n\t\t9\n\t]\n};\n\nfunction webpackAsyncContext(req) {\n\treturn Promise.resolve().then(() => {\n\t\tif(!__webpack_require__.o(map, req)) {\n\t\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\t\te.code = 'MODULE_NOT_FOUND';\n\t\t\tthrow e;\n\t\t}\n\n\t\tvar ids = map[req], id = ids[0];\n\t\treturn __webpack_require__.t(id, ids[1] | 16)\n\t});\n}\nwebpackAsyncContext.keys = () => (Object.keys(map));\nwebpackAsyncContext.id = \"./dist/src/http lazy recursive ^.*$\";\nmodule.exports = webpackAsyncContext;\n\n//# sourceURL=webpack://backend/./dist/src/http/_lazy_^.*$_namespace_object?");

/***/ }),

/***/ "./dist/src/lib/prisma.js":
/*!********************************!*\
  !*** ./dist/src/lib/prisma.js ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.prisma = void 0;\nconst client_1 = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\nconst env_1 = __webpack_require__(/*! ../env */ \"./dist/src/env/index.js\");\nexports.prisma = new client_1.PrismaClient({\n    log: env_1.env.NODE_ENV == 'dev' ? ['query'] : []\n});\n\n\n//# sourceURL=webpack://backend/./dist/src/lib/prisma.js?");

/***/ }),

/***/ "@fastify/cors":
/*!********************************!*\
  !*** external "@fastify/cors" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@fastify/cors");

/***/ }),

/***/ "@fastify/static":
/*!**********************************!*\
  !*** external "@fastify/static" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@fastify/static");

/***/ }),

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "dotenv/config":
/*!********************************!*\
  !*** external "dotenv/config" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("dotenv/config");

/***/ }),

/***/ "fastify":
/*!**************************!*\
  !*** external "fastify" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("fastify");

/***/ }),

/***/ "glob":
/*!***********************!*\
  !*** external "glob" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("glob");

/***/ }),

/***/ "zod":
/*!**********************!*\
  !*** external "zod" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("zod");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		// The chunk loading function for additional chunks
/******/ 		// Since all referenced chunks are already included
/******/ 		// in this file, this function is empty here.
/******/ 		__webpack_require__.e = () => (Promise.resolve());
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./dist/src/http/server.js");
/******/ 	
/******/ })()
;