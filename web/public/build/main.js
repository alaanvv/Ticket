
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35730/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
function noop() { }
function assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
function add_location(element, file, line, column, char) {
    element.__svelte_meta = {
        loc: { file, line, column, char }
    };
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
let src_url_equal_anchor;
function src_url_equal(element_src, url) {
    if (!src_url_equal_anchor) {
        src_url_equal_anchor = document.createElement('a');
    }
    src_url_equal_anchor.href = url;
    return element_src === src_url_equal_anchor.href;
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function validate_store(store, name) {
    if (store != null && typeof store.subscribe !== 'function') {
        throw new Error(`'${name}' is not a store with a 'subscribe' method`);
    }
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
    let value;
    subscribe(store, _ => value = _)();
    return value;
}
function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) {
            return lets;
        }
        if (typeof lets === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function get_all_dirty_from_scope($$scope) {
    if ($$scope.ctx.length > 32) {
        const dirty = [];
        const length = $$scope.ctx.length / 32;
        for (let i = 0; i < length; i++) {
            dirty[i] = -1;
        }
        return dirty;
    }
    return -1;
}
function append(target, node) {
    target.appendChild(node);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function to_number(value) {
    return value === '' ? null : +value;
}
function children(element) {
    return Array.from(element.childNodes);
}
function set_input_value(input, value) {
    input.value = value == null ? '' : value;
}
function set_style(node, key, value, important) {
    if (value == null) {
        node.style.removeProperty(key);
    }
    else {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
}
function select_option(select, value, mounting) {
    for (let i = 0; i < select.options.length; i += 1) {
        const option = select.options[i];
        if (option.__value === value) {
            option.selected = true;
            return;
        }
    }
    if (!mounting || value !== undefined) {
        select.selectedIndex = -1; // no option should be selected
    }
}
function select_value(select) {
    const selected_option = select.querySelector(':checked');
    return selected_option && selected_option.__value;
}
function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, bubbles, cancelable, detail);
    return e;
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
/**
 * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
 * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
 * it can be called from an external module).
 *
 * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
 *
 * https://svelte.dev/docs#run-time-svelte-onmount
 */
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
/**
 * Creates an event dispatcher that can be used to dispatch [component events](/docs#template-syntax-component-directives-on-eventname).
 * Event dispatchers are functions that can take two arguments: `name` and `detail`.
 *
 * Component events created with `createEventDispatcher` create a
 * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
 * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
 * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
 * property and can contain any type of data.
 *
 * https://svelte.dev/docs#run-time-svelte-createeventdispatcher
 */
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail, { cancelable = false } = {}) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail, { cancelable });
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
            return !event.defaultPrevented;
        }
        return true;
    };
}

const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */ Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
function add_flush_callback(fn) {
    flush_callbacks.push(fn);
}
// flush() calls callbacks in this order:
// 1. All beforeUpdate callbacks, in order: parents before children
// 2. All bind:this callbacks, in reverse order: children before parents.
// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
//    for afterUpdates called during the initial onMount, which are called in
//    reverse order: children before parents.
// Since callbacks might update component values, which could trigger another
// call to flush(), the following steps guard against this:
// 1. During beforeUpdate, any updated components will be added to the
//    dirty_components array and will cause a reentrant call to flush(). Because
//    the flush index is kept outside the function, the reentrant call will pick
//    up where the earlier call left off and go through all dirty components. The
//    current_component value is saved and restored so that the reentrant call will
//    not interfere with the "parent" flush() call.
// 2. bind:this callbacks cannot trigger new flush() calls.
// 3. During afterUpdate, any updated components will NOT have their afterUpdate
//    callback called a second time; the seen_callbacks set, outside the flush()
//    function, guarantees this behavior.
const seen_callbacks = new Set();
let flushidx = 0; // Do *not* move this inside the flush() function
function flush() {
    // Do not reenter flush while dirty components are updated, as this can
    // result in an infinite loop. Instead, let the inner flush handle it.
    // Reentrancy is ok afterwards for bindings etc.
    if (flushidx !== 0) {
        return;
    }
    const saved_component = current_component;
    do {
        // first, call beforeUpdate functions
        // and update components
        try {
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
        }
        catch (e) {
            // reset dirty state to not end up in a deadlocked state and then rethrow
            dirty_components.length = 0;
            flushidx = 0;
            throw e;
        }
        set_current_component(null);
        dirty_components.length = 0;
        flushidx = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}
/**
 * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
 */
function flush_render_callbacks(fns) {
    const filtered = [];
    const targets = [];
    render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
    targets.forEach((c) => c());
    render_callbacks = filtered;
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
    else if (callback) {
        callback();
    }
}

function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== undefined) {
        component.$$.bound[index] = callback;
        callback(component.$$.ctx[index]);
    }
}
function create_component(block) {
    block && block.c();
}
function mount_component(component, target, anchor, customElement) {
    const { fragment, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
            // if the component was destroyed immediately
            // it will update the `$$.on_destroy` reference to `null`.
            // the destructured on_destroy may still reference to the old array
            if (component.$$.on_destroy) {
                component.$$.on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
    }
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        flush_render_callbacks($$.after_update);
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: [],
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false,
        root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance
        ? instance(component, options.props || {}, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor, options.customElement);
        flush();
    }
    set_current_component(parent_component);
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        if (!is_function(callback)) {
            return noop;
        }
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

function dispatch_dev(type, detail) {
    document.dispatchEvent(custom_event(type, Object.assign({ version: '3.59.2' }, detail), { bubbles: true }));
}
function append_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', { target, node });
    append(target, node);
}
function insert_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert(target, node, anchor);
}
function detach_dev(node) {
    dispatch_dev('SvelteDOMRemove', { node });
    detach(node);
}
function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation, has_stop_immediate_propagation) {
    const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
    if (has_prevent_default)
        modifiers.push('preventDefault');
    if (has_stop_propagation)
        modifiers.push('stopPropagation');
    if (has_stop_immediate_propagation)
        modifiers.push('stopImmediatePropagation');
    dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
    const dispose = listen(node, event, handler, options);
    return () => {
        dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
        dispose();
    };
}
function attr_dev(node, attribute, value) {
    attr(node, attribute, value);
    if (value == null)
        dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
    else
        dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
}
function prop_dev(node, property, value) {
    node[property] = value;
    dispatch_dev('SvelteDOMSetProperty', { node, property, value });
}
function set_data_dev(text, data) {
    data = '' + data;
    if (text.data === data)
        return;
    dispatch_dev('SvelteDOMSetData', { node: text, data });
    text.data = data;
}
function validate_each_argument(arg) {
    if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
        let msg = '{#each} only iterates over array-like objects.';
        if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
            msg += ' You can use a spread to convert this iterable into an array.';
        }
        throw new Error(msg);
    }
}
function validate_slots(name, slot, keys) {
    for (const slot_key of Object.keys(slot)) {
        if (!~keys.indexOf(slot_key)) {
            console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
        }
    }
}
function construct_svelte_component_dev(component, props) {
    const error_message = 'this={...} of <svelte:component> should specify a Svelte component.';
    try {
        const instance = new component(props);
        if (!instance.$$ || !instance.$set || !instance.$on || !instance.$destroy) {
            throw new Error(error_message);
        }
        return instance;
    }
    catch (err) {
        const { message } = err;
        if (typeof message === 'string' && message.indexOf('is not a constructor') !== -1) {
            throw new Error(error_message);
        }
        else {
            throw err;
        }
    }
}
/**
 * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
 */
class SvelteComponentDev extends SvelteComponent {
    constructor(options) {
        if (!options || (!options.target && !options.$$inline)) {
            throw new Error("'target' is a required option");
        }
        super();
    }
    $destroy() {
        super.$destroy();
        this.$destroy = () => {
            console.warn('Component was already destroyed'); // eslint-disable-line no-console
        };
    }
    $capture_state() { }
    $inject_state() { }
}

/* src/components/Icon.svelte generated by Svelte v3.59.2 */
const file$m = "src/components/Icon.svelte";

function create_fragment$n(ctx) {
	let span;
	let t;
	let span_class_value;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			span = element("span");
			t = text(/*i*/ ctx[0]);
			attr_dev(span, "class", span_class_value = "" + (/*clazz*/ ctx[1] + " material-symbols-outlined"));
			add_location(span, file$m, 1, 0, 57);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
			append_dev(span, t);

			if (!mounted) {
				dispose = listen_dev(span, "click", /*click_handler*/ ctx[3], false, false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*i*/ 1) set_data_dev(t, /*i*/ ctx[0]);

			if (dirty & /*clazz*/ 2 && span_class_value !== (span_class_value = "" + (/*clazz*/ ctx[1] + " material-symbols-outlined"))) {
				attr_dev(span, "class", span_class_value);
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$n.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$n($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Icon', slots, []);
	const dispatch = createEventDispatcher();
	let { i } = $$props;
	let { class: clazz = '' } = $$props;

	$$self.$$.on_mount.push(function () {
		if (i === undefined && !('i' in $$props || $$self.$$.bound[$$self.$$.props['i']])) {
			console.warn("<Icon> was created without expected prop 'i'");
		}
	});

	const writable_props = ['i', 'class'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Icon> was created with unknown prop '${key}'`);
	});

	const click_handler = _ => dispatch('click');

	$$self.$$set = $$props => {
		if ('i' in $$props) $$invalidate(0, i = $$props.i);
		if ('class' in $$props) $$invalidate(1, clazz = $$props.class);
	};

	$$self.$capture_state = () => ({
		createEventDispatcher,
		dispatch,
		i,
		clazz
	});

	$$self.$inject_state = $$props => {
		if ('i' in $$props) $$invalidate(0, i = $$props.i);
		if ('clazz' in $$props) $$invalidate(1, clazz = $$props.clazz);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [i, clazz, dispatch, click_handler];
}

class Icon extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$n, create_fragment$n, safe_not_equal, { i: 0, class: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Icon",
			options,
			id: create_fragment$n.name
		});
	}

	get i() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set i(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get class() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/components/Modal.svelte generated by Svelte v3.59.2 */
const file$l = "src/components/Modal.svelte";

function create_fragment$m(ctx) {
	let div1;
	let div0;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[3].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

	const block = {
		c: function create() {
			div1 = element("div");
			div0 = element("div");
			if (default_slot) default_slot.c();
			attr_dev(div0, "class", "modal-content svelte-172lvcf");
			add_location(div0, file$l, 2, 2, 107);
			attr_dev(div1, "class", "modal svelte-172lvcf");
			add_location(div1, file$l, 1, 0, 57);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			append_dev(div1, div0);

			if (default_slot) {
				default_slot.m(div0, null);
			}

			current = true;

			if (!mounted) {
				dispose = listen_dev(div1, "click", /*background_click*/ ctx[0], false, false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
					update_slot_base(
						default_slot,
						default_slot_template,
						ctx,
						/*$$scope*/ ctx[2],
						!current
						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
						null
					);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			if (default_slot) default_slot.d(detaching);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$m.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$m($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Modal', slots, ['default']);
	const dispatch = createEventDispatcher();
	let { show } = $$props;

	function close() {
		dispatch('close');
		$$invalidate(1, show = false);
	}

	function background_click(e) {
		if (e.target.classList.contains('modal')) close();
	}

	onMount(_ => {
		function on_keydown(e) {
			if (e.key == 'Escape') close();
		}

		window.addEventListener('keydown', on_keydown);

		return _ => {
			window.removeEventListener('keydown', on_keydown);
		};
	});

	$$self.$$.on_mount.push(function () {
		if (show === undefined && !('show' in $$props || $$self.$$.bound[$$self.$$.props['show']])) {
			console.warn("<Modal> was created without expected prop 'show'");
		}
	});

	const writable_props = ['show'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Modal> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('show' in $$props) $$invalidate(1, show = $$props.show);
		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({
		onMount,
		createEventDispatcher,
		dispatch,
		show,
		close,
		background_click
	});

	$$self.$inject_state = $$props => {
		if ('show' in $$props) $$invalidate(1, show = $$props.show);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [background_click, show, $$scope, slots];
}

class Modal extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$m, create_fragment$m, safe_not_equal, { show: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Modal",
			options,
			id: create_fragment$m.name
		});
	}

	get show() {
		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set show(value) {
		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

const subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=} start
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = new Set();
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (const subscriber of subscribers) {
                    subscriber[1]();
                    subscriber_queue.push(subscriber, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.add(subscriber);
        if (subscribers.size === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            subscribers.delete(subscriber);
            if (subscribers.size === 0 && stop) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}

const curr_path    = writable(window.location.pathname);
const history      = writable([]);
const logged_user  = writable();
const opened_event = writable();

async function api(route, method, body) {
  const options = { headers: {}, method: method || 'GET' };

  if (get_store_value(logged_user))
    options.headers['Authorization'] = `Bearer ${get_store_value(logged_user).session_id}`;
  else if (localStorage.getItem('session_id'))
    options.headers['Authorization'] = `Bearer ${localStorage.getItem('session_id')}`;

  if (body) {
    options.body = JSON.stringify(body);
    options.headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${'https://ticket-sf4d.onrender.com'}/${route}`, options);
  let data;

  if (res.headers?.get('content-type')?.includes('application/json'))
    data = await res.json();

  return { res, data }
}

/* src/components/TopBar.svelte generated by Svelte v3.59.2 */
const file$k = "src/components/TopBar.svelte";

// (4:2) {#if $logged_user}
function create_if_block_1$c(ctx) {
	let div;
	let t0_value = /*$logged_user*/ ctx[1].name + "";
	let t0;
	let t1;
	let icon;
	let current;

	icon = new Icon({
			props: { class: "cp", i: "logout" },
			$$inline: true
		});

	icon.$on("click", /*logout*/ ctx[2]);

	const block = {
		c: function create() {
			div = element("div");
			t0 = text(t0_value);
			t1 = space();
			create_component(icon.$$.fragment);
			attr_dev(div, "class", "row right");
			add_location(div, file$k, 4, 4, 73);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, t0);
			append_dev(div, t1);
			mount_component(icon, div, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			if ((!current || dirty & /*$logged_user*/ 2) && t0_value !== (t0_value = /*$logged_user*/ ctx[1].name + "")) set_data_dev(t0, t0_value);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_component(icon);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$c.name,
		type: "if",
		source: "(4:2) {#if $logged_user}",
		ctx
	});

	return block;
}

// (12:0) {#if l_exiting}
function create_if_block$d(ctx) {
	let modal;
	let current;

	modal = new Modal({
			props: {
				$$slots: { default: [create_default_slot$8] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(modal.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(modal, target, anchor);
			current = true;
		},
		i: function intro(local) {
			if (current) return;
			transition_in(modal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(modal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(modal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$d.name,
		type: "if",
		source: "(12:0) {#if l_exiting}",
		ctx
	});

	return block;
}

// (13:2) <Modal>
function create_default_slot$8(ctx) {
	let p;

	const block = {
		c: function create() {
			p = element("p");
			p.textContent = "Saindo...";
			attr_dev(p, "class", "tac");
			add_location(p, file$k, 13, 4, 235);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$8.name,
		type: "slot",
		source: "(13:2) <Modal>",
		ctx
	});

	return block;
}

function create_fragment$l(ctx) {
	let div;
	let h2;
	let t1;
	let t2;
	let if_block1_anchor;
	let current;
	let if_block0 = /*$logged_user*/ ctx[1] && create_if_block_1$c(ctx);
	let if_block1 = /*l_exiting*/ ctx[0] && create_if_block$d(ctx);

	const block = {
		c: function create() {
			div = element("div");
			h2 = element("h2");
			h2.textContent = "iTicket";
			t1 = space();
			if (if_block0) if_block0.c();
			t2 = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
			add_location(h2, file$k, 1, 2, 28);
			attr_dev(div, "class", "bar row usn svelte-10dx6zf");
			add_location(div, file$k, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, h2);
			append_dev(div, t1);
			if (if_block0) if_block0.m(div, null);
			insert_dev(target, t2, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert_dev(target, if_block1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*$logged_user*/ ctx[1]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*$logged_user*/ 2) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_1$c(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(div, null);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (/*l_exiting*/ ctx[0]) {
				if (if_block1) {
					if (dirty & /*l_exiting*/ 1) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block$d(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(if_block1);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block0);
			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (if_block0) if_block0.d();
			if (detaching) detach_dev(t2);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach_dev(if_block1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$l.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$l($$self, $$props, $$invalidate) {
	let $logged_user;
	validate_store(logged_user, 'logged_user');
	component_subscribe($$self, logged_user, $$value => $$invalidate(1, $logged_user = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('TopBar', slots, []);
	let l_exiting;

	async function logout() {
		$$invalidate(0, l_exiting = true);
		await api(`session/${localStorage.getItem('session_id')}`, 'DELETE');
		$$invalidate(0, l_exiting = false);
		localStorage.removeItem('session_id');
		logged_user.set(undefined);
	}

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TopBar> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({
		Icon,
		Modal,
		logged_user,
		api,
		l_exiting,
		logout,
		$logged_user
	});

	$$self.$inject_state = $$props => {
		if ('l_exiting' in $$props) $$invalidate(0, l_exiting = $$props.l_exiting);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [l_exiting, $logged_user, logout];
}

class TopBar extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$l, create_fragment$l, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "TopBar",
			options,
			id: create_fragment$l.name
		});
	}
}

const navigate = path => {
  window.history.pushState({}, '', path);
  curr_path.set(path);
};

/* src/components/SidebarItem.svelte generated by Svelte v3.59.2 */
const file$j = "src/components/SidebarItem.svelte";

function create_fragment$k(ctx) {
	let li;
	let icon;
	let t0;
	let t1;
	let current;
	let mounted;
	let dispose;

	icon = new Icon({
			props: { i: /*i*/ ctx[2] },
			$$inline: true
		});

	const block = {
		c: function create() {
			li = element("li");
			create_component(icon.$$.fragment);
			t0 = space();
			t1 = text(/*name*/ ctx[1]);
			attr_dev(li, "class", "row");
			toggle_class(li, "active", /*$curr_path*/ ctx[3] == /*path*/ ctx[0]);
			add_location(li, file$j, 1, 0, 57);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, li, anchor);
			mount_component(icon, li, null);
			append_dev(li, t0);
			append_dev(li, t1);
			current = true;

			if (!mounted) {
				dispose = listen_dev(li, "click", /*enter*/ ctx[4], false, false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			const icon_changes = {};
			if (dirty & /*i*/ 4) icon_changes.i = /*i*/ ctx[2];
			icon.$set(icon_changes);
			if (!current || dirty & /*name*/ 2) set_data_dev(t1, /*name*/ ctx[1]);

			if (!current || dirty & /*$curr_path, path*/ 9) {
				toggle_class(li, "active", /*$curr_path*/ ctx[3] == /*path*/ ctx[0]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(li);
			destroy_component(icon);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$k.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$k($$self, $$props, $$invalidate) {
	let $curr_path;
	validate_store(curr_path, 'curr_path');
	component_subscribe($$self, curr_path, $$value => $$invalidate(3, $curr_path = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('SidebarItem', slots, []);
	let { path, name, i } = $$props;

	function enter() {
		navigate(path);
	}

	$$self.$$.on_mount.push(function () {
		if (path === undefined && !('path' in $$props || $$self.$$.bound[$$self.$$.props['path']])) {
			console.warn("<SidebarItem> was created without expected prop 'path'");
		}

		if (name === undefined && !('name' in $$props || $$self.$$.bound[$$self.$$.props['name']])) {
			console.warn("<SidebarItem> was created without expected prop 'name'");
		}

		if (i === undefined && !('i' in $$props || $$self.$$.bound[$$self.$$.props['i']])) {
			console.warn("<SidebarItem> was created without expected prop 'i'");
		}
	});

	const writable_props = ['path', 'name', 'i'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SidebarItem> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('path' in $$props) $$invalidate(0, path = $$props.path);
		if ('name' in $$props) $$invalidate(1, name = $$props.name);
		if ('i' in $$props) $$invalidate(2, i = $$props.i);
	};

	$$self.$capture_state = () => ({
		Icon,
		navigate,
		curr_path,
		path,
		name,
		i,
		enter,
		$curr_path
	});

	$$self.$inject_state = $$props => {
		if ('path' in $$props) $$invalidate(0, path = $$props.path);
		if ('name' in $$props) $$invalidate(1, name = $$props.name);
		if ('i' in $$props) $$invalidate(2, i = $$props.i);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [path, name, i, $curr_path, enter];
}

class SidebarItem extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$k, create_fragment$k, safe_not_equal, { path: 0, name: 1, i: 2 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "SidebarItem",
			options,
			id: create_fragment$k.name
		});
	}

	get path() {
		throw new Error("<SidebarItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set path(value) {
		throw new Error("<SidebarItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get name() {
		throw new Error("<SidebarItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set name(value) {
		throw new Error("<SidebarItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get i() {
		throw new Error("<SidebarItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set i(value) {
		throw new Error("<SidebarItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/components/SideBar.svelte generated by Svelte v3.59.2 */
const file$i = "src/components/SideBar.svelte";

// (1:0) {#if $logged_user}
function create_if_block$c(ctx) {
	let div;
	let t;
	let show_if = ['admin', 'portaria'].includes(/*$logged_user*/ ctx[0].role);
	let current;
	let if_block0 = /*$logged_user*/ ctx[0].role == 'admin' && create_if_block_2$4(ctx);
	let if_block1 = show_if && create_if_block_1$b(ctx);

	const block = {
		c: function create() {
			div = element("div");
			if (if_block0) if_block0.c();
			t = space();
			if (if_block1) if_block1.c();
			attr_dev(div, "class", "usn tac sidebar svelte-1c1oncg");
			add_location(div, file$i, 1, 2, 21);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			if (if_block0) if_block0.m(div, null);
			append_dev(div, t);
			if (if_block1) if_block1.m(div, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (/*$logged_user*/ ctx[0].role == 'admin') {
				if (if_block0) {
					if (dirty & /*$logged_user*/ 1) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_2$4(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(div, t);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (dirty & /*$logged_user*/ 1) show_if = ['admin', 'portaria'].includes(/*$logged_user*/ ctx[0].role);

			if (show_if) {
				if (if_block1) {
					if (dirty & /*$logged_user*/ 1) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_1$b(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(div, null);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(if_block1);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block0);
			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$c.name,
		type: "if",
		source: "(1:0) {#if $logged_user}",
		ctx
	});

	return block;
}

// (3:4) {#if $logged_user.role == 'admin'}
function create_if_block_2$4(ctx) {
	let h2;
	let t1;
	let ul;
	let sidebaritem0;
	let t2;
	let sidebaritem1;
	let current;

	sidebaritem0 = new SidebarItem({
			props: {
				path: "/usuarios",
				name: "Usuários",
				i: "group"
			},
			$$inline: true
		});

	sidebaritem1 = new SidebarItem({
			props: {
				path: "/eventos",
				name: "Eventos",
				i: "event"
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			h2 = element("h2");
			h2.textContent = "Admin";
			t1 = space();
			ul = element("ul");
			create_component(sidebaritem0.$$.fragment);
			t2 = space();
			create_component(sidebaritem1.$$.fragment);
			attr_dev(h2, "class", "svelte-1c1oncg");
			add_location(h2, file$i, 3, 6, 96);
			attr_dev(ul, "class", "svelte-1c1oncg");
			add_location(ul, file$i, 5, 6, 120);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h2, anchor);
			insert_dev(target, t1, anchor);
			insert_dev(target, ul, anchor);
			mount_component(sidebaritem0, ul, null);
			append_dev(ul, t2);
			mount_component(sidebaritem1, ul, null);
			current = true;
		},
		i: function intro(local) {
			if (current) return;
			transition_in(sidebaritem0.$$.fragment, local);
			transition_in(sidebaritem1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(sidebaritem0.$$.fragment, local);
			transition_out(sidebaritem1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(h2);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(ul);
			destroy_component(sidebaritem0);
			destroy_component(sidebaritem1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2$4.name,
		type: "if",
		source: "(3:4) {#if $logged_user.role == 'admin'}",
		ctx
	});

	return block;
}

// (12:4) {#if ['admin', 'portaria'].includes($logged_user.role)}
function create_if_block_1$b(ctx) {
	let h2;
	let t1;
	let ul;
	let sidebaritem0;
	let t2;
	let sidebaritem1;
	let t3;
	let sidebaritem2;
	let current;

	sidebaritem0 = new SidebarItem({
			props: {
				path: "/verificacao",
				name: "Verificação",
				i: "qr_code"
			},
			$$inline: true
		});

	sidebaritem1 = new SidebarItem({
			props: {
				path: "/historico",
				name: "Histórico",
				i: "history"
			},
			$$inline: true
		});

	sidebaritem2 = new SidebarItem({
			props: {
				path: "/teste",
				name: "Teste",
				i: "build"
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			h2 = element("h2");
			h2.textContent = "Portaria";
			t1 = space();
			ul = element("ul");
			create_component(sidebaritem0.$$.fragment);
			t2 = space();
			create_component(sidebaritem1.$$.fragment);
			t3 = space();
			create_component(sidebaritem2.$$.fragment);
			attr_dev(h2, "class", "svelte-1c1oncg");
			add_location(h2, file$i, 12, 6, 348);
			attr_dev(ul, "class", "svelte-1c1oncg");
			add_location(ul, file$i, 13, 6, 374);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h2, anchor);
			insert_dev(target, t1, anchor);
			insert_dev(target, ul, anchor);
			mount_component(sidebaritem0, ul, null);
			append_dev(ul, t2);
			mount_component(sidebaritem1, ul, null);
			append_dev(ul, t3);
			mount_component(sidebaritem2, ul, null);
			current = true;
		},
		i: function intro(local) {
			if (current) return;
			transition_in(sidebaritem0.$$.fragment, local);
			transition_in(sidebaritem1.$$.fragment, local);
			transition_in(sidebaritem2.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(sidebaritem0.$$.fragment, local);
			transition_out(sidebaritem1.$$.fragment, local);
			transition_out(sidebaritem2.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(h2);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(ul);
			destroy_component(sidebaritem0);
			destroy_component(sidebaritem1);
			destroy_component(sidebaritem2);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$b.name,
		type: "if",
		source: "(12:4) {#if ['admin', 'portaria'].includes($logged_user.role)}",
		ctx
	});

	return block;
}

function create_fragment$j(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*$logged_user*/ ctx[0] && create_if_block$c(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*$logged_user*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*$logged_user*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$c(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$j.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$j($$self, $$props, $$invalidate) {
	let $logged_user;
	validate_store(logged_user, 'logged_user');
	component_subscribe($$self, logged_user, $$value => $$invalidate(0, $logged_user = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('SideBar', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SideBar> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({ SidebarItem, logged_user, $logged_user });
	return [$logged_user];
}

class SideBar extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$j, create_fragment$j, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "SideBar",
			options,
			id: create_fragment$j.name
		});
	}
}

/* src/components/UserModal.svelte generated by Svelte v3.59.2 */
const file$h = "src/components/UserModal.svelte";

// (1:0) <Modal on:close={close}>
function create_default_slot$7(ctx) {
	let h2;
	let t0_value = (/*data*/ ctx[0] ? 'Editando' : 'Criando') + "";
	let t0;
	let t1;
	let t2;
	let form;
	let label0;
	let t3;
	let input0;
	let t4;
	let label1;
	let t5;
	let div;
	let input1;
	let t6;
	let input2;
	let t7;
	let icon;
	let t8;
	let label2;
	let t9;
	let select;
	let option0;
	let option1;
	let t12;
	let button;
	let t13;
	let current;
	let mounted;
	let dispose;

	icon = new Icon({
			props: {
				i: /*show_password*/ ctx[1]
				? 'visibility_off'
				: 'visibility'
			},
			$$inline: true
		});

	icon.$on("click", /*toggle_show_password*/ ctx[5]);

	const block = {
		c: function create() {
			h2 = element("h2");
			t0 = text(t0_value);
			t1 = text(" um Usuário");
			t2 = space();
			form = element("form");
			label0 = element("label");
			t3 = text("Nome:\n      ");
			input0 = element("input");
			t4 = space();
			label1 = element("label");
			t5 = text("Senha:\n      ");
			div = element("div");
			input1 = element("input");
			t6 = space();
			input2 = element("input");
			t7 = space();
			create_component(icon.$$.fragment);
			t8 = space();
			label2 = element("label");
			t9 = text("Cargo:\n      ");
			select = element("select");
			option0 = element("option");
			option0.textContent = "Admin    ";
			option1 = element("option");
			option1.textContent = "Portaria";
			t12 = space();
			button = element("button");
			t13 = text("Enviar");
			add_location(h2, file$h, 1, 2, 27);
			attr_dev(input0, "type", "text");
			input0.required = true;
			attr_dev(input0, "class", "svelte-1pwtl2r");
			add_location(input0, file$h, 5, 6, 134);
			attr_dev(label0, "class", "svelte-1pwtl2r");
			add_location(label0, file$h, 4, 4, 114);
			attr_dev(input1, "type", "password");
			set_style(input1, "display", /*show_password*/ ctx[1] ? 'none' : 'block');
			attr_dev(input1, "class", "svelte-1pwtl2r");
			add_location(input1, file$h, 10, 8, 268);
			attr_dev(input2, "type", "text");
			set_style(input2, "display", /*show_password*/ ctx[1] ? 'block' : 'none');
			attr_dev(input2, "class", "svelte-1pwtl2r");
			add_location(input2, file$h, 11, 8, 382);
			attr_dev(div, "class", "password-container svelte-1pwtl2r");
			add_location(div, file$h, 9, 6, 227);
			attr_dev(label1, "class", "svelte-1pwtl2r");
			add_location(label1, file$h, 8, 4, 206);
			option0.__value = "admin";
			option0.value = option0.__value;
			add_location(option0, file$h, 18, 8, 682);
			option1.__value = "portaria";
			option1.value = option1.__value;
			add_location(option1, file$h, 19, 8, 735);
			if (/*user*/ ctx[3].role === void 0) add_render_callback(() => /*select_change_handler*/ ctx[12].call(select));
			add_location(select, file$h, 17, 6, 642);
			attr_dev(label2, "class", "svelte-1pwtl2r");
			add_location(label2, file$h, 16, 4, 621);
			attr_dev(button, "type", "submit");
			button.disabled = /*l_submitting*/ ctx[2];
			attr_dev(button, "class", "svelte-1pwtl2r");
			add_location(button, file$h, 23, 4, 814);
			add_location(form, file$h, 3, 2, 84);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h2, anchor);
			append_dev(h2, t0);
			append_dev(h2, t1);
			insert_dev(target, t2, anchor);
			insert_dev(target, form, anchor);
			append_dev(form, label0);
			append_dev(label0, t3);
			append_dev(label0, input0);
			set_input_value(input0, /*user*/ ctx[3].name);
			append_dev(form, t4);
			append_dev(form, label1);
			append_dev(label1, t5);
			append_dev(label1, div);
			append_dev(div, input1);
			set_input_value(input1, /*user*/ ctx[3].password);
			append_dev(div, t6);
			append_dev(div, input2);
			set_input_value(input2, /*user*/ ctx[3].password);
			append_dev(div, t7);
			mount_component(icon, div, null);
			append_dev(form, t8);
			append_dev(form, label2);
			append_dev(label2, t9);
			append_dev(label2, select);
			append_dev(select, option0);
			append_dev(select, option1);
			select_option(select, /*user*/ ctx[3].role, true);
			append_dev(form, t12);
			append_dev(form, button);
			append_dev(button, t13);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(input0, "input", /*input0_input_handler*/ ctx[9]),
					listen_dev(input1, "input", /*input1_input_handler*/ ctx[10]),
					listen_dev(input2, "input", /*input2_input_handler*/ ctx[11]),
					listen_dev(select, "change", /*select_change_handler*/ ctx[12]),
					listen_dev(form, "submit", /*submit*/ ctx[6], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if ((!current || dirty & /*data*/ 1) && t0_value !== (t0_value = (/*data*/ ctx[0] ? 'Editando' : 'Criando') + "")) set_data_dev(t0, t0_value);

			if (dirty & /*user*/ 8 && input0.value !== /*user*/ ctx[3].name) {
				set_input_value(input0, /*user*/ ctx[3].name);
			}

			if (!current || dirty & /*show_password*/ 2) {
				set_style(input1, "display", /*show_password*/ ctx[1] ? 'none' : 'block');
			}

			if (dirty & /*user*/ 8 && input1.value !== /*user*/ ctx[3].password) {
				set_input_value(input1, /*user*/ ctx[3].password);
			}

			if (!current || dirty & /*show_password*/ 2) {
				set_style(input2, "display", /*show_password*/ ctx[1] ? 'block' : 'none');
			}

			if (dirty & /*user*/ 8 && input2.value !== /*user*/ ctx[3].password) {
				set_input_value(input2, /*user*/ ctx[3].password);
			}

			const icon_changes = {};

			if (dirty & /*show_password*/ 2) icon_changes.i = /*show_password*/ ctx[1]
			? 'visibility_off'
			: 'visibility';

			icon.$set(icon_changes);

			if (dirty & /*user*/ 8) {
				select_option(select, /*user*/ ctx[3].role);
			}

			if (!current || dirty & /*l_submitting*/ 4) {
				prop_dev(button, "disabled", /*l_submitting*/ ctx[2]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(h2);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(form);
			destroy_component(icon);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$7.name,
		type: "slot",
		source: "(1:0) <Modal on:close={close}>",
		ctx
	});

	return block;
}

function create_fragment$i(ctx) {
	let modal;
	let current;

	modal = new Modal({
			props: {
				$$slots: { default: [create_default_slot$7] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	modal.$on("close", /*close*/ ctx[4]);

	const block = {
		c: function create() {
			create_component(modal.$$.fragment);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			mount_component(modal, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const modal_changes = {};

			if (dirty & /*$$scope, l_submitting, user, show_password, data*/ 8207) {
				modal_changes.$$scope = { dirty, ctx };
			}

			modal.$set(modal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(modal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(modal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(modal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$i.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$i($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('UserModal', slots, []);
	let { data, show, users } = $$props;
	let show_password, l_submitting;

	let user = {
		name: data?.name,
		password: data?.password,
		role: data?.role
	};

	function close() {
		$$invalidate(7, show = false);
	}

	function toggle_show_password() {
		$$invalidate(1, show_password = !show_password);
	}

	async function submit(e) {
		e.preventDefault();
		$$invalidate(2, l_submitting = true);

		if (!data) {
			const { id } = (await api('user', 'POST', user)).data;
			$$invalidate(8, users = [...users, { id, editable: true, ...user }]);
		} else {
			await api(`edit-user/${data.id}`, 'PUT', user);
			$$invalidate(8, users = users.map(u => u.id == data.id ? { ...u, ...user } : u));
		}

		close();
	}

	$$self.$$.on_mount.push(function () {
		if (data === undefined && !('data' in $$props || $$self.$$.bound[$$self.$$.props['data']])) {
			console.warn("<UserModal> was created without expected prop 'data'");
		}

		if (show === undefined && !('show' in $$props || $$self.$$.bound[$$self.$$.props['show']])) {
			console.warn("<UserModal> was created without expected prop 'show'");
		}

		if (users === undefined && !('users' in $$props || $$self.$$.bound[$$self.$$.props['users']])) {
			console.warn("<UserModal> was created without expected prop 'users'");
		}
	});

	const writable_props = ['data', 'show', 'users'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<UserModal> was created with unknown prop '${key}'`);
	});

	function input0_input_handler() {
		user.name = this.value;
		$$invalidate(3, user);
	}

	function input1_input_handler() {
		user.password = this.value;
		$$invalidate(3, user);
	}

	function input2_input_handler() {
		user.password = this.value;
		$$invalidate(3, user);
	}

	function select_change_handler() {
		user.role = select_value(this);
		$$invalidate(3, user);
	}

	$$self.$$set = $$props => {
		if ('data' in $$props) $$invalidate(0, data = $$props.data);
		if ('show' in $$props) $$invalidate(7, show = $$props.show);
		if ('users' in $$props) $$invalidate(8, users = $$props.users);
	};

	$$self.$capture_state = () => ({
		Modal,
		Icon,
		api,
		data,
		show,
		users,
		show_password,
		l_submitting,
		user,
		close,
		toggle_show_password,
		submit
	});

	$$self.$inject_state = $$props => {
		if ('data' in $$props) $$invalidate(0, data = $$props.data);
		if ('show' in $$props) $$invalidate(7, show = $$props.show);
		if ('users' in $$props) $$invalidate(8, users = $$props.users);
		if ('show_password' in $$props) $$invalidate(1, show_password = $$props.show_password);
		if ('l_submitting' in $$props) $$invalidate(2, l_submitting = $$props.l_submitting);
		if ('user' in $$props) $$invalidate(3, user = $$props.user);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		data,
		show_password,
		l_submitting,
		user,
		close,
		toggle_show_password,
		submit,
		show,
		users,
		input0_input_handler,
		input1_input_handler,
		input2_input_handler,
		select_change_handler
	];
}

class UserModal extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$i, create_fragment$i, safe_not_equal, { data: 0, show: 7, users: 8 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "UserModal",
			options,
			id: create_fragment$i.name
		});
	}

	get data() {
		throw new Error("<UserModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set data(value) {
		throw new Error("<UserModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get show() {
		throw new Error("<UserModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set show(value) {
		throw new Error("<UserModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get users() {
		throw new Error("<UserModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set users(value) {
		throw new Error("<UserModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/components/Button.svelte generated by Svelte v3.59.2 */
const file$g = "src/components/Button.svelte";

// (2:2) {#if i}
function create_if_block_1$a(ctx) {
	let icon;
	let current;

	icon = new Icon({
			props: { i: /*i*/ ctx[0] },
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(icon.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(icon, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const icon_changes = {};
			if (dirty & /*i*/ 1) icon_changes.i = /*i*/ ctx[0];
			icon.$set(icon_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(icon, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$a.name,
		type: "if",
		source: "(2:2) {#if i}",
		ctx
	});

	return block;
}

// (3:2) {#if t}
function create_if_block$b(ctx) {
	let t_1;

	const block = {
		c: function create() {
			t_1 = text(/*t*/ ctx[1]);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t_1, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*t*/ 2) set_data_dev(t_1, /*t*/ ctx[1]);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t_1);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$b.name,
		type: "if",
		source: "(3:2) {#if t}",
		ctx
	});

	return block;
}

function create_fragment$h(ctx) {
	let button;
	let t_1;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*i*/ ctx[0] && create_if_block_1$a(ctx);
	let if_block1 = /*t*/ ctx[1] && create_if_block$b(ctx);

	const block = {
		c: function create() {
			button = element("button");
			if (if_block0) if_block0.c();
			t_1 = space();
			if (if_block1) if_block1.c();
			attr_dev(button, "class", /*clazz*/ ctx[4]);
			button.disabled = /*disabled*/ ctx[3];
			toggle_class(button, "row", /*i*/ ctx[0] && /*t*/ ctx[1]);
			add_location(button, file$g, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, button, anchor);
			if (if_block0) if_block0.m(button, null);
			append_dev(button, t_1);
			if (if_block1) if_block1.m(button, null);
			current = true;

			if (!mounted) {
				dispose = listen_dev(
					button,
					"click",
					function () {
						if (is_function(/*action*/ ctx[2])) /*action*/ ctx[2].apply(this, arguments);
					},
					false,
					false,
					false,
					false
				);

				mounted = true;
			}
		},
		p: function update(new_ctx, [dirty]) {
			ctx = new_ctx;

			if (/*i*/ ctx[0]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*i*/ 1) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_1$a(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(button, t_1);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (/*t*/ ctx[1]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block$b(ctx);
					if_block1.c();
					if_block1.m(button, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (!current || dirty & /*clazz*/ 16) {
				attr_dev(button, "class", /*clazz*/ ctx[4]);
			}

			if (!current || dirty & /*disabled*/ 8) {
				prop_dev(button, "disabled", /*disabled*/ ctx[3]);
			}

			if (!current || dirty & /*clazz, i, t*/ 19) {
				toggle_class(button, "row", /*i*/ ctx[0] && /*t*/ ctx[1]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block0);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block0);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(button);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$h.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$h($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Button', slots, []);
	let { i, t, action, disabled } = $$props;
	let { class: clazz = '' } = $$props;

	$$self.$$.on_mount.push(function () {
		if (i === undefined && !('i' in $$props || $$self.$$.bound[$$self.$$.props['i']])) {
			console.warn("<Button> was created without expected prop 'i'");
		}

		if (t === undefined && !('t' in $$props || $$self.$$.bound[$$self.$$.props['t']])) {
			console.warn("<Button> was created without expected prop 't'");
		}

		if (action === undefined && !('action' in $$props || $$self.$$.bound[$$self.$$.props['action']])) {
			console.warn("<Button> was created without expected prop 'action'");
		}

		if (disabled === undefined && !('disabled' in $$props || $$self.$$.bound[$$self.$$.props['disabled']])) {
			console.warn("<Button> was created without expected prop 'disabled'");
		}
	});

	const writable_props = ['i', 't', 'action', 'disabled', 'class'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Button> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('i' in $$props) $$invalidate(0, i = $$props.i);
		if ('t' in $$props) $$invalidate(1, t = $$props.t);
		if ('action' in $$props) $$invalidate(2, action = $$props.action);
		if ('disabled' in $$props) $$invalidate(3, disabled = $$props.disabled);
		if ('class' in $$props) $$invalidate(4, clazz = $$props.class);
	};

	$$self.$capture_state = () => ({ Icon, i, t, action, disabled, clazz });

	$$self.$inject_state = $$props => {
		if ('i' in $$props) $$invalidate(0, i = $$props.i);
		if ('t' in $$props) $$invalidate(1, t = $$props.t);
		if ('action' in $$props) $$invalidate(2, action = $$props.action);
		if ('disabled' in $$props) $$invalidate(3, disabled = $$props.disabled);
		if ('clazz' in $$props) $$invalidate(4, clazz = $$props.clazz);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [i, t, action, disabled, clazz];
}

class Button extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$h, create_fragment$h, safe_not_equal, {
			i: 0,
			t: 1,
			action: 2,
			disabled: 3,
			class: 4
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Button",
			options,
			id: create_fragment$h.name
		});
	}

	get i() {
		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set i(value) {
		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get t() {
		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set t(value) {
		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get action() {
		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set action(value) {
		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get disabled() {
		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set disabled(value) {
		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get class() {
		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set class(value) {
		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/components/UserCard.svelte generated by Svelte v3.59.2 */
const file$f = "src/components/UserCard.svelte";

// (11:0) {#if m_user}
function create_if_block_1$9(ctx) {
	let usermodal;
	let updating_users;
	let updating_show;
	let current;

	function usermodal_users_binding(value) {
		/*usermodal_users_binding*/ ctx[8](value);
	}

	function usermodal_show_binding(value) {
		/*usermodal_show_binding*/ ctx[9](value);
	}

	let usermodal_props = { data: /*user*/ ctx[1] };

	if (/*users*/ ctx[0] !== void 0) {
		usermodal_props.users = /*users*/ ctx[0];
	}

	if (/*m_user*/ ctx[2] !== void 0) {
		usermodal_props.show = /*m_user*/ ctx[2];
	}

	usermodal = new UserModal({ props: usermodal_props, $$inline: true });
	binding_callbacks.push(() => bind(usermodal, 'users', usermodal_users_binding));
	binding_callbacks.push(() => bind(usermodal, 'show', usermodal_show_binding));

	const block = {
		c: function create() {
			create_component(usermodal.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(usermodal, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const usermodal_changes = {};
			if (dirty & /*user*/ 2) usermodal_changes.data = /*user*/ ctx[1];

			if (!updating_users && dirty & /*users*/ 1) {
				updating_users = true;
				usermodal_changes.users = /*users*/ ctx[0];
				add_flush_callback(() => updating_users = false);
			}

			if (!updating_show && dirty & /*m_user*/ 4) {
				updating_show = true;
				usermodal_changes.show = /*m_user*/ ctx[2];
				add_flush_callback(() => updating_show = false);
			}

			usermodal.$set(usermodal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(usermodal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(usermodal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(usermodal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$9.name,
		type: "if",
		source: "(11:0) {#if m_user}",
		ctx
	});

	return block;
}

// (15:0) {#if password}
function create_if_block$a(ctx) {
	let modal;
	let updating_show;
	let current;

	function modal_show_binding(value) {
		/*modal_show_binding*/ ctx[10](value);
	}

	let modal_props = {
		$$slots: { default: [create_default_slot$6] },
		$$scope: { ctx }
	};

	if (/*password*/ ctx[3] !== void 0) {
		modal_props.show = /*password*/ ctx[3];
	}

	modal = new Modal({ props: modal_props, $$inline: true });
	binding_callbacks.push(() => bind(modal, 'show', modal_show_binding));

	const block = {
		c: function create() {
			create_component(modal.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(modal, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const modal_changes = {};

			if (dirty & /*$$scope, password*/ 2056) {
				modal_changes.$$scope = { dirty, ctx };
			}

			if (!updating_show && dirty & /*password*/ 8) {
				updating_show = true;
				modal_changes.show = /*password*/ ctx[3];
				add_flush_callback(() => updating_show = false);
			}

			modal.$set(modal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(modal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(modal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(modal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$a.name,
		type: "if",
		source: "(15:0) {#if password}",
		ctx
	});

	return block;
}

// (16:2) <Modal bind:show={password}>
function create_default_slot$6(ctx) {
	let t0;
	let b;
	let t1;

	const block = {
		c: function create() {
			t0 = text("Senha: ");
			b = element("b");
			t1 = text(/*password*/ ctx[3]);
			add_location(b, file$f, 16, 11, 480);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, b, anchor);
			append_dev(b, t1);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*password*/ 8) set_data_dev(t1, /*password*/ ctx[3]);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(b);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$6.name,
		type: "slot",
		source: "(16:2) <Modal bind:show={password}>",
		ctx
	});

	return block;
}

function create_fragment$g(ctx) {
	let div1;
	let h3;
	let t0_value = /*user*/ ctx[1].name + "";
	let t0;
	let t1;
	let t2_value = /*role_name*/ ctx[4][/*user*/ ctx[1].role] + "";
	let t2;
	let t3;
	let t4;
	let div0;
	let button0;
	let t5;
	let button1;
	let t6;
	let button2;
	let t7;
	let t8;
	let if_block1_anchor;
	let current;

	button0 = new Button({
			props: {
				action: /*show_password*/ ctx[6],
				i: "visibility"
			},
			$$inline: true
		});

	button1 = new Button({
			props: {
				action: /*edit_user*/ ctx[5],
				i: "edit",
				class: "blu",
				disabled: !/*user*/ ctx[1].editable
			},
			$$inline: true
		});

	button2 = new Button({
			props: {
				action: /*delete_user*/ ctx[7],
				i: "delete",
				class: "red",
				disabled: !/*user*/ ctx[1].editable
			},
			$$inline: true
		});

	let if_block0 = /*m_user*/ ctx[2] && create_if_block_1$9(ctx);
	let if_block1 = /*password*/ ctx[3] && create_if_block$a(ctx);

	const block = {
		c: function create() {
			div1 = element("div");
			h3 = element("h3");
			t0 = text(t0_value);
			t1 = text(" (");
			t2 = text(t2_value);
			t3 = text(")");
			t4 = space();
			div0 = element("div");
			create_component(button0.$$.fragment);
			t5 = space();
			create_component(button1.$$.fragment);
			t6 = space();
			create_component(button2.$$.fragment);
			t7 = space();
			if (if_block0) if_block0.c();
			t8 = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
			attr_dev(h3, "class", "oe");
			add_location(h3, file$f, 1, 2, 21);
			attr_dev(div0, "class", "row svelte-y4qmwa");
			add_location(div0, file$f, 3, 2, 83);
			attr_dev(div1, "class", "card");
			add_location(div1, file$f, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			append_dev(div1, h3);
			append_dev(h3, t0);
			append_dev(h3, t1);
			append_dev(h3, t2);
			append_dev(h3, t3);
			append_dev(div1, t4);
			append_dev(div1, div0);
			mount_component(button0, div0, null);
			append_dev(div0, t5);
			mount_component(button1, div0, null);
			append_dev(div0, t6);
			mount_component(button2, div0, null);
			insert_dev(target, t7, anchor);
			if (if_block0) if_block0.m(target, anchor);
			insert_dev(target, t8, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert_dev(target, if_block1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if ((!current || dirty & /*user*/ 2) && t0_value !== (t0_value = /*user*/ ctx[1].name + "")) set_data_dev(t0, t0_value);
			if ((!current || dirty & /*user*/ 2) && t2_value !== (t2_value = /*role_name*/ ctx[4][/*user*/ ctx[1].role] + "")) set_data_dev(t2, t2_value);
			const button1_changes = {};
			if (dirty & /*user*/ 2) button1_changes.disabled = !/*user*/ ctx[1].editable;
			button1.$set(button1_changes);
			const button2_changes = {};
			if (dirty & /*user*/ 2) button2_changes.disabled = !/*user*/ ctx[1].editable;
			button2.$set(button2_changes);

			if (/*m_user*/ ctx[2]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*m_user*/ 4) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_1$9(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(t8.parentNode, t8);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (/*password*/ ctx[3]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*password*/ 8) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block$a(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(button0.$$.fragment, local);
			transition_in(button1.$$.fragment, local);
			transition_in(button2.$$.fragment, local);
			transition_in(if_block0);
			transition_in(if_block1);
			current = true;
		},
		o: function outro(local) {
			transition_out(button0.$$.fragment, local);
			transition_out(button1.$$.fragment, local);
			transition_out(button2.$$.fragment, local);
			transition_out(if_block0);
			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			destroy_component(button0);
			destroy_component(button1);
			destroy_component(button2);
			if (detaching) detach_dev(t7);
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach_dev(t8);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach_dev(if_block1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$g.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$g($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('UserCard', slots, []);
	let { user, users } = $$props;
	let m_user, password;
	const role_name = { admin: 'Admin', portaria: 'Portaria' };

	function edit_user() {
		$$invalidate(2, m_user = true);
	}

	function show_password() {
		$$invalidate(3, password = user.password);
	}

	function delete_user() {
		if (!confirm('Certeza que deseja excluir?')) return;
		$$invalidate(0, users = users.filter(u => u.id != user.id));
		api(`user/${user.id}`, 'DELETE');
	}

	$$self.$$.on_mount.push(function () {
		if (user === undefined && !('user' in $$props || $$self.$$.bound[$$self.$$.props['user']])) {
			console.warn("<UserCard> was created without expected prop 'user'");
		}

		if (users === undefined && !('users' in $$props || $$self.$$.bound[$$self.$$.props['users']])) {
			console.warn("<UserCard> was created without expected prop 'users'");
		}
	});

	const writable_props = ['user', 'users'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<UserCard> was created with unknown prop '${key}'`);
	});

	function usermodal_users_binding(value) {
		users = value;
		$$invalidate(0, users);
	}

	function usermodal_show_binding(value) {
		m_user = value;
		$$invalidate(2, m_user);
	}

	function modal_show_binding(value) {
		password = value;
		$$invalidate(3, password);
	}

	$$self.$$set = $$props => {
		if ('user' in $$props) $$invalidate(1, user = $$props.user);
		if ('users' in $$props) $$invalidate(0, users = $$props.users);
	};

	$$self.$capture_state = () => ({
		UserModal,
		Button,
		Modal,
		api,
		user,
		users,
		m_user,
		password,
		role_name,
		edit_user,
		show_password,
		delete_user
	});

	$$self.$inject_state = $$props => {
		if ('user' in $$props) $$invalidate(1, user = $$props.user);
		if ('users' in $$props) $$invalidate(0, users = $$props.users);
		if ('m_user' in $$props) $$invalidate(2, m_user = $$props.m_user);
		if ('password' in $$props) $$invalidate(3, password = $$props.password);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		users,
		user,
		m_user,
		password,
		role_name,
		edit_user,
		show_password,
		delete_user,
		usermodal_users_binding,
		usermodal_show_binding,
		modal_show_binding
	];
}

class UserCard extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$g, create_fragment$g, safe_not_equal, { user: 1, users: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "UserCard",
			options,
			id: create_fragment$g.name
		});
	}

	get user() {
		throw new Error("<UserCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set user(value) {
		throw new Error("<UserCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get users() {
		throw new Error("<UserCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set users(value) {
		throw new Error("<UserCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/routes/Users.svelte generated by Svelte v3.59.2 */
const file$e = "src/routes/Users.svelte";

function get_each_context$5(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[6] = list[i];
	return child_ctx;
}

// (4:2) {#each users || [] as user}
function create_each_block$5(ctx) {
	let usercard;
	let updating_users;
	let current;

	function usercard_users_binding(value) {
		/*usercard_users_binding*/ ctx[3](value);
	}

	let usercard_props = { user: /*user*/ ctx[6] };

	if (/*users*/ ctx[0] !== void 0) {
		usercard_props.users = /*users*/ ctx[0];
	}

	usercard = new UserCard({ props: usercard_props, $$inline: true });
	binding_callbacks.push(() => bind(usercard, 'users', usercard_users_binding));

	const block = {
		c: function create() {
			create_component(usercard.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(usercard, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const usercard_changes = {};
			if (dirty & /*users*/ 1) usercard_changes.user = /*user*/ ctx[6];

			if (!updating_users && dirty & /*users*/ 1) {
				updating_users = true;
				usercard_changes.users = /*users*/ ctx[0];
				add_flush_callback(() => updating_users = false);
			}

			usercard.$set(usercard_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(usercard.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(usercard.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(usercard, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$5.name,
		type: "each",
		source: "(4:2) {#each users || [] as user}",
		ctx
	});

	return block;
}

// (9:0) {#if !users}
function create_if_block_1$8(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Carregando...");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$8.name,
		type: "if",
		source: "(9:0) {#if !users}",
		ctx
	});

	return block;
}

// (11:0) {#if m_user}
function create_if_block$9(ctx) {
	let usermodal;
	let updating_users;
	let updating_show;
	let current;

	function usermodal_users_binding(value) {
		/*usermodal_users_binding*/ ctx[4](value);
	}

	function usermodal_show_binding(value) {
		/*usermodal_show_binding*/ ctx[5](value);
	}

	let usermodal_props = {};

	if (/*users*/ ctx[0] !== void 0) {
		usermodal_props.users = /*users*/ ctx[0];
	}

	if (/*m_user*/ ctx[1] !== void 0) {
		usermodal_props.show = /*m_user*/ ctx[1];
	}

	usermodal = new UserModal({ props: usermodal_props, $$inline: true });
	binding_callbacks.push(() => bind(usermodal, 'users', usermodal_users_binding));
	binding_callbacks.push(() => bind(usermodal, 'show', usermodal_show_binding));

	const block = {
		c: function create() {
			create_component(usermodal.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(usermodal, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const usermodal_changes = {};

			if (!updating_users && dirty & /*users*/ 1) {
				updating_users = true;
				usermodal_changes.users = /*users*/ ctx[0];
				add_flush_callback(() => updating_users = false);
			}

			if (!updating_show && dirty & /*m_user*/ 2) {
				updating_show = true;
				usermodal_changes.show = /*m_user*/ ctx[1];
				add_flush_callback(() => updating_show = false);
			}

			usermodal.$set(usermodal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(usermodal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(usermodal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(usermodal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$9.name,
		type: "if",
		source: "(11:0) {#if m_user}",
		ctx
	});

	return block;
}

function create_fragment$f(ctx) {
	let button;
	let t0;
	let div;
	let t1;
	let t2;
	let if_block1_anchor;
	let current;

	button = new Button({
			props: {
				class: "grn",
				action: /*create_user*/ ctx[2],
				i: "add",
				t: "Novo Usuário"
			},
			$$inline: true
		});

	let each_value = /*users*/ ctx[0] || [];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	let if_block0 = !/*users*/ ctx[0] && create_if_block_1$8(ctx);
	let if_block1 = /*m_user*/ ctx[1] && create_if_block$9(ctx);

	const block = {
		c: function create() {
			create_component(button.$$.fragment);
			t0 = space();
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t1 = space();
			if (if_block0) if_block0.c();
			t2 = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
			attr_dev(div, "class", "flex-list");
			add_location(div, file$e, 2, 0, 70);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			mount_component(button, target, anchor);
			insert_dev(target, t0, anchor);
			insert_dev(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(div, null);
				}
			}

			insert_dev(target, t1, anchor);
			if (if_block0) if_block0.m(target, anchor);
			insert_dev(target, t2, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert_dev(target, if_block1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*users*/ 1) {
				each_value = /*users*/ ctx[0] || [];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$5(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$5(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			if (!/*users*/ ctx[0]) {
				if (if_block0) ; else {
					if_block0 = create_if_block_1$8(ctx);
					if_block0.c();
					if_block0.m(t2.parentNode, t2);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*m_user*/ ctx[1]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*m_user*/ 2) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block$9(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(button.$$.fragment, local);

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			transition_in(if_block1);
			current = true;
		},
		o: function outro(local) {
			transition_out(button.$$.fragment, local);
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(button, detaching);
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(div);
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(t1);
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach_dev(t2);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach_dev(if_block1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$f.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$f($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Users', slots, []);
	let users;
	let m_user;

	function create_user() {
		$$invalidate(1, m_user = true);
	}

	onMount(async _ => $$invalidate(0, users = (await api(`all-users`)).data.users));
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Users> was created with unknown prop '${key}'`);
	});

	function usercard_users_binding(value) {
		users = value;
		$$invalidate(0, users);
	}

	function usermodal_users_binding(value) {
		users = value;
		$$invalidate(0, users);
	}

	function usermodal_show_binding(value) {
		m_user = value;
		$$invalidate(1, m_user);
	}

	$$self.$capture_state = () => ({
		UserModal,
		UserCard,
		Button,
		api,
		onMount,
		users,
		m_user,
		create_user
	});

	$$self.$inject_state = $$props => {
		if ('users' in $$props) $$invalidate(0, users = $$props.users);
		if ('m_user' in $$props) $$invalidate(1, m_user = $$props.m_user);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		users,
		m_user,
		create_user,
		usercard_users_binding,
		usermodal_users_binding,
		usermodal_show_binding
	];
}

class Users extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$f, create_fragment$f, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Users",
			options,
			id: create_fragment$f.name
		});
	}
}

/* src/components/EventCard.svelte generated by Svelte v3.59.2 */
const file$d = "src/components/EventCard.svelte";

function create_fragment$e(ctx) {
	let div2;
	let div0;
	let img;
	let img_src_value;
	let t0;
	let div1;
	let h3;
	let t1_value = /*event*/ ctx[0].name + "";
	let t1;
	let t2;
	let p;
	let t3_value = (/*event*/ ctx[0].description || 'Sem descrição.') + "";
	let t3;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div2 = element("div");
			div0 = element("div");
			img = element("img");
			t0 = space();
			div1 = element("div");
			h3 = element("h3");
			t1 = text(t1_value);
			t2 = space();
			p = element("p");
			t3 = text(t3_value);
			if (!src_url_equal(img.src, img_src_value = /*event*/ ctx[0].image)) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "Sem imagem");
			attr_dev(img, "class", "svelte-7aw9mf");
			add_location(img, file$d, 2, 24, 118);
			attr_dev(div0, "class", "img-div svelte-7aw9mf");
			add_location(div0, file$d, 2, 2, 96);
			attr_dev(h3, "class", "oe");
			add_location(h3, file$d, 5, 4, 192);
			attr_dev(p, "class", "oe");
			add_location(p, file$d, 6, 4, 231);
			attr_dev(div1, "class", "info svelte-7aw9mf");
			add_location(div1, file$d, 4, 2, 169);
			attr_dev(div2, "class", "card svelte-7aw9mf");
			add_location(div2, file$d, 1, 0, 57);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div2, anchor);
			append_dev(div2, div0);
			append_dev(div0, img);
			append_dev(div2, t0);
			append_dev(div2, div1);
			append_dev(div1, h3);
			append_dev(h3, t1);
			append_dev(div1, t2);
			append_dev(div1, p);
			append_dev(p, t3);

			if (!mounted) {
				dispose = listen_dev(div2, "click", /*enter*/ ctx[1], false, false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*event*/ 1 && !src_url_equal(img.src, img_src_value = /*event*/ ctx[0].image)) {
				attr_dev(img, "src", img_src_value);
			}

			if (dirty & /*event*/ 1 && t1_value !== (t1_value = /*event*/ ctx[0].name + "")) set_data_dev(t1, t1_value);
			if (dirty & /*event*/ 1 && t3_value !== (t3_value = (/*event*/ ctx[0].description || 'Sem descrição.') + "")) set_data_dev(t3, t3_value);
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$e.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$e($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('EventCard', slots, []);
	let { event } = $$props;

	function enter() {
		navigate(`/evento/${event.id}`);
	}

	$$self.$$.on_mount.push(function () {
		if (event === undefined && !('event' in $$props || $$self.$$.bound[$$self.$$.props['event']])) {
			console.warn("<EventCard> was created without expected prop 'event'");
		}
	});

	const writable_props = ['event'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<EventCard> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('event' in $$props) $$invalidate(0, event = $$props.event);
	};

	$$self.$capture_state = () => ({ navigate, event, enter });

	$$self.$inject_state = $$props => {
		if ('event' in $$props) $$invalidate(0, event = $$props.event);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [event, enter];
}

class EventCard extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$e, create_fragment$e, safe_not_equal, { event: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "EventCard",
			options,
			id: create_fragment$e.name
		});
	}

	get event() {
		throw new Error("<EventCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set event(value) {
		throw new Error("<EventCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

var util;
(function (util) {
    util.assertEqual = (val) => val;
    function assertIs(_arg) { }
    util.assertIs = assertIs;
    function assertNever(_x) {
        throw new Error();
    }
    util.assertNever = assertNever;
    util.arrayToEnum = (items) => {
        const obj = {};
        for (const item of items) {
            obj[item] = item;
        }
        return obj;
    };
    util.getValidEnumValues = (obj) => {
        const validKeys = util.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
        const filtered = {};
        for (const k of validKeys) {
            filtered[k] = obj[k];
        }
        return util.objectValues(filtered);
    };
    util.objectValues = (obj) => {
        return util.objectKeys(obj).map(function (e) {
            return obj[e];
        });
    };
    util.objectKeys = typeof Object.keys === "function" // eslint-disable-line ban/ban
        ? (obj) => Object.keys(obj) // eslint-disable-line ban/ban
        : (object) => {
            const keys = [];
            for (const key in object) {
                if (Object.prototype.hasOwnProperty.call(object, key)) {
                    keys.push(key);
                }
            }
            return keys;
        };
    util.find = (arr, checker) => {
        for (const item of arr) {
            if (checker(item))
                return item;
        }
        return undefined;
    };
    util.isInteger = typeof Number.isInteger === "function"
        ? (val) => Number.isInteger(val) // eslint-disable-line ban/ban
        : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
    function joinValues(array, separator = " | ") {
        return array
            .map((val) => (typeof val === "string" ? `'${val}'` : val))
            .join(separator);
    }
    util.joinValues = joinValues;
    util.jsonStringifyReplacer = (_, value) => {
        if (typeof value === "bigint") {
            return value.toString();
        }
        return value;
    };
})(util || (util = {}));
var objectUtil;
(function (objectUtil) {
    objectUtil.mergeShapes = (first, second) => {
        return {
            ...first,
            ...second, // second overwrites first
        };
    };
})(objectUtil || (objectUtil = {}));
const ZodParsedType = util.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set",
]);
const getParsedType = (data) => {
    const t = typeof data;
    switch (t) {
        case "undefined":
            return ZodParsedType.undefined;
        case "string":
            return ZodParsedType.string;
        case "number":
            return isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
        case "boolean":
            return ZodParsedType.boolean;
        case "function":
            return ZodParsedType.function;
        case "bigint":
            return ZodParsedType.bigint;
        case "symbol":
            return ZodParsedType.symbol;
        case "object":
            if (Array.isArray(data)) {
                return ZodParsedType.array;
            }
            if (data === null) {
                return ZodParsedType.null;
            }
            if (data.then &&
                typeof data.then === "function" &&
                data.catch &&
                typeof data.catch === "function") {
                return ZodParsedType.promise;
            }
            if (typeof Map !== "undefined" && data instanceof Map) {
                return ZodParsedType.map;
            }
            if (typeof Set !== "undefined" && data instanceof Set) {
                return ZodParsedType.set;
            }
            if (typeof Date !== "undefined" && data instanceof Date) {
                return ZodParsedType.date;
            }
            return ZodParsedType.object;
        default:
            return ZodParsedType.unknown;
    }
};

const ZodIssueCode = util.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
    "not_finite",
]);
const quotelessJson = (obj) => {
    const json = JSON.stringify(obj, null, 2);
    return json.replace(/"([^"]+)":/g, "$1:");
};
class ZodError extends Error {
    constructor(issues) {
        super();
        this.issues = [];
        this.addIssue = (sub) => {
            this.issues = [...this.issues, sub];
        };
        this.addIssues = (subs = []) => {
            this.issues = [...this.issues, ...subs];
        };
        const actualProto = new.target.prototype;
        if (Object.setPrototypeOf) {
            // eslint-disable-next-line ban/ban
            Object.setPrototypeOf(this, actualProto);
        }
        else {
            this.__proto__ = actualProto;
        }
        this.name = "ZodError";
        this.issues = issues;
    }
    get errors() {
        return this.issues;
    }
    format(_mapper) {
        const mapper = _mapper ||
            function (issue) {
                return issue.message;
            };
        const fieldErrors = { _errors: [] };
        const processError = (error) => {
            for (const issue of error.issues) {
                if (issue.code === "invalid_union") {
                    issue.unionErrors.map(processError);
                }
                else if (issue.code === "invalid_return_type") {
                    processError(issue.returnTypeError);
                }
                else if (issue.code === "invalid_arguments") {
                    processError(issue.argumentsError);
                }
                else if (issue.path.length === 0) {
                    fieldErrors._errors.push(mapper(issue));
                }
                else {
                    let curr = fieldErrors;
                    let i = 0;
                    while (i < issue.path.length) {
                        const el = issue.path[i];
                        const terminal = i === issue.path.length - 1;
                        if (!terminal) {
                            curr[el] = curr[el] || { _errors: [] };
                            // if (typeof el === "string") {
                            //   curr[el] = curr[el] || { _errors: [] };
                            // } else if (typeof el === "number") {
                            //   const errorArray: any = [];
                            //   errorArray._errors = [];
                            //   curr[el] = curr[el] || errorArray;
                            // }
                        }
                        else {
                            curr[el] = curr[el] || { _errors: [] };
                            curr[el]._errors.push(mapper(issue));
                        }
                        curr = curr[el];
                        i++;
                    }
                }
            }
        };
        processError(this);
        return fieldErrors;
    }
    static assert(value) {
        if (!(value instanceof ZodError)) {
            throw new Error(`Not a ZodError: ${value}`);
        }
    }
    toString() {
        return this.message;
    }
    get message() {
        return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
        return this.issues.length === 0;
    }
    flatten(mapper = (issue) => issue.message) {
        const fieldErrors = {};
        const formErrors = [];
        for (const sub of this.issues) {
            if (sub.path.length > 0) {
                fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
                fieldErrors[sub.path[0]].push(mapper(sub));
            }
            else {
                formErrors.push(mapper(sub));
            }
        }
        return { formErrors, fieldErrors };
    }
    get formErrors() {
        return this.flatten();
    }
}
ZodError.create = (issues) => {
    const error = new ZodError(issues);
    return error;
};

const errorMap = (issue, _ctx) => {
    let message;
    switch (issue.code) {
        case ZodIssueCode.invalid_type:
            if (issue.received === ZodParsedType.undefined) {
                message = "Required";
            }
            else {
                message = `Expected ${issue.expected}, received ${issue.received}`;
            }
            break;
        case ZodIssueCode.invalid_literal:
            message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
            break;
        case ZodIssueCode.unrecognized_keys:
            message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
            break;
        case ZodIssueCode.invalid_union:
            message = `Invalid input`;
            break;
        case ZodIssueCode.invalid_union_discriminator:
            message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
            break;
        case ZodIssueCode.invalid_enum_value:
            message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
            break;
        case ZodIssueCode.invalid_arguments:
            message = `Invalid function arguments`;
            break;
        case ZodIssueCode.invalid_return_type:
            message = `Invalid function return type`;
            break;
        case ZodIssueCode.invalid_date:
            message = `Invalid date`;
            break;
        case ZodIssueCode.invalid_string:
            if (typeof issue.validation === "object") {
                if ("includes" in issue.validation) {
                    message = `Invalid input: must include "${issue.validation.includes}"`;
                    if (typeof issue.validation.position === "number") {
                        message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
                    }
                }
                else if ("startsWith" in issue.validation) {
                    message = `Invalid input: must start with "${issue.validation.startsWith}"`;
                }
                else if ("endsWith" in issue.validation) {
                    message = `Invalid input: must end with "${issue.validation.endsWith}"`;
                }
                else {
                    util.assertNever(issue.validation);
                }
            }
            else if (issue.validation !== "regex") {
                message = `Invalid ${issue.validation}`;
            }
            else {
                message = "Invalid";
            }
            break;
        case ZodIssueCode.too_small:
            if (issue.type === "array")
                message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
            else if (issue.type === "string")
                message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
            else if (issue.type === "number")
                message = `Number must be ${issue.exact
                    ? `exactly equal to `
                    : issue.inclusive
                        ? `greater than or equal to `
                        : `greater than `}${issue.minimum}`;
            else if (issue.type === "date")
                message = `Date must be ${issue.exact
                    ? `exactly equal to `
                    : issue.inclusive
                        ? `greater than or equal to `
                        : `greater than `}${new Date(Number(issue.minimum))}`;
            else
                message = "Invalid input";
            break;
        case ZodIssueCode.too_big:
            if (issue.type === "array")
                message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
            else if (issue.type === "string")
                message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
            else if (issue.type === "number")
                message = `Number must be ${issue.exact
                    ? `exactly`
                    : issue.inclusive
                        ? `less than or equal to`
                        : `less than`} ${issue.maximum}`;
            else if (issue.type === "bigint")
                message = `BigInt must be ${issue.exact
                    ? `exactly`
                    : issue.inclusive
                        ? `less than or equal to`
                        : `less than`} ${issue.maximum}`;
            else if (issue.type === "date")
                message = `Date must be ${issue.exact
                    ? `exactly`
                    : issue.inclusive
                        ? `smaller than or equal to`
                        : `smaller than`} ${new Date(Number(issue.maximum))}`;
            else
                message = "Invalid input";
            break;
        case ZodIssueCode.custom:
            message = `Invalid input`;
            break;
        case ZodIssueCode.invalid_intersection_types:
            message = `Intersection results could not be merged`;
            break;
        case ZodIssueCode.not_multiple_of:
            message = `Number must be a multiple of ${issue.multipleOf}`;
            break;
        case ZodIssueCode.not_finite:
            message = "Number must be finite";
            break;
        default:
            message = _ctx.defaultError;
            util.assertNever(issue);
    }
    return { message };
};

let overrideErrorMap = errorMap;
function setErrorMap(map) {
    overrideErrorMap = map;
}
function getErrorMap() {
    return overrideErrorMap;
}

const makeIssue = (params) => {
    const { data, path, errorMaps, issueData } = params;
    const fullPath = [...path, ...(issueData.path || [])];
    const fullIssue = {
        ...issueData,
        path: fullPath,
    };
    if (issueData.message !== undefined) {
        return {
            ...issueData,
            path: fullPath,
            message: issueData.message,
        };
    }
    let errorMessage = "";
    const maps = errorMaps
        .filter((m) => !!m)
        .slice()
        .reverse();
    for (const map of maps) {
        errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
    }
    return {
        ...issueData,
        path: fullPath,
        message: errorMessage,
    };
};
const EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
    const overrideMap = getErrorMap();
    const issue = makeIssue({
        issueData: issueData,
        data: ctx.data,
        path: ctx.path,
        errorMaps: [
            ctx.common.contextualErrorMap,
            ctx.schemaErrorMap,
            overrideMap,
            overrideMap === errorMap ? undefined : errorMap, // then global default map
        ].filter((x) => !!x),
    });
    ctx.common.issues.push(issue);
}
class ParseStatus {
    constructor() {
        this.value = "valid";
    }
    dirty() {
        if (this.value === "valid")
            this.value = "dirty";
    }
    abort() {
        if (this.value !== "aborted")
            this.value = "aborted";
    }
    static mergeArray(status, results) {
        const arrayValue = [];
        for (const s of results) {
            if (s.status === "aborted")
                return INVALID;
            if (s.status === "dirty")
                status.dirty();
            arrayValue.push(s.value);
        }
        return { status: status.value, value: arrayValue };
    }
    static async mergeObjectAsync(status, pairs) {
        const syncPairs = [];
        for (const pair of pairs) {
            const key = await pair.key;
            const value = await pair.value;
            syncPairs.push({
                key,
                value,
            });
        }
        return ParseStatus.mergeObjectSync(status, syncPairs);
    }
    static mergeObjectSync(status, pairs) {
        const finalObject = {};
        for (const pair of pairs) {
            const { key, value } = pair;
            if (key.status === "aborted")
                return INVALID;
            if (value.status === "aborted")
                return INVALID;
            if (key.status === "dirty")
                status.dirty();
            if (value.status === "dirty")
                status.dirty();
            if (key.value !== "__proto__" &&
                (typeof value.value !== "undefined" || pair.alwaysSet)) {
                finalObject[key.value] = value.value;
            }
        }
        return { status: status.value, value: finalObject };
    }
}
const INVALID = Object.freeze({
    status: "aborted",
});
const DIRTY = (value) => ({ status: "dirty", value });
const OK = (value) => ({ status: "valid", value });
const isAborted = (x) => x.status === "aborted";
const isDirty = (x) => x.status === "dirty";
const isValid = (x) => x.status === "valid";
const isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var errorUtil;
(function (errorUtil) {
    errorUtil.errToObj = (message) => typeof message === "string" ? { message } : message || {};
    errorUtil.toString = (message) => typeof message === "string" ? message : message === null || message === void 0 ? void 0 : message.message;
})(errorUtil || (errorUtil = {}));

var _ZodEnum_cache, _ZodNativeEnum_cache;
class ParseInputLazyPath {
    constructor(parent, value, path, key) {
        this._cachedPath = [];
        this.parent = parent;
        this.data = value;
        this._path = path;
        this._key = key;
    }
    get path() {
        if (!this._cachedPath.length) {
            if (this._key instanceof Array) {
                this._cachedPath.push(...this._path, ...this._key);
            }
            else {
                this._cachedPath.push(...this._path, this._key);
            }
        }
        return this._cachedPath;
    }
}
const handleResult = (ctx, result) => {
    if (isValid(result)) {
        return { success: true, data: result.value };
    }
    else {
        if (!ctx.common.issues.length) {
            throw new Error("Validation failed but no issues detected.");
        }
        return {
            success: false,
            get error() {
                if (this._error)
                    return this._error;
                const error = new ZodError(ctx.common.issues);
                this._error = error;
                return this._error;
            },
        };
    }
};
function processCreateParams(params) {
    if (!params)
        return {};
    const { errorMap, invalid_type_error, required_error, description } = params;
    if (errorMap && (invalid_type_error || required_error)) {
        throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
    }
    if (errorMap)
        return { errorMap: errorMap, description };
    const customMap = (iss, ctx) => {
        var _a, _b;
        const { message } = params;
        if (iss.code === "invalid_enum_value") {
            return { message: message !== null && message !== void 0 ? message : ctx.defaultError };
        }
        if (typeof ctx.data === "undefined") {
            return { message: (_a = message !== null && message !== void 0 ? message : required_error) !== null && _a !== void 0 ? _a : ctx.defaultError };
        }
        if (iss.code !== "invalid_type")
            return { message: ctx.defaultError };
        return { message: (_b = message !== null && message !== void 0 ? message : invalid_type_error) !== null && _b !== void 0 ? _b : ctx.defaultError };
    };
    return { errorMap: customMap, description };
}
class ZodType {
    constructor(def) {
        /** Alias of safeParseAsync */
        this.spa = this.safeParseAsync;
        this._def = def;
        this.parse = this.parse.bind(this);
        this.safeParse = this.safeParse.bind(this);
        this.parseAsync = this.parseAsync.bind(this);
        this.safeParseAsync = this.safeParseAsync.bind(this);
        this.spa = this.spa.bind(this);
        this.refine = this.refine.bind(this);
        this.refinement = this.refinement.bind(this);
        this.superRefine = this.superRefine.bind(this);
        this.optional = this.optional.bind(this);
        this.nullable = this.nullable.bind(this);
        this.nullish = this.nullish.bind(this);
        this.array = this.array.bind(this);
        this.promise = this.promise.bind(this);
        this.or = this.or.bind(this);
        this.and = this.and.bind(this);
        this.transform = this.transform.bind(this);
        this.brand = this.brand.bind(this);
        this.default = this.default.bind(this);
        this.catch = this.catch.bind(this);
        this.describe = this.describe.bind(this);
        this.pipe = this.pipe.bind(this);
        this.readonly = this.readonly.bind(this);
        this.isNullable = this.isNullable.bind(this);
        this.isOptional = this.isOptional.bind(this);
    }
    get description() {
        return this._def.description;
    }
    _getType(input) {
        return getParsedType(input.data);
    }
    _getOrReturnCtx(input, ctx) {
        return (ctx || {
            common: input.parent.common,
            data: input.data,
            parsedType: getParsedType(input.data),
            schemaErrorMap: this._def.errorMap,
            path: input.path,
            parent: input.parent,
        });
    }
    _processInputParams(input) {
        return {
            status: new ParseStatus(),
            ctx: {
                common: input.parent.common,
                data: input.data,
                parsedType: getParsedType(input.data),
                schemaErrorMap: this._def.errorMap,
                path: input.path,
                parent: input.parent,
            },
        };
    }
    _parseSync(input) {
        const result = this._parse(input);
        if (isAsync(result)) {
            throw new Error("Synchronous parse encountered promise.");
        }
        return result;
    }
    _parseAsync(input) {
        const result = this._parse(input);
        return Promise.resolve(result);
    }
    parse(data, params) {
        const result = this.safeParse(data, params);
        if (result.success)
            return result.data;
        throw result.error;
    }
    safeParse(data, params) {
        var _a;
        const ctx = {
            common: {
                issues: [],
                async: (_a = params === null || params === void 0 ? void 0 : params.async) !== null && _a !== void 0 ? _a : false,
                contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
            },
            path: (params === null || params === void 0 ? void 0 : params.path) || [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data,
            parsedType: getParsedType(data),
        };
        const result = this._parseSync({ data, path: ctx.path, parent: ctx });
        return handleResult(ctx, result);
    }
    async parseAsync(data, params) {
        const result = await this.safeParseAsync(data, params);
        if (result.success)
            return result.data;
        throw result.error;
    }
    async safeParseAsync(data, params) {
        const ctx = {
            common: {
                issues: [],
                contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
                async: true,
            },
            path: (params === null || params === void 0 ? void 0 : params.path) || [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data,
            parsedType: getParsedType(data),
        };
        const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
        const result = await (isAsync(maybeAsyncResult)
            ? maybeAsyncResult
            : Promise.resolve(maybeAsyncResult));
        return handleResult(ctx, result);
    }
    refine(check, message) {
        const getIssueProperties = (val) => {
            if (typeof message === "string" || typeof message === "undefined") {
                return { message };
            }
            else if (typeof message === "function") {
                return message(val);
            }
            else {
                return message;
            }
        };
        return this._refinement((val, ctx) => {
            const result = check(val);
            const setError = () => ctx.addIssue({
                code: ZodIssueCode.custom,
                ...getIssueProperties(val),
            });
            if (typeof Promise !== "undefined" && result instanceof Promise) {
                return result.then((data) => {
                    if (!data) {
                        setError();
                        return false;
                    }
                    else {
                        return true;
                    }
                });
            }
            if (!result) {
                setError();
                return false;
            }
            else {
                return true;
            }
        });
    }
    refinement(check, refinementData) {
        return this._refinement((val, ctx) => {
            if (!check(val)) {
                ctx.addIssue(typeof refinementData === "function"
                    ? refinementData(val, ctx)
                    : refinementData);
                return false;
            }
            else {
                return true;
            }
        });
    }
    _refinement(refinement) {
        return new ZodEffects({
            schema: this,
            typeName: ZodFirstPartyTypeKind.ZodEffects,
            effect: { type: "refinement", refinement },
        });
    }
    superRefine(refinement) {
        return this._refinement(refinement);
    }
    optional() {
        return ZodOptional.create(this, this._def);
    }
    nullable() {
        return ZodNullable.create(this, this._def);
    }
    nullish() {
        return this.nullable().optional();
    }
    array() {
        return ZodArray.create(this, this._def);
    }
    promise() {
        return ZodPromise.create(this, this._def);
    }
    or(option) {
        return ZodUnion.create([this, option], this._def);
    }
    and(incoming) {
        return ZodIntersection.create(this, incoming, this._def);
    }
    transform(transform) {
        return new ZodEffects({
            ...processCreateParams(this._def),
            schema: this,
            typeName: ZodFirstPartyTypeKind.ZodEffects,
            effect: { type: "transform", transform },
        });
    }
    default(def) {
        const defaultValueFunc = typeof def === "function" ? def : () => def;
        return new ZodDefault({
            ...processCreateParams(this._def),
            innerType: this,
            defaultValue: defaultValueFunc,
            typeName: ZodFirstPartyTypeKind.ZodDefault,
        });
    }
    brand() {
        return new ZodBranded({
            typeName: ZodFirstPartyTypeKind.ZodBranded,
            type: this,
            ...processCreateParams(this._def),
        });
    }
    catch(def) {
        const catchValueFunc = typeof def === "function" ? def : () => def;
        return new ZodCatch({
            ...processCreateParams(this._def),
            innerType: this,
            catchValue: catchValueFunc,
            typeName: ZodFirstPartyTypeKind.ZodCatch,
        });
    }
    describe(description) {
        const This = this.constructor;
        return new This({
            ...this._def,
            description,
        });
    }
    pipe(target) {
        return ZodPipeline.create(this, target);
    }
    readonly() {
        return ZodReadonly.create(this);
    }
    isOptional() {
        return this.safeParse(undefined).success;
    }
    isNullable() {
        return this.safeParse(null).success;
    }
}
const cuidRegex = /^c[^\s-]{8,}$/i;
const cuid2Regex = /^[0-9a-z]+$/;
const ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/;
// const uuidRegex =
//   /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i;
const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
const nanoidRegex = /^[a-z0-9_-]{21}$/i;
const durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
// from https://stackoverflow.com/a/46181/1550155
// old version: too slow, didn't support unicode
// const emailRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
//old email regex
// const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@((?!-)([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{1,})[^-<>()[\].,;:\s@"]$/i;
// eslint-disable-next-line
// const emailRegex =
//   /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\])|(\[IPv6:(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))\])|([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])*(\.[A-Za-z]{2,})+))$/;
// const emailRegex =
//   /^[a-zA-Z0-9\.\!\#\$\%\&\'\*\+\/\=\?\^\_\`\{\|\}\~\-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
// const emailRegex =
//   /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
const emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
// const emailRegex =
//   /^[a-z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9\-]+)*$/i;
// from https://thekevinscott.com/emojis-in-javascript/#writing-a-regular-expression
const _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
let emojiRegex;
// faster, simpler, safer
const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
const ipv6Regex = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
// https://stackoverflow.com/questions/7860392/determine-if-string-is-in-base64-using-javascript
const base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
// simple
// const dateRegexSource = `\\d{4}-\\d{2}-\\d{2}`;
// no leap year validation
// const dateRegexSource = `\\d{4}-((0[13578]|10|12)-31|(0[13-9]|1[0-2])-30|(0[1-9]|1[0-2])-(0[1-9]|1\\d|2\\d))`;
// with leap year validation
const dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
const dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
    // let regex = `\\d{2}:\\d{2}:\\d{2}`;
    let regex = `([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d`;
    if (args.precision) {
        regex = `${regex}\\.\\d{${args.precision}}`;
    }
    else if (args.precision == null) {
        regex = `${regex}(\\.\\d+)?`;
    }
    return regex;
}
function timeRegex(args) {
    return new RegExp(`^${timeRegexSource(args)}$`);
}
// Adapted from https://stackoverflow.com/a/3143231
function datetimeRegex(args) {
    let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
    const opts = [];
    opts.push(args.local ? `Z?` : `Z`);
    if (args.offset)
        opts.push(`([+-]\\d{2}:?\\d{2})`);
    regex = `${regex}(${opts.join("|")})`;
    return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
    if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
        return true;
    }
    if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
        return true;
    }
    return false;
}
class ZodString extends ZodType {
    _parse(input) {
        if (this._def.coerce) {
            input.data = String(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.string) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.string,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const status = new ParseStatus();
        let ctx = undefined;
        for (const check of this._def.checks) {
            if (check.kind === "min") {
                if (input.data.length < check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_small,
                        minimum: check.value,
                        type: "string",
                        inclusive: true,
                        exact: false,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                if (input.data.length > check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_big,
                        maximum: check.value,
                        type: "string",
                        inclusive: true,
                        exact: false,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "length") {
                const tooBig = input.data.length > check.value;
                const tooSmall = input.data.length < check.value;
                if (tooBig || tooSmall) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    if (tooBig) {
                        addIssueToContext(ctx, {
                            code: ZodIssueCode.too_big,
                            maximum: check.value,
                            type: "string",
                            inclusive: true,
                            exact: true,
                            message: check.message,
                        });
                    }
                    else if (tooSmall) {
                        addIssueToContext(ctx, {
                            code: ZodIssueCode.too_small,
                            minimum: check.value,
                            type: "string",
                            inclusive: true,
                            exact: true,
                            message: check.message,
                        });
                    }
                    status.dirty();
                }
            }
            else if (check.kind === "email") {
                if (!emailRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "email",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "emoji") {
                if (!emojiRegex) {
                    emojiRegex = new RegExp(_emojiRegex, "u");
                }
                if (!emojiRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "emoji",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "uuid") {
                if (!uuidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "uuid",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "nanoid") {
                if (!nanoidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "nanoid",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "cuid") {
                if (!cuidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "cuid",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "cuid2") {
                if (!cuid2Regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "cuid2",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "ulid") {
                if (!ulidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "ulid",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "url") {
                try {
                    new URL(input.data);
                }
                catch (_a) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "url",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "regex") {
                check.regex.lastIndex = 0;
                const testResult = check.regex.test(input.data);
                if (!testResult) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "regex",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "trim") {
                input.data = input.data.trim();
            }
            else if (check.kind === "includes") {
                if (!input.data.includes(check.value, check.position)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_string,
                        validation: { includes: check.value, position: check.position },
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "toLowerCase") {
                input.data = input.data.toLowerCase();
            }
            else if (check.kind === "toUpperCase") {
                input.data = input.data.toUpperCase();
            }
            else if (check.kind === "startsWith") {
                if (!input.data.startsWith(check.value)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_string,
                        validation: { startsWith: check.value },
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "endsWith") {
                if (!input.data.endsWith(check.value)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_string,
                        validation: { endsWith: check.value },
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "datetime") {
                const regex = datetimeRegex(check);
                if (!regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_string,
                        validation: "datetime",
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "date") {
                const regex = dateRegex;
                if (!regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_string,
                        validation: "date",
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "time") {
                const regex = timeRegex(check);
                if (!regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_string,
                        validation: "time",
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "duration") {
                if (!durationRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "duration",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "ip") {
                if (!isValidIP(input.data, check.version)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "ip",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "base64") {
                if (!base64Regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "base64",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else {
                util.assertNever(check);
            }
        }
        return { status: status.value, value: input.data };
    }
    _regex(regex, validation, message) {
        return this.refinement((data) => regex.test(data), {
            validation,
            code: ZodIssueCode.invalid_string,
            ...errorUtil.errToObj(message),
        });
    }
    _addCheck(check) {
        return new ZodString({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    email(message) {
        return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
    }
    url(message) {
        return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
    }
    emoji(message) {
        return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
    }
    uuid(message) {
        return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
    }
    nanoid(message) {
        return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
    }
    cuid(message) {
        return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
    }
    cuid2(message) {
        return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
    }
    ulid(message) {
        return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
    }
    base64(message) {
        return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
    }
    ip(options) {
        return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
    }
    datetime(options) {
        var _a, _b;
        if (typeof options === "string") {
            return this._addCheck({
                kind: "datetime",
                precision: null,
                offset: false,
                local: false,
                message: options,
            });
        }
        return this._addCheck({
            kind: "datetime",
            precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
            offset: (_a = options === null || options === void 0 ? void 0 : options.offset) !== null && _a !== void 0 ? _a : false,
            local: (_b = options === null || options === void 0 ? void 0 : options.local) !== null && _b !== void 0 ? _b : false,
            ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message),
        });
    }
    date(message) {
        return this._addCheck({ kind: "date", message });
    }
    time(options) {
        if (typeof options === "string") {
            return this._addCheck({
                kind: "time",
                precision: null,
                message: options,
            });
        }
        return this._addCheck({
            kind: "time",
            precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
            ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message),
        });
    }
    duration(message) {
        return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
    }
    regex(regex, message) {
        return this._addCheck({
            kind: "regex",
            regex: regex,
            ...errorUtil.errToObj(message),
        });
    }
    includes(value, options) {
        return this._addCheck({
            kind: "includes",
            value: value,
            position: options === null || options === void 0 ? void 0 : options.position,
            ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message),
        });
    }
    startsWith(value, message) {
        return this._addCheck({
            kind: "startsWith",
            value: value,
            ...errorUtil.errToObj(message),
        });
    }
    endsWith(value, message) {
        return this._addCheck({
            kind: "endsWith",
            value: value,
            ...errorUtil.errToObj(message),
        });
    }
    min(minLength, message) {
        return this._addCheck({
            kind: "min",
            value: minLength,
            ...errorUtil.errToObj(message),
        });
    }
    max(maxLength, message) {
        return this._addCheck({
            kind: "max",
            value: maxLength,
            ...errorUtil.errToObj(message),
        });
    }
    length(len, message) {
        return this._addCheck({
            kind: "length",
            value: len,
            ...errorUtil.errToObj(message),
        });
    }
    /**
     * @deprecated Use z.string().min(1) instead.
     * @see {@link ZodString.min}
     */
    nonempty(message) {
        return this.min(1, errorUtil.errToObj(message));
    }
    trim() {
        return new ZodString({
            ...this._def,
            checks: [...this._def.checks, { kind: "trim" }],
        });
    }
    toLowerCase() {
        return new ZodString({
            ...this._def,
            checks: [...this._def.checks, { kind: "toLowerCase" }],
        });
    }
    toUpperCase() {
        return new ZodString({
            ...this._def,
            checks: [...this._def.checks, { kind: "toUpperCase" }],
        });
    }
    get isDatetime() {
        return !!this._def.checks.find((ch) => ch.kind === "datetime");
    }
    get isDate() {
        return !!this._def.checks.find((ch) => ch.kind === "date");
    }
    get isTime() {
        return !!this._def.checks.find((ch) => ch.kind === "time");
    }
    get isDuration() {
        return !!this._def.checks.find((ch) => ch.kind === "duration");
    }
    get isEmail() {
        return !!this._def.checks.find((ch) => ch.kind === "email");
    }
    get isURL() {
        return !!this._def.checks.find((ch) => ch.kind === "url");
    }
    get isEmoji() {
        return !!this._def.checks.find((ch) => ch.kind === "emoji");
    }
    get isUUID() {
        return !!this._def.checks.find((ch) => ch.kind === "uuid");
    }
    get isNANOID() {
        return !!this._def.checks.find((ch) => ch.kind === "nanoid");
    }
    get isCUID() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid");
    }
    get isCUID2() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid2");
    }
    get isULID() {
        return !!this._def.checks.find((ch) => ch.kind === "ulid");
    }
    get isIP() {
        return !!this._def.checks.find((ch) => ch.kind === "ip");
    }
    get isBase64() {
        return !!this._def.checks.find((ch) => ch.kind === "base64");
    }
    get minLength() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min;
    }
    get maxLength() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max;
    }
}
ZodString.create = (params) => {
    var _a;
    return new ZodString({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodString,
        coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
        ...processCreateParams(params),
    });
};
// https://stackoverflow.com/questions/3966484/why-does-modulus-operator-return-fractional-number-in-javascript/31711034#31711034
function floatSafeRemainder(val, step) {
    const valDecCount = (val.toString().split(".")[1] || "").length;
    const stepDecCount = (step.toString().split(".")[1] || "").length;
    const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
    const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
    const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
    return (valInt % stepInt) / Math.pow(10, decCount);
}
class ZodNumber extends ZodType {
    constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
        this.step = this.multipleOf;
    }
    _parse(input) {
        if (this._def.coerce) {
            input.data = Number(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.number) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.number,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        let ctx = undefined;
        const status = new ParseStatus();
        for (const check of this._def.checks) {
            if (check.kind === "int") {
                if (!util.isInteger(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_type,
                        expected: "integer",
                        received: "float",
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "min") {
                const tooSmall = check.inclusive
                    ? input.data < check.value
                    : input.data <= check.value;
                if (tooSmall) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_small,
                        minimum: check.value,
                        type: "number",
                        inclusive: check.inclusive,
                        exact: false,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                const tooBig = check.inclusive
                    ? input.data > check.value
                    : input.data >= check.value;
                if (tooBig) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_big,
                        maximum: check.value,
                        type: "number",
                        inclusive: check.inclusive,
                        exact: false,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "multipleOf") {
                if (floatSafeRemainder(input.data, check.value) !== 0) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.not_multiple_of,
                        multipleOf: check.value,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "finite") {
                if (!Number.isFinite(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.not_finite,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else {
                util.assertNever(check);
            }
        }
        return { status: status.value, value: input.data };
    }
    gte(value, message) {
        return this.setLimit("min", value, true, errorUtil.toString(message));
    }
    gt(value, message) {
        return this.setLimit("min", value, false, errorUtil.toString(message));
    }
    lte(value, message) {
        return this.setLimit("max", value, true, errorUtil.toString(message));
    }
    lt(value, message) {
        return this.setLimit("max", value, false, errorUtil.toString(message));
    }
    setLimit(kind, value, inclusive, message) {
        return new ZodNumber({
            ...this._def,
            checks: [
                ...this._def.checks,
                {
                    kind,
                    value,
                    inclusive,
                    message: errorUtil.toString(message),
                },
            ],
        });
    }
    _addCheck(check) {
        return new ZodNumber({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    int(message) {
        return this._addCheck({
            kind: "int",
            message: errorUtil.toString(message),
        });
    }
    positive(message) {
        return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: false,
            message: errorUtil.toString(message),
        });
    }
    negative(message) {
        return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: false,
            message: errorUtil.toString(message),
        });
    }
    nonpositive(message) {
        return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: true,
            message: errorUtil.toString(message),
        });
    }
    nonnegative(message) {
        return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: true,
            message: errorUtil.toString(message),
        });
    }
    multipleOf(value, message) {
        return this._addCheck({
            kind: "multipleOf",
            value: value,
            message: errorUtil.toString(message),
        });
    }
    finite(message) {
        return this._addCheck({
            kind: "finite",
            message: errorUtil.toString(message),
        });
    }
    safe(message) {
        return this._addCheck({
            kind: "min",
            inclusive: true,
            value: Number.MIN_SAFE_INTEGER,
            message: errorUtil.toString(message),
        })._addCheck({
            kind: "max",
            inclusive: true,
            value: Number.MAX_SAFE_INTEGER,
            message: errorUtil.toString(message),
        });
    }
    get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min;
    }
    get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max;
    }
    get isInt() {
        return !!this._def.checks.find((ch) => ch.kind === "int" ||
            (ch.kind === "multipleOf" && util.isInteger(ch.value)));
    }
    get isFinite() {
        let max = null, min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "finite" ||
                ch.kind === "int" ||
                ch.kind === "multipleOf") {
                return true;
            }
            else if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
            else if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return Number.isFinite(min) && Number.isFinite(max);
    }
}
ZodNumber.create = (params) => {
    return new ZodNumber({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodNumber,
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        ...processCreateParams(params),
    });
};
class ZodBigInt extends ZodType {
    constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
    }
    _parse(input) {
        if (this._def.coerce) {
            input.data = BigInt(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.bigint) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.bigint,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        let ctx = undefined;
        const status = new ParseStatus();
        for (const check of this._def.checks) {
            if (check.kind === "min") {
                const tooSmall = check.inclusive
                    ? input.data < check.value
                    : input.data <= check.value;
                if (tooSmall) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_small,
                        type: "bigint",
                        minimum: check.value,
                        inclusive: check.inclusive,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                const tooBig = check.inclusive
                    ? input.data > check.value
                    : input.data >= check.value;
                if (tooBig) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_big,
                        type: "bigint",
                        maximum: check.value,
                        inclusive: check.inclusive,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "multipleOf") {
                if (input.data % check.value !== BigInt(0)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.not_multiple_of,
                        multipleOf: check.value,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else {
                util.assertNever(check);
            }
        }
        return { status: status.value, value: input.data };
    }
    gte(value, message) {
        return this.setLimit("min", value, true, errorUtil.toString(message));
    }
    gt(value, message) {
        return this.setLimit("min", value, false, errorUtil.toString(message));
    }
    lte(value, message) {
        return this.setLimit("max", value, true, errorUtil.toString(message));
    }
    lt(value, message) {
        return this.setLimit("max", value, false, errorUtil.toString(message));
    }
    setLimit(kind, value, inclusive, message) {
        return new ZodBigInt({
            ...this._def,
            checks: [
                ...this._def.checks,
                {
                    kind,
                    value,
                    inclusive,
                    message: errorUtil.toString(message),
                },
            ],
        });
    }
    _addCheck(check) {
        return new ZodBigInt({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    positive(message) {
        return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: false,
            message: errorUtil.toString(message),
        });
    }
    negative(message) {
        return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: false,
            message: errorUtil.toString(message),
        });
    }
    nonpositive(message) {
        return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: true,
            message: errorUtil.toString(message),
        });
    }
    nonnegative(message) {
        return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: true,
            message: errorUtil.toString(message),
        });
    }
    multipleOf(value, message) {
        return this._addCheck({
            kind: "multipleOf",
            value,
            message: errorUtil.toString(message),
        });
    }
    get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min;
    }
    get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max;
    }
}
ZodBigInt.create = (params) => {
    var _a;
    return new ZodBigInt({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodBigInt,
        coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
        ...processCreateParams(params),
    });
};
class ZodBoolean extends ZodType {
    _parse(input) {
        if (this._def.coerce) {
            input.data = Boolean(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.boolean) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.boolean,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return OK(input.data);
    }
}
ZodBoolean.create = (params) => {
    return new ZodBoolean({
        typeName: ZodFirstPartyTypeKind.ZodBoolean,
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        ...processCreateParams(params),
    });
};
class ZodDate extends ZodType {
    _parse(input) {
        if (this._def.coerce) {
            input.data = new Date(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.date) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.date,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        if (isNaN(input.data.getTime())) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_date,
            });
            return INVALID;
        }
        const status = new ParseStatus();
        let ctx = undefined;
        for (const check of this._def.checks) {
            if (check.kind === "min") {
                if (input.data.getTime() < check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_small,
                        message: check.message,
                        inclusive: true,
                        exact: false,
                        minimum: check.value,
                        type: "date",
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                if (input.data.getTime() > check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_big,
                        message: check.message,
                        inclusive: true,
                        exact: false,
                        maximum: check.value,
                        type: "date",
                    });
                    status.dirty();
                }
            }
            else {
                util.assertNever(check);
            }
        }
        return {
            status: status.value,
            value: new Date(input.data.getTime()),
        };
    }
    _addCheck(check) {
        return new ZodDate({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    min(minDate, message) {
        return this._addCheck({
            kind: "min",
            value: minDate.getTime(),
            message: errorUtil.toString(message),
        });
    }
    max(maxDate, message) {
        return this._addCheck({
            kind: "max",
            value: maxDate.getTime(),
            message: errorUtil.toString(message),
        });
    }
    get minDate() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min != null ? new Date(min) : null;
    }
    get maxDate() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max != null ? new Date(max) : null;
    }
}
ZodDate.create = (params) => {
    return new ZodDate({
        checks: [],
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        typeName: ZodFirstPartyTypeKind.ZodDate,
        ...processCreateParams(params),
    });
};
class ZodSymbol extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.symbol) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.symbol,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return OK(input.data);
    }
}
ZodSymbol.create = (params) => {
    return new ZodSymbol({
        typeName: ZodFirstPartyTypeKind.ZodSymbol,
        ...processCreateParams(params),
    });
};
class ZodUndefined extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.undefined) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.undefined,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return OK(input.data);
    }
}
ZodUndefined.create = (params) => {
    return new ZodUndefined({
        typeName: ZodFirstPartyTypeKind.ZodUndefined,
        ...processCreateParams(params),
    });
};
class ZodNull extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.null) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.null,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return OK(input.data);
    }
}
ZodNull.create = (params) => {
    return new ZodNull({
        typeName: ZodFirstPartyTypeKind.ZodNull,
        ...processCreateParams(params),
    });
};
class ZodAny extends ZodType {
    constructor() {
        super(...arguments);
        // to prevent instances of other classes from extending ZodAny. this causes issues with catchall in ZodObject.
        this._any = true;
    }
    _parse(input) {
        return OK(input.data);
    }
}
ZodAny.create = (params) => {
    return new ZodAny({
        typeName: ZodFirstPartyTypeKind.ZodAny,
        ...processCreateParams(params),
    });
};
class ZodUnknown extends ZodType {
    constructor() {
        super(...arguments);
        // required
        this._unknown = true;
    }
    _parse(input) {
        return OK(input.data);
    }
}
ZodUnknown.create = (params) => {
    return new ZodUnknown({
        typeName: ZodFirstPartyTypeKind.ZodUnknown,
        ...processCreateParams(params),
    });
};
class ZodNever extends ZodType {
    _parse(input) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.never,
            received: ctx.parsedType,
        });
        return INVALID;
    }
}
ZodNever.create = (params) => {
    return new ZodNever({
        typeName: ZodFirstPartyTypeKind.ZodNever,
        ...processCreateParams(params),
    });
};
class ZodVoid extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.undefined) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.void,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return OK(input.data);
    }
}
ZodVoid.create = (params) => {
    return new ZodVoid({
        typeName: ZodFirstPartyTypeKind.ZodVoid,
        ...processCreateParams(params),
    });
};
class ZodArray extends ZodType {
    _parse(input) {
        const { ctx, status } = this._processInputParams(input);
        const def = this._def;
        if (ctx.parsedType !== ZodParsedType.array) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.array,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        if (def.exactLength !== null) {
            const tooBig = ctx.data.length > def.exactLength.value;
            const tooSmall = ctx.data.length < def.exactLength.value;
            if (tooBig || tooSmall) {
                addIssueToContext(ctx, {
                    code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
                    minimum: (tooSmall ? def.exactLength.value : undefined),
                    maximum: (tooBig ? def.exactLength.value : undefined),
                    type: "array",
                    inclusive: true,
                    exact: true,
                    message: def.exactLength.message,
                });
                status.dirty();
            }
        }
        if (def.minLength !== null) {
            if (ctx.data.length < def.minLength.value) {
                addIssueToContext(ctx, {
                    code: ZodIssueCode.too_small,
                    minimum: def.minLength.value,
                    type: "array",
                    inclusive: true,
                    exact: false,
                    message: def.minLength.message,
                });
                status.dirty();
            }
        }
        if (def.maxLength !== null) {
            if (ctx.data.length > def.maxLength.value) {
                addIssueToContext(ctx, {
                    code: ZodIssueCode.too_big,
                    maximum: def.maxLength.value,
                    type: "array",
                    inclusive: true,
                    exact: false,
                    message: def.maxLength.message,
                });
                status.dirty();
            }
        }
        if (ctx.common.async) {
            return Promise.all([...ctx.data].map((item, i) => {
                return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
            })).then((result) => {
                return ParseStatus.mergeArray(status, result);
            });
        }
        const result = [...ctx.data].map((item, i) => {
            return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
        });
        return ParseStatus.mergeArray(status, result);
    }
    get element() {
        return this._def.type;
    }
    min(minLength, message) {
        return new ZodArray({
            ...this._def,
            minLength: { value: minLength, message: errorUtil.toString(message) },
        });
    }
    max(maxLength, message) {
        return new ZodArray({
            ...this._def,
            maxLength: { value: maxLength, message: errorUtil.toString(message) },
        });
    }
    length(len, message) {
        return new ZodArray({
            ...this._def,
            exactLength: { value: len, message: errorUtil.toString(message) },
        });
    }
    nonempty(message) {
        return this.min(1, message);
    }
}
ZodArray.create = (schema, params) => {
    return new ZodArray({
        type: schema,
        minLength: null,
        maxLength: null,
        exactLength: null,
        typeName: ZodFirstPartyTypeKind.ZodArray,
        ...processCreateParams(params),
    });
};
function deepPartialify(schema) {
    if (schema instanceof ZodObject) {
        const newShape = {};
        for (const key in schema.shape) {
            const fieldSchema = schema.shape[key];
            newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
        }
        return new ZodObject({
            ...schema._def,
            shape: () => newShape,
        });
    }
    else if (schema instanceof ZodArray) {
        return new ZodArray({
            ...schema._def,
            type: deepPartialify(schema.element),
        });
    }
    else if (schema instanceof ZodOptional) {
        return ZodOptional.create(deepPartialify(schema.unwrap()));
    }
    else if (schema instanceof ZodNullable) {
        return ZodNullable.create(deepPartialify(schema.unwrap()));
    }
    else if (schema instanceof ZodTuple) {
        return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
    }
    else {
        return schema;
    }
}
class ZodObject extends ZodType {
    constructor() {
        super(...arguments);
        this._cached = null;
        /**
         * @deprecated In most cases, this is no longer needed - unknown properties are now silently stripped.
         * If you want to pass through unknown properties, use `.passthrough()` instead.
         */
        this.nonstrict = this.passthrough;
        // extend<
        //   Augmentation extends ZodRawShape,
        //   NewOutput extends util.flatten<{
        //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
        //       ? Augmentation[k]["_output"]
        //       : k extends keyof Output
        //       ? Output[k]
        //       : never;
        //   }>,
        //   NewInput extends util.flatten<{
        //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
        //       ? Augmentation[k]["_input"]
        //       : k extends keyof Input
        //       ? Input[k]
        //       : never;
        //   }>
        // >(
        //   augmentation: Augmentation
        // ): ZodObject<
        //   extendShape<T, Augmentation>,
        //   UnknownKeys,
        //   Catchall,
        //   NewOutput,
        //   NewInput
        // > {
        //   return new ZodObject({
        //     ...this._def,
        //     shape: () => ({
        //       ...this._def.shape(),
        //       ...augmentation,
        //     }),
        //   }) as any;
        // }
        /**
         * @deprecated Use `.extend` instead
         *  */
        this.augment = this.extend;
    }
    _getCached() {
        if (this._cached !== null)
            return this._cached;
        const shape = this._def.shape();
        const keys = util.objectKeys(shape);
        return (this._cached = { shape, keys });
    }
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.object) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.object,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const { status, ctx } = this._processInputParams(input);
        const { shape, keys: shapeKeys } = this._getCached();
        const extraKeys = [];
        if (!(this._def.catchall instanceof ZodNever &&
            this._def.unknownKeys === "strip")) {
            for (const key in ctx.data) {
                if (!shapeKeys.includes(key)) {
                    extraKeys.push(key);
                }
            }
        }
        const pairs = [];
        for (const key of shapeKeys) {
            const keyValidator = shape[key];
            const value = ctx.data[key];
            pairs.push({
                key: { status: "valid", value: key },
                value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
                alwaysSet: key in ctx.data,
            });
        }
        if (this._def.catchall instanceof ZodNever) {
            const unknownKeys = this._def.unknownKeys;
            if (unknownKeys === "passthrough") {
                for (const key of extraKeys) {
                    pairs.push({
                        key: { status: "valid", value: key },
                        value: { status: "valid", value: ctx.data[key] },
                    });
                }
            }
            else if (unknownKeys === "strict") {
                if (extraKeys.length > 0) {
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.unrecognized_keys,
                        keys: extraKeys,
                    });
                    status.dirty();
                }
            }
            else if (unknownKeys === "strip") ;
            else {
                throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
            }
        }
        else {
            // run catchall validation
            const catchall = this._def.catchall;
            for (const key of extraKeys) {
                const value = ctx.data[key];
                pairs.push({
                    key: { status: "valid", value: key },
                    value: catchall._parse(new ParseInputLazyPath(ctx, value, ctx.path, key) //, ctx.child(key), value, getParsedType(value)
                    ),
                    alwaysSet: key in ctx.data,
                });
            }
        }
        if (ctx.common.async) {
            return Promise.resolve()
                .then(async () => {
                const syncPairs = [];
                for (const pair of pairs) {
                    const key = await pair.key;
                    const value = await pair.value;
                    syncPairs.push({
                        key,
                        value,
                        alwaysSet: pair.alwaysSet,
                    });
                }
                return syncPairs;
            })
                .then((syncPairs) => {
                return ParseStatus.mergeObjectSync(status, syncPairs);
            });
        }
        else {
            return ParseStatus.mergeObjectSync(status, pairs);
        }
    }
    get shape() {
        return this._def.shape();
    }
    strict(message) {
        errorUtil.errToObj;
        return new ZodObject({
            ...this._def,
            unknownKeys: "strict",
            ...(message !== undefined
                ? {
                    errorMap: (issue, ctx) => {
                        var _a, _b, _c, _d;
                        const defaultError = (_c = (_b = (_a = this._def).errorMap) === null || _b === void 0 ? void 0 : _b.call(_a, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
                        if (issue.code === "unrecognized_keys")
                            return {
                                message: (_d = errorUtil.errToObj(message).message) !== null && _d !== void 0 ? _d : defaultError,
                            };
                        return {
                            message: defaultError,
                        };
                    },
                }
                : {}),
        });
    }
    strip() {
        return new ZodObject({
            ...this._def,
            unknownKeys: "strip",
        });
    }
    passthrough() {
        return new ZodObject({
            ...this._def,
            unknownKeys: "passthrough",
        });
    }
    // const AugmentFactory =
    //   <Def extends ZodObjectDef>(def: Def) =>
    //   <Augmentation extends ZodRawShape>(
    //     augmentation: Augmentation
    //   ): ZodObject<
    //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
    //     Def["unknownKeys"],
    //     Def["catchall"]
    //   > => {
    //     return new ZodObject({
    //       ...def,
    //       shape: () => ({
    //         ...def.shape(),
    //         ...augmentation,
    //       }),
    //     }) as any;
    //   };
    extend(augmentation) {
        return new ZodObject({
            ...this._def,
            shape: () => ({
                ...this._def.shape(),
                ...augmentation,
            }),
        });
    }
    /**
     * Prior to zod@1.0.12 there was a bug in the
     * inferred type of merged objects. Please
     * upgrade if you are experiencing issues.
     */
    merge(merging) {
        const merged = new ZodObject({
            unknownKeys: merging._def.unknownKeys,
            catchall: merging._def.catchall,
            shape: () => ({
                ...this._def.shape(),
                ...merging._def.shape(),
            }),
            typeName: ZodFirstPartyTypeKind.ZodObject,
        });
        return merged;
    }
    // merge<
    //   Incoming extends AnyZodObject,
    //   Augmentation extends Incoming["shape"],
    //   NewOutput extends {
    //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
    //       ? Augmentation[k]["_output"]
    //       : k extends keyof Output
    //       ? Output[k]
    //       : never;
    //   },
    //   NewInput extends {
    //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
    //       ? Augmentation[k]["_input"]
    //       : k extends keyof Input
    //       ? Input[k]
    //       : never;
    //   }
    // >(
    //   merging: Incoming
    // ): ZodObject<
    //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
    //   Incoming["_def"]["unknownKeys"],
    //   Incoming["_def"]["catchall"],
    //   NewOutput,
    //   NewInput
    // > {
    //   const merged: any = new ZodObject({
    //     unknownKeys: merging._def.unknownKeys,
    //     catchall: merging._def.catchall,
    //     shape: () =>
    //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
    //     typeName: ZodFirstPartyTypeKind.ZodObject,
    //   }) as any;
    //   return merged;
    // }
    setKey(key, schema) {
        return this.augment({ [key]: schema });
    }
    // merge<Incoming extends AnyZodObject>(
    //   merging: Incoming
    // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
    // ZodObject<
    //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
    //   Incoming["_def"]["unknownKeys"],
    //   Incoming["_def"]["catchall"]
    // > {
    //   // const mergedShape = objectUtil.mergeShapes(
    //   //   this._def.shape(),
    //   //   merging._def.shape()
    //   // );
    //   const merged: any = new ZodObject({
    //     unknownKeys: merging._def.unknownKeys,
    //     catchall: merging._def.catchall,
    //     shape: () =>
    //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
    //     typeName: ZodFirstPartyTypeKind.ZodObject,
    //   }) as any;
    //   return merged;
    // }
    catchall(index) {
        return new ZodObject({
            ...this._def,
            catchall: index,
        });
    }
    pick(mask) {
        const shape = {};
        util.objectKeys(mask).forEach((key) => {
            if (mask[key] && this.shape[key]) {
                shape[key] = this.shape[key];
            }
        });
        return new ZodObject({
            ...this._def,
            shape: () => shape,
        });
    }
    omit(mask) {
        const shape = {};
        util.objectKeys(this.shape).forEach((key) => {
            if (!mask[key]) {
                shape[key] = this.shape[key];
            }
        });
        return new ZodObject({
            ...this._def,
            shape: () => shape,
        });
    }
    /**
     * @deprecated
     */
    deepPartial() {
        return deepPartialify(this);
    }
    partial(mask) {
        const newShape = {};
        util.objectKeys(this.shape).forEach((key) => {
            const fieldSchema = this.shape[key];
            if (mask && !mask[key]) {
                newShape[key] = fieldSchema;
            }
            else {
                newShape[key] = fieldSchema.optional();
            }
        });
        return new ZodObject({
            ...this._def,
            shape: () => newShape,
        });
    }
    required(mask) {
        const newShape = {};
        util.objectKeys(this.shape).forEach((key) => {
            if (mask && !mask[key]) {
                newShape[key] = this.shape[key];
            }
            else {
                const fieldSchema = this.shape[key];
                let newField = fieldSchema;
                while (newField instanceof ZodOptional) {
                    newField = newField._def.innerType;
                }
                newShape[key] = newField;
            }
        });
        return new ZodObject({
            ...this._def,
            shape: () => newShape,
        });
    }
    keyof() {
        return createZodEnum(util.objectKeys(this.shape));
    }
}
ZodObject.create = (shape, params) => {
    return new ZodObject({
        shape: () => shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params),
    });
};
ZodObject.strictCreate = (shape, params) => {
    return new ZodObject({
        shape: () => shape,
        unknownKeys: "strict",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params),
    });
};
ZodObject.lazycreate = (shape, params) => {
    return new ZodObject({
        shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params),
    });
};
class ZodUnion extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        const options = this._def.options;
        function handleResults(results) {
            // return first issue-free validation if it exists
            for (const result of results) {
                if (result.result.status === "valid") {
                    return result.result;
                }
            }
            for (const result of results) {
                if (result.result.status === "dirty") {
                    // add issues from dirty option
                    ctx.common.issues.push(...result.ctx.common.issues);
                    return result.result;
                }
            }
            // return invalid
            const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_union,
                unionErrors,
            });
            return INVALID;
        }
        if (ctx.common.async) {
            return Promise.all(options.map(async (option) => {
                const childCtx = {
                    ...ctx,
                    common: {
                        ...ctx.common,
                        issues: [],
                    },
                    parent: null,
                };
                return {
                    result: await option._parseAsync({
                        data: ctx.data,
                        path: ctx.path,
                        parent: childCtx,
                    }),
                    ctx: childCtx,
                };
            })).then(handleResults);
        }
        else {
            let dirty = undefined;
            const issues = [];
            for (const option of options) {
                const childCtx = {
                    ...ctx,
                    common: {
                        ...ctx.common,
                        issues: [],
                    },
                    parent: null,
                };
                const result = option._parseSync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: childCtx,
                });
                if (result.status === "valid") {
                    return result;
                }
                else if (result.status === "dirty" && !dirty) {
                    dirty = { result, ctx: childCtx };
                }
                if (childCtx.common.issues.length) {
                    issues.push(childCtx.common.issues);
                }
            }
            if (dirty) {
                ctx.common.issues.push(...dirty.ctx.common.issues);
                return dirty.result;
            }
            const unionErrors = issues.map((issues) => new ZodError(issues));
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_union,
                unionErrors,
            });
            return INVALID;
        }
    }
    get options() {
        return this._def.options;
    }
}
ZodUnion.create = (types, params) => {
    return new ZodUnion({
        options: types,
        typeName: ZodFirstPartyTypeKind.ZodUnion,
        ...processCreateParams(params),
    });
};
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
//////////                                 //////////
//////////      ZodDiscriminatedUnion      //////////
//////////                                 //////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
const getDiscriminator = (type) => {
    if (type instanceof ZodLazy) {
        return getDiscriminator(type.schema);
    }
    else if (type instanceof ZodEffects) {
        return getDiscriminator(type.innerType());
    }
    else if (type instanceof ZodLiteral) {
        return [type.value];
    }
    else if (type instanceof ZodEnum) {
        return type.options;
    }
    else if (type instanceof ZodNativeEnum) {
        // eslint-disable-next-line ban/ban
        return util.objectValues(type.enum);
    }
    else if (type instanceof ZodDefault) {
        return getDiscriminator(type._def.innerType);
    }
    else if (type instanceof ZodUndefined) {
        return [undefined];
    }
    else if (type instanceof ZodNull) {
        return [null];
    }
    else if (type instanceof ZodOptional) {
        return [undefined, ...getDiscriminator(type.unwrap())];
    }
    else if (type instanceof ZodNullable) {
        return [null, ...getDiscriminator(type.unwrap())];
    }
    else if (type instanceof ZodBranded) {
        return getDiscriminator(type.unwrap());
    }
    else if (type instanceof ZodReadonly) {
        return getDiscriminator(type.unwrap());
    }
    else if (type instanceof ZodCatch) {
        return getDiscriminator(type._def.innerType);
    }
    else {
        return [];
    }
};
class ZodDiscriminatedUnion extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.object) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.object,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const discriminator = this.discriminator;
        const discriminatorValue = ctx.data[discriminator];
        const option = this.optionsMap.get(discriminatorValue);
        if (!option) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_union_discriminator,
                options: Array.from(this.optionsMap.keys()),
                path: [discriminator],
            });
            return INVALID;
        }
        if (ctx.common.async) {
            return option._parseAsync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            });
        }
        else {
            return option._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            });
        }
    }
    get discriminator() {
        return this._def.discriminator;
    }
    get options() {
        return this._def.options;
    }
    get optionsMap() {
        return this._def.optionsMap;
    }
    /**
     * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
     * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
     * have a different value for each object in the union.
     * @param discriminator the name of the discriminator property
     * @param types an array of object schemas
     * @param params
     */
    static create(discriminator, options, params) {
        // Get all the valid discriminator values
        const optionsMap = new Map();
        // try {
        for (const type of options) {
            const discriminatorValues = getDiscriminator(type.shape[discriminator]);
            if (!discriminatorValues.length) {
                throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
            }
            for (const value of discriminatorValues) {
                if (optionsMap.has(value)) {
                    throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
                }
                optionsMap.set(value, type);
            }
        }
        return new ZodDiscriminatedUnion({
            typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
            discriminator,
            options,
            optionsMap,
            ...processCreateParams(params),
        });
    }
}
function mergeValues(a, b) {
    const aType = getParsedType(a);
    const bType = getParsedType(b);
    if (a === b) {
        return { valid: true, data: a };
    }
    else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
        const bKeys = util.objectKeys(b);
        const sharedKeys = util
            .objectKeys(a)
            .filter((key) => bKeys.indexOf(key) !== -1);
        const newObj = { ...a, ...b };
        for (const key of sharedKeys) {
            const sharedValue = mergeValues(a[key], b[key]);
            if (!sharedValue.valid) {
                return { valid: false };
            }
            newObj[key] = sharedValue.data;
        }
        return { valid: true, data: newObj };
    }
    else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
        if (a.length !== b.length) {
            return { valid: false };
        }
        const newArray = [];
        for (let index = 0; index < a.length; index++) {
            const itemA = a[index];
            const itemB = b[index];
            const sharedValue = mergeValues(itemA, itemB);
            if (!sharedValue.valid) {
                return { valid: false };
            }
            newArray.push(sharedValue.data);
        }
        return { valid: true, data: newArray };
    }
    else if (aType === ZodParsedType.date &&
        bType === ZodParsedType.date &&
        +a === +b) {
        return { valid: true, data: a };
    }
    else {
        return { valid: false };
    }
}
class ZodIntersection extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const handleParsed = (parsedLeft, parsedRight) => {
            if (isAborted(parsedLeft) || isAborted(parsedRight)) {
                return INVALID;
            }
            const merged = mergeValues(parsedLeft.value, parsedRight.value);
            if (!merged.valid) {
                addIssueToContext(ctx, {
                    code: ZodIssueCode.invalid_intersection_types,
                });
                return INVALID;
            }
            if (isDirty(parsedLeft) || isDirty(parsedRight)) {
                status.dirty();
            }
            return { status: status.value, value: merged.data };
        };
        if (ctx.common.async) {
            return Promise.all([
                this._def.left._parseAsync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                }),
                this._def.right._parseAsync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                }),
            ]).then(([left, right]) => handleParsed(left, right));
        }
        else {
            return handleParsed(this._def.left._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            }), this._def.right._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            }));
        }
    }
}
ZodIntersection.create = (left, right, params) => {
    return new ZodIntersection({
        left: left,
        right: right,
        typeName: ZodFirstPartyTypeKind.ZodIntersection,
        ...processCreateParams(params),
    });
};
class ZodTuple extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.array) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.array,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        if (ctx.data.length < this._def.items.length) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                minimum: this._def.items.length,
                inclusive: true,
                exact: false,
                type: "array",
            });
            return INVALID;
        }
        const rest = this._def.rest;
        if (!rest && ctx.data.length > this._def.items.length) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                maximum: this._def.items.length,
                inclusive: true,
                exact: false,
                type: "array",
            });
            status.dirty();
        }
        const items = [...ctx.data]
            .map((item, itemIndex) => {
            const schema = this._def.items[itemIndex] || this._def.rest;
            if (!schema)
                return null;
            return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
        })
            .filter((x) => !!x); // filter nulls
        if (ctx.common.async) {
            return Promise.all(items).then((results) => {
                return ParseStatus.mergeArray(status, results);
            });
        }
        else {
            return ParseStatus.mergeArray(status, items);
        }
    }
    get items() {
        return this._def.items;
    }
    rest(rest) {
        return new ZodTuple({
            ...this._def,
            rest,
        });
    }
}
ZodTuple.create = (schemas, params) => {
    if (!Array.isArray(schemas)) {
        throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    }
    return new ZodTuple({
        items: schemas,
        typeName: ZodFirstPartyTypeKind.ZodTuple,
        rest: null,
        ...processCreateParams(params),
    });
};
class ZodRecord extends ZodType {
    get keySchema() {
        return this._def.keyType;
    }
    get valueSchema() {
        return this._def.valueType;
    }
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.object) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.object,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const pairs = [];
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        for (const key in ctx.data) {
            pairs.push({
                key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
                value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
                alwaysSet: key in ctx.data,
            });
        }
        if (ctx.common.async) {
            return ParseStatus.mergeObjectAsync(status, pairs);
        }
        else {
            return ParseStatus.mergeObjectSync(status, pairs);
        }
    }
    get element() {
        return this._def.valueType;
    }
    static create(first, second, third) {
        if (second instanceof ZodType) {
            return new ZodRecord({
                keyType: first,
                valueType: second,
                typeName: ZodFirstPartyTypeKind.ZodRecord,
                ...processCreateParams(third),
            });
        }
        return new ZodRecord({
            keyType: ZodString.create(),
            valueType: first,
            typeName: ZodFirstPartyTypeKind.ZodRecord,
            ...processCreateParams(second),
        });
    }
}
class ZodMap extends ZodType {
    get keySchema() {
        return this._def.keyType;
    }
    get valueSchema() {
        return this._def.valueType;
    }
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.map) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.map,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        const pairs = [...ctx.data.entries()].map(([key, value], index) => {
            return {
                key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
                value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"])),
            };
        });
        if (ctx.common.async) {
            const finalMap = new Map();
            return Promise.resolve().then(async () => {
                for (const pair of pairs) {
                    const key = await pair.key;
                    const value = await pair.value;
                    if (key.status === "aborted" || value.status === "aborted") {
                        return INVALID;
                    }
                    if (key.status === "dirty" || value.status === "dirty") {
                        status.dirty();
                    }
                    finalMap.set(key.value, value.value);
                }
                return { status: status.value, value: finalMap };
            });
        }
        else {
            const finalMap = new Map();
            for (const pair of pairs) {
                const key = pair.key;
                const value = pair.value;
                if (key.status === "aborted" || value.status === "aborted") {
                    return INVALID;
                }
                if (key.status === "dirty" || value.status === "dirty") {
                    status.dirty();
                }
                finalMap.set(key.value, value.value);
            }
            return { status: status.value, value: finalMap };
        }
    }
}
ZodMap.create = (keyType, valueType, params) => {
    return new ZodMap({
        valueType,
        keyType,
        typeName: ZodFirstPartyTypeKind.ZodMap,
        ...processCreateParams(params),
    });
};
class ZodSet extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.set) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.set,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const def = this._def;
        if (def.minSize !== null) {
            if (ctx.data.size < def.minSize.value) {
                addIssueToContext(ctx, {
                    code: ZodIssueCode.too_small,
                    minimum: def.minSize.value,
                    type: "set",
                    inclusive: true,
                    exact: false,
                    message: def.minSize.message,
                });
                status.dirty();
            }
        }
        if (def.maxSize !== null) {
            if (ctx.data.size > def.maxSize.value) {
                addIssueToContext(ctx, {
                    code: ZodIssueCode.too_big,
                    maximum: def.maxSize.value,
                    type: "set",
                    inclusive: true,
                    exact: false,
                    message: def.maxSize.message,
                });
                status.dirty();
            }
        }
        const valueType = this._def.valueType;
        function finalizeSet(elements) {
            const parsedSet = new Set();
            for (const element of elements) {
                if (element.status === "aborted")
                    return INVALID;
                if (element.status === "dirty")
                    status.dirty();
                parsedSet.add(element.value);
            }
            return { status: status.value, value: parsedSet };
        }
        const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
        if (ctx.common.async) {
            return Promise.all(elements).then((elements) => finalizeSet(elements));
        }
        else {
            return finalizeSet(elements);
        }
    }
    min(minSize, message) {
        return new ZodSet({
            ...this._def,
            minSize: { value: minSize, message: errorUtil.toString(message) },
        });
    }
    max(maxSize, message) {
        return new ZodSet({
            ...this._def,
            maxSize: { value: maxSize, message: errorUtil.toString(message) },
        });
    }
    size(size, message) {
        return this.min(size, message).max(size, message);
    }
    nonempty(message) {
        return this.min(1, message);
    }
}
ZodSet.create = (valueType, params) => {
    return new ZodSet({
        valueType,
        minSize: null,
        maxSize: null,
        typeName: ZodFirstPartyTypeKind.ZodSet,
        ...processCreateParams(params),
    });
};
class ZodFunction extends ZodType {
    constructor() {
        super(...arguments);
        this.validate = this.implement;
    }
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.function) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.function,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        function makeArgsIssue(args, error) {
            return makeIssue({
                data: args,
                path: ctx.path,
                errorMaps: [
                    ctx.common.contextualErrorMap,
                    ctx.schemaErrorMap,
                    getErrorMap(),
                    errorMap,
                ].filter((x) => !!x),
                issueData: {
                    code: ZodIssueCode.invalid_arguments,
                    argumentsError: error,
                },
            });
        }
        function makeReturnsIssue(returns, error) {
            return makeIssue({
                data: returns,
                path: ctx.path,
                errorMaps: [
                    ctx.common.contextualErrorMap,
                    ctx.schemaErrorMap,
                    getErrorMap(),
                    errorMap,
                ].filter((x) => !!x),
                issueData: {
                    code: ZodIssueCode.invalid_return_type,
                    returnTypeError: error,
                },
            });
        }
        const params = { errorMap: ctx.common.contextualErrorMap };
        const fn = ctx.data;
        if (this._def.returns instanceof ZodPromise) {
            // Would love a way to avoid disabling this rule, but we need
            // an alias (using an arrow function was what caused 2651).
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const me = this;
            return OK(async function (...args) {
                const error = new ZodError([]);
                const parsedArgs = await me._def.args
                    .parseAsync(args, params)
                    .catch((e) => {
                    error.addIssue(makeArgsIssue(args, e));
                    throw error;
                });
                const result = await Reflect.apply(fn, this, parsedArgs);
                const parsedReturns = await me._def.returns._def.type
                    .parseAsync(result, params)
                    .catch((e) => {
                    error.addIssue(makeReturnsIssue(result, e));
                    throw error;
                });
                return parsedReturns;
            });
        }
        else {
            // Would love a way to avoid disabling this rule, but we need
            // an alias (using an arrow function was what caused 2651).
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const me = this;
            return OK(function (...args) {
                const parsedArgs = me._def.args.safeParse(args, params);
                if (!parsedArgs.success) {
                    throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
                }
                const result = Reflect.apply(fn, this, parsedArgs.data);
                const parsedReturns = me._def.returns.safeParse(result, params);
                if (!parsedReturns.success) {
                    throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
                }
                return parsedReturns.data;
            });
        }
    }
    parameters() {
        return this._def.args;
    }
    returnType() {
        return this._def.returns;
    }
    args(...items) {
        return new ZodFunction({
            ...this._def,
            args: ZodTuple.create(items).rest(ZodUnknown.create()),
        });
    }
    returns(returnType) {
        return new ZodFunction({
            ...this._def,
            returns: returnType,
        });
    }
    implement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
    }
    strictImplement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
    }
    static create(args, returns, params) {
        return new ZodFunction({
            args: (args
                ? args
                : ZodTuple.create([]).rest(ZodUnknown.create())),
            returns: returns || ZodUnknown.create(),
            typeName: ZodFirstPartyTypeKind.ZodFunction,
            ...processCreateParams(params),
        });
    }
}
class ZodLazy extends ZodType {
    get schema() {
        return this._def.getter();
    }
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        const lazySchema = this._def.getter();
        return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
    }
}
ZodLazy.create = (getter, params) => {
    return new ZodLazy({
        getter: getter,
        typeName: ZodFirstPartyTypeKind.ZodLazy,
        ...processCreateParams(params),
    });
};
class ZodLiteral extends ZodType {
    _parse(input) {
        if (input.data !== this._def.value) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                received: ctx.data,
                code: ZodIssueCode.invalid_literal,
                expected: this._def.value,
            });
            return INVALID;
        }
        return { status: "valid", value: input.data };
    }
    get value() {
        return this._def.value;
    }
}
ZodLiteral.create = (value, params) => {
    return new ZodLiteral({
        value: value,
        typeName: ZodFirstPartyTypeKind.ZodLiteral,
        ...processCreateParams(params),
    });
};
function createZodEnum(values, params) {
    return new ZodEnum({
        values,
        typeName: ZodFirstPartyTypeKind.ZodEnum,
        ...processCreateParams(params),
    });
}
class ZodEnum extends ZodType {
    constructor() {
        super(...arguments);
        _ZodEnum_cache.set(this, void 0);
    }
    _parse(input) {
        if (typeof input.data !== "string") {
            const ctx = this._getOrReturnCtx(input);
            const expectedValues = this._def.values;
            addIssueToContext(ctx, {
                expected: util.joinValues(expectedValues),
                received: ctx.parsedType,
                code: ZodIssueCode.invalid_type,
            });
            return INVALID;
        }
        if (!__classPrivateFieldGet(this, _ZodEnum_cache, "f")) {
            __classPrivateFieldSet(this, _ZodEnum_cache, new Set(this._def.values), "f");
        }
        if (!__classPrivateFieldGet(this, _ZodEnum_cache, "f").has(input.data)) {
            const ctx = this._getOrReturnCtx(input);
            const expectedValues = this._def.values;
            addIssueToContext(ctx, {
                received: ctx.data,
                code: ZodIssueCode.invalid_enum_value,
                options: expectedValues,
            });
            return INVALID;
        }
        return OK(input.data);
    }
    get options() {
        return this._def.values;
    }
    get enum() {
        const enumValues = {};
        for (const val of this._def.values) {
            enumValues[val] = val;
        }
        return enumValues;
    }
    get Values() {
        const enumValues = {};
        for (const val of this._def.values) {
            enumValues[val] = val;
        }
        return enumValues;
    }
    get Enum() {
        const enumValues = {};
        for (const val of this._def.values) {
            enumValues[val] = val;
        }
        return enumValues;
    }
    extract(values, newDef = this._def) {
        return ZodEnum.create(values, {
            ...this._def,
            ...newDef,
        });
    }
    exclude(values, newDef = this._def) {
        return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
            ...this._def,
            ...newDef,
        });
    }
}
_ZodEnum_cache = new WeakMap();
ZodEnum.create = createZodEnum;
class ZodNativeEnum extends ZodType {
    constructor() {
        super(...arguments);
        _ZodNativeEnum_cache.set(this, void 0);
    }
    _parse(input) {
        const nativeEnumValues = util.getValidEnumValues(this._def.values);
        const ctx = this._getOrReturnCtx(input);
        if (ctx.parsedType !== ZodParsedType.string &&
            ctx.parsedType !== ZodParsedType.number) {
            const expectedValues = util.objectValues(nativeEnumValues);
            addIssueToContext(ctx, {
                expected: util.joinValues(expectedValues),
                received: ctx.parsedType,
                code: ZodIssueCode.invalid_type,
            });
            return INVALID;
        }
        if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f")) {
            __classPrivateFieldSet(this, _ZodNativeEnum_cache, new Set(util.getValidEnumValues(this._def.values)), "f");
        }
        if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f").has(input.data)) {
            const expectedValues = util.objectValues(nativeEnumValues);
            addIssueToContext(ctx, {
                received: ctx.data,
                code: ZodIssueCode.invalid_enum_value,
                options: expectedValues,
            });
            return INVALID;
        }
        return OK(input.data);
    }
    get enum() {
        return this._def.values;
    }
}
_ZodNativeEnum_cache = new WeakMap();
ZodNativeEnum.create = (values, params) => {
    return new ZodNativeEnum({
        values: values,
        typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
        ...processCreateParams(params),
    });
};
class ZodPromise extends ZodType {
    unwrap() {
        return this._def.type;
    }
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.promise &&
            ctx.common.async === false) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.promise,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const promisified = ctx.parsedType === ZodParsedType.promise
            ? ctx.data
            : Promise.resolve(ctx.data);
        return OK(promisified.then((data) => {
            return this._def.type.parseAsync(data, {
                path: ctx.path,
                errorMap: ctx.common.contextualErrorMap,
            });
        }));
    }
}
ZodPromise.create = (schema, params) => {
    return new ZodPromise({
        type: schema,
        typeName: ZodFirstPartyTypeKind.ZodPromise,
        ...processCreateParams(params),
    });
};
class ZodEffects extends ZodType {
    innerType() {
        return this._def.schema;
    }
    sourceType() {
        return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects
            ? this._def.schema.sourceType()
            : this._def.schema;
    }
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const effect = this._def.effect || null;
        const checkCtx = {
            addIssue: (arg) => {
                addIssueToContext(ctx, arg);
                if (arg.fatal) {
                    status.abort();
                }
                else {
                    status.dirty();
                }
            },
            get path() {
                return ctx.path;
            },
        };
        checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
        if (effect.type === "preprocess") {
            const processed = effect.transform(ctx.data, checkCtx);
            if (ctx.common.async) {
                return Promise.resolve(processed).then(async (processed) => {
                    if (status.value === "aborted")
                        return INVALID;
                    const result = await this._def.schema._parseAsync({
                        data: processed,
                        path: ctx.path,
                        parent: ctx,
                    });
                    if (result.status === "aborted")
                        return INVALID;
                    if (result.status === "dirty")
                        return DIRTY(result.value);
                    if (status.value === "dirty")
                        return DIRTY(result.value);
                    return result;
                });
            }
            else {
                if (status.value === "aborted")
                    return INVALID;
                const result = this._def.schema._parseSync({
                    data: processed,
                    path: ctx.path,
                    parent: ctx,
                });
                if (result.status === "aborted")
                    return INVALID;
                if (result.status === "dirty")
                    return DIRTY(result.value);
                if (status.value === "dirty")
                    return DIRTY(result.value);
                return result;
            }
        }
        if (effect.type === "refinement") {
            const executeRefinement = (acc) => {
                const result = effect.refinement(acc, checkCtx);
                if (ctx.common.async) {
                    return Promise.resolve(result);
                }
                if (result instanceof Promise) {
                    throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
                }
                return acc;
            };
            if (ctx.common.async === false) {
                const inner = this._def.schema._parseSync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                });
                if (inner.status === "aborted")
                    return INVALID;
                if (inner.status === "dirty")
                    status.dirty();
                // return value is ignored
                executeRefinement(inner.value);
                return { status: status.value, value: inner.value };
            }
            else {
                return this._def.schema
                    ._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx })
                    .then((inner) => {
                    if (inner.status === "aborted")
                        return INVALID;
                    if (inner.status === "dirty")
                        status.dirty();
                    return executeRefinement(inner.value).then(() => {
                        return { status: status.value, value: inner.value };
                    });
                });
            }
        }
        if (effect.type === "transform") {
            if (ctx.common.async === false) {
                const base = this._def.schema._parseSync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                });
                if (!isValid(base))
                    return base;
                const result = effect.transform(base.value, checkCtx);
                if (result instanceof Promise) {
                    throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
                }
                return { status: status.value, value: result };
            }
            else {
                return this._def.schema
                    ._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx })
                    .then((base) => {
                    if (!isValid(base))
                        return base;
                    return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({ status: status.value, value: result }));
                });
            }
        }
        util.assertNever(effect);
    }
}
ZodEffects.create = (schema, effect, params) => {
    return new ZodEffects({
        schema,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect,
        ...processCreateParams(params),
    });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
    return new ZodEffects({
        schema,
        effect: { type: "preprocess", transform: preprocess },
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        ...processCreateParams(params),
    });
};
class ZodOptional extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === ZodParsedType.undefined) {
            return OK(undefined);
        }
        return this._def.innerType._parse(input);
    }
    unwrap() {
        return this._def.innerType;
    }
}
ZodOptional.create = (type, params) => {
    return new ZodOptional({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodOptional,
        ...processCreateParams(params),
    });
};
class ZodNullable extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === ZodParsedType.null) {
            return OK(null);
        }
        return this._def.innerType._parse(input);
    }
    unwrap() {
        return this._def.innerType;
    }
}
ZodNullable.create = (type, params) => {
    return new ZodNullable({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodNullable,
        ...processCreateParams(params),
    });
};
class ZodDefault extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        let data = ctx.data;
        if (ctx.parsedType === ZodParsedType.undefined) {
            data = this._def.defaultValue();
        }
        return this._def.innerType._parse({
            data,
            path: ctx.path,
            parent: ctx,
        });
    }
    removeDefault() {
        return this._def.innerType;
    }
}
ZodDefault.create = (type, params) => {
    return new ZodDefault({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodDefault,
        defaultValue: typeof params.default === "function"
            ? params.default
            : () => params.default,
        ...processCreateParams(params),
    });
};
class ZodCatch extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        // newCtx is used to not collect issues from inner types in ctx
        const newCtx = {
            ...ctx,
            common: {
                ...ctx.common,
                issues: [],
            },
        };
        const result = this._def.innerType._parse({
            data: newCtx.data,
            path: newCtx.path,
            parent: {
                ...newCtx,
            },
        });
        if (isAsync(result)) {
            return result.then((result) => {
                return {
                    status: "valid",
                    value: result.status === "valid"
                        ? result.value
                        : this._def.catchValue({
                            get error() {
                                return new ZodError(newCtx.common.issues);
                            },
                            input: newCtx.data,
                        }),
                };
            });
        }
        else {
            return {
                status: "valid",
                value: result.status === "valid"
                    ? result.value
                    : this._def.catchValue({
                        get error() {
                            return new ZodError(newCtx.common.issues);
                        },
                        input: newCtx.data,
                    }),
            };
        }
    }
    removeCatch() {
        return this._def.innerType;
    }
}
ZodCatch.create = (type, params) => {
    return new ZodCatch({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodCatch,
        catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
        ...processCreateParams(params),
    });
};
class ZodNaN extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.nan) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.nan,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return { status: "valid", value: input.data };
    }
}
ZodNaN.create = (params) => {
    return new ZodNaN({
        typeName: ZodFirstPartyTypeKind.ZodNaN,
        ...processCreateParams(params),
    });
};
const BRAND = Symbol("zod_brand");
class ZodBranded extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        const data = ctx.data;
        return this._def.type._parse({
            data,
            path: ctx.path,
            parent: ctx,
        });
    }
    unwrap() {
        return this._def.type;
    }
}
class ZodPipeline extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.common.async) {
            const handleAsync = async () => {
                const inResult = await this._def.in._parseAsync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                });
                if (inResult.status === "aborted")
                    return INVALID;
                if (inResult.status === "dirty") {
                    status.dirty();
                    return DIRTY(inResult.value);
                }
                else {
                    return this._def.out._parseAsync({
                        data: inResult.value,
                        path: ctx.path,
                        parent: ctx,
                    });
                }
            };
            return handleAsync();
        }
        else {
            const inResult = this._def.in._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            });
            if (inResult.status === "aborted")
                return INVALID;
            if (inResult.status === "dirty") {
                status.dirty();
                return {
                    status: "dirty",
                    value: inResult.value,
                };
            }
            else {
                return this._def.out._parseSync({
                    data: inResult.value,
                    path: ctx.path,
                    parent: ctx,
                });
            }
        }
    }
    static create(a, b) {
        return new ZodPipeline({
            in: a,
            out: b,
            typeName: ZodFirstPartyTypeKind.ZodPipeline,
        });
    }
}
class ZodReadonly extends ZodType {
    _parse(input) {
        const result = this._def.innerType._parse(input);
        const freeze = (data) => {
            if (isValid(data)) {
                data.value = Object.freeze(data.value);
            }
            return data;
        };
        return isAsync(result)
            ? result.then((data) => freeze(data))
            : freeze(result);
    }
    unwrap() {
        return this._def.innerType;
    }
}
ZodReadonly.create = (type, params) => {
    return new ZodReadonly({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodReadonly,
        ...processCreateParams(params),
    });
};
function custom(check, params = {}, 
/**
 * @deprecated
 *
 * Pass `fatal` into the params object instead:
 *
 * ```ts
 * z.string().custom((val) => val.length > 5, { fatal: false })
 * ```
 *
 */
fatal) {
    if (check)
        return ZodAny.create().superRefine((data, ctx) => {
            var _a, _b;
            if (!check(data)) {
                const p = typeof params === "function"
                    ? params(data)
                    : typeof params === "string"
                        ? { message: params }
                        : params;
                const _fatal = (_b = (_a = p.fatal) !== null && _a !== void 0 ? _a : fatal) !== null && _b !== void 0 ? _b : true;
                const p2 = typeof p === "string" ? { message: p } : p;
                ctx.addIssue({ code: "custom", ...p2, fatal: _fatal });
            }
        });
    return ZodAny.create();
}
const late = {
    object: ZodObject.lazycreate,
};
var ZodFirstPartyTypeKind;
(function (ZodFirstPartyTypeKind) {
    ZodFirstPartyTypeKind["ZodString"] = "ZodString";
    ZodFirstPartyTypeKind["ZodNumber"] = "ZodNumber";
    ZodFirstPartyTypeKind["ZodNaN"] = "ZodNaN";
    ZodFirstPartyTypeKind["ZodBigInt"] = "ZodBigInt";
    ZodFirstPartyTypeKind["ZodBoolean"] = "ZodBoolean";
    ZodFirstPartyTypeKind["ZodDate"] = "ZodDate";
    ZodFirstPartyTypeKind["ZodSymbol"] = "ZodSymbol";
    ZodFirstPartyTypeKind["ZodUndefined"] = "ZodUndefined";
    ZodFirstPartyTypeKind["ZodNull"] = "ZodNull";
    ZodFirstPartyTypeKind["ZodAny"] = "ZodAny";
    ZodFirstPartyTypeKind["ZodUnknown"] = "ZodUnknown";
    ZodFirstPartyTypeKind["ZodNever"] = "ZodNever";
    ZodFirstPartyTypeKind["ZodVoid"] = "ZodVoid";
    ZodFirstPartyTypeKind["ZodArray"] = "ZodArray";
    ZodFirstPartyTypeKind["ZodObject"] = "ZodObject";
    ZodFirstPartyTypeKind["ZodUnion"] = "ZodUnion";
    ZodFirstPartyTypeKind["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
    ZodFirstPartyTypeKind["ZodIntersection"] = "ZodIntersection";
    ZodFirstPartyTypeKind["ZodTuple"] = "ZodTuple";
    ZodFirstPartyTypeKind["ZodRecord"] = "ZodRecord";
    ZodFirstPartyTypeKind["ZodMap"] = "ZodMap";
    ZodFirstPartyTypeKind["ZodSet"] = "ZodSet";
    ZodFirstPartyTypeKind["ZodFunction"] = "ZodFunction";
    ZodFirstPartyTypeKind["ZodLazy"] = "ZodLazy";
    ZodFirstPartyTypeKind["ZodLiteral"] = "ZodLiteral";
    ZodFirstPartyTypeKind["ZodEnum"] = "ZodEnum";
    ZodFirstPartyTypeKind["ZodEffects"] = "ZodEffects";
    ZodFirstPartyTypeKind["ZodNativeEnum"] = "ZodNativeEnum";
    ZodFirstPartyTypeKind["ZodOptional"] = "ZodOptional";
    ZodFirstPartyTypeKind["ZodNullable"] = "ZodNullable";
    ZodFirstPartyTypeKind["ZodDefault"] = "ZodDefault";
    ZodFirstPartyTypeKind["ZodCatch"] = "ZodCatch";
    ZodFirstPartyTypeKind["ZodPromise"] = "ZodPromise";
    ZodFirstPartyTypeKind["ZodBranded"] = "ZodBranded";
    ZodFirstPartyTypeKind["ZodPipeline"] = "ZodPipeline";
    ZodFirstPartyTypeKind["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
const instanceOfType = (
// const instanceOfType = <T extends new (...args: any[]) => any>(
cls, params = {
    message: `Input not instance of ${cls.name}`,
}) => custom((data) => data instanceof cls, params);
const stringType = ZodString.create;
const numberType = ZodNumber.create;
const nanType = ZodNaN.create;
const bigIntType = ZodBigInt.create;
const booleanType = ZodBoolean.create;
const dateType = ZodDate.create;
const symbolType = ZodSymbol.create;
const undefinedType = ZodUndefined.create;
const nullType = ZodNull.create;
const anyType = ZodAny.create;
const unknownType = ZodUnknown.create;
const neverType = ZodNever.create;
const voidType = ZodVoid.create;
const arrayType = ZodArray.create;
const objectType = ZodObject.create;
const strictObjectType = ZodObject.strictCreate;
const unionType = ZodUnion.create;
const discriminatedUnionType = ZodDiscriminatedUnion.create;
const intersectionType = ZodIntersection.create;
const tupleType = ZodTuple.create;
const recordType = ZodRecord.create;
const mapType = ZodMap.create;
const setType = ZodSet.create;
const functionType = ZodFunction.create;
const lazyType = ZodLazy.create;
const literalType = ZodLiteral.create;
const enumType = ZodEnum.create;
const nativeEnumType = ZodNativeEnum.create;
const promiseType = ZodPromise.create;
const effectsType = ZodEffects.create;
const optionalType = ZodOptional.create;
const nullableType = ZodNullable.create;
const preprocessType = ZodEffects.createWithPreprocess;
const pipelineType = ZodPipeline.create;
const ostring = () => stringType().optional();
const onumber = () => numberType().optional();
const oboolean = () => booleanType().optional();
const coerce = {
    string: ((arg) => ZodString.create({ ...arg, coerce: true })),
    number: ((arg) => ZodNumber.create({ ...arg, coerce: true })),
    boolean: ((arg) => ZodBoolean.create({
        ...arg,
        coerce: true,
    })),
    bigint: ((arg) => ZodBigInt.create({ ...arg, coerce: true })),
    date: ((arg) => ZodDate.create({ ...arg, coerce: true })),
};
const NEVER = INVALID;

var z = /*#__PURE__*/Object.freeze({
    __proto__: null,
    defaultErrorMap: errorMap,
    setErrorMap: setErrorMap,
    getErrorMap: getErrorMap,
    makeIssue: makeIssue,
    EMPTY_PATH: EMPTY_PATH,
    addIssueToContext: addIssueToContext,
    ParseStatus: ParseStatus,
    INVALID: INVALID,
    DIRTY: DIRTY,
    OK: OK,
    isAborted: isAborted,
    isDirty: isDirty,
    isValid: isValid,
    isAsync: isAsync,
    get util () { return util; },
    get objectUtil () { return objectUtil; },
    ZodParsedType: ZodParsedType,
    getParsedType: getParsedType,
    ZodType: ZodType,
    datetimeRegex: datetimeRegex,
    ZodString: ZodString,
    ZodNumber: ZodNumber,
    ZodBigInt: ZodBigInt,
    ZodBoolean: ZodBoolean,
    ZodDate: ZodDate,
    ZodSymbol: ZodSymbol,
    ZodUndefined: ZodUndefined,
    ZodNull: ZodNull,
    ZodAny: ZodAny,
    ZodUnknown: ZodUnknown,
    ZodNever: ZodNever,
    ZodVoid: ZodVoid,
    ZodArray: ZodArray,
    ZodObject: ZodObject,
    ZodUnion: ZodUnion,
    ZodDiscriminatedUnion: ZodDiscriminatedUnion,
    ZodIntersection: ZodIntersection,
    ZodTuple: ZodTuple,
    ZodRecord: ZodRecord,
    ZodMap: ZodMap,
    ZodSet: ZodSet,
    ZodFunction: ZodFunction,
    ZodLazy: ZodLazy,
    ZodLiteral: ZodLiteral,
    ZodEnum: ZodEnum,
    ZodNativeEnum: ZodNativeEnum,
    ZodPromise: ZodPromise,
    ZodEffects: ZodEffects,
    ZodTransformer: ZodEffects,
    ZodOptional: ZodOptional,
    ZodNullable: ZodNullable,
    ZodDefault: ZodDefault,
    ZodCatch: ZodCatch,
    ZodNaN: ZodNaN,
    BRAND: BRAND,
    ZodBranded: ZodBranded,
    ZodPipeline: ZodPipeline,
    ZodReadonly: ZodReadonly,
    custom: custom,
    Schema: ZodType,
    ZodSchema: ZodType,
    late: late,
    get ZodFirstPartyTypeKind () { return ZodFirstPartyTypeKind; },
    coerce: coerce,
    any: anyType,
    array: arrayType,
    bigint: bigIntType,
    boolean: booleanType,
    date: dateType,
    discriminatedUnion: discriminatedUnionType,
    effect: effectsType,
    'enum': enumType,
    'function': functionType,
    'instanceof': instanceOfType,
    intersection: intersectionType,
    lazy: lazyType,
    literal: literalType,
    map: mapType,
    nan: nanType,
    nativeEnum: nativeEnumType,
    never: neverType,
    'null': nullType,
    nullable: nullableType,
    number: numberType,
    object: objectType,
    oboolean: oboolean,
    onumber: onumber,
    optional: optionalType,
    ostring: ostring,
    pipeline: pipelineType,
    preprocess: preprocessType,
    promise: promiseType,
    record: recordType,
    set: setType,
    strictObject: strictObjectType,
    string: stringType,
    symbol: symbolType,
    transformer: effectsType,
    tuple: tupleType,
    'undefined': undefinedType,
    union: unionType,
    unknown: unknownType,
    'void': voidType,
    NEVER: NEVER,
    ZodIssueCode: ZodIssueCode,
    quotelessJson: quotelessJson,
    ZodError: ZodError
});

/* src/components/EventModal.svelte generated by Svelte v3.59.2 */
const file$c = "src/components/EventModal.svelte";

// (23:8) {#if errors.image}
function create_if_block_3$3(ctx) {
	let p;
	let t_value = /*errors*/ ctx[3].image + "";
	let t;

	const block = {
		c: function create() {
			p = element("p");
			t = text(t_value);
			attr_dev(p, "class", "error red svelte-8akxfs");
			add_location(p, file$c, 22, 27, 638);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*errors*/ 8 && t_value !== (t_value = /*errors*/ ctx[3].image + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3$3.name,
		type: "if",
		source: "(23:8) {#if errors.image}",
		ctx
	});

	return block;
}

// (28:8) {#if errors.latitude}
function create_if_block_2$3(ctx) {
	let p;
	let t_value = /*errors*/ ctx[3].latitude + "";
	let t;

	const block = {
		c: function create() {
			p = element("p");
			t = text(t_value);
			attr_dev(p, "class", "error red svelte-8akxfs");
			add_location(p, file$c, 27, 30, 858);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*errors*/ 8 && t_value !== (t_value = /*errors*/ ctx[3].latitude + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2$3.name,
		type: "if",
		source: "(28:8) {#if errors.latitude}",
		ctx
	});

	return block;
}

// (33:8) {#if errors.longitude}
function create_if_block_1$7(ctx) {
	let p;
	let t_value = /*errors*/ ctx[3].longitude + "";
	let t;

	const block = {
		c: function create() {
			p = element("p");
			t = text(t_value);
			attr_dev(p, "class", "error red svelte-8akxfs");
			add_location(p, file$c, 32, 31, 1084);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*errors*/ 8 && t_value !== (t_value = /*errors*/ ctx[3].longitude + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$7.name,
		type: "if",
		source: "(33:8) {#if errors.longitude}",
		ctx
	});

	return block;
}

// (38:8) {#if errors.date}
function create_if_block$8(ctx) {
	let p;
	let t_value = /*errors*/ ctx[3].date + "";
	let t;

	const block = {
		c: function create() {
			p = element("p");
			t = text(t_value);
			attr_dev(p, "class", "error red svelte-8akxfs");
			add_location(p, file$c, 37, 26, 1261);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*errors*/ 8 && t_value !== (t_value = /*errors*/ ctx[3].date + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$8.name,
		type: "if",
		source: "(38:8) {#if errors.date}",
		ctx
	});

	return block;
}

// (1:0) <Modal on:close={close}>
function create_default_slot$5(ctx) {
	let h2;
	let t0_value = (/*data*/ ctx[0] ? 'Editando' : 'Criando') + "";
	let t0;
	let t1;
	let t2;
	let form;
	let label0;
	let t3;
	let input0;
	let t4;
	let label1;
	let t5;
	let textarea;
	let t6;
	let label2;
	let t7;
	let input1;
	let t8;
	let label3;
	let t9;
	let input2;
	let t10;
	let label4;
	let t11;
	let input3;
	let t12;
	let t13;
	let label5;
	let t14;
	let input4;
	let t15;
	let t16;
	let label6;
	let t17;
	let input5;
	let t18;
	let t19;
	let label7;
	let t20;
	let input6;
	let t21;
	let t22;
	let button;
	let t23_value = (/*l_submitting*/ ctx[1] ? '...' : 'Enviar') + "";
	let t23;
	let mounted;
	let dispose;
	let if_block0 = /*errors*/ ctx[3].image && create_if_block_3$3(ctx);
	let if_block1 = /*errors*/ ctx[3].latitude && create_if_block_2$3(ctx);
	let if_block2 = /*errors*/ ctx[3].longitude && create_if_block_1$7(ctx);
	let if_block3 = /*errors*/ ctx[3].date && create_if_block$8(ctx);

	const block = {
		c: function create() {
			h2 = element("h2");
			t0 = text(t0_value);
			t1 = text(" um Evento");
			t2 = space();
			form = element("form");
			label0 = element("label");
			t3 = text("Nome:\n        ");
			input0 = element("input");
			t4 = space();
			label1 = element("label");
			t5 = text("Descrição:\n        ");
			textarea = element("textarea");
			t6 = space();
			label2 = element("label");
			t7 = text("Local:\n        ");
			input1 = element("input");
			t8 = space();
			label3 = element("label");
			t9 = text("Endereço:\n        ");
			input2 = element("input");
			t10 = space();
			label4 = element("label");
			t11 = text("Imagem:\n        ");
			input3 = element("input");
			t12 = space();
			if (if_block0) if_block0.c();
			t13 = space();
			label5 = element("label");
			t14 = text("Latitude:\n        ");
			input4 = element("input");
			t15 = space();
			if (if_block1) if_block1.c();
			t16 = space();
			label6 = element("label");
			t17 = text("Longitude:\n        ");
			input5 = element("input");
			t18 = space();
			if (if_block2) if_block2.c();
			t19 = space();
			label7 = element("label");
			t20 = text("Data:\n        ");
			input6 = element("input");
			t21 = space();
			if (if_block3) if_block3.c();
			t22 = space();
			button = element("button");
			t23 = text(t23_value);
			add_location(h2, file$c, 1, 4, 29);
			attr_dev(input0, "placeholder", "Nome do evento");
			input0.required = true;
			attr_dev(input0, "class", "svelte-8akxfs");
			add_location(input0, file$c, 5, 8, 141);
			attr_dev(label0, "class", "svelte-8akxfs");
			add_location(label0, file$c, 4, 6, 119);
			attr_dev(textarea, "placeholder", "Detalhes do evento");
			attr_dev(textarea, "rows", "5");
			attr_dev(textarea, "class", "svelte-8akxfs");
			add_location(textarea, file$c, 9, 8, 263);
			attr_dev(label1, "class", "svelte-8akxfs");
			add_location(label1, file$c, 8, 6, 236);
			input1.required = true;
			attr_dev(input1, "class", "svelte-8akxfs");
			add_location(input1, file$c, 13, 8, 392);
			attr_dev(label2, "class", "svelte-8akxfs");
			add_location(label2, file$c, 12, 6, 369);
			input2.required = true;
			attr_dev(input2, "class", "svelte-8akxfs");
			add_location(input2, file$c, 17, 8, 484);
			attr_dev(label3, "class", "svelte-8akxfs");
			add_location(label3, file$c, 16, 6, 458);
			attr_dev(input3, "class", "svelte-8akxfs");
			add_location(input3, file$c, 21, 8, 576);
			attr_dev(label4, "class", "svelte-8akxfs");
			add_location(label4, file$c, 20, 6, 552);
			attr_dev(input4, "step", "1e-20");
			attr_dev(input4, "class", "hide-arrows svelte-8akxfs");
			attr_dev(input4, "type", "number");
			input4.required = true;
			add_location(input4, file$c, 26, 8, 734);
			attr_dev(label5, "class", "svelte-8akxfs");
			add_location(label5, file$c, 25, 6, 708);
			attr_dev(input5, "step", "1e-20");
			attr_dev(input5, "class", "hide-arrows svelte-8akxfs");
			attr_dev(input5, "type", "number");
			input5.required = true;
			add_location(input5, file$c, 31, 8, 958);
			attr_dev(label6, "class", "svelte-8akxfs");
			add_location(label6, file$c, 30, 6, 931);
			attr_dev(input6, "type", "date");
			input6.required = true;
			attr_dev(input6, "class", "svelte-8akxfs");
			add_location(input6, file$c, 36, 8, 1180);
			attr_dev(label7, "class", "svelte-8akxfs");
			add_location(label7, file$c, 35, 6, 1158);
			attr_dev(button, "type", "submit");
			button.disabled = /*l_submitting*/ ctx[1];
			attr_dev(button, "class", "svelte-8akxfs");
			add_location(button, file$c, 40, 6, 1330);
			add_location(form, file$c, 3, 4, 87);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h2, anchor);
			append_dev(h2, t0);
			append_dev(h2, t1);
			insert_dev(target, t2, anchor);
			insert_dev(target, form, anchor);
			append_dev(form, label0);
			append_dev(label0, t3);
			append_dev(label0, input0);
			set_input_value(input0, /*event*/ ctx[2].name);
			append_dev(form, t4);
			append_dev(form, label1);
			append_dev(label1, t5);
			append_dev(label1, textarea);
			set_input_value(textarea, /*event*/ ctx[2].description);
			append_dev(form, t6);
			append_dev(form, label2);
			append_dev(label2, t7);
			append_dev(label2, input1);
			set_input_value(input1, /*event*/ ctx[2].local);
			append_dev(form, t8);
			append_dev(form, label3);
			append_dev(label3, t9);
			append_dev(label3, input2);
			set_input_value(input2, /*event*/ ctx[2].address);
			append_dev(form, t10);
			append_dev(form, label4);
			append_dev(label4, t11);
			append_dev(label4, input3);
			set_input_value(input3, /*event*/ ctx[2].image);
			append_dev(label4, t12);
			if (if_block0) if_block0.m(label4, null);
			append_dev(form, t13);
			append_dev(form, label5);
			append_dev(label5, t14);
			append_dev(label5, input4);
			set_input_value(input4, /*event*/ ctx[2].latitude);
			append_dev(label5, t15);
			if (if_block1) if_block1.m(label5, null);
			append_dev(form, t16);
			append_dev(form, label6);
			append_dev(label6, t17);
			append_dev(label6, input5);
			set_input_value(input5, /*event*/ ctx[2].longitude);
			append_dev(label6, t18);
			if (if_block2) if_block2.m(label6, null);
			append_dev(form, t19);
			append_dev(form, label7);
			append_dev(label7, t20);
			append_dev(label7, input6);
			set_input_value(input6, /*event*/ ctx[2].date);
			append_dev(label7, t21);
			if (if_block3) if_block3.m(label7, null);
			append_dev(form, t22);
			append_dev(form, button);
			append_dev(button, t23);

			if (!mounted) {
				dispose = [
					listen_dev(input0, "input", /*input0_input_handler*/ ctx[8]),
					listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[9]),
					listen_dev(input1, "input", /*input1_input_handler*/ ctx[10]),
					listen_dev(input2, "input", /*input2_input_handler*/ ctx[11]),
					listen_dev(input3, "input", /*input3_input_handler*/ ctx[12]),
					listen_dev(input4, "input", /*input4_input_handler*/ ctx[13]),
					listen_dev(input5, "input", /*input5_input_handler*/ ctx[14]),
					listen_dev(input6, "input", /*input6_input_handler*/ ctx[15]),
					listen_dev(form, "submit", /*submit*/ ctx[5], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*data*/ 1 && t0_value !== (t0_value = (/*data*/ ctx[0] ? 'Editando' : 'Criando') + "")) set_data_dev(t0, t0_value);

			if (dirty & /*event*/ 4 && input0.value !== /*event*/ ctx[2].name) {
				set_input_value(input0, /*event*/ ctx[2].name);
			}

			if (dirty & /*event*/ 4) {
				set_input_value(textarea, /*event*/ ctx[2].description);
			}

			if (dirty & /*event*/ 4 && input1.value !== /*event*/ ctx[2].local) {
				set_input_value(input1, /*event*/ ctx[2].local);
			}

			if (dirty & /*event*/ 4 && input2.value !== /*event*/ ctx[2].address) {
				set_input_value(input2, /*event*/ ctx[2].address);
			}

			if (dirty & /*event*/ 4 && input3.value !== /*event*/ ctx[2].image) {
				set_input_value(input3, /*event*/ ctx[2].image);
			}

			if (/*errors*/ ctx[3].image) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_3$3(ctx);
					if_block0.c();
					if_block0.m(label4, null);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (dirty & /*event*/ 4 && to_number(input4.value) !== /*event*/ ctx[2].latitude) {
				set_input_value(input4, /*event*/ ctx[2].latitude);
			}

			if (/*errors*/ ctx[3].latitude) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_2$3(ctx);
					if_block1.c();
					if_block1.m(label5, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (dirty & /*event*/ 4 && to_number(input5.value) !== /*event*/ ctx[2].longitude) {
				set_input_value(input5, /*event*/ ctx[2].longitude);
			}

			if (/*errors*/ ctx[3].longitude) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block_1$7(ctx);
					if_block2.c();
					if_block2.m(label6, null);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (dirty & /*event*/ 4) {
				set_input_value(input6, /*event*/ ctx[2].date);
			}

			if (/*errors*/ ctx[3].date) {
				if (if_block3) {
					if_block3.p(ctx, dirty);
				} else {
					if_block3 = create_if_block$8(ctx);
					if_block3.c();
					if_block3.m(label7, null);
				}
			} else if (if_block3) {
				if_block3.d(1);
				if_block3 = null;
			}

			if (dirty & /*l_submitting*/ 2 && t23_value !== (t23_value = (/*l_submitting*/ ctx[1] ? '...' : 'Enviar') + "")) set_data_dev(t23, t23_value);

			if (dirty & /*l_submitting*/ 2) {
				prop_dev(button, "disabled", /*l_submitting*/ ctx[1]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(h2);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(form);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			if (if_block3) if_block3.d();
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$5.name,
		type: "slot",
		source: "(1:0) <Modal on:close={close}>",
		ctx
	});

	return block;
}

function create_fragment$d(ctx) {
	let modal;
	let current;

	modal = new Modal({
			props: {
				$$slots: { default: [create_default_slot$5] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	modal.$on("close", /*close*/ ctx[4]);

	const block = {
		c: function create() {
			create_component(modal.$$.fragment);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			mount_component(modal, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const modal_changes = {};

			if (dirty & /*$$scope, l_submitting, errors, event, data*/ 131087) {
				modal_changes.$$scope = { dirty, ctx };
			}

			modal.$set(modal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(modal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(modal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(modal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$d.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$d($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('EventModal', slots, []);
	let { data, show, rendered_event } = $$props;
	let l_submitting;

	let event = {
		name: data?.name,
		description: data?.description,
		local: data?.local,
		address: data?.address,
		image: data?.image,
		latitude: Number(data?.latitude),
		longitude: Number(data?.longitude),
		date: ((data?.date) ? new Date(data.date) : new Date()).toISOString().split('T')[0]
	};

	const schema = z.object({
		name: z.string(),
		description: z.optional(z.string()),
		local: z.string(),
		address: z.string(),
		image: z.optional(z.string().url('A imagem deve ser um URL')),
		latitude: z.number().refine(v => Math.abs(v) <= 90, {
			message: 'Latitude deve estar entre -90 e 90'
		}),
		longitude: z.number().refine(v => Math.abs(v) <= 180, {
			message: 'Longitude deve estar entre -180 e 180'
		}),
		date: z.coerce.date().min(new Date(new Date().getTime() - 24 * 60 * 60 * 1e3), {
			message: 'A data não pode ser anterior a hoje'
		})
	});

	let errors = {};

	function close() {
		$$invalidate(6, show = false);
	}

	async function submit(e) {
		e.preventDefault();
		let validated_data;

		try {
			validated_data = schema.parse(event);
		} catch(error) {
			$$invalidate(3, errors = error.errors.reduce(
				(acc, err) => {
					acc[err.path[0]] = err.message;
					return acc;
				},
				{}
			));

			return;
		}

		$$invalidate(1, l_submitting = true);

		if (!data) {
			const { data } = await api('events', 'POST', validated_data);
			return navigate(`/evento/${data.id}`);
		}

		await api(`edit-event/${data.id}`, 'PUT', validated_data);
		$$invalidate(7, rendered_event = { ...rendered_event, ...validated_data });
		close();
	}

	$$self.$$.on_mount.push(function () {
		if (data === undefined && !('data' in $$props || $$self.$$.bound[$$self.$$.props['data']])) {
			console.warn("<EventModal> was created without expected prop 'data'");
		}

		if (show === undefined && !('show' in $$props || $$self.$$.bound[$$self.$$.props['show']])) {
			console.warn("<EventModal> was created without expected prop 'show'");
		}

		if (rendered_event === undefined && !('rendered_event' in $$props || $$self.$$.bound[$$self.$$.props['rendered_event']])) {
			console.warn("<EventModal> was created without expected prop 'rendered_event'");
		}
	});

	const writable_props = ['data', 'show', 'rendered_event'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<EventModal> was created with unknown prop '${key}'`);
	});

	function input0_input_handler() {
		event.name = this.value;
		$$invalidate(2, event);
	}

	function textarea_input_handler() {
		event.description = this.value;
		$$invalidate(2, event);
	}

	function input1_input_handler() {
		event.local = this.value;
		$$invalidate(2, event);
	}

	function input2_input_handler() {
		event.address = this.value;
		$$invalidate(2, event);
	}

	function input3_input_handler() {
		event.image = this.value;
		$$invalidate(2, event);
	}

	function input4_input_handler() {
		event.latitude = to_number(this.value);
		$$invalidate(2, event);
	}

	function input5_input_handler() {
		event.longitude = to_number(this.value);
		$$invalidate(2, event);
	}

	function input6_input_handler() {
		event.date = this.value;
		$$invalidate(2, event);
	}

	$$self.$$set = $$props => {
		if ('data' in $$props) $$invalidate(0, data = $$props.data);
		if ('show' in $$props) $$invalidate(6, show = $$props.show);
		if ('rendered_event' in $$props) $$invalidate(7, rendered_event = $$props.rendered_event);
	};

	$$self.$capture_state = () => ({
		Modal,
		navigate,
		api,
		z,
		data,
		show,
		rendered_event,
		l_submitting,
		event,
		schema,
		errors,
		close,
		submit
	});

	$$self.$inject_state = $$props => {
		if ('data' in $$props) $$invalidate(0, data = $$props.data);
		if ('show' in $$props) $$invalidate(6, show = $$props.show);
		if ('rendered_event' in $$props) $$invalidate(7, rendered_event = $$props.rendered_event);
		if ('l_submitting' in $$props) $$invalidate(1, l_submitting = $$props.l_submitting);
		if ('event' in $$props) $$invalidate(2, event = $$props.event);
		if ('errors' in $$props) $$invalidate(3, errors = $$props.errors);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		data,
		l_submitting,
		event,
		errors,
		close,
		submit,
		show,
		rendered_event,
		input0_input_handler,
		textarea_input_handler,
		input1_input_handler,
		input2_input_handler,
		input3_input_handler,
		input4_input_handler,
		input5_input_handler,
		input6_input_handler
	];
}

class EventModal extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$d, create_fragment$d, safe_not_equal, { data: 0, show: 6, rendered_event: 7 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "EventModal",
			options,
			id: create_fragment$d.name
		});
	}

	get data() {
		throw new Error("<EventModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set data(value) {
		throw new Error("<EventModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get show() {
		throw new Error("<EventModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set show(value) {
		throw new Error("<EventModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get rendered_event() {
		throw new Error("<EventModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set rendered_event(value) {
		throw new Error("<EventModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/routes/Events.svelte generated by Svelte v3.59.2 */
const file$b = "src/routes/Events.svelte";

function get_each_context$4(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[7] = list[i];
	return child_ctx;
}

// (7:2) {#each events || [] as event}
function create_each_block$4(ctx) {
	let eventcard;
	let current;

	eventcard = new EventCard({
			props: { event: /*event*/ ctx[7] },
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(eventcard.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(eventcard, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const eventcard_changes = {};
			if (dirty & /*events*/ 2) eventcard_changes.event = /*event*/ ctx[7];
			eventcard.$set(eventcard_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(eventcard.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(eventcard.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(eventcard, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$4.name,
		type: "each",
		source: "(7:2) {#each events || [] as event}",
		ctx
	});

	return block;
}

// (12:0) {#if !events}
function create_if_block_1$6(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Carregando...");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$6.name,
		type: "if",
		source: "(12:0) {#if !events}",
		ctx
	});

	return block;
}

// (14:0) {#if m_event}
function create_if_block$7(ctx) {
	let eventmodal;
	let updating_show;
	let current;

	function eventmodal_show_binding(value) {
		/*eventmodal_show_binding*/ ctx[6](value);
	}

	let eventmodal_props = {};

	if (/*m_event*/ ctx[2] !== void 0) {
		eventmodal_props.show = /*m_event*/ ctx[2];
	}

	eventmodal = new EventModal({ props: eventmodal_props, $$inline: true });
	binding_callbacks.push(() => bind(eventmodal, 'show', eventmodal_show_binding));

	const block = {
		c: function create() {
			create_component(eventmodal.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(eventmodal, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const eventmodal_changes = {};

			if (!updating_show && dirty & /*m_event*/ 4) {
				updating_show = true;
				eventmodal_changes.show = /*m_event*/ ctx[2];
				add_flush_callback(() => updating_show = false);
			}

			eventmodal.$set(eventmodal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(eventmodal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(eventmodal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(eventmodal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$7.name,
		type: "if",
		source: "(14:0) {#if m_event}",
		ctx
	});

	return block;
}

function create_fragment$c(ctx) {
	let div0;
	let input;
	let t0;
	let button;
	let t1;
	let div1;
	let t2;
	let t3;
	let if_block1_anchor;
	let current;
	let mounted;
	let dispose;

	button = new Button({
			props: {
				class: "grn",
				action: /*create_event*/ ctx[3],
				i: "add",
				t: "Novo Evento"
			},
			$$inline: true
		});

	let each_value = /*events*/ ctx[1] || [];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	let if_block0 = !/*events*/ ctx[1] && create_if_block_1$6(ctx);
	let if_block1 = /*m_event*/ ctx[2] && create_if_block$7(ctx);

	const block = {
		c: function create() {
			div0 = element("div");
			input = element("input");
			t0 = space();
			create_component(button.$$.fragment);
			t1 = space();
			div1 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t2 = space();
			if (if_block0) if_block0.c();
			t3 = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
			attr_dev(input, "placeholder", "Pesquisar");
			add_location(input, file$b, 1, 2, 22);
			attr_dev(div0, "class", "panel");
			add_location(div0, file$b, 0, 0, 0);
			attr_dev(div1, "class", "flex-list");
			add_location(div1, file$b, 5, 0, 153);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div0, anchor);
			append_dev(div0, input);
			set_input_value(input, /*query*/ ctx[0]);
			append_dev(div0, t0);
			mount_component(button, div0, null);
			insert_dev(target, t1, anchor);
			insert_dev(target, div1, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(div1, null);
				}
			}

			insert_dev(target, t2, anchor);
			if (if_block0) if_block0.m(target, anchor);
			insert_dev(target, t3, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert_dev(target, if_block1_anchor, anchor);
			current = true;

			if (!mounted) {
				dispose = listen_dev(input, "input", /*input_input_handler*/ ctx[5]);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*query*/ 1 && input.value !== /*query*/ ctx[0]) {
				set_input_value(input, /*query*/ ctx[0]);
			}

			if (dirty & /*events*/ 2) {
				each_value = /*events*/ ctx[1] || [];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$4(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$4(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div1, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			if (!/*events*/ ctx[1]) {
				if (if_block0) ; else {
					if_block0 = create_if_block_1$6(ctx);
					if_block0.c();
					if_block0.m(t3.parentNode, t3);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*m_event*/ ctx[2]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*m_event*/ 4) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block$7(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(button.$$.fragment, local);

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			transition_in(if_block1);
			current = true;
		},
		o: function outro(local) {
			transition_out(button.$$.fragment, local);
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div0);
			destroy_component(button);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(div1);
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(t2);
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach_dev(t3);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach_dev(if_block1_anchor);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$c.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$c($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Events', slots, []);
	let raw_events, events, query;
	let m_event;

	function create_event() {
		$$invalidate(2, m_event = true);
	}

	onMount(async _ => {
		let { data } = await api('all-events');
		$$invalidate(4, raw_events = data.events);
	});

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Events> was created with unknown prop '${key}'`);
	});

	function input_input_handler() {
		query = this.value;
		$$invalidate(0, query);
	}

	function eventmodal_show_binding(value) {
		m_event = value;
		$$invalidate(2, m_event);
	}

	$$self.$capture_state = () => ({
		EventCard,
		EventModal,
		Button,
		api,
		onMount,
		raw_events,
		events,
		query,
		m_event,
		create_event
	});

	$$self.$inject_state = $$props => {
		if ('raw_events' in $$props) $$invalidate(4, raw_events = $$props.raw_events);
		if ('events' in $$props) $$invalidate(1, events = $$props.events);
		if ('query' in $$props) $$invalidate(0, query = $$props.query);
		if ('m_event' in $$props) $$invalidate(2, m_event = $$props.m_event);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*raw_events, query*/ 17) {
			{
				$$invalidate(1, events = raw_events?.filter(e => e.name.toLowerCase().includes(query?.toLowerCase() || '')));
			}
		}
	};

	return [
		query,
		events,
		m_event,
		create_event,
		raw_events,
		input_input_handler,
		eventmodal_show_binding
	];
}

class Events extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$c, create_fragment$c, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Events",
			options,
			id: create_fragment$c.name
		});
	}
}

/* src/components/TicketModal.svelte generated by Svelte v3.59.2 */
const file$a = "src/components/TicketModal.svelte";

// (1:0) <Modal on:close={close}>
function create_default_slot$4(ctx) {
	let h2;
	let t0_value = (/*data*/ ctx[0] ? 'Editando' : 'Criando') + "";
	let t0;
	let t1;
	let t2;
	let form;
	let label0;
	let t3;
	let input0;
	let t4;
	let label1;
	let t5;
	let input1;
	let t6;
	let button;
	let t7_value = (/*l_submitting*/ ctx[1] ? '...' : 'Enviar') + "";
	let t7;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			h2 = element("h2");
			t0 = text(t0_value);
			t1 = text(" um Ingresso");
			t2 = space();
			form = element("form");
			label0 = element("label");
			t3 = text("Nome:\n      ");
			input0 = element("input");
			t4 = space();
			label1 = element("label");
			t5 = text("Permitir meia:\n      ");
			input1 = element("input");
			t6 = space();
			button = element("button");
			t7 = text(t7_value);
			add_location(h2, file$a, 1, 2, 27);
			attr_dev(input0, "placeholder", "Nome do ingresso");
			input0.required = true;
			attr_dev(input0, "class", "svelte-q9w3gk");
			add_location(input0, file$a, 5, 6, 135);
			attr_dev(label0, "class", "svelte-q9w3gk");
			add_location(label0, file$a, 4, 4, 115);
			attr_dev(input1, "type", "checkbox");
			attr_dev(input1, "class", "svelte-q9w3gk");
			add_location(input1, file$a, 9, 6, 270);
			attr_dev(label1, "class", "row svelte-q9w3gk");
			add_location(label1, file$a, 8, 4, 229);
			attr_dev(button, "type", "submit");
			button.disabled = /*l_submitting*/ ctx[1];
			attr_dev(button, "class", "svelte-q9w3gk");
			add_location(button, file$a, 12, 4, 347);
			add_location(form, file$a, 3, 2, 85);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h2, anchor);
			append_dev(h2, t0);
			append_dev(h2, t1);
			insert_dev(target, t2, anchor);
			insert_dev(target, form, anchor);
			append_dev(form, label0);
			append_dev(label0, t3);
			append_dev(label0, input0);
			set_input_value(input0, /*ticket*/ ctx[2].name);
			append_dev(form, t4);
			append_dev(form, label1);
			append_dev(label1, t5);
			append_dev(label1, input1);
			input1.checked = /*ticket*/ ctx[2].allow_half;
			append_dev(form, t6);
			append_dev(form, button);
			append_dev(button, t7);

			if (!mounted) {
				dispose = [
					listen_dev(input0, "input", /*input0_input_handler*/ ctx[8]),
					listen_dev(input1, "change", /*input1_change_handler*/ ctx[9]),
					listen_dev(form, "submit", /*submit*/ ctx[4], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*data*/ 1 && t0_value !== (t0_value = (/*data*/ ctx[0] ? 'Editando' : 'Criando') + "")) set_data_dev(t0, t0_value);

			if (dirty & /*ticket*/ 4 && input0.value !== /*ticket*/ ctx[2].name) {
				set_input_value(input0, /*ticket*/ ctx[2].name);
			}

			if (dirty & /*ticket*/ 4) {
				input1.checked = /*ticket*/ ctx[2].allow_half;
			}

			if (dirty & /*l_submitting*/ 2 && t7_value !== (t7_value = (/*l_submitting*/ ctx[1] ? '...' : 'Enviar') + "")) set_data_dev(t7, t7_value);

			if (dirty & /*l_submitting*/ 2) {
				prop_dev(button, "disabled", /*l_submitting*/ ctx[1]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(h2);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(form);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$4.name,
		type: "slot",
		source: "(1:0) <Modal on:close={close}>",
		ctx
	});

	return block;
}

function create_fragment$b(ctx) {
	let modal;
	let current;

	modal = new Modal({
			props: {
				$$slots: { default: [create_default_slot$4] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	modal.$on("close", /*close*/ ctx[3]);

	const block = {
		c: function create() {
			create_component(modal.$$.fragment);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			mount_component(modal, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const modal_changes = {};

			if (dirty & /*$$scope, l_submitting, ticket, data*/ 1031) {
				modal_changes.$$scope = { dirty, ctx };
			}

			modal.$set(modal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(modal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(modal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(modal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$b.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$b($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('TicketModal', slots, []);
	let { data, event_id, show, rendered_ticket } = $$props;
	let l_submitting;

	let ticket = {
		name: data?.name,
		allow_half: data?.allow_half
	};

	function close() {
		$$invalidate(5, show = false);
	}

	async function submit(e) {
		e.preventDefault();
		$$invalidate(1, l_submitting = true);

		if (!data) {
			const { data } = await api(`ticket/${event_id}`, 'POST', ticket);
			return navigate(`/ingresso/${data.id}`);
		}

		await api(`edit-ticket/${data.id}`, 'PUT', ticket);
		$$invalidate(6, rendered_ticket = { ...rendered_ticket, ...ticket });
		close();
	}

	$$self.$$.on_mount.push(function () {
		if (data === undefined && !('data' in $$props || $$self.$$.bound[$$self.$$.props['data']])) {
			console.warn("<TicketModal> was created without expected prop 'data'");
		}

		if (event_id === undefined && !('event_id' in $$props || $$self.$$.bound[$$self.$$.props['event_id']])) {
			console.warn("<TicketModal> was created without expected prop 'event_id'");
		}

		if (show === undefined && !('show' in $$props || $$self.$$.bound[$$self.$$.props['show']])) {
			console.warn("<TicketModal> was created without expected prop 'show'");
		}

		if (rendered_ticket === undefined && !('rendered_ticket' in $$props || $$self.$$.bound[$$self.$$.props['rendered_ticket']])) {
			console.warn("<TicketModal> was created without expected prop 'rendered_ticket'");
		}
	});

	const writable_props = ['data', 'event_id', 'show', 'rendered_ticket'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TicketModal> was created with unknown prop '${key}'`);
	});

	function input0_input_handler() {
		ticket.name = this.value;
		$$invalidate(2, ticket);
	}

	function input1_change_handler() {
		ticket.allow_half = this.checked;
		$$invalidate(2, ticket);
	}

	$$self.$$set = $$props => {
		if ('data' in $$props) $$invalidate(0, data = $$props.data);
		if ('event_id' in $$props) $$invalidate(7, event_id = $$props.event_id);
		if ('show' in $$props) $$invalidate(5, show = $$props.show);
		if ('rendered_ticket' in $$props) $$invalidate(6, rendered_ticket = $$props.rendered_ticket);
	};

	$$self.$capture_state = () => ({
		Modal,
		navigate,
		api,
		data,
		event_id,
		show,
		rendered_ticket,
		l_submitting,
		ticket,
		close,
		submit
	});

	$$self.$inject_state = $$props => {
		if ('data' in $$props) $$invalidate(0, data = $$props.data);
		if ('event_id' in $$props) $$invalidate(7, event_id = $$props.event_id);
		if ('show' in $$props) $$invalidate(5, show = $$props.show);
		if ('rendered_ticket' in $$props) $$invalidate(6, rendered_ticket = $$props.rendered_ticket);
		if ('l_submitting' in $$props) $$invalidate(1, l_submitting = $$props.l_submitting);
		if ('ticket' in $$props) $$invalidate(2, ticket = $$props.ticket);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		data,
		l_submitting,
		ticket,
		close,
		submit,
		show,
		rendered_ticket,
		event_id,
		input0_input_handler,
		input1_change_handler
	];
}

class TicketModal extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$b, create_fragment$b, safe_not_equal, {
			data: 0,
			event_id: 7,
			show: 5,
			rendered_ticket: 6
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "TicketModal",
			options,
			id: create_fragment$b.name
		});
	}

	get data() {
		throw new Error("<TicketModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set data(value) {
		throw new Error("<TicketModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get event_id() {
		throw new Error("<TicketModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set event_id(value) {
		throw new Error("<TicketModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get show() {
		throw new Error("<TicketModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set show(value) {
		throw new Error("<TicketModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get rendered_ticket() {
		throw new Error("<TicketModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set rendered_ticket(value) {
		throw new Error("<TicketModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/components/TicketCard.svelte generated by Svelte v3.59.2 */
const file$9 = "src/components/TicketCard.svelte";

function create_fragment$a(ctx) {
	let div1;
	let div0;
	let t0;
	let h3;
	let t1_value = /*ticket*/ ctx[0].name + "";
	let t1;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			div1 = element("div");
			div0 = element("div");
			t0 = space();
			h3 = element("h3");
			t1 = text(t1_value);
			attr_dev(div0, "class", "led svelte-ytrnzx");
			toggle_class(div0, "loading", /*loading*/ ctx[2]);
			toggle_class(div0, "active", /*active*/ ctx[1]);
			add_location(div0, file$9, 2, 2, 103);
			add_location(h3, file$9, 3, 2, 152);
			attr_dev(div1, "class", "row card cp svelte-ytrnzx");
			add_location(div1, file$9, 1, 0, 57);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			append_dev(div1, div0);
			append_dev(div1, t0);
			append_dev(div1, h3);
			append_dev(h3, t1);

			if (!mounted) {
				dispose = listen_dev(div1, "click", /*enter*/ ctx[3], false, false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*loading*/ 4) {
				toggle_class(div0, "loading", /*loading*/ ctx[2]);
			}

			if (dirty & /*active*/ 2) {
				toggle_class(div0, "active", /*active*/ ctx[1]);
			}

			if (dirty & /*ticket*/ 1 && t1_value !== (t1_value = /*ticket*/ ctx[0].name + "")) set_data_dev(t1, t1_value);
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$a.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$a($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('TicketCard', slots, []);
	let { ticket } = $$props;
	let active, loading = true;

	function enter() {
		navigate(`/ingresso/${ticket.id}`);
	}

	onMount(async _ => {
		const { data } = await api(`active-batch/${ticket.id}`);
		$$invalidate(1, active = data.batch);
		$$invalidate(2, loading = false);
	});

	$$self.$$.on_mount.push(function () {
		if (ticket === undefined && !('ticket' in $$props || $$self.$$.bound[$$self.$$.props['ticket']])) {
			console.warn("<TicketCard> was created without expected prop 'ticket'");
		}
	});

	const writable_props = ['ticket'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TicketCard> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('ticket' in $$props) $$invalidate(0, ticket = $$props.ticket);
	};

	$$self.$capture_state = () => ({
		navigate,
		api,
		onMount,
		ticket,
		active,
		loading,
		enter
	});

	$$self.$inject_state = $$props => {
		if ('ticket' in $$props) $$invalidate(0, ticket = $$props.ticket);
		if ('active' in $$props) $$invalidate(1, active = $$props.active);
		if ('loading' in $$props) $$invalidate(2, loading = $$props.loading);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [ticket, active, loading, enter];
}

class TicketCard extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$a, create_fragment$a, safe_not_equal, { ticket: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "TicketCard",
			options,
			id: create_fragment$a.name
		});
	}

	get ticket() {
		throw new Error("<TicketCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set ticket(value) {
		throw new Error("<TicketCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/routes/EventDetails.svelte generated by Svelte v3.59.2 */
const file$8 = "src/routes/EventDetails.svelte";

function get_each_context$3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[16] = list[i];
	return child_ctx;
}

// (32:0) {:else}
function create_else_block$2(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Carregando...");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$2.name,
		type: "else",
		source: "(32:0) {:else}",
		ctx
	});

	return block;
}

// (7:0) {#if tickets != undefined}
function create_if_block_4$1(ctx) {
	let div2;
	let img;
	let img_src_value;
	let t0;
	let div0;
	let h2;
	let t1_value = /*event*/ ctx[0].name + "";
	let t1;
	let t2;
	let span;
	let icon0;
	let t3;
	let t4_value = new Date(/*event*/ ctx[0].date).toLocaleDateString('pt-BR') + "";
	let t4;
	let t5;
	let br;
	let t6;
	let t7_value = (/*event*/ ctx[0].description || 'Sem descrição.') + "";
	let t7;
	let t8;
	let div1;
	let b0;
	let icon1;
	let t9;
	let t10;
	let t11_value = /*event*/ ctx[0].local + "";
	let t11;
	let t12;
	let b1;
	let icon2;
	let t13;
	let t14;
	let t15_value = /*event*/ ctx[0].address + "";
	let t15;
	let t16;
	let b2;
	let icon3;
	let t17;
	let a;
	let t18;
	let a_href_value;
	let t19;
	let div3;
	let t20;
	let button;
	let t21;
	let div4;
	let current;
	let mounted;
	let dispose;

	icon0 = new Icon({
			props: { i: "calendar_month" },
			$$inline: true
		});

	icon1 = new Icon({ props: { i: "map" }, $$inline: true });

	icon2 = new Icon({
			props: { i: "location_on" },
			$$inline: true
		});

	icon3 = new Icon({ props: { i: "public" }, $$inline: true });

	button = new Button({
			props: {
				class: "grn",
				action: /*create_ticket*/ ctx[8],
				i: "add",
				t: "Criar Ingresso"
			},
			$$inline: true
		});

	let each_value = /*tickets*/ ctx[1] || [];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			div2 = element("div");
			img = element("img");
			t0 = space();
			div0 = element("div");
			h2 = element("h2");
			t1 = text(t1_value);
			t2 = space();
			span = element("span");
			create_component(icon0.$$.fragment);
			t3 = space();
			t4 = text(t4_value);
			t5 = space();
			br = element("br");
			t6 = space();
			t7 = text(t7_value);
			t8 = space();
			div1 = element("div");
			b0 = element("b");
			create_component(icon1.$$.fragment);
			t9 = text("         Local:");
			t10 = space();
			t11 = text(t11_value);
			t12 = space();
			b1 = element("b");
			create_component(icon2.$$.fragment);
			t13 = text(" Endereço:");
			t14 = space();
			t15 = text(t15_value);
			t16 = space();
			b2 = element("b");
			create_component(icon3.$$.fragment);
			t17 = space();
			a = element("a");
			t18 = text("Localização no maps");
			t19 = space();
			div3 = element("div");
			t20 = space();
			create_component(button.$$.fragment);
			t21 = space();
			div4 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			if (!src_url_equal(img.src, img_src_value = /*event*/ ctx[0].image)) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "Sem imagem");
			attr_dev(img, "class", "svelte-wrj9cp");
			add_location(img, file$8, 8, 4, 302);
			attr_dev(span, "class", "row detail");
			add_location(span, file$8, 12, 36, 488);
			attr_dev(h2, "class", "row");
			add_location(h2, file$8, 12, 6, 458);
			add_location(br, file$8, 12, 157, 609);
			attr_dev(div0, "class", "data svelte-wrj9cp");
			add_location(div0, file$8, 11, 4, 409);
			attr_dev(b0, "class", "row");
			add_location(b0, file$8, 17, 6, 702);
			attr_dev(b1, "class", "row");
			add_location(b1, file$8, 18, 6, 778);
			attr_dev(a, "href", a_href_value = `https://www.google.com/maps?q=${/*event*/ ctx[0].latitude},${/*event*/ ctx[0].longitude}`);
			add_location(a, file$8, 19, 47, 897);
			attr_dev(b2, "class", "row");
			add_location(b2, file$8, 19, 6, 856);
			attr_dev(div1, "class", "local svelte-wrj9cp");
			add_location(div1, file$8, 16, 4, 676);
			attr_dev(div2, "class", "info svelte-wrj9cp");
			add_location(div2, file$8, 7, 2, 279);
			attr_dev(div3, "class", "hr");
			add_location(div3, file$8, 23, 2, 1030);
			attr_dev(div4, "class", "flex-list");
			add_location(div4, file$8, 26, 2, 1127);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div2, anchor);
			append_dev(div2, img);
			append_dev(div2, t0);
			append_dev(div2, div0);
			append_dev(div0, h2);
			append_dev(h2, t1);
			append_dev(h2, t2);
			append_dev(h2, span);
			mount_component(icon0, span, null);
			append_dev(span, t3);
			append_dev(span, t4);
			append_dev(div0, t5);
			append_dev(div0, br);
			append_dev(div0, t6);
			append_dev(div0, t7);
			append_dev(div2, t8);
			append_dev(div2, div1);
			append_dev(div1, b0);
			mount_component(icon1, b0, null);
			append_dev(b0, t9);
			append_dev(div1, t10);
			append_dev(div1, t11);
			append_dev(div1, t12);
			append_dev(div1, b1);
			mount_component(icon2, b1, null);
			append_dev(b1, t13);
			append_dev(div1, t14);
			append_dev(div1, t15);
			append_dev(div1, t16);
			append_dev(div1, b2);
			mount_component(icon3, b2, null);
			append_dev(b2, t17);
			append_dev(b2, a);
			append_dev(a, t18);
			insert_dev(target, t19, anchor);
			insert_dev(target, div3, anchor);
			insert_dev(target, t20, anchor);
			mount_component(button, target, anchor);
			insert_dev(target, t21, anchor);
			insert_dev(target, div4, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(div4, null);
				}
			}

			current = true;

			if (!mounted) {
				dispose = listen_dev(div0, "click", /*open_details*/ ctx[9], false, false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (!current || dirty & /*event*/ 1 && !src_url_equal(img.src, img_src_value = /*event*/ ctx[0].image)) {
				attr_dev(img, "src", img_src_value);
			}

			if ((!current || dirty & /*event*/ 1) && t1_value !== (t1_value = /*event*/ ctx[0].name + "")) set_data_dev(t1, t1_value);
			if ((!current || dirty & /*event*/ 1) && t4_value !== (t4_value = new Date(/*event*/ ctx[0].date).toLocaleDateString('pt-BR') + "")) set_data_dev(t4, t4_value);
			if ((!current || dirty & /*event*/ 1) && t7_value !== (t7_value = (/*event*/ ctx[0].description || 'Sem descrição.') + "")) set_data_dev(t7, t7_value);
			if ((!current || dirty & /*event*/ 1) && t11_value !== (t11_value = /*event*/ ctx[0].local + "")) set_data_dev(t11, t11_value);
			if ((!current || dirty & /*event*/ 1) && t15_value !== (t15_value = /*event*/ ctx[0].address + "")) set_data_dev(t15, t15_value);

			if (!current || dirty & /*event*/ 1 && a_href_value !== (a_href_value = `https://www.google.com/maps?q=${/*event*/ ctx[0].latitude},${/*event*/ ctx[0].longitude}`)) {
				attr_dev(a, "href", a_href_value);
			}

			if (dirty & /*tickets*/ 2) {
				each_value = /*tickets*/ ctx[1] || [];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$3(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$3(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div4, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(icon0.$$.fragment, local);
			transition_in(icon1.$$.fragment, local);
			transition_in(icon2.$$.fragment, local);
			transition_in(icon3.$$.fragment, local);
			transition_in(button.$$.fragment, local);

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			transition_out(icon0.$$.fragment, local);
			transition_out(icon1.$$.fragment, local);
			transition_out(icon2.$$.fragment, local);
			transition_out(icon3.$$.fragment, local);
			transition_out(button.$$.fragment, local);
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
			destroy_component(icon0);
			destroy_component(icon1);
			destroy_component(icon2);
			destroy_component(icon3);
			if (detaching) detach_dev(t19);
			if (detaching) detach_dev(div3);
			if (detaching) detach_dev(t20);
			destroy_component(button, detaching);
			if (detaching) detach_dev(t21);
			if (detaching) detach_dev(div4);
			destroy_each(each_blocks, detaching);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_4$1.name,
		type: "if",
		source: "(7:0) {#if tickets != undefined}",
		ctx
	});

	return block;
}

// (28:4) {#each tickets || [] as ticket}
function create_each_block$3(ctx) {
	let ticketcard;
	let current;

	ticketcard = new TicketCard({
			props: { ticket: /*ticket*/ ctx[16] },
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(ticketcard.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(ticketcard, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const ticketcard_changes = {};
			if (dirty & /*tickets*/ 2) ticketcard_changes.ticket = /*ticket*/ ctx[16];
			ticketcard.$set(ticketcard_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(ticketcard.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(ticketcard.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(ticketcard, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$3.name,
		type: "each",
		source: "(28:4) {#each tickets || [] as ticket}",
		ctx
	});

	return block;
}

// (35:0) {#if l_deleting}
function create_if_block_3$2(ctx) {
	let modal;
	let current;

	modal = new Modal({
			props: {
				$$slots: { default: [create_default_slot_1$1] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(modal.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(modal, target, anchor);
			current = true;
		},
		i: function intro(local) {
			if (current) return;
			transition_in(modal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(modal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(modal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3$2.name,
		type: "if",
		source: "(35:0) {#if l_deleting}",
		ctx
	});

	return block;
}

// (36:2) <Modal>
function create_default_slot_1$1(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Excluindo...");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_1$1.name,
		type: "slot",
		source: "(36:2) <Modal>",
		ctx
	});

	return block;
}

// (39:0) {#if m_event}
function create_if_block_2$2(ctx) {
	let eventmodal;
	let updating_rendered_event;
	let updating_show;
	let current;

	function eventmodal_rendered_event_binding(value) {
		/*eventmodal_rendered_event_binding*/ ctx[11](value);
	}

	function eventmodal_show_binding(value) {
		/*eventmodal_show_binding*/ ctx[12](value);
	}

	let eventmodal_props = { data: /*event*/ ctx[0] };

	if (/*event*/ ctx[0] !== void 0) {
		eventmodal_props.rendered_event = /*event*/ ctx[0];
	}

	if (/*m_event*/ ctx[3] !== void 0) {
		eventmodal_props.show = /*m_event*/ ctx[3];
	}

	eventmodal = new EventModal({ props: eventmodal_props, $$inline: true });
	binding_callbacks.push(() => bind(eventmodal, 'rendered_event', eventmodal_rendered_event_binding));
	binding_callbacks.push(() => bind(eventmodal, 'show', eventmodal_show_binding));

	const block = {
		c: function create() {
			create_component(eventmodal.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(eventmodal, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const eventmodal_changes = {};
			if (dirty & /*event*/ 1) eventmodal_changes.data = /*event*/ ctx[0];

			if (!updating_rendered_event && dirty & /*event*/ 1) {
				updating_rendered_event = true;
				eventmodal_changes.rendered_event = /*event*/ ctx[0];
				add_flush_callback(() => updating_rendered_event = false);
			}

			if (!updating_show && dirty & /*m_event*/ 8) {
				updating_show = true;
				eventmodal_changes.show = /*m_event*/ ctx[3];
				add_flush_callback(() => updating_show = false);
			}

			eventmodal.$set(eventmodal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(eventmodal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(eventmodal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(eventmodal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2$2.name,
		type: "if",
		source: "(39:0) {#if m_event}",
		ctx
	});

	return block;
}

// (43:0) {#if m_ticket}
function create_if_block_1$5(ctx) {
	let ticketmodal;
	let updating_show;
	let current;

	function ticketmodal_show_binding(value) {
		/*ticketmodal_show_binding*/ ctx[13](value);
	}

	let ticketmodal_props = { event_id: /*event*/ ctx[0].id };

	if (/*m_ticket*/ ctx[4] !== void 0) {
		ticketmodal_props.show = /*m_ticket*/ ctx[4];
	}

	ticketmodal = new TicketModal({ props: ticketmodal_props, $$inline: true });
	binding_callbacks.push(() => bind(ticketmodal, 'show', ticketmodal_show_binding));

	const block = {
		c: function create() {
			create_component(ticketmodal.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(ticketmodal, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const ticketmodal_changes = {};
			if (dirty & /*event*/ 1) ticketmodal_changes.event_id = /*event*/ ctx[0].id;

			if (!updating_show && dirty & /*m_ticket*/ 16) {
				updating_show = true;
				ticketmodal_changes.show = /*m_ticket*/ ctx[4];
				add_flush_callback(() => updating_show = false);
			}

			ticketmodal.$set(ticketmodal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(ticketmodal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(ticketmodal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(ticketmodal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$5.name,
		type: "if",
		source: "(43:0) {#if m_ticket}",
		ctx
	});

	return block;
}

// (47:0) {#if m_details}
function create_if_block$6(ctx) {
	let modal;
	let updating_show;
	let current;

	function modal_show_binding(value) {
		/*modal_show_binding*/ ctx[14](value);
	}

	let modal_props = {
		$$slots: { default: [create_default_slot$3] },
		$$scope: { ctx }
	};

	if (/*m_details*/ ctx[5] !== void 0) {
		modal_props.show = /*m_details*/ ctx[5];
	}

	modal = new Modal({ props: modal_props, $$inline: true });
	binding_callbacks.push(() => bind(modal, 'show', modal_show_binding));

	const block = {
		c: function create() {
			create_component(modal.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(modal, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const modal_changes = {};

			if (dirty & /*$$scope, event*/ 524289) {
				modal_changes.$$scope = { dirty, ctx };
			}

			if (!updating_show && dirty & /*m_details*/ 32) {
				updating_show = true;
				modal_changes.show = /*m_details*/ ctx[5];
				add_flush_callback(() => updating_show = false);
			}

			modal.$set(modal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(modal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(modal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(modal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$6.name,
		type: "if",
		source: "(47:0) {#if m_details}",
		ctx
	});

	return block;
}

// (48:2) <Modal bind:show={m_details}>
function create_default_slot$3(ctx) {
	let h2;
	let t0_value = /*event*/ ctx[0].name + "";
	let t0;
	let t1;
	let p;
	let t2_value = /*event*/ ctx[0].description + "";
	let t2;

	const block = {
		c: function create() {
			h2 = element("h2");
			t0 = text(t0_value);
			t1 = space();
			p = element("p");
			t2 = text(t2_value);
			add_location(h2, file$8, 48, 4, 1555);
			attr_dev(p, "class", "wrappable");
			add_location(p, file$8, 49, 4, 1583);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h2, anchor);
			append_dev(h2, t0);
			insert_dev(target, t1, anchor);
			insert_dev(target, p, anchor);
			append_dev(p, t2);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*event*/ 1 && t0_value !== (t0_value = /*event*/ ctx[0].name + "")) set_data_dev(t0, t0_value);
			if (dirty & /*event*/ 1 && t2_value !== (t2_value = /*event*/ ctx[0].description + "")) set_data_dev(t2, t2_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(h2);
			if (detaching) detach_dev(t1);
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$3.name,
		type: "slot",
		source: "(48:2) <Modal bind:show={m_details}>",
		ctx
	});

	return block;
}

function create_fragment$9(ctx) {
	let div;
	let button0;
	let t0;
	let button1;
	let t1;
	let button2;
	let t2;
	let current_block_type_index;
	let if_block0;
	let t3;
	let t4;
	let t5;
	let t6;
	let if_block4_anchor;
	let current;

	button0 = new Button({
			props: {
				action: /*back*/ ctx[6],
				i: "arrow_back",
				t: "Voltar"
			},
			$$inline: true
		});

	button1 = new Button({
			props: {
				class: "blu",
				action: /*edit_event*/ ctx[7],
				i: "edit",
				t: "Editar"
			},
			$$inline: true
		});

	button2 = new Button({
			props: {
				class: "red",
				action: /*delete_event*/ ctx[10],
				i: "delete",
				t: "Excluir"
			},
			$$inline: true
		});

	const if_block_creators = [create_if_block_4$1, create_else_block$2];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*tickets*/ ctx[1] != undefined) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	let if_block1 = /*l_deleting*/ ctx[2] && create_if_block_3$2(ctx);
	let if_block2 = /*m_event*/ ctx[3] && create_if_block_2$2(ctx);
	let if_block3 = /*m_ticket*/ ctx[4] && create_if_block_1$5(ctx);
	let if_block4 = /*m_details*/ ctx[5] && create_if_block$6(ctx);

	const block = {
		c: function create() {
			div = element("div");
			create_component(button0.$$.fragment);
			t0 = space();
			create_component(button1.$$.fragment);
			t1 = space();
			create_component(button2.$$.fragment);
			t2 = space();
			if_block0.c();
			t3 = space();
			if (if_block1) if_block1.c();
			t4 = space();
			if (if_block2) if_block2.c();
			t5 = space();
			if (if_block3) if_block3.c();
			t6 = space();
			if (if_block4) if_block4.c();
			if_block4_anchor = empty();
			attr_dev(div, "class", "panel");
			add_location(div, file$8, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			mount_component(button0, div, null);
			append_dev(div, t0);
			mount_component(button1, div, null);
			append_dev(div, t1);
			mount_component(button2, div, null);
			insert_dev(target, t2, anchor);
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, t3, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert_dev(target, t4, anchor);
			if (if_block2) if_block2.m(target, anchor);
			insert_dev(target, t5, anchor);
			if (if_block3) if_block3.m(target, anchor);
			insert_dev(target, t6, anchor);
			if (if_block4) if_block4.m(target, anchor);
			insert_dev(target, if_block4_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block0 = if_blocks[current_block_type_index];

				if (!if_block0) {
					if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block0.c();
				} else {
					if_block0.p(ctx, dirty);
				}

				transition_in(if_block0, 1);
				if_block0.m(t3.parentNode, t3);
			}

			if (/*l_deleting*/ ctx[2]) {
				if (if_block1) {
					if (dirty & /*l_deleting*/ 4) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_3$2(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(t4.parentNode, t4);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			if (/*m_event*/ ctx[3]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);

					if (dirty & /*m_event*/ 8) {
						transition_in(if_block2, 1);
					}
				} else {
					if_block2 = create_if_block_2$2(ctx);
					if_block2.c();
					transition_in(if_block2, 1);
					if_block2.m(t5.parentNode, t5);
				}
			} else if (if_block2) {
				group_outros();

				transition_out(if_block2, 1, 1, () => {
					if_block2 = null;
				});

				check_outros();
			}

			if (/*m_ticket*/ ctx[4]) {
				if (if_block3) {
					if_block3.p(ctx, dirty);

					if (dirty & /*m_ticket*/ 16) {
						transition_in(if_block3, 1);
					}
				} else {
					if_block3 = create_if_block_1$5(ctx);
					if_block3.c();
					transition_in(if_block3, 1);
					if_block3.m(t6.parentNode, t6);
				}
			} else if (if_block3) {
				group_outros();

				transition_out(if_block3, 1, 1, () => {
					if_block3 = null;
				});

				check_outros();
			}

			if (/*m_details*/ ctx[5]) {
				if (if_block4) {
					if_block4.p(ctx, dirty);

					if (dirty & /*m_details*/ 32) {
						transition_in(if_block4, 1);
					}
				} else {
					if_block4 = create_if_block$6(ctx);
					if_block4.c();
					transition_in(if_block4, 1);
					if_block4.m(if_block4_anchor.parentNode, if_block4_anchor);
				}
			} else if (if_block4) {
				group_outros();

				transition_out(if_block4, 1, 1, () => {
					if_block4 = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(button0.$$.fragment, local);
			transition_in(button1.$$.fragment, local);
			transition_in(button2.$$.fragment, local);
			transition_in(if_block0);
			transition_in(if_block1);
			transition_in(if_block2);
			transition_in(if_block3);
			transition_in(if_block4);
			current = true;
		},
		o: function outro(local) {
			transition_out(button0.$$.fragment, local);
			transition_out(button1.$$.fragment, local);
			transition_out(button2.$$.fragment, local);
			transition_out(if_block0);
			transition_out(if_block1);
			transition_out(if_block2);
			transition_out(if_block3);
			transition_out(if_block4);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_component(button0);
			destroy_component(button1);
			destroy_component(button2);
			if (detaching) detach_dev(t2);
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach_dev(t3);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach_dev(t4);
			if (if_block2) if_block2.d(detaching);
			if (detaching) detach_dev(t5);
			if (if_block3) if_block3.d(detaching);
			if (detaching) detach_dev(t6);
			if (if_block4) if_block4.d(detaching);
			if (detaching) detach_dev(if_block4_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$9.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$9($$self, $$props, $$invalidate) {
	let $curr_path;
	validate_store(curr_path, 'curr_path');
	component_subscribe($$self, curr_path, $$value => $$invalidate(15, $curr_path = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('EventDetails', slots, []);
	let event, tickets;
	let l_deleting;
	let m_event, m_ticket, m_details;

	function back() {
		navigate('/eventos');
	}

	function edit_event() {
		$$invalidate(3, m_event = true);
	}

	function create_ticket() {
		$$invalidate(4, m_ticket = true);
	}

	function open_details() {
		$$invalidate(5, m_details = true);
	}

	async function delete_event() {
		if (!confirm('Certeza que deseja excluir?')) return;
		$$invalidate(2, l_deleting = true);
		await api(`event/${event.id}`, 'DELETE');
		back();
	}

	onMount(async _ => {
		const { data } = await api(`events/${$curr_path.split('/').pop()}`);
		$$invalidate(0, event = data.event);
		$$invalidate(1, tickets = data.tickets);
		opened_event.set({ ...event, tickets });
	});

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<EventDetails> was created with unknown prop '${key}'`);
	});

	function eventmodal_rendered_event_binding(value) {
		event = value;
		$$invalidate(0, event);
	}

	function eventmodal_show_binding(value) {
		m_event = value;
		$$invalidate(3, m_event);
	}

	function ticketmodal_show_binding(value) {
		m_ticket = value;
		$$invalidate(4, m_ticket);
	}

	function modal_show_binding(value) {
		m_details = value;
		$$invalidate(5, m_details);
	}

	$$self.$capture_state = () => ({
		TicketModal,
		EventModal,
		TicketCard,
		Button,
		Modal,
		Icon,
		curr_path,
		opened_event,
		navigate,
		api,
		onMount,
		event,
		tickets,
		l_deleting,
		m_event,
		m_ticket,
		m_details,
		back,
		edit_event,
		create_ticket,
		open_details,
		delete_event,
		$curr_path
	});

	$$self.$inject_state = $$props => {
		if ('event' in $$props) $$invalidate(0, event = $$props.event);
		if ('tickets' in $$props) $$invalidate(1, tickets = $$props.tickets);
		if ('l_deleting' in $$props) $$invalidate(2, l_deleting = $$props.l_deleting);
		if ('m_event' in $$props) $$invalidate(3, m_event = $$props.m_event);
		if ('m_ticket' in $$props) $$invalidate(4, m_ticket = $$props.m_ticket);
		if ('m_details' in $$props) $$invalidate(5, m_details = $$props.m_details);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		event,
		tickets,
		l_deleting,
		m_event,
		m_ticket,
		m_details,
		back,
		edit_event,
		create_ticket,
		open_details,
		delete_event,
		eventmodal_rendered_event_binding,
		eventmodal_show_binding,
		ticketmodal_show_binding,
		modal_show_binding
	];
}

class EventDetails extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "EventDetails",
			options,
			id: create_fragment$9.name
		});
	}
}

/* src/components/BatchModal.svelte generated by Svelte v3.59.2 */
const file$7 = "src/components/BatchModal.svelte";

// (1:0) <Modal on:close={close}>
function create_default_slot$2(ctx) {
	let h2;
	let t0_value = (/*data*/ ctx[1] ? 'Editando' : 'Criando') + "";
	let t0;
	let t1;
	let t2;
	let form;
	let label0;
	let t3;
	let input0;
	let t4;
	let label1;
	let t5;
	let input1;
	let t6;
	let label2;
	let t7;
	let input2;
	let t8;
	let button;
	let t9_value = (/*l_submitting*/ ctx[0] ? '...' : 'Enviar') + "";
	let t9;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			h2 = element("h2");
			t0 = text(t0_value);
			t1 = text(" um Lote");
			t2 = space();
			form = element("form");
			label0 = element("label");
			t3 = text("Preço:\n      ");
			input0 = element("input");
			t4 = space();
			label1 = element("label");
			t5 = text("Preço de meia:\n      ");
			input1 = element("input");
			t6 = space();
			label2 = element("label");
			t7 = text("Quantidade:\n      ");
			input2 = element("input");
			t8 = space();
			button = element("button");
			t9 = text(t9_value);
			add_location(h2, file$7, 1, 2, 27);
			attr_dev(input0, "type", "text");
			attr_dev(input0, "placeholder", "R$");
			input0.required = true;
			attr_dev(input0, "class", "svelte-o521gg");
			add_location(input0, file$7, 5, 6, 132);
			attr_dev(label0, "class", "svelte-o521gg");
			add_location(label0, file$7, 4, 4, 111);
			attr_dev(input1, "type", "text");
			attr_dev(input1, "placeholder", "R$");
			input1.required = /*allow_half*/ ctx[2];
			attr_dev(input1, "class", "svelte-o521gg");
			add_location(input1, file$7, 9, 6, 252);
			attr_dev(label1, "class", "svelte-o521gg");
			add_location(label1, file$7, 8, 4, 223);
			attr_dev(input2, "type", "number");
			input2.required = true;
			attr_dev(input2, "class", "svelte-o521gg");
			add_location(input2, file$7, 13, 6, 389);
			attr_dev(label2, "class", "svelte-o521gg");
			add_location(label2, file$7, 12, 4, 363);
			attr_dev(button, "type", "submit");
			button.disabled = /*l_submitting*/ ctx[0];
			attr_dev(button, "class", "svelte-o521gg");
			add_location(button, file$7, 16, 4, 466);
			add_location(form, file$7, 3, 2, 81);
		},
		m: function mount(target, anchor) {
			insert_dev(target, h2, anchor);
			append_dev(h2, t0);
			append_dev(h2, t1);
			insert_dev(target, t2, anchor);
			insert_dev(target, form, anchor);
			append_dev(form, label0);
			append_dev(label0, t3);
			append_dev(label0, input0);
			set_input_value(input0, /*batch*/ ctx[3].price);
			append_dev(form, t4);
			append_dev(form, label1);
			append_dev(label1, t5);
			append_dev(label1, input1);
			set_input_value(input1, /*batch*/ ctx[3].half_price);
			append_dev(form, t6);
			append_dev(form, label2);
			append_dev(label2, t7);
			append_dev(label2, input2);
			set_input_value(input2, /*batch*/ ctx[3].amount);
			append_dev(form, t8);
			append_dev(form, button);
			append_dev(button, t9);

			if (!mounted) {
				dispose = [
					listen_dev(input0, "input", /*input0_input_handler*/ ctx[10]),
					listen_dev(input1, "input", /*input1_input_handler*/ ctx[11]),
					listen_dev(input2, "input", /*input2_input_handler*/ ctx[12]),
					listen_dev(form, "submit", /*submit*/ ctx[5], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*data*/ 2 && t0_value !== (t0_value = (/*data*/ ctx[1] ? 'Editando' : 'Criando') + "")) set_data_dev(t0, t0_value);

			if (dirty & /*batch*/ 8 && input0.value !== /*batch*/ ctx[3].price) {
				set_input_value(input0, /*batch*/ ctx[3].price);
			}

			if (dirty & /*allow_half*/ 4) {
				prop_dev(input1, "required", /*allow_half*/ ctx[2]);
			}

			if (dirty & /*batch*/ 8 && input1.value !== /*batch*/ ctx[3].half_price) {
				set_input_value(input1, /*batch*/ ctx[3].half_price);
			}

			if (dirty & /*batch*/ 8 && to_number(input2.value) !== /*batch*/ ctx[3].amount) {
				set_input_value(input2, /*batch*/ ctx[3].amount);
			}

			if (dirty & /*l_submitting*/ 1 && t9_value !== (t9_value = (/*l_submitting*/ ctx[0] ? '...' : 'Enviar') + "")) set_data_dev(t9, t9_value);

			if (dirty & /*l_submitting*/ 1) {
				prop_dev(button, "disabled", /*l_submitting*/ ctx[0]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(h2);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(form);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$2.name,
		type: "slot",
		source: "(1:0) <Modal on:close={close}>",
		ctx
	});

	return block;
}

function create_fragment$8(ctx) {
	let modal;
	let current;

	modal = new Modal({
			props: {
				$$slots: { default: [create_default_slot$2] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	modal.$on("close", /*close*/ ctx[4]);

	const block = {
		c: function create() {
			create_component(modal.$$.fragment);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			mount_component(modal, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const modal_changes = {};

			if (dirty & /*$$scope, l_submitting, batch, allow_half, data*/ 16399) {
				modal_changes.$$scope = { dirty, ctx };
			}

			modal.$set(modal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(modal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(modal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(modal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$8.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function format_price$1(price) {
	price = String(price).replaceAll(',', '.').replaceAll(/[^\d\.]/g, '');
	const parts = price.split('.');
	if (parts.length > 1) price = `${parts[0]}.${parts.slice(1).join('').slice(0, 2)}`;
	return price;
}

function instance$8($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('BatchModal', slots, []);
	let { data, ticket_id, allow_half, show, rendered_batch, batches, l_submitting } = $$props;
	const started_with_amount = data?.amount;

	let batch = {
		price: data?.price_in_cents / 100 || undefined,
		half_price: data?.half_price_in_cents / 100 || undefined,
		amount: data?.amount
	};

	function close() {
		$$invalidate(6, show = false);
	}

	async function submit(e) {
		e.preventDefault();
		$$invalidate(0, l_submitting = true);
		$$invalidate(3, batch.price_in_cents = batch.price * 100, batch);
		$$invalidate(3, batch.half_price_in_cents = batch.half_price * 100, batch);
		if (isNaN(batch.half_price_in_cents)) delete batch.half_price_in_cents;

		if (!data) {
			const { id } = (await api(`create-batches/${ticket_id}`, 'POST', { batches: [batch] })).data;
			$$invalidate(8, batches = [...batches, { id, ...batch }]);
		} else {
			if (batch.amount == started_with_amount) delete batch.amount;
			await api(`edit-batch/${data.id}`, 'PUT', batch);
			$$invalidate(7, rendered_batch = { ...rendered_batch, ...batch });
		}

		$$invalidate(0, l_submitting = false);
		close();
	}

	$$self.$$.on_mount.push(function () {
		if (data === undefined && !('data' in $$props || $$self.$$.bound[$$self.$$.props['data']])) {
			console.warn("<BatchModal> was created without expected prop 'data'");
		}

		if (ticket_id === undefined && !('ticket_id' in $$props || $$self.$$.bound[$$self.$$.props['ticket_id']])) {
			console.warn("<BatchModal> was created without expected prop 'ticket_id'");
		}

		if (allow_half === undefined && !('allow_half' in $$props || $$self.$$.bound[$$self.$$.props['allow_half']])) {
			console.warn("<BatchModal> was created without expected prop 'allow_half'");
		}

		if (show === undefined && !('show' in $$props || $$self.$$.bound[$$self.$$.props['show']])) {
			console.warn("<BatchModal> was created without expected prop 'show'");
		}

		if (rendered_batch === undefined && !('rendered_batch' in $$props || $$self.$$.bound[$$self.$$.props['rendered_batch']])) {
			console.warn("<BatchModal> was created without expected prop 'rendered_batch'");
		}

		if (batches === undefined && !('batches' in $$props || $$self.$$.bound[$$self.$$.props['batches']])) {
			console.warn("<BatchModal> was created without expected prop 'batches'");
		}

		if (l_submitting === undefined && !('l_submitting' in $$props || $$self.$$.bound[$$self.$$.props['l_submitting']])) {
			console.warn("<BatchModal> was created without expected prop 'l_submitting'");
		}
	});

	const writable_props = [
		'data',
		'ticket_id',
		'allow_half',
		'show',
		'rendered_batch',
		'batches',
		'l_submitting'
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<BatchModal> was created with unknown prop '${key}'`);
	});

	function input0_input_handler() {
		batch.price = this.value;
		$$invalidate(3, batch);
	}

	function input1_input_handler() {
		batch.half_price = this.value;
		$$invalidate(3, batch);
	}

	function input2_input_handler() {
		batch.amount = to_number(this.value);
		$$invalidate(3, batch);
	}

	$$self.$$set = $$props => {
		if ('data' in $$props) $$invalidate(1, data = $$props.data);
		if ('ticket_id' in $$props) $$invalidate(9, ticket_id = $$props.ticket_id);
		if ('allow_half' in $$props) $$invalidate(2, allow_half = $$props.allow_half);
		if ('show' in $$props) $$invalidate(6, show = $$props.show);
		if ('rendered_batch' in $$props) $$invalidate(7, rendered_batch = $$props.rendered_batch);
		if ('batches' in $$props) $$invalidate(8, batches = $$props.batches);
		if ('l_submitting' in $$props) $$invalidate(0, l_submitting = $$props.l_submitting);
	};

	$$self.$capture_state = () => ({
		Modal,
		api,
		data,
		ticket_id,
		allow_half,
		show,
		rendered_batch,
		batches,
		l_submitting,
		started_with_amount,
		batch,
		close,
		format_price: format_price$1,
		submit
	});

	$$self.$inject_state = $$props => {
		if ('data' in $$props) $$invalidate(1, data = $$props.data);
		if ('ticket_id' in $$props) $$invalidate(9, ticket_id = $$props.ticket_id);
		if ('allow_half' in $$props) $$invalidate(2, allow_half = $$props.allow_half);
		if ('show' in $$props) $$invalidate(6, show = $$props.show);
		if ('rendered_batch' in $$props) $$invalidate(7, rendered_batch = $$props.rendered_batch);
		if ('batches' in $$props) $$invalidate(8, batches = $$props.batches);
		if ('l_submitting' in $$props) $$invalidate(0, l_submitting = $$props.l_submitting);
		if ('batch' in $$props) $$invalidate(3, batch = $$props.batch);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*batch*/ 8) {
			{
				if (batch.price) $$invalidate(3, batch.price = format_price$1(batch.price), batch);
				if (batch.half_price) $$invalidate(3, batch.half_price = format_price$1(batch.half_price), batch);
			}
		}
	};

	return [
		l_submitting,
		data,
		allow_half,
		batch,
		close,
		submit,
		show,
		rendered_batch,
		batches,
		ticket_id,
		input0_input_handler,
		input1_input_handler,
		input2_input_handler
	];
}

class BatchModal extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$8, create_fragment$8, safe_not_equal, {
			data: 1,
			ticket_id: 9,
			allow_half: 2,
			show: 6,
			rendered_batch: 7,
			batches: 8,
			l_submitting: 0
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "BatchModal",
			options,
			id: create_fragment$8.name
		});
	}

	get data() {
		throw new Error("<BatchModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set data(value) {
		throw new Error("<BatchModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get ticket_id() {
		throw new Error("<BatchModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set ticket_id(value) {
		throw new Error("<BatchModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get allow_half() {
		throw new Error("<BatchModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set allow_half(value) {
		throw new Error("<BatchModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get show() {
		throw new Error("<BatchModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set show(value) {
		throw new Error("<BatchModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get rendered_batch() {
		throw new Error("<BatchModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set rendered_batch(value) {
		throw new Error("<BatchModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get batches() {
		throw new Error("<BatchModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set batches(value) {
		throw new Error("<BatchModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get l_submitting() {
		throw new Error("<BatchModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set l_submitting(value) {
		throw new Error("<BatchModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/components/BatchCard.svelte generated by Svelte v3.59.2 */
const file$6 = "src/components/BatchCard.svelte";

// (6:2) {#if allow_half}
function create_if_block_1$4(ctx) {
	let p;
	let t0;
	let b;
	let t1;
	let t2_value = format_price(/*batch*/ ctx[0].half_price_in_cents) + "";
	let t2;

	const block = {
		c: function create() {
			p = element("p");
			t0 = text("Preço meia: ");
			b = element("b");
			t1 = text("R$");
			t2 = text(t2_value);
			add_location(b, file$6, 6, 20, 244);
			add_location(p, file$6, 6, 4, 228);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, t0);
			append_dev(p, b);
			append_dev(b, t1);
			append_dev(b, t2);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*batch*/ 1 && t2_value !== (t2_value = format_price(/*batch*/ ctx[0].half_price_in_cents) + "")) set_data_dev(t2, t2_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$4.name,
		type: "if",
		source: "(6:2) {#if allow_half}",
		ctx
	});

	return block;
}

// (16:0) {#if m_batch}
function create_if_block$5(ctx) {
	let batchmodal;
	let updating_rendered_batch;
	let updating_show;
	let current;

	function batchmodal_rendered_batch_binding(value) {
		/*batchmodal_rendered_batch_binding*/ ctx[7](value);
	}

	function batchmodal_show_binding(value) {
		/*batchmodal_show_binding*/ ctx[8](value);
	}

	let batchmodal_props = {
		ticket_id: /*batch*/ ctx[0].ticket_id,
		allow_half: /*allow_half*/ ctx[2],
		data: /*batch*/ ctx[0]
	};

	if (/*batch*/ ctx[0] !== void 0) {
		batchmodal_props.rendered_batch = /*batch*/ ctx[0];
	}

	if (/*m_batch*/ ctx[3] !== void 0) {
		batchmodal_props.show = /*m_batch*/ ctx[3];
	}

	batchmodal = new BatchModal({ props: batchmodal_props, $$inline: true });
	binding_callbacks.push(() => bind(batchmodal, 'rendered_batch', batchmodal_rendered_batch_binding));
	binding_callbacks.push(() => bind(batchmodal, 'show', batchmodal_show_binding));

	const block = {
		c: function create() {
			create_component(batchmodal.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(batchmodal, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const batchmodal_changes = {};
			if (dirty & /*batch*/ 1) batchmodal_changes.ticket_id = /*batch*/ ctx[0].ticket_id;
			if (dirty & /*allow_half*/ 4) batchmodal_changes.allow_half = /*allow_half*/ ctx[2];
			if (dirty & /*batch*/ 1) batchmodal_changes.data = /*batch*/ ctx[0];

			if (!updating_rendered_batch && dirty & /*batch*/ 1) {
				updating_rendered_batch = true;
				batchmodal_changes.rendered_batch = /*batch*/ ctx[0];
				add_flush_callback(() => updating_rendered_batch = false);
			}

			if (!updating_show && dirty & /*m_batch*/ 8) {
				updating_show = true;
				batchmodal_changes.show = /*m_batch*/ ctx[3];
				add_flush_callback(() => updating_show = false);
			}

			batchmodal.$set(batchmodal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(batchmodal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(batchmodal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(batchmodal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$5.name,
		type: "if",
		source: "(16:0) {#if m_batch}",
		ctx
	});

	return block;
}

function create_fragment$7(ctx) {
	let div1;
	let h3;
	let t0;
	let t1_value = /*i*/ ctx[1] + 1 + "";
	let t1;
	let t2;
	let p0;
	let t3;
	let b0;
	let t4_value = /*batch*/ ctx[0].amount + "";
	let t4;
	let t5;
	let p1;
	let t6;
	let b1;
	let t7;
	let t8_value = format_price(/*batch*/ ctx[0].price_in_cents) + "";
	let t8;
	let t9;
	let t10;
	let div0;
	let button0;
	let t11;
	let button1;
	let t12;
	let if_block1_anchor;
	let current;
	let if_block0 = /*allow_half*/ ctx[2] && create_if_block_1$4(ctx);

	button0 = new Button({
			props: {
				class: "blu",
				action: /*edit_batch*/ ctx[4],
				i: "edit"
			},
			$$inline: true
		});

	button1 = new Button({
			props: {
				class: "red",
				action: /*delete_batch*/ ctx[5],
				i: "delete"
			},
			$$inline: true
		});

	let if_block1 = /*m_batch*/ ctx[3] && create_if_block$5(ctx);

	const block = {
		c: function create() {
			div1 = element("div");
			h3 = element("h3");
			t0 = text("Lote ");
			t1 = text(t1_value);
			t2 = space();
			p0 = element("p");
			t3 = text("Quantidade: ");
			b0 = element("b");
			t4 = text(t4_value);
			t5 = space();
			p1 = element("p");
			t6 = text("Preço: ");
			b1 = element("b");
			t7 = text("R$");
			t8 = text(t8_value);
			t9 = space();
			if (if_block0) if_block0.c();
			t10 = space();
			div0 = element("div");
			create_component(button0.$$.fragment);
			t11 = space();
			create_component(button1.$$.fragment);
			t12 = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
			attr_dev(h3, "class", "oe red svelte-1kk48np");
			add_location(h3, file$6, 1, 2, 52);
			add_location(b0, file$6, 3, 18, 110);
			add_location(p0, file$6, 3, 2, 94);
			add_location(b1, file$6, 4, 13, 152);
			add_location(p1, file$6, 4, 2, 141);
			attr_dev(div0, "class", "row svelte-1kk48np");
			add_location(div0, file$6, 9, 2, 313);
			attr_dev(div1, "class", "card svelte-1kk48np");
			toggle_class(div1, "active", /*batch*/ ctx[0].is_active);
			add_location(div1, file$6, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			append_dev(div1, h3);
			append_dev(h3, t0);
			append_dev(h3, t1);
			append_dev(div1, t2);
			append_dev(div1, p0);
			append_dev(p0, t3);
			append_dev(p0, b0);
			append_dev(b0, t4);
			append_dev(div1, t5);
			append_dev(div1, p1);
			append_dev(p1, t6);
			append_dev(p1, b1);
			append_dev(b1, t7);
			append_dev(b1, t8);
			append_dev(div1, t9);
			if (if_block0) if_block0.m(div1, null);
			append_dev(div1, t10);
			append_dev(div1, div0);
			mount_component(button0, div0, null);
			append_dev(div0, t11);
			mount_component(button1, div0, null);
			insert_dev(target, t12, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert_dev(target, if_block1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if ((!current || dirty & /*i*/ 2) && t1_value !== (t1_value = /*i*/ ctx[1] + 1 + "")) set_data_dev(t1, t1_value);
			if ((!current || dirty & /*batch*/ 1) && t4_value !== (t4_value = /*batch*/ ctx[0].amount + "")) set_data_dev(t4, t4_value);
			if ((!current || dirty & /*batch*/ 1) && t8_value !== (t8_value = format_price(/*batch*/ ctx[0].price_in_cents) + "")) set_data_dev(t8, t8_value);

			if (/*allow_half*/ ctx[2]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_1$4(ctx);
					if_block0.c();
					if_block0.m(div1, t10);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (!current || dirty & /*batch*/ 1) {
				toggle_class(div1, "active", /*batch*/ ctx[0].is_active);
			}

			if (/*m_batch*/ ctx[3]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*m_batch*/ 8) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block$5(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(button0.$$.fragment, local);
			transition_in(button1.$$.fragment, local);
			transition_in(if_block1);
			current = true;
		},
		o: function outro(local) {
			transition_out(button0.$$.fragment, local);
			transition_out(button1.$$.fragment, local);
			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			if (if_block0) if_block0.d();
			destroy_component(button0);
			destroy_component(button1);
			if (detaching) detach_dev(t12);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach_dev(if_block1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$7.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function format_price(price) {
	return String(price / 100).replace('.', ',');
}

function instance$7($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('BatchCard', slots, []);
	let { batch, i, allow_half, batches } = $$props;
	let m_batch;

	function edit_batch() {
		$$invalidate(3, m_batch = true);
	}

	function delete_batch() {
		if (!confirm('Certeza que deseja excluir?')) return;
		$$invalidate(6, batches = batches.filter(b => b.id != batch.id));
		api(`batch/${batch.id}`, 'DELETE');
	}

	$$self.$$.on_mount.push(function () {
		if (batch === undefined && !('batch' in $$props || $$self.$$.bound[$$self.$$.props['batch']])) {
			console.warn("<BatchCard> was created without expected prop 'batch'");
		}

		if (i === undefined && !('i' in $$props || $$self.$$.bound[$$self.$$.props['i']])) {
			console.warn("<BatchCard> was created without expected prop 'i'");
		}

		if (allow_half === undefined && !('allow_half' in $$props || $$self.$$.bound[$$self.$$.props['allow_half']])) {
			console.warn("<BatchCard> was created without expected prop 'allow_half'");
		}

		if (batches === undefined && !('batches' in $$props || $$self.$$.bound[$$self.$$.props['batches']])) {
			console.warn("<BatchCard> was created without expected prop 'batches'");
		}
	});

	const writable_props = ['batch', 'i', 'allow_half', 'batches'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<BatchCard> was created with unknown prop '${key}'`);
	});

	function batchmodal_rendered_batch_binding(value) {
		batch = value;
		$$invalidate(0, batch);
	}

	function batchmodal_show_binding(value) {
		m_batch = value;
		$$invalidate(3, m_batch);
	}

	$$self.$$set = $$props => {
		if ('batch' in $$props) $$invalidate(0, batch = $$props.batch);
		if ('i' in $$props) $$invalidate(1, i = $$props.i);
		if ('allow_half' in $$props) $$invalidate(2, allow_half = $$props.allow_half);
		if ('batches' in $$props) $$invalidate(6, batches = $$props.batches);
	};

	$$self.$capture_state = () => ({
		Button,
		BatchModal,
		api,
		batch,
		i,
		allow_half,
		batches,
		m_batch,
		edit_batch,
		format_price,
		delete_batch
	});

	$$self.$inject_state = $$props => {
		if ('batch' in $$props) $$invalidate(0, batch = $$props.batch);
		if ('i' in $$props) $$invalidate(1, i = $$props.i);
		if ('allow_half' in $$props) $$invalidate(2, allow_half = $$props.allow_half);
		if ('batches' in $$props) $$invalidate(6, batches = $$props.batches);
		if ('m_batch' in $$props) $$invalidate(3, m_batch = $$props.m_batch);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		batch,
		i,
		allow_half,
		m_batch,
		edit_batch,
		delete_batch,
		batches,
		batchmodal_rendered_batch_binding,
		batchmodal_show_binding
	];
}

class BatchCard extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$7, create_fragment$7, safe_not_equal, {
			batch: 0,
			i: 1,
			allow_half: 2,
			batches: 6
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "BatchCard",
			options,
			id: create_fragment$7.name
		});
	}

	get batch() {
		throw new Error("<BatchCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set batch(value) {
		throw new Error("<BatchCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get i() {
		throw new Error("<BatchCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set i(value) {
		throw new Error("<BatchCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get allow_half() {
		throw new Error("<BatchCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set allow_half(value) {
		throw new Error("<BatchCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get batches() {
		throw new Error("<BatchCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set batches(value) {
		throw new Error("<BatchCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/routes/TicketDetails.svelte generated by Svelte v3.59.2 */
const file$5 = "src/routes/TicketDetails.svelte";

function get_each_context$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[18] = list[i];
	child_ctx[20] = i;
	return child_ctx;
}

// (24:0) {:else}
function create_else_block$1(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Carregando...");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$1.name,
		type: "else",
		source: "(24:0) {:else}",
		ctx
	});

	return block;
}

// (7:0) {#if event_name}
function create_if_block_3$1(ctx) {
	let div0;
	let h2;
	let t0_value = /*ticket*/ ctx[0].name + "";
	let t0;
	let t1;
	let span0;
	let t2_value = (/*event_name*/ ctx[1] || '') + "";
	let t2;
	let t3;
	let br0;
	let t4;
	let span1;
	let t5_value = (/*ticket*/ ctx[0].allow_half ? 'Permite' : 'Não permite') + "";
	let t5;
	let t6;
	let span1_class_value;
	let t7;
	let br1;
	let t8;
	let span2;
	let t9;
	let t10_value = (/*is_active*/ ctx[2] ? 'ativo' : 'inativo') + "";
	let t10;
	let span2_class_value;
	let t11;
	let div1;
	let t12;
	let button;
	let t13;
	let div2;
	let current;

	button = new Button({
			props: {
				class: "grn",
				action: /*create_batch*/ ctx[8],
				i: "add",
				t: "Criar Lote " + (/*batches*/ ctx[6].length + 1)
			},
			$$inline: true
		});

	let each_value = /*batches*/ ctx[6];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			div0 = element("div");
			h2 = element("h2");
			t0 = text(t0_value);
			t1 = space();
			span0 = element("span");
			t2 = text(t2_value);
			t3 = space();
			br0 = element("br");
			t4 = space();
			span1 = element("span");
			t5 = text(t5_value);
			t6 = text(" meia");
			t7 = space();
			br1 = element("br");
			t8 = space();
			span2 = element("span");
			t9 = text("Ingresso  ");
			t10 = text(t10_value);
			t11 = space();
			div1 = element("div");
			t12 = space();
			create_component(button.$$.fragment);
			t13 = space();
			div2 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr_dev(span0, "class", "detail");
			add_location(span0, file$5, 8, 35, 325);
			attr_dev(h2, "class", "row");
			add_location(h2, file$5, 8, 4, 294);
			add_location(br0, file$5, 8, 90, 380);
			attr_dev(span1, "class", span1_class_value = /*ticket*/ ctx[0].allow_half ? 'grn' : 'red');
			add_location(span1, file$5, 10, 4, 390);
			add_location(br1, file$5, 10, 115, 501);
			attr_dev(span2, "class", span2_class_value = /*is_active*/ ctx[2] ? 'grn' : 'red');
			add_location(span2, file$5, 11, 4, 510);
			attr_dev(div0, "class", "tas");
			add_location(div0, file$5, 7, 2, 272);
			attr_dev(div1, "class", "hr");
			add_location(div1, file$5, 14, 2, 633);
			attr_dev(div2, "class", "flex-list");
			add_location(div2, file$5, 18, 2, 747);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div0, anchor);
			append_dev(div0, h2);
			append_dev(h2, t0);
			append_dev(h2, t1);
			append_dev(h2, span0);
			append_dev(span0, t2);
			append_dev(div0, t3);
			append_dev(div0, br0);
			append_dev(div0, t4);
			append_dev(div0, span1);
			append_dev(span1, t5);
			append_dev(span1, t6);
			append_dev(div0, t7);
			append_dev(div0, br1);
			append_dev(div0, t8);
			append_dev(div0, span2);
			append_dev(span2, t9);
			append_dev(span2, t10);
			insert_dev(target, t11, anchor);
			insert_dev(target, div1, anchor);
			insert_dev(target, t12, anchor);
			mount_component(button, target, anchor);
			insert_dev(target, t13, anchor);
			insert_dev(target, div2, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(div2, null);
				}
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if ((!current || dirty & /*ticket*/ 1) && t0_value !== (t0_value = /*ticket*/ ctx[0].name + "")) set_data_dev(t0, t0_value);
			if ((!current || dirty & /*event_name*/ 2) && t2_value !== (t2_value = (/*event_name*/ ctx[1] || '') + "")) set_data_dev(t2, t2_value);
			if ((!current || dirty & /*ticket*/ 1) && t5_value !== (t5_value = (/*ticket*/ ctx[0].allow_half ? 'Permite' : 'Não permite') + "")) set_data_dev(t5, t5_value);

			if (!current || dirty & /*ticket*/ 1 && span1_class_value !== (span1_class_value = /*ticket*/ ctx[0].allow_half ? 'grn' : 'red')) {
				attr_dev(span1, "class", span1_class_value);
			}

			if ((!current || dirty & /*is_active*/ 4) && t10_value !== (t10_value = (/*is_active*/ ctx[2] ? 'ativo' : 'inativo') + "")) set_data_dev(t10, t10_value);

			if (!current || dirty & /*is_active*/ 4 && span2_class_value !== (span2_class_value = /*is_active*/ ctx[2] ? 'grn' : 'red')) {
				attr_dev(span2, "class", span2_class_value);
			}

			const button_changes = {};
			if (dirty & /*batches*/ 64) button_changes.t = "Criar Lote " + (/*batches*/ ctx[6].length + 1);
			button.$set(button_changes);

			if (dirty & /*batches, ticket*/ 65) {
				each_value = /*batches*/ ctx[6];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$2(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$2(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div2, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(button.$$.fragment, local);

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			transition_out(button.$$.fragment, local);
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div0);
			if (detaching) detach_dev(t11);
			if (detaching) detach_dev(div1);
			if (detaching) detach_dev(t12);
			destroy_component(button, detaching);
			if (detaching) detach_dev(t13);
			if (detaching) detach_dev(div2);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3$1.name,
		type: "if",
		source: "(7:0) {#if event_name}",
		ctx
	});

	return block;
}

// (20:4) {#each batches as batch, i}
function create_each_block$2(ctx) {
	let batchcard;
	let updating_batches;
	let current;

	function batchcard_batches_binding(value) {
		/*batchcard_batches_binding*/ ctx[11](value);
	}

	let batchcard_props = {
		batch: /*batch*/ ctx[18],
		i: /*i*/ ctx[20],
		allow_half: /*ticket*/ ctx[0].allow_half
	};

	if (/*batches*/ ctx[6] !== void 0) {
		batchcard_props.batches = /*batches*/ ctx[6];
	}

	batchcard = new BatchCard({ props: batchcard_props, $$inline: true });
	binding_callbacks.push(() => bind(batchcard, 'batches', batchcard_batches_binding));

	const block = {
		c: function create() {
			create_component(batchcard.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(batchcard, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const batchcard_changes = {};
			if (dirty & /*batches*/ 64) batchcard_changes.batch = /*batch*/ ctx[18];
			if (dirty & /*ticket*/ 1) batchcard_changes.allow_half = /*ticket*/ ctx[0].allow_half;

			if (!updating_batches && dirty & /*batches*/ 64) {
				updating_batches = true;
				batchcard_changes.batches = /*batches*/ ctx[6];
				add_flush_callback(() => updating_batches = false);
			}

			batchcard.$set(batchcard_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(batchcard.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(batchcard.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(batchcard, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$2.name,
		type: "each",
		source: "(20:4) {#each batches as batch, i}",
		ctx
	});

	return block;
}

// (27:0) {#if m_ticket}
function create_if_block_2$1(ctx) {
	let ticketmodal;
	let updating_rendered_ticket;
	let updating_show;
	let current;

	function ticketmodal_rendered_ticket_binding(value) {
		/*ticketmodal_rendered_ticket_binding*/ ctx[12](value);
	}

	function ticketmodal_show_binding(value) {
		/*ticketmodal_show_binding*/ ctx[13](value);
	}

	let ticketmodal_props = { data: /*ticket*/ ctx[0] };

	if (/*ticket*/ ctx[0] !== void 0) {
		ticketmodal_props.rendered_ticket = /*ticket*/ ctx[0];
	}

	if (/*m_ticket*/ ctx[3] !== void 0) {
		ticketmodal_props.show = /*m_ticket*/ ctx[3];
	}

	ticketmodal = new TicketModal({ props: ticketmodal_props, $$inline: true });
	binding_callbacks.push(() => bind(ticketmodal, 'rendered_ticket', ticketmodal_rendered_ticket_binding));
	binding_callbacks.push(() => bind(ticketmodal, 'show', ticketmodal_show_binding));

	const block = {
		c: function create() {
			create_component(ticketmodal.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(ticketmodal, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const ticketmodal_changes = {};
			if (dirty & /*ticket*/ 1) ticketmodal_changes.data = /*ticket*/ ctx[0];

			if (!updating_rendered_ticket && dirty & /*ticket*/ 1) {
				updating_rendered_ticket = true;
				ticketmodal_changes.rendered_ticket = /*ticket*/ ctx[0];
				add_flush_callback(() => updating_rendered_ticket = false);
			}

			if (!updating_show && dirty & /*m_ticket*/ 8) {
				updating_show = true;
				ticketmodal_changes.show = /*m_ticket*/ ctx[3];
				add_flush_callback(() => updating_show = false);
			}

			ticketmodal.$set(ticketmodal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(ticketmodal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(ticketmodal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(ticketmodal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2$1.name,
		type: "if",
		source: "(27:0) {#if m_ticket}",
		ctx
	});

	return block;
}

// (31:0) {#if m_batch}
function create_if_block_1$3(ctx) {
	let batchmodal;
	let updating_batches;
	let updating_show;
	let current;

	function batchmodal_batches_binding(value) {
		/*batchmodal_batches_binding*/ ctx[14](value);
	}

	function batchmodal_show_binding(value) {
		/*batchmodal_show_binding*/ ctx[15](value);
	}

	let batchmodal_props = {
		ticket_id: /*ticket*/ ctx[0].id,
		allow_half: /*ticket*/ ctx[0].allow_half
	};

	if (/*batches*/ ctx[6] !== void 0) {
		batchmodal_props.batches = /*batches*/ ctx[6];
	}

	if (/*m_batch*/ ctx[4] !== void 0) {
		batchmodal_props.show = /*m_batch*/ ctx[4];
	}

	batchmodal = new BatchModal({ props: batchmodal_props, $$inline: true });
	binding_callbacks.push(() => bind(batchmodal, 'batches', batchmodal_batches_binding));
	binding_callbacks.push(() => bind(batchmodal, 'show', batchmodal_show_binding));

	const block = {
		c: function create() {
			create_component(batchmodal.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(batchmodal, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const batchmodal_changes = {};
			if (dirty & /*ticket*/ 1) batchmodal_changes.ticket_id = /*ticket*/ ctx[0].id;
			if (dirty & /*ticket*/ 1) batchmodal_changes.allow_half = /*ticket*/ ctx[0].allow_half;

			if (!updating_batches && dirty & /*batches*/ 64) {
				updating_batches = true;
				batchmodal_changes.batches = /*batches*/ ctx[6];
				add_flush_callback(() => updating_batches = false);
			}

			if (!updating_show && dirty & /*m_batch*/ 16) {
				updating_show = true;
				batchmodal_changes.show = /*m_batch*/ ctx[4];
				add_flush_callback(() => updating_show = false);
			}

			batchmodal.$set(batchmodal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(batchmodal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(batchmodal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(batchmodal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$3.name,
		type: "if",
		source: "(31:0) {#if m_batch}",
		ctx
	});

	return block;
}

// (35:0) {#if l_deleting}
function create_if_block$4(ctx) {
	let modal;
	let current;

	modal = new Modal({
			props: {
				$$slots: { default: [create_default_slot$1] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(modal.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(modal, target, anchor);
			current = true;
		},
		i: function intro(local) {
			if (current) return;
			transition_in(modal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(modal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(modal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$4.name,
		type: "if",
		source: "(35:0) {#if l_deleting}",
		ctx
	});

	return block;
}

// (36:2) <Modal>
function create_default_slot$1(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Excluindo...");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot$1.name,
		type: "slot",
		source: "(36:2) <Modal>",
		ctx
	});

	return block;
}

function create_fragment$6(ctx) {
	let div;
	let button0;
	let t0;
	let button1;
	let t1;
	let button2;
	let t2;
	let current_block_type_index;
	let if_block0;
	let t3;
	let t4;
	let t5;
	let if_block3_anchor;
	let current;

	button0 = new Button({
			props: {
				action: /*back*/ ctx[9],
				i: "arrow_back",
				t: "Voltar"
			},
			$$inline: true
		});

	button1 = new Button({
			props: {
				class: "blu",
				action: /*edit_ticket*/ ctx[7],
				i: "edit",
				t: "Editar"
			},
			$$inline: true
		});

	button2 = new Button({
			props: {
				class: "red",
				action: /*delete_ticket*/ ctx[10],
				i: "delete",
				t: "Excluir"
			},
			$$inline: true
		});

	const if_block_creators = [create_if_block_3$1, create_else_block$1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*event_name*/ ctx[1]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	let if_block1 = /*m_ticket*/ ctx[3] && create_if_block_2$1(ctx);
	let if_block2 = /*m_batch*/ ctx[4] && create_if_block_1$3(ctx);
	let if_block3 = /*l_deleting*/ ctx[5] && create_if_block$4(ctx);

	const block = {
		c: function create() {
			div = element("div");
			create_component(button0.$$.fragment);
			t0 = space();
			create_component(button1.$$.fragment);
			t1 = space();
			create_component(button2.$$.fragment);
			t2 = space();
			if_block0.c();
			t3 = space();
			if (if_block1) if_block1.c();
			t4 = space();
			if (if_block2) if_block2.c();
			t5 = space();
			if (if_block3) if_block3.c();
			if_block3_anchor = empty();
			attr_dev(div, "class", "panel");
			add_location(div, file$5, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			mount_component(button0, div, null);
			append_dev(div, t0);
			mount_component(button1, div, null);
			append_dev(div, t1);
			mount_component(button2, div, null);
			insert_dev(target, t2, anchor);
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, t3, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert_dev(target, t4, anchor);
			if (if_block2) if_block2.m(target, anchor);
			insert_dev(target, t5, anchor);
			if (if_block3) if_block3.m(target, anchor);
			insert_dev(target, if_block3_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block0 = if_blocks[current_block_type_index];

				if (!if_block0) {
					if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block0.c();
				} else {
					if_block0.p(ctx, dirty);
				}

				transition_in(if_block0, 1);
				if_block0.m(t3.parentNode, t3);
			}

			if (/*m_ticket*/ ctx[3]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*m_ticket*/ 8) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_2$1(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(t4.parentNode, t4);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			if (/*m_batch*/ ctx[4]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);

					if (dirty & /*m_batch*/ 16) {
						transition_in(if_block2, 1);
					}
				} else {
					if_block2 = create_if_block_1$3(ctx);
					if_block2.c();
					transition_in(if_block2, 1);
					if_block2.m(t5.parentNode, t5);
				}
			} else if (if_block2) {
				group_outros();

				transition_out(if_block2, 1, 1, () => {
					if_block2 = null;
				});

				check_outros();
			}

			if (/*l_deleting*/ ctx[5]) {
				if (if_block3) {
					if (dirty & /*l_deleting*/ 32) {
						transition_in(if_block3, 1);
					}
				} else {
					if_block3 = create_if_block$4(ctx);
					if_block3.c();
					transition_in(if_block3, 1);
					if_block3.m(if_block3_anchor.parentNode, if_block3_anchor);
				}
			} else if (if_block3) {
				group_outros();

				transition_out(if_block3, 1, 1, () => {
					if_block3 = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(button0.$$.fragment, local);
			transition_in(button1.$$.fragment, local);
			transition_in(button2.$$.fragment, local);
			transition_in(if_block0);
			transition_in(if_block1);
			transition_in(if_block2);
			transition_in(if_block3);
			current = true;
		},
		o: function outro(local) {
			transition_out(button0.$$.fragment, local);
			transition_out(button1.$$.fragment, local);
			transition_out(button2.$$.fragment, local);
			transition_out(if_block0);
			transition_out(if_block1);
			transition_out(if_block2);
			transition_out(if_block3);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_component(button0);
			destroy_component(button1);
			destroy_component(button2);
			if (detaching) detach_dev(t2);
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach_dev(t3);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach_dev(t4);
			if (if_block2) if_block2.d(detaching);
			if (detaching) detach_dev(t5);
			if (if_block3) if_block3.d(detaching);
			if (detaching) detach_dev(if_block3_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$6.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$6($$self, $$props, $$invalidate) {
	let $curr_path;
	let $opened_event;
	validate_store(curr_path, 'curr_path');
	component_subscribe($$self, curr_path, $$value => $$invalidate(16, $curr_path = $$value));
	validate_store(opened_event, 'opened_event');
	component_subscribe($$self, opened_event, $$value => $$invalidate(17, $opened_event = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('TicketDetails', slots, []);
	let ticket, event_name, is_active;
	let m_ticket, m_batch;
	let l_deleting;
	let batches = [];

	function edit_ticket() {
		$$invalidate(3, m_ticket = true);
	}

	function create_batch() {
		$$invalidate(4, m_batch = true);
	}

	function back() {
		navigate(`/evento/${ticket.event_id}`);
	}

	async function delete_ticket() {
		if (!confirm('Certeza que deseja excluir?')) return;
		$$invalidate(5, l_deleting = true);
		await api(`ticket/${ticket.id}`, 'DELETE');
		back();
	}

	onMount(async _ => {
		if ($opened_event) $$invalidate(0, ticket = $opened_event.tickets.find(t => t.id == $curr_path.split('/').pop()));

		if (ticket) {
			$$invalidate(6, batches = ticket.batches);
			$$invalidate(1, event_name = $opened_event.name);
		} else {
			$$invalidate(0, ticket = (await api(`ticket/${$curr_path.split('/').pop()}`)).data.ticket);
			$$invalidate(6, batches = (await api(`ticket-batches/${ticket.id}`)).data.batches);
			$$invalidate(1, event_name = (await api(`events/${ticket.event_id}`)).data.event.name);
		}

		$$invalidate(2, is_active = false);

		for (let i in batches) {
			if (!batches[i].amount) continue;
			$$invalidate(6, batches[i].is_active = true, batches);
			$$invalidate(2, is_active = true);
			break;
		}
	});

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TicketDetails> was created with unknown prop '${key}'`);
	});

	function batchcard_batches_binding(value) {
		batches = value;
		$$invalidate(6, batches);
	}

	function ticketmodal_rendered_ticket_binding(value) {
		ticket = value;
		$$invalidate(0, ticket);
	}

	function ticketmodal_show_binding(value) {
		m_ticket = value;
		$$invalidate(3, m_ticket);
	}

	function batchmodal_batches_binding(value) {
		batches = value;
		$$invalidate(6, batches);
	}

	function batchmodal_show_binding(value) {
		m_batch = value;
		$$invalidate(4, m_batch);
	}

	$$self.$capture_state = () => ({
		TicketModal,
		BatchModal,
		BatchCard,
		Button,
		Modal,
		curr_path,
		opened_event,
		navigate,
		api,
		onMount,
		ticket,
		event_name,
		is_active,
		m_ticket,
		m_batch,
		l_deleting,
		batches,
		edit_ticket,
		create_batch,
		back,
		delete_ticket,
		$curr_path,
		$opened_event
	});

	$$self.$inject_state = $$props => {
		if ('ticket' in $$props) $$invalidate(0, ticket = $$props.ticket);
		if ('event_name' in $$props) $$invalidate(1, event_name = $$props.event_name);
		if ('is_active' in $$props) $$invalidate(2, is_active = $$props.is_active);
		if ('m_ticket' in $$props) $$invalidate(3, m_ticket = $$props.m_ticket);
		if ('m_batch' in $$props) $$invalidate(4, m_batch = $$props.m_batch);
		if ('l_deleting' in $$props) $$invalidate(5, l_deleting = $$props.l_deleting);
		if ('batches' in $$props) $$invalidate(6, batches = $$props.batches);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		ticket,
		event_name,
		is_active,
		m_ticket,
		m_batch,
		l_deleting,
		batches,
		edit_ticket,
		create_batch,
		back,
		delete_ticket,
		batchcard_batches_binding,
		ticketmodal_rendered_ticket_binding,
		ticketmodal_show_binding,
		batchmodal_batches_binding,
		batchmodal_show_binding
	];
}

class TicketDetails extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "TicketDetails",
			options,
			id: create_fragment$6.name
		});
	}
}

/* src/routes/Login.svelte generated by Svelte v3.59.2 */
const file$4 = "src/routes/Login.svelte";

// (19:0) {:else}
function create_else_block(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Logando...");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(19:0) {:else}",
		ctx
	});

	return block;
}

// (1:0) {#if not_logged}
function create_if_block$3(ctx) {
	let form;
	let t0;
	let label0;
	let t1;
	let input0;
	let t2;
	let label1;
	let t3;
	let div;
	let input1;
	let t4;
	let input2;
	let t5;
	let icon;
	let t6;
	let button;
	let t7_value = (/*l_submitting*/ ctx[4] ? '...' : 'Entrar') + "";
	let t7;
	let current;
	let mounted;
	let dispose;
	let if_block = /*error*/ ctx[1] && create_if_block_1$2(ctx);

	icon = new Icon({
			props: {
				i: /*show_password*/ ctx[2]
				? 'visibility_off'
				: 'visibility'
			},
			$$inline: true
		});

	icon.$on("click", /*toggle_show_password*/ ctx[5]);

	const block = {
		c: function create() {
			form = element("form");
			if (if_block) if_block.c();
			t0 = space();
			label0 = element("label");
			t1 = text("Nome:\n      ");
			input0 = element("input");
			t2 = space();
			label1 = element("label");
			t3 = text("Senha:\n      ");
			div = element("div");
			input1 = element("input");
			t4 = space();
			input2 = element("input");
			t5 = space();
			create_component(icon.$$.fragment);
			t6 = space();
			button = element("button");
			t7 = text(t7_value);
			attr_dev(input0, "type", "text");
			input0.required = true;
			attr_dev(input0, "class", "svelte-1vbuy7x");
			add_location(input0, file$4, 5, 6, 133);
			add_location(label0, file$4, 4, 4, 113);
			attr_dev(input1, "type", "password");
			set_style(input1, "display", /*show_password*/ ctx[2] ? 'none' : 'block');
			attr_dev(input1, "class", "svelte-1vbuy7x");
			add_location(input1, file$4, 10, 8, 267);
			attr_dev(input2, "type", "text");
			set_style(input2, "display", /*show_password*/ ctx[2] ? 'block' : 'none');
			attr_dev(input2, "class", "svelte-1vbuy7x");
			add_location(input2, file$4, 11, 8, 381);
			attr_dev(div, "class", "password-container");
			add_location(div, file$4, 9, 6, 226);
			add_location(label1, file$4, 8, 4, 205);
			attr_dev(button, "type", "submit");
			button.disabled = /*l_submitting*/ ctx[4];
			attr_dev(button, "class", "svelte-1vbuy7x");
			add_location(button, file$4, 16, 4, 620);
			attr_dev(form, "class", "tas svelte-1vbuy7x");
			add_location(form, file$4, 1, 2, 19);
		},
		m: function mount(target, anchor) {
			insert_dev(target, form, anchor);
			if (if_block) if_block.m(form, null);
			append_dev(form, t0);
			append_dev(form, label0);
			append_dev(label0, t1);
			append_dev(label0, input0);
			set_input_value(input0, /*user*/ ctx[0].name);
			append_dev(form, t2);
			append_dev(form, label1);
			append_dev(label1, t3);
			append_dev(label1, div);
			append_dev(div, input1);
			set_input_value(input1, /*user*/ ctx[0].password);
			append_dev(div, t4);
			append_dev(div, input2);
			set_input_value(input2, /*user*/ ctx[0].password);
			append_dev(div, t5);
			mount_component(icon, div, null);
			append_dev(form, t6);
			append_dev(form, button);
			append_dev(button, t7);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(input0, "input", /*input0_input_handler*/ ctx[7]),
					listen_dev(input1, "input", /*input1_input_handler*/ ctx[8]),
					listen_dev(input2, "input", /*input2_input_handler*/ ctx[9]),
					listen_dev(form, "submit", /*submit*/ ctx[6], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (/*error*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_1$2(ctx);
					if_block.c();
					if_block.m(form, t0);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty & /*user*/ 1 && input0.value !== /*user*/ ctx[0].name) {
				set_input_value(input0, /*user*/ ctx[0].name);
			}

			if (!current || dirty & /*show_password*/ 4) {
				set_style(input1, "display", /*show_password*/ ctx[2] ? 'none' : 'block');
			}

			if (dirty & /*user*/ 1 && input1.value !== /*user*/ ctx[0].password) {
				set_input_value(input1, /*user*/ ctx[0].password);
			}

			if (!current || dirty & /*show_password*/ 4) {
				set_style(input2, "display", /*show_password*/ ctx[2] ? 'block' : 'none');
			}

			if (dirty & /*user*/ 1 && input2.value !== /*user*/ ctx[0].password) {
				set_input_value(input2, /*user*/ ctx[0].password);
			}

			const icon_changes = {};

			if (dirty & /*show_password*/ 4) icon_changes.i = /*show_password*/ ctx[2]
			? 'visibility_off'
			: 'visibility';

			icon.$set(icon_changes);
			if ((!current || dirty & /*l_submitting*/ 16) && t7_value !== (t7_value = (/*l_submitting*/ ctx[4] ? '...' : 'Entrar') + "")) set_data_dev(t7, t7_value);

			if (!current || dirty & /*l_submitting*/ 16) {
				prop_dev(button, "disabled", /*l_submitting*/ ctx[4]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(form);
			if (if_block) if_block.d();
			destroy_component(icon);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$3.name,
		type: "if",
		source: "(1:0) {#if not_logged}",
		ctx
	});

	return block;
}

// (3:4) {#if error}
function create_if_block_1$2(ctx) {
	let p;
	let t;

	const block = {
		c: function create() {
			p = element("p");
			t = text(/*error*/ ctx[1]);
			attr_dev(p, "class", "red");
			add_location(p, file$4, 2, 16, 73);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*error*/ 2) set_data_dev(t, /*error*/ ctx[1]);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$2.name,
		type: "if",
		source: "(3:4) {#if error}",
		ctx
	});

	return block;
}

function create_fragment$5(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$3, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*not_logged*/ ctx[3]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$5.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$5($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Login', slots, []);
	let user = { name: '', password: '' };
	let error, show_password, not_logged;
	let l_submitting;

	function toggle_show_password() {
		$$invalidate(2, show_password = !show_password);
	}

	async function submit(e) {
		e.preventDefault();
		$$invalidate(1, error = '');
		$$invalidate(4, l_submitting = true);
		const { res, data } = await api('login', 'POST', user);
		$$invalidate(4, l_submitting = false);

		if (res.ok) {
			localStorage.setItem('session_id', data.session_id);
			return logged_user.set(data);
		}

		$$invalidate(0, user.name = '', user);
		$$invalidate(0, user.password = '', user);
		$$invalidate(1, error = 'Credenciais inválidas');
	}

	onMount(async _ => {
		const session_id = localStorage.getItem('session_id');
		if (!session_id) return $$invalidate(3, not_logged = true);
		const { res, data } = await api('session-login', 'POST', { id: session_id });
		if (res.ok) logged_user.set({ ...data, session_id }); else $$invalidate(3, not_logged = true);
	});

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Login> was created with unknown prop '${key}'`);
	});

	function input0_input_handler() {
		user.name = this.value;
		$$invalidate(0, user);
	}

	function input1_input_handler() {
		user.password = this.value;
		$$invalidate(0, user);
	}

	function input2_input_handler() {
		user.password = this.value;
		$$invalidate(0, user);
	}

	$$self.$capture_state = () => ({
		Icon,
		logged_user,
		api,
		onMount,
		user,
		error,
		show_password,
		not_logged,
		l_submitting,
		toggle_show_password,
		submit
	});

	$$self.$inject_state = $$props => {
		if ('user' in $$props) $$invalidate(0, user = $$props.user);
		if ('error' in $$props) $$invalidate(1, error = $$props.error);
		if ('show_password' in $$props) $$invalidate(2, show_password = $$props.show_password);
		if ('not_logged' in $$props) $$invalidate(3, not_logged = $$props.not_logged);
		if ('l_submitting' in $$props) $$invalidate(4, l_submitting = $$props.l_submitting);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		user,
		error,
		show_password,
		not_logged,
		l_submitting,
		toggle_show_password,
		submit,
		input0_input_handler,
		input1_input_handler,
		input2_input_handler
	];
}

class Login extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Login",
			options,
			id: create_fragment$5.name
		});
	}
}

function copy_to_clipboard(text) {
  if (navigator.clipboard && window.isSecureContext)
    return navigator.clipboard.writeText(text)

  const text_area = document.createElement('textarea');
  text_area.value = text;
  text_area.style.display = 'absolute';
  text_area.style.left = '-999999px';

  document.body.prepend(text_area);
  text_area.select();
  document.execCommand('copy');
  text_area.remove();
}

function draw_square(canvas, p1, p2, p3, p4, color) {
  function draw_line(begin, end) {
    canvas.beginPath();
    canvas.moveTo(begin.x, begin.y);
    canvas.lineTo(end.x, end.y);
    canvas.lineWidth = 4;
    canvas.strokeStyle = color;
    canvas.stroke();
  }

  draw_line(p1, p2);
  draw_line(p2, p3);
  draw_line(p3, p4);
  draw_line(p4, p1);
}

function format_date(date_string) {
  const date = new Date(date_string);
  const now  = new Date();

  const secs_diff = (now - date) / 1e3;
  const mins_diff = secs_diff / 60;

  if      (secs_diff < 60) return `${parseInt(secs_diff)} segs atrás`
  else if (mins_diff < 60) return `${parseInt(mins_diff)} min${mins_diff > 1 ? 's' : ''} atrás`

  const is_today = date.getDate() == now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();

  const formatter = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day:    '2-digit',
    month:  '2-digit',
    hour:   '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
  const parts = formatter.formatToParts(date);

  const day    = parts.find(part => part.type == 'day').value;
  const month  = parts.find(part => part.type == 'month').value;
  const hour   = parts.find(part => part.type == 'hour').value;
  const minute = parts.find(part => part.type == 'minute').value;

  return `${!is_today ? `${day}/${month} ` : ''}${hour}:${minute}`
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var jsQR$1 = {exports: {}};

(function (module, exports) {
	(function webpackUniversalModuleDefinition(root, factory) {
		module.exports = factory();
	})(typeof self !== 'undefined' ? self : commonjsGlobal, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId]) {
	/******/ 			return installedModules[moduleId].exports;
	/******/ 		}
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			i: moduleId,
	/******/ 			l: false,
	/******/ 			exports: {}
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.l = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// define getter function for harmony exports
	/******/ 	__webpack_require__.d = function(exports, name, getter) {
	/******/ 		if(!__webpack_require__.o(exports, name)) {
	/******/ 			Object.defineProperty(exports, name, {
	/******/ 				configurable: false,
	/******/ 				enumerable: true,
	/******/ 				get: getter
	/******/ 			});
	/******/ 		}
	/******/ 	};
	/******/
	/******/ 	// getDefaultExport function for compatibility with non-harmony modules
	/******/ 	__webpack_require__.n = function(module) {
	/******/ 		var getter = module && module.__esModule ?
	/******/ 			function getDefault() { return module['default']; } :
	/******/ 			function getModuleExports() { return module; };
	/******/ 		__webpack_require__.d(getter, 'a', getter);
	/******/ 		return getter;
	/******/ 	};
	/******/
	/******/ 	// Object.prototype.hasOwnProperty.call
	/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(__webpack_require__.s = 3);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ (function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", { value: true });
	var BitMatrix = /** @class */ (function () {
	    function BitMatrix(data, width) {
	        this.width = width;
	        this.height = data.length / width;
	        this.data = data;
	    }
	    BitMatrix.createEmpty = function (width, height) {
	        return new BitMatrix(new Uint8ClampedArray(width * height), width);
	    };
	    BitMatrix.prototype.get = function (x, y) {
	        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
	            return false;
	        }
	        return !!this.data[y * this.width + x];
	    };
	    BitMatrix.prototype.set = function (x, y, v) {
	        this.data[y * this.width + x] = v ? 1 : 0;
	    };
	    BitMatrix.prototype.setRegion = function (left, top, width, height, v) {
	        for (var y = top; y < top + height; y++) {
	            for (var x = left; x < left + width; x++) {
	                this.set(x, y, !!v);
	            }
	        }
	    };
	    return BitMatrix;
	}());
	exports.BitMatrix = BitMatrix;


	/***/ }),
	/* 1 */
	/***/ (function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", { value: true });
	var GenericGFPoly_1 = __webpack_require__(2);
	function addOrSubtractGF(a, b) {
	    return a ^ b; // tslint:disable-line:no-bitwise
	}
	exports.addOrSubtractGF = addOrSubtractGF;
	var GenericGF = /** @class */ (function () {
	    function GenericGF(primitive, size, genBase) {
	        this.primitive = primitive;
	        this.size = size;
	        this.generatorBase = genBase;
	        this.expTable = new Array(this.size);
	        this.logTable = new Array(this.size);
	        var x = 1;
	        for (var i = 0; i < this.size; i++) {
	            this.expTable[i] = x;
	            x = x * 2;
	            if (x >= this.size) {
	                x = (x ^ this.primitive) & (this.size - 1); // tslint:disable-line:no-bitwise
	            }
	        }
	        for (var i = 0; i < this.size - 1; i++) {
	            this.logTable[this.expTable[i]] = i;
	        }
	        this.zero = new GenericGFPoly_1.default(this, Uint8ClampedArray.from([0]));
	        this.one = new GenericGFPoly_1.default(this, Uint8ClampedArray.from([1]));
	    }
	    GenericGF.prototype.multiply = function (a, b) {
	        if (a === 0 || b === 0) {
	            return 0;
	        }
	        return this.expTable[(this.logTable[a] + this.logTable[b]) % (this.size - 1)];
	    };
	    GenericGF.prototype.inverse = function (a) {
	        if (a === 0) {
	            throw new Error("Can't invert 0");
	        }
	        return this.expTable[this.size - this.logTable[a] - 1];
	    };
	    GenericGF.prototype.buildMonomial = function (degree, coefficient) {
	        if (degree < 0) {
	            throw new Error("Invalid monomial degree less than 0");
	        }
	        if (coefficient === 0) {
	            return this.zero;
	        }
	        var coefficients = new Uint8ClampedArray(degree + 1);
	        coefficients[0] = coefficient;
	        return new GenericGFPoly_1.default(this, coefficients);
	    };
	    GenericGF.prototype.log = function (a) {
	        if (a === 0) {
	            throw new Error("Can't take log(0)");
	        }
	        return this.logTable[a];
	    };
	    GenericGF.prototype.exp = function (a) {
	        return this.expTable[a];
	    };
	    return GenericGF;
	}());
	exports.default = GenericGF;


	/***/ }),
	/* 2 */
	/***/ (function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", { value: true });
	var GenericGF_1 = __webpack_require__(1);
	var GenericGFPoly = /** @class */ (function () {
	    function GenericGFPoly(field, coefficients) {
	        if (coefficients.length === 0) {
	            throw new Error("No coefficients.");
	        }
	        this.field = field;
	        var coefficientsLength = coefficients.length;
	        if (coefficientsLength > 1 && coefficients[0] === 0) {
	            // Leading term must be non-zero for anything except the constant polynomial "0"
	            var firstNonZero = 1;
	            while (firstNonZero < coefficientsLength && coefficients[firstNonZero] === 0) {
	                firstNonZero++;
	            }
	            if (firstNonZero === coefficientsLength) {
	                this.coefficients = field.zero.coefficients;
	            }
	            else {
	                this.coefficients = new Uint8ClampedArray(coefficientsLength - firstNonZero);
	                for (var i = 0; i < this.coefficients.length; i++) {
	                    this.coefficients[i] = coefficients[firstNonZero + i];
	                }
	            }
	        }
	        else {
	            this.coefficients = coefficients;
	        }
	    }
	    GenericGFPoly.prototype.degree = function () {
	        return this.coefficients.length - 1;
	    };
	    GenericGFPoly.prototype.isZero = function () {
	        return this.coefficients[0] === 0;
	    };
	    GenericGFPoly.prototype.getCoefficient = function (degree) {
	        return this.coefficients[this.coefficients.length - 1 - degree];
	    };
	    GenericGFPoly.prototype.addOrSubtract = function (other) {
	        var _a;
	        if (this.isZero()) {
	            return other;
	        }
	        if (other.isZero()) {
	            return this;
	        }
	        var smallerCoefficients = this.coefficients;
	        var largerCoefficients = other.coefficients;
	        if (smallerCoefficients.length > largerCoefficients.length) {
	            _a = [largerCoefficients, smallerCoefficients], smallerCoefficients = _a[0], largerCoefficients = _a[1];
	        }
	        var sumDiff = new Uint8ClampedArray(largerCoefficients.length);
	        var lengthDiff = largerCoefficients.length - smallerCoefficients.length;
	        for (var i = 0; i < lengthDiff; i++) {
	            sumDiff[i] = largerCoefficients[i];
	        }
	        for (var i = lengthDiff; i < largerCoefficients.length; i++) {
	            sumDiff[i] = GenericGF_1.addOrSubtractGF(smallerCoefficients[i - lengthDiff], largerCoefficients[i]);
	        }
	        return new GenericGFPoly(this.field, sumDiff);
	    };
	    GenericGFPoly.prototype.multiply = function (scalar) {
	        if (scalar === 0) {
	            return this.field.zero;
	        }
	        if (scalar === 1) {
	            return this;
	        }
	        var size = this.coefficients.length;
	        var product = new Uint8ClampedArray(size);
	        for (var i = 0; i < size; i++) {
	            product[i] = this.field.multiply(this.coefficients[i], scalar);
	        }
	        return new GenericGFPoly(this.field, product);
	    };
	    GenericGFPoly.prototype.multiplyPoly = function (other) {
	        if (this.isZero() || other.isZero()) {
	            return this.field.zero;
	        }
	        var aCoefficients = this.coefficients;
	        var aLength = aCoefficients.length;
	        var bCoefficients = other.coefficients;
	        var bLength = bCoefficients.length;
	        var product = new Uint8ClampedArray(aLength + bLength - 1);
	        for (var i = 0; i < aLength; i++) {
	            var aCoeff = aCoefficients[i];
	            for (var j = 0; j < bLength; j++) {
	                product[i + j] = GenericGF_1.addOrSubtractGF(product[i + j], this.field.multiply(aCoeff, bCoefficients[j]));
	            }
	        }
	        return new GenericGFPoly(this.field, product);
	    };
	    GenericGFPoly.prototype.multiplyByMonomial = function (degree, coefficient) {
	        if (degree < 0) {
	            throw new Error("Invalid degree less than 0");
	        }
	        if (coefficient === 0) {
	            return this.field.zero;
	        }
	        var size = this.coefficients.length;
	        var product = new Uint8ClampedArray(size + degree);
	        for (var i = 0; i < size; i++) {
	            product[i] = this.field.multiply(this.coefficients[i], coefficient);
	        }
	        return new GenericGFPoly(this.field, product);
	    };
	    GenericGFPoly.prototype.evaluateAt = function (a) {
	        var result = 0;
	        if (a === 0) {
	            // Just return the x^0 coefficient
	            return this.getCoefficient(0);
	        }
	        var size = this.coefficients.length;
	        if (a === 1) {
	            // Just the sum of the coefficients
	            this.coefficients.forEach(function (coefficient) {
	                result = GenericGF_1.addOrSubtractGF(result, coefficient);
	            });
	            return result;
	        }
	        result = this.coefficients[0];
	        for (var i = 1; i < size; i++) {
	            result = GenericGF_1.addOrSubtractGF(this.field.multiply(a, result), this.coefficients[i]);
	        }
	        return result;
	    };
	    return GenericGFPoly;
	}());
	exports.default = GenericGFPoly;


	/***/ }),
	/* 3 */
	/***/ (function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", { value: true });
	var binarizer_1 = __webpack_require__(4);
	var decoder_1 = __webpack_require__(5);
	var extractor_1 = __webpack_require__(11);
	var locator_1 = __webpack_require__(12);
	function scan(matrix) {
	    var locations = locator_1.locate(matrix);
	    if (!locations) {
	        return null;
	    }
	    for (var _i = 0, locations_1 = locations; _i < locations_1.length; _i++) {
	        var location_1 = locations_1[_i];
	        var extracted = extractor_1.extract(matrix, location_1);
	        var decoded = decoder_1.decode(extracted.matrix);
	        if (decoded) {
	            return {
	                binaryData: decoded.bytes,
	                data: decoded.text,
	                chunks: decoded.chunks,
	                version: decoded.version,
	                location: {
	                    topRightCorner: extracted.mappingFunction(location_1.dimension, 0),
	                    topLeftCorner: extracted.mappingFunction(0, 0),
	                    bottomRightCorner: extracted.mappingFunction(location_1.dimension, location_1.dimension),
	                    bottomLeftCorner: extracted.mappingFunction(0, location_1.dimension),
	                    topRightFinderPattern: location_1.topRight,
	                    topLeftFinderPattern: location_1.topLeft,
	                    bottomLeftFinderPattern: location_1.bottomLeft,
	                    bottomRightAlignmentPattern: location_1.alignmentPattern,
	                },
	            };
	        }
	    }
	    return null;
	}
	var defaultOptions = {
	    inversionAttempts: "attemptBoth",
	};
	function jsQR(data, width, height, providedOptions) {
	    if (providedOptions === void 0) { providedOptions = {}; }
	    var options = defaultOptions;
	    Object.keys(options || {}).forEach(function (opt) {
	        options[opt] = providedOptions[opt] || options[opt];
	    });
	    var shouldInvert = options.inversionAttempts === "attemptBoth" || options.inversionAttempts === "invertFirst";
	    var tryInvertedFirst = options.inversionAttempts === "onlyInvert" || options.inversionAttempts === "invertFirst";
	    var _a = binarizer_1.binarize(data, width, height, shouldInvert), binarized = _a.binarized, inverted = _a.inverted;
	    var result = scan(tryInvertedFirst ? inverted : binarized);
	    if (!result && (options.inversionAttempts === "attemptBoth" || options.inversionAttempts === "invertFirst")) {
	        result = scan(tryInvertedFirst ? binarized : inverted);
	    }
	    return result;
	}
	jsQR.default = jsQR;
	exports.default = jsQR;


	/***/ }),
	/* 4 */
	/***/ (function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", { value: true });
	var BitMatrix_1 = __webpack_require__(0);
	var REGION_SIZE = 8;
	var MIN_DYNAMIC_RANGE = 24;
	function numBetween(value, min, max) {
	    return value < min ? min : value > max ? max : value;
	}
	// Like BitMatrix but accepts arbitry Uint8 values
	var Matrix = /** @class */ (function () {
	    function Matrix(width, height) {
	        this.width = width;
	        this.data = new Uint8ClampedArray(width * height);
	    }
	    Matrix.prototype.get = function (x, y) {
	        return this.data[y * this.width + x];
	    };
	    Matrix.prototype.set = function (x, y, value) {
	        this.data[y * this.width + x] = value;
	    };
	    return Matrix;
	}());
	function binarize(data, width, height, returnInverted) {
	    if (data.length !== width * height * 4) {
	        throw new Error("Malformed data passed to binarizer.");
	    }
	    // Convert image to greyscale
	    var greyscalePixels = new Matrix(width, height);
	    for (var x = 0; x < width; x++) {
	        for (var y = 0; y < height; y++) {
	            var r = data[((y * width + x) * 4) + 0];
	            var g = data[((y * width + x) * 4) + 1];
	            var b = data[((y * width + x) * 4) + 2];
	            greyscalePixels.set(x, y, 0.2126 * r + 0.7152 * g + 0.0722 * b);
	        }
	    }
	    var horizontalRegionCount = Math.ceil(width / REGION_SIZE);
	    var verticalRegionCount = Math.ceil(height / REGION_SIZE);
	    var blackPoints = new Matrix(horizontalRegionCount, verticalRegionCount);
	    for (var verticalRegion = 0; verticalRegion < verticalRegionCount; verticalRegion++) {
	        for (var hortizontalRegion = 0; hortizontalRegion < horizontalRegionCount; hortizontalRegion++) {
	            var sum = 0;
	            var min = Infinity;
	            var max = 0;
	            for (var y = 0; y < REGION_SIZE; y++) {
	                for (var x = 0; x < REGION_SIZE; x++) {
	                    var pixelLumosity = greyscalePixels.get(hortizontalRegion * REGION_SIZE + x, verticalRegion * REGION_SIZE + y);
	                    sum += pixelLumosity;
	                    min = Math.min(min, pixelLumosity);
	                    max = Math.max(max, pixelLumosity);
	                }
	            }
	            var average = sum / (Math.pow(REGION_SIZE, 2));
	            if (max - min <= MIN_DYNAMIC_RANGE) {
	                // If variation within the block is low, assume this is a block with only light or only
	                // dark pixels. In that case we do not want to use the average, as it would divide this
	                // low contrast area into black and white pixels, essentially creating data out of noise.
	                //
	                // Default the blackpoint for these blocks to be half the min - effectively white them out
	                average = min / 2;
	                if (verticalRegion > 0 && hortizontalRegion > 0) {
	                    // Correct the "white background" assumption for blocks that have neighbors by comparing
	                    // the pixels in this block to the previously calculated black points. This is based on
	                    // the fact that dark barcode symbology is always surrounded by some amount of light
	                    // background for which reasonable black point estimates were made. The bp estimated at
	                    // the boundaries is used for the interior.
	                    // The (min < bp) is arbitrary but works better than other heuristics that were tried.
	                    var averageNeighborBlackPoint = (blackPoints.get(hortizontalRegion, verticalRegion - 1) +
	                        (2 * blackPoints.get(hortizontalRegion - 1, verticalRegion)) +
	                        blackPoints.get(hortizontalRegion - 1, verticalRegion - 1)) / 4;
	                    if (min < averageNeighborBlackPoint) {
	                        average = averageNeighborBlackPoint;
	                    }
	                }
	            }
	            blackPoints.set(hortizontalRegion, verticalRegion, average);
	        }
	    }
	    var binarized = BitMatrix_1.BitMatrix.createEmpty(width, height);
	    var inverted = null;
	    if (returnInverted) {
	        inverted = BitMatrix_1.BitMatrix.createEmpty(width, height);
	    }
	    for (var verticalRegion = 0; verticalRegion < verticalRegionCount; verticalRegion++) {
	        for (var hortizontalRegion = 0; hortizontalRegion < horizontalRegionCount; hortizontalRegion++) {
	            var left = numBetween(hortizontalRegion, 2, horizontalRegionCount - 3);
	            var top_1 = numBetween(verticalRegion, 2, verticalRegionCount - 3);
	            var sum = 0;
	            for (var xRegion = -2; xRegion <= 2; xRegion++) {
	                for (var yRegion = -2; yRegion <= 2; yRegion++) {
	                    sum += blackPoints.get(left + xRegion, top_1 + yRegion);
	                }
	            }
	            var threshold = sum / 25;
	            for (var xRegion = 0; xRegion < REGION_SIZE; xRegion++) {
	                for (var yRegion = 0; yRegion < REGION_SIZE; yRegion++) {
	                    var x = hortizontalRegion * REGION_SIZE + xRegion;
	                    var y = verticalRegion * REGION_SIZE + yRegion;
	                    var lum = greyscalePixels.get(x, y);
	                    binarized.set(x, y, lum <= threshold);
	                    if (returnInverted) {
	                        inverted.set(x, y, !(lum <= threshold));
	                    }
	                }
	            }
	        }
	    }
	    if (returnInverted) {
	        return { binarized: binarized, inverted: inverted };
	    }
	    return { binarized: binarized };
	}
	exports.binarize = binarize;


	/***/ }),
	/* 5 */
	/***/ (function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", { value: true });
	var BitMatrix_1 = __webpack_require__(0);
	var decodeData_1 = __webpack_require__(6);
	var reedsolomon_1 = __webpack_require__(9);
	var version_1 = __webpack_require__(10);
	// tslint:disable:no-bitwise
	function numBitsDiffering(x, y) {
	    var z = x ^ y;
	    var bitCount = 0;
	    while (z) {
	        bitCount++;
	        z &= z - 1;
	    }
	    return bitCount;
	}
	function pushBit(bit, byte) {
	    return (byte << 1) | bit;
	}
	// tslint:enable:no-bitwise
	var FORMAT_INFO_TABLE = [
	    { bits: 0x5412, formatInfo: { errorCorrectionLevel: 1, dataMask: 0 } },
	    { bits: 0x5125, formatInfo: { errorCorrectionLevel: 1, dataMask: 1 } },
	    { bits: 0x5E7C, formatInfo: { errorCorrectionLevel: 1, dataMask: 2 } },
	    { bits: 0x5B4B, formatInfo: { errorCorrectionLevel: 1, dataMask: 3 } },
	    { bits: 0x45F9, formatInfo: { errorCorrectionLevel: 1, dataMask: 4 } },
	    { bits: 0x40CE, formatInfo: { errorCorrectionLevel: 1, dataMask: 5 } },
	    { bits: 0x4F97, formatInfo: { errorCorrectionLevel: 1, dataMask: 6 } },
	    { bits: 0x4AA0, formatInfo: { errorCorrectionLevel: 1, dataMask: 7 } },
	    { bits: 0x77C4, formatInfo: { errorCorrectionLevel: 0, dataMask: 0 } },
	    { bits: 0x72F3, formatInfo: { errorCorrectionLevel: 0, dataMask: 1 } },
	    { bits: 0x7DAA, formatInfo: { errorCorrectionLevel: 0, dataMask: 2 } },
	    { bits: 0x789D, formatInfo: { errorCorrectionLevel: 0, dataMask: 3 } },
	    { bits: 0x662F, formatInfo: { errorCorrectionLevel: 0, dataMask: 4 } },
	    { bits: 0x6318, formatInfo: { errorCorrectionLevel: 0, dataMask: 5 } },
	    { bits: 0x6C41, formatInfo: { errorCorrectionLevel: 0, dataMask: 6 } },
	    { bits: 0x6976, formatInfo: { errorCorrectionLevel: 0, dataMask: 7 } },
	    { bits: 0x1689, formatInfo: { errorCorrectionLevel: 3, dataMask: 0 } },
	    { bits: 0x13BE, formatInfo: { errorCorrectionLevel: 3, dataMask: 1 } },
	    { bits: 0x1CE7, formatInfo: { errorCorrectionLevel: 3, dataMask: 2 } },
	    { bits: 0x19D0, formatInfo: { errorCorrectionLevel: 3, dataMask: 3 } },
	    { bits: 0x0762, formatInfo: { errorCorrectionLevel: 3, dataMask: 4 } },
	    { bits: 0x0255, formatInfo: { errorCorrectionLevel: 3, dataMask: 5 } },
	    { bits: 0x0D0C, formatInfo: { errorCorrectionLevel: 3, dataMask: 6 } },
	    { bits: 0x083B, formatInfo: { errorCorrectionLevel: 3, dataMask: 7 } },
	    { bits: 0x355F, formatInfo: { errorCorrectionLevel: 2, dataMask: 0 } },
	    { bits: 0x3068, formatInfo: { errorCorrectionLevel: 2, dataMask: 1 } },
	    { bits: 0x3F31, formatInfo: { errorCorrectionLevel: 2, dataMask: 2 } },
	    { bits: 0x3A06, formatInfo: { errorCorrectionLevel: 2, dataMask: 3 } },
	    { bits: 0x24B4, formatInfo: { errorCorrectionLevel: 2, dataMask: 4 } },
	    { bits: 0x2183, formatInfo: { errorCorrectionLevel: 2, dataMask: 5 } },
	    { bits: 0x2EDA, formatInfo: { errorCorrectionLevel: 2, dataMask: 6 } },
	    { bits: 0x2BED, formatInfo: { errorCorrectionLevel: 2, dataMask: 7 } },
	];
	var DATA_MASKS = [
	    function (p) { return ((p.y + p.x) % 2) === 0; },
	    function (p) { return (p.y % 2) === 0; },
	    function (p) { return p.x % 3 === 0; },
	    function (p) { return (p.y + p.x) % 3 === 0; },
	    function (p) { return (Math.floor(p.y / 2) + Math.floor(p.x / 3)) % 2 === 0; },
	    function (p) { return ((p.x * p.y) % 2) + ((p.x * p.y) % 3) === 0; },
	    function (p) { return ((((p.y * p.x) % 2) + (p.y * p.x) % 3) % 2) === 0; },
	    function (p) { return ((((p.y + p.x) % 2) + (p.y * p.x) % 3) % 2) === 0; },
	];
	function buildFunctionPatternMask(version) {
	    var dimension = 17 + 4 * version.versionNumber;
	    var matrix = BitMatrix_1.BitMatrix.createEmpty(dimension, dimension);
	    matrix.setRegion(0, 0, 9, 9, true); // Top left finder pattern + separator + format
	    matrix.setRegion(dimension - 8, 0, 8, 9, true); // Top right finder pattern + separator + format
	    matrix.setRegion(0, dimension - 8, 9, 8, true); // Bottom left finder pattern + separator + format
	    // Alignment patterns
	    for (var _i = 0, _a = version.alignmentPatternCenters; _i < _a.length; _i++) {
	        var x = _a[_i];
	        for (var _b = 0, _c = version.alignmentPatternCenters; _b < _c.length; _b++) {
	            var y = _c[_b];
	            if (!(x === 6 && y === 6 || x === 6 && y === dimension - 7 || x === dimension - 7 && y === 6)) {
	                matrix.setRegion(x - 2, y - 2, 5, 5, true);
	            }
	        }
	    }
	    matrix.setRegion(6, 9, 1, dimension - 17, true); // Vertical timing pattern
	    matrix.setRegion(9, 6, dimension - 17, 1, true); // Horizontal timing pattern
	    if (version.versionNumber > 6) {
	        matrix.setRegion(dimension - 11, 0, 3, 6, true); // Version info, top right
	        matrix.setRegion(0, dimension - 11, 6, 3, true); // Version info, bottom left
	    }
	    return matrix;
	}
	function readCodewords(matrix, version, formatInfo) {
	    var dataMask = DATA_MASKS[formatInfo.dataMask];
	    var dimension = matrix.height;
	    var functionPatternMask = buildFunctionPatternMask(version);
	    var codewords = [];
	    var currentByte = 0;
	    var bitsRead = 0;
	    // Read columns in pairs, from right to left
	    var readingUp = true;
	    for (var columnIndex = dimension - 1; columnIndex > 0; columnIndex -= 2) {
	        if (columnIndex === 6) { // Skip whole column with vertical alignment pattern;
	            columnIndex--;
	        }
	        for (var i = 0; i < dimension; i++) {
	            var y = readingUp ? dimension - 1 - i : i;
	            for (var columnOffset = 0; columnOffset < 2; columnOffset++) {
	                var x = columnIndex - columnOffset;
	                if (!functionPatternMask.get(x, y)) {
	                    bitsRead++;
	                    var bit = matrix.get(x, y);
	                    if (dataMask({ y: y, x: x })) {
	                        bit = !bit;
	                    }
	                    currentByte = pushBit(bit, currentByte);
	                    if (bitsRead === 8) { // Whole bytes
	                        codewords.push(currentByte);
	                        bitsRead = 0;
	                        currentByte = 0;
	                    }
	                }
	            }
	        }
	        readingUp = !readingUp;
	    }
	    return codewords;
	}
	function readVersion(matrix) {
	    var dimension = matrix.height;
	    var provisionalVersion = Math.floor((dimension - 17) / 4);
	    if (provisionalVersion <= 6) { // 6 and under dont have version info in the QR code
	        return version_1.VERSIONS[provisionalVersion - 1];
	    }
	    var topRightVersionBits = 0;
	    for (var y = 5; y >= 0; y--) {
	        for (var x = dimension - 9; x >= dimension - 11; x--) {
	            topRightVersionBits = pushBit(matrix.get(x, y), topRightVersionBits);
	        }
	    }
	    var bottomLeftVersionBits = 0;
	    for (var x = 5; x >= 0; x--) {
	        for (var y = dimension - 9; y >= dimension - 11; y--) {
	            bottomLeftVersionBits = pushBit(matrix.get(x, y), bottomLeftVersionBits);
	        }
	    }
	    var bestDifference = Infinity;
	    var bestVersion;
	    for (var _i = 0, VERSIONS_1 = version_1.VERSIONS; _i < VERSIONS_1.length; _i++) {
	        var version = VERSIONS_1[_i];
	        if (version.infoBits === topRightVersionBits || version.infoBits === bottomLeftVersionBits) {
	            return version;
	        }
	        var difference = numBitsDiffering(topRightVersionBits, version.infoBits);
	        if (difference < bestDifference) {
	            bestVersion = version;
	            bestDifference = difference;
	        }
	        difference = numBitsDiffering(bottomLeftVersionBits, version.infoBits);
	        if (difference < bestDifference) {
	            bestVersion = version;
	            bestDifference = difference;
	        }
	    }
	    // We can tolerate up to 3 bits of error since no two version info codewords will
	    // differ in less than 8 bits.
	    if (bestDifference <= 3) {
	        return bestVersion;
	    }
	}
	function readFormatInformation(matrix) {
	    var topLeftFormatInfoBits = 0;
	    for (var x = 0; x <= 8; x++) {
	        if (x !== 6) { // Skip timing pattern bit
	            topLeftFormatInfoBits = pushBit(matrix.get(x, 8), topLeftFormatInfoBits);
	        }
	    }
	    for (var y = 7; y >= 0; y--) {
	        if (y !== 6) { // Skip timing pattern bit
	            topLeftFormatInfoBits = pushBit(matrix.get(8, y), topLeftFormatInfoBits);
	        }
	    }
	    var dimension = matrix.height;
	    var topRightBottomRightFormatInfoBits = 0;
	    for (var y = dimension - 1; y >= dimension - 7; y--) { // bottom left
	        topRightBottomRightFormatInfoBits = pushBit(matrix.get(8, y), topRightBottomRightFormatInfoBits);
	    }
	    for (var x = dimension - 8; x < dimension; x++) { // top right
	        topRightBottomRightFormatInfoBits = pushBit(matrix.get(x, 8), topRightBottomRightFormatInfoBits);
	    }
	    var bestDifference = Infinity;
	    var bestFormatInfo = null;
	    for (var _i = 0, FORMAT_INFO_TABLE_1 = FORMAT_INFO_TABLE; _i < FORMAT_INFO_TABLE_1.length; _i++) {
	        var _a = FORMAT_INFO_TABLE_1[_i], bits = _a.bits, formatInfo = _a.formatInfo;
	        if (bits === topLeftFormatInfoBits || bits === topRightBottomRightFormatInfoBits) {
	            return formatInfo;
	        }
	        var difference = numBitsDiffering(topLeftFormatInfoBits, bits);
	        if (difference < bestDifference) {
	            bestFormatInfo = formatInfo;
	            bestDifference = difference;
	        }
	        if (topLeftFormatInfoBits !== topRightBottomRightFormatInfoBits) { // also try the other option
	            difference = numBitsDiffering(topRightBottomRightFormatInfoBits, bits);
	            if (difference < bestDifference) {
	                bestFormatInfo = formatInfo;
	                bestDifference = difference;
	            }
	        }
	    }
	    // Hamming distance of the 32 masked codes is 7, by construction, so <= 3 bits differing means we found a match
	    if (bestDifference <= 3) {
	        return bestFormatInfo;
	    }
	    return null;
	}
	function getDataBlocks(codewords, version, ecLevel) {
	    var ecInfo = version.errorCorrectionLevels[ecLevel];
	    var dataBlocks = [];
	    var totalCodewords = 0;
	    ecInfo.ecBlocks.forEach(function (block) {
	        for (var i = 0; i < block.numBlocks; i++) {
	            dataBlocks.push({ numDataCodewords: block.dataCodewordsPerBlock, codewords: [] });
	            totalCodewords += block.dataCodewordsPerBlock + ecInfo.ecCodewordsPerBlock;
	        }
	    });
	    // In some cases the QR code will be malformed enough that we pull off more or less than we should.
	    // If we pull off less there's nothing we can do.
	    // If we pull off more we can safely truncate
	    if (codewords.length < totalCodewords) {
	        return null;
	    }
	    codewords = codewords.slice(0, totalCodewords);
	    var shortBlockSize = ecInfo.ecBlocks[0].dataCodewordsPerBlock;
	    // Pull codewords to fill the blocks up to the minimum size
	    for (var i = 0; i < shortBlockSize; i++) {
	        for (var _i = 0, dataBlocks_1 = dataBlocks; _i < dataBlocks_1.length; _i++) {
	            var dataBlock = dataBlocks_1[_i];
	            dataBlock.codewords.push(codewords.shift());
	        }
	    }
	    // If there are any large blocks, pull codewords to fill the last element of those
	    if (ecInfo.ecBlocks.length > 1) {
	        var smallBlockCount = ecInfo.ecBlocks[0].numBlocks;
	        var largeBlockCount = ecInfo.ecBlocks[1].numBlocks;
	        for (var i = 0; i < largeBlockCount; i++) {
	            dataBlocks[smallBlockCount + i].codewords.push(codewords.shift());
	        }
	    }
	    // Add the rest of the codewords to the blocks. These are the error correction codewords.
	    while (codewords.length > 0) {
	        for (var _a = 0, dataBlocks_2 = dataBlocks; _a < dataBlocks_2.length; _a++) {
	            var dataBlock = dataBlocks_2[_a];
	            dataBlock.codewords.push(codewords.shift());
	        }
	    }
	    return dataBlocks;
	}
	function decodeMatrix(matrix) {
	    var version = readVersion(matrix);
	    if (!version) {
	        return null;
	    }
	    var formatInfo = readFormatInformation(matrix);
	    if (!formatInfo) {
	        return null;
	    }
	    var codewords = readCodewords(matrix, version, formatInfo);
	    var dataBlocks = getDataBlocks(codewords, version, formatInfo.errorCorrectionLevel);
	    if (!dataBlocks) {
	        return null;
	    }
	    // Count total number of data bytes
	    var totalBytes = dataBlocks.reduce(function (a, b) { return a + b.numDataCodewords; }, 0);
	    var resultBytes = new Uint8ClampedArray(totalBytes);
	    var resultIndex = 0;
	    for (var _i = 0, dataBlocks_3 = dataBlocks; _i < dataBlocks_3.length; _i++) {
	        var dataBlock = dataBlocks_3[_i];
	        var correctedBytes = reedsolomon_1.decode(dataBlock.codewords, dataBlock.codewords.length - dataBlock.numDataCodewords);
	        if (!correctedBytes) {
	            return null;
	        }
	        for (var i = 0; i < dataBlock.numDataCodewords; i++) {
	            resultBytes[resultIndex++] = correctedBytes[i];
	        }
	    }
	    try {
	        return decodeData_1.decode(resultBytes, version.versionNumber);
	    }
	    catch (_a) {
	        return null;
	    }
	}
	function decode(matrix) {
	    if (matrix == null) {
	        return null;
	    }
	    var result = decodeMatrix(matrix);
	    if (result) {
	        return result;
	    }
	    // Decoding didn't work, try mirroring the QR across the topLeft -> bottomRight line.
	    for (var x = 0; x < matrix.width; x++) {
	        for (var y = x + 1; y < matrix.height; y++) {
	            if (matrix.get(x, y) !== matrix.get(y, x)) {
	                matrix.set(x, y, !matrix.get(x, y));
	                matrix.set(y, x, !matrix.get(y, x));
	            }
	        }
	    }
	    return decodeMatrix(matrix);
	}
	exports.decode = decode;


	/***/ }),
	/* 6 */
	/***/ (function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", { value: true });
	// tslint:disable:no-bitwise
	var BitStream_1 = __webpack_require__(7);
	var shiftJISTable_1 = __webpack_require__(8);
	var Mode;
	(function (Mode) {
	    Mode["Numeric"] = "numeric";
	    Mode["Alphanumeric"] = "alphanumeric";
	    Mode["Byte"] = "byte";
	    Mode["Kanji"] = "kanji";
	    Mode["ECI"] = "eci";
	})(Mode = exports.Mode || (exports.Mode = {}));
	var ModeByte;
	(function (ModeByte) {
	    ModeByte[ModeByte["Terminator"] = 0] = "Terminator";
	    ModeByte[ModeByte["Numeric"] = 1] = "Numeric";
	    ModeByte[ModeByte["Alphanumeric"] = 2] = "Alphanumeric";
	    ModeByte[ModeByte["Byte"] = 4] = "Byte";
	    ModeByte[ModeByte["Kanji"] = 8] = "Kanji";
	    ModeByte[ModeByte["ECI"] = 7] = "ECI";
	    // StructuredAppend = 0x3,
	    // FNC1FirstPosition = 0x5,
	    // FNC1SecondPosition = 0x9,
	})(ModeByte || (ModeByte = {}));
	function decodeNumeric(stream, size) {
	    var bytes = [];
	    var text = "";
	    var characterCountSize = [10, 12, 14][size];
	    var length = stream.readBits(characterCountSize);
	    // Read digits in groups of 3
	    while (length >= 3) {
	        var num = stream.readBits(10);
	        if (num >= 1000) {
	            throw new Error("Invalid numeric value above 999");
	        }
	        var a = Math.floor(num / 100);
	        var b = Math.floor(num / 10) % 10;
	        var c = num % 10;
	        bytes.push(48 + a, 48 + b, 48 + c);
	        text += a.toString() + b.toString() + c.toString();
	        length -= 3;
	    }
	    // If the number of digits aren't a multiple of 3, the remaining digits are special cased.
	    if (length === 2) {
	        var num = stream.readBits(7);
	        if (num >= 100) {
	            throw new Error("Invalid numeric value above 99");
	        }
	        var a = Math.floor(num / 10);
	        var b = num % 10;
	        bytes.push(48 + a, 48 + b);
	        text += a.toString() + b.toString();
	    }
	    else if (length === 1) {
	        var num = stream.readBits(4);
	        if (num >= 10) {
	            throw new Error("Invalid numeric value above 9");
	        }
	        bytes.push(48 + num);
	        text += num.toString();
	    }
	    return { bytes: bytes, text: text };
	}
	var AlphanumericCharacterCodes = [
	    "0", "1", "2", "3", "4", "5", "6", "7", "8",
	    "9", "A", "B", "C", "D", "E", "F", "G", "H",
	    "I", "J", "K", "L", "M", "N", "O", "P", "Q",
	    "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
	    " ", "$", "%", "*", "+", "-", ".", "/", ":",
	];
	function decodeAlphanumeric(stream, size) {
	    var bytes = [];
	    var text = "";
	    var characterCountSize = [9, 11, 13][size];
	    var length = stream.readBits(characterCountSize);
	    while (length >= 2) {
	        var v = stream.readBits(11);
	        var a = Math.floor(v / 45);
	        var b = v % 45;
	        bytes.push(AlphanumericCharacterCodes[a].charCodeAt(0), AlphanumericCharacterCodes[b].charCodeAt(0));
	        text += AlphanumericCharacterCodes[a] + AlphanumericCharacterCodes[b];
	        length -= 2;
	    }
	    if (length === 1) {
	        var a = stream.readBits(6);
	        bytes.push(AlphanumericCharacterCodes[a].charCodeAt(0));
	        text += AlphanumericCharacterCodes[a];
	    }
	    return { bytes: bytes, text: text };
	}
	function decodeByte(stream, size) {
	    var bytes = [];
	    var text = "";
	    var characterCountSize = [8, 16, 16][size];
	    var length = stream.readBits(characterCountSize);
	    for (var i = 0; i < length; i++) {
	        var b = stream.readBits(8);
	        bytes.push(b);
	    }
	    try {
	        text += decodeURIComponent(bytes.map(function (b) { return "%" + ("0" + b.toString(16)).substr(-2); }).join(""));
	    }
	    catch (_a) {
	        // failed to decode
	    }
	    return { bytes: bytes, text: text };
	}
	function decodeKanji(stream, size) {
	    var bytes = [];
	    var text = "";
	    var characterCountSize = [8, 10, 12][size];
	    var length = stream.readBits(characterCountSize);
	    for (var i = 0; i < length; i++) {
	        var k = stream.readBits(13);
	        var c = (Math.floor(k / 0xC0) << 8) | (k % 0xC0);
	        if (c < 0x1F00) {
	            c += 0x8140;
	        }
	        else {
	            c += 0xC140;
	        }
	        bytes.push(c >> 8, c & 0xFF);
	        text += String.fromCharCode(shiftJISTable_1.shiftJISTable[c]);
	    }
	    return { bytes: bytes, text: text };
	}
	function decode(data, version) {
	    var _a, _b, _c, _d;
	    var stream = new BitStream_1.BitStream(data);
	    // There are 3 'sizes' based on the version. 1-9 is small (0), 10-26 is medium (1) and 27-40 is large (2).
	    var size = version <= 9 ? 0 : version <= 26 ? 1 : 2;
	    var result = {
	        text: "",
	        bytes: [],
	        chunks: [],
	        version: version,
	    };
	    while (stream.available() >= 4) {
	        var mode = stream.readBits(4);
	        if (mode === ModeByte.Terminator) {
	            return result;
	        }
	        else if (mode === ModeByte.ECI) {
	            if (stream.readBits(1) === 0) {
	                result.chunks.push({
	                    type: Mode.ECI,
	                    assignmentNumber: stream.readBits(7),
	                });
	            }
	            else if (stream.readBits(1) === 0) {
	                result.chunks.push({
	                    type: Mode.ECI,
	                    assignmentNumber: stream.readBits(14),
	                });
	            }
	            else if (stream.readBits(1) === 0) {
	                result.chunks.push({
	                    type: Mode.ECI,
	                    assignmentNumber: stream.readBits(21),
	                });
	            }
	            else {
	                // ECI data seems corrupted
	                result.chunks.push({
	                    type: Mode.ECI,
	                    assignmentNumber: -1,
	                });
	            }
	        }
	        else if (mode === ModeByte.Numeric) {
	            var numericResult = decodeNumeric(stream, size);
	            result.text += numericResult.text;
	            (_a = result.bytes).push.apply(_a, numericResult.bytes);
	            result.chunks.push({
	                type: Mode.Numeric,
	                text: numericResult.text,
	            });
	        }
	        else if (mode === ModeByte.Alphanumeric) {
	            var alphanumericResult = decodeAlphanumeric(stream, size);
	            result.text += alphanumericResult.text;
	            (_b = result.bytes).push.apply(_b, alphanumericResult.bytes);
	            result.chunks.push({
	                type: Mode.Alphanumeric,
	                text: alphanumericResult.text,
	            });
	        }
	        else if (mode === ModeByte.Byte) {
	            var byteResult = decodeByte(stream, size);
	            result.text += byteResult.text;
	            (_c = result.bytes).push.apply(_c, byteResult.bytes);
	            result.chunks.push({
	                type: Mode.Byte,
	                bytes: byteResult.bytes,
	                text: byteResult.text,
	            });
	        }
	        else if (mode === ModeByte.Kanji) {
	            var kanjiResult = decodeKanji(stream, size);
	            result.text += kanjiResult.text;
	            (_d = result.bytes).push.apply(_d, kanjiResult.bytes);
	            result.chunks.push({
	                type: Mode.Kanji,
	                bytes: kanjiResult.bytes,
	                text: kanjiResult.text,
	            });
	        }
	    }
	    // If there is no data left, or the remaining bits are all 0, then that counts as a termination marker
	    if (stream.available() === 0 || stream.readBits(stream.available()) === 0) {
	        return result;
	    }
	}
	exports.decode = decode;


	/***/ }),
	/* 7 */
	/***/ (function(module, exports, __webpack_require__) {

	// tslint:disable:no-bitwise
	Object.defineProperty(exports, "__esModule", { value: true });
	var BitStream = /** @class */ (function () {
	    function BitStream(bytes) {
	        this.byteOffset = 0;
	        this.bitOffset = 0;
	        this.bytes = bytes;
	    }
	    BitStream.prototype.readBits = function (numBits) {
	        if (numBits < 1 || numBits > 32 || numBits > this.available()) {
	            throw new Error("Cannot read " + numBits.toString() + " bits");
	        }
	        var result = 0;
	        // First, read remainder from current byte
	        if (this.bitOffset > 0) {
	            var bitsLeft = 8 - this.bitOffset;
	            var toRead = numBits < bitsLeft ? numBits : bitsLeft;
	            var bitsToNotRead = bitsLeft - toRead;
	            var mask = (0xFF >> (8 - toRead)) << bitsToNotRead;
	            result = (this.bytes[this.byteOffset] & mask) >> bitsToNotRead;
	            numBits -= toRead;
	            this.bitOffset += toRead;
	            if (this.bitOffset === 8) {
	                this.bitOffset = 0;
	                this.byteOffset++;
	            }
	        }
	        // Next read whole bytes
	        if (numBits > 0) {
	            while (numBits >= 8) {
	                result = (result << 8) | (this.bytes[this.byteOffset] & 0xFF);
	                this.byteOffset++;
	                numBits -= 8;
	            }
	            // Finally read a partial byte
	            if (numBits > 0) {
	                var bitsToNotRead = 8 - numBits;
	                var mask = (0xFF >> bitsToNotRead) << bitsToNotRead;
	                result = (result << numBits) | ((this.bytes[this.byteOffset] & mask) >> bitsToNotRead);
	                this.bitOffset += numBits;
	            }
	        }
	        return result;
	    };
	    BitStream.prototype.available = function () {
	        return 8 * (this.bytes.length - this.byteOffset) - this.bitOffset;
	    };
	    return BitStream;
	}());
	exports.BitStream = BitStream;


	/***/ }),
	/* 8 */
	/***/ (function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", { value: true });
	exports.shiftJISTable = {
	    0x20: 0x0020,
	    0x21: 0x0021,
	    0x22: 0x0022,
	    0x23: 0x0023,
	    0x24: 0x0024,
	    0x25: 0x0025,
	    0x26: 0x0026,
	    0x27: 0x0027,
	    0x28: 0x0028,
	    0x29: 0x0029,
	    0x2A: 0x002A,
	    0x2B: 0x002B,
	    0x2C: 0x002C,
	    0x2D: 0x002D,
	    0x2E: 0x002E,
	    0x2F: 0x002F,
	    0x30: 0x0030,
	    0x31: 0x0031,
	    0x32: 0x0032,
	    0x33: 0x0033,
	    0x34: 0x0034,
	    0x35: 0x0035,
	    0x36: 0x0036,
	    0x37: 0x0037,
	    0x38: 0x0038,
	    0x39: 0x0039,
	    0x3A: 0x003A,
	    0x3B: 0x003B,
	    0x3C: 0x003C,
	    0x3D: 0x003D,
	    0x3E: 0x003E,
	    0x3F: 0x003F,
	    0x40: 0x0040,
	    0x41: 0x0041,
	    0x42: 0x0042,
	    0x43: 0x0043,
	    0x44: 0x0044,
	    0x45: 0x0045,
	    0x46: 0x0046,
	    0x47: 0x0047,
	    0x48: 0x0048,
	    0x49: 0x0049,
	    0x4A: 0x004A,
	    0x4B: 0x004B,
	    0x4C: 0x004C,
	    0x4D: 0x004D,
	    0x4E: 0x004E,
	    0x4F: 0x004F,
	    0x50: 0x0050,
	    0x51: 0x0051,
	    0x52: 0x0052,
	    0x53: 0x0053,
	    0x54: 0x0054,
	    0x55: 0x0055,
	    0x56: 0x0056,
	    0x57: 0x0057,
	    0x58: 0x0058,
	    0x59: 0x0059,
	    0x5A: 0x005A,
	    0x5B: 0x005B,
	    0x5C: 0x00A5,
	    0x5D: 0x005D,
	    0x5E: 0x005E,
	    0x5F: 0x005F,
	    0x60: 0x0060,
	    0x61: 0x0061,
	    0x62: 0x0062,
	    0x63: 0x0063,
	    0x64: 0x0064,
	    0x65: 0x0065,
	    0x66: 0x0066,
	    0x67: 0x0067,
	    0x68: 0x0068,
	    0x69: 0x0069,
	    0x6A: 0x006A,
	    0x6B: 0x006B,
	    0x6C: 0x006C,
	    0x6D: 0x006D,
	    0x6E: 0x006E,
	    0x6F: 0x006F,
	    0x70: 0x0070,
	    0x71: 0x0071,
	    0x72: 0x0072,
	    0x73: 0x0073,
	    0x74: 0x0074,
	    0x75: 0x0075,
	    0x76: 0x0076,
	    0x77: 0x0077,
	    0x78: 0x0078,
	    0x79: 0x0079,
	    0x7A: 0x007A,
	    0x7B: 0x007B,
	    0x7C: 0x007C,
	    0x7D: 0x007D,
	    0x7E: 0x203E,
	    0x8140: 0x3000,
	    0x8141: 0x3001,
	    0x8142: 0x3002,
	    0x8143: 0xFF0C,
	    0x8144: 0xFF0E,
	    0x8145: 0x30FB,
	    0x8146: 0xFF1A,
	    0x8147: 0xFF1B,
	    0x8148: 0xFF1F,
	    0x8149: 0xFF01,
	    0x814A: 0x309B,
	    0x814B: 0x309C,
	    0x814C: 0x00B4,
	    0x814D: 0xFF40,
	    0x814E: 0x00A8,
	    0x814F: 0xFF3E,
	    0x8150: 0xFFE3,
	    0x8151: 0xFF3F,
	    0x8152: 0x30FD,
	    0x8153: 0x30FE,
	    0x8154: 0x309D,
	    0x8155: 0x309E,
	    0x8156: 0x3003,
	    0x8157: 0x4EDD,
	    0x8158: 0x3005,
	    0x8159: 0x3006,
	    0x815A: 0x3007,
	    0x815B: 0x30FC,
	    0x815C: 0x2015,
	    0x815D: 0x2010,
	    0x815E: 0xFF0F,
	    0x815F: 0x005C,
	    0x8160: 0x301C,
	    0x8161: 0x2016,
	    0x8162: 0xFF5C,
	    0x8163: 0x2026,
	    0x8164: 0x2025,
	    0x8165: 0x2018,
	    0x8166: 0x2019,
	    0x8167: 0x201C,
	    0x8168: 0x201D,
	    0x8169: 0xFF08,
	    0x816A: 0xFF09,
	    0x816B: 0x3014,
	    0x816C: 0x3015,
	    0x816D: 0xFF3B,
	    0x816E: 0xFF3D,
	    0x816F: 0xFF5B,
	    0x8170: 0xFF5D,
	    0x8171: 0x3008,
	    0x8172: 0x3009,
	    0x8173: 0x300A,
	    0x8174: 0x300B,
	    0x8175: 0x300C,
	    0x8176: 0x300D,
	    0x8177: 0x300E,
	    0x8178: 0x300F,
	    0x8179: 0x3010,
	    0x817A: 0x3011,
	    0x817B: 0xFF0B,
	    0x817C: 0x2212,
	    0x817D: 0x00B1,
	    0x817E: 0x00D7,
	    0x8180: 0x00F7,
	    0x8181: 0xFF1D,
	    0x8182: 0x2260,
	    0x8183: 0xFF1C,
	    0x8184: 0xFF1E,
	    0x8185: 0x2266,
	    0x8186: 0x2267,
	    0x8187: 0x221E,
	    0x8188: 0x2234,
	    0x8189: 0x2642,
	    0x818A: 0x2640,
	    0x818B: 0x00B0,
	    0x818C: 0x2032,
	    0x818D: 0x2033,
	    0x818E: 0x2103,
	    0x818F: 0xFFE5,
	    0x8190: 0xFF04,
	    0x8191: 0x00A2,
	    0x8192: 0x00A3,
	    0x8193: 0xFF05,
	    0x8194: 0xFF03,
	    0x8195: 0xFF06,
	    0x8196: 0xFF0A,
	    0x8197: 0xFF20,
	    0x8198: 0x00A7,
	    0x8199: 0x2606,
	    0x819A: 0x2605,
	    0x819B: 0x25CB,
	    0x819C: 0x25CF,
	    0x819D: 0x25CE,
	    0x819E: 0x25C7,
	    0x819F: 0x25C6,
	    0x81A0: 0x25A1,
	    0x81A1: 0x25A0,
	    0x81A2: 0x25B3,
	    0x81A3: 0x25B2,
	    0x81A4: 0x25BD,
	    0x81A5: 0x25BC,
	    0x81A6: 0x203B,
	    0x81A7: 0x3012,
	    0x81A8: 0x2192,
	    0x81A9: 0x2190,
	    0x81AA: 0x2191,
	    0x81AB: 0x2193,
	    0x81AC: 0x3013,
	    0x81B8: 0x2208,
	    0x81B9: 0x220B,
	    0x81BA: 0x2286,
	    0x81BB: 0x2287,
	    0x81BC: 0x2282,
	    0x81BD: 0x2283,
	    0x81BE: 0x222A,
	    0x81BF: 0x2229,
	    0x81C8: 0x2227,
	    0x81C9: 0x2228,
	    0x81CA: 0x00AC,
	    0x81CB: 0x21D2,
	    0x81CC: 0x21D4,
	    0x81CD: 0x2200,
	    0x81CE: 0x2203,
	    0x81DA: 0x2220,
	    0x81DB: 0x22A5,
	    0x81DC: 0x2312,
	    0x81DD: 0x2202,
	    0x81DE: 0x2207,
	    0x81DF: 0x2261,
	    0x81E0: 0x2252,
	    0x81E1: 0x226A,
	    0x81E2: 0x226B,
	    0x81E3: 0x221A,
	    0x81E4: 0x223D,
	    0x81E5: 0x221D,
	    0x81E6: 0x2235,
	    0x81E7: 0x222B,
	    0x81E8: 0x222C,
	    0x81F0: 0x212B,
	    0x81F1: 0x2030,
	    0x81F2: 0x266F,
	    0x81F3: 0x266D,
	    0x81F4: 0x266A,
	    0x81F5: 0x2020,
	    0x81F6: 0x2021,
	    0x81F7: 0x00B6,
	    0x81FC: 0x25EF,
	    0x824F: 0xFF10,
	    0x8250: 0xFF11,
	    0x8251: 0xFF12,
	    0x8252: 0xFF13,
	    0x8253: 0xFF14,
	    0x8254: 0xFF15,
	    0x8255: 0xFF16,
	    0x8256: 0xFF17,
	    0x8257: 0xFF18,
	    0x8258: 0xFF19,
	    0x8260: 0xFF21,
	    0x8261: 0xFF22,
	    0x8262: 0xFF23,
	    0x8263: 0xFF24,
	    0x8264: 0xFF25,
	    0x8265: 0xFF26,
	    0x8266: 0xFF27,
	    0x8267: 0xFF28,
	    0x8268: 0xFF29,
	    0x8269: 0xFF2A,
	    0x826A: 0xFF2B,
	    0x826B: 0xFF2C,
	    0x826C: 0xFF2D,
	    0x826D: 0xFF2E,
	    0x826E: 0xFF2F,
	    0x826F: 0xFF30,
	    0x8270: 0xFF31,
	    0x8271: 0xFF32,
	    0x8272: 0xFF33,
	    0x8273: 0xFF34,
	    0x8274: 0xFF35,
	    0x8275: 0xFF36,
	    0x8276: 0xFF37,
	    0x8277: 0xFF38,
	    0x8278: 0xFF39,
	    0x8279: 0xFF3A,
	    0x8281: 0xFF41,
	    0x8282: 0xFF42,
	    0x8283: 0xFF43,
	    0x8284: 0xFF44,
	    0x8285: 0xFF45,
	    0x8286: 0xFF46,
	    0x8287: 0xFF47,
	    0x8288: 0xFF48,
	    0x8289: 0xFF49,
	    0x828A: 0xFF4A,
	    0x828B: 0xFF4B,
	    0x828C: 0xFF4C,
	    0x828D: 0xFF4D,
	    0x828E: 0xFF4E,
	    0x828F: 0xFF4F,
	    0x8290: 0xFF50,
	    0x8291: 0xFF51,
	    0x8292: 0xFF52,
	    0x8293: 0xFF53,
	    0x8294: 0xFF54,
	    0x8295: 0xFF55,
	    0x8296: 0xFF56,
	    0x8297: 0xFF57,
	    0x8298: 0xFF58,
	    0x8299: 0xFF59,
	    0x829A: 0xFF5A,
	    0x829F: 0x3041,
	    0x82A0: 0x3042,
	    0x82A1: 0x3043,
	    0x82A2: 0x3044,
	    0x82A3: 0x3045,
	    0x82A4: 0x3046,
	    0x82A5: 0x3047,
	    0x82A6: 0x3048,
	    0x82A7: 0x3049,
	    0x82A8: 0x304A,
	    0x82A9: 0x304B,
	    0x82AA: 0x304C,
	    0x82AB: 0x304D,
	    0x82AC: 0x304E,
	    0x82AD: 0x304F,
	    0x82AE: 0x3050,
	    0x82AF: 0x3051,
	    0x82B0: 0x3052,
	    0x82B1: 0x3053,
	    0x82B2: 0x3054,
	    0x82B3: 0x3055,
	    0x82B4: 0x3056,
	    0x82B5: 0x3057,
	    0x82B6: 0x3058,
	    0x82B7: 0x3059,
	    0x82B8: 0x305A,
	    0x82B9: 0x305B,
	    0x82BA: 0x305C,
	    0x82BB: 0x305D,
	    0x82BC: 0x305E,
	    0x82BD: 0x305F,
	    0x82BE: 0x3060,
	    0x82BF: 0x3061,
	    0x82C0: 0x3062,
	    0x82C1: 0x3063,
	    0x82C2: 0x3064,
	    0x82C3: 0x3065,
	    0x82C4: 0x3066,
	    0x82C5: 0x3067,
	    0x82C6: 0x3068,
	    0x82C7: 0x3069,
	    0x82C8: 0x306A,
	    0x82C9: 0x306B,
	    0x82CA: 0x306C,
	    0x82CB: 0x306D,
	    0x82CC: 0x306E,
	    0x82CD: 0x306F,
	    0x82CE: 0x3070,
	    0x82CF: 0x3071,
	    0x82D0: 0x3072,
	    0x82D1: 0x3073,
	    0x82D2: 0x3074,
	    0x82D3: 0x3075,
	    0x82D4: 0x3076,
	    0x82D5: 0x3077,
	    0x82D6: 0x3078,
	    0x82D7: 0x3079,
	    0x82D8: 0x307A,
	    0x82D9: 0x307B,
	    0x82DA: 0x307C,
	    0x82DB: 0x307D,
	    0x82DC: 0x307E,
	    0x82DD: 0x307F,
	    0x82DE: 0x3080,
	    0x82DF: 0x3081,
	    0x82E0: 0x3082,
	    0x82E1: 0x3083,
	    0x82E2: 0x3084,
	    0x82E3: 0x3085,
	    0x82E4: 0x3086,
	    0x82E5: 0x3087,
	    0x82E6: 0x3088,
	    0x82E7: 0x3089,
	    0x82E8: 0x308A,
	    0x82E9: 0x308B,
	    0x82EA: 0x308C,
	    0x82EB: 0x308D,
	    0x82EC: 0x308E,
	    0x82ED: 0x308F,
	    0x82EE: 0x3090,
	    0x82EF: 0x3091,
	    0x82F0: 0x3092,
	    0x82F1: 0x3093,
	    0x8340: 0x30A1,
	    0x8341: 0x30A2,
	    0x8342: 0x30A3,
	    0x8343: 0x30A4,
	    0x8344: 0x30A5,
	    0x8345: 0x30A6,
	    0x8346: 0x30A7,
	    0x8347: 0x30A8,
	    0x8348: 0x30A9,
	    0x8349: 0x30AA,
	    0x834A: 0x30AB,
	    0x834B: 0x30AC,
	    0x834C: 0x30AD,
	    0x834D: 0x30AE,
	    0x834E: 0x30AF,
	    0x834F: 0x30B0,
	    0x8350: 0x30B1,
	    0x8351: 0x30B2,
	    0x8352: 0x30B3,
	    0x8353: 0x30B4,
	    0x8354: 0x30B5,
	    0x8355: 0x30B6,
	    0x8356: 0x30B7,
	    0x8357: 0x30B8,
	    0x8358: 0x30B9,
	    0x8359: 0x30BA,
	    0x835A: 0x30BB,
	    0x835B: 0x30BC,
	    0x835C: 0x30BD,
	    0x835D: 0x30BE,
	    0x835E: 0x30BF,
	    0x835F: 0x30C0,
	    0x8360: 0x30C1,
	    0x8361: 0x30C2,
	    0x8362: 0x30C3,
	    0x8363: 0x30C4,
	    0x8364: 0x30C5,
	    0x8365: 0x30C6,
	    0x8366: 0x30C7,
	    0x8367: 0x30C8,
	    0x8368: 0x30C9,
	    0x8369: 0x30CA,
	    0x836A: 0x30CB,
	    0x836B: 0x30CC,
	    0x836C: 0x30CD,
	    0x836D: 0x30CE,
	    0x836E: 0x30CF,
	    0x836F: 0x30D0,
	    0x8370: 0x30D1,
	    0x8371: 0x30D2,
	    0x8372: 0x30D3,
	    0x8373: 0x30D4,
	    0x8374: 0x30D5,
	    0x8375: 0x30D6,
	    0x8376: 0x30D7,
	    0x8377: 0x30D8,
	    0x8378: 0x30D9,
	    0x8379: 0x30DA,
	    0x837A: 0x30DB,
	    0x837B: 0x30DC,
	    0x837C: 0x30DD,
	    0x837D: 0x30DE,
	    0x837E: 0x30DF,
	    0x8380: 0x30E0,
	    0x8381: 0x30E1,
	    0x8382: 0x30E2,
	    0x8383: 0x30E3,
	    0x8384: 0x30E4,
	    0x8385: 0x30E5,
	    0x8386: 0x30E6,
	    0x8387: 0x30E7,
	    0x8388: 0x30E8,
	    0x8389: 0x30E9,
	    0x838A: 0x30EA,
	    0x838B: 0x30EB,
	    0x838C: 0x30EC,
	    0x838D: 0x30ED,
	    0x838E: 0x30EE,
	    0x838F: 0x30EF,
	    0x8390: 0x30F0,
	    0x8391: 0x30F1,
	    0x8392: 0x30F2,
	    0x8393: 0x30F3,
	    0x8394: 0x30F4,
	    0x8395: 0x30F5,
	    0x8396: 0x30F6,
	    0x839F: 0x0391,
	    0x83A0: 0x0392,
	    0x83A1: 0x0393,
	    0x83A2: 0x0394,
	    0x83A3: 0x0395,
	    0x83A4: 0x0396,
	    0x83A5: 0x0397,
	    0x83A6: 0x0398,
	    0x83A7: 0x0399,
	    0x83A8: 0x039A,
	    0x83A9: 0x039B,
	    0x83AA: 0x039C,
	    0x83AB: 0x039D,
	    0x83AC: 0x039E,
	    0x83AD: 0x039F,
	    0x83AE: 0x03A0,
	    0x83AF: 0x03A1,
	    0x83B0: 0x03A3,
	    0x83B1: 0x03A4,
	    0x83B2: 0x03A5,
	    0x83B3: 0x03A6,
	    0x83B4: 0x03A7,
	    0x83B5: 0x03A8,
	    0x83B6: 0x03A9,
	    0x83BF: 0x03B1,
	    0x83C0: 0x03B2,
	    0x83C1: 0x03B3,
	    0x83C2: 0x03B4,
	    0x83C3: 0x03B5,
	    0x83C4: 0x03B6,
	    0x83C5: 0x03B7,
	    0x83C6: 0x03B8,
	    0x83C7: 0x03B9,
	    0x83C8: 0x03BA,
	    0x83C9: 0x03BB,
	    0x83CA: 0x03BC,
	    0x83CB: 0x03BD,
	    0x83CC: 0x03BE,
	    0x83CD: 0x03BF,
	    0x83CE: 0x03C0,
	    0x83CF: 0x03C1,
	    0x83D0: 0x03C3,
	    0x83D1: 0x03C4,
	    0x83D2: 0x03C5,
	    0x83D3: 0x03C6,
	    0x83D4: 0x03C7,
	    0x83D5: 0x03C8,
	    0x83D6: 0x03C9,
	    0x8440: 0x0410,
	    0x8441: 0x0411,
	    0x8442: 0x0412,
	    0x8443: 0x0413,
	    0x8444: 0x0414,
	    0x8445: 0x0415,
	    0x8446: 0x0401,
	    0x8447: 0x0416,
	    0x8448: 0x0417,
	    0x8449: 0x0418,
	    0x844A: 0x0419,
	    0x844B: 0x041A,
	    0x844C: 0x041B,
	    0x844D: 0x041C,
	    0x844E: 0x041D,
	    0x844F: 0x041E,
	    0x8450: 0x041F,
	    0x8451: 0x0420,
	    0x8452: 0x0421,
	    0x8453: 0x0422,
	    0x8454: 0x0423,
	    0x8455: 0x0424,
	    0x8456: 0x0425,
	    0x8457: 0x0426,
	    0x8458: 0x0427,
	    0x8459: 0x0428,
	    0x845A: 0x0429,
	    0x845B: 0x042A,
	    0x845C: 0x042B,
	    0x845D: 0x042C,
	    0x845E: 0x042D,
	    0x845F: 0x042E,
	    0x8460: 0x042F,
	    0x8470: 0x0430,
	    0x8471: 0x0431,
	    0x8472: 0x0432,
	    0x8473: 0x0433,
	    0x8474: 0x0434,
	    0x8475: 0x0435,
	    0x8476: 0x0451,
	    0x8477: 0x0436,
	    0x8478: 0x0437,
	    0x8479: 0x0438,
	    0x847A: 0x0439,
	    0x847B: 0x043A,
	    0x847C: 0x043B,
	    0x847D: 0x043C,
	    0x847E: 0x043D,
	    0x8480: 0x043E,
	    0x8481: 0x043F,
	    0x8482: 0x0440,
	    0x8483: 0x0441,
	    0x8484: 0x0442,
	    0x8485: 0x0443,
	    0x8486: 0x0444,
	    0x8487: 0x0445,
	    0x8488: 0x0446,
	    0x8489: 0x0447,
	    0x848A: 0x0448,
	    0x848B: 0x0449,
	    0x848C: 0x044A,
	    0x848D: 0x044B,
	    0x848E: 0x044C,
	    0x848F: 0x044D,
	    0x8490: 0x044E,
	    0x8491: 0x044F,
	    0x849F: 0x2500,
	    0x84A0: 0x2502,
	    0x84A1: 0x250C,
	    0x84A2: 0x2510,
	    0x84A3: 0x2518,
	    0x84A4: 0x2514,
	    0x84A5: 0x251C,
	    0x84A6: 0x252C,
	    0x84A7: 0x2524,
	    0x84A8: 0x2534,
	    0x84A9: 0x253C,
	    0x84AA: 0x2501,
	    0x84AB: 0x2503,
	    0x84AC: 0x250F,
	    0x84AD: 0x2513,
	    0x84AE: 0x251B,
	    0x84AF: 0x2517,
	    0x84B0: 0x2523,
	    0x84B1: 0x2533,
	    0x84B2: 0x252B,
	    0x84B3: 0x253B,
	    0x84B4: 0x254B,
	    0x84B5: 0x2520,
	    0x84B6: 0x252F,
	    0x84B7: 0x2528,
	    0x84B8: 0x2537,
	    0x84B9: 0x253F,
	    0x84BA: 0x251D,
	    0x84BB: 0x2530,
	    0x84BC: 0x2525,
	    0x84BD: 0x2538,
	    0x84BE: 0x2542,
	    0x889F: 0x4E9C,
	    0x88A0: 0x5516,
	    0x88A1: 0x5A03,
	    0x88A2: 0x963F,
	    0x88A3: 0x54C0,
	    0x88A4: 0x611B,
	    0x88A5: 0x6328,
	    0x88A6: 0x59F6,
	    0x88A7: 0x9022,
	    0x88A8: 0x8475,
	    0x88A9: 0x831C,
	    0x88AA: 0x7A50,
	    0x88AB: 0x60AA,
	    0x88AC: 0x63E1,
	    0x88AD: 0x6E25,
	    0x88AE: 0x65ED,
	    0x88AF: 0x8466,
	    0x88B0: 0x82A6,
	    0x88B1: 0x9BF5,
	    0x88B2: 0x6893,
	    0x88B3: 0x5727,
	    0x88B4: 0x65A1,
	    0x88B5: 0x6271,
	    0x88B6: 0x5B9B,
	    0x88B7: 0x59D0,
	    0x88B8: 0x867B,
	    0x88B9: 0x98F4,
	    0x88BA: 0x7D62,
	    0x88BB: 0x7DBE,
	    0x88BC: 0x9B8E,
	    0x88BD: 0x6216,
	    0x88BE: 0x7C9F,
	    0x88BF: 0x88B7,
	    0x88C0: 0x5B89,
	    0x88C1: 0x5EB5,
	    0x88C2: 0x6309,
	    0x88C3: 0x6697,
	    0x88C4: 0x6848,
	    0x88C5: 0x95C7,
	    0x88C6: 0x978D,
	    0x88C7: 0x674F,
	    0x88C8: 0x4EE5,
	    0x88C9: 0x4F0A,
	    0x88CA: 0x4F4D,
	    0x88CB: 0x4F9D,
	    0x88CC: 0x5049,
	    0x88CD: 0x56F2,
	    0x88CE: 0x5937,
	    0x88CF: 0x59D4,
	    0x88D0: 0x5A01,
	    0x88D1: 0x5C09,
	    0x88D2: 0x60DF,
	    0x88D3: 0x610F,
	    0x88D4: 0x6170,
	    0x88D5: 0x6613,
	    0x88D6: 0x6905,
	    0x88D7: 0x70BA,
	    0x88D8: 0x754F,
	    0x88D9: 0x7570,
	    0x88DA: 0x79FB,
	    0x88DB: 0x7DAD,
	    0x88DC: 0x7DEF,
	    0x88DD: 0x80C3,
	    0x88DE: 0x840E,
	    0x88DF: 0x8863,
	    0x88E0: 0x8B02,
	    0x88E1: 0x9055,
	    0x88E2: 0x907A,
	    0x88E3: 0x533B,
	    0x88E4: 0x4E95,
	    0x88E5: 0x4EA5,
	    0x88E6: 0x57DF,
	    0x88E7: 0x80B2,
	    0x88E8: 0x90C1,
	    0x88E9: 0x78EF,
	    0x88EA: 0x4E00,
	    0x88EB: 0x58F1,
	    0x88EC: 0x6EA2,
	    0x88ED: 0x9038,
	    0x88EE: 0x7A32,
	    0x88EF: 0x8328,
	    0x88F0: 0x828B,
	    0x88F1: 0x9C2F,
	    0x88F2: 0x5141,
	    0x88F3: 0x5370,
	    0x88F4: 0x54BD,
	    0x88F5: 0x54E1,
	    0x88F6: 0x56E0,
	    0x88F7: 0x59FB,
	    0x88F8: 0x5F15,
	    0x88F9: 0x98F2,
	    0x88FA: 0x6DEB,
	    0x88FB: 0x80E4,
	    0x88FC: 0x852D,
	    0x8940: 0x9662,
	    0x8941: 0x9670,
	    0x8942: 0x96A0,
	    0x8943: 0x97FB,
	    0x8944: 0x540B,
	    0x8945: 0x53F3,
	    0x8946: 0x5B87,
	    0x8947: 0x70CF,
	    0x8948: 0x7FBD,
	    0x8949: 0x8FC2,
	    0x894A: 0x96E8,
	    0x894B: 0x536F,
	    0x894C: 0x9D5C,
	    0x894D: 0x7ABA,
	    0x894E: 0x4E11,
	    0x894F: 0x7893,
	    0x8950: 0x81FC,
	    0x8951: 0x6E26,
	    0x8952: 0x5618,
	    0x8953: 0x5504,
	    0x8954: 0x6B1D,
	    0x8955: 0x851A,
	    0x8956: 0x9C3B,
	    0x8957: 0x59E5,
	    0x8958: 0x53A9,
	    0x8959: 0x6D66,
	    0x895A: 0x74DC,
	    0x895B: 0x958F,
	    0x895C: 0x5642,
	    0x895D: 0x4E91,
	    0x895E: 0x904B,
	    0x895F: 0x96F2,
	    0x8960: 0x834F,
	    0x8961: 0x990C,
	    0x8962: 0x53E1,
	    0x8963: 0x55B6,
	    0x8964: 0x5B30,
	    0x8965: 0x5F71,
	    0x8966: 0x6620,
	    0x8967: 0x66F3,
	    0x8968: 0x6804,
	    0x8969: 0x6C38,
	    0x896A: 0x6CF3,
	    0x896B: 0x6D29,
	    0x896C: 0x745B,
	    0x896D: 0x76C8,
	    0x896E: 0x7A4E,
	    0x896F: 0x9834,
	    0x8970: 0x82F1,
	    0x8971: 0x885B,
	    0x8972: 0x8A60,
	    0x8973: 0x92ED,
	    0x8974: 0x6DB2,
	    0x8975: 0x75AB,
	    0x8976: 0x76CA,
	    0x8977: 0x99C5,
	    0x8978: 0x60A6,
	    0x8979: 0x8B01,
	    0x897A: 0x8D8A,
	    0x897B: 0x95B2,
	    0x897C: 0x698E,
	    0x897D: 0x53AD,
	    0x897E: 0x5186,
	    0x8980: 0x5712,
	    0x8981: 0x5830,
	    0x8982: 0x5944,
	    0x8983: 0x5BB4,
	    0x8984: 0x5EF6,
	    0x8985: 0x6028,
	    0x8986: 0x63A9,
	    0x8987: 0x63F4,
	    0x8988: 0x6CBF,
	    0x8989: 0x6F14,
	    0x898A: 0x708E,
	    0x898B: 0x7114,
	    0x898C: 0x7159,
	    0x898D: 0x71D5,
	    0x898E: 0x733F,
	    0x898F: 0x7E01,
	    0x8990: 0x8276,
	    0x8991: 0x82D1,
	    0x8992: 0x8597,
	    0x8993: 0x9060,
	    0x8994: 0x925B,
	    0x8995: 0x9D1B,
	    0x8996: 0x5869,
	    0x8997: 0x65BC,
	    0x8998: 0x6C5A,
	    0x8999: 0x7525,
	    0x899A: 0x51F9,
	    0x899B: 0x592E,
	    0x899C: 0x5965,
	    0x899D: 0x5F80,
	    0x899E: 0x5FDC,
	    0x899F: 0x62BC,
	    0x89A0: 0x65FA,
	    0x89A1: 0x6A2A,
	    0x89A2: 0x6B27,
	    0x89A3: 0x6BB4,
	    0x89A4: 0x738B,
	    0x89A5: 0x7FC1,
	    0x89A6: 0x8956,
	    0x89A7: 0x9D2C,
	    0x89A8: 0x9D0E,
	    0x89A9: 0x9EC4,
	    0x89AA: 0x5CA1,
	    0x89AB: 0x6C96,
	    0x89AC: 0x837B,
	    0x89AD: 0x5104,
	    0x89AE: 0x5C4B,
	    0x89AF: 0x61B6,
	    0x89B0: 0x81C6,
	    0x89B1: 0x6876,
	    0x89B2: 0x7261,
	    0x89B3: 0x4E59,
	    0x89B4: 0x4FFA,
	    0x89B5: 0x5378,
	    0x89B6: 0x6069,
	    0x89B7: 0x6E29,
	    0x89B8: 0x7A4F,
	    0x89B9: 0x97F3,
	    0x89BA: 0x4E0B,
	    0x89BB: 0x5316,
	    0x89BC: 0x4EEE,
	    0x89BD: 0x4F55,
	    0x89BE: 0x4F3D,
	    0x89BF: 0x4FA1,
	    0x89C0: 0x4F73,
	    0x89C1: 0x52A0,
	    0x89C2: 0x53EF,
	    0x89C3: 0x5609,
	    0x89C4: 0x590F,
	    0x89C5: 0x5AC1,
	    0x89C6: 0x5BB6,
	    0x89C7: 0x5BE1,
	    0x89C8: 0x79D1,
	    0x89C9: 0x6687,
	    0x89CA: 0x679C,
	    0x89CB: 0x67B6,
	    0x89CC: 0x6B4C,
	    0x89CD: 0x6CB3,
	    0x89CE: 0x706B,
	    0x89CF: 0x73C2,
	    0x89D0: 0x798D,
	    0x89D1: 0x79BE,
	    0x89D2: 0x7A3C,
	    0x89D3: 0x7B87,
	    0x89D4: 0x82B1,
	    0x89D5: 0x82DB,
	    0x89D6: 0x8304,
	    0x89D7: 0x8377,
	    0x89D8: 0x83EF,
	    0x89D9: 0x83D3,
	    0x89DA: 0x8766,
	    0x89DB: 0x8AB2,
	    0x89DC: 0x5629,
	    0x89DD: 0x8CA8,
	    0x89DE: 0x8FE6,
	    0x89DF: 0x904E,
	    0x89E0: 0x971E,
	    0x89E1: 0x868A,
	    0x89E2: 0x4FC4,
	    0x89E3: 0x5CE8,
	    0x89E4: 0x6211,
	    0x89E5: 0x7259,
	    0x89E6: 0x753B,
	    0x89E7: 0x81E5,
	    0x89E8: 0x82BD,
	    0x89E9: 0x86FE,
	    0x89EA: 0x8CC0,
	    0x89EB: 0x96C5,
	    0x89EC: 0x9913,
	    0x89ED: 0x99D5,
	    0x89EE: 0x4ECB,
	    0x89EF: 0x4F1A,
	    0x89F0: 0x89E3,
	    0x89F1: 0x56DE,
	    0x89F2: 0x584A,
	    0x89F3: 0x58CA,
	    0x89F4: 0x5EFB,
	    0x89F5: 0x5FEB,
	    0x89F6: 0x602A,
	    0x89F7: 0x6094,
	    0x89F8: 0x6062,
	    0x89F9: 0x61D0,
	    0x89FA: 0x6212,
	    0x89FB: 0x62D0,
	    0x89FC: 0x6539,
	    0x8A40: 0x9B41,
	    0x8A41: 0x6666,
	    0x8A42: 0x68B0,
	    0x8A43: 0x6D77,
	    0x8A44: 0x7070,
	    0x8A45: 0x754C,
	    0x8A46: 0x7686,
	    0x8A47: 0x7D75,
	    0x8A48: 0x82A5,
	    0x8A49: 0x87F9,
	    0x8A4A: 0x958B,
	    0x8A4B: 0x968E,
	    0x8A4C: 0x8C9D,
	    0x8A4D: 0x51F1,
	    0x8A4E: 0x52BE,
	    0x8A4F: 0x5916,
	    0x8A50: 0x54B3,
	    0x8A51: 0x5BB3,
	    0x8A52: 0x5D16,
	    0x8A53: 0x6168,
	    0x8A54: 0x6982,
	    0x8A55: 0x6DAF,
	    0x8A56: 0x788D,
	    0x8A57: 0x84CB,
	    0x8A58: 0x8857,
	    0x8A59: 0x8A72,
	    0x8A5A: 0x93A7,
	    0x8A5B: 0x9AB8,
	    0x8A5C: 0x6D6C,
	    0x8A5D: 0x99A8,
	    0x8A5E: 0x86D9,
	    0x8A5F: 0x57A3,
	    0x8A60: 0x67FF,
	    0x8A61: 0x86CE,
	    0x8A62: 0x920E,
	    0x8A63: 0x5283,
	    0x8A64: 0x5687,
	    0x8A65: 0x5404,
	    0x8A66: 0x5ED3,
	    0x8A67: 0x62E1,
	    0x8A68: 0x64B9,
	    0x8A69: 0x683C,
	    0x8A6A: 0x6838,
	    0x8A6B: 0x6BBB,
	    0x8A6C: 0x7372,
	    0x8A6D: 0x78BA,
	    0x8A6E: 0x7A6B,
	    0x8A6F: 0x899A,
	    0x8A70: 0x89D2,
	    0x8A71: 0x8D6B,
	    0x8A72: 0x8F03,
	    0x8A73: 0x90ED,
	    0x8A74: 0x95A3,
	    0x8A75: 0x9694,
	    0x8A76: 0x9769,
	    0x8A77: 0x5B66,
	    0x8A78: 0x5CB3,
	    0x8A79: 0x697D,
	    0x8A7A: 0x984D,
	    0x8A7B: 0x984E,
	    0x8A7C: 0x639B,
	    0x8A7D: 0x7B20,
	    0x8A7E: 0x6A2B,
	    0x8A80: 0x6A7F,
	    0x8A81: 0x68B6,
	    0x8A82: 0x9C0D,
	    0x8A83: 0x6F5F,
	    0x8A84: 0x5272,
	    0x8A85: 0x559D,
	    0x8A86: 0x6070,
	    0x8A87: 0x62EC,
	    0x8A88: 0x6D3B,
	    0x8A89: 0x6E07,
	    0x8A8A: 0x6ED1,
	    0x8A8B: 0x845B,
	    0x8A8C: 0x8910,
	    0x8A8D: 0x8F44,
	    0x8A8E: 0x4E14,
	    0x8A8F: 0x9C39,
	    0x8A90: 0x53F6,
	    0x8A91: 0x691B,
	    0x8A92: 0x6A3A,
	    0x8A93: 0x9784,
	    0x8A94: 0x682A,
	    0x8A95: 0x515C,
	    0x8A96: 0x7AC3,
	    0x8A97: 0x84B2,
	    0x8A98: 0x91DC,
	    0x8A99: 0x938C,
	    0x8A9A: 0x565B,
	    0x8A9B: 0x9D28,
	    0x8A9C: 0x6822,
	    0x8A9D: 0x8305,
	    0x8A9E: 0x8431,
	    0x8A9F: 0x7CA5,
	    0x8AA0: 0x5208,
	    0x8AA1: 0x82C5,
	    0x8AA2: 0x74E6,
	    0x8AA3: 0x4E7E,
	    0x8AA4: 0x4F83,
	    0x8AA5: 0x51A0,
	    0x8AA6: 0x5BD2,
	    0x8AA7: 0x520A,
	    0x8AA8: 0x52D8,
	    0x8AA9: 0x52E7,
	    0x8AAA: 0x5DFB,
	    0x8AAB: 0x559A,
	    0x8AAC: 0x582A,
	    0x8AAD: 0x59E6,
	    0x8AAE: 0x5B8C,
	    0x8AAF: 0x5B98,
	    0x8AB0: 0x5BDB,
	    0x8AB1: 0x5E72,
	    0x8AB2: 0x5E79,
	    0x8AB3: 0x60A3,
	    0x8AB4: 0x611F,
	    0x8AB5: 0x6163,
	    0x8AB6: 0x61BE,
	    0x8AB7: 0x63DB,
	    0x8AB8: 0x6562,
	    0x8AB9: 0x67D1,
	    0x8ABA: 0x6853,
	    0x8ABB: 0x68FA,
	    0x8ABC: 0x6B3E,
	    0x8ABD: 0x6B53,
	    0x8ABE: 0x6C57,
	    0x8ABF: 0x6F22,
	    0x8AC0: 0x6F97,
	    0x8AC1: 0x6F45,
	    0x8AC2: 0x74B0,
	    0x8AC3: 0x7518,
	    0x8AC4: 0x76E3,
	    0x8AC5: 0x770B,
	    0x8AC6: 0x7AFF,
	    0x8AC7: 0x7BA1,
	    0x8AC8: 0x7C21,
	    0x8AC9: 0x7DE9,
	    0x8ACA: 0x7F36,
	    0x8ACB: 0x7FF0,
	    0x8ACC: 0x809D,
	    0x8ACD: 0x8266,
	    0x8ACE: 0x839E,
	    0x8ACF: 0x89B3,
	    0x8AD0: 0x8ACC,
	    0x8AD1: 0x8CAB,
	    0x8AD2: 0x9084,
	    0x8AD3: 0x9451,
	    0x8AD4: 0x9593,
	    0x8AD5: 0x9591,
	    0x8AD6: 0x95A2,
	    0x8AD7: 0x9665,
	    0x8AD8: 0x97D3,
	    0x8AD9: 0x9928,
	    0x8ADA: 0x8218,
	    0x8ADB: 0x4E38,
	    0x8ADC: 0x542B,
	    0x8ADD: 0x5CB8,
	    0x8ADE: 0x5DCC,
	    0x8ADF: 0x73A9,
	    0x8AE0: 0x764C,
	    0x8AE1: 0x773C,
	    0x8AE2: 0x5CA9,
	    0x8AE3: 0x7FEB,
	    0x8AE4: 0x8D0B,
	    0x8AE5: 0x96C1,
	    0x8AE6: 0x9811,
	    0x8AE7: 0x9854,
	    0x8AE8: 0x9858,
	    0x8AE9: 0x4F01,
	    0x8AEA: 0x4F0E,
	    0x8AEB: 0x5371,
	    0x8AEC: 0x559C,
	    0x8AED: 0x5668,
	    0x8AEE: 0x57FA,
	    0x8AEF: 0x5947,
	    0x8AF0: 0x5B09,
	    0x8AF1: 0x5BC4,
	    0x8AF2: 0x5C90,
	    0x8AF3: 0x5E0C,
	    0x8AF4: 0x5E7E,
	    0x8AF5: 0x5FCC,
	    0x8AF6: 0x63EE,
	    0x8AF7: 0x673A,
	    0x8AF8: 0x65D7,
	    0x8AF9: 0x65E2,
	    0x8AFA: 0x671F,
	    0x8AFB: 0x68CB,
	    0x8AFC: 0x68C4,
	    0x8B40: 0x6A5F,
	    0x8B41: 0x5E30,
	    0x8B42: 0x6BC5,
	    0x8B43: 0x6C17,
	    0x8B44: 0x6C7D,
	    0x8B45: 0x757F,
	    0x8B46: 0x7948,
	    0x8B47: 0x5B63,
	    0x8B48: 0x7A00,
	    0x8B49: 0x7D00,
	    0x8B4A: 0x5FBD,
	    0x8B4B: 0x898F,
	    0x8B4C: 0x8A18,
	    0x8B4D: 0x8CB4,
	    0x8B4E: 0x8D77,
	    0x8B4F: 0x8ECC,
	    0x8B50: 0x8F1D,
	    0x8B51: 0x98E2,
	    0x8B52: 0x9A0E,
	    0x8B53: 0x9B3C,
	    0x8B54: 0x4E80,
	    0x8B55: 0x507D,
	    0x8B56: 0x5100,
	    0x8B57: 0x5993,
	    0x8B58: 0x5B9C,
	    0x8B59: 0x622F,
	    0x8B5A: 0x6280,
	    0x8B5B: 0x64EC,
	    0x8B5C: 0x6B3A,
	    0x8B5D: 0x72A0,
	    0x8B5E: 0x7591,
	    0x8B5F: 0x7947,
	    0x8B60: 0x7FA9,
	    0x8B61: 0x87FB,
	    0x8B62: 0x8ABC,
	    0x8B63: 0x8B70,
	    0x8B64: 0x63AC,
	    0x8B65: 0x83CA,
	    0x8B66: 0x97A0,
	    0x8B67: 0x5409,
	    0x8B68: 0x5403,
	    0x8B69: 0x55AB,
	    0x8B6A: 0x6854,
	    0x8B6B: 0x6A58,
	    0x8B6C: 0x8A70,
	    0x8B6D: 0x7827,
	    0x8B6E: 0x6775,
	    0x8B6F: 0x9ECD,
	    0x8B70: 0x5374,
	    0x8B71: 0x5BA2,
	    0x8B72: 0x811A,
	    0x8B73: 0x8650,
	    0x8B74: 0x9006,
	    0x8B75: 0x4E18,
	    0x8B76: 0x4E45,
	    0x8B77: 0x4EC7,
	    0x8B78: 0x4F11,
	    0x8B79: 0x53CA,
	    0x8B7A: 0x5438,
	    0x8B7B: 0x5BAE,
	    0x8B7C: 0x5F13,
	    0x8B7D: 0x6025,
	    0x8B7E: 0x6551,
	    0x8B80: 0x673D,
	    0x8B81: 0x6C42,
	    0x8B82: 0x6C72,
	    0x8B83: 0x6CE3,
	    0x8B84: 0x7078,
	    0x8B85: 0x7403,
	    0x8B86: 0x7A76,
	    0x8B87: 0x7AAE,
	    0x8B88: 0x7B08,
	    0x8B89: 0x7D1A,
	    0x8B8A: 0x7CFE,
	    0x8B8B: 0x7D66,
	    0x8B8C: 0x65E7,
	    0x8B8D: 0x725B,
	    0x8B8E: 0x53BB,
	    0x8B8F: 0x5C45,
	    0x8B90: 0x5DE8,
	    0x8B91: 0x62D2,
	    0x8B92: 0x62E0,
	    0x8B93: 0x6319,
	    0x8B94: 0x6E20,
	    0x8B95: 0x865A,
	    0x8B96: 0x8A31,
	    0x8B97: 0x8DDD,
	    0x8B98: 0x92F8,
	    0x8B99: 0x6F01,
	    0x8B9A: 0x79A6,
	    0x8B9B: 0x9B5A,
	    0x8B9C: 0x4EA8,
	    0x8B9D: 0x4EAB,
	    0x8B9E: 0x4EAC,
	    0x8B9F: 0x4F9B,
	    0x8BA0: 0x4FA0,
	    0x8BA1: 0x50D1,
	    0x8BA2: 0x5147,
	    0x8BA3: 0x7AF6,
	    0x8BA4: 0x5171,
	    0x8BA5: 0x51F6,
	    0x8BA6: 0x5354,
	    0x8BA7: 0x5321,
	    0x8BA8: 0x537F,
	    0x8BA9: 0x53EB,
	    0x8BAA: 0x55AC,
	    0x8BAB: 0x5883,
	    0x8BAC: 0x5CE1,
	    0x8BAD: 0x5F37,
	    0x8BAE: 0x5F4A,
	    0x8BAF: 0x602F,
	    0x8BB0: 0x6050,
	    0x8BB1: 0x606D,
	    0x8BB2: 0x631F,
	    0x8BB3: 0x6559,
	    0x8BB4: 0x6A4B,
	    0x8BB5: 0x6CC1,
	    0x8BB6: 0x72C2,
	    0x8BB7: 0x72ED,
	    0x8BB8: 0x77EF,
	    0x8BB9: 0x80F8,
	    0x8BBA: 0x8105,
	    0x8BBB: 0x8208,
	    0x8BBC: 0x854E,
	    0x8BBD: 0x90F7,
	    0x8BBE: 0x93E1,
	    0x8BBF: 0x97FF,
	    0x8BC0: 0x9957,
	    0x8BC1: 0x9A5A,
	    0x8BC2: 0x4EF0,
	    0x8BC3: 0x51DD,
	    0x8BC4: 0x5C2D,
	    0x8BC5: 0x6681,
	    0x8BC6: 0x696D,
	    0x8BC7: 0x5C40,
	    0x8BC8: 0x66F2,
	    0x8BC9: 0x6975,
	    0x8BCA: 0x7389,
	    0x8BCB: 0x6850,
	    0x8BCC: 0x7C81,
	    0x8BCD: 0x50C5,
	    0x8BCE: 0x52E4,
	    0x8BCF: 0x5747,
	    0x8BD0: 0x5DFE,
	    0x8BD1: 0x9326,
	    0x8BD2: 0x65A4,
	    0x8BD3: 0x6B23,
	    0x8BD4: 0x6B3D,
	    0x8BD5: 0x7434,
	    0x8BD6: 0x7981,
	    0x8BD7: 0x79BD,
	    0x8BD8: 0x7B4B,
	    0x8BD9: 0x7DCA,
	    0x8BDA: 0x82B9,
	    0x8BDB: 0x83CC,
	    0x8BDC: 0x887F,
	    0x8BDD: 0x895F,
	    0x8BDE: 0x8B39,
	    0x8BDF: 0x8FD1,
	    0x8BE0: 0x91D1,
	    0x8BE1: 0x541F,
	    0x8BE2: 0x9280,
	    0x8BE3: 0x4E5D,
	    0x8BE4: 0x5036,
	    0x8BE5: 0x53E5,
	    0x8BE6: 0x533A,
	    0x8BE7: 0x72D7,
	    0x8BE8: 0x7396,
	    0x8BE9: 0x77E9,
	    0x8BEA: 0x82E6,
	    0x8BEB: 0x8EAF,
	    0x8BEC: 0x99C6,
	    0x8BED: 0x99C8,
	    0x8BEE: 0x99D2,
	    0x8BEF: 0x5177,
	    0x8BF0: 0x611A,
	    0x8BF1: 0x865E,
	    0x8BF2: 0x55B0,
	    0x8BF3: 0x7A7A,
	    0x8BF4: 0x5076,
	    0x8BF5: 0x5BD3,
	    0x8BF6: 0x9047,
	    0x8BF7: 0x9685,
	    0x8BF8: 0x4E32,
	    0x8BF9: 0x6ADB,
	    0x8BFA: 0x91E7,
	    0x8BFB: 0x5C51,
	    0x8BFC: 0x5C48,
	    0x8C40: 0x6398,
	    0x8C41: 0x7A9F,
	    0x8C42: 0x6C93,
	    0x8C43: 0x9774,
	    0x8C44: 0x8F61,
	    0x8C45: 0x7AAA,
	    0x8C46: 0x718A,
	    0x8C47: 0x9688,
	    0x8C48: 0x7C82,
	    0x8C49: 0x6817,
	    0x8C4A: 0x7E70,
	    0x8C4B: 0x6851,
	    0x8C4C: 0x936C,
	    0x8C4D: 0x52F2,
	    0x8C4E: 0x541B,
	    0x8C4F: 0x85AB,
	    0x8C50: 0x8A13,
	    0x8C51: 0x7FA4,
	    0x8C52: 0x8ECD,
	    0x8C53: 0x90E1,
	    0x8C54: 0x5366,
	    0x8C55: 0x8888,
	    0x8C56: 0x7941,
	    0x8C57: 0x4FC2,
	    0x8C58: 0x50BE,
	    0x8C59: 0x5211,
	    0x8C5A: 0x5144,
	    0x8C5B: 0x5553,
	    0x8C5C: 0x572D,
	    0x8C5D: 0x73EA,
	    0x8C5E: 0x578B,
	    0x8C5F: 0x5951,
	    0x8C60: 0x5F62,
	    0x8C61: 0x5F84,
	    0x8C62: 0x6075,
	    0x8C63: 0x6176,
	    0x8C64: 0x6167,
	    0x8C65: 0x61A9,
	    0x8C66: 0x63B2,
	    0x8C67: 0x643A,
	    0x8C68: 0x656C,
	    0x8C69: 0x666F,
	    0x8C6A: 0x6842,
	    0x8C6B: 0x6E13,
	    0x8C6C: 0x7566,
	    0x8C6D: 0x7A3D,
	    0x8C6E: 0x7CFB,
	    0x8C6F: 0x7D4C,
	    0x8C70: 0x7D99,
	    0x8C71: 0x7E4B,
	    0x8C72: 0x7F6B,
	    0x8C73: 0x830E,
	    0x8C74: 0x834A,
	    0x8C75: 0x86CD,
	    0x8C76: 0x8A08,
	    0x8C77: 0x8A63,
	    0x8C78: 0x8B66,
	    0x8C79: 0x8EFD,
	    0x8C7A: 0x981A,
	    0x8C7B: 0x9D8F,
	    0x8C7C: 0x82B8,
	    0x8C7D: 0x8FCE,
	    0x8C7E: 0x9BE8,
	    0x8C80: 0x5287,
	    0x8C81: 0x621F,
	    0x8C82: 0x6483,
	    0x8C83: 0x6FC0,
	    0x8C84: 0x9699,
	    0x8C85: 0x6841,
	    0x8C86: 0x5091,
	    0x8C87: 0x6B20,
	    0x8C88: 0x6C7A,
	    0x8C89: 0x6F54,
	    0x8C8A: 0x7A74,
	    0x8C8B: 0x7D50,
	    0x8C8C: 0x8840,
	    0x8C8D: 0x8A23,
	    0x8C8E: 0x6708,
	    0x8C8F: 0x4EF6,
	    0x8C90: 0x5039,
	    0x8C91: 0x5026,
	    0x8C92: 0x5065,
	    0x8C93: 0x517C,
	    0x8C94: 0x5238,
	    0x8C95: 0x5263,
	    0x8C96: 0x55A7,
	    0x8C97: 0x570F,
	    0x8C98: 0x5805,
	    0x8C99: 0x5ACC,
	    0x8C9A: 0x5EFA,
	    0x8C9B: 0x61B2,
	    0x8C9C: 0x61F8,
	    0x8C9D: 0x62F3,
	    0x8C9E: 0x6372,
	    0x8C9F: 0x691C,
	    0x8CA0: 0x6A29,
	    0x8CA1: 0x727D,
	    0x8CA2: 0x72AC,
	    0x8CA3: 0x732E,
	    0x8CA4: 0x7814,
	    0x8CA5: 0x786F,
	    0x8CA6: 0x7D79,
	    0x8CA7: 0x770C,
	    0x8CA8: 0x80A9,
	    0x8CA9: 0x898B,
	    0x8CAA: 0x8B19,
	    0x8CAB: 0x8CE2,
	    0x8CAC: 0x8ED2,
	    0x8CAD: 0x9063,
	    0x8CAE: 0x9375,
	    0x8CAF: 0x967A,
	    0x8CB0: 0x9855,
	    0x8CB1: 0x9A13,
	    0x8CB2: 0x9E78,
	    0x8CB3: 0x5143,
	    0x8CB4: 0x539F,
	    0x8CB5: 0x53B3,
	    0x8CB6: 0x5E7B,
	    0x8CB7: 0x5F26,
	    0x8CB8: 0x6E1B,
	    0x8CB9: 0x6E90,
	    0x8CBA: 0x7384,
	    0x8CBB: 0x73FE,
	    0x8CBC: 0x7D43,
	    0x8CBD: 0x8237,
	    0x8CBE: 0x8A00,
	    0x8CBF: 0x8AFA,
	    0x8CC0: 0x9650,
	    0x8CC1: 0x4E4E,
	    0x8CC2: 0x500B,
	    0x8CC3: 0x53E4,
	    0x8CC4: 0x547C,
	    0x8CC5: 0x56FA,
	    0x8CC6: 0x59D1,
	    0x8CC7: 0x5B64,
	    0x8CC8: 0x5DF1,
	    0x8CC9: 0x5EAB,
	    0x8CCA: 0x5F27,
	    0x8CCB: 0x6238,
	    0x8CCC: 0x6545,
	    0x8CCD: 0x67AF,
	    0x8CCE: 0x6E56,
	    0x8CCF: 0x72D0,
	    0x8CD0: 0x7CCA,
	    0x8CD1: 0x88B4,
	    0x8CD2: 0x80A1,
	    0x8CD3: 0x80E1,
	    0x8CD4: 0x83F0,
	    0x8CD5: 0x864E,
	    0x8CD6: 0x8A87,
	    0x8CD7: 0x8DE8,
	    0x8CD8: 0x9237,
	    0x8CD9: 0x96C7,
	    0x8CDA: 0x9867,
	    0x8CDB: 0x9F13,
	    0x8CDC: 0x4E94,
	    0x8CDD: 0x4E92,
	    0x8CDE: 0x4F0D,
	    0x8CDF: 0x5348,
	    0x8CE0: 0x5449,
	    0x8CE1: 0x543E,
	    0x8CE2: 0x5A2F,
	    0x8CE3: 0x5F8C,
	    0x8CE4: 0x5FA1,
	    0x8CE5: 0x609F,
	    0x8CE6: 0x68A7,
	    0x8CE7: 0x6A8E,
	    0x8CE8: 0x745A,
	    0x8CE9: 0x7881,
	    0x8CEA: 0x8A9E,
	    0x8CEB: 0x8AA4,
	    0x8CEC: 0x8B77,
	    0x8CED: 0x9190,
	    0x8CEE: 0x4E5E,
	    0x8CEF: 0x9BC9,
	    0x8CF0: 0x4EA4,
	    0x8CF1: 0x4F7C,
	    0x8CF2: 0x4FAF,
	    0x8CF3: 0x5019,
	    0x8CF4: 0x5016,
	    0x8CF5: 0x5149,
	    0x8CF6: 0x516C,
	    0x8CF7: 0x529F,
	    0x8CF8: 0x52B9,
	    0x8CF9: 0x52FE,
	    0x8CFA: 0x539A,
	    0x8CFB: 0x53E3,
	    0x8CFC: 0x5411,
	    0x8D40: 0x540E,
	    0x8D41: 0x5589,
	    0x8D42: 0x5751,
	    0x8D43: 0x57A2,
	    0x8D44: 0x597D,
	    0x8D45: 0x5B54,
	    0x8D46: 0x5B5D,
	    0x8D47: 0x5B8F,
	    0x8D48: 0x5DE5,
	    0x8D49: 0x5DE7,
	    0x8D4A: 0x5DF7,
	    0x8D4B: 0x5E78,
	    0x8D4C: 0x5E83,
	    0x8D4D: 0x5E9A,
	    0x8D4E: 0x5EB7,
	    0x8D4F: 0x5F18,
	    0x8D50: 0x6052,
	    0x8D51: 0x614C,
	    0x8D52: 0x6297,
	    0x8D53: 0x62D8,
	    0x8D54: 0x63A7,
	    0x8D55: 0x653B,
	    0x8D56: 0x6602,
	    0x8D57: 0x6643,
	    0x8D58: 0x66F4,
	    0x8D59: 0x676D,
	    0x8D5A: 0x6821,
	    0x8D5B: 0x6897,
	    0x8D5C: 0x69CB,
	    0x8D5D: 0x6C5F,
	    0x8D5E: 0x6D2A,
	    0x8D5F: 0x6D69,
	    0x8D60: 0x6E2F,
	    0x8D61: 0x6E9D,
	    0x8D62: 0x7532,
	    0x8D63: 0x7687,
	    0x8D64: 0x786C,
	    0x8D65: 0x7A3F,
	    0x8D66: 0x7CE0,
	    0x8D67: 0x7D05,
	    0x8D68: 0x7D18,
	    0x8D69: 0x7D5E,
	    0x8D6A: 0x7DB1,
	    0x8D6B: 0x8015,
	    0x8D6C: 0x8003,
	    0x8D6D: 0x80AF,
	    0x8D6E: 0x80B1,
	    0x8D6F: 0x8154,
	    0x8D70: 0x818F,
	    0x8D71: 0x822A,
	    0x8D72: 0x8352,
	    0x8D73: 0x884C,
	    0x8D74: 0x8861,
	    0x8D75: 0x8B1B,
	    0x8D76: 0x8CA2,
	    0x8D77: 0x8CFC,
	    0x8D78: 0x90CA,
	    0x8D79: 0x9175,
	    0x8D7A: 0x9271,
	    0x8D7B: 0x783F,
	    0x8D7C: 0x92FC,
	    0x8D7D: 0x95A4,
	    0x8D7E: 0x964D,
	    0x8D80: 0x9805,
	    0x8D81: 0x9999,
	    0x8D82: 0x9AD8,
	    0x8D83: 0x9D3B,
	    0x8D84: 0x525B,
	    0x8D85: 0x52AB,
	    0x8D86: 0x53F7,
	    0x8D87: 0x5408,
	    0x8D88: 0x58D5,
	    0x8D89: 0x62F7,
	    0x8D8A: 0x6FE0,
	    0x8D8B: 0x8C6A,
	    0x8D8C: 0x8F5F,
	    0x8D8D: 0x9EB9,
	    0x8D8E: 0x514B,
	    0x8D8F: 0x523B,
	    0x8D90: 0x544A,
	    0x8D91: 0x56FD,
	    0x8D92: 0x7A40,
	    0x8D93: 0x9177,
	    0x8D94: 0x9D60,
	    0x8D95: 0x9ED2,
	    0x8D96: 0x7344,
	    0x8D97: 0x6F09,
	    0x8D98: 0x8170,
	    0x8D99: 0x7511,
	    0x8D9A: 0x5FFD,
	    0x8D9B: 0x60DA,
	    0x8D9C: 0x9AA8,
	    0x8D9D: 0x72DB,
	    0x8D9E: 0x8FBC,
	    0x8D9F: 0x6B64,
	    0x8DA0: 0x9803,
	    0x8DA1: 0x4ECA,
	    0x8DA2: 0x56F0,
	    0x8DA3: 0x5764,
	    0x8DA4: 0x58BE,
	    0x8DA5: 0x5A5A,
	    0x8DA6: 0x6068,
	    0x8DA7: 0x61C7,
	    0x8DA8: 0x660F,
	    0x8DA9: 0x6606,
	    0x8DAA: 0x6839,
	    0x8DAB: 0x68B1,
	    0x8DAC: 0x6DF7,
	    0x8DAD: 0x75D5,
	    0x8DAE: 0x7D3A,
	    0x8DAF: 0x826E,
	    0x8DB0: 0x9B42,
	    0x8DB1: 0x4E9B,
	    0x8DB2: 0x4F50,
	    0x8DB3: 0x53C9,
	    0x8DB4: 0x5506,
	    0x8DB5: 0x5D6F,
	    0x8DB6: 0x5DE6,
	    0x8DB7: 0x5DEE,
	    0x8DB8: 0x67FB,
	    0x8DB9: 0x6C99,
	    0x8DBA: 0x7473,
	    0x8DBB: 0x7802,
	    0x8DBC: 0x8A50,
	    0x8DBD: 0x9396,
	    0x8DBE: 0x88DF,
	    0x8DBF: 0x5750,
	    0x8DC0: 0x5EA7,
	    0x8DC1: 0x632B,
	    0x8DC2: 0x50B5,
	    0x8DC3: 0x50AC,
	    0x8DC4: 0x518D,
	    0x8DC5: 0x6700,
	    0x8DC6: 0x54C9,
	    0x8DC7: 0x585E,
	    0x8DC8: 0x59BB,
	    0x8DC9: 0x5BB0,
	    0x8DCA: 0x5F69,
	    0x8DCB: 0x624D,
	    0x8DCC: 0x63A1,
	    0x8DCD: 0x683D,
	    0x8DCE: 0x6B73,
	    0x8DCF: 0x6E08,
	    0x8DD0: 0x707D,
	    0x8DD1: 0x91C7,
	    0x8DD2: 0x7280,
	    0x8DD3: 0x7815,
	    0x8DD4: 0x7826,
	    0x8DD5: 0x796D,
	    0x8DD6: 0x658E,
	    0x8DD7: 0x7D30,
	    0x8DD8: 0x83DC,
	    0x8DD9: 0x88C1,
	    0x8DDA: 0x8F09,
	    0x8DDB: 0x969B,
	    0x8DDC: 0x5264,
	    0x8DDD: 0x5728,
	    0x8DDE: 0x6750,
	    0x8DDF: 0x7F6A,
	    0x8DE0: 0x8CA1,
	    0x8DE1: 0x51B4,
	    0x8DE2: 0x5742,
	    0x8DE3: 0x962A,
	    0x8DE4: 0x583A,
	    0x8DE5: 0x698A,
	    0x8DE6: 0x80B4,
	    0x8DE7: 0x54B2,
	    0x8DE8: 0x5D0E,
	    0x8DE9: 0x57FC,
	    0x8DEA: 0x7895,
	    0x8DEB: 0x9DFA,
	    0x8DEC: 0x4F5C,
	    0x8DED: 0x524A,
	    0x8DEE: 0x548B,
	    0x8DEF: 0x643E,
	    0x8DF0: 0x6628,
	    0x8DF1: 0x6714,
	    0x8DF2: 0x67F5,
	    0x8DF3: 0x7A84,
	    0x8DF4: 0x7B56,
	    0x8DF5: 0x7D22,
	    0x8DF6: 0x932F,
	    0x8DF7: 0x685C,
	    0x8DF8: 0x9BAD,
	    0x8DF9: 0x7B39,
	    0x8DFA: 0x5319,
	    0x8DFB: 0x518A,
	    0x8DFC: 0x5237,
	    0x8E40: 0x5BDF,
	    0x8E41: 0x62F6,
	    0x8E42: 0x64AE,
	    0x8E43: 0x64E6,
	    0x8E44: 0x672D,
	    0x8E45: 0x6BBA,
	    0x8E46: 0x85A9,
	    0x8E47: 0x96D1,
	    0x8E48: 0x7690,
	    0x8E49: 0x9BD6,
	    0x8E4A: 0x634C,
	    0x8E4B: 0x9306,
	    0x8E4C: 0x9BAB,
	    0x8E4D: 0x76BF,
	    0x8E4E: 0x6652,
	    0x8E4F: 0x4E09,
	    0x8E50: 0x5098,
	    0x8E51: 0x53C2,
	    0x8E52: 0x5C71,
	    0x8E53: 0x60E8,
	    0x8E54: 0x6492,
	    0x8E55: 0x6563,
	    0x8E56: 0x685F,
	    0x8E57: 0x71E6,
	    0x8E58: 0x73CA,
	    0x8E59: 0x7523,
	    0x8E5A: 0x7B97,
	    0x8E5B: 0x7E82,
	    0x8E5C: 0x8695,
	    0x8E5D: 0x8B83,
	    0x8E5E: 0x8CDB,
	    0x8E5F: 0x9178,
	    0x8E60: 0x9910,
	    0x8E61: 0x65AC,
	    0x8E62: 0x66AB,
	    0x8E63: 0x6B8B,
	    0x8E64: 0x4ED5,
	    0x8E65: 0x4ED4,
	    0x8E66: 0x4F3A,
	    0x8E67: 0x4F7F,
	    0x8E68: 0x523A,
	    0x8E69: 0x53F8,
	    0x8E6A: 0x53F2,
	    0x8E6B: 0x55E3,
	    0x8E6C: 0x56DB,
	    0x8E6D: 0x58EB,
	    0x8E6E: 0x59CB,
	    0x8E6F: 0x59C9,
	    0x8E70: 0x59FF,
	    0x8E71: 0x5B50,
	    0x8E72: 0x5C4D,
	    0x8E73: 0x5E02,
	    0x8E74: 0x5E2B,
	    0x8E75: 0x5FD7,
	    0x8E76: 0x601D,
	    0x8E77: 0x6307,
	    0x8E78: 0x652F,
	    0x8E79: 0x5B5C,
	    0x8E7A: 0x65AF,
	    0x8E7B: 0x65BD,
	    0x8E7C: 0x65E8,
	    0x8E7D: 0x679D,
	    0x8E7E: 0x6B62,
	    0x8E80: 0x6B7B,
	    0x8E81: 0x6C0F,
	    0x8E82: 0x7345,
	    0x8E83: 0x7949,
	    0x8E84: 0x79C1,
	    0x8E85: 0x7CF8,
	    0x8E86: 0x7D19,
	    0x8E87: 0x7D2B,
	    0x8E88: 0x80A2,
	    0x8E89: 0x8102,
	    0x8E8A: 0x81F3,
	    0x8E8B: 0x8996,
	    0x8E8C: 0x8A5E,
	    0x8E8D: 0x8A69,
	    0x8E8E: 0x8A66,
	    0x8E8F: 0x8A8C,
	    0x8E90: 0x8AEE,
	    0x8E91: 0x8CC7,
	    0x8E92: 0x8CDC,
	    0x8E93: 0x96CC,
	    0x8E94: 0x98FC,
	    0x8E95: 0x6B6F,
	    0x8E96: 0x4E8B,
	    0x8E97: 0x4F3C,
	    0x8E98: 0x4F8D,
	    0x8E99: 0x5150,
	    0x8E9A: 0x5B57,
	    0x8E9B: 0x5BFA,
	    0x8E9C: 0x6148,
	    0x8E9D: 0x6301,
	    0x8E9E: 0x6642,
	    0x8E9F: 0x6B21,
	    0x8EA0: 0x6ECB,
	    0x8EA1: 0x6CBB,
	    0x8EA2: 0x723E,
	    0x8EA3: 0x74BD,
	    0x8EA4: 0x75D4,
	    0x8EA5: 0x78C1,
	    0x8EA6: 0x793A,
	    0x8EA7: 0x800C,
	    0x8EA8: 0x8033,
	    0x8EA9: 0x81EA,
	    0x8EAA: 0x8494,
	    0x8EAB: 0x8F9E,
	    0x8EAC: 0x6C50,
	    0x8EAD: 0x9E7F,
	    0x8EAE: 0x5F0F,
	    0x8EAF: 0x8B58,
	    0x8EB0: 0x9D2B,
	    0x8EB1: 0x7AFA,
	    0x8EB2: 0x8EF8,
	    0x8EB3: 0x5B8D,
	    0x8EB4: 0x96EB,
	    0x8EB5: 0x4E03,
	    0x8EB6: 0x53F1,
	    0x8EB7: 0x57F7,
	    0x8EB8: 0x5931,
	    0x8EB9: 0x5AC9,
	    0x8EBA: 0x5BA4,
	    0x8EBB: 0x6089,
	    0x8EBC: 0x6E7F,
	    0x8EBD: 0x6F06,
	    0x8EBE: 0x75BE,
	    0x8EBF: 0x8CEA,
	    0x8EC0: 0x5B9F,
	    0x8EC1: 0x8500,
	    0x8EC2: 0x7BE0,
	    0x8EC3: 0x5072,
	    0x8EC4: 0x67F4,
	    0x8EC5: 0x829D,
	    0x8EC6: 0x5C61,
	    0x8EC7: 0x854A,
	    0x8EC8: 0x7E1E,
	    0x8EC9: 0x820E,
	    0x8ECA: 0x5199,
	    0x8ECB: 0x5C04,
	    0x8ECC: 0x6368,
	    0x8ECD: 0x8D66,
	    0x8ECE: 0x659C,
	    0x8ECF: 0x716E,
	    0x8ED0: 0x793E,
	    0x8ED1: 0x7D17,
	    0x8ED2: 0x8005,
	    0x8ED3: 0x8B1D,
	    0x8ED4: 0x8ECA,
	    0x8ED5: 0x906E,
	    0x8ED6: 0x86C7,
	    0x8ED7: 0x90AA,
	    0x8ED8: 0x501F,
	    0x8ED9: 0x52FA,
	    0x8EDA: 0x5C3A,
	    0x8EDB: 0x6753,
	    0x8EDC: 0x707C,
	    0x8EDD: 0x7235,
	    0x8EDE: 0x914C,
	    0x8EDF: 0x91C8,
	    0x8EE0: 0x932B,
	    0x8EE1: 0x82E5,
	    0x8EE2: 0x5BC2,
	    0x8EE3: 0x5F31,
	    0x8EE4: 0x60F9,
	    0x8EE5: 0x4E3B,
	    0x8EE6: 0x53D6,
	    0x8EE7: 0x5B88,
	    0x8EE8: 0x624B,
	    0x8EE9: 0x6731,
	    0x8EEA: 0x6B8A,
	    0x8EEB: 0x72E9,
	    0x8EEC: 0x73E0,
	    0x8EED: 0x7A2E,
	    0x8EEE: 0x816B,
	    0x8EEF: 0x8DA3,
	    0x8EF0: 0x9152,
	    0x8EF1: 0x9996,
	    0x8EF2: 0x5112,
	    0x8EF3: 0x53D7,
	    0x8EF4: 0x546A,
	    0x8EF5: 0x5BFF,
	    0x8EF6: 0x6388,
	    0x8EF7: 0x6A39,
	    0x8EF8: 0x7DAC,
	    0x8EF9: 0x9700,
	    0x8EFA: 0x56DA,
	    0x8EFB: 0x53CE,
	    0x8EFC: 0x5468,
	    0x8F40: 0x5B97,
	    0x8F41: 0x5C31,
	    0x8F42: 0x5DDE,
	    0x8F43: 0x4FEE,
	    0x8F44: 0x6101,
	    0x8F45: 0x62FE,
	    0x8F46: 0x6D32,
	    0x8F47: 0x79C0,
	    0x8F48: 0x79CB,
	    0x8F49: 0x7D42,
	    0x8F4A: 0x7E4D,
	    0x8F4B: 0x7FD2,
	    0x8F4C: 0x81ED,
	    0x8F4D: 0x821F,
	    0x8F4E: 0x8490,
	    0x8F4F: 0x8846,
	    0x8F50: 0x8972,
	    0x8F51: 0x8B90,
	    0x8F52: 0x8E74,
	    0x8F53: 0x8F2F,
	    0x8F54: 0x9031,
	    0x8F55: 0x914B,
	    0x8F56: 0x916C,
	    0x8F57: 0x96C6,
	    0x8F58: 0x919C,
	    0x8F59: 0x4EC0,
	    0x8F5A: 0x4F4F,
	    0x8F5B: 0x5145,
	    0x8F5C: 0x5341,
	    0x8F5D: 0x5F93,
	    0x8F5E: 0x620E,
	    0x8F5F: 0x67D4,
	    0x8F60: 0x6C41,
	    0x8F61: 0x6E0B,
	    0x8F62: 0x7363,
	    0x8F63: 0x7E26,
	    0x8F64: 0x91CD,
	    0x8F65: 0x9283,
	    0x8F66: 0x53D4,
	    0x8F67: 0x5919,
	    0x8F68: 0x5BBF,
	    0x8F69: 0x6DD1,
	    0x8F6A: 0x795D,
	    0x8F6B: 0x7E2E,
	    0x8F6C: 0x7C9B,
	    0x8F6D: 0x587E,
	    0x8F6E: 0x719F,
	    0x8F6F: 0x51FA,
	    0x8F70: 0x8853,
	    0x8F71: 0x8FF0,
	    0x8F72: 0x4FCA,
	    0x8F73: 0x5CFB,
	    0x8F74: 0x6625,
	    0x8F75: 0x77AC,
	    0x8F76: 0x7AE3,
	    0x8F77: 0x821C,
	    0x8F78: 0x99FF,
	    0x8F79: 0x51C6,
	    0x8F7A: 0x5FAA,
	    0x8F7B: 0x65EC,
	    0x8F7C: 0x696F,
	    0x8F7D: 0x6B89,
	    0x8F7E: 0x6DF3,
	    0x8F80: 0x6E96,
	    0x8F81: 0x6F64,
	    0x8F82: 0x76FE,
	    0x8F83: 0x7D14,
	    0x8F84: 0x5DE1,
	    0x8F85: 0x9075,
	    0x8F86: 0x9187,
	    0x8F87: 0x9806,
	    0x8F88: 0x51E6,
	    0x8F89: 0x521D,
	    0x8F8A: 0x6240,
	    0x8F8B: 0x6691,
	    0x8F8C: 0x66D9,
	    0x8F8D: 0x6E1A,
	    0x8F8E: 0x5EB6,
	    0x8F8F: 0x7DD2,
	    0x8F90: 0x7F72,
	    0x8F91: 0x66F8,
	    0x8F92: 0x85AF,
	    0x8F93: 0x85F7,
	    0x8F94: 0x8AF8,
	    0x8F95: 0x52A9,
	    0x8F96: 0x53D9,
	    0x8F97: 0x5973,
	    0x8F98: 0x5E8F,
	    0x8F99: 0x5F90,
	    0x8F9A: 0x6055,
	    0x8F9B: 0x92E4,
	    0x8F9C: 0x9664,
	    0x8F9D: 0x50B7,
	    0x8F9E: 0x511F,
	    0x8F9F: 0x52DD,
	    0x8FA0: 0x5320,
	    0x8FA1: 0x5347,
	    0x8FA2: 0x53EC,
	    0x8FA3: 0x54E8,
	    0x8FA4: 0x5546,
	    0x8FA5: 0x5531,
	    0x8FA6: 0x5617,
	    0x8FA7: 0x5968,
	    0x8FA8: 0x59BE,
	    0x8FA9: 0x5A3C,
	    0x8FAA: 0x5BB5,
	    0x8FAB: 0x5C06,
	    0x8FAC: 0x5C0F,
	    0x8FAD: 0x5C11,
	    0x8FAE: 0x5C1A,
	    0x8FAF: 0x5E84,
	    0x8FB0: 0x5E8A,
	    0x8FB1: 0x5EE0,
	    0x8FB2: 0x5F70,
	    0x8FB3: 0x627F,
	    0x8FB4: 0x6284,
	    0x8FB5: 0x62DB,
	    0x8FB6: 0x638C,
	    0x8FB7: 0x6377,
	    0x8FB8: 0x6607,
	    0x8FB9: 0x660C,
	    0x8FBA: 0x662D,
	    0x8FBB: 0x6676,
	    0x8FBC: 0x677E,
	    0x8FBD: 0x68A2,
	    0x8FBE: 0x6A1F,
	    0x8FBF: 0x6A35,
	    0x8FC0: 0x6CBC,
	    0x8FC1: 0x6D88,
	    0x8FC2: 0x6E09,
	    0x8FC3: 0x6E58,
	    0x8FC4: 0x713C,
	    0x8FC5: 0x7126,
	    0x8FC6: 0x7167,
	    0x8FC7: 0x75C7,
	    0x8FC8: 0x7701,
	    0x8FC9: 0x785D,
	    0x8FCA: 0x7901,
	    0x8FCB: 0x7965,
	    0x8FCC: 0x79F0,
	    0x8FCD: 0x7AE0,
	    0x8FCE: 0x7B11,
	    0x8FCF: 0x7CA7,
	    0x8FD0: 0x7D39,
	    0x8FD1: 0x8096,
	    0x8FD2: 0x83D6,
	    0x8FD3: 0x848B,
	    0x8FD4: 0x8549,
	    0x8FD5: 0x885D,
	    0x8FD6: 0x88F3,
	    0x8FD7: 0x8A1F,
	    0x8FD8: 0x8A3C,
	    0x8FD9: 0x8A54,
	    0x8FDA: 0x8A73,
	    0x8FDB: 0x8C61,
	    0x8FDC: 0x8CDE,
	    0x8FDD: 0x91A4,
	    0x8FDE: 0x9266,
	    0x8FDF: 0x937E,
	    0x8FE0: 0x9418,
	    0x8FE1: 0x969C,
	    0x8FE2: 0x9798,
	    0x8FE3: 0x4E0A,
	    0x8FE4: 0x4E08,
	    0x8FE5: 0x4E1E,
	    0x8FE6: 0x4E57,
	    0x8FE7: 0x5197,
	    0x8FE8: 0x5270,
	    0x8FE9: 0x57CE,
	    0x8FEA: 0x5834,
	    0x8FEB: 0x58CC,
	    0x8FEC: 0x5B22,
	    0x8FED: 0x5E38,
	    0x8FEE: 0x60C5,
	    0x8FEF: 0x64FE,
	    0x8FF0: 0x6761,
	    0x8FF1: 0x6756,
	    0x8FF2: 0x6D44,
	    0x8FF3: 0x72B6,
	    0x8FF4: 0x7573,
	    0x8FF5: 0x7A63,
	    0x8FF6: 0x84B8,
	    0x8FF7: 0x8B72,
	    0x8FF8: 0x91B8,
	    0x8FF9: 0x9320,
	    0x8FFA: 0x5631,
	    0x8FFB: 0x57F4,
	    0x8FFC: 0x98FE,
	    0x9040: 0x62ED,
	    0x9041: 0x690D,
	    0x9042: 0x6B96,
	    0x9043: 0x71ED,
	    0x9044: 0x7E54,
	    0x9045: 0x8077,
	    0x9046: 0x8272,
	    0x9047: 0x89E6,
	    0x9048: 0x98DF,
	    0x9049: 0x8755,
	    0x904A: 0x8FB1,
	    0x904B: 0x5C3B,
	    0x904C: 0x4F38,
	    0x904D: 0x4FE1,
	    0x904E: 0x4FB5,
	    0x904F: 0x5507,
	    0x9050: 0x5A20,
	    0x9051: 0x5BDD,
	    0x9052: 0x5BE9,
	    0x9053: 0x5FC3,
	    0x9054: 0x614E,
	    0x9055: 0x632F,
	    0x9056: 0x65B0,
	    0x9057: 0x664B,
	    0x9058: 0x68EE,
	    0x9059: 0x699B,
	    0x905A: 0x6D78,
	    0x905B: 0x6DF1,
	    0x905C: 0x7533,
	    0x905D: 0x75B9,
	    0x905E: 0x771F,
	    0x905F: 0x795E,
	    0x9060: 0x79E6,
	    0x9061: 0x7D33,
	    0x9062: 0x81E3,
	    0x9063: 0x82AF,
	    0x9064: 0x85AA,
	    0x9065: 0x89AA,
	    0x9066: 0x8A3A,
	    0x9067: 0x8EAB,
	    0x9068: 0x8F9B,
	    0x9069: 0x9032,
	    0x906A: 0x91DD,
	    0x906B: 0x9707,
	    0x906C: 0x4EBA,
	    0x906D: 0x4EC1,
	    0x906E: 0x5203,
	    0x906F: 0x5875,
	    0x9070: 0x58EC,
	    0x9071: 0x5C0B,
	    0x9072: 0x751A,
	    0x9073: 0x5C3D,
	    0x9074: 0x814E,
	    0x9075: 0x8A0A,
	    0x9076: 0x8FC5,
	    0x9077: 0x9663,
	    0x9078: 0x976D,
	    0x9079: 0x7B25,
	    0x907A: 0x8ACF,
	    0x907B: 0x9808,
	    0x907C: 0x9162,
	    0x907D: 0x56F3,
	    0x907E: 0x53A8,
	    0x9080: 0x9017,
	    0x9081: 0x5439,
	    0x9082: 0x5782,
	    0x9083: 0x5E25,
	    0x9084: 0x63A8,
	    0x9085: 0x6C34,
	    0x9086: 0x708A,
	    0x9087: 0x7761,
	    0x9088: 0x7C8B,
	    0x9089: 0x7FE0,
	    0x908A: 0x8870,
	    0x908B: 0x9042,
	    0x908C: 0x9154,
	    0x908D: 0x9310,
	    0x908E: 0x9318,
	    0x908F: 0x968F,
	    0x9090: 0x745E,
	    0x9091: 0x9AC4,
	    0x9092: 0x5D07,
	    0x9093: 0x5D69,
	    0x9094: 0x6570,
	    0x9095: 0x67A2,
	    0x9096: 0x8DA8,
	    0x9097: 0x96DB,
	    0x9098: 0x636E,
	    0x9099: 0x6749,
	    0x909A: 0x6919,
	    0x909B: 0x83C5,
	    0x909C: 0x9817,
	    0x909D: 0x96C0,
	    0x909E: 0x88FE,
	    0x909F: 0x6F84,
	    0x90A0: 0x647A,
	    0x90A1: 0x5BF8,
	    0x90A2: 0x4E16,
	    0x90A3: 0x702C,
	    0x90A4: 0x755D,
	    0x90A5: 0x662F,
	    0x90A6: 0x51C4,
	    0x90A7: 0x5236,
	    0x90A8: 0x52E2,
	    0x90A9: 0x59D3,
	    0x90AA: 0x5F81,
	    0x90AB: 0x6027,
	    0x90AC: 0x6210,
	    0x90AD: 0x653F,
	    0x90AE: 0x6574,
	    0x90AF: 0x661F,
	    0x90B0: 0x6674,
	    0x90B1: 0x68F2,
	    0x90B2: 0x6816,
	    0x90B3: 0x6B63,
	    0x90B4: 0x6E05,
	    0x90B5: 0x7272,
	    0x90B6: 0x751F,
	    0x90B7: 0x76DB,
	    0x90B8: 0x7CBE,
	    0x90B9: 0x8056,
	    0x90BA: 0x58F0,
	    0x90BB: 0x88FD,
	    0x90BC: 0x897F,
	    0x90BD: 0x8AA0,
	    0x90BE: 0x8A93,
	    0x90BF: 0x8ACB,
	    0x90C0: 0x901D,
	    0x90C1: 0x9192,
	    0x90C2: 0x9752,
	    0x90C3: 0x9759,
	    0x90C4: 0x6589,
	    0x90C5: 0x7A0E,
	    0x90C6: 0x8106,
	    0x90C7: 0x96BB,
	    0x90C8: 0x5E2D,
	    0x90C9: 0x60DC,
	    0x90CA: 0x621A,
	    0x90CB: 0x65A5,
	    0x90CC: 0x6614,
	    0x90CD: 0x6790,
	    0x90CE: 0x77F3,
	    0x90CF: 0x7A4D,
	    0x90D0: 0x7C4D,
	    0x90D1: 0x7E3E,
	    0x90D2: 0x810A,
	    0x90D3: 0x8CAC,
	    0x90D4: 0x8D64,
	    0x90D5: 0x8DE1,
	    0x90D6: 0x8E5F,
	    0x90D7: 0x78A9,
	    0x90D8: 0x5207,
	    0x90D9: 0x62D9,
	    0x90DA: 0x63A5,
	    0x90DB: 0x6442,
	    0x90DC: 0x6298,
	    0x90DD: 0x8A2D,
	    0x90DE: 0x7A83,
	    0x90DF: 0x7BC0,
	    0x90E0: 0x8AAC,
	    0x90E1: 0x96EA,
	    0x90E2: 0x7D76,
	    0x90E3: 0x820C,
	    0x90E4: 0x8749,
	    0x90E5: 0x4ED9,
	    0x90E6: 0x5148,
	    0x90E7: 0x5343,
	    0x90E8: 0x5360,
	    0x90E9: 0x5BA3,
	    0x90EA: 0x5C02,
	    0x90EB: 0x5C16,
	    0x90EC: 0x5DDD,
	    0x90ED: 0x6226,
	    0x90EE: 0x6247,
	    0x90EF: 0x64B0,
	    0x90F0: 0x6813,
	    0x90F1: 0x6834,
	    0x90F2: 0x6CC9,
	    0x90F3: 0x6D45,
	    0x90F4: 0x6D17,
	    0x90F5: 0x67D3,
	    0x90F6: 0x6F5C,
	    0x90F7: 0x714E,
	    0x90F8: 0x717D,
	    0x90F9: 0x65CB,
	    0x90FA: 0x7A7F,
	    0x90FB: 0x7BAD,
	    0x90FC: 0x7DDA,
	    0x9140: 0x7E4A,
	    0x9141: 0x7FA8,
	    0x9142: 0x817A,
	    0x9143: 0x821B,
	    0x9144: 0x8239,
	    0x9145: 0x85A6,
	    0x9146: 0x8A6E,
	    0x9147: 0x8CCE,
	    0x9148: 0x8DF5,
	    0x9149: 0x9078,
	    0x914A: 0x9077,
	    0x914B: 0x92AD,
	    0x914C: 0x9291,
	    0x914D: 0x9583,
	    0x914E: 0x9BAE,
	    0x914F: 0x524D,
	    0x9150: 0x5584,
	    0x9151: 0x6F38,
	    0x9152: 0x7136,
	    0x9153: 0x5168,
	    0x9154: 0x7985,
	    0x9155: 0x7E55,
	    0x9156: 0x81B3,
	    0x9157: 0x7CCE,
	    0x9158: 0x564C,
	    0x9159: 0x5851,
	    0x915A: 0x5CA8,
	    0x915B: 0x63AA,
	    0x915C: 0x66FE,
	    0x915D: 0x66FD,
	    0x915E: 0x695A,
	    0x915F: 0x72D9,
	    0x9160: 0x758F,
	    0x9161: 0x758E,
	    0x9162: 0x790E,
	    0x9163: 0x7956,
	    0x9164: 0x79DF,
	    0x9165: 0x7C97,
	    0x9166: 0x7D20,
	    0x9167: 0x7D44,
	    0x9168: 0x8607,
	    0x9169: 0x8A34,
	    0x916A: 0x963B,
	    0x916B: 0x9061,
	    0x916C: 0x9F20,
	    0x916D: 0x50E7,
	    0x916E: 0x5275,
	    0x916F: 0x53CC,
	    0x9170: 0x53E2,
	    0x9171: 0x5009,
	    0x9172: 0x55AA,
	    0x9173: 0x58EE,
	    0x9174: 0x594F,
	    0x9175: 0x723D,
	    0x9176: 0x5B8B,
	    0x9177: 0x5C64,
	    0x9178: 0x531D,
	    0x9179: 0x60E3,
	    0x917A: 0x60F3,
	    0x917B: 0x635C,
	    0x917C: 0x6383,
	    0x917D: 0x633F,
	    0x917E: 0x63BB,
	    0x9180: 0x64CD,
	    0x9181: 0x65E9,
	    0x9182: 0x66F9,
	    0x9183: 0x5DE3,
	    0x9184: 0x69CD,
	    0x9185: 0x69FD,
	    0x9186: 0x6F15,
	    0x9187: 0x71E5,
	    0x9188: 0x4E89,
	    0x9189: 0x75E9,
	    0x918A: 0x76F8,
	    0x918B: 0x7A93,
	    0x918C: 0x7CDF,
	    0x918D: 0x7DCF,
	    0x918E: 0x7D9C,
	    0x918F: 0x8061,
	    0x9190: 0x8349,
	    0x9191: 0x8358,
	    0x9192: 0x846C,
	    0x9193: 0x84BC,
	    0x9194: 0x85FB,
	    0x9195: 0x88C5,
	    0x9196: 0x8D70,
	    0x9197: 0x9001,
	    0x9198: 0x906D,
	    0x9199: 0x9397,
	    0x919A: 0x971C,
	    0x919B: 0x9A12,
	    0x919C: 0x50CF,
	    0x919D: 0x5897,
	    0x919E: 0x618E,
	    0x919F: 0x81D3,
	    0x91A0: 0x8535,
	    0x91A1: 0x8D08,
	    0x91A2: 0x9020,
	    0x91A3: 0x4FC3,
	    0x91A4: 0x5074,
	    0x91A5: 0x5247,
	    0x91A6: 0x5373,
	    0x91A7: 0x606F,
	    0x91A8: 0x6349,
	    0x91A9: 0x675F,
	    0x91AA: 0x6E2C,
	    0x91AB: 0x8DB3,
	    0x91AC: 0x901F,
	    0x91AD: 0x4FD7,
	    0x91AE: 0x5C5E,
	    0x91AF: 0x8CCA,
	    0x91B0: 0x65CF,
	    0x91B1: 0x7D9A,
	    0x91B2: 0x5352,
	    0x91B3: 0x8896,
	    0x91B4: 0x5176,
	    0x91B5: 0x63C3,
	    0x91B6: 0x5B58,
	    0x91B7: 0x5B6B,
	    0x91B8: 0x5C0A,
	    0x91B9: 0x640D,
	    0x91BA: 0x6751,
	    0x91BB: 0x905C,
	    0x91BC: 0x4ED6,
	    0x91BD: 0x591A,
	    0x91BE: 0x592A,
	    0x91BF: 0x6C70,
	    0x91C0: 0x8A51,
	    0x91C1: 0x553E,
	    0x91C2: 0x5815,
	    0x91C3: 0x59A5,
	    0x91C4: 0x60F0,
	    0x91C5: 0x6253,
	    0x91C6: 0x67C1,
	    0x91C7: 0x8235,
	    0x91C8: 0x6955,
	    0x91C9: 0x9640,
	    0x91CA: 0x99C4,
	    0x91CB: 0x9A28,
	    0x91CC: 0x4F53,
	    0x91CD: 0x5806,
	    0x91CE: 0x5BFE,
	    0x91CF: 0x8010,
	    0x91D0: 0x5CB1,
	    0x91D1: 0x5E2F,
	    0x91D2: 0x5F85,
	    0x91D3: 0x6020,
	    0x91D4: 0x614B,
	    0x91D5: 0x6234,
	    0x91D6: 0x66FF,
	    0x91D7: 0x6CF0,
	    0x91D8: 0x6EDE,
	    0x91D9: 0x80CE,
	    0x91DA: 0x817F,
	    0x91DB: 0x82D4,
	    0x91DC: 0x888B,
	    0x91DD: 0x8CB8,
	    0x91DE: 0x9000,
	    0x91DF: 0x902E,
	    0x91E0: 0x968A,
	    0x91E1: 0x9EDB,
	    0x91E2: 0x9BDB,
	    0x91E3: 0x4EE3,
	    0x91E4: 0x53F0,
	    0x91E5: 0x5927,
	    0x91E6: 0x7B2C,
	    0x91E7: 0x918D,
	    0x91E8: 0x984C,
	    0x91E9: 0x9DF9,
	    0x91EA: 0x6EDD,
	    0x91EB: 0x7027,
	    0x91EC: 0x5353,
	    0x91ED: 0x5544,
	    0x91EE: 0x5B85,
	    0x91EF: 0x6258,
	    0x91F0: 0x629E,
	    0x91F1: 0x62D3,
	    0x91F2: 0x6CA2,
	    0x91F3: 0x6FEF,
	    0x91F4: 0x7422,
	    0x91F5: 0x8A17,
	    0x91F6: 0x9438,
	    0x91F7: 0x6FC1,
	    0x91F8: 0x8AFE,
	    0x91F9: 0x8338,
	    0x91FA: 0x51E7,
	    0x91FB: 0x86F8,
	    0x91FC: 0x53EA,
	    0x9240: 0x53E9,
	    0x9241: 0x4F46,
	    0x9242: 0x9054,
	    0x9243: 0x8FB0,
	    0x9244: 0x596A,
	    0x9245: 0x8131,
	    0x9246: 0x5DFD,
	    0x9247: 0x7AEA,
	    0x9248: 0x8FBF,
	    0x9249: 0x68DA,
	    0x924A: 0x8C37,
	    0x924B: 0x72F8,
	    0x924C: 0x9C48,
	    0x924D: 0x6A3D,
	    0x924E: 0x8AB0,
	    0x924F: 0x4E39,
	    0x9250: 0x5358,
	    0x9251: 0x5606,
	    0x9252: 0x5766,
	    0x9253: 0x62C5,
	    0x9254: 0x63A2,
	    0x9255: 0x65E6,
	    0x9256: 0x6B4E,
	    0x9257: 0x6DE1,
	    0x9258: 0x6E5B,
	    0x9259: 0x70AD,
	    0x925A: 0x77ED,
	    0x925B: 0x7AEF,
	    0x925C: 0x7BAA,
	    0x925D: 0x7DBB,
	    0x925E: 0x803D,
	    0x925F: 0x80C6,
	    0x9260: 0x86CB,
	    0x9261: 0x8A95,
	    0x9262: 0x935B,
	    0x9263: 0x56E3,
	    0x9264: 0x58C7,
	    0x9265: 0x5F3E,
	    0x9266: 0x65AD,
	    0x9267: 0x6696,
	    0x9268: 0x6A80,
	    0x9269: 0x6BB5,
	    0x926A: 0x7537,
	    0x926B: 0x8AC7,
	    0x926C: 0x5024,
	    0x926D: 0x77E5,
	    0x926E: 0x5730,
	    0x926F: 0x5F1B,
	    0x9270: 0x6065,
	    0x9271: 0x667A,
	    0x9272: 0x6C60,
	    0x9273: 0x75F4,
	    0x9274: 0x7A1A,
	    0x9275: 0x7F6E,
	    0x9276: 0x81F4,
	    0x9277: 0x8718,
	    0x9278: 0x9045,
	    0x9279: 0x99B3,
	    0x927A: 0x7BC9,
	    0x927B: 0x755C,
	    0x927C: 0x7AF9,
	    0x927D: 0x7B51,
	    0x927E: 0x84C4,
	    0x9280: 0x9010,
	    0x9281: 0x79E9,
	    0x9282: 0x7A92,
	    0x9283: 0x8336,
	    0x9284: 0x5AE1,
	    0x9285: 0x7740,
	    0x9286: 0x4E2D,
	    0x9287: 0x4EF2,
	    0x9288: 0x5B99,
	    0x9289: 0x5FE0,
	    0x928A: 0x62BD,
	    0x928B: 0x663C,
	    0x928C: 0x67F1,
	    0x928D: 0x6CE8,
	    0x928E: 0x866B,
	    0x928F: 0x8877,
	    0x9290: 0x8A3B,
	    0x9291: 0x914E,
	    0x9292: 0x92F3,
	    0x9293: 0x99D0,
	    0x9294: 0x6A17,
	    0x9295: 0x7026,
	    0x9296: 0x732A,
	    0x9297: 0x82E7,
	    0x9298: 0x8457,
	    0x9299: 0x8CAF,
	    0x929A: 0x4E01,
	    0x929B: 0x5146,
	    0x929C: 0x51CB,
	    0x929D: 0x558B,
	    0x929E: 0x5BF5,
	    0x929F: 0x5E16,
	    0x92A0: 0x5E33,
	    0x92A1: 0x5E81,
	    0x92A2: 0x5F14,
	    0x92A3: 0x5F35,
	    0x92A4: 0x5F6B,
	    0x92A5: 0x5FB4,
	    0x92A6: 0x61F2,
	    0x92A7: 0x6311,
	    0x92A8: 0x66A2,
	    0x92A9: 0x671D,
	    0x92AA: 0x6F6E,
	    0x92AB: 0x7252,
	    0x92AC: 0x753A,
	    0x92AD: 0x773A,
	    0x92AE: 0x8074,
	    0x92AF: 0x8139,
	    0x92B0: 0x8178,
	    0x92B1: 0x8776,
	    0x92B2: 0x8ABF,
	    0x92B3: 0x8ADC,
	    0x92B4: 0x8D85,
	    0x92B5: 0x8DF3,
	    0x92B6: 0x929A,
	    0x92B7: 0x9577,
	    0x92B8: 0x9802,
	    0x92B9: 0x9CE5,
	    0x92BA: 0x52C5,
	    0x92BB: 0x6357,
	    0x92BC: 0x76F4,
	    0x92BD: 0x6715,
	    0x92BE: 0x6C88,
	    0x92BF: 0x73CD,
	    0x92C0: 0x8CC3,
	    0x92C1: 0x93AE,
	    0x92C2: 0x9673,
	    0x92C3: 0x6D25,
	    0x92C4: 0x589C,
	    0x92C5: 0x690E,
	    0x92C6: 0x69CC,
	    0x92C7: 0x8FFD,
	    0x92C8: 0x939A,
	    0x92C9: 0x75DB,
	    0x92CA: 0x901A,
	    0x92CB: 0x585A,
	    0x92CC: 0x6802,
	    0x92CD: 0x63B4,
	    0x92CE: 0x69FB,
	    0x92CF: 0x4F43,
	    0x92D0: 0x6F2C,
	    0x92D1: 0x67D8,
	    0x92D2: 0x8FBB,
	    0x92D3: 0x8526,
	    0x92D4: 0x7DB4,
	    0x92D5: 0x9354,
	    0x92D6: 0x693F,
	    0x92D7: 0x6F70,
	    0x92D8: 0x576A,
	    0x92D9: 0x58F7,
	    0x92DA: 0x5B2C,
	    0x92DB: 0x7D2C,
	    0x92DC: 0x722A,
	    0x92DD: 0x540A,
	    0x92DE: 0x91E3,
	    0x92DF: 0x9DB4,
	    0x92E0: 0x4EAD,
	    0x92E1: 0x4F4E,
	    0x92E2: 0x505C,
	    0x92E3: 0x5075,
	    0x92E4: 0x5243,
	    0x92E5: 0x8C9E,
	    0x92E6: 0x5448,
	    0x92E7: 0x5824,
	    0x92E8: 0x5B9A,
	    0x92E9: 0x5E1D,
	    0x92EA: 0x5E95,
	    0x92EB: 0x5EAD,
	    0x92EC: 0x5EF7,
	    0x92ED: 0x5F1F,
	    0x92EE: 0x608C,
	    0x92EF: 0x62B5,
	    0x92F0: 0x633A,
	    0x92F1: 0x63D0,
	    0x92F2: 0x68AF,
	    0x92F3: 0x6C40,
	    0x92F4: 0x7887,
	    0x92F5: 0x798E,
	    0x92F6: 0x7A0B,
	    0x92F7: 0x7DE0,
	    0x92F8: 0x8247,
	    0x92F9: 0x8A02,
	    0x92FA: 0x8AE6,
	    0x92FB: 0x8E44,
	    0x92FC: 0x9013,
	    0x9340: 0x90B8,
	    0x9341: 0x912D,
	    0x9342: 0x91D8,
	    0x9343: 0x9F0E,
	    0x9344: 0x6CE5,
	    0x9345: 0x6458,
	    0x9346: 0x64E2,
	    0x9347: 0x6575,
	    0x9348: 0x6EF4,
	    0x9349: 0x7684,
	    0x934A: 0x7B1B,
	    0x934B: 0x9069,
	    0x934C: 0x93D1,
	    0x934D: 0x6EBA,
	    0x934E: 0x54F2,
	    0x934F: 0x5FB9,
	    0x9350: 0x64A4,
	    0x9351: 0x8F4D,
	    0x9352: 0x8FED,
	    0x9353: 0x9244,
	    0x9354: 0x5178,
	    0x9355: 0x586B,
	    0x9356: 0x5929,
	    0x9357: 0x5C55,
	    0x9358: 0x5E97,
	    0x9359: 0x6DFB,
	    0x935A: 0x7E8F,
	    0x935B: 0x751C,
	    0x935C: 0x8CBC,
	    0x935D: 0x8EE2,
	    0x935E: 0x985B,
	    0x935F: 0x70B9,
	    0x9360: 0x4F1D,
	    0x9361: 0x6BBF,
	    0x9362: 0x6FB1,
	    0x9363: 0x7530,
	    0x9364: 0x96FB,
	    0x9365: 0x514E,
	    0x9366: 0x5410,
	    0x9367: 0x5835,
	    0x9368: 0x5857,
	    0x9369: 0x59AC,
	    0x936A: 0x5C60,
	    0x936B: 0x5F92,
	    0x936C: 0x6597,
	    0x936D: 0x675C,
	    0x936E: 0x6E21,
	    0x936F: 0x767B,
	    0x9370: 0x83DF,
	    0x9371: 0x8CED,
	    0x9372: 0x9014,
	    0x9373: 0x90FD,
	    0x9374: 0x934D,
	    0x9375: 0x7825,
	    0x9376: 0x783A,
	    0x9377: 0x52AA,
	    0x9378: 0x5EA6,
	    0x9379: 0x571F,
	    0x937A: 0x5974,
	    0x937B: 0x6012,
	    0x937C: 0x5012,
	    0x937D: 0x515A,
	    0x937E: 0x51AC,
	    0x9380: 0x51CD,
	    0x9381: 0x5200,
	    0x9382: 0x5510,
	    0x9383: 0x5854,
	    0x9384: 0x5858,
	    0x9385: 0x5957,
	    0x9386: 0x5B95,
	    0x9387: 0x5CF6,
	    0x9388: 0x5D8B,
	    0x9389: 0x60BC,
	    0x938A: 0x6295,
	    0x938B: 0x642D,
	    0x938C: 0x6771,
	    0x938D: 0x6843,
	    0x938E: 0x68BC,
	    0x938F: 0x68DF,
	    0x9390: 0x76D7,
	    0x9391: 0x6DD8,
	    0x9392: 0x6E6F,
	    0x9393: 0x6D9B,
	    0x9394: 0x706F,
	    0x9395: 0x71C8,
	    0x9396: 0x5F53,
	    0x9397: 0x75D8,
	    0x9398: 0x7977,
	    0x9399: 0x7B49,
	    0x939A: 0x7B54,
	    0x939B: 0x7B52,
	    0x939C: 0x7CD6,
	    0x939D: 0x7D71,
	    0x939E: 0x5230,
	    0x939F: 0x8463,
	    0x93A0: 0x8569,
	    0x93A1: 0x85E4,
	    0x93A2: 0x8A0E,
	    0x93A3: 0x8B04,
	    0x93A4: 0x8C46,
	    0x93A5: 0x8E0F,
	    0x93A6: 0x9003,
	    0x93A7: 0x900F,
	    0x93A8: 0x9419,
	    0x93A9: 0x9676,
	    0x93AA: 0x982D,
	    0x93AB: 0x9A30,
	    0x93AC: 0x95D8,
	    0x93AD: 0x50CD,
	    0x93AE: 0x52D5,
	    0x93AF: 0x540C,
	    0x93B0: 0x5802,
	    0x93B1: 0x5C0E,
	    0x93B2: 0x61A7,
	    0x93B3: 0x649E,
	    0x93B4: 0x6D1E,
	    0x93B5: 0x77B3,
	    0x93B6: 0x7AE5,
	    0x93B7: 0x80F4,
	    0x93B8: 0x8404,
	    0x93B9: 0x9053,
	    0x93BA: 0x9285,
	    0x93BB: 0x5CE0,
	    0x93BC: 0x9D07,
	    0x93BD: 0x533F,
	    0x93BE: 0x5F97,
	    0x93BF: 0x5FB3,
	    0x93C0: 0x6D9C,
	    0x93C1: 0x7279,
	    0x93C2: 0x7763,
	    0x93C3: 0x79BF,
	    0x93C4: 0x7BE4,
	    0x93C5: 0x6BD2,
	    0x93C6: 0x72EC,
	    0x93C7: 0x8AAD,
	    0x93C8: 0x6803,
	    0x93C9: 0x6A61,
	    0x93CA: 0x51F8,
	    0x93CB: 0x7A81,
	    0x93CC: 0x6934,
	    0x93CD: 0x5C4A,
	    0x93CE: 0x9CF6,
	    0x93CF: 0x82EB,
	    0x93D0: 0x5BC5,
	    0x93D1: 0x9149,
	    0x93D2: 0x701E,
	    0x93D3: 0x5678,
	    0x93D4: 0x5C6F,
	    0x93D5: 0x60C7,
	    0x93D6: 0x6566,
	    0x93D7: 0x6C8C,
	    0x93D8: 0x8C5A,
	    0x93D9: 0x9041,
	    0x93DA: 0x9813,
	    0x93DB: 0x5451,
	    0x93DC: 0x66C7,
	    0x93DD: 0x920D,
	    0x93DE: 0x5948,
	    0x93DF: 0x90A3,
	    0x93E0: 0x5185,
	    0x93E1: 0x4E4D,
	    0x93E2: 0x51EA,
	    0x93E3: 0x8599,
	    0x93E4: 0x8B0E,
	    0x93E5: 0x7058,
	    0x93E6: 0x637A,
	    0x93E7: 0x934B,
	    0x93E8: 0x6962,
	    0x93E9: 0x99B4,
	    0x93EA: 0x7E04,
	    0x93EB: 0x7577,
	    0x93EC: 0x5357,
	    0x93ED: 0x6960,
	    0x93EE: 0x8EDF,
	    0x93EF: 0x96E3,
	    0x93F0: 0x6C5D,
	    0x93F1: 0x4E8C,
	    0x93F2: 0x5C3C,
	    0x93F3: 0x5F10,
	    0x93F4: 0x8FE9,
	    0x93F5: 0x5302,
	    0x93F6: 0x8CD1,
	    0x93F7: 0x8089,
	    0x93F8: 0x8679,
	    0x93F9: 0x5EFF,
	    0x93FA: 0x65E5,
	    0x93FB: 0x4E73,
	    0x93FC: 0x5165,
	    0x9440: 0x5982,
	    0x9441: 0x5C3F,
	    0x9442: 0x97EE,
	    0x9443: 0x4EFB,
	    0x9444: 0x598A,
	    0x9445: 0x5FCD,
	    0x9446: 0x8A8D,
	    0x9447: 0x6FE1,
	    0x9448: 0x79B0,
	    0x9449: 0x7962,
	    0x944A: 0x5BE7,
	    0x944B: 0x8471,
	    0x944C: 0x732B,
	    0x944D: 0x71B1,
	    0x944E: 0x5E74,
	    0x944F: 0x5FF5,
	    0x9450: 0x637B,
	    0x9451: 0x649A,
	    0x9452: 0x71C3,
	    0x9453: 0x7C98,
	    0x9454: 0x4E43,
	    0x9455: 0x5EFC,
	    0x9456: 0x4E4B,
	    0x9457: 0x57DC,
	    0x9458: 0x56A2,
	    0x9459: 0x60A9,
	    0x945A: 0x6FC3,
	    0x945B: 0x7D0D,
	    0x945C: 0x80FD,
	    0x945D: 0x8133,
	    0x945E: 0x81BF,
	    0x945F: 0x8FB2,
	    0x9460: 0x8997,
	    0x9461: 0x86A4,
	    0x9462: 0x5DF4,
	    0x9463: 0x628A,
	    0x9464: 0x64AD,
	    0x9465: 0x8987,
	    0x9466: 0x6777,
	    0x9467: 0x6CE2,
	    0x9468: 0x6D3E,
	    0x9469: 0x7436,
	    0x946A: 0x7834,
	    0x946B: 0x5A46,
	    0x946C: 0x7F75,
	    0x946D: 0x82AD,
	    0x946E: 0x99AC,
	    0x946F: 0x4FF3,
	    0x9470: 0x5EC3,
	    0x9471: 0x62DD,
	    0x9472: 0x6392,
	    0x9473: 0x6557,
	    0x9474: 0x676F,
	    0x9475: 0x76C3,
	    0x9476: 0x724C,
	    0x9477: 0x80CC,
	    0x9478: 0x80BA,
	    0x9479: 0x8F29,
	    0x947A: 0x914D,
	    0x947B: 0x500D,
	    0x947C: 0x57F9,
	    0x947D: 0x5A92,
	    0x947E: 0x6885,
	    0x9480: 0x6973,
	    0x9481: 0x7164,
	    0x9482: 0x72FD,
	    0x9483: 0x8CB7,
	    0x9484: 0x58F2,
	    0x9485: 0x8CE0,
	    0x9486: 0x966A,
	    0x9487: 0x9019,
	    0x9488: 0x877F,
	    0x9489: 0x79E4,
	    0x948A: 0x77E7,
	    0x948B: 0x8429,
	    0x948C: 0x4F2F,
	    0x948D: 0x5265,
	    0x948E: 0x535A,
	    0x948F: 0x62CD,
	    0x9490: 0x67CF,
	    0x9491: 0x6CCA,
	    0x9492: 0x767D,
	    0x9493: 0x7B94,
	    0x9494: 0x7C95,
	    0x9495: 0x8236,
	    0x9496: 0x8584,
	    0x9497: 0x8FEB,
	    0x9498: 0x66DD,
	    0x9499: 0x6F20,
	    0x949A: 0x7206,
	    0x949B: 0x7E1B,
	    0x949C: 0x83AB,
	    0x949D: 0x99C1,
	    0x949E: 0x9EA6,
	    0x949F: 0x51FD,
	    0x94A0: 0x7BB1,
	    0x94A1: 0x7872,
	    0x94A2: 0x7BB8,
	    0x94A3: 0x8087,
	    0x94A4: 0x7B48,
	    0x94A5: 0x6AE8,
	    0x94A6: 0x5E61,
	    0x94A7: 0x808C,
	    0x94A8: 0x7551,
	    0x94A9: 0x7560,
	    0x94AA: 0x516B,
	    0x94AB: 0x9262,
	    0x94AC: 0x6E8C,
	    0x94AD: 0x767A,
	    0x94AE: 0x9197,
	    0x94AF: 0x9AEA,
	    0x94B0: 0x4F10,
	    0x94B1: 0x7F70,
	    0x94B2: 0x629C,
	    0x94B3: 0x7B4F,
	    0x94B4: 0x95A5,
	    0x94B5: 0x9CE9,
	    0x94B6: 0x567A,
	    0x94B7: 0x5859,
	    0x94B8: 0x86E4,
	    0x94B9: 0x96BC,
	    0x94BA: 0x4F34,
	    0x94BB: 0x5224,
	    0x94BC: 0x534A,
	    0x94BD: 0x53CD,
	    0x94BE: 0x53DB,
	    0x94BF: 0x5E06,
	    0x94C0: 0x642C,
	    0x94C1: 0x6591,
	    0x94C2: 0x677F,
	    0x94C3: 0x6C3E,
	    0x94C4: 0x6C4E,
	    0x94C5: 0x7248,
	    0x94C6: 0x72AF,
	    0x94C7: 0x73ED,
	    0x94C8: 0x7554,
	    0x94C9: 0x7E41,
	    0x94CA: 0x822C,
	    0x94CB: 0x85E9,
	    0x94CC: 0x8CA9,
	    0x94CD: 0x7BC4,
	    0x94CE: 0x91C6,
	    0x94CF: 0x7169,
	    0x94D0: 0x9812,
	    0x94D1: 0x98EF,
	    0x94D2: 0x633D,
	    0x94D3: 0x6669,
	    0x94D4: 0x756A,
	    0x94D5: 0x76E4,
	    0x94D6: 0x78D0,
	    0x94D7: 0x8543,
	    0x94D8: 0x86EE,
	    0x94D9: 0x532A,
	    0x94DA: 0x5351,
	    0x94DB: 0x5426,
	    0x94DC: 0x5983,
	    0x94DD: 0x5E87,
	    0x94DE: 0x5F7C,
	    0x94DF: 0x60B2,
	    0x94E0: 0x6249,
	    0x94E1: 0x6279,
	    0x94E2: 0x62AB,
	    0x94E3: 0x6590,
	    0x94E4: 0x6BD4,
	    0x94E5: 0x6CCC,
	    0x94E6: 0x75B2,
	    0x94E7: 0x76AE,
	    0x94E8: 0x7891,
	    0x94E9: 0x79D8,
	    0x94EA: 0x7DCB,
	    0x94EB: 0x7F77,
	    0x94EC: 0x80A5,
	    0x94ED: 0x88AB,
	    0x94EE: 0x8AB9,
	    0x94EF: 0x8CBB,
	    0x94F0: 0x907F,
	    0x94F1: 0x975E,
	    0x94F2: 0x98DB,
	    0x94F3: 0x6A0B,
	    0x94F4: 0x7C38,
	    0x94F5: 0x5099,
	    0x94F6: 0x5C3E,
	    0x94F7: 0x5FAE,
	    0x94F8: 0x6787,
	    0x94F9: 0x6BD8,
	    0x94FA: 0x7435,
	    0x94FB: 0x7709,
	    0x94FC: 0x7F8E,
	    0x9540: 0x9F3B,
	    0x9541: 0x67CA,
	    0x9542: 0x7A17,
	    0x9543: 0x5339,
	    0x9544: 0x758B,
	    0x9545: 0x9AED,
	    0x9546: 0x5F66,
	    0x9547: 0x819D,
	    0x9548: 0x83F1,
	    0x9549: 0x8098,
	    0x954A: 0x5F3C,
	    0x954B: 0x5FC5,
	    0x954C: 0x7562,
	    0x954D: 0x7B46,
	    0x954E: 0x903C,
	    0x954F: 0x6867,
	    0x9550: 0x59EB,
	    0x9551: 0x5A9B,
	    0x9552: 0x7D10,
	    0x9553: 0x767E,
	    0x9554: 0x8B2C,
	    0x9555: 0x4FF5,
	    0x9556: 0x5F6A,
	    0x9557: 0x6A19,
	    0x9558: 0x6C37,
	    0x9559: 0x6F02,
	    0x955A: 0x74E2,
	    0x955B: 0x7968,
	    0x955C: 0x8868,
	    0x955D: 0x8A55,
	    0x955E: 0x8C79,
	    0x955F: 0x5EDF,
	    0x9560: 0x63CF,
	    0x9561: 0x75C5,
	    0x9562: 0x79D2,
	    0x9563: 0x82D7,
	    0x9564: 0x9328,
	    0x9565: 0x92F2,
	    0x9566: 0x849C,
	    0x9567: 0x86ED,
	    0x9568: 0x9C2D,
	    0x9569: 0x54C1,
	    0x956A: 0x5F6C,
	    0x956B: 0x658C,
	    0x956C: 0x6D5C,
	    0x956D: 0x7015,
	    0x956E: 0x8CA7,
	    0x956F: 0x8CD3,
	    0x9570: 0x983B,
	    0x9571: 0x654F,
	    0x9572: 0x74F6,
	    0x9573: 0x4E0D,
	    0x9574: 0x4ED8,
	    0x9575: 0x57E0,
	    0x9576: 0x592B,
	    0x9577: 0x5A66,
	    0x9578: 0x5BCC,
	    0x9579: 0x51A8,
	    0x957A: 0x5E03,
	    0x957B: 0x5E9C,
	    0x957C: 0x6016,
	    0x957D: 0x6276,
	    0x957E: 0x6577,
	    0x9580: 0x65A7,
	    0x9581: 0x666E,
	    0x9582: 0x6D6E,
	    0x9583: 0x7236,
	    0x9584: 0x7B26,
	    0x9585: 0x8150,
	    0x9586: 0x819A,
	    0x9587: 0x8299,
	    0x9588: 0x8B5C,
	    0x9589: 0x8CA0,
	    0x958A: 0x8CE6,
	    0x958B: 0x8D74,
	    0x958C: 0x961C,
	    0x958D: 0x9644,
	    0x958E: 0x4FAE,
	    0x958F: 0x64AB,
	    0x9590: 0x6B66,
	    0x9591: 0x821E,
	    0x9592: 0x8461,
	    0x9593: 0x856A,
	    0x9594: 0x90E8,
	    0x9595: 0x5C01,
	    0x9596: 0x6953,
	    0x9597: 0x98A8,
	    0x9598: 0x847A,
	    0x9599: 0x8557,
	    0x959A: 0x4F0F,
	    0x959B: 0x526F,
	    0x959C: 0x5FA9,
	    0x959D: 0x5E45,
	    0x959E: 0x670D,
	    0x959F: 0x798F,
	    0x95A0: 0x8179,
	    0x95A1: 0x8907,
	    0x95A2: 0x8986,
	    0x95A3: 0x6DF5,
	    0x95A4: 0x5F17,
	    0x95A5: 0x6255,
	    0x95A6: 0x6CB8,
	    0x95A7: 0x4ECF,
	    0x95A8: 0x7269,
	    0x95A9: 0x9B92,
	    0x95AA: 0x5206,
	    0x95AB: 0x543B,
	    0x95AC: 0x5674,
	    0x95AD: 0x58B3,
	    0x95AE: 0x61A4,
	    0x95AF: 0x626E,
	    0x95B0: 0x711A,
	    0x95B1: 0x596E,
	    0x95B2: 0x7C89,
	    0x95B3: 0x7CDE,
	    0x95B4: 0x7D1B,
	    0x95B5: 0x96F0,
	    0x95B6: 0x6587,
	    0x95B7: 0x805E,
	    0x95B8: 0x4E19,
	    0x95B9: 0x4F75,
	    0x95BA: 0x5175,
	    0x95BB: 0x5840,
	    0x95BC: 0x5E63,
	    0x95BD: 0x5E73,
	    0x95BE: 0x5F0A,
	    0x95BF: 0x67C4,
	    0x95C0: 0x4E26,
	    0x95C1: 0x853D,
	    0x95C2: 0x9589,
	    0x95C3: 0x965B,
	    0x95C4: 0x7C73,
	    0x95C5: 0x9801,
	    0x95C6: 0x50FB,
	    0x95C7: 0x58C1,
	    0x95C8: 0x7656,
	    0x95C9: 0x78A7,
	    0x95CA: 0x5225,
	    0x95CB: 0x77A5,
	    0x95CC: 0x8511,
	    0x95CD: 0x7B86,
	    0x95CE: 0x504F,
	    0x95CF: 0x5909,
	    0x95D0: 0x7247,
	    0x95D1: 0x7BC7,
	    0x95D2: 0x7DE8,
	    0x95D3: 0x8FBA,
	    0x95D4: 0x8FD4,
	    0x95D5: 0x904D,
	    0x95D6: 0x4FBF,
	    0x95D7: 0x52C9,
	    0x95D8: 0x5A29,
	    0x95D9: 0x5F01,
	    0x95DA: 0x97AD,
	    0x95DB: 0x4FDD,
	    0x95DC: 0x8217,
	    0x95DD: 0x92EA,
	    0x95DE: 0x5703,
	    0x95DF: 0x6355,
	    0x95E0: 0x6B69,
	    0x95E1: 0x752B,
	    0x95E2: 0x88DC,
	    0x95E3: 0x8F14,
	    0x95E4: 0x7A42,
	    0x95E5: 0x52DF,
	    0x95E6: 0x5893,
	    0x95E7: 0x6155,
	    0x95E8: 0x620A,
	    0x95E9: 0x66AE,
	    0x95EA: 0x6BCD,
	    0x95EB: 0x7C3F,
	    0x95EC: 0x83E9,
	    0x95ED: 0x5023,
	    0x95EE: 0x4FF8,
	    0x95EF: 0x5305,
	    0x95F0: 0x5446,
	    0x95F1: 0x5831,
	    0x95F2: 0x5949,
	    0x95F3: 0x5B9D,
	    0x95F4: 0x5CF0,
	    0x95F5: 0x5CEF,
	    0x95F6: 0x5D29,
	    0x95F7: 0x5E96,
	    0x95F8: 0x62B1,
	    0x95F9: 0x6367,
	    0x95FA: 0x653E,
	    0x95FB: 0x65B9,
	    0x95FC: 0x670B,
	    0x9640: 0x6CD5,
	    0x9641: 0x6CE1,
	    0x9642: 0x70F9,
	    0x9643: 0x7832,
	    0x9644: 0x7E2B,
	    0x9645: 0x80DE,
	    0x9646: 0x82B3,
	    0x9647: 0x840C,
	    0x9648: 0x84EC,
	    0x9649: 0x8702,
	    0x964A: 0x8912,
	    0x964B: 0x8A2A,
	    0x964C: 0x8C4A,
	    0x964D: 0x90A6,
	    0x964E: 0x92D2,
	    0x964F: 0x98FD,
	    0x9650: 0x9CF3,
	    0x9651: 0x9D6C,
	    0x9652: 0x4E4F,
	    0x9653: 0x4EA1,
	    0x9654: 0x508D,
	    0x9655: 0x5256,
	    0x9656: 0x574A,
	    0x9657: 0x59A8,
	    0x9658: 0x5E3D,
	    0x9659: 0x5FD8,
	    0x965A: 0x5FD9,
	    0x965B: 0x623F,
	    0x965C: 0x66B4,
	    0x965D: 0x671B,
	    0x965E: 0x67D0,
	    0x965F: 0x68D2,
	    0x9660: 0x5192,
	    0x9661: 0x7D21,
	    0x9662: 0x80AA,
	    0x9663: 0x81A8,
	    0x9664: 0x8B00,
	    0x9665: 0x8C8C,
	    0x9666: 0x8CBF,
	    0x9667: 0x927E,
	    0x9668: 0x9632,
	    0x9669: 0x5420,
	    0x966A: 0x982C,
	    0x966B: 0x5317,
	    0x966C: 0x50D5,
	    0x966D: 0x535C,
	    0x966E: 0x58A8,
	    0x966F: 0x64B2,
	    0x9670: 0x6734,
	    0x9671: 0x7267,
	    0x9672: 0x7766,
	    0x9673: 0x7A46,
	    0x9674: 0x91E6,
	    0x9675: 0x52C3,
	    0x9676: 0x6CA1,
	    0x9677: 0x6B86,
	    0x9678: 0x5800,
	    0x9679: 0x5E4C,
	    0x967A: 0x5954,
	    0x967B: 0x672C,
	    0x967C: 0x7FFB,
	    0x967D: 0x51E1,
	    0x967E: 0x76C6,
	    0x9680: 0x6469,
	    0x9681: 0x78E8,
	    0x9682: 0x9B54,
	    0x9683: 0x9EBB,
	    0x9684: 0x57CB,
	    0x9685: 0x59B9,
	    0x9686: 0x6627,
	    0x9687: 0x679A,
	    0x9688: 0x6BCE,
	    0x9689: 0x54E9,
	    0x968A: 0x69D9,
	    0x968B: 0x5E55,
	    0x968C: 0x819C,
	    0x968D: 0x6795,
	    0x968E: 0x9BAA,
	    0x968F: 0x67FE,
	    0x9690: 0x9C52,
	    0x9691: 0x685D,
	    0x9692: 0x4EA6,
	    0x9693: 0x4FE3,
	    0x9694: 0x53C8,
	    0x9695: 0x62B9,
	    0x9696: 0x672B,
	    0x9697: 0x6CAB,
	    0x9698: 0x8FC4,
	    0x9699: 0x4FAD,
	    0x969A: 0x7E6D,
	    0x969B: 0x9EBF,
	    0x969C: 0x4E07,
	    0x969D: 0x6162,
	    0x969E: 0x6E80,
	    0x969F: 0x6F2B,
	    0x96A0: 0x8513,
	    0x96A1: 0x5473,
	    0x96A2: 0x672A,
	    0x96A3: 0x9B45,
	    0x96A4: 0x5DF3,
	    0x96A5: 0x7B95,
	    0x96A6: 0x5CAC,
	    0x96A7: 0x5BC6,
	    0x96A8: 0x871C,
	    0x96A9: 0x6E4A,
	    0x96AA: 0x84D1,
	    0x96AB: 0x7A14,
	    0x96AC: 0x8108,
	    0x96AD: 0x5999,
	    0x96AE: 0x7C8D,
	    0x96AF: 0x6C11,
	    0x96B0: 0x7720,
	    0x96B1: 0x52D9,
	    0x96B2: 0x5922,
	    0x96B3: 0x7121,
	    0x96B4: 0x725F,
	    0x96B5: 0x77DB,
	    0x96B6: 0x9727,
	    0x96B7: 0x9D61,
	    0x96B8: 0x690B,
	    0x96B9: 0x5A7F,
	    0x96BA: 0x5A18,
	    0x96BB: 0x51A5,
	    0x96BC: 0x540D,
	    0x96BD: 0x547D,
	    0x96BE: 0x660E,
	    0x96BF: 0x76DF,
	    0x96C0: 0x8FF7,
	    0x96C1: 0x9298,
	    0x96C2: 0x9CF4,
	    0x96C3: 0x59EA,
	    0x96C4: 0x725D,
	    0x96C5: 0x6EC5,
	    0x96C6: 0x514D,
	    0x96C7: 0x68C9,
	    0x96C8: 0x7DBF,
	    0x96C9: 0x7DEC,
	    0x96CA: 0x9762,
	    0x96CB: 0x9EBA,
	    0x96CC: 0x6478,
	    0x96CD: 0x6A21,
	    0x96CE: 0x8302,
	    0x96CF: 0x5984,
	    0x96D0: 0x5B5F,
	    0x96D1: 0x6BDB,
	    0x96D2: 0x731B,
	    0x96D3: 0x76F2,
	    0x96D4: 0x7DB2,
	    0x96D5: 0x8017,
	    0x96D6: 0x8499,
	    0x96D7: 0x5132,
	    0x96D8: 0x6728,
	    0x96D9: 0x9ED9,
	    0x96DA: 0x76EE,
	    0x96DB: 0x6762,
	    0x96DC: 0x52FF,
	    0x96DD: 0x9905,
	    0x96DE: 0x5C24,
	    0x96DF: 0x623B,
	    0x96E0: 0x7C7E,
	    0x96E1: 0x8CB0,
	    0x96E2: 0x554F,
	    0x96E3: 0x60B6,
	    0x96E4: 0x7D0B,
	    0x96E5: 0x9580,
	    0x96E6: 0x5301,
	    0x96E7: 0x4E5F,
	    0x96E8: 0x51B6,
	    0x96E9: 0x591C,
	    0x96EA: 0x723A,
	    0x96EB: 0x8036,
	    0x96EC: 0x91CE,
	    0x96ED: 0x5F25,
	    0x96EE: 0x77E2,
	    0x96EF: 0x5384,
	    0x96F0: 0x5F79,
	    0x96F1: 0x7D04,
	    0x96F2: 0x85AC,
	    0x96F3: 0x8A33,
	    0x96F4: 0x8E8D,
	    0x96F5: 0x9756,
	    0x96F6: 0x67F3,
	    0x96F7: 0x85AE,
	    0x96F8: 0x9453,
	    0x96F9: 0x6109,
	    0x96FA: 0x6108,
	    0x96FB: 0x6CB9,
	    0x96FC: 0x7652,
	    0x9740: 0x8AED,
	    0x9741: 0x8F38,
	    0x9742: 0x552F,
	    0x9743: 0x4F51,
	    0x9744: 0x512A,
	    0x9745: 0x52C7,
	    0x9746: 0x53CB,
	    0x9747: 0x5BA5,
	    0x9748: 0x5E7D,
	    0x9749: 0x60A0,
	    0x974A: 0x6182,
	    0x974B: 0x63D6,
	    0x974C: 0x6709,
	    0x974D: 0x67DA,
	    0x974E: 0x6E67,
	    0x974F: 0x6D8C,
	    0x9750: 0x7336,
	    0x9751: 0x7337,
	    0x9752: 0x7531,
	    0x9753: 0x7950,
	    0x9754: 0x88D5,
	    0x9755: 0x8A98,
	    0x9756: 0x904A,
	    0x9757: 0x9091,
	    0x9758: 0x90F5,
	    0x9759: 0x96C4,
	    0x975A: 0x878D,
	    0x975B: 0x5915,
	    0x975C: 0x4E88,
	    0x975D: 0x4F59,
	    0x975E: 0x4E0E,
	    0x975F: 0x8A89,
	    0x9760: 0x8F3F,
	    0x9761: 0x9810,
	    0x9762: 0x50AD,
	    0x9763: 0x5E7C,
	    0x9764: 0x5996,
	    0x9765: 0x5BB9,
	    0x9766: 0x5EB8,
	    0x9767: 0x63DA,
	    0x9768: 0x63FA,
	    0x9769: 0x64C1,
	    0x976A: 0x66DC,
	    0x976B: 0x694A,
	    0x976C: 0x69D8,
	    0x976D: 0x6D0B,
	    0x976E: 0x6EB6,
	    0x976F: 0x7194,
	    0x9770: 0x7528,
	    0x9771: 0x7AAF,
	    0x9772: 0x7F8A,
	    0x9773: 0x8000,
	    0x9774: 0x8449,
	    0x9775: 0x84C9,
	    0x9776: 0x8981,
	    0x9777: 0x8B21,
	    0x9778: 0x8E0A,
	    0x9779: 0x9065,
	    0x977A: 0x967D,
	    0x977B: 0x990A,
	    0x977C: 0x617E,
	    0x977D: 0x6291,
	    0x977E: 0x6B32,
	    0x9780: 0x6C83,
	    0x9781: 0x6D74,
	    0x9782: 0x7FCC,
	    0x9783: 0x7FFC,
	    0x9784: 0x6DC0,
	    0x9785: 0x7F85,
	    0x9786: 0x87BA,
	    0x9787: 0x88F8,
	    0x9788: 0x6765,
	    0x9789: 0x83B1,
	    0x978A: 0x983C,
	    0x978B: 0x96F7,
	    0x978C: 0x6D1B,
	    0x978D: 0x7D61,
	    0x978E: 0x843D,
	    0x978F: 0x916A,
	    0x9790: 0x4E71,
	    0x9791: 0x5375,
	    0x9792: 0x5D50,
	    0x9793: 0x6B04,
	    0x9794: 0x6FEB,
	    0x9795: 0x85CD,
	    0x9796: 0x862D,
	    0x9797: 0x89A7,
	    0x9798: 0x5229,
	    0x9799: 0x540F,
	    0x979A: 0x5C65,
	    0x979B: 0x674E,
	    0x979C: 0x68A8,
	    0x979D: 0x7406,
	    0x979E: 0x7483,
	    0x979F: 0x75E2,
	    0x97A0: 0x88CF,
	    0x97A1: 0x88E1,
	    0x97A2: 0x91CC,
	    0x97A3: 0x96E2,
	    0x97A4: 0x9678,
	    0x97A5: 0x5F8B,
	    0x97A6: 0x7387,
	    0x97A7: 0x7ACB,
	    0x97A8: 0x844E,
	    0x97A9: 0x63A0,
	    0x97AA: 0x7565,
	    0x97AB: 0x5289,
	    0x97AC: 0x6D41,
	    0x97AD: 0x6E9C,
	    0x97AE: 0x7409,
	    0x97AF: 0x7559,
	    0x97B0: 0x786B,
	    0x97B1: 0x7C92,
	    0x97B2: 0x9686,
	    0x97B3: 0x7ADC,
	    0x97B4: 0x9F8D,
	    0x97B5: 0x4FB6,
	    0x97B6: 0x616E,
	    0x97B7: 0x65C5,
	    0x97B8: 0x865C,
	    0x97B9: 0x4E86,
	    0x97BA: 0x4EAE,
	    0x97BB: 0x50DA,
	    0x97BC: 0x4E21,
	    0x97BD: 0x51CC,
	    0x97BE: 0x5BEE,
	    0x97BF: 0x6599,
	    0x97C0: 0x6881,
	    0x97C1: 0x6DBC,
	    0x97C2: 0x731F,
	    0x97C3: 0x7642,
	    0x97C4: 0x77AD,
	    0x97C5: 0x7A1C,
	    0x97C6: 0x7CE7,
	    0x97C7: 0x826F,
	    0x97C8: 0x8AD2,
	    0x97C9: 0x907C,
	    0x97CA: 0x91CF,
	    0x97CB: 0x9675,
	    0x97CC: 0x9818,
	    0x97CD: 0x529B,
	    0x97CE: 0x7DD1,
	    0x97CF: 0x502B,
	    0x97D0: 0x5398,
	    0x97D1: 0x6797,
	    0x97D2: 0x6DCB,
	    0x97D3: 0x71D0,
	    0x97D4: 0x7433,
	    0x97D5: 0x81E8,
	    0x97D6: 0x8F2A,
	    0x97D7: 0x96A3,
	    0x97D8: 0x9C57,
	    0x97D9: 0x9E9F,
	    0x97DA: 0x7460,
	    0x97DB: 0x5841,
	    0x97DC: 0x6D99,
	    0x97DD: 0x7D2F,
	    0x97DE: 0x985E,
	    0x97DF: 0x4EE4,
	    0x97E0: 0x4F36,
	    0x97E1: 0x4F8B,
	    0x97E2: 0x51B7,
	    0x97E3: 0x52B1,
	    0x97E4: 0x5DBA,
	    0x97E5: 0x601C,
	    0x97E6: 0x73B2,
	    0x97E7: 0x793C,
	    0x97E8: 0x82D3,
	    0x97E9: 0x9234,
	    0x97EA: 0x96B7,
	    0x97EB: 0x96F6,
	    0x97EC: 0x970A,
	    0x97ED: 0x9E97,
	    0x97EE: 0x9F62,
	    0x97EF: 0x66A6,
	    0x97F0: 0x6B74,
	    0x97F1: 0x5217,
	    0x97F2: 0x52A3,
	    0x97F3: 0x70C8,
	    0x97F4: 0x88C2,
	    0x97F5: 0x5EC9,
	    0x97F6: 0x604B,
	    0x97F7: 0x6190,
	    0x97F8: 0x6F23,
	    0x97F9: 0x7149,
	    0x97FA: 0x7C3E,
	    0x97FB: 0x7DF4,
	    0x97FC: 0x806F,
	    0x9840: 0x84EE,
	    0x9841: 0x9023,
	    0x9842: 0x932C,
	    0x9843: 0x5442,
	    0x9844: 0x9B6F,
	    0x9845: 0x6AD3,
	    0x9846: 0x7089,
	    0x9847: 0x8CC2,
	    0x9848: 0x8DEF,
	    0x9849: 0x9732,
	    0x984A: 0x52B4,
	    0x984B: 0x5A41,
	    0x984C: 0x5ECA,
	    0x984D: 0x5F04,
	    0x984E: 0x6717,
	    0x984F: 0x697C,
	    0x9850: 0x6994,
	    0x9851: 0x6D6A,
	    0x9852: 0x6F0F,
	    0x9853: 0x7262,
	    0x9854: 0x72FC,
	    0x9855: 0x7BED,
	    0x9856: 0x8001,
	    0x9857: 0x807E,
	    0x9858: 0x874B,
	    0x9859: 0x90CE,
	    0x985A: 0x516D,
	    0x985B: 0x9E93,
	    0x985C: 0x7984,
	    0x985D: 0x808B,
	    0x985E: 0x9332,
	    0x985F: 0x8AD6,
	    0x9860: 0x502D,
	    0x9861: 0x548C,
	    0x9862: 0x8A71,
	    0x9863: 0x6B6A,
	    0x9864: 0x8CC4,
	    0x9865: 0x8107,
	    0x9866: 0x60D1,
	    0x9867: 0x67A0,
	    0x9868: 0x9DF2,
	    0x9869: 0x4E99,
	    0x986A: 0x4E98,
	    0x986B: 0x9C10,
	    0x986C: 0x8A6B,
	    0x986D: 0x85C1,
	    0x986E: 0x8568,
	    0x986F: 0x6900,
	    0x9870: 0x6E7E,
	    0x9871: 0x7897,
	    0x9872: 0x8155,
	    0x989F: 0x5F0C,
	    0x98A0: 0x4E10,
	    0x98A1: 0x4E15,
	    0x98A2: 0x4E2A,
	    0x98A3: 0x4E31,
	    0x98A4: 0x4E36,
	    0x98A5: 0x4E3C,
	    0x98A6: 0x4E3F,
	    0x98A7: 0x4E42,
	    0x98A8: 0x4E56,
	    0x98A9: 0x4E58,
	    0x98AA: 0x4E82,
	    0x98AB: 0x4E85,
	    0x98AC: 0x8C6B,
	    0x98AD: 0x4E8A,
	    0x98AE: 0x8212,
	    0x98AF: 0x5F0D,
	    0x98B0: 0x4E8E,
	    0x98B1: 0x4E9E,
	    0x98B2: 0x4E9F,
	    0x98B3: 0x4EA0,
	    0x98B4: 0x4EA2,
	    0x98B5: 0x4EB0,
	    0x98B6: 0x4EB3,
	    0x98B7: 0x4EB6,
	    0x98B8: 0x4ECE,
	    0x98B9: 0x4ECD,
	    0x98BA: 0x4EC4,
	    0x98BB: 0x4EC6,
	    0x98BC: 0x4EC2,
	    0x98BD: 0x4ED7,
	    0x98BE: 0x4EDE,
	    0x98BF: 0x4EED,
	    0x98C0: 0x4EDF,
	    0x98C1: 0x4EF7,
	    0x98C2: 0x4F09,
	    0x98C3: 0x4F5A,
	    0x98C4: 0x4F30,
	    0x98C5: 0x4F5B,
	    0x98C6: 0x4F5D,
	    0x98C7: 0x4F57,
	    0x98C8: 0x4F47,
	    0x98C9: 0x4F76,
	    0x98CA: 0x4F88,
	    0x98CB: 0x4F8F,
	    0x98CC: 0x4F98,
	    0x98CD: 0x4F7B,
	    0x98CE: 0x4F69,
	    0x98CF: 0x4F70,
	    0x98D0: 0x4F91,
	    0x98D1: 0x4F6F,
	    0x98D2: 0x4F86,
	    0x98D3: 0x4F96,
	    0x98D4: 0x5118,
	    0x98D5: 0x4FD4,
	    0x98D6: 0x4FDF,
	    0x98D7: 0x4FCE,
	    0x98D8: 0x4FD8,
	    0x98D9: 0x4FDB,
	    0x98DA: 0x4FD1,
	    0x98DB: 0x4FDA,
	    0x98DC: 0x4FD0,
	    0x98DD: 0x4FE4,
	    0x98DE: 0x4FE5,
	    0x98DF: 0x501A,
	    0x98E0: 0x5028,
	    0x98E1: 0x5014,
	    0x98E2: 0x502A,
	    0x98E3: 0x5025,
	    0x98E4: 0x5005,
	    0x98E5: 0x4F1C,
	    0x98E6: 0x4FF6,
	    0x98E7: 0x5021,
	    0x98E8: 0x5029,
	    0x98E9: 0x502C,
	    0x98EA: 0x4FFE,
	    0x98EB: 0x4FEF,
	    0x98EC: 0x5011,
	    0x98ED: 0x5006,
	    0x98EE: 0x5043,
	    0x98EF: 0x5047,
	    0x98F0: 0x6703,
	    0x98F1: 0x5055,
	    0x98F2: 0x5050,
	    0x98F3: 0x5048,
	    0x98F4: 0x505A,
	    0x98F5: 0x5056,
	    0x98F6: 0x506C,
	    0x98F7: 0x5078,
	    0x98F8: 0x5080,
	    0x98F9: 0x509A,
	    0x98FA: 0x5085,
	    0x98FB: 0x50B4,
	    0x98FC: 0x50B2,
	    0x9940: 0x50C9,
	    0x9941: 0x50CA,
	    0x9942: 0x50B3,
	    0x9943: 0x50C2,
	    0x9944: 0x50D6,
	    0x9945: 0x50DE,
	    0x9946: 0x50E5,
	    0x9947: 0x50ED,
	    0x9948: 0x50E3,
	    0x9949: 0x50EE,
	    0x994A: 0x50F9,
	    0x994B: 0x50F5,
	    0x994C: 0x5109,
	    0x994D: 0x5101,
	    0x994E: 0x5102,
	    0x994F: 0x5116,
	    0x9950: 0x5115,
	    0x9951: 0x5114,
	    0x9952: 0x511A,
	    0x9953: 0x5121,
	    0x9954: 0x513A,
	    0x9955: 0x5137,
	    0x9956: 0x513C,
	    0x9957: 0x513B,
	    0x9958: 0x513F,
	    0x9959: 0x5140,
	    0x995A: 0x5152,
	    0x995B: 0x514C,
	    0x995C: 0x5154,
	    0x995D: 0x5162,
	    0x995E: 0x7AF8,
	    0x995F: 0x5169,
	    0x9960: 0x516A,
	    0x9961: 0x516E,
	    0x9962: 0x5180,
	    0x9963: 0x5182,
	    0x9964: 0x56D8,
	    0x9965: 0x518C,
	    0x9966: 0x5189,
	    0x9967: 0x518F,
	    0x9968: 0x5191,
	    0x9969: 0x5193,
	    0x996A: 0x5195,
	    0x996B: 0x5196,
	    0x996C: 0x51A4,
	    0x996D: 0x51A6,
	    0x996E: 0x51A2,
	    0x996F: 0x51A9,
	    0x9970: 0x51AA,
	    0x9971: 0x51AB,
	    0x9972: 0x51B3,
	    0x9973: 0x51B1,
	    0x9974: 0x51B2,
	    0x9975: 0x51B0,
	    0x9976: 0x51B5,
	    0x9977: 0x51BD,
	    0x9978: 0x51C5,
	    0x9979: 0x51C9,
	    0x997A: 0x51DB,
	    0x997B: 0x51E0,
	    0x997C: 0x8655,
	    0x997D: 0x51E9,
	    0x997E: 0x51ED,
	    0x9980: 0x51F0,
	    0x9981: 0x51F5,
	    0x9982: 0x51FE,
	    0x9983: 0x5204,
	    0x9984: 0x520B,
	    0x9985: 0x5214,
	    0x9986: 0x520E,
	    0x9987: 0x5227,
	    0x9988: 0x522A,
	    0x9989: 0x522E,
	    0x998A: 0x5233,
	    0x998B: 0x5239,
	    0x998C: 0x524F,
	    0x998D: 0x5244,
	    0x998E: 0x524B,
	    0x998F: 0x524C,
	    0x9990: 0x525E,
	    0x9991: 0x5254,
	    0x9992: 0x526A,
	    0x9993: 0x5274,
	    0x9994: 0x5269,
	    0x9995: 0x5273,
	    0x9996: 0x527F,
	    0x9997: 0x527D,
	    0x9998: 0x528D,
	    0x9999: 0x5294,
	    0x999A: 0x5292,
	    0x999B: 0x5271,
	    0x999C: 0x5288,
	    0x999D: 0x5291,
	    0x999E: 0x8FA8,
	    0x999F: 0x8FA7,
	    0x99A0: 0x52AC,
	    0x99A1: 0x52AD,
	    0x99A2: 0x52BC,
	    0x99A3: 0x52B5,
	    0x99A4: 0x52C1,
	    0x99A5: 0x52CD,
	    0x99A6: 0x52D7,
	    0x99A7: 0x52DE,
	    0x99A8: 0x52E3,
	    0x99A9: 0x52E6,
	    0x99AA: 0x98ED,
	    0x99AB: 0x52E0,
	    0x99AC: 0x52F3,
	    0x99AD: 0x52F5,
	    0x99AE: 0x52F8,
	    0x99AF: 0x52F9,
	    0x99B0: 0x5306,
	    0x99B1: 0x5308,
	    0x99B2: 0x7538,
	    0x99B3: 0x530D,
	    0x99B4: 0x5310,
	    0x99B5: 0x530F,
	    0x99B6: 0x5315,
	    0x99B7: 0x531A,
	    0x99B8: 0x5323,
	    0x99B9: 0x532F,
	    0x99BA: 0x5331,
	    0x99BB: 0x5333,
	    0x99BC: 0x5338,
	    0x99BD: 0x5340,
	    0x99BE: 0x5346,
	    0x99BF: 0x5345,
	    0x99C0: 0x4E17,
	    0x99C1: 0x5349,
	    0x99C2: 0x534D,
	    0x99C3: 0x51D6,
	    0x99C4: 0x535E,
	    0x99C5: 0x5369,
	    0x99C6: 0x536E,
	    0x99C7: 0x5918,
	    0x99C8: 0x537B,
	    0x99C9: 0x5377,
	    0x99CA: 0x5382,
	    0x99CB: 0x5396,
	    0x99CC: 0x53A0,
	    0x99CD: 0x53A6,
	    0x99CE: 0x53A5,
	    0x99CF: 0x53AE,
	    0x99D0: 0x53B0,
	    0x99D1: 0x53B6,
	    0x99D2: 0x53C3,
	    0x99D3: 0x7C12,
	    0x99D4: 0x96D9,
	    0x99D5: 0x53DF,
	    0x99D6: 0x66FC,
	    0x99D7: 0x71EE,
	    0x99D8: 0x53EE,
	    0x99D9: 0x53E8,
	    0x99DA: 0x53ED,
	    0x99DB: 0x53FA,
	    0x99DC: 0x5401,
	    0x99DD: 0x543D,
	    0x99DE: 0x5440,
	    0x99DF: 0x542C,
	    0x99E0: 0x542D,
	    0x99E1: 0x543C,
	    0x99E2: 0x542E,
	    0x99E3: 0x5436,
	    0x99E4: 0x5429,
	    0x99E5: 0x541D,
	    0x99E6: 0x544E,
	    0x99E7: 0x548F,
	    0x99E8: 0x5475,
	    0x99E9: 0x548E,
	    0x99EA: 0x545F,
	    0x99EB: 0x5471,
	    0x99EC: 0x5477,
	    0x99ED: 0x5470,
	    0x99EE: 0x5492,
	    0x99EF: 0x547B,
	    0x99F0: 0x5480,
	    0x99F1: 0x5476,
	    0x99F2: 0x5484,
	    0x99F3: 0x5490,
	    0x99F4: 0x5486,
	    0x99F5: 0x54C7,
	    0x99F6: 0x54A2,
	    0x99F7: 0x54B8,
	    0x99F8: 0x54A5,
	    0x99F9: 0x54AC,
	    0x99FA: 0x54C4,
	    0x99FB: 0x54C8,
	    0x99FC: 0x54A8,
	    0x9A40: 0x54AB,
	    0x9A41: 0x54C2,
	    0x9A42: 0x54A4,
	    0x9A43: 0x54BE,
	    0x9A44: 0x54BC,
	    0x9A45: 0x54D8,
	    0x9A46: 0x54E5,
	    0x9A47: 0x54E6,
	    0x9A48: 0x550F,
	    0x9A49: 0x5514,
	    0x9A4A: 0x54FD,
	    0x9A4B: 0x54EE,
	    0x9A4C: 0x54ED,
	    0x9A4D: 0x54FA,
	    0x9A4E: 0x54E2,
	    0x9A4F: 0x5539,
	    0x9A50: 0x5540,
	    0x9A51: 0x5563,
	    0x9A52: 0x554C,
	    0x9A53: 0x552E,
	    0x9A54: 0x555C,
	    0x9A55: 0x5545,
	    0x9A56: 0x5556,
	    0x9A57: 0x5557,
	    0x9A58: 0x5538,
	    0x9A59: 0x5533,
	    0x9A5A: 0x555D,
	    0x9A5B: 0x5599,
	    0x9A5C: 0x5580,
	    0x9A5D: 0x54AF,
	    0x9A5E: 0x558A,
	    0x9A5F: 0x559F,
	    0x9A60: 0x557B,
	    0x9A61: 0x557E,
	    0x9A62: 0x5598,
	    0x9A63: 0x559E,
	    0x9A64: 0x55AE,
	    0x9A65: 0x557C,
	    0x9A66: 0x5583,
	    0x9A67: 0x55A9,
	    0x9A68: 0x5587,
	    0x9A69: 0x55A8,
	    0x9A6A: 0x55DA,
	    0x9A6B: 0x55C5,
	    0x9A6C: 0x55DF,
	    0x9A6D: 0x55C4,
	    0x9A6E: 0x55DC,
	    0x9A6F: 0x55E4,
	    0x9A70: 0x55D4,
	    0x9A71: 0x5614,
	    0x9A72: 0x55F7,
	    0x9A73: 0x5616,
	    0x9A74: 0x55FE,
	    0x9A75: 0x55FD,
	    0x9A76: 0x561B,
	    0x9A77: 0x55F9,
	    0x9A78: 0x564E,
	    0x9A79: 0x5650,
	    0x9A7A: 0x71DF,
	    0x9A7B: 0x5634,
	    0x9A7C: 0x5636,
	    0x9A7D: 0x5632,
	    0x9A7E: 0x5638,
	    0x9A80: 0x566B,
	    0x9A81: 0x5664,
	    0x9A82: 0x562F,
	    0x9A83: 0x566C,
	    0x9A84: 0x566A,
	    0x9A85: 0x5686,
	    0x9A86: 0x5680,
	    0x9A87: 0x568A,
	    0x9A88: 0x56A0,
	    0x9A89: 0x5694,
	    0x9A8A: 0x568F,
	    0x9A8B: 0x56A5,
	    0x9A8C: 0x56AE,
	    0x9A8D: 0x56B6,
	    0x9A8E: 0x56B4,
	    0x9A8F: 0x56C2,
	    0x9A90: 0x56BC,
	    0x9A91: 0x56C1,
	    0x9A92: 0x56C3,
	    0x9A93: 0x56C0,
	    0x9A94: 0x56C8,
	    0x9A95: 0x56CE,
	    0x9A96: 0x56D1,
	    0x9A97: 0x56D3,
	    0x9A98: 0x56D7,
	    0x9A99: 0x56EE,
	    0x9A9A: 0x56F9,
	    0x9A9B: 0x5700,
	    0x9A9C: 0x56FF,
	    0x9A9D: 0x5704,
	    0x9A9E: 0x5709,
	    0x9A9F: 0x5708,
	    0x9AA0: 0x570B,
	    0x9AA1: 0x570D,
	    0x9AA2: 0x5713,
	    0x9AA3: 0x5718,
	    0x9AA4: 0x5716,
	    0x9AA5: 0x55C7,
	    0x9AA6: 0x571C,
	    0x9AA7: 0x5726,
	    0x9AA8: 0x5737,
	    0x9AA9: 0x5738,
	    0x9AAA: 0x574E,
	    0x9AAB: 0x573B,
	    0x9AAC: 0x5740,
	    0x9AAD: 0x574F,
	    0x9AAE: 0x5769,
	    0x9AAF: 0x57C0,
	    0x9AB0: 0x5788,
	    0x9AB1: 0x5761,
	    0x9AB2: 0x577F,
	    0x9AB3: 0x5789,
	    0x9AB4: 0x5793,
	    0x9AB5: 0x57A0,
	    0x9AB6: 0x57B3,
	    0x9AB7: 0x57A4,
	    0x9AB8: 0x57AA,
	    0x9AB9: 0x57B0,
	    0x9ABA: 0x57C3,
	    0x9ABB: 0x57C6,
	    0x9ABC: 0x57D4,
	    0x9ABD: 0x57D2,
	    0x9ABE: 0x57D3,
	    0x9ABF: 0x580A,
	    0x9AC0: 0x57D6,
	    0x9AC1: 0x57E3,
	    0x9AC2: 0x580B,
	    0x9AC3: 0x5819,
	    0x9AC4: 0x581D,
	    0x9AC5: 0x5872,
	    0x9AC6: 0x5821,
	    0x9AC7: 0x5862,
	    0x9AC8: 0x584B,
	    0x9AC9: 0x5870,
	    0x9ACA: 0x6BC0,
	    0x9ACB: 0x5852,
	    0x9ACC: 0x583D,
	    0x9ACD: 0x5879,
	    0x9ACE: 0x5885,
	    0x9ACF: 0x58B9,
	    0x9AD0: 0x589F,
	    0x9AD1: 0x58AB,
	    0x9AD2: 0x58BA,
	    0x9AD3: 0x58DE,
	    0x9AD4: 0x58BB,
	    0x9AD5: 0x58B8,
	    0x9AD6: 0x58AE,
	    0x9AD7: 0x58C5,
	    0x9AD8: 0x58D3,
	    0x9AD9: 0x58D1,
	    0x9ADA: 0x58D7,
	    0x9ADB: 0x58D9,
	    0x9ADC: 0x58D8,
	    0x9ADD: 0x58E5,
	    0x9ADE: 0x58DC,
	    0x9ADF: 0x58E4,
	    0x9AE0: 0x58DF,
	    0x9AE1: 0x58EF,
	    0x9AE2: 0x58FA,
	    0x9AE3: 0x58F9,
	    0x9AE4: 0x58FB,
	    0x9AE5: 0x58FC,
	    0x9AE6: 0x58FD,
	    0x9AE7: 0x5902,
	    0x9AE8: 0x590A,
	    0x9AE9: 0x5910,
	    0x9AEA: 0x591B,
	    0x9AEB: 0x68A6,
	    0x9AEC: 0x5925,
	    0x9AED: 0x592C,
	    0x9AEE: 0x592D,
	    0x9AEF: 0x5932,
	    0x9AF0: 0x5938,
	    0x9AF1: 0x593E,
	    0x9AF2: 0x7AD2,
	    0x9AF3: 0x5955,
	    0x9AF4: 0x5950,
	    0x9AF5: 0x594E,
	    0x9AF6: 0x595A,
	    0x9AF7: 0x5958,
	    0x9AF8: 0x5962,
	    0x9AF9: 0x5960,
	    0x9AFA: 0x5967,
	    0x9AFB: 0x596C,
	    0x9AFC: 0x5969,
	    0x9B40: 0x5978,
	    0x9B41: 0x5981,
	    0x9B42: 0x599D,
	    0x9B43: 0x4F5E,
	    0x9B44: 0x4FAB,
	    0x9B45: 0x59A3,
	    0x9B46: 0x59B2,
	    0x9B47: 0x59C6,
	    0x9B48: 0x59E8,
	    0x9B49: 0x59DC,
	    0x9B4A: 0x598D,
	    0x9B4B: 0x59D9,
	    0x9B4C: 0x59DA,
	    0x9B4D: 0x5A25,
	    0x9B4E: 0x5A1F,
	    0x9B4F: 0x5A11,
	    0x9B50: 0x5A1C,
	    0x9B51: 0x5A09,
	    0x9B52: 0x5A1A,
	    0x9B53: 0x5A40,
	    0x9B54: 0x5A6C,
	    0x9B55: 0x5A49,
	    0x9B56: 0x5A35,
	    0x9B57: 0x5A36,
	    0x9B58: 0x5A62,
	    0x9B59: 0x5A6A,
	    0x9B5A: 0x5A9A,
	    0x9B5B: 0x5ABC,
	    0x9B5C: 0x5ABE,
	    0x9B5D: 0x5ACB,
	    0x9B5E: 0x5AC2,
	    0x9B5F: 0x5ABD,
	    0x9B60: 0x5AE3,
	    0x9B61: 0x5AD7,
	    0x9B62: 0x5AE6,
	    0x9B63: 0x5AE9,
	    0x9B64: 0x5AD6,
	    0x9B65: 0x5AFA,
	    0x9B66: 0x5AFB,
	    0x9B67: 0x5B0C,
	    0x9B68: 0x5B0B,
	    0x9B69: 0x5B16,
	    0x9B6A: 0x5B32,
	    0x9B6B: 0x5AD0,
	    0x9B6C: 0x5B2A,
	    0x9B6D: 0x5B36,
	    0x9B6E: 0x5B3E,
	    0x9B6F: 0x5B43,
	    0x9B70: 0x5B45,
	    0x9B71: 0x5B40,
	    0x9B72: 0x5B51,
	    0x9B73: 0x5B55,
	    0x9B74: 0x5B5A,
	    0x9B75: 0x5B5B,
	    0x9B76: 0x5B65,
	    0x9B77: 0x5B69,
	    0x9B78: 0x5B70,
	    0x9B79: 0x5B73,
	    0x9B7A: 0x5B75,
	    0x9B7B: 0x5B78,
	    0x9B7C: 0x6588,
	    0x9B7D: 0x5B7A,
	    0x9B7E: 0x5B80,
	    0x9B80: 0x5B83,
	    0x9B81: 0x5BA6,
	    0x9B82: 0x5BB8,
	    0x9B83: 0x5BC3,
	    0x9B84: 0x5BC7,
	    0x9B85: 0x5BC9,
	    0x9B86: 0x5BD4,
	    0x9B87: 0x5BD0,
	    0x9B88: 0x5BE4,
	    0x9B89: 0x5BE6,
	    0x9B8A: 0x5BE2,
	    0x9B8B: 0x5BDE,
	    0x9B8C: 0x5BE5,
	    0x9B8D: 0x5BEB,
	    0x9B8E: 0x5BF0,
	    0x9B8F: 0x5BF6,
	    0x9B90: 0x5BF3,
	    0x9B91: 0x5C05,
	    0x9B92: 0x5C07,
	    0x9B93: 0x5C08,
	    0x9B94: 0x5C0D,
	    0x9B95: 0x5C13,
	    0x9B96: 0x5C20,
	    0x9B97: 0x5C22,
	    0x9B98: 0x5C28,
	    0x9B99: 0x5C38,
	    0x9B9A: 0x5C39,
	    0x9B9B: 0x5C41,
	    0x9B9C: 0x5C46,
	    0x9B9D: 0x5C4E,
	    0x9B9E: 0x5C53,
	    0x9B9F: 0x5C50,
	    0x9BA0: 0x5C4F,
	    0x9BA1: 0x5B71,
	    0x9BA2: 0x5C6C,
	    0x9BA3: 0x5C6E,
	    0x9BA4: 0x4E62,
	    0x9BA5: 0x5C76,
	    0x9BA6: 0x5C79,
	    0x9BA7: 0x5C8C,
	    0x9BA8: 0x5C91,
	    0x9BA9: 0x5C94,
	    0x9BAA: 0x599B,
	    0x9BAB: 0x5CAB,
	    0x9BAC: 0x5CBB,
	    0x9BAD: 0x5CB6,
	    0x9BAE: 0x5CBC,
	    0x9BAF: 0x5CB7,
	    0x9BB0: 0x5CC5,
	    0x9BB1: 0x5CBE,
	    0x9BB2: 0x5CC7,
	    0x9BB3: 0x5CD9,
	    0x9BB4: 0x5CE9,
	    0x9BB5: 0x5CFD,
	    0x9BB6: 0x5CFA,
	    0x9BB7: 0x5CED,
	    0x9BB8: 0x5D8C,
	    0x9BB9: 0x5CEA,
	    0x9BBA: 0x5D0B,
	    0x9BBB: 0x5D15,
	    0x9BBC: 0x5D17,
	    0x9BBD: 0x5D5C,
	    0x9BBE: 0x5D1F,
	    0x9BBF: 0x5D1B,
	    0x9BC0: 0x5D11,
	    0x9BC1: 0x5D14,
	    0x9BC2: 0x5D22,
	    0x9BC3: 0x5D1A,
	    0x9BC4: 0x5D19,
	    0x9BC5: 0x5D18,
	    0x9BC6: 0x5D4C,
	    0x9BC7: 0x5D52,
	    0x9BC8: 0x5D4E,
	    0x9BC9: 0x5D4B,
	    0x9BCA: 0x5D6C,
	    0x9BCB: 0x5D73,
	    0x9BCC: 0x5D76,
	    0x9BCD: 0x5D87,
	    0x9BCE: 0x5D84,
	    0x9BCF: 0x5D82,
	    0x9BD0: 0x5DA2,
	    0x9BD1: 0x5D9D,
	    0x9BD2: 0x5DAC,
	    0x9BD3: 0x5DAE,
	    0x9BD4: 0x5DBD,
	    0x9BD5: 0x5D90,
	    0x9BD6: 0x5DB7,
	    0x9BD7: 0x5DBC,
	    0x9BD8: 0x5DC9,
	    0x9BD9: 0x5DCD,
	    0x9BDA: 0x5DD3,
	    0x9BDB: 0x5DD2,
	    0x9BDC: 0x5DD6,
	    0x9BDD: 0x5DDB,
	    0x9BDE: 0x5DEB,
	    0x9BDF: 0x5DF2,
	    0x9BE0: 0x5DF5,
	    0x9BE1: 0x5E0B,
	    0x9BE2: 0x5E1A,
	    0x9BE3: 0x5E19,
	    0x9BE4: 0x5E11,
	    0x9BE5: 0x5E1B,
	    0x9BE6: 0x5E36,
	    0x9BE7: 0x5E37,
	    0x9BE8: 0x5E44,
	    0x9BE9: 0x5E43,
	    0x9BEA: 0x5E40,
	    0x9BEB: 0x5E4E,
	    0x9BEC: 0x5E57,
	    0x9BED: 0x5E54,
	    0x9BEE: 0x5E5F,
	    0x9BEF: 0x5E62,
	    0x9BF0: 0x5E64,
	    0x9BF1: 0x5E47,
	    0x9BF2: 0x5E75,
	    0x9BF3: 0x5E76,
	    0x9BF4: 0x5E7A,
	    0x9BF5: 0x9EBC,
	    0x9BF6: 0x5E7F,
	    0x9BF7: 0x5EA0,
	    0x9BF8: 0x5EC1,
	    0x9BF9: 0x5EC2,
	    0x9BFA: 0x5EC8,
	    0x9BFB: 0x5ED0,
	    0x9BFC: 0x5ECF,
	    0x9C40: 0x5ED6,
	    0x9C41: 0x5EE3,
	    0x9C42: 0x5EDD,
	    0x9C43: 0x5EDA,
	    0x9C44: 0x5EDB,
	    0x9C45: 0x5EE2,
	    0x9C46: 0x5EE1,
	    0x9C47: 0x5EE8,
	    0x9C48: 0x5EE9,
	    0x9C49: 0x5EEC,
	    0x9C4A: 0x5EF1,
	    0x9C4B: 0x5EF3,
	    0x9C4C: 0x5EF0,
	    0x9C4D: 0x5EF4,
	    0x9C4E: 0x5EF8,
	    0x9C4F: 0x5EFE,
	    0x9C50: 0x5F03,
	    0x9C51: 0x5F09,
	    0x9C52: 0x5F5D,
	    0x9C53: 0x5F5C,
	    0x9C54: 0x5F0B,
	    0x9C55: 0x5F11,
	    0x9C56: 0x5F16,
	    0x9C57: 0x5F29,
	    0x9C58: 0x5F2D,
	    0x9C59: 0x5F38,
	    0x9C5A: 0x5F41,
	    0x9C5B: 0x5F48,
	    0x9C5C: 0x5F4C,
	    0x9C5D: 0x5F4E,
	    0x9C5E: 0x5F2F,
	    0x9C5F: 0x5F51,
	    0x9C60: 0x5F56,
	    0x9C61: 0x5F57,
	    0x9C62: 0x5F59,
	    0x9C63: 0x5F61,
	    0x9C64: 0x5F6D,
	    0x9C65: 0x5F73,
	    0x9C66: 0x5F77,
	    0x9C67: 0x5F83,
	    0x9C68: 0x5F82,
	    0x9C69: 0x5F7F,
	    0x9C6A: 0x5F8A,
	    0x9C6B: 0x5F88,
	    0x9C6C: 0x5F91,
	    0x9C6D: 0x5F87,
	    0x9C6E: 0x5F9E,
	    0x9C6F: 0x5F99,
	    0x9C70: 0x5F98,
	    0x9C71: 0x5FA0,
	    0x9C72: 0x5FA8,
	    0x9C73: 0x5FAD,
	    0x9C74: 0x5FBC,
	    0x9C75: 0x5FD6,
	    0x9C76: 0x5FFB,
	    0x9C77: 0x5FE4,
	    0x9C78: 0x5FF8,
	    0x9C79: 0x5FF1,
	    0x9C7A: 0x5FDD,
	    0x9C7B: 0x60B3,
	    0x9C7C: 0x5FFF,
	    0x9C7D: 0x6021,
	    0x9C7E: 0x6060,
	    0x9C80: 0x6019,
	    0x9C81: 0x6010,
	    0x9C82: 0x6029,
	    0x9C83: 0x600E,
	    0x9C84: 0x6031,
	    0x9C85: 0x601B,
	    0x9C86: 0x6015,
	    0x9C87: 0x602B,
	    0x9C88: 0x6026,
	    0x9C89: 0x600F,
	    0x9C8A: 0x603A,
	    0x9C8B: 0x605A,
	    0x9C8C: 0x6041,
	    0x9C8D: 0x606A,
	    0x9C8E: 0x6077,
	    0x9C8F: 0x605F,
	    0x9C90: 0x604A,
	    0x9C91: 0x6046,
	    0x9C92: 0x604D,
	    0x9C93: 0x6063,
	    0x9C94: 0x6043,
	    0x9C95: 0x6064,
	    0x9C96: 0x6042,
	    0x9C97: 0x606C,
	    0x9C98: 0x606B,
	    0x9C99: 0x6059,
	    0x9C9A: 0x6081,
	    0x9C9B: 0x608D,
	    0x9C9C: 0x60E7,
	    0x9C9D: 0x6083,
	    0x9C9E: 0x609A,
	    0x9C9F: 0x6084,
	    0x9CA0: 0x609B,
	    0x9CA1: 0x6096,
	    0x9CA2: 0x6097,
	    0x9CA3: 0x6092,
	    0x9CA4: 0x60A7,
	    0x9CA5: 0x608B,
	    0x9CA6: 0x60E1,
	    0x9CA7: 0x60B8,
	    0x9CA8: 0x60E0,
	    0x9CA9: 0x60D3,
	    0x9CAA: 0x60B4,
	    0x9CAB: 0x5FF0,
	    0x9CAC: 0x60BD,
	    0x9CAD: 0x60C6,
	    0x9CAE: 0x60B5,
	    0x9CAF: 0x60D8,
	    0x9CB0: 0x614D,
	    0x9CB1: 0x6115,
	    0x9CB2: 0x6106,
	    0x9CB3: 0x60F6,
	    0x9CB4: 0x60F7,
	    0x9CB5: 0x6100,
	    0x9CB6: 0x60F4,
	    0x9CB7: 0x60FA,
	    0x9CB8: 0x6103,
	    0x9CB9: 0x6121,
	    0x9CBA: 0x60FB,
	    0x9CBB: 0x60F1,
	    0x9CBC: 0x610D,
	    0x9CBD: 0x610E,
	    0x9CBE: 0x6147,
	    0x9CBF: 0x613E,
	    0x9CC0: 0x6128,
	    0x9CC1: 0x6127,
	    0x9CC2: 0x614A,
	    0x9CC3: 0x613F,
	    0x9CC4: 0x613C,
	    0x9CC5: 0x612C,
	    0x9CC6: 0x6134,
	    0x9CC7: 0x613D,
	    0x9CC8: 0x6142,
	    0x9CC9: 0x6144,
	    0x9CCA: 0x6173,
	    0x9CCB: 0x6177,
	    0x9CCC: 0x6158,
	    0x9CCD: 0x6159,
	    0x9CCE: 0x615A,
	    0x9CCF: 0x616B,
	    0x9CD0: 0x6174,
	    0x9CD1: 0x616F,
	    0x9CD2: 0x6165,
	    0x9CD3: 0x6171,
	    0x9CD4: 0x615F,
	    0x9CD5: 0x615D,
	    0x9CD6: 0x6153,
	    0x9CD7: 0x6175,
	    0x9CD8: 0x6199,
	    0x9CD9: 0x6196,
	    0x9CDA: 0x6187,
	    0x9CDB: 0x61AC,
	    0x9CDC: 0x6194,
	    0x9CDD: 0x619A,
	    0x9CDE: 0x618A,
	    0x9CDF: 0x6191,
	    0x9CE0: 0x61AB,
	    0x9CE1: 0x61AE,
	    0x9CE2: 0x61CC,
	    0x9CE3: 0x61CA,
	    0x9CE4: 0x61C9,
	    0x9CE5: 0x61F7,
	    0x9CE6: 0x61C8,
	    0x9CE7: 0x61C3,
	    0x9CE8: 0x61C6,
	    0x9CE9: 0x61BA,
	    0x9CEA: 0x61CB,
	    0x9CEB: 0x7F79,
	    0x9CEC: 0x61CD,
	    0x9CED: 0x61E6,
	    0x9CEE: 0x61E3,
	    0x9CEF: 0x61F6,
	    0x9CF0: 0x61FA,
	    0x9CF1: 0x61F4,
	    0x9CF2: 0x61FF,
	    0x9CF3: 0x61FD,
	    0x9CF4: 0x61FC,
	    0x9CF5: 0x61FE,
	    0x9CF6: 0x6200,
	    0x9CF7: 0x6208,
	    0x9CF8: 0x6209,
	    0x9CF9: 0x620D,
	    0x9CFA: 0x620C,
	    0x9CFB: 0x6214,
	    0x9CFC: 0x621B,
	    0x9D40: 0x621E,
	    0x9D41: 0x6221,
	    0x9D42: 0x622A,
	    0x9D43: 0x622E,
	    0x9D44: 0x6230,
	    0x9D45: 0x6232,
	    0x9D46: 0x6233,
	    0x9D47: 0x6241,
	    0x9D48: 0x624E,
	    0x9D49: 0x625E,
	    0x9D4A: 0x6263,
	    0x9D4B: 0x625B,
	    0x9D4C: 0x6260,
	    0x9D4D: 0x6268,
	    0x9D4E: 0x627C,
	    0x9D4F: 0x6282,
	    0x9D50: 0x6289,
	    0x9D51: 0x627E,
	    0x9D52: 0x6292,
	    0x9D53: 0x6293,
	    0x9D54: 0x6296,
	    0x9D55: 0x62D4,
	    0x9D56: 0x6283,
	    0x9D57: 0x6294,
	    0x9D58: 0x62D7,
	    0x9D59: 0x62D1,
	    0x9D5A: 0x62BB,
	    0x9D5B: 0x62CF,
	    0x9D5C: 0x62FF,
	    0x9D5D: 0x62C6,
	    0x9D5E: 0x64D4,
	    0x9D5F: 0x62C8,
	    0x9D60: 0x62DC,
	    0x9D61: 0x62CC,
	    0x9D62: 0x62CA,
	    0x9D63: 0x62C2,
	    0x9D64: 0x62C7,
	    0x9D65: 0x629B,
	    0x9D66: 0x62C9,
	    0x9D67: 0x630C,
	    0x9D68: 0x62EE,
	    0x9D69: 0x62F1,
	    0x9D6A: 0x6327,
	    0x9D6B: 0x6302,
	    0x9D6C: 0x6308,
	    0x9D6D: 0x62EF,
	    0x9D6E: 0x62F5,
	    0x9D6F: 0x6350,
	    0x9D70: 0x633E,
	    0x9D71: 0x634D,
	    0x9D72: 0x641C,
	    0x9D73: 0x634F,
	    0x9D74: 0x6396,
	    0x9D75: 0x638E,
	    0x9D76: 0x6380,
	    0x9D77: 0x63AB,
	    0x9D78: 0x6376,
	    0x9D79: 0x63A3,
	    0x9D7A: 0x638F,
	    0x9D7B: 0x6389,
	    0x9D7C: 0x639F,
	    0x9D7D: 0x63B5,
	    0x9D7E: 0x636B,
	    0x9D80: 0x6369,
	    0x9D81: 0x63BE,
	    0x9D82: 0x63E9,
	    0x9D83: 0x63C0,
	    0x9D84: 0x63C6,
	    0x9D85: 0x63E3,
	    0x9D86: 0x63C9,
	    0x9D87: 0x63D2,
	    0x9D88: 0x63F6,
	    0x9D89: 0x63C4,
	    0x9D8A: 0x6416,
	    0x9D8B: 0x6434,
	    0x9D8C: 0x6406,
	    0x9D8D: 0x6413,
	    0x9D8E: 0x6426,
	    0x9D8F: 0x6436,
	    0x9D90: 0x651D,
	    0x9D91: 0x6417,
	    0x9D92: 0x6428,
	    0x9D93: 0x640F,
	    0x9D94: 0x6467,
	    0x9D95: 0x646F,
	    0x9D96: 0x6476,
	    0x9D97: 0x644E,
	    0x9D98: 0x652A,
	    0x9D99: 0x6495,
	    0x9D9A: 0x6493,
	    0x9D9B: 0x64A5,
	    0x9D9C: 0x64A9,
	    0x9D9D: 0x6488,
	    0x9D9E: 0x64BC,
	    0x9D9F: 0x64DA,
	    0x9DA0: 0x64D2,
	    0x9DA1: 0x64C5,
	    0x9DA2: 0x64C7,
	    0x9DA3: 0x64BB,
	    0x9DA4: 0x64D8,
	    0x9DA5: 0x64C2,
	    0x9DA6: 0x64F1,
	    0x9DA7: 0x64E7,
	    0x9DA8: 0x8209,
	    0x9DA9: 0x64E0,
	    0x9DAA: 0x64E1,
	    0x9DAB: 0x62AC,
	    0x9DAC: 0x64E3,
	    0x9DAD: 0x64EF,
	    0x9DAE: 0x652C,
	    0x9DAF: 0x64F6,
	    0x9DB0: 0x64F4,
	    0x9DB1: 0x64F2,
	    0x9DB2: 0x64FA,
	    0x9DB3: 0x6500,
	    0x9DB4: 0x64FD,
	    0x9DB5: 0x6518,
	    0x9DB6: 0x651C,
	    0x9DB7: 0x6505,
	    0x9DB8: 0x6524,
	    0x9DB9: 0x6523,
	    0x9DBA: 0x652B,
	    0x9DBB: 0x6534,
	    0x9DBC: 0x6535,
	    0x9DBD: 0x6537,
	    0x9DBE: 0x6536,
	    0x9DBF: 0x6538,
	    0x9DC0: 0x754B,
	    0x9DC1: 0x6548,
	    0x9DC2: 0x6556,
	    0x9DC3: 0x6555,
	    0x9DC4: 0x654D,
	    0x9DC5: 0x6558,
	    0x9DC6: 0x655E,
	    0x9DC7: 0x655D,
	    0x9DC8: 0x6572,
	    0x9DC9: 0x6578,
	    0x9DCA: 0x6582,
	    0x9DCB: 0x6583,
	    0x9DCC: 0x8B8A,
	    0x9DCD: 0x659B,
	    0x9DCE: 0x659F,
	    0x9DCF: 0x65AB,
	    0x9DD0: 0x65B7,
	    0x9DD1: 0x65C3,
	    0x9DD2: 0x65C6,
	    0x9DD3: 0x65C1,
	    0x9DD4: 0x65C4,
	    0x9DD5: 0x65CC,
	    0x9DD6: 0x65D2,
	    0x9DD7: 0x65DB,
	    0x9DD8: 0x65D9,
	    0x9DD9: 0x65E0,
	    0x9DDA: 0x65E1,
	    0x9DDB: 0x65F1,
	    0x9DDC: 0x6772,
	    0x9DDD: 0x660A,
	    0x9DDE: 0x6603,
	    0x9DDF: 0x65FB,
	    0x9DE0: 0x6773,
	    0x9DE1: 0x6635,
	    0x9DE2: 0x6636,
	    0x9DE3: 0x6634,
	    0x9DE4: 0x661C,
	    0x9DE5: 0x664F,
	    0x9DE6: 0x6644,
	    0x9DE7: 0x6649,
	    0x9DE8: 0x6641,
	    0x9DE9: 0x665E,
	    0x9DEA: 0x665D,
	    0x9DEB: 0x6664,
	    0x9DEC: 0x6667,
	    0x9DED: 0x6668,
	    0x9DEE: 0x665F,
	    0x9DEF: 0x6662,
	    0x9DF0: 0x6670,
	    0x9DF1: 0x6683,
	    0x9DF2: 0x6688,
	    0x9DF3: 0x668E,
	    0x9DF4: 0x6689,
	    0x9DF5: 0x6684,
	    0x9DF6: 0x6698,
	    0x9DF7: 0x669D,
	    0x9DF8: 0x66C1,
	    0x9DF9: 0x66B9,
	    0x9DFA: 0x66C9,
	    0x9DFB: 0x66BE,
	    0x9DFC: 0x66BC,
	    0x9E40: 0x66C4,
	    0x9E41: 0x66B8,
	    0x9E42: 0x66D6,
	    0x9E43: 0x66DA,
	    0x9E44: 0x66E0,
	    0x9E45: 0x663F,
	    0x9E46: 0x66E6,
	    0x9E47: 0x66E9,
	    0x9E48: 0x66F0,
	    0x9E49: 0x66F5,
	    0x9E4A: 0x66F7,
	    0x9E4B: 0x670F,
	    0x9E4C: 0x6716,
	    0x9E4D: 0x671E,
	    0x9E4E: 0x6726,
	    0x9E4F: 0x6727,
	    0x9E50: 0x9738,
	    0x9E51: 0x672E,
	    0x9E52: 0x673F,
	    0x9E53: 0x6736,
	    0x9E54: 0x6741,
	    0x9E55: 0x6738,
	    0x9E56: 0x6737,
	    0x9E57: 0x6746,
	    0x9E58: 0x675E,
	    0x9E59: 0x6760,
	    0x9E5A: 0x6759,
	    0x9E5B: 0x6763,
	    0x9E5C: 0x6764,
	    0x9E5D: 0x6789,
	    0x9E5E: 0x6770,
	    0x9E5F: 0x67A9,
	    0x9E60: 0x677C,
	    0x9E61: 0x676A,
	    0x9E62: 0x678C,
	    0x9E63: 0x678B,
	    0x9E64: 0x67A6,
	    0x9E65: 0x67A1,
	    0x9E66: 0x6785,
	    0x9E67: 0x67B7,
	    0x9E68: 0x67EF,
	    0x9E69: 0x67B4,
	    0x9E6A: 0x67EC,
	    0x9E6B: 0x67B3,
	    0x9E6C: 0x67E9,
	    0x9E6D: 0x67B8,
	    0x9E6E: 0x67E4,
	    0x9E6F: 0x67DE,
	    0x9E70: 0x67DD,
	    0x9E71: 0x67E2,
	    0x9E72: 0x67EE,
	    0x9E73: 0x67B9,
	    0x9E74: 0x67CE,
	    0x9E75: 0x67C6,
	    0x9E76: 0x67E7,
	    0x9E77: 0x6A9C,
	    0x9E78: 0x681E,
	    0x9E79: 0x6846,
	    0x9E7A: 0x6829,
	    0x9E7B: 0x6840,
	    0x9E7C: 0x684D,
	    0x9E7D: 0x6832,
	    0x9E7E: 0x684E,
	    0x9E80: 0x68B3,
	    0x9E81: 0x682B,
	    0x9E82: 0x6859,
	    0x9E83: 0x6863,
	    0x9E84: 0x6877,
	    0x9E85: 0x687F,
	    0x9E86: 0x689F,
	    0x9E87: 0x688F,
	    0x9E88: 0x68AD,
	    0x9E89: 0x6894,
	    0x9E8A: 0x689D,
	    0x9E8B: 0x689B,
	    0x9E8C: 0x6883,
	    0x9E8D: 0x6AAE,
	    0x9E8E: 0x68B9,
	    0x9E8F: 0x6874,
	    0x9E90: 0x68B5,
	    0x9E91: 0x68A0,
	    0x9E92: 0x68BA,
	    0x9E93: 0x690F,
	    0x9E94: 0x688D,
	    0x9E95: 0x687E,
	    0x9E96: 0x6901,
	    0x9E97: 0x68CA,
	    0x9E98: 0x6908,
	    0x9E99: 0x68D8,
	    0x9E9A: 0x6922,
	    0x9E9B: 0x6926,
	    0x9E9C: 0x68E1,
	    0x9E9D: 0x690C,
	    0x9E9E: 0x68CD,
	    0x9E9F: 0x68D4,
	    0x9EA0: 0x68E7,
	    0x9EA1: 0x68D5,
	    0x9EA2: 0x6936,
	    0x9EA3: 0x6912,
	    0x9EA4: 0x6904,
	    0x9EA5: 0x68D7,
	    0x9EA6: 0x68E3,
	    0x9EA7: 0x6925,
	    0x9EA8: 0x68F9,
	    0x9EA9: 0x68E0,
	    0x9EAA: 0x68EF,
	    0x9EAB: 0x6928,
	    0x9EAC: 0x692A,
	    0x9EAD: 0x691A,
	    0x9EAE: 0x6923,
	    0x9EAF: 0x6921,
	    0x9EB0: 0x68C6,
	    0x9EB1: 0x6979,
	    0x9EB2: 0x6977,
	    0x9EB3: 0x695C,
	    0x9EB4: 0x6978,
	    0x9EB5: 0x696B,
	    0x9EB6: 0x6954,
	    0x9EB7: 0x697E,
	    0x9EB8: 0x696E,
	    0x9EB9: 0x6939,
	    0x9EBA: 0x6974,
	    0x9EBB: 0x693D,
	    0x9EBC: 0x6959,
	    0x9EBD: 0x6930,
	    0x9EBE: 0x6961,
	    0x9EBF: 0x695E,
	    0x9EC0: 0x695D,
	    0x9EC1: 0x6981,
	    0x9EC2: 0x696A,
	    0x9EC3: 0x69B2,
	    0x9EC4: 0x69AE,
	    0x9EC5: 0x69D0,
	    0x9EC6: 0x69BF,
	    0x9EC7: 0x69C1,
	    0x9EC8: 0x69D3,
	    0x9EC9: 0x69BE,
	    0x9ECA: 0x69CE,
	    0x9ECB: 0x5BE8,
	    0x9ECC: 0x69CA,
	    0x9ECD: 0x69DD,
	    0x9ECE: 0x69BB,
	    0x9ECF: 0x69C3,
	    0x9ED0: 0x69A7,
	    0x9ED1: 0x6A2E,
	    0x9ED2: 0x6991,
	    0x9ED3: 0x69A0,
	    0x9ED4: 0x699C,
	    0x9ED5: 0x6995,
	    0x9ED6: 0x69B4,
	    0x9ED7: 0x69DE,
	    0x9ED8: 0x69E8,
	    0x9ED9: 0x6A02,
	    0x9EDA: 0x6A1B,
	    0x9EDB: 0x69FF,
	    0x9EDC: 0x6B0A,
	    0x9EDD: 0x69F9,
	    0x9EDE: 0x69F2,
	    0x9EDF: 0x69E7,
	    0x9EE0: 0x6A05,
	    0x9EE1: 0x69B1,
	    0x9EE2: 0x6A1E,
	    0x9EE3: 0x69ED,
	    0x9EE4: 0x6A14,
	    0x9EE5: 0x69EB,
	    0x9EE6: 0x6A0A,
	    0x9EE7: 0x6A12,
	    0x9EE8: 0x6AC1,
	    0x9EE9: 0x6A23,
	    0x9EEA: 0x6A13,
	    0x9EEB: 0x6A44,
	    0x9EEC: 0x6A0C,
	    0x9EED: 0x6A72,
	    0x9EEE: 0x6A36,
	    0x9EEF: 0x6A78,
	    0x9EF0: 0x6A47,
	    0x9EF1: 0x6A62,
	    0x9EF2: 0x6A59,
	    0x9EF3: 0x6A66,
	    0x9EF4: 0x6A48,
	    0x9EF5: 0x6A38,
	    0x9EF6: 0x6A22,
	    0x9EF7: 0x6A90,
	    0x9EF8: 0x6A8D,
	    0x9EF9: 0x6AA0,
	    0x9EFA: 0x6A84,
	    0x9EFB: 0x6AA2,
	    0x9EFC: 0x6AA3,
	    0x9F40: 0x6A97,
	    0x9F41: 0x8617,
	    0x9F42: 0x6ABB,
	    0x9F43: 0x6AC3,
	    0x9F44: 0x6AC2,
	    0x9F45: 0x6AB8,
	    0x9F46: 0x6AB3,
	    0x9F47: 0x6AAC,
	    0x9F48: 0x6ADE,
	    0x9F49: 0x6AD1,
	    0x9F4A: 0x6ADF,
	    0x9F4B: 0x6AAA,
	    0x9F4C: 0x6ADA,
	    0x9F4D: 0x6AEA,
	    0x9F4E: 0x6AFB,
	    0x9F4F: 0x6B05,
	    0x9F50: 0x8616,
	    0x9F51: 0x6AFA,
	    0x9F52: 0x6B12,
	    0x9F53: 0x6B16,
	    0x9F54: 0x9B31,
	    0x9F55: 0x6B1F,
	    0x9F56: 0x6B38,
	    0x9F57: 0x6B37,
	    0x9F58: 0x76DC,
	    0x9F59: 0x6B39,
	    0x9F5A: 0x98EE,
	    0x9F5B: 0x6B47,
	    0x9F5C: 0x6B43,
	    0x9F5D: 0x6B49,
	    0x9F5E: 0x6B50,
	    0x9F5F: 0x6B59,
	    0x9F60: 0x6B54,
	    0x9F61: 0x6B5B,
	    0x9F62: 0x6B5F,
	    0x9F63: 0x6B61,
	    0x9F64: 0x6B78,
	    0x9F65: 0x6B79,
	    0x9F66: 0x6B7F,
	    0x9F67: 0x6B80,
	    0x9F68: 0x6B84,
	    0x9F69: 0x6B83,
	    0x9F6A: 0x6B8D,
	    0x9F6B: 0x6B98,
	    0x9F6C: 0x6B95,
	    0x9F6D: 0x6B9E,
	    0x9F6E: 0x6BA4,
	    0x9F6F: 0x6BAA,
	    0x9F70: 0x6BAB,
	    0x9F71: 0x6BAF,
	    0x9F72: 0x6BB2,
	    0x9F73: 0x6BB1,
	    0x9F74: 0x6BB3,
	    0x9F75: 0x6BB7,
	    0x9F76: 0x6BBC,
	    0x9F77: 0x6BC6,
	    0x9F78: 0x6BCB,
	    0x9F79: 0x6BD3,
	    0x9F7A: 0x6BDF,
	    0x9F7B: 0x6BEC,
	    0x9F7C: 0x6BEB,
	    0x9F7D: 0x6BF3,
	    0x9F7E: 0x6BEF,
	    0x9F80: 0x9EBE,
	    0x9F81: 0x6C08,
	    0x9F82: 0x6C13,
	    0x9F83: 0x6C14,
	    0x9F84: 0x6C1B,
	    0x9F85: 0x6C24,
	    0x9F86: 0x6C23,
	    0x9F87: 0x6C5E,
	    0x9F88: 0x6C55,
	    0x9F89: 0x6C62,
	    0x9F8A: 0x6C6A,
	    0x9F8B: 0x6C82,
	    0x9F8C: 0x6C8D,
	    0x9F8D: 0x6C9A,
	    0x9F8E: 0x6C81,
	    0x9F8F: 0x6C9B,
	    0x9F90: 0x6C7E,
	    0x9F91: 0x6C68,
	    0x9F92: 0x6C73,
	    0x9F93: 0x6C92,
	    0x9F94: 0x6C90,
	    0x9F95: 0x6CC4,
	    0x9F96: 0x6CF1,
	    0x9F97: 0x6CD3,
	    0x9F98: 0x6CBD,
	    0x9F99: 0x6CD7,
	    0x9F9A: 0x6CC5,
	    0x9F9B: 0x6CDD,
	    0x9F9C: 0x6CAE,
	    0x9F9D: 0x6CB1,
	    0x9F9E: 0x6CBE,
	    0x9F9F: 0x6CBA,
	    0x9FA0: 0x6CDB,
	    0x9FA1: 0x6CEF,
	    0x9FA2: 0x6CD9,
	    0x9FA3: 0x6CEA,
	    0x9FA4: 0x6D1F,
	    0x9FA5: 0x884D,
	    0x9FA6: 0x6D36,
	    0x9FA7: 0x6D2B,
	    0x9FA8: 0x6D3D,
	    0x9FA9: 0x6D38,
	    0x9FAA: 0x6D19,
	    0x9FAB: 0x6D35,
	    0x9FAC: 0x6D33,
	    0x9FAD: 0x6D12,
	    0x9FAE: 0x6D0C,
	    0x9FAF: 0x6D63,
	    0x9FB0: 0x6D93,
	    0x9FB1: 0x6D64,
	    0x9FB2: 0x6D5A,
	    0x9FB3: 0x6D79,
	    0x9FB4: 0x6D59,
	    0x9FB5: 0x6D8E,
	    0x9FB6: 0x6D95,
	    0x9FB7: 0x6FE4,
	    0x9FB8: 0x6D85,
	    0x9FB9: 0x6DF9,
	    0x9FBA: 0x6E15,
	    0x9FBB: 0x6E0A,
	    0x9FBC: 0x6DB5,
	    0x9FBD: 0x6DC7,
	    0x9FBE: 0x6DE6,
	    0x9FBF: 0x6DB8,
	    0x9FC0: 0x6DC6,
	    0x9FC1: 0x6DEC,
	    0x9FC2: 0x6DDE,
	    0x9FC3: 0x6DCC,
	    0x9FC4: 0x6DE8,
	    0x9FC5: 0x6DD2,
	    0x9FC6: 0x6DC5,
	    0x9FC7: 0x6DFA,
	    0x9FC8: 0x6DD9,
	    0x9FC9: 0x6DE4,
	    0x9FCA: 0x6DD5,
	    0x9FCB: 0x6DEA,
	    0x9FCC: 0x6DEE,
	    0x9FCD: 0x6E2D,
	    0x9FCE: 0x6E6E,
	    0x9FCF: 0x6E2E,
	    0x9FD0: 0x6E19,
	    0x9FD1: 0x6E72,
	    0x9FD2: 0x6E5F,
	    0x9FD3: 0x6E3E,
	    0x9FD4: 0x6E23,
	    0x9FD5: 0x6E6B,
	    0x9FD6: 0x6E2B,
	    0x9FD7: 0x6E76,
	    0x9FD8: 0x6E4D,
	    0x9FD9: 0x6E1F,
	    0x9FDA: 0x6E43,
	    0x9FDB: 0x6E3A,
	    0x9FDC: 0x6E4E,
	    0x9FDD: 0x6E24,
	    0x9FDE: 0x6EFF,
	    0x9FDF: 0x6E1D,
	    0x9FE0: 0x6E38,
	    0x9FE1: 0x6E82,
	    0x9FE2: 0x6EAA,
	    0x9FE3: 0x6E98,
	    0x9FE4: 0x6EC9,
	    0x9FE5: 0x6EB7,
	    0x9FE6: 0x6ED3,
	    0x9FE7: 0x6EBD,
	    0x9FE8: 0x6EAF,
	    0x9FE9: 0x6EC4,
	    0x9FEA: 0x6EB2,
	    0x9FEB: 0x6ED4,
	    0x9FEC: 0x6ED5,
	    0x9FED: 0x6E8F,
	    0x9FEE: 0x6EA5,
	    0x9FEF: 0x6EC2,
	    0x9FF0: 0x6E9F,
	    0x9FF1: 0x6F41,
	    0x9FF2: 0x6F11,
	    0x9FF3: 0x704C,
	    0x9FF4: 0x6EEC,
	    0x9FF5: 0x6EF8,
	    0x9FF6: 0x6EFE,
	    0x9FF7: 0x6F3F,
	    0x9FF8: 0x6EF2,
	    0x9FF9: 0x6F31,
	    0x9FFA: 0x6EEF,
	    0x9FFB: 0x6F32,
	    0x9FFC: 0x6ECC,
	    0xA1: 0xFF61,
	    0xA2: 0xFF62,
	    0xA3: 0xFF63,
	    0xA4: 0xFF64,
	    0xA5: 0xFF65,
	    0xA6: 0xFF66,
	    0xA7: 0xFF67,
	    0xA8: 0xFF68,
	    0xA9: 0xFF69,
	    0xAA: 0xFF6A,
	    0xAB: 0xFF6B,
	    0xAC: 0xFF6C,
	    0xAD: 0xFF6D,
	    0xAE: 0xFF6E,
	    0xAF: 0xFF6F,
	    0xB0: 0xFF70,
	    0xB1: 0xFF71,
	    0xB2: 0xFF72,
	    0xB3: 0xFF73,
	    0xB4: 0xFF74,
	    0xB5: 0xFF75,
	    0xB6: 0xFF76,
	    0xB7: 0xFF77,
	    0xB8: 0xFF78,
	    0xB9: 0xFF79,
	    0xBA: 0xFF7A,
	    0xBB: 0xFF7B,
	    0xBC: 0xFF7C,
	    0xBD: 0xFF7D,
	    0xBE: 0xFF7E,
	    0xBF: 0xFF7F,
	    0xC0: 0xFF80,
	    0xC1: 0xFF81,
	    0xC2: 0xFF82,
	    0xC3: 0xFF83,
	    0xC4: 0xFF84,
	    0xC5: 0xFF85,
	    0xC6: 0xFF86,
	    0xC7: 0xFF87,
	    0xC8: 0xFF88,
	    0xC9: 0xFF89,
	    0xCA: 0xFF8A,
	    0xCB: 0xFF8B,
	    0xCC: 0xFF8C,
	    0xCD: 0xFF8D,
	    0xCE: 0xFF8E,
	    0xCF: 0xFF8F,
	    0xD0: 0xFF90,
	    0xD1: 0xFF91,
	    0xD2: 0xFF92,
	    0xD3: 0xFF93,
	    0xD4: 0xFF94,
	    0xD5: 0xFF95,
	    0xD6: 0xFF96,
	    0xD7: 0xFF97,
	    0xD8: 0xFF98,
	    0xD9: 0xFF99,
	    0xDA: 0xFF9A,
	    0xDB: 0xFF9B,
	    0xDC: 0xFF9C,
	    0xDD: 0xFF9D,
	    0xDE: 0xFF9E,
	    0xDF: 0xFF9F,
	    0xE040: 0x6F3E,
	    0xE041: 0x6F13,
	    0xE042: 0x6EF7,
	    0xE043: 0x6F86,
	    0xE044: 0x6F7A,
	    0xE045: 0x6F78,
	    0xE046: 0x6F81,
	    0xE047: 0x6F80,
	    0xE048: 0x6F6F,
	    0xE049: 0x6F5B,
	    0xE04A: 0x6FF3,
	    0xE04B: 0x6F6D,
	    0xE04C: 0x6F82,
	    0xE04D: 0x6F7C,
	    0xE04E: 0x6F58,
	    0xE04F: 0x6F8E,
	    0xE050: 0x6F91,
	    0xE051: 0x6FC2,
	    0xE052: 0x6F66,
	    0xE053: 0x6FB3,
	    0xE054: 0x6FA3,
	    0xE055: 0x6FA1,
	    0xE056: 0x6FA4,
	    0xE057: 0x6FB9,
	    0xE058: 0x6FC6,
	    0xE059: 0x6FAA,
	    0xE05A: 0x6FDF,
	    0xE05B: 0x6FD5,
	    0xE05C: 0x6FEC,
	    0xE05D: 0x6FD4,
	    0xE05E: 0x6FD8,
	    0xE05F: 0x6FF1,
	    0xE060: 0x6FEE,
	    0xE061: 0x6FDB,
	    0xE062: 0x7009,
	    0xE063: 0x700B,
	    0xE064: 0x6FFA,
	    0xE065: 0x7011,
	    0xE066: 0x7001,
	    0xE067: 0x700F,
	    0xE068: 0x6FFE,
	    0xE069: 0x701B,
	    0xE06A: 0x701A,
	    0xE06B: 0x6F74,
	    0xE06C: 0x701D,
	    0xE06D: 0x7018,
	    0xE06E: 0x701F,
	    0xE06F: 0x7030,
	    0xE070: 0x703E,
	    0xE071: 0x7032,
	    0xE072: 0x7051,
	    0xE073: 0x7063,
	    0xE074: 0x7099,
	    0xE075: 0x7092,
	    0xE076: 0x70AF,
	    0xE077: 0x70F1,
	    0xE078: 0x70AC,
	    0xE079: 0x70B8,
	    0xE07A: 0x70B3,
	    0xE07B: 0x70AE,
	    0xE07C: 0x70DF,
	    0xE07D: 0x70CB,
	    0xE07E: 0x70DD,
	    0xE080: 0x70D9,
	    0xE081: 0x7109,
	    0xE082: 0x70FD,
	    0xE083: 0x711C,
	    0xE084: 0x7119,
	    0xE085: 0x7165,
	    0xE086: 0x7155,
	    0xE087: 0x7188,
	    0xE088: 0x7166,
	    0xE089: 0x7162,
	    0xE08A: 0x714C,
	    0xE08B: 0x7156,
	    0xE08C: 0x716C,
	    0xE08D: 0x718F,
	    0xE08E: 0x71FB,
	    0xE08F: 0x7184,
	    0xE090: 0x7195,
	    0xE091: 0x71A8,
	    0xE092: 0x71AC,
	    0xE093: 0x71D7,
	    0xE094: 0x71B9,
	    0xE095: 0x71BE,
	    0xE096: 0x71D2,
	    0xE097: 0x71C9,
	    0xE098: 0x71D4,
	    0xE099: 0x71CE,
	    0xE09A: 0x71E0,
	    0xE09B: 0x71EC,
	    0xE09C: 0x71E7,
	    0xE09D: 0x71F5,
	    0xE09E: 0x71FC,
	    0xE09F: 0x71F9,
	    0xE0A0: 0x71FF,
	    0xE0A1: 0x720D,
	    0xE0A2: 0x7210,
	    0xE0A3: 0x721B,
	    0xE0A4: 0x7228,
	    0xE0A5: 0x722D,
	    0xE0A6: 0x722C,
	    0xE0A7: 0x7230,
	    0xE0A8: 0x7232,
	    0xE0A9: 0x723B,
	    0xE0AA: 0x723C,
	    0xE0AB: 0x723F,
	    0xE0AC: 0x7240,
	    0xE0AD: 0x7246,
	    0xE0AE: 0x724B,
	    0xE0AF: 0x7258,
	    0xE0B0: 0x7274,
	    0xE0B1: 0x727E,
	    0xE0B2: 0x7282,
	    0xE0B3: 0x7281,
	    0xE0B4: 0x7287,
	    0xE0B5: 0x7292,
	    0xE0B6: 0x7296,
	    0xE0B7: 0x72A2,
	    0xE0B8: 0x72A7,
	    0xE0B9: 0x72B9,
	    0xE0BA: 0x72B2,
	    0xE0BB: 0x72C3,
	    0xE0BC: 0x72C6,
	    0xE0BD: 0x72C4,
	    0xE0BE: 0x72CE,
	    0xE0BF: 0x72D2,
	    0xE0C0: 0x72E2,
	    0xE0C1: 0x72E0,
	    0xE0C2: 0x72E1,
	    0xE0C3: 0x72F9,
	    0xE0C4: 0x72F7,
	    0xE0C5: 0x500F,
	    0xE0C6: 0x7317,
	    0xE0C7: 0x730A,
	    0xE0C8: 0x731C,
	    0xE0C9: 0x7316,
	    0xE0CA: 0x731D,
	    0xE0CB: 0x7334,
	    0xE0CC: 0x732F,
	    0xE0CD: 0x7329,
	    0xE0CE: 0x7325,
	    0xE0CF: 0x733E,
	    0xE0D0: 0x734E,
	    0xE0D1: 0x734F,
	    0xE0D2: 0x9ED8,
	    0xE0D3: 0x7357,
	    0xE0D4: 0x736A,
	    0xE0D5: 0x7368,
	    0xE0D6: 0x7370,
	    0xE0D7: 0x7378,
	    0xE0D8: 0x7375,
	    0xE0D9: 0x737B,
	    0xE0DA: 0x737A,
	    0xE0DB: 0x73C8,
	    0xE0DC: 0x73B3,
	    0xE0DD: 0x73CE,
	    0xE0DE: 0x73BB,
	    0xE0DF: 0x73C0,
	    0xE0E0: 0x73E5,
	    0xE0E1: 0x73EE,
	    0xE0E2: 0x73DE,
	    0xE0E3: 0x74A2,
	    0xE0E4: 0x7405,
	    0xE0E5: 0x746F,
	    0xE0E6: 0x7425,
	    0xE0E7: 0x73F8,
	    0xE0E8: 0x7432,
	    0xE0E9: 0x743A,
	    0xE0EA: 0x7455,
	    0xE0EB: 0x743F,
	    0xE0EC: 0x745F,
	    0xE0ED: 0x7459,
	    0xE0EE: 0x7441,
	    0xE0EF: 0x745C,
	    0xE0F0: 0x7469,
	    0xE0F1: 0x7470,
	    0xE0F2: 0x7463,
	    0xE0F3: 0x746A,
	    0xE0F4: 0x7476,
	    0xE0F5: 0x747E,
	    0xE0F6: 0x748B,
	    0xE0F7: 0x749E,
	    0xE0F8: 0x74A7,
	    0xE0F9: 0x74CA,
	    0xE0FA: 0x74CF,
	    0xE0FB: 0x74D4,
	    0xE0FC: 0x73F1,
	    0xE140: 0x74E0,
	    0xE141: 0x74E3,
	    0xE142: 0x74E7,
	    0xE143: 0x74E9,
	    0xE144: 0x74EE,
	    0xE145: 0x74F2,
	    0xE146: 0x74F0,
	    0xE147: 0x74F1,
	    0xE148: 0x74F8,
	    0xE149: 0x74F7,
	    0xE14A: 0x7504,
	    0xE14B: 0x7503,
	    0xE14C: 0x7505,
	    0xE14D: 0x750C,
	    0xE14E: 0x750E,
	    0xE14F: 0x750D,
	    0xE150: 0x7515,
	    0xE151: 0x7513,
	    0xE152: 0x751E,
	    0xE153: 0x7526,
	    0xE154: 0x752C,
	    0xE155: 0x753C,
	    0xE156: 0x7544,
	    0xE157: 0x754D,
	    0xE158: 0x754A,
	    0xE159: 0x7549,
	    0xE15A: 0x755B,
	    0xE15B: 0x7546,
	    0xE15C: 0x755A,
	    0xE15D: 0x7569,
	    0xE15E: 0x7564,
	    0xE15F: 0x7567,
	    0xE160: 0x756B,
	    0xE161: 0x756D,
	    0xE162: 0x7578,
	    0xE163: 0x7576,
	    0xE164: 0x7586,
	    0xE165: 0x7587,
	    0xE166: 0x7574,
	    0xE167: 0x758A,
	    0xE168: 0x7589,
	    0xE169: 0x7582,
	    0xE16A: 0x7594,
	    0xE16B: 0x759A,
	    0xE16C: 0x759D,
	    0xE16D: 0x75A5,
	    0xE16E: 0x75A3,
	    0xE16F: 0x75C2,
	    0xE170: 0x75B3,
	    0xE171: 0x75C3,
	    0xE172: 0x75B5,
	    0xE173: 0x75BD,
	    0xE174: 0x75B8,
	    0xE175: 0x75BC,
	    0xE176: 0x75B1,
	    0xE177: 0x75CD,
	    0xE178: 0x75CA,
	    0xE179: 0x75D2,
	    0xE17A: 0x75D9,
	    0xE17B: 0x75E3,
	    0xE17C: 0x75DE,
	    0xE17D: 0x75FE,
	    0xE17E: 0x75FF,
	    0xE180: 0x75FC,
	    0xE181: 0x7601,
	    0xE182: 0x75F0,
	    0xE183: 0x75FA,
	    0xE184: 0x75F2,
	    0xE185: 0x75F3,
	    0xE186: 0x760B,
	    0xE187: 0x760D,
	    0xE188: 0x7609,
	    0xE189: 0x761F,
	    0xE18A: 0x7627,
	    0xE18B: 0x7620,
	    0xE18C: 0x7621,
	    0xE18D: 0x7622,
	    0xE18E: 0x7624,
	    0xE18F: 0x7634,
	    0xE190: 0x7630,
	    0xE191: 0x763B,
	    0xE192: 0x7647,
	    0xE193: 0x7648,
	    0xE194: 0x7646,
	    0xE195: 0x765C,
	    0xE196: 0x7658,
	    0xE197: 0x7661,
	    0xE198: 0x7662,
	    0xE199: 0x7668,
	    0xE19A: 0x7669,
	    0xE19B: 0x766A,
	    0xE19C: 0x7667,
	    0xE19D: 0x766C,
	    0xE19E: 0x7670,
	    0xE19F: 0x7672,
	    0xE1A0: 0x7676,
	    0xE1A1: 0x7678,
	    0xE1A2: 0x767C,
	    0xE1A3: 0x7680,
	    0xE1A4: 0x7683,
	    0xE1A5: 0x7688,
	    0xE1A6: 0x768B,
	    0xE1A7: 0x768E,
	    0xE1A8: 0x7696,
	    0xE1A9: 0x7693,
	    0xE1AA: 0x7699,
	    0xE1AB: 0x769A,
	    0xE1AC: 0x76B0,
	    0xE1AD: 0x76B4,
	    0xE1AE: 0x76B8,
	    0xE1AF: 0x76B9,
	    0xE1B0: 0x76BA,
	    0xE1B1: 0x76C2,
	    0xE1B2: 0x76CD,
	    0xE1B3: 0x76D6,
	    0xE1B4: 0x76D2,
	    0xE1B5: 0x76DE,
	    0xE1B6: 0x76E1,
	    0xE1B7: 0x76E5,
	    0xE1B8: 0x76E7,
	    0xE1B9: 0x76EA,
	    0xE1BA: 0x862F,
	    0xE1BB: 0x76FB,
	    0xE1BC: 0x7708,
	    0xE1BD: 0x7707,
	    0xE1BE: 0x7704,
	    0xE1BF: 0x7729,
	    0xE1C0: 0x7724,
	    0xE1C1: 0x771E,
	    0xE1C2: 0x7725,
	    0xE1C3: 0x7726,
	    0xE1C4: 0x771B,
	    0xE1C5: 0x7737,
	    0xE1C6: 0x7738,
	    0xE1C7: 0x7747,
	    0xE1C8: 0x775A,
	    0xE1C9: 0x7768,
	    0xE1CA: 0x776B,
	    0xE1CB: 0x775B,
	    0xE1CC: 0x7765,
	    0xE1CD: 0x777F,
	    0xE1CE: 0x777E,
	    0xE1CF: 0x7779,
	    0xE1D0: 0x778E,
	    0xE1D1: 0x778B,
	    0xE1D2: 0x7791,
	    0xE1D3: 0x77A0,
	    0xE1D4: 0x779E,
	    0xE1D5: 0x77B0,
	    0xE1D6: 0x77B6,
	    0xE1D7: 0x77B9,
	    0xE1D8: 0x77BF,
	    0xE1D9: 0x77BC,
	    0xE1DA: 0x77BD,
	    0xE1DB: 0x77BB,
	    0xE1DC: 0x77C7,
	    0xE1DD: 0x77CD,
	    0xE1DE: 0x77D7,
	    0xE1DF: 0x77DA,
	    0xE1E0: 0x77DC,
	    0xE1E1: 0x77E3,
	    0xE1E2: 0x77EE,
	    0xE1E3: 0x77FC,
	    0xE1E4: 0x780C,
	    0xE1E5: 0x7812,
	    0xE1E6: 0x7926,
	    0xE1E7: 0x7820,
	    0xE1E8: 0x792A,
	    0xE1E9: 0x7845,
	    0xE1EA: 0x788E,
	    0xE1EB: 0x7874,
	    0xE1EC: 0x7886,
	    0xE1ED: 0x787C,
	    0xE1EE: 0x789A,
	    0xE1EF: 0x788C,
	    0xE1F0: 0x78A3,
	    0xE1F1: 0x78B5,
	    0xE1F2: 0x78AA,
	    0xE1F3: 0x78AF,
	    0xE1F4: 0x78D1,
	    0xE1F5: 0x78C6,
	    0xE1F6: 0x78CB,
	    0xE1F7: 0x78D4,
	    0xE1F8: 0x78BE,
	    0xE1F9: 0x78BC,
	    0xE1FA: 0x78C5,
	    0xE1FB: 0x78CA,
	    0xE1FC: 0x78EC,
	    0xE240: 0x78E7,
	    0xE241: 0x78DA,
	    0xE242: 0x78FD,
	    0xE243: 0x78F4,
	    0xE244: 0x7907,
	    0xE245: 0x7912,
	    0xE246: 0x7911,
	    0xE247: 0x7919,
	    0xE248: 0x792C,
	    0xE249: 0x792B,
	    0xE24A: 0x7940,
	    0xE24B: 0x7960,
	    0xE24C: 0x7957,
	    0xE24D: 0x795F,
	    0xE24E: 0x795A,
	    0xE24F: 0x7955,
	    0xE250: 0x7953,
	    0xE251: 0x797A,
	    0xE252: 0x797F,
	    0xE253: 0x798A,
	    0xE254: 0x799D,
	    0xE255: 0x79A7,
	    0xE256: 0x9F4B,
	    0xE257: 0x79AA,
	    0xE258: 0x79AE,
	    0xE259: 0x79B3,
	    0xE25A: 0x79B9,
	    0xE25B: 0x79BA,
	    0xE25C: 0x79C9,
	    0xE25D: 0x79D5,
	    0xE25E: 0x79E7,
	    0xE25F: 0x79EC,
	    0xE260: 0x79E1,
	    0xE261: 0x79E3,
	    0xE262: 0x7A08,
	    0xE263: 0x7A0D,
	    0xE264: 0x7A18,
	    0xE265: 0x7A19,
	    0xE266: 0x7A20,
	    0xE267: 0x7A1F,
	    0xE268: 0x7980,
	    0xE269: 0x7A31,
	    0xE26A: 0x7A3B,
	    0xE26B: 0x7A3E,
	    0xE26C: 0x7A37,
	    0xE26D: 0x7A43,
	    0xE26E: 0x7A57,
	    0xE26F: 0x7A49,
	    0xE270: 0x7A61,
	    0xE271: 0x7A62,
	    0xE272: 0x7A69,
	    0xE273: 0x9F9D,
	    0xE274: 0x7A70,
	    0xE275: 0x7A79,
	    0xE276: 0x7A7D,
	    0xE277: 0x7A88,
	    0xE278: 0x7A97,
	    0xE279: 0x7A95,
	    0xE27A: 0x7A98,
	    0xE27B: 0x7A96,
	    0xE27C: 0x7AA9,
	    0xE27D: 0x7AC8,
	    0xE27E: 0x7AB0,
	    0xE280: 0x7AB6,
	    0xE281: 0x7AC5,
	    0xE282: 0x7AC4,
	    0xE283: 0x7ABF,
	    0xE284: 0x9083,
	    0xE285: 0x7AC7,
	    0xE286: 0x7ACA,
	    0xE287: 0x7ACD,
	    0xE288: 0x7ACF,
	    0xE289: 0x7AD5,
	    0xE28A: 0x7AD3,
	    0xE28B: 0x7AD9,
	    0xE28C: 0x7ADA,
	    0xE28D: 0x7ADD,
	    0xE28E: 0x7AE1,
	    0xE28F: 0x7AE2,
	    0xE290: 0x7AE6,
	    0xE291: 0x7AED,
	    0xE292: 0x7AF0,
	    0xE293: 0x7B02,
	    0xE294: 0x7B0F,
	    0xE295: 0x7B0A,
	    0xE296: 0x7B06,
	    0xE297: 0x7B33,
	    0xE298: 0x7B18,
	    0xE299: 0x7B19,
	    0xE29A: 0x7B1E,
	    0xE29B: 0x7B35,
	    0xE29C: 0x7B28,
	    0xE29D: 0x7B36,
	    0xE29E: 0x7B50,
	    0xE29F: 0x7B7A,
	    0xE2A0: 0x7B04,
	    0xE2A1: 0x7B4D,
	    0xE2A2: 0x7B0B,
	    0xE2A3: 0x7B4C,
	    0xE2A4: 0x7B45,
	    0xE2A5: 0x7B75,
	    0xE2A6: 0x7B65,
	    0xE2A7: 0x7B74,
	    0xE2A8: 0x7B67,
	    0xE2A9: 0x7B70,
	    0xE2AA: 0x7B71,
	    0xE2AB: 0x7B6C,
	    0xE2AC: 0x7B6E,
	    0xE2AD: 0x7B9D,
	    0xE2AE: 0x7B98,
	    0xE2AF: 0x7B9F,
	    0xE2B0: 0x7B8D,
	    0xE2B1: 0x7B9C,
	    0xE2B2: 0x7B9A,
	    0xE2B3: 0x7B8B,
	    0xE2B4: 0x7B92,
	    0xE2B5: 0x7B8F,
	    0xE2B6: 0x7B5D,
	    0xE2B7: 0x7B99,
	    0xE2B8: 0x7BCB,
	    0xE2B9: 0x7BC1,
	    0xE2BA: 0x7BCC,
	    0xE2BB: 0x7BCF,
	    0xE2BC: 0x7BB4,
	    0xE2BD: 0x7BC6,
	    0xE2BE: 0x7BDD,
	    0xE2BF: 0x7BE9,
	    0xE2C0: 0x7C11,
	    0xE2C1: 0x7C14,
	    0xE2C2: 0x7BE6,
	    0xE2C3: 0x7BE5,
	    0xE2C4: 0x7C60,
	    0xE2C5: 0x7C00,
	    0xE2C6: 0x7C07,
	    0xE2C7: 0x7C13,
	    0xE2C8: 0x7BF3,
	    0xE2C9: 0x7BF7,
	    0xE2CA: 0x7C17,
	    0xE2CB: 0x7C0D,
	    0xE2CC: 0x7BF6,
	    0xE2CD: 0x7C23,
	    0xE2CE: 0x7C27,
	    0xE2CF: 0x7C2A,
	    0xE2D0: 0x7C1F,
	    0xE2D1: 0x7C37,
	    0xE2D2: 0x7C2B,
	    0xE2D3: 0x7C3D,
	    0xE2D4: 0x7C4C,
	    0xE2D5: 0x7C43,
	    0xE2D6: 0x7C54,
	    0xE2D7: 0x7C4F,
	    0xE2D8: 0x7C40,
	    0xE2D9: 0x7C50,
	    0xE2DA: 0x7C58,
	    0xE2DB: 0x7C5F,
	    0xE2DC: 0x7C64,
	    0xE2DD: 0x7C56,
	    0xE2DE: 0x7C65,
	    0xE2DF: 0x7C6C,
	    0xE2E0: 0x7C75,
	    0xE2E1: 0x7C83,
	    0xE2E2: 0x7C90,
	    0xE2E3: 0x7CA4,
	    0xE2E4: 0x7CAD,
	    0xE2E5: 0x7CA2,
	    0xE2E6: 0x7CAB,
	    0xE2E7: 0x7CA1,
	    0xE2E8: 0x7CA8,
	    0xE2E9: 0x7CB3,
	    0xE2EA: 0x7CB2,
	    0xE2EB: 0x7CB1,
	    0xE2EC: 0x7CAE,
	    0xE2ED: 0x7CB9,
	    0xE2EE: 0x7CBD,
	    0xE2EF: 0x7CC0,
	    0xE2F0: 0x7CC5,
	    0xE2F1: 0x7CC2,
	    0xE2F2: 0x7CD8,
	    0xE2F3: 0x7CD2,
	    0xE2F4: 0x7CDC,
	    0xE2F5: 0x7CE2,
	    0xE2F6: 0x9B3B,
	    0xE2F7: 0x7CEF,
	    0xE2F8: 0x7CF2,
	    0xE2F9: 0x7CF4,
	    0xE2FA: 0x7CF6,
	    0xE2FB: 0x7CFA,
	    0xE2FC: 0x7D06,
	    0xE340: 0x7D02,
	    0xE341: 0x7D1C,
	    0xE342: 0x7D15,
	    0xE343: 0x7D0A,
	    0xE344: 0x7D45,
	    0xE345: 0x7D4B,
	    0xE346: 0x7D2E,
	    0xE347: 0x7D32,
	    0xE348: 0x7D3F,
	    0xE349: 0x7D35,
	    0xE34A: 0x7D46,
	    0xE34B: 0x7D73,
	    0xE34C: 0x7D56,
	    0xE34D: 0x7D4E,
	    0xE34E: 0x7D72,
	    0xE34F: 0x7D68,
	    0xE350: 0x7D6E,
	    0xE351: 0x7D4F,
	    0xE352: 0x7D63,
	    0xE353: 0x7D93,
	    0xE354: 0x7D89,
	    0xE355: 0x7D5B,
	    0xE356: 0x7D8F,
	    0xE357: 0x7D7D,
	    0xE358: 0x7D9B,
	    0xE359: 0x7DBA,
	    0xE35A: 0x7DAE,
	    0xE35B: 0x7DA3,
	    0xE35C: 0x7DB5,
	    0xE35D: 0x7DC7,
	    0xE35E: 0x7DBD,
	    0xE35F: 0x7DAB,
	    0xE360: 0x7E3D,
	    0xE361: 0x7DA2,
	    0xE362: 0x7DAF,
	    0xE363: 0x7DDC,
	    0xE364: 0x7DB8,
	    0xE365: 0x7D9F,
	    0xE366: 0x7DB0,
	    0xE367: 0x7DD8,
	    0xE368: 0x7DDD,
	    0xE369: 0x7DE4,
	    0xE36A: 0x7DDE,
	    0xE36B: 0x7DFB,
	    0xE36C: 0x7DF2,
	    0xE36D: 0x7DE1,
	    0xE36E: 0x7E05,
	    0xE36F: 0x7E0A,
	    0xE370: 0x7E23,
	    0xE371: 0x7E21,
	    0xE372: 0x7E12,
	    0xE373: 0x7E31,
	    0xE374: 0x7E1F,
	    0xE375: 0x7E09,
	    0xE376: 0x7E0B,
	    0xE377: 0x7E22,
	    0xE378: 0x7E46,
	    0xE379: 0x7E66,
	    0xE37A: 0x7E3B,
	    0xE37B: 0x7E35,
	    0xE37C: 0x7E39,
	    0xE37D: 0x7E43,
	    0xE37E: 0x7E37,
	    0xE380: 0x7E32,
	    0xE381: 0x7E3A,
	    0xE382: 0x7E67,
	    0xE383: 0x7E5D,
	    0xE384: 0x7E56,
	    0xE385: 0x7E5E,
	    0xE386: 0x7E59,
	    0xE387: 0x7E5A,
	    0xE388: 0x7E79,
	    0xE389: 0x7E6A,
	    0xE38A: 0x7E69,
	    0xE38B: 0x7E7C,
	    0xE38C: 0x7E7B,
	    0xE38D: 0x7E83,
	    0xE38E: 0x7DD5,
	    0xE38F: 0x7E7D,
	    0xE390: 0x8FAE,
	    0xE391: 0x7E7F,
	    0xE392: 0x7E88,
	    0xE393: 0x7E89,
	    0xE394: 0x7E8C,
	    0xE395: 0x7E92,
	    0xE396: 0x7E90,
	    0xE397: 0x7E93,
	    0xE398: 0x7E94,
	    0xE399: 0x7E96,
	    0xE39A: 0x7E8E,
	    0xE39B: 0x7E9B,
	    0xE39C: 0x7E9C,
	    0xE39D: 0x7F38,
	    0xE39E: 0x7F3A,
	    0xE39F: 0x7F45,
	    0xE3A0: 0x7F4C,
	    0xE3A1: 0x7F4D,
	    0xE3A2: 0x7F4E,
	    0xE3A3: 0x7F50,
	    0xE3A4: 0x7F51,
	    0xE3A5: 0x7F55,
	    0xE3A6: 0x7F54,
	    0xE3A7: 0x7F58,
	    0xE3A8: 0x7F5F,
	    0xE3A9: 0x7F60,
	    0xE3AA: 0x7F68,
	    0xE3AB: 0x7F69,
	    0xE3AC: 0x7F67,
	    0xE3AD: 0x7F78,
	    0xE3AE: 0x7F82,
	    0xE3AF: 0x7F86,
	    0xE3B0: 0x7F83,
	    0xE3B1: 0x7F88,
	    0xE3B2: 0x7F87,
	    0xE3B3: 0x7F8C,
	    0xE3B4: 0x7F94,
	    0xE3B5: 0x7F9E,
	    0xE3B6: 0x7F9D,
	    0xE3B7: 0x7F9A,
	    0xE3B8: 0x7FA3,
	    0xE3B9: 0x7FAF,
	    0xE3BA: 0x7FB2,
	    0xE3BB: 0x7FB9,
	    0xE3BC: 0x7FAE,
	    0xE3BD: 0x7FB6,
	    0xE3BE: 0x7FB8,
	    0xE3BF: 0x8B71,
	    0xE3C0: 0x7FC5,
	    0xE3C1: 0x7FC6,
	    0xE3C2: 0x7FCA,
	    0xE3C3: 0x7FD5,
	    0xE3C4: 0x7FD4,
	    0xE3C5: 0x7FE1,
	    0xE3C6: 0x7FE6,
	    0xE3C7: 0x7FE9,
	    0xE3C8: 0x7FF3,
	    0xE3C9: 0x7FF9,
	    0xE3CA: 0x98DC,
	    0xE3CB: 0x8006,
	    0xE3CC: 0x8004,
	    0xE3CD: 0x800B,
	    0xE3CE: 0x8012,
	    0xE3CF: 0x8018,
	    0xE3D0: 0x8019,
	    0xE3D1: 0x801C,
	    0xE3D2: 0x8021,
	    0xE3D3: 0x8028,
	    0xE3D4: 0x803F,
	    0xE3D5: 0x803B,
	    0xE3D6: 0x804A,
	    0xE3D7: 0x8046,
	    0xE3D8: 0x8052,
	    0xE3D9: 0x8058,
	    0xE3DA: 0x805A,
	    0xE3DB: 0x805F,
	    0xE3DC: 0x8062,
	    0xE3DD: 0x8068,
	    0xE3DE: 0x8073,
	    0xE3DF: 0x8072,
	    0xE3E0: 0x8070,
	    0xE3E1: 0x8076,
	    0xE3E2: 0x8079,
	    0xE3E3: 0x807D,
	    0xE3E4: 0x807F,
	    0xE3E5: 0x8084,
	    0xE3E6: 0x8086,
	    0xE3E7: 0x8085,
	    0xE3E8: 0x809B,
	    0xE3E9: 0x8093,
	    0xE3EA: 0x809A,
	    0xE3EB: 0x80AD,
	    0xE3EC: 0x5190,
	    0xE3ED: 0x80AC,
	    0xE3EE: 0x80DB,
	    0xE3EF: 0x80E5,
	    0xE3F0: 0x80D9,
	    0xE3F1: 0x80DD,
	    0xE3F2: 0x80C4,
	    0xE3F3: 0x80DA,
	    0xE3F4: 0x80D6,
	    0xE3F5: 0x8109,
	    0xE3F6: 0x80EF,
	    0xE3F7: 0x80F1,
	    0xE3F8: 0x811B,
	    0xE3F9: 0x8129,
	    0xE3FA: 0x8123,
	    0xE3FB: 0x812F,
	    0xE3FC: 0x814B,
	    0xE440: 0x968B,
	    0xE441: 0x8146,
	    0xE442: 0x813E,
	    0xE443: 0x8153,
	    0xE444: 0x8151,
	    0xE445: 0x80FC,
	    0xE446: 0x8171,
	    0xE447: 0x816E,
	    0xE448: 0x8165,
	    0xE449: 0x8166,
	    0xE44A: 0x8174,
	    0xE44B: 0x8183,
	    0xE44C: 0x8188,
	    0xE44D: 0x818A,
	    0xE44E: 0x8180,
	    0xE44F: 0x8182,
	    0xE450: 0x81A0,
	    0xE451: 0x8195,
	    0xE452: 0x81A4,
	    0xE453: 0x81A3,
	    0xE454: 0x815F,
	    0xE455: 0x8193,
	    0xE456: 0x81A9,
	    0xE457: 0x81B0,
	    0xE458: 0x81B5,
	    0xE459: 0x81BE,
	    0xE45A: 0x81B8,
	    0xE45B: 0x81BD,
	    0xE45C: 0x81C0,
	    0xE45D: 0x81C2,
	    0xE45E: 0x81BA,
	    0xE45F: 0x81C9,
	    0xE460: 0x81CD,
	    0xE461: 0x81D1,
	    0xE462: 0x81D9,
	    0xE463: 0x81D8,
	    0xE464: 0x81C8,
	    0xE465: 0x81DA,
	    0xE466: 0x81DF,
	    0xE467: 0x81E0,
	    0xE468: 0x81E7,
	    0xE469: 0x81FA,
	    0xE46A: 0x81FB,
	    0xE46B: 0x81FE,
	    0xE46C: 0x8201,
	    0xE46D: 0x8202,
	    0xE46E: 0x8205,
	    0xE46F: 0x8207,
	    0xE470: 0x820A,
	    0xE471: 0x820D,
	    0xE472: 0x8210,
	    0xE473: 0x8216,
	    0xE474: 0x8229,
	    0xE475: 0x822B,
	    0xE476: 0x8238,
	    0xE477: 0x8233,
	    0xE478: 0x8240,
	    0xE479: 0x8259,
	    0xE47A: 0x8258,
	    0xE47B: 0x825D,
	    0xE47C: 0x825A,
	    0xE47D: 0x825F,
	    0xE47E: 0x8264,
	    0xE480: 0x8262,
	    0xE481: 0x8268,
	    0xE482: 0x826A,
	    0xE483: 0x826B,
	    0xE484: 0x822E,
	    0xE485: 0x8271,
	    0xE486: 0x8277,
	    0xE487: 0x8278,
	    0xE488: 0x827E,
	    0xE489: 0x828D,
	    0xE48A: 0x8292,
	    0xE48B: 0x82AB,
	    0xE48C: 0x829F,
	    0xE48D: 0x82BB,
	    0xE48E: 0x82AC,
	    0xE48F: 0x82E1,
	    0xE490: 0x82E3,
	    0xE491: 0x82DF,
	    0xE492: 0x82D2,
	    0xE493: 0x82F4,
	    0xE494: 0x82F3,
	    0xE495: 0x82FA,
	    0xE496: 0x8393,
	    0xE497: 0x8303,
	    0xE498: 0x82FB,
	    0xE499: 0x82F9,
	    0xE49A: 0x82DE,
	    0xE49B: 0x8306,
	    0xE49C: 0x82DC,
	    0xE49D: 0x8309,
	    0xE49E: 0x82D9,
	    0xE49F: 0x8335,
	    0xE4A0: 0x8334,
	    0xE4A1: 0x8316,
	    0xE4A2: 0x8332,
	    0xE4A3: 0x8331,
	    0xE4A4: 0x8340,
	    0xE4A5: 0x8339,
	    0xE4A6: 0x8350,
	    0xE4A7: 0x8345,
	    0xE4A8: 0x832F,
	    0xE4A9: 0x832B,
	    0xE4AA: 0x8317,
	    0xE4AB: 0x8318,
	    0xE4AC: 0x8385,
	    0xE4AD: 0x839A,
	    0xE4AE: 0x83AA,
	    0xE4AF: 0x839F,
	    0xE4B0: 0x83A2,
	    0xE4B1: 0x8396,
	    0xE4B2: 0x8323,
	    0xE4B3: 0x838E,
	    0xE4B4: 0x8387,
	    0xE4B5: 0x838A,
	    0xE4B6: 0x837C,
	    0xE4B7: 0x83B5,
	    0xE4B8: 0x8373,
	    0xE4B9: 0x8375,
	    0xE4BA: 0x83A0,
	    0xE4BB: 0x8389,
	    0xE4BC: 0x83A8,
	    0xE4BD: 0x83F4,
	    0xE4BE: 0x8413,
	    0xE4BF: 0x83EB,
	    0xE4C0: 0x83CE,
	    0xE4C1: 0x83FD,
	    0xE4C2: 0x8403,
	    0xE4C3: 0x83D8,
	    0xE4C4: 0x840B,
	    0xE4C5: 0x83C1,
	    0xE4C6: 0x83F7,
	    0xE4C7: 0x8407,
	    0xE4C8: 0x83E0,
	    0xE4C9: 0x83F2,
	    0xE4CA: 0x840D,
	    0xE4CB: 0x8422,
	    0xE4CC: 0x8420,
	    0xE4CD: 0x83BD,
	    0xE4CE: 0x8438,
	    0xE4CF: 0x8506,
	    0xE4D0: 0x83FB,
	    0xE4D1: 0x846D,
	    0xE4D2: 0x842A,
	    0xE4D3: 0x843C,
	    0xE4D4: 0x855A,
	    0xE4D5: 0x8484,
	    0xE4D6: 0x8477,
	    0xE4D7: 0x846B,
	    0xE4D8: 0x84AD,
	    0xE4D9: 0x846E,
	    0xE4DA: 0x8482,
	    0xE4DB: 0x8469,
	    0xE4DC: 0x8446,
	    0xE4DD: 0x842C,
	    0xE4DE: 0x846F,
	    0xE4DF: 0x8479,
	    0xE4E0: 0x8435,
	    0xE4E1: 0x84CA,
	    0xE4E2: 0x8462,
	    0xE4E3: 0x84B9,
	    0xE4E4: 0x84BF,
	    0xE4E5: 0x849F,
	    0xE4E6: 0x84D9,
	    0xE4E7: 0x84CD,
	    0xE4E8: 0x84BB,
	    0xE4E9: 0x84DA,
	    0xE4EA: 0x84D0,
	    0xE4EB: 0x84C1,
	    0xE4EC: 0x84C6,
	    0xE4ED: 0x84D6,
	    0xE4EE: 0x84A1,
	    0xE4EF: 0x8521,
	    0xE4F0: 0x84FF,
	    0xE4F1: 0x84F4,
	    0xE4F2: 0x8517,
	    0xE4F3: 0x8518,
	    0xE4F4: 0x852C,
	    0xE4F5: 0x851F,
	    0xE4F6: 0x8515,
	    0xE4F7: 0x8514,
	    0xE4F8: 0x84FC,
	    0xE4F9: 0x8540,
	    0xE4FA: 0x8563,
	    0xE4FB: 0x8558,
	    0xE4FC: 0x8548,
	    0xE540: 0x8541,
	    0xE541: 0x8602,
	    0xE542: 0x854B,
	    0xE543: 0x8555,
	    0xE544: 0x8580,
	    0xE545: 0x85A4,
	    0xE546: 0x8588,
	    0xE547: 0x8591,
	    0xE548: 0x858A,
	    0xE549: 0x85A8,
	    0xE54A: 0x856D,
	    0xE54B: 0x8594,
	    0xE54C: 0x859B,
	    0xE54D: 0x85EA,
	    0xE54E: 0x8587,
	    0xE54F: 0x859C,
	    0xE550: 0x8577,
	    0xE551: 0x857E,
	    0xE552: 0x8590,
	    0xE553: 0x85C9,
	    0xE554: 0x85BA,
	    0xE555: 0x85CF,
	    0xE556: 0x85B9,
	    0xE557: 0x85D0,
	    0xE558: 0x85D5,
	    0xE559: 0x85DD,
	    0xE55A: 0x85E5,
	    0xE55B: 0x85DC,
	    0xE55C: 0x85F9,
	    0xE55D: 0x860A,
	    0xE55E: 0x8613,
	    0xE55F: 0x860B,
	    0xE560: 0x85FE,
	    0xE561: 0x85FA,
	    0xE562: 0x8606,
	    0xE563: 0x8622,
	    0xE564: 0x861A,
	    0xE565: 0x8630,
	    0xE566: 0x863F,
	    0xE567: 0x864D,
	    0xE568: 0x4E55,
	    0xE569: 0x8654,
	    0xE56A: 0x865F,
	    0xE56B: 0x8667,
	    0xE56C: 0x8671,
	    0xE56D: 0x8693,
	    0xE56E: 0x86A3,
	    0xE56F: 0x86A9,
	    0xE570: 0x86AA,
	    0xE571: 0x868B,
	    0xE572: 0x868C,
	    0xE573: 0x86B6,
	    0xE574: 0x86AF,
	    0xE575: 0x86C4,
	    0xE576: 0x86C6,
	    0xE577: 0x86B0,
	    0xE578: 0x86C9,
	    0xE579: 0x8823,
	    0xE57A: 0x86AB,
	    0xE57B: 0x86D4,
	    0xE57C: 0x86DE,
	    0xE57D: 0x86E9,
	    0xE57E: 0x86EC,
	    0xE580: 0x86DF,
	    0xE581: 0x86DB,
	    0xE582: 0x86EF,
	    0xE583: 0x8712,
	    0xE584: 0x8706,
	    0xE585: 0x8708,
	    0xE586: 0x8700,
	    0xE587: 0x8703,
	    0xE588: 0x86FB,
	    0xE589: 0x8711,
	    0xE58A: 0x8709,
	    0xE58B: 0x870D,
	    0xE58C: 0x86F9,
	    0xE58D: 0x870A,
	    0xE58E: 0x8734,
	    0xE58F: 0x873F,
	    0xE590: 0x8737,
	    0xE591: 0x873B,
	    0xE592: 0x8725,
	    0xE593: 0x8729,
	    0xE594: 0x871A,
	    0xE595: 0x8760,
	    0xE596: 0x875F,
	    0xE597: 0x8778,
	    0xE598: 0x874C,
	    0xE599: 0x874E,
	    0xE59A: 0x8774,
	    0xE59B: 0x8757,
	    0xE59C: 0x8768,
	    0xE59D: 0x876E,
	    0xE59E: 0x8759,
	    0xE59F: 0x8753,
	    0xE5A0: 0x8763,
	    0xE5A1: 0x876A,
	    0xE5A2: 0x8805,
	    0xE5A3: 0x87A2,
	    0xE5A4: 0x879F,
	    0xE5A5: 0x8782,
	    0xE5A6: 0x87AF,
	    0xE5A7: 0x87CB,
	    0xE5A8: 0x87BD,
	    0xE5A9: 0x87C0,
	    0xE5AA: 0x87D0,
	    0xE5AB: 0x96D6,
	    0xE5AC: 0x87AB,
	    0xE5AD: 0x87C4,
	    0xE5AE: 0x87B3,
	    0xE5AF: 0x87C7,
	    0xE5B0: 0x87C6,
	    0xE5B1: 0x87BB,
	    0xE5B2: 0x87EF,
	    0xE5B3: 0x87F2,
	    0xE5B4: 0x87E0,
	    0xE5B5: 0x880F,
	    0xE5B6: 0x880D,
	    0xE5B7: 0x87FE,
	    0xE5B8: 0x87F6,
	    0xE5B9: 0x87F7,
	    0xE5BA: 0x880E,
	    0xE5BB: 0x87D2,
	    0xE5BC: 0x8811,
	    0xE5BD: 0x8816,
	    0xE5BE: 0x8815,
	    0xE5BF: 0x8822,
	    0xE5C0: 0x8821,
	    0xE5C1: 0x8831,
	    0xE5C2: 0x8836,
	    0xE5C3: 0x8839,
	    0xE5C4: 0x8827,
	    0xE5C5: 0x883B,
	    0xE5C6: 0x8844,
	    0xE5C7: 0x8842,
	    0xE5C8: 0x8852,
	    0xE5C9: 0x8859,
	    0xE5CA: 0x885E,
	    0xE5CB: 0x8862,
	    0xE5CC: 0x886B,
	    0xE5CD: 0x8881,
	    0xE5CE: 0x887E,
	    0xE5CF: 0x889E,
	    0xE5D0: 0x8875,
	    0xE5D1: 0x887D,
	    0xE5D2: 0x88B5,
	    0xE5D3: 0x8872,
	    0xE5D4: 0x8882,
	    0xE5D5: 0x8897,
	    0xE5D6: 0x8892,
	    0xE5D7: 0x88AE,
	    0xE5D8: 0x8899,
	    0xE5D9: 0x88A2,
	    0xE5DA: 0x888D,
	    0xE5DB: 0x88A4,
	    0xE5DC: 0x88B0,
	    0xE5DD: 0x88BF,
	    0xE5DE: 0x88B1,
	    0xE5DF: 0x88C3,
	    0xE5E0: 0x88C4,
	    0xE5E1: 0x88D4,
	    0xE5E2: 0x88D8,
	    0xE5E3: 0x88D9,
	    0xE5E4: 0x88DD,
	    0xE5E5: 0x88F9,
	    0xE5E6: 0x8902,
	    0xE5E7: 0x88FC,
	    0xE5E8: 0x88F4,
	    0xE5E9: 0x88E8,
	    0xE5EA: 0x88F2,
	    0xE5EB: 0x8904,
	    0xE5EC: 0x890C,
	    0xE5ED: 0x890A,
	    0xE5EE: 0x8913,
	    0xE5EF: 0x8943,
	    0xE5F0: 0x891E,
	    0xE5F1: 0x8925,
	    0xE5F2: 0x892A,
	    0xE5F3: 0x892B,
	    0xE5F4: 0x8941,
	    0xE5F5: 0x8944,
	    0xE5F6: 0x893B,
	    0xE5F7: 0x8936,
	    0xE5F8: 0x8938,
	    0xE5F9: 0x894C,
	    0xE5FA: 0x891D,
	    0xE5FB: 0x8960,
	    0xE5FC: 0x895E,
	    0xE640: 0x8966,
	    0xE641: 0x8964,
	    0xE642: 0x896D,
	    0xE643: 0x896A,
	    0xE644: 0x896F,
	    0xE645: 0x8974,
	    0xE646: 0x8977,
	    0xE647: 0x897E,
	    0xE648: 0x8983,
	    0xE649: 0x8988,
	    0xE64A: 0x898A,
	    0xE64B: 0x8993,
	    0xE64C: 0x8998,
	    0xE64D: 0x89A1,
	    0xE64E: 0x89A9,
	    0xE64F: 0x89A6,
	    0xE650: 0x89AC,
	    0xE651: 0x89AF,
	    0xE652: 0x89B2,
	    0xE653: 0x89BA,
	    0xE654: 0x89BD,
	    0xE655: 0x89BF,
	    0xE656: 0x89C0,
	    0xE657: 0x89DA,
	    0xE658: 0x89DC,
	    0xE659: 0x89DD,
	    0xE65A: 0x89E7,
	    0xE65B: 0x89F4,
	    0xE65C: 0x89F8,
	    0xE65D: 0x8A03,
	    0xE65E: 0x8A16,
	    0xE65F: 0x8A10,
	    0xE660: 0x8A0C,
	    0xE661: 0x8A1B,
	    0xE662: 0x8A1D,
	    0xE663: 0x8A25,
	    0xE664: 0x8A36,
	    0xE665: 0x8A41,
	    0xE666: 0x8A5B,
	    0xE667: 0x8A52,
	    0xE668: 0x8A46,
	    0xE669: 0x8A48,
	    0xE66A: 0x8A7C,
	    0xE66B: 0x8A6D,
	    0xE66C: 0x8A6C,
	    0xE66D: 0x8A62,
	    0xE66E: 0x8A85,
	    0xE66F: 0x8A82,
	    0xE670: 0x8A84,
	    0xE671: 0x8AA8,
	    0xE672: 0x8AA1,
	    0xE673: 0x8A91,
	    0xE674: 0x8AA5,
	    0xE675: 0x8AA6,
	    0xE676: 0x8A9A,
	    0xE677: 0x8AA3,
	    0xE678: 0x8AC4,
	    0xE679: 0x8ACD,
	    0xE67A: 0x8AC2,
	    0xE67B: 0x8ADA,
	    0xE67C: 0x8AEB,
	    0xE67D: 0x8AF3,
	    0xE67E: 0x8AE7,
	    0xE680: 0x8AE4,
	    0xE681: 0x8AF1,
	    0xE682: 0x8B14,
	    0xE683: 0x8AE0,
	    0xE684: 0x8AE2,
	    0xE685: 0x8AF7,
	    0xE686: 0x8ADE,
	    0xE687: 0x8ADB,
	    0xE688: 0x8B0C,
	    0xE689: 0x8B07,
	    0xE68A: 0x8B1A,
	    0xE68B: 0x8AE1,
	    0xE68C: 0x8B16,
	    0xE68D: 0x8B10,
	    0xE68E: 0x8B17,
	    0xE68F: 0x8B20,
	    0xE690: 0x8B33,
	    0xE691: 0x97AB,
	    0xE692: 0x8B26,
	    0xE693: 0x8B2B,
	    0xE694: 0x8B3E,
	    0xE695: 0x8B28,
	    0xE696: 0x8B41,
	    0xE697: 0x8B4C,
	    0xE698: 0x8B4F,
	    0xE699: 0x8B4E,
	    0xE69A: 0x8B49,
	    0xE69B: 0x8B56,
	    0xE69C: 0x8B5B,
	    0xE69D: 0x8B5A,
	    0xE69E: 0x8B6B,
	    0xE69F: 0x8B5F,
	    0xE6A0: 0x8B6C,
	    0xE6A1: 0x8B6F,
	    0xE6A2: 0x8B74,
	    0xE6A3: 0x8B7D,
	    0xE6A4: 0x8B80,
	    0xE6A5: 0x8B8C,
	    0xE6A6: 0x8B8E,
	    0xE6A7: 0x8B92,
	    0xE6A8: 0x8B93,
	    0xE6A9: 0x8B96,
	    0xE6AA: 0x8B99,
	    0xE6AB: 0x8B9A,
	    0xE6AC: 0x8C3A,
	    0xE6AD: 0x8C41,
	    0xE6AE: 0x8C3F,
	    0xE6AF: 0x8C48,
	    0xE6B0: 0x8C4C,
	    0xE6B1: 0x8C4E,
	    0xE6B2: 0x8C50,
	    0xE6B3: 0x8C55,
	    0xE6B4: 0x8C62,
	    0xE6B5: 0x8C6C,
	    0xE6B6: 0x8C78,
	    0xE6B7: 0x8C7A,
	    0xE6B8: 0x8C82,
	    0xE6B9: 0x8C89,
	    0xE6BA: 0x8C85,
	    0xE6BB: 0x8C8A,
	    0xE6BC: 0x8C8D,
	    0xE6BD: 0x8C8E,
	    0xE6BE: 0x8C94,
	    0xE6BF: 0x8C7C,
	    0xE6C0: 0x8C98,
	    0xE6C1: 0x621D,
	    0xE6C2: 0x8CAD,
	    0xE6C3: 0x8CAA,
	    0xE6C4: 0x8CBD,
	    0xE6C5: 0x8CB2,
	    0xE6C6: 0x8CB3,
	    0xE6C7: 0x8CAE,
	    0xE6C8: 0x8CB6,
	    0xE6C9: 0x8CC8,
	    0xE6CA: 0x8CC1,
	    0xE6CB: 0x8CE4,
	    0xE6CC: 0x8CE3,
	    0xE6CD: 0x8CDA,
	    0xE6CE: 0x8CFD,
	    0xE6CF: 0x8CFA,
	    0xE6D0: 0x8CFB,
	    0xE6D1: 0x8D04,
	    0xE6D2: 0x8D05,
	    0xE6D3: 0x8D0A,
	    0xE6D4: 0x8D07,
	    0xE6D5: 0x8D0F,
	    0xE6D6: 0x8D0D,
	    0xE6D7: 0x8D10,
	    0xE6D8: 0x9F4E,
	    0xE6D9: 0x8D13,
	    0xE6DA: 0x8CCD,
	    0xE6DB: 0x8D14,
	    0xE6DC: 0x8D16,
	    0xE6DD: 0x8D67,
	    0xE6DE: 0x8D6D,
	    0xE6DF: 0x8D71,
	    0xE6E0: 0x8D73,
	    0xE6E1: 0x8D81,
	    0xE6E2: 0x8D99,
	    0xE6E3: 0x8DC2,
	    0xE6E4: 0x8DBE,
	    0xE6E5: 0x8DBA,
	    0xE6E6: 0x8DCF,
	    0xE6E7: 0x8DDA,
	    0xE6E8: 0x8DD6,
	    0xE6E9: 0x8DCC,
	    0xE6EA: 0x8DDB,
	    0xE6EB: 0x8DCB,
	    0xE6EC: 0x8DEA,
	    0xE6ED: 0x8DEB,
	    0xE6EE: 0x8DDF,
	    0xE6EF: 0x8DE3,
	    0xE6F0: 0x8DFC,
	    0xE6F1: 0x8E08,
	    0xE6F2: 0x8E09,
	    0xE6F3: 0x8DFF,
	    0xE6F4: 0x8E1D,
	    0xE6F5: 0x8E1E,
	    0xE6F6: 0x8E10,
	    0xE6F7: 0x8E1F,
	    0xE6F8: 0x8E42,
	    0xE6F9: 0x8E35,
	    0xE6FA: 0x8E30,
	    0xE6FB: 0x8E34,
	    0xE6FC: 0x8E4A,
	    0xE740: 0x8E47,
	    0xE741: 0x8E49,
	    0xE742: 0x8E4C,
	    0xE743: 0x8E50,
	    0xE744: 0x8E48,
	    0xE745: 0x8E59,
	    0xE746: 0x8E64,
	    0xE747: 0x8E60,
	    0xE748: 0x8E2A,
	    0xE749: 0x8E63,
	    0xE74A: 0x8E55,
	    0xE74B: 0x8E76,
	    0xE74C: 0x8E72,
	    0xE74D: 0x8E7C,
	    0xE74E: 0x8E81,
	    0xE74F: 0x8E87,
	    0xE750: 0x8E85,
	    0xE751: 0x8E84,
	    0xE752: 0x8E8B,
	    0xE753: 0x8E8A,
	    0xE754: 0x8E93,
	    0xE755: 0x8E91,
	    0xE756: 0x8E94,
	    0xE757: 0x8E99,
	    0xE758: 0x8EAA,
	    0xE759: 0x8EA1,
	    0xE75A: 0x8EAC,
	    0xE75B: 0x8EB0,
	    0xE75C: 0x8EC6,
	    0xE75D: 0x8EB1,
	    0xE75E: 0x8EBE,
	    0xE75F: 0x8EC5,
	    0xE760: 0x8EC8,
	    0xE761: 0x8ECB,
	    0xE762: 0x8EDB,
	    0xE763: 0x8EE3,
	    0xE764: 0x8EFC,
	    0xE765: 0x8EFB,
	    0xE766: 0x8EEB,
	    0xE767: 0x8EFE,
	    0xE768: 0x8F0A,
	    0xE769: 0x8F05,
	    0xE76A: 0x8F15,
	    0xE76B: 0x8F12,
	    0xE76C: 0x8F19,
	    0xE76D: 0x8F13,
	    0xE76E: 0x8F1C,
	    0xE76F: 0x8F1F,
	    0xE770: 0x8F1B,
	    0xE771: 0x8F0C,
	    0xE772: 0x8F26,
	    0xE773: 0x8F33,
	    0xE774: 0x8F3B,
	    0xE775: 0x8F39,
	    0xE776: 0x8F45,
	    0xE777: 0x8F42,
	    0xE778: 0x8F3E,
	    0xE779: 0x8F4C,
	    0xE77A: 0x8F49,
	    0xE77B: 0x8F46,
	    0xE77C: 0x8F4E,
	    0xE77D: 0x8F57,
	    0xE77E: 0x8F5C,
	    0xE780: 0x8F62,
	    0xE781: 0x8F63,
	    0xE782: 0x8F64,
	    0xE783: 0x8F9C,
	    0xE784: 0x8F9F,
	    0xE785: 0x8FA3,
	    0xE786: 0x8FAD,
	    0xE787: 0x8FAF,
	    0xE788: 0x8FB7,
	    0xE789: 0x8FDA,
	    0xE78A: 0x8FE5,
	    0xE78B: 0x8FE2,
	    0xE78C: 0x8FEA,
	    0xE78D: 0x8FEF,
	    0xE78E: 0x9087,
	    0xE78F: 0x8FF4,
	    0xE790: 0x9005,
	    0xE791: 0x8FF9,
	    0xE792: 0x8FFA,
	    0xE793: 0x9011,
	    0xE794: 0x9015,
	    0xE795: 0x9021,
	    0xE796: 0x900D,
	    0xE797: 0x901E,
	    0xE798: 0x9016,
	    0xE799: 0x900B,
	    0xE79A: 0x9027,
	    0xE79B: 0x9036,
	    0xE79C: 0x9035,
	    0xE79D: 0x9039,
	    0xE79E: 0x8FF8,
	    0xE79F: 0x904F,
	    0xE7A0: 0x9050,
	    0xE7A1: 0x9051,
	    0xE7A2: 0x9052,
	    0xE7A3: 0x900E,
	    0xE7A4: 0x9049,
	    0xE7A5: 0x903E,
	    0xE7A6: 0x9056,
	    0xE7A7: 0x9058,
	    0xE7A8: 0x905E,
	    0xE7A9: 0x9068,
	    0xE7AA: 0x906F,
	    0xE7AB: 0x9076,
	    0xE7AC: 0x96A8,
	    0xE7AD: 0x9072,
	    0xE7AE: 0x9082,
	    0xE7AF: 0x907D,
	    0xE7B0: 0x9081,
	    0xE7B1: 0x9080,
	    0xE7B2: 0x908A,
	    0xE7B3: 0x9089,
	    0xE7B4: 0x908F,
	    0xE7B5: 0x90A8,
	    0xE7B6: 0x90AF,
	    0xE7B7: 0x90B1,
	    0xE7B8: 0x90B5,
	    0xE7B9: 0x90E2,
	    0xE7BA: 0x90E4,
	    0xE7BB: 0x6248,
	    0xE7BC: 0x90DB,
	    0xE7BD: 0x9102,
	    0xE7BE: 0x9112,
	    0xE7BF: 0x9119,
	    0xE7C0: 0x9132,
	    0xE7C1: 0x9130,
	    0xE7C2: 0x914A,
	    0xE7C3: 0x9156,
	    0xE7C4: 0x9158,
	    0xE7C5: 0x9163,
	    0xE7C6: 0x9165,
	    0xE7C7: 0x9169,
	    0xE7C8: 0x9173,
	    0xE7C9: 0x9172,
	    0xE7CA: 0x918B,
	    0xE7CB: 0x9189,
	    0xE7CC: 0x9182,
	    0xE7CD: 0x91A2,
	    0xE7CE: 0x91AB,
	    0xE7CF: 0x91AF,
	    0xE7D0: 0x91AA,
	    0xE7D1: 0x91B5,
	    0xE7D2: 0x91B4,
	    0xE7D3: 0x91BA,
	    0xE7D4: 0x91C0,
	    0xE7D5: 0x91C1,
	    0xE7D6: 0x91C9,
	    0xE7D7: 0x91CB,
	    0xE7D8: 0x91D0,
	    0xE7D9: 0x91D6,
	    0xE7DA: 0x91DF,
	    0xE7DB: 0x91E1,
	    0xE7DC: 0x91DB,
	    0xE7DD: 0x91FC,
	    0xE7DE: 0x91F5,
	    0xE7DF: 0x91F6,
	    0xE7E0: 0x921E,
	    0xE7E1: 0x91FF,
	    0xE7E2: 0x9214,
	    0xE7E3: 0x922C,
	    0xE7E4: 0x9215,
	    0xE7E5: 0x9211,
	    0xE7E6: 0x925E,
	    0xE7E7: 0x9257,
	    0xE7E8: 0x9245,
	    0xE7E9: 0x9249,
	    0xE7EA: 0x9264,
	    0xE7EB: 0x9248,
	    0xE7EC: 0x9295,
	    0xE7ED: 0x923F,
	    0xE7EE: 0x924B,
	    0xE7EF: 0x9250,
	    0xE7F0: 0x929C,
	    0xE7F1: 0x9296,
	    0xE7F2: 0x9293,
	    0xE7F3: 0x929B,
	    0xE7F4: 0x925A,
	    0xE7F5: 0x92CF,
	    0xE7F6: 0x92B9,
	    0xE7F7: 0x92B7,
	    0xE7F8: 0x92E9,
	    0xE7F9: 0x930F,
	    0xE7FA: 0x92FA,
	    0xE7FB: 0x9344,
	    0xE7FC: 0x932E,
	    0xE840: 0x9319,
	    0xE841: 0x9322,
	    0xE842: 0x931A,
	    0xE843: 0x9323,
	    0xE844: 0x933A,
	    0xE845: 0x9335,
	    0xE846: 0x933B,
	    0xE847: 0x935C,
	    0xE848: 0x9360,
	    0xE849: 0x937C,
	    0xE84A: 0x936E,
	    0xE84B: 0x9356,
	    0xE84C: 0x93B0,
	    0xE84D: 0x93AC,
	    0xE84E: 0x93AD,
	    0xE84F: 0x9394,
	    0xE850: 0x93B9,
	    0xE851: 0x93D6,
	    0xE852: 0x93D7,
	    0xE853: 0x93E8,
	    0xE854: 0x93E5,
	    0xE855: 0x93D8,
	    0xE856: 0x93C3,
	    0xE857: 0x93DD,
	    0xE858: 0x93D0,
	    0xE859: 0x93C8,
	    0xE85A: 0x93E4,
	    0xE85B: 0x941A,
	    0xE85C: 0x9414,
	    0xE85D: 0x9413,
	    0xE85E: 0x9403,
	    0xE85F: 0x9407,
	    0xE860: 0x9410,
	    0xE861: 0x9436,
	    0xE862: 0x942B,
	    0xE863: 0x9435,
	    0xE864: 0x9421,
	    0xE865: 0x943A,
	    0xE866: 0x9441,
	    0xE867: 0x9452,
	    0xE868: 0x9444,
	    0xE869: 0x945B,
	    0xE86A: 0x9460,
	    0xE86B: 0x9462,
	    0xE86C: 0x945E,
	    0xE86D: 0x946A,
	    0xE86E: 0x9229,
	    0xE86F: 0x9470,
	    0xE870: 0x9475,
	    0xE871: 0x9477,
	    0xE872: 0x947D,
	    0xE873: 0x945A,
	    0xE874: 0x947C,
	    0xE875: 0x947E,
	    0xE876: 0x9481,
	    0xE877: 0x947F,
	    0xE878: 0x9582,
	    0xE879: 0x9587,
	    0xE87A: 0x958A,
	    0xE87B: 0x9594,
	    0xE87C: 0x9596,
	    0xE87D: 0x9598,
	    0xE87E: 0x9599,
	    0xE880: 0x95A0,
	    0xE881: 0x95A8,
	    0xE882: 0x95A7,
	    0xE883: 0x95AD,
	    0xE884: 0x95BC,
	    0xE885: 0x95BB,
	    0xE886: 0x95B9,
	    0xE887: 0x95BE,
	    0xE888: 0x95CA,
	    0xE889: 0x6FF6,
	    0xE88A: 0x95C3,
	    0xE88B: 0x95CD,
	    0xE88C: 0x95CC,
	    0xE88D: 0x95D5,
	    0xE88E: 0x95D4,
	    0xE88F: 0x95D6,
	    0xE890: 0x95DC,
	    0xE891: 0x95E1,
	    0xE892: 0x95E5,
	    0xE893: 0x95E2,
	    0xE894: 0x9621,
	    0xE895: 0x9628,
	    0xE896: 0x962E,
	    0xE897: 0x962F,
	    0xE898: 0x9642,
	    0xE899: 0x964C,
	    0xE89A: 0x964F,
	    0xE89B: 0x964B,
	    0xE89C: 0x9677,
	    0xE89D: 0x965C,
	    0xE89E: 0x965E,
	    0xE89F: 0x965D,
	    0xE8A0: 0x965F,
	    0xE8A1: 0x9666,
	    0xE8A2: 0x9672,
	    0xE8A3: 0x966C,
	    0xE8A4: 0x968D,
	    0xE8A5: 0x9698,
	    0xE8A6: 0x9695,
	    0xE8A7: 0x9697,
	    0xE8A8: 0x96AA,
	    0xE8A9: 0x96A7,
	    0xE8AA: 0x96B1,
	    0xE8AB: 0x96B2,
	    0xE8AC: 0x96B0,
	    0xE8AD: 0x96B4,
	    0xE8AE: 0x96B6,
	    0xE8AF: 0x96B8,
	    0xE8B0: 0x96B9,
	    0xE8B1: 0x96CE,
	    0xE8B2: 0x96CB,
	    0xE8B3: 0x96C9,
	    0xE8B4: 0x96CD,
	    0xE8B5: 0x894D,
	    0xE8B6: 0x96DC,
	    0xE8B7: 0x970D,
	    0xE8B8: 0x96D5,
	    0xE8B9: 0x96F9,
	    0xE8BA: 0x9704,
	    0xE8BB: 0x9706,
	    0xE8BC: 0x9708,
	    0xE8BD: 0x9713,
	    0xE8BE: 0x970E,
	    0xE8BF: 0x9711,
	    0xE8C0: 0x970F,
	    0xE8C1: 0x9716,
	    0xE8C2: 0x9719,
	    0xE8C3: 0x9724,
	    0xE8C4: 0x972A,
	    0xE8C5: 0x9730,
	    0xE8C6: 0x9739,
	    0xE8C7: 0x973D,
	    0xE8C8: 0x973E,
	    0xE8C9: 0x9744,
	    0xE8CA: 0x9746,
	    0xE8CB: 0x9748,
	    0xE8CC: 0x9742,
	    0xE8CD: 0x9749,
	    0xE8CE: 0x975C,
	    0xE8CF: 0x9760,
	    0xE8D0: 0x9764,
	    0xE8D1: 0x9766,
	    0xE8D2: 0x9768,
	    0xE8D3: 0x52D2,
	    0xE8D4: 0x976B,
	    0xE8D5: 0x9771,
	    0xE8D6: 0x9779,
	    0xE8D7: 0x9785,
	    0xE8D8: 0x977C,
	    0xE8D9: 0x9781,
	    0xE8DA: 0x977A,
	    0xE8DB: 0x9786,
	    0xE8DC: 0x978B,
	    0xE8DD: 0x978F,
	    0xE8DE: 0x9790,
	    0xE8DF: 0x979C,
	    0xE8E0: 0x97A8,
	    0xE8E1: 0x97A6,
	    0xE8E2: 0x97A3,
	    0xE8E3: 0x97B3,
	    0xE8E4: 0x97B4,
	    0xE8E5: 0x97C3,
	    0xE8E6: 0x97C6,
	    0xE8E7: 0x97C8,
	    0xE8E8: 0x97CB,
	    0xE8E9: 0x97DC,
	    0xE8EA: 0x97ED,
	    0xE8EB: 0x9F4F,
	    0xE8EC: 0x97F2,
	    0xE8ED: 0x7ADF,
	    0xE8EE: 0x97F6,
	    0xE8EF: 0x97F5,
	    0xE8F0: 0x980F,
	    0xE8F1: 0x980C,
	    0xE8F2: 0x9838,
	    0xE8F3: 0x9824,
	    0xE8F4: 0x9821,
	    0xE8F5: 0x9837,
	    0xE8F6: 0x983D,
	    0xE8F7: 0x9846,
	    0xE8F8: 0x984F,
	    0xE8F9: 0x984B,
	    0xE8FA: 0x986B,
	    0xE8FB: 0x986F,
	    0xE8FC: 0x9870,
	    0xE940: 0x9871,
	    0xE941: 0x9874,
	    0xE942: 0x9873,
	    0xE943: 0x98AA,
	    0xE944: 0x98AF,
	    0xE945: 0x98B1,
	    0xE946: 0x98B6,
	    0xE947: 0x98C4,
	    0xE948: 0x98C3,
	    0xE949: 0x98C6,
	    0xE94A: 0x98E9,
	    0xE94B: 0x98EB,
	    0xE94C: 0x9903,
	    0xE94D: 0x9909,
	    0xE94E: 0x9912,
	    0xE94F: 0x9914,
	    0xE950: 0x9918,
	    0xE951: 0x9921,
	    0xE952: 0x991D,
	    0xE953: 0x991E,
	    0xE954: 0x9924,
	    0xE955: 0x9920,
	    0xE956: 0x992C,
	    0xE957: 0x992E,
	    0xE958: 0x993D,
	    0xE959: 0x993E,
	    0xE95A: 0x9942,
	    0xE95B: 0x9949,
	    0xE95C: 0x9945,
	    0xE95D: 0x9950,
	    0xE95E: 0x994B,
	    0xE95F: 0x9951,
	    0xE960: 0x9952,
	    0xE961: 0x994C,
	    0xE962: 0x9955,
	    0xE963: 0x9997,
	    0xE964: 0x9998,
	    0xE965: 0x99A5,
	    0xE966: 0x99AD,
	    0xE967: 0x99AE,
	    0xE968: 0x99BC,
	    0xE969: 0x99DF,
	    0xE96A: 0x99DB,
	    0xE96B: 0x99DD,
	    0xE96C: 0x99D8,
	    0xE96D: 0x99D1,
	    0xE96E: 0x99ED,
	    0xE96F: 0x99EE,
	    0xE970: 0x99F1,
	    0xE971: 0x99F2,
	    0xE972: 0x99FB,
	    0xE973: 0x99F8,
	    0xE974: 0x9A01,
	    0xE975: 0x9A0F,
	    0xE976: 0x9A05,
	    0xE977: 0x99E2,
	    0xE978: 0x9A19,
	    0xE979: 0x9A2B,
	    0xE97A: 0x9A37,
	    0xE97B: 0x9A45,
	    0xE97C: 0x9A42,
	    0xE97D: 0x9A40,
	    0xE97E: 0x9A43,
	    0xE980: 0x9A3E,
	    0xE981: 0x9A55,
	    0xE982: 0x9A4D,
	    0xE983: 0x9A5B,
	    0xE984: 0x9A57,
	    0xE985: 0x9A5F,
	    0xE986: 0x9A62,
	    0xE987: 0x9A65,
	    0xE988: 0x9A64,
	    0xE989: 0x9A69,
	    0xE98A: 0x9A6B,
	    0xE98B: 0x9A6A,
	    0xE98C: 0x9AAD,
	    0xE98D: 0x9AB0,
	    0xE98E: 0x9ABC,
	    0xE98F: 0x9AC0,
	    0xE990: 0x9ACF,
	    0xE991: 0x9AD1,
	    0xE992: 0x9AD3,
	    0xE993: 0x9AD4,
	    0xE994: 0x9ADE,
	    0xE995: 0x9ADF,
	    0xE996: 0x9AE2,
	    0xE997: 0x9AE3,
	    0xE998: 0x9AE6,
	    0xE999: 0x9AEF,
	    0xE99A: 0x9AEB,
	    0xE99B: 0x9AEE,
	    0xE99C: 0x9AF4,
	    0xE99D: 0x9AF1,
	    0xE99E: 0x9AF7,
	    0xE99F: 0x9AFB,
	    0xE9A0: 0x9B06,
	    0xE9A1: 0x9B18,
	    0xE9A2: 0x9B1A,
	    0xE9A3: 0x9B1F,
	    0xE9A4: 0x9B22,
	    0xE9A5: 0x9B23,
	    0xE9A6: 0x9B25,
	    0xE9A7: 0x9B27,
	    0xE9A8: 0x9B28,
	    0xE9A9: 0x9B29,
	    0xE9AA: 0x9B2A,
	    0xE9AB: 0x9B2E,
	    0xE9AC: 0x9B2F,
	    0xE9AD: 0x9B32,
	    0xE9AE: 0x9B44,
	    0xE9AF: 0x9B43,
	    0xE9B0: 0x9B4F,
	    0xE9B1: 0x9B4D,
	    0xE9B2: 0x9B4E,
	    0xE9B3: 0x9B51,
	    0xE9B4: 0x9B58,
	    0xE9B5: 0x9B74,
	    0xE9B6: 0x9B93,
	    0xE9B7: 0x9B83,
	    0xE9B8: 0x9B91,
	    0xE9B9: 0x9B96,
	    0xE9BA: 0x9B97,
	    0xE9BB: 0x9B9F,
	    0xE9BC: 0x9BA0,
	    0xE9BD: 0x9BA8,
	    0xE9BE: 0x9BB4,
	    0xE9BF: 0x9BC0,
	    0xE9C0: 0x9BCA,
	    0xE9C1: 0x9BB9,
	    0xE9C2: 0x9BC6,
	    0xE9C3: 0x9BCF,
	    0xE9C4: 0x9BD1,
	    0xE9C5: 0x9BD2,
	    0xE9C6: 0x9BE3,
	    0xE9C7: 0x9BE2,
	    0xE9C8: 0x9BE4,
	    0xE9C9: 0x9BD4,
	    0xE9CA: 0x9BE1,
	    0xE9CB: 0x9C3A,
	    0xE9CC: 0x9BF2,
	    0xE9CD: 0x9BF1,
	    0xE9CE: 0x9BF0,
	    0xE9CF: 0x9C15,
	    0xE9D0: 0x9C14,
	    0xE9D1: 0x9C09,
	    0xE9D2: 0x9C13,
	    0xE9D3: 0x9C0C,
	    0xE9D4: 0x9C06,
	    0xE9D5: 0x9C08,
	    0xE9D6: 0x9C12,
	    0xE9D7: 0x9C0A,
	    0xE9D8: 0x9C04,
	    0xE9D9: 0x9C2E,
	    0xE9DA: 0x9C1B,
	    0xE9DB: 0x9C25,
	    0xE9DC: 0x9C24,
	    0xE9DD: 0x9C21,
	    0xE9DE: 0x9C30,
	    0xE9DF: 0x9C47,
	    0xE9E0: 0x9C32,
	    0xE9E1: 0x9C46,
	    0xE9E2: 0x9C3E,
	    0xE9E3: 0x9C5A,
	    0xE9E4: 0x9C60,
	    0xE9E5: 0x9C67,
	    0xE9E6: 0x9C76,
	    0xE9E7: 0x9C78,
	    0xE9E8: 0x9CE7,
	    0xE9E9: 0x9CEC,
	    0xE9EA: 0x9CF0,
	    0xE9EB: 0x9D09,
	    0xE9EC: 0x9D08,
	    0xE9ED: 0x9CEB,
	    0xE9EE: 0x9D03,
	    0xE9EF: 0x9D06,
	    0xE9F0: 0x9D2A,
	    0xE9F1: 0x9D26,
	    0xE9F2: 0x9DAF,
	    0xE9F3: 0x9D23,
	    0xE9F4: 0x9D1F,
	    0xE9F5: 0x9D44,
	    0xE9F6: 0x9D15,
	    0xE9F7: 0x9D12,
	    0xE9F8: 0x9D41,
	    0xE9F9: 0x9D3F,
	    0xE9FA: 0x9D3E,
	    0xE9FB: 0x9D46,
	    0xE9FC: 0x9D48,
	    0xEA40: 0x9D5D,
	    0xEA41: 0x9D5E,
	    0xEA42: 0x9D64,
	    0xEA43: 0x9D51,
	    0xEA44: 0x9D50,
	    0xEA45: 0x9D59,
	    0xEA46: 0x9D72,
	    0xEA47: 0x9D89,
	    0xEA48: 0x9D87,
	    0xEA49: 0x9DAB,
	    0xEA4A: 0x9D6F,
	    0xEA4B: 0x9D7A,
	    0xEA4C: 0x9D9A,
	    0xEA4D: 0x9DA4,
	    0xEA4E: 0x9DA9,
	    0xEA4F: 0x9DB2,
	    0xEA50: 0x9DC4,
	    0xEA51: 0x9DC1,
	    0xEA52: 0x9DBB,
	    0xEA53: 0x9DB8,
	    0xEA54: 0x9DBA,
	    0xEA55: 0x9DC6,
	    0xEA56: 0x9DCF,
	    0xEA57: 0x9DC2,
	    0xEA58: 0x9DD9,
	    0xEA59: 0x9DD3,
	    0xEA5A: 0x9DF8,
	    0xEA5B: 0x9DE6,
	    0xEA5C: 0x9DED,
	    0xEA5D: 0x9DEF,
	    0xEA5E: 0x9DFD,
	    0xEA5F: 0x9E1A,
	    0xEA60: 0x9E1B,
	    0xEA61: 0x9E1E,
	    0xEA62: 0x9E75,
	    0xEA63: 0x9E79,
	    0xEA64: 0x9E7D,
	    0xEA65: 0x9E81,
	    0xEA66: 0x9E88,
	    0xEA67: 0x9E8B,
	    0xEA68: 0x9E8C,
	    0xEA69: 0x9E92,
	    0xEA6A: 0x9E95,
	    0xEA6B: 0x9E91,
	    0xEA6C: 0x9E9D,
	    0xEA6D: 0x9EA5,
	    0xEA6E: 0x9EA9,
	    0xEA6F: 0x9EB8,
	    0xEA70: 0x9EAA,
	    0xEA71: 0x9EAD,
	    0xEA72: 0x9761,
	    0xEA73: 0x9ECC,
	    0xEA74: 0x9ECE,
	    0xEA75: 0x9ECF,
	    0xEA76: 0x9ED0,
	    0xEA77: 0x9ED4,
	    0xEA78: 0x9EDC,
	    0xEA79: 0x9EDE,
	    0xEA7A: 0x9EDD,
	    0xEA7B: 0x9EE0,
	    0xEA7C: 0x9EE5,
	    0xEA7D: 0x9EE8,
	    0xEA7E: 0x9EEF,
	    0xEA80: 0x9EF4,
	    0xEA81: 0x9EF6,
	    0xEA82: 0x9EF7,
	    0xEA83: 0x9EF9,
	    0xEA84: 0x9EFB,
	    0xEA85: 0x9EFC,
	    0xEA86: 0x9EFD,
	    0xEA87: 0x9F07,
	    0xEA88: 0x9F08,
	    0xEA89: 0x76B7,
	    0xEA8A: 0x9F15,
	    0xEA8B: 0x9F21,
	    0xEA8C: 0x9F2C,
	    0xEA8D: 0x9F3E,
	    0xEA8E: 0x9F4A,
	    0xEA8F: 0x9F52,
	    0xEA90: 0x9F54,
	    0xEA91: 0x9F63,
	    0xEA92: 0x9F5F,
	    0xEA93: 0x9F60,
	    0xEA94: 0x9F61,
	    0xEA95: 0x9F66,
	    0xEA96: 0x9F67,
	    0xEA97: 0x9F6C,
	    0xEA98: 0x9F6A,
	    0xEA99: 0x9F77,
	    0xEA9A: 0x9F72,
	    0xEA9B: 0x9F76,
	    0xEA9C: 0x9F95,
	    0xEA9D: 0x9F9C,
	    0xEA9E: 0x9FA0,
	    0xEA9F: 0x582F,
	    0xEAA0: 0x69C7,
	    0xEAA1: 0x9059,
	    0xEAA2: 0x7464,
	    0xEAA3: 0x51DC,
	    0xEAA4: 0x7199,
	};


	/***/ }),
	/* 9 */
	/***/ (function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", { value: true });
	var GenericGF_1 = __webpack_require__(1);
	var GenericGFPoly_1 = __webpack_require__(2);
	function runEuclideanAlgorithm(field, a, b, R) {
	    var _a;
	    // Assume a's degree is >= b's
	    if (a.degree() < b.degree()) {
	        _a = [b, a], a = _a[0], b = _a[1];
	    }
	    var rLast = a;
	    var r = b;
	    var tLast = field.zero;
	    var t = field.one;
	    // Run Euclidean algorithm until r's degree is less than R/2
	    while (r.degree() >= R / 2) {
	        var rLastLast = rLast;
	        var tLastLast = tLast;
	        rLast = r;
	        tLast = t;
	        // Divide rLastLast by rLast, with quotient in q and remainder in r
	        if (rLast.isZero()) {
	            // Euclidean algorithm already terminated?
	            return null;
	        }
	        r = rLastLast;
	        var q = field.zero;
	        var denominatorLeadingTerm = rLast.getCoefficient(rLast.degree());
	        var dltInverse = field.inverse(denominatorLeadingTerm);
	        while (r.degree() >= rLast.degree() && !r.isZero()) {
	            var degreeDiff = r.degree() - rLast.degree();
	            var scale = field.multiply(r.getCoefficient(r.degree()), dltInverse);
	            q = q.addOrSubtract(field.buildMonomial(degreeDiff, scale));
	            r = r.addOrSubtract(rLast.multiplyByMonomial(degreeDiff, scale));
	        }
	        t = q.multiplyPoly(tLast).addOrSubtract(tLastLast);
	        if (r.degree() >= rLast.degree()) {
	            return null;
	        }
	    }
	    var sigmaTildeAtZero = t.getCoefficient(0);
	    if (sigmaTildeAtZero === 0) {
	        return null;
	    }
	    var inverse = field.inverse(sigmaTildeAtZero);
	    return [t.multiply(inverse), r.multiply(inverse)];
	}
	function findErrorLocations(field, errorLocator) {
	    // This is a direct application of Chien's search
	    var numErrors = errorLocator.degree();
	    if (numErrors === 1) {
	        return [errorLocator.getCoefficient(1)];
	    }
	    var result = new Array(numErrors);
	    var errorCount = 0;
	    for (var i = 1; i < field.size && errorCount < numErrors; i++) {
	        if (errorLocator.evaluateAt(i) === 0) {
	            result[errorCount] = field.inverse(i);
	            errorCount++;
	        }
	    }
	    if (errorCount !== numErrors) {
	        return null;
	    }
	    return result;
	}
	function findErrorMagnitudes(field, errorEvaluator, errorLocations) {
	    // This is directly applying Forney's Formula
	    var s = errorLocations.length;
	    var result = new Array(s);
	    for (var i = 0; i < s; i++) {
	        var xiInverse = field.inverse(errorLocations[i]);
	        var denominator = 1;
	        for (var j = 0; j < s; j++) {
	            if (i !== j) {
	                denominator = field.multiply(denominator, GenericGF_1.addOrSubtractGF(1, field.multiply(errorLocations[j], xiInverse)));
	            }
	        }
	        result[i] = field.multiply(errorEvaluator.evaluateAt(xiInverse), field.inverse(denominator));
	        if (field.generatorBase !== 0) {
	            result[i] = field.multiply(result[i], xiInverse);
	        }
	    }
	    return result;
	}
	function decode(bytes, twoS) {
	    var outputBytes = new Uint8ClampedArray(bytes.length);
	    outputBytes.set(bytes);
	    var field = new GenericGF_1.default(0x011D, 256, 0); // x^8 + x^4 + x^3 + x^2 + 1
	    var poly = new GenericGFPoly_1.default(field, outputBytes);
	    var syndromeCoefficients = new Uint8ClampedArray(twoS);
	    var error = false;
	    for (var s = 0; s < twoS; s++) {
	        var evaluation = poly.evaluateAt(field.exp(s + field.generatorBase));
	        syndromeCoefficients[syndromeCoefficients.length - 1 - s] = evaluation;
	        if (evaluation !== 0) {
	            error = true;
	        }
	    }
	    if (!error) {
	        return outputBytes;
	    }
	    var syndrome = new GenericGFPoly_1.default(field, syndromeCoefficients);
	    var sigmaOmega = runEuclideanAlgorithm(field, field.buildMonomial(twoS, 1), syndrome, twoS);
	    if (sigmaOmega === null) {
	        return null;
	    }
	    var errorLocations = findErrorLocations(field, sigmaOmega[0]);
	    if (errorLocations == null) {
	        return null;
	    }
	    var errorMagnitudes = findErrorMagnitudes(field, sigmaOmega[1], errorLocations);
	    for (var i = 0; i < errorLocations.length; i++) {
	        var position = outputBytes.length - 1 - field.log(errorLocations[i]);
	        if (position < 0) {
	            return null;
	        }
	        outputBytes[position] = GenericGF_1.addOrSubtractGF(outputBytes[position], errorMagnitudes[i]);
	    }
	    return outputBytes;
	}
	exports.decode = decode;


	/***/ }),
	/* 10 */
	/***/ (function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", { value: true });
	exports.VERSIONS = [
	    {
	        infoBits: null,
	        versionNumber: 1,
	        alignmentPatternCenters: [],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 7,
	                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 19 }],
	            },
	            {
	                ecCodewordsPerBlock: 10,
	                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 16 }],
	            },
	            {
	                ecCodewordsPerBlock: 13,
	                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 13 }],
	            },
	            {
	                ecCodewordsPerBlock: 17,
	                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 9 }],
	            },
	        ],
	    },
	    {
	        infoBits: null,
	        versionNumber: 2,
	        alignmentPatternCenters: [6, 18],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 10,
	                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 34 }],
	            },
	            {
	                ecCodewordsPerBlock: 16,
	                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 28 }],
	            },
	            {
	                ecCodewordsPerBlock: 22,
	                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 22 }],
	            },
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 16 }],
	            },
	        ],
	    },
	    {
	        infoBits: null,
	        versionNumber: 3,
	        alignmentPatternCenters: [6, 22],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 15,
	                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 55 }],
	            },
	            {
	                ecCodewordsPerBlock: 26,
	                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 44 }],
	            },
	            {
	                ecCodewordsPerBlock: 18,
	                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 17 }],
	            },
	            {
	                ecCodewordsPerBlock: 22,
	                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 13 }],
	            },
	        ],
	    },
	    {
	        infoBits: null,
	        versionNumber: 4,
	        alignmentPatternCenters: [6, 26],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 20,
	                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 80 }],
	            },
	            {
	                ecCodewordsPerBlock: 18,
	                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 32 }],
	            },
	            {
	                ecCodewordsPerBlock: 26,
	                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 24 }],
	            },
	            {
	                ecCodewordsPerBlock: 16,
	                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 9 }],
	            },
	        ],
	    },
	    {
	        infoBits: null,
	        versionNumber: 5,
	        alignmentPatternCenters: [6, 30],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 26,
	                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 108 }],
	            },
	            {
	                ecCodewordsPerBlock: 24,
	                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 43 }],
	            },
	            {
	                ecCodewordsPerBlock: 18,
	                ecBlocks: [
	                    { numBlocks: 2, dataCodewordsPerBlock: 15 },
	                    { numBlocks: 2, dataCodewordsPerBlock: 16 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 22,
	                ecBlocks: [
	                    { numBlocks: 2, dataCodewordsPerBlock: 11 },
	                    { numBlocks: 2, dataCodewordsPerBlock: 12 },
	                ],
	            },
	        ],
	    },
	    {
	        infoBits: null,
	        versionNumber: 6,
	        alignmentPatternCenters: [6, 34],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 18,
	                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 68 }],
	            },
	            {
	                ecCodewordsPerBlock: 16,
	                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 27 }],
	            },
	            {
	                ecCodewordsPerBlock: 24,
	                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 19 }],
	            },
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 15 }],
	            },
	        ],
	    },
	    {
	        infoBits: 0x07C94,
	        versionNumber: 7,
	        alignmentPatternCenters: [6, 22, 38],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 20,
	                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 78 }],
	            },
	            {
	                ecCodewordsPerBlock: 18,
	                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 31 }],
	            },
	            {
	                ecCodewordsPerBlock: 18,
	                ecBlocks: [
	                    { numBlocks: 2, dataCodewordsPerBlock: 14 },
	                    { numBlocks: 4, dataCodewordsPerBlock: 15 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 26,
	                ecBlocks: [
	                    { numBlocks: 4, dataCodewordsPerBlock: 13 },
	                    { numBlocks: 1, dataCodewordsPerBlock: 14 },
	                ],
	            },
	        ],
	    },
	    {
	        infoBits: 0x085BC,
	        versionNumber: 8,
	        alignmentPatternCenters: [6, 24, 42],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 24,
	                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 97 }],
	            },
	            {
	                ecCodewordsPerBlock: 22,
	                ecBlocks: [
	                    { numBlocks: 2, dataCodewordsPerBlock: 38 },
	                    { numBlocks: 2, dataCodewordsPerBlock: 39 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 22,
	                ecBlocks: [
	                    { numBlocks: 4, dataCodewordsPerBlock: 18 },
	                    { numBlocks: 2, dataCodewordsPerBlock: 19 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 26,
	                ecBlocks: [
	                    { numBlocks: 4, dataCodewordsPerBlock: 14 },
	                    { numBlocks: 2, dataCodewordsPerBlock: 15 },
	                ],
	            },
	        ],
	    },
	    {
	        infoBits: 0x09A99,
	        versionNumber: 9,
	        alignmentPatternCenters: [6, 26, 46],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 116 }],
	            },
	            {
	                ecCodewordsPerBlock: 22,
	                ecBlocks: [
	                    { numBlocks: 3, dataCodewordsPerBlock: 36 },
	                    { numBlocks: 2, dataCodewordsPerBlock: 37 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 20,
	                ecBlocks: [
	                    { numBlocks: 4, dataCodewordsPerBlock: 16 },
	                    { numBlocks: 4, dataCodewordsPerBlock: 17 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 24,
	                ecBlocks: [
	                    { numBlocks: 4, dataCodewordsPerBlock: 12 },
	                    { numBlocks: 4, dataCodewordsPerBlock: 13 },
	                ],
	            },
	        ],
	    },
	    {
	        infoBits: 0x0A4D3,
	        versionNumber: 10,
	        alignmentPatternCenters: [6, 28, 50],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 18,
	                ecBlocks: [
	                    { numBlocks: 2, dataCodewordsPerBlock: 68 },
	                    { numBlocks: 2, dataCodewordsPerBlock: 69 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 26,
	                ecBlocks: [
	                    { numBlocks: 4, dataCodewordsPerBlock: 43 },
	                    { numBlocks: 1, dataCodewordsPerBlock: 44 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 24,
	                ecBlocks: [
	                    { numBlocks: 6, dataCodewordsPerBlock: 19 },
	                    { numBlocks: 2, dataCodewordsPerBlock: 20 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 6, dataCodewordsPerBlock: 15 },
	                    { numBlocks: 2, dataCodewordsPerBlock: 16 },
	                ],
	            },
	        ],
	    },
	    {
	        infoBits: 0x0BBF6,
	        versionNumber: 11,
	        alignmentPatternCenters: [6, 30, 54],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 20,
	                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 81 }],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 1, dataCodewordsPerBlock: 50 },
	                    { numBlocks: 4, dataCodewordsPerBlock: 51 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 4, dataCodewordsPerBlock: 22 },
	                    { numBlocks: 4, dataCodewordsPerBlock: 23 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 24,
	                ecBlocks: [
	                    { numBlocks: 3, dataCodewordsPerBlock: 12 },
	                    { numBlocks: 8, dataCodewordsPerBlock: 13 },
	                ],
	            },
	        ],
	    },
	    {
	        infoBits: 0x0C762,
	        versionNumber: 12,
	        alignmentPatternCenters: [6, 32, 58],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 24,
	                ecBlocks: [
	                    { numBlocks: 2, dataCodewordsPerBlock: 92 },
	                    { numBlocks: 2, dataCodewordsPerBlock: 93 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 22,
	                ecBlocks: [
	                    { numBlocks: 6, dataCodewordsPerBlock: 36 },
	                    { numBlocks: 2, dataCodewordsPerBlock: 37 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 26,
	                ecBlocks: [
	                    { numBlocks: 4, dataCodewordsPerBlock: 20 },
	                    { numBlocks: 6, dataCodewordsPerBlock: 21 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 7, dataCodewordsPerBlock: 14 },
	                    { numBlocks: 4, dataCodewordsPerBlock: 15 },
	                ],
	            },
	        ],
	    },
	    {
	        infoBits: 0x0D847,
	        versionNumber: 13,
	        alignmentPatternCenters: [6, 34, 62],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 26,
	                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 107 }],
	            },
	            {
	                ecCodewordsPerBlock: 22,
	                ecBlocks: [
	                    { numBlocks: 8, dataCodewordsPerBlock: 37 },
	                    { numBlocks: 1, dataCodewordsPerBlock: 38 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 24,
	                ecBlocks: [
	                    { numBlocks: 8, dataCodewordsPerBlock: 20 },
	                    { numBlocks: 4, dataCodewordsPerBlock: 21 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 22,
	                ecBlocks: [
	                    { numBlocks: 12, dataCodewordsPerBlock: 11 },
	                    { numBlocks: 4, dataCodewordsPerBlock: 12 },
	                ],
	            },
	        ],
	    },
	    {
	        infoBits: 0x0E60D,
	        versionNumber: 14,
	        alignmentPatternCenters: [6, 26, 46, 66],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 3, dataCodewordsPerBlock: 115 },
	                    { numBlocks: 1, dataCodewordsPerBlock: 116 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 24,
	                ecBlocks: [
	                    { numBlocks: 4, dataCodewordsPerBlock: 40 },
	                    { numBlocks: 5, dataCodewordsPerBlock: 41 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 20,
	                ecBlocks: [
	                    { numBlocks: 11, dataCodewordsPerBlock: 16 },
	                    { numBlocks: 5, dataCodewordsPerBlock: 17 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 24,
	                ecBlocks: [
	                    { numBlocks: 11, dataCodewordsPerBlock: 12 },
	                    { numBlocks: 5, dataCodewordsPerBlock: 13 },
	                ],
	            },
	        ],
	    },
	    {
	        infoBits: 0x0F928,
	        versionNumber: 15,
	        alignmentPatternCenters: [6, 26, 48, 70],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 22,
	                ecBlocks: [
	                    { numBlocks: 5, dataCodewordsPerBlock: 87 },
	                    { numBlocks: 1, dataCodewordsPerBlock: 88 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 24,
	                ecBlocks: [
	                    { numBlocks: 5, dataCodewordsPerBlock: 41 },
	                    { numBlocks: 5, dataCodewordsPerBlock: 42 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 5, dataCodewordsPerBlock: 24 },
	                    { numBlocks: 7, dataCodewordsPerBlock: 25 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 24,
	                ecBlocks: [
	                    { numBlocks: 11, dataCodewordsPerBlock: 12 },
	                    { numBlocks: 7, dataCodewordsPerBlock: 13 },
	                ],
	            },
	        ],
	    },
	    {
	        infoBits: 0x10B78,
	        versionNumber: 16,
	        alignmentPatternCenters: [6, 26, 50, 74],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 24,
	                ecBlocks: [
	                    { numBlocks: 5, dataCodewordsPerBlock: 98 },
	                    { numBlocks: 1, dataCodewordsPerBlock: 99 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 7, dataCodewordsPerBlock: 45 },
	                    { numBlocks: 3, dataCodewordsPerBlock: 46 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 24,
	                ecBlocks: [
	                    { numBlocks: 15, dataCodewordsPerBlock: 19 },
	                    { numBlocks: 2, dataCodewordsPerBlock: 20 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 3, dataCodewordsPerBlock: 15 },
	                    { numBlocks: 13, dataCodewordsPerBlock: 16 },
	                ],
	            },
	        ],
	    },
	    {
	        infoBits: 0x1145D,
	        versionNumber: 17,
	        alignmentPatternCenters: [6, 30, 54, 78],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 1, dataCodewordsPerBlock: 107 },
	                    { numBlocks: 5, dataCodewordsPerBlock: 108 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 10, dataCodewordsPerBlock: 46 },
	                    { numBlocks: 1, dataCodewordsPerBlock: 47 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 1, dataCodewordsPerBlock: 22 },
	                    { numBlocks: 15, dataCodewordsPerBlock: 23 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 2, dataCodewordsPerBlock: 14 },
	                    { numBlocks: 17, dataCodewordsPerBlock: 15 },
	                ],
	            },
	        ],
	    },
	    {
	        infoBits: 0x12A17,
	        versionNumber: 18,
	        alignmentPatternCenters: [6, 30, 56, 82],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 5, dataCodewordsPerBlock: 120 },
	                    { numBlocks: 1, dataCodewordsPerBlock: 121 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 26,
	                ecBlocks: [
	                    { numBlocks: 9, dataCodewordsPerBlock: 43 },
	                    { numBlocks: 4, dataCodewordsPerBlock: 44 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 17, dataCodewordsPerBlock: 22 },
	                    { numBlocks: 1, dataCodewordsPerBlock: 23 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 2, dataCodewordsPerBlock: 14 },
	                    { numBlocks: 19, dataCodewordsPerBlock: 15 },
	                ],
	            },
	        ],
	    },
	    {
	        infoBits: 0x13532,
	        versionNumber: 19,
	        alignmentPatternCenters: [6, 30, 58, 86],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 3, dataCodewordsPerBlock: 113 },
	                    { numBlocks: 4, dataCodewordsPerBlock: 114 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 26,
	                ecBlocks: [
	                    { numBlocks: 3, dataCodewordsPerBlock: 44 },
	                    { numBlocks: 11, dataCodewordsPerBlock: 45 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 26,
	                ecBlocks: [
	                    { numBlocks: 17, dataCodewordsPerBlock: 21 },
	                    { numBlocks: 4, dataCodewordsPerBlock: 22 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 26,
	                ecBlocks: [
	                    { numBlocks: 9, dataCodewordsPerBlock: 13 },
	                    { numBlocks: 16, dataCodewordsPerBlock: 14 },
	                ],
	            },
	        ],
	    },
	    {
	        infoBits: 0x149A6,
	        versionNumber: 20,
	        alignmentPatternCenters: [6, 34, 62, 90],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 3, dataCodewordsPerBlock: 107 },
	                    { numBlocks: 5, dataCodewordsPerBlock: 108 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 26,
	                ecBlocks: [
	                    { numBlocks: 3, dataCodewordsPerBlock: 41 },
	                    { numBlocks: 13, dataCodewordsPerBlock: 42 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 15, dataCodewordsPerBlock: 24 },
	                    { numBlocks: 5, dataCodewordsPerBlock: 25 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 15, dataCodewordsPerBlock: 15 },
	                    { numBlocks: 10, dataCodewordsPerBlock: 16 },
	                ],
	            },
	        ],
	    },
	    {
	        infoBits: 0x15683,
	        versionNumber: 21,
	        alignmentPatternCenters: [6, 28, 50, 72, 94],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 4, dataCodewordsPerBlock: 116 },
	                    { numBlocks: 4, dataCodewordsPerBlock: 117 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 26,
	                ecBlocks: [{ numBlocks: 17, dataCodewordsPerBlock: 42 }],
	            },
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 17, dataCodewordsPerBlock: 22 },
	                    { numBlocks: 6, dataCodewordsPerBlock: 23 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 19, dataCodewordsPerBlock: 16 },
	                    { numBlocks: 6, dataCodewordsPerBlock: 17 },
	                ],
	            },
	        ],
	    },
	    {
	        infoBits: 0x168C9,
	        versionNumber: 22,
	        alignmentPatternCenters: [6, 26, 50, 74, 98],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 2, dataCodewordsPerBlock: 111 },
	                    { numBlocks: 7, dataCodewordsPerBlock: 112 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [{ numBlocks: 17, dataCodewordsPerBlock: 46 }],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 7, dataCodewordsPerBlock: 24 },
	                    { numBlocks: 16, dataCodewordsPerBlock: 25 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 24,
	                ecBlocks: [{ numBlocks: 34, dataCodewordsPerBlock: 13 }],
	            },
	        ],
	    },
	    {
	        infoBits: 0x177EC,
	        versionNumber: 23,
	        alignmentPatternCenters: [6, 30, 54, 74, 102],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 4, dataCodewordsPerBlock: 121 },
	                    { numBlocks: 5, dataCodewordsPerBlock: 122 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 4, dataCodewordsPerBlock: 47 },
	                    { numBlocks: 14, dataCodewordsPerBlock: 48 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 11, dataCodewordsPerBlock: 24 },
	                    { numBlocks: 14, dataCodewordsPerBlock: 25 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 16, dataCodewordsPerBlock: 15 },
	                    { numBlocks: 14, dataCodewordsPerBlock: 16 },
	                ],
	            },
	        ],
	    },
	    {
	        infoBits: 0x18EC4,
	        versionNumber: 24,
	        alignmentPatternCenters: [6, 28, 54, 80, 106],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 6, dataCodewordsPerBlock: 117 },
	                    { numBlocks: 4, dataCodewordsPerBlock: 118 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 6, dataCodewordsPerBlock: 45 },
	                    { numBlocks: 14, dataCodewordsPerBlock: 46 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 11, dataCodewordsPerBlock: 24 },
	                    { numBlocks: 16, dataCodewordsPerBlock: 25 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 30, dataCodewordsPerBlock: 16 },
	                    { numBlocks: 2, dataCodewordsPerBlock: 17 },
	                ],
	            },
	        ],
	    },
	    {
	        infoBits: 0x191E1,
	        versionNumber: 25,
	        alignmentPatternCenters: [6, 32, 58, 84, 110],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 26,
	                ecBlocks: [
	                    { numBlocks: 8, dataCodewordsPerBlock: 106 },
	                    { numBlocks: 4, dataCodewordsPerBlock: 107 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 8, dataCodewordsPerBlock: 47 },
	                    { numBlocks: 13, dataCodewordsPerBlock: 48 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 7, dataCodewordsPerBlock: 24 },
	                    { numBlocks: 22, dataCodewordsPerBlock: 25 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 22, dataCodewordsPerBlock: 15 },
	                    { numBlocks: 13, dataCodewordsPerBlock: 16 },
	                ],
	            },
	        ],
	    },
	    {
	        infoBits: 0x1AFAB,
	        versionNumber: 26,
	        alignmentPatternCenters: [6, 30, 58, 86, 114],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 10, dataCodewordsPerBlock: 114 },
	                    { numBlocks: 2, dataCodewordsPerBlock: 115 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 19, dataCodewordsPerBlock: 46 },
	                    { numBlocks: 4, dataCodewordsPerBlock: 47 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 28, dataCodewordsPerBlock: 22 },
	                    { numBlocks: 6, dataCodewordsPerBlock: 23 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 33, dataCodewordsPerBlock: 16 },
	                    { numBlocks: 4, dataCodewordsPerBlock: 17 },
	                ],
	            },
	        ],
	    },
	    {
	        infoBits: 0x1B08E,
	        versionNumber: 27,
	        alignmentPatternCenters: [6, 34, 62, 90, 118],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 8, dataCodewordsPerBlock: 122 },
	                    { numBlocks: 4, dataCodewordsPerBlock: 123 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 22, dataCodewordsPerBlock: 45 },
	                    { numBlocks: 3, dataCodewordsPerBlock: 46 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 8, dataCodewordsPerBlock: 23 },
	                    { numBlocks: 26, dataCodewordsPerBlock: 24 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 12, dataCodewordsPerBlock: 15 },
	                    { numBlocks: 28, dataCodewordsPerBlock: 16 },
	                ],
	            },
	        ],
	    },
	    {
	        infoBits: 0x1CC1A,
	        versionNumber: 28,
	        alignmentPatternCenters: [6, 26, 50, 74, 98, 122],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 3, dataCodewordsPerBlock: 117 },
	                    { numBlocks: 10, dataCodewordsPerBlock: 118 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 3, dataCodewordsPerBlock: 45 },
	                    { numBlocks: 23, dataCodewordsPerBlock: 46 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 4, dataCodewordsPerBlock: 24 },
	                    { numBlocks: 31, dataCodewordsPerBlock: 25 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 11, dataCodewordsPerBlock: 15 },
	                    { numBlocks: 31, dataCodewordsPerBlock: 16 },
	                ],
	            },
	        ],
	    },
	    {
	        infoBits: 0x1D33F,
	        versionNumber: 29,
	        alignmentPatternCenters: [6, 30, 54, 78, 102, 126],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 7, dataCodewordsPerBlock: 116 },
	                    { numBlocks: 7, dataCodewordsPerBlock: 117 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 21, dataCodewordsPerBlock: 45 },
	                    { numBlocks: 7, dataCodewordsPerBlock: 46 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 1, dataCodewordsPerBlock: 23 },
	                    { numBlocks: 37, dataCodewordsPerBlock: 24 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 19, dataCodewordsPerBlock: 15 },
	                    { numBlocks: 26, dataCodewordsPerBlock: 16 },
	                ],
	            },
	        ],
	    },
	    {
	        infoBits: 0x1ED75,
	        versionNumber: 30,
	        alignmentPatternCenters: [6, 26, 52, 78, 104, 130],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 5, dataCodewordsPerBlock: 115 },
	                    { numBlocks: 10, dataCodewordsPerBlock: 116 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 19, dataCodewordsPerBlock: 47 },
	                    { numBlocks: 10, dataCodewordsPerBlock: 48 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 15, dataCodewordsPerBlock: 24 },
	                    { numBlocks: 25, dataCodewordsPerBlock: 25 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 23, dataCodewordsPerBlock: 15 },
	                    { numBlocks: 25, dataCodewordsPerBlock: 16 },
	                ],
	            },
	        ],
	    },
	    {
	        infoBits: 0x1F250,
	        versionNumber: 31,
	        alignmentPatternCenters: [6, 30, 56, 82, 108, 134],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 13, dataCodewordsPerBlock: 115 },
	                    { numBlocks: 3, dataCodewordsPerBlock: 116 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 2, dataCodewordsPerBlock: 46 },
	                    { numBlocks: 29, dataCodewordsPerBlock: 47 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 42, dataCodewordsPerBlock: 24 },
	                    { numBlocks: 1, dataCodewordsPerBlock: 25 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 23, dataCodewordsPerBlock: 15 },
	                    { numBlocks: 28, dataCodewordsPerBlock: 16 },
	                ],
	            },
	        ],
	    },
	    {
	        infoBits: 0x209D5,
	        versionNumber: 32,
	        alignmentPatternCenters: [6, 34, 60, 86, 112, 138],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [{ numBlocks: 17, dataCodewordsPerBlock: 115 }],
	            },
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 10, dataCodewordsPerBlock: 46 },
	                    { numBlocks: 23, dataCodewordsPerBlock: 47 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 10, dataCodewordsPerBlock: 24 },
	                    { numBlocks: 35, dataCodewordsPerBlock: 25 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 19, dataCodewordsPerBlock: 15 },
	                    { numBlocks: 35, dataCodewordsPerBlock: 16 },
	                ],
	            },
	        ],
	    },
	    {
	        infoBits: 0x216F0,
	        versionNumber: 33,
	        alignmentPatternCenters: [6, 30, 58, 86, 114, 142],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 17, dataCodewordsPerBlock: 115 },
	                    { numBlocks: 1, dataCodewordsPerBlock: 116 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 14, dataCodewordsPerBlock: 46 },
	                    { numBlocks: 21, dataCodewordsPerBlock: 47 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 29, dataCodewordsPerBlock: 24 },
	                    { numBlocks: 19, dataCodewordsPerBlock: 25 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 11, dataCodewordsPerBlock: 15 },
	                    { numBlocks: 46, dataCodewordsPerBlock: 16 },
	                ],
	            },
	        ],
	    },
	    {
	        infoBits: 0x228BA,
	        versionNumber: 34,
	        alignmentPatternCenters: [6, 34, 62, 90, 118, 146],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 13, dataCodewordsPerBlock: 115 },
	                    { numBlocks: 6, dataCodewordsPerBlock: 116 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 14, dataCodewordsPerBlock: 46 },
	                    { numBlocks: 23, dataCodewordsPerBlock: 47 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 44, dataCodewordsPerBlock: 24 },
	                    { numBlocks: 7, dataCodewordsPerBlock: 25 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 59, dataCodewordsPerBlock: 16 },
	                    { numBlocks: 1, dataCodewordsPerBlock: 17 },
	                ],
	            },
	        ],
	    },
	    {
	        infoBits: 0x2379F,
	        versionNumber: 35,
	        alignmentPatternCenters: [6, 30, 54, 78, 102, 126, 150],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 12, dataCodewordsPerBlock: 121 },
	                    { numBlocks: 7, dataCodewordsPerBlock: 122 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 12, dataCodewordsPerBlock: 47 },
	                    { numBlocks: 26, dataCodewordsPerBlock: 48 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 39, dataCodewordsPerBlock: 24 },
	                    { numBlocks: 14, dataCodewordsPerBlock: 25 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 22, dataCodewordsPerBlock: 15 },
	                    { numBlocks: 41, dataCodewordsPerBlock: 16 },
	                ],
	            },
	        ],
	    },
	    {
	        infoBits: 0x24B0B,
	        versionNumber: 36,
	        alignmentPatternCenters: [6, 24, 50, 76, 102, 128, 154],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 6, dataCodewordsPerBlock: 121 },
	                    { numBlocks: 14, dataCodewordsPerBlock: 122 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 6, dataCodewordsPerBlock: 47 },
	                    { numBlocks: 34, dataCodewordsPerBlock: 48 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 46, dataCodewordsPerBlock: 24 },
	                    { numBlocks: 10, dataCodewordsPerBlock: 25 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 2, dataCodewordsPerBlock: 15 },
	                    { numBlocks: 64, dataCodewordsPerBlock: 16 },
	                ],
	            },
	        ],
	    },
	    {
	        infoBits: 0x2542E,
	        versionNumber: 37,
	        alignmentPatternCenters: [6, 28, 54, 80, 106, 132, 158],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 17, dataCodewordsPerBlock: 122 },
	                    { numBlocks: 4, dataCodewordsPerBlock: 123 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 29, dataCodewordsPerBlock: 46 },
	                    { numBlocks: 14, dataCodewordsPerBlock: 47 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 49, dataCodewordsPerBlock: 24 },
	                    { numBlocks: 10, dataCodewordsPerBlock: 25 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 24, dataCodewordsPerBlock: 15 },
	                    { numBlocks: 46, dataCodewordsPerBlock: 16 },
	                ],
	            },
	        ],
	    },
	    {
	        infoBits: 0x26A64,
	        versionNumber: 38,
	        alignmentPatternCenters: [6, 32, 58, 84, 110, 136, 162],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 4, dataCodewordsPerBlock: 122 },
	                    { numBlocks: 18, dataCodewordsPerBlock: 123 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 13, dataCodewordsPerBlock: 46 },
	                    { numBlocks: 32, dataCodewordsPerBlock: 47 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 48, dataCodewordsPerBlock: 24 },
	                    { numBlocks: 14, dataCodewordsPerBlock: 25 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 42, dataCodewordsPerBlock: 15 },
	                    { numBlocks: 32, dataCodewordsPerBlock: 16 },
	                ],
	            },
	        ],
	    },
	    {
	        infoBits: 0x27541,
	        versionNumber: 39,
	        alignmentPatternCenters: [6, 26, 54, 82, 110, 138, 166],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 20, dataCodewordsPerBlock: 117 },
	                    { numBlocks: 4, dataCodewordsPerBlock: 118 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 40, dataCodewordsPerBlock: 47 },
	                    { numBlocks: 7, dataCodewordsPerBlock: 48 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 43, dataCodewordsPerBlock: 24 },
	                    { numBlocks: 22, dataCodewordsPerBlock: 25 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 10, dataCodewordsPerBlock: 15 },
	                    { numBlocks: 67, dataCodewordsPerBlock: 16 },
	                ],
	            },
	        ],
	    },
	    {
	        infoBits: 0x28C69,
	        versionNumber: 40,
	        alignmentPatternCenters: [6, 30, 58, 86, 114, 142, 170],
	        errorCorrectionLevels: [
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 19, dataCodewordsPerBlock: 118 },
	                    { numBlocks: 6, dataCodewordsPerBlock: 119 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 28,
	                ecBlocks: [
	                    { numBlocks: 18, dataCodewordsPerBlock: 47 },
	                    { numBlocks: 31, dataCodewordsPerBlock: 48 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 34, dataCodewordsPerBlock: 24 },
	                    { numBlocks: 34, dataCodewordsPerBlock: 25 },
	                ],
	            },
	            {
	                ecCodewordsPerBlock: 30,
	                ecBlocks: [
	                    { numBlocks: 20, dataCodewordsPerBlock: 15 },
	                    { numBlocks: 61, dataCodewordsPerBlock: 16 },
	                ],
	            },
	        ],
	    },
	];


	/***/ }),
	/* 11 */
	/***/ (function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", { value: true });
	var BitMatrix_1 = __webpack_require__(0);
	function squareToQuadrilateral(p1, p2, p3, p4) {
	    var dx3 = p1.x - p2.x + p3.x - p4.x;
	    var dy3 = p1.y - p2.y + p3.y - p4.y;
	    if (dx3 === 0 && dy3 === 0) { // Affine
	        return {
	            a11: p2.x - p1.x,
	            a12: p2.y - p1.y,
	            a13: 0,
	            a21: p3.x - p2.x,
	            a22: p3.y - p2.y,
	            a23: 0,
	            a31: p1.x,
	            a32: p1.y,
	            a33: 1,
	        };
	    }
	    else {
	        var dx1 = p2.x - p3.x;
	        var dx2 = p4.x - p3.x;
	        var dy1 = p2.y - p3.y;
	        var dy2 = p4.y - p3.y;
	        var denominator = dx1 * dy2 - dx2 * dy1;
	        var a13 = (dx3 * dy2 - dx2 * dy3) / denominator;
	        var a23 = (dx1 * dy3 - dx3 * dy1) / denominator;
	        return {
	            a11: p2.x - p1.x + a13 * p2.x,
	            a12: p2.y - p1.y + a13 * p2.y,
	            a13: a13,
	            a21: p4.x - p1.x + a23 * p4.x,
	            a22: p4.y - p1.y + a23 * p4.y,
	            a23: a23,
	            a31: p1.x,
	            a32: p1.y,
	            a33: 1,
	        };
	    }
	}
	function quadrilateralToSquare(p1, p2, p3, p4) {
	    // Here, the adjoint serves as the inverse:
	    var sToQ = squareToQuadrilateral(p1, p2, p3, p4);
	    return {
	        a11: sToQ.a22 * sToQ.a33 - sToQ.a23 * sToQ.a32,
	        a12: sToQ.a13 * sToQ.a32 - sToQ.a12 * sToQ.a33,
	        a13: sToQ.a12 * sToQ.a23 - sToQ.a13 * sToQ.a22,
	        a21: sToQ.a23 * sToQ.a31 - sToQ.a21 * sToQ.a33,
	        a22: sToQ.a11 * sToQ.a33 - sToQ.a13 * sToQ.a31,
	        a23: sToQ.a13 * sToQ.a21 - sToQ.a11 * sToQ.a23,
	        a31: sToQ.a21 * sToQ.a32 - sToQ.a22 * sToQ.a31,
	        a32: sToQ.a12 * sToQ.a31 - sToQ.a11 * sToQ.a32,
	        a33: sToQ.a11 * sToQ.a22 - sToQ.a12 * sToQ.a21,
	    };
	}
	function times(a, b) {
	    return {
	        a11: a.a11 * b.a11 + a.a21 * b.a12 + a.a31 * b.a13,
	        a12: a.a12 * b.a11 + a.a22 * b.a12 + a.a32 * b.a13,
	        a13: a.a13 * b.a11 + a.a23 * b.a12 + a.a33 * b.a13,
	        a21: a.a11 * b.a21 + a.a21 * b.a22 + a.a31 * b.a23,
	        a22: a.a12 * b.a21 + a.a22 * b.a22 + a.a32 * b.a23,
	        a23: a.a13 * b.a21 + a.a23 * b.a22 + a.a33 * b.a23,
	        a31: a.a11 * b.a31 + a.a21 * b.a32 + a.a31 * b.a33,
	        a32: a.a12 * b.a31 + a.a22 * b.a32 + a.a32 * b.a33,
	        a33: a.a13 * b.a31 + a.a23 * b.a32 + a.a33 * b.a33,
	    };
	}
	function extract(image, location) {
	    var qToS = quadrilateralToSquare({ x: 3.5, y: 3.5 }, { x: location.dimension - 3.5, y: 3.5 }, { x: location.dimension - 6.5, y: location.dimension - 6.5 }, { x: 3.5, y: location.dimension - 3.5 });
	    var sToQ = squareToQuadrilateral(location.topLeft, location.topRight, location.alignmentPattern, location.bottomLeft);
	    var transform = times(sToQ, qToS);
	    var matrix = BitMatrix_1.BitMatrix.createEmpty(location.dimension, location.dimension);
	    var mappingFunction = function (x, y) {
	        var denominator = transform.a13 * x + transform.a23 * y + transform.a33;
	        return {
	            x: (transform.a11 * x + transform.a21 * y + transform.a31) / denominator,
	            y: (transform.a12 * x + transform.a22 * y + transform.a32) / denominator,
	        };
	    };
	    for (var y = 0; y < location.dimension; y++) {
	        for (var x = 0; x < location.dimension; x++) {
	            var xValue = x + 0.5;
	            var yValue = y + 0.5;
	            var sourcePixel = mappingFunction(xValue, yValue);
	            matrix.set(x, y, image.get(Math.floor(sourcePixel.x), Math.floor(sourcePixel.y)));
	        }
	    }
	    return {
	        matrix: matrix,
	        mappingFunction: mappingFunction,
	    };
	}
	exports.extract = extract;


	/***/ }),
	/* 12 */
	/***/ (function(module, exports, __webpack_require__) {

	Object.defineProperty(exports, "__esModule", { value: true });
	var MAX_FINDERPATTERNS_TO_SEARCH = 4;
	var MIN_QUAD_RATIO = 0.5;
	var MAX_QUAD_RATIO = 1.5;
	var distance = function (a, b) { return Math.sqrt(Math.pow((b.x - a.x), 2) + Math.pow((b.y - a.y), 2)); };
	function sum(values) {
	    return values.reduce(function (a, b) { return a + b; });
	}
	// Takes three finder patterns and organizes them into topLeft, topRight, etc
	function reorderFinderPatterns(pattern1, pattern2, pattern3) {
	    var _a, _b, _c, _d;
	    // Find distances between pattern centers
	    var oneTwoDistance = distance(pattern1, pattern2);
	    var twoThreeDistance = distance(pattern2, pattern3);
	    var oneThreeDistance = distance(pattern1, pattern3);
	    var bottomLeft;
	    var topLeft;
	    var topRight;
	    // Assume one closest to other two is B; A and C will just be guesses at first
	    if (twoThreeDistance >= oneTwoDistance && twoThreeDistance >= oneThreeDistance) {
	        _a = [pattern2, pattern1, pattern3], bottomLeft = _a[0], topLeft = _a[1], topRight = _a[2];
	    }
	    else if (oneThreeDistance >= twoThreeDistance && oneThreeDistance >= oneTwoDistance) {
	        _b = [pattern1, pattern2, pattern3], bottomLeft = _b[0], topLeft = _b[1], topRight = _b[2];
	    }
	    else {
	        _c = [pattern1, pattern3, pattern2], bottomLeft = _c[0], topLeft = _c[1], topRight = _c[2];
	    }
	    // Use cross product to figure out whether bottomLeft (A) and topRight (C) are correct or flipped in relation to topLeft (B)
	    // This asks whether BC x BA has a positive z component, which is the arrangement we want. If it's negative, then
	    // we've got it flipped around and should swap topRight and bottomLeft.
	    if (((topRight.x - topLeft.x) * (bottomLeft.y - topLeft.y)) - ((topRight.y - topLeft.y) * (bottomLeft.x - topLeft.x)) < 0) {
	        _d = [topRight, bottomLeft], bottomLeft = _d[0], topRight = _d[1];
	    }
	    return { bottomLeft: bottomLeft, topLeft: topLeft, topRight: topRight };
	}
	// Computes the dimension (number of modules on a side) of the QR Code based on the position of the finder patterns
	function computeDimension(topLeft, topRight, bottomLeft, matrix) {
	    var moduleSize = (sum(countBlackWhiteRun(topLeft, bottomLeft, matrix, 5)) / 7 + // Divide by 7 since the ratio is 1:1:3:1:1
	        sum(countBlackWhiteRun(topLeft, topRight, matrix, 5)) / 7 +
	        sum(countBlackWhiteRun(bottomLeft, topLeft, matrix, 5)) / 7 +
	        sum(countBlackWhiteRun(topRight, topLeft, matrix, 5)) / 7) / 4;
	    if (moduleSize < 1) {
	        throw new Error("Invalid module size");
	    }
	    var topDimension = Math.round(distance(topLeft, topRight) / moduleSize);
	    var sideDimension = Math.round(distance(topLeft, bottomLeft) / moduleSize);
	    var dimension = Math.floor((topDimension + sideDimension) / 2) + 7;
	    switch (dimension % 4) {
	        case 0:
	            dimension++;
	            break;
	        case 2:
	            dimension--;
	            break;
	    }
	    return { dimension: dimension, moduleSize: moduleSize };
	}
	// Takes an origin point and an end point and counts the sizes of the black white run from the origin towards the end point.
	// Returns an array of elements, representing the pixel size of the black white run.
	// Uses a variant of http://en.wikipedia.org/wiki/Bresenham's_line_algorithm
	function countBlackWhiteRunTowardsPoint(origin, end, matrix, length) {
	    var switchPoints = [{ x: Math.floor(origin.x), y: Math.floor(origin.y) }];
	    var steep = Math.abs(end.y - origin.y) > Math.abs(end.x - origin.x);
	    var fromX;
	    var fromY;
	    var toX;
	    var toY;
	    if (steep) {
	        fromX = Math.floor(origin.y);
	        fromY = Math.floor(origin.x);
	        toX = Math.floor(end.y);
	        toY = Math.floor(end.x);
	    }
	    else {
	        fromX = Math.floor(origin.x);
	        fromY = Math.floor(origin.y);
	        toX = Math.floor(end.x);
	        toY = Math.floor(end.y);
	    }
	    var dx = Math.abs(toX - fromX);
	    var dy = Math.abs(toY - fromY);
	    var error = Math.floor(-dx / 2);
	    var xStep = fromX < toX ? 1 : -1;
	    var yStep = fromY < toY ? 1 : -1;
	    var currentPixel = true;
	    // Loop up until x == toX, but not beyond
	    for (var x = fromX, y = fromY; x !== toX + xStep; x += xStep) {
	        // Does current pixel mean we have moved white to black or vice versa?
	        // Scanning black in state 0,2 and white in state 1, so if we find the wrong
	        // color, advance to next state or end if we are in state 2 already
	        var realX = steep ? y : x;
	        var realY = steep ? x : y;
	        if (matrix.get(realX, realY) !== currentPixel) {
	            currentPixel = !currentPixel;
	            switchPoints.push({ x: realX, y: realY });
	            if (switchPoints.length === length + 1) {
	                break;
	            }
	        }
	        error += dy;
	        if (error > 0) {
	            if (y === toY) {
	                break;
	            }
	            y += yStep;
	            error -= dx;
	        }
	    }
	    var distances = [];
	    for (var i = 0; i < length; i++) {
	        if (switchPoints[i] && switchPoints[i + 1]) {
	            distances.push(distance(switchPoints[i], switchPoints[i + 1]));
	        }
	        else {
	            distances.push(0);
	        }
	    }
	    return distances;
	}
	// Takes an origin point and an end point and counts the sizes of the black white run in the origin point
	// along the line that intersects with the end point. Returns an array of elements, representing the pixel sizes
	// of the black white run. Takes a length which represents the number of switches from black to white to look for.
	function countBlackWhiteRun(origin, end, matrix, length) {
	    var _a;
	    var rise = end.y - origin.y;
	    var run = end.x - origin.x;
	    var towardsEnd = countBlackWhiteRunTowardsPoint(origin, end, matrix, Math.ceil(length / 2));
	    var awayFromEnd = countBlackWhiteRunTowardsPoint(origin, { x: origin.x - run, y: origin.y - rise }, matrix, Math.ceil(length / 2));
	    var middleValue = towardsEnd.shift() + awayFromEnd.shift() - 1; // Substract one so we don't double count a pixel
	    return (_a = awayFromEnd.concat(middleValue)).concat.apply(_a, towardsEnd);
	}
	// Takes in a black white run and an array of expected ratios. Returns the average size of the run as well as the "error" -
	// that is the amount the run diverges from the expected ratio
	function scoreBlackWhiteRun(sequence, ratios) {
	    var averageSize = sum(sequence) / sum(ratios);
	    var error = 0;
	    ratios.forEach(function (ratio, i) {
	        error += Math.pow((sequence[i] - ratio * averageSize), 2);
	    });
	    return { averageSize: averageSize, error: error };
	}
	// Takes an X,Y point and an array of sizes and scores the point against those ratios.
	// For example for a finder pattern takes the ratio list of 1:1:3:1:1 and checks horizontal, vertical and diagonal ratios
	// against that.
	function scorePattern(point, ratios, matrix) {
	    try {
	        var horizontalRun = countBlackWhiteRun(point, { x: -1, y: point.y }, matrix, ratios.length);
	        var verticalRun = countBlackWhiteRun(point, { x: point.x, y: -1 }, matrix, ratios.length);
	        var topLeftPoint = {
	            x: Math.max(0, point.x - point.y) - 1,
	            y: Math.max(0, point.y - point.x) - 1,
	        };
	        var topLeftBottomRightRun = countBlackWhiteRun(point, topLeftPoint, matrix, ratios.length);
	        var bottomLeftPoint = {
	            x: Math.min(matrix.width, point.x + point.y) + 1,
	            y: Math.min(matrix.height, point.y + point.x) + 1,
	        };
	        var bottomLeftTopRightRun = countBlackWhiteRun(point, bottomLeftPoint, matrix, ratios.length);
	        var horzError = scoreBlackWhiteRun(horizontalRun, ratios);
	        var vertError = scoreBlackWhiteRun(verticalRun, ratios);
	        var diagDownError = scoreBlackWhiteRun(topLeftBottomRightRun, ratios);
	        var diagUpError = scoreBlackWhiteRun(bottomLeftTopRightRun, ratios);
	        var ratioError = Math.sqrt(horzError.error * horzError.error +
	            vertError.error * vertError.error +
	            diagDownError.error * diagDownError.error +
	            diagUpError.error * diagUpError.error);
	        var avgSize = (horzError.averageSize + vertError.averageSize + diagDownError.averageSize + diagUpError.averageSize) / 4;
	        var sizeError = (Math.pow((horzError.averageSize - avgSize), 2) +
	            Math.pow((vertError.averageSize - avgSize), 2) +
	            Math.pow((diagDownError.averageSize - avgSize), 2) +
	            Math.pow((diagUpError.averageSize - avgSize), 2)) / avgSize;
	        return ratioError + sizeError;
	    }
	    catch (_a) {
	        return Infinity;
	    }
	}
	function recenterLocation(matrix, p) {
	    var leftX = Math.round(p.x);
	    while (matrix.get(leftX, Math.round(p.y))) {
	        leftX--;
	    }
	    var rightX = Math.round(p.x);
	    while (matrix.get(rightX, Math.round(p.y))) {
	        rightX++;
	    }
	    var x = (leftX + rightX) / 2;
	    var topY = Math.round(p.y);
	    while (matrix.get(Math.round(x), topY)) {
	        topY--;
	    }
	    var bottomY = Math.round(p.y);
	    while (matrix.get(Math.round(x), bottomY)) {
	        bottomY++;
	    }
	    var y = (topY + bottomY) / 2;
	    return { x: x, y: y };
	}
	function locate(matrix) {
	    var finderPatternQuads = [];
	    var activeFinderPatternQuads = [];
	    var alignmentPatternQuads = [];
	    var activeAlignmentPatternQuads = [];
	    var _loop_1 = function (y) {
	        var length_1 = 0;
	        var lastBit = false;
	        var scans = [0, 0, 0, 0, 0];
	        var _loop_2 = function (x) {
	            var v = matrix.get(x, y);
	            if (v === lastBit) {
	                length_1++;
	            }
	            else {
	                scans = [scans[1], scans[2], scans[3], scans[4], length_1];
	                length_1 = 1;
	                lastBit = v;
	                // Do the last 5 color changes ~ match the expected ratio for a finder pattern? 1:1:3:1:1 of b:w:b:w:b
	                var averageFinderPatternBlocksize = sum(scans) / 7;
	                var validFinderPattern = Math.abs(scans[0] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize &&
	                    Math.abs(scans[1] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize &&
	                    Math.abs(scans[2] - 3 * averageFinderPatternBlocksize) < 3 * averageFinderPatternBlocksize &&
	                    Math.abs(scans[3] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize &&
	                    Math.abs(scans[4] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize &&
	                    !v; // And make sure the current pixel is white since finder patterns are bordered in white
	                // Do the last 3 color changes ~ match the expected ratio for an alignment pattern? 1:1:1 of w:b:w
	                var averageAlignmentPatternBlocksize = sum(scans.slice(-3)) / 3;
	                var validAlignmentPattern = Math.abs(scans[2] - averageAlignmentPatternBlocksize) < averageAlignmentPatternBlocksize &&
	                    Math.abs(scans[3] - averageAlignmentPatternBlocksize) < averageAlignmentPatternBlocksize &&
	                    Math.abs(scans[4] - averageAlignmentPatternBlocksize) < averageAlignmentPatternBlocksize &&
	                    v; // Is the current pixel black since alignment patterns are bordered in black
	                if (validFinderPattern) {
	                    // Compute the start and end x values of the large center black square
	                    var endX_1 = x - scans[3] - scans[4];
	                    var startX_1 = endX_1 - scans[2];
	                    var line = { startX: startX_1, endX: endX_1, y: y };
	                    // Is there a quad directly above the current spot? If so, extend it with the new line. Otherwise, create a new quad with
	                    // that line as the starting point.
	                    var matchingQuads = activeFinderPatternQuads.filter(function (q) {
	                        return (startX_1 >= q.bottom.startX && startX_1 <= q.bottom.endX) ||
	                            (endX_1 >= q.bottom.startX && startX_1 <= q.bottom.endX) ||
	                            (startX_1 <= q.bottom.startX && endX_1 >= q.bottom.endX && ((scans[2] / (q.bottom.endX - q.bottom.startX)) < MAX_QUAD_RATIO &&
	                                (scans[2] / (q.bottom.endX - q.bottom.startX)) > MIN_QUAD_RATIO));
	                    });
	                    if (matchingQuads.length > 0) {
	                        matchingQuads[0].bottom = line;
	                    }
	                    else {
	                        activeFinderPatternQuads.push({ top: line, bottom: line });
	                    }
	                }
	                if (validAlignmentPattern) {
	                    // Compute the start and end x values of the center black square
	                    var endX_2 = x - scans[4];
	                    var startX_2 = endX_2 - scans[3];
	                    var line = { startX: startX_2, y: y, endX: endX_2 };
	                    // Is there a quad directly above the current spot? If so, extend it with the new line. Otherwise, create a new quad with
	                    // that line as the starting point.
	                    var matchingQuads = activeAlignmentPatternQuads.filter(function (q) {
	                        return (startX_2 >= q.bottom.startX && startX_2 <= q.bottom.endX) ||
	                            (endX_2 >= q.bottom.startX && startX_2 <= q.bottom.endX) ||
	                            (startX_2 <= q.bottom.startX && endX_2 >= q.bottom.endX && ((scans[2] / (q.bottom.endX - q.bottom.startX)) < MAX_QUAD_RATIO &&
	                                (scans[2] / (q.bottom.endX - q.bottom.startX)) > MIN_QUAD_RATIO));
	                    });
	                    if (matchingQuads.length > 0) {
	                        matchingQuads[0].bottom = line;
	                    }
	                    else {
	                        activeAlignmentPatternQuads.push({ top: line, bottom: line });
	                    }
	                }
	            }
	        };
	        for (var x = -1; x <= matrix.width; x++) {
	            _loop_2(x);
	        }
	        finderPatternQuads.push.apply(finderPatternQuads, activeFinderPatternQuads.filter(function (q) { return q.bottom.y !== y && q.bottom.y - q.top.y >= 2; }));
	        activeFinderPatternQuads = activeFinderPatternQuads.filter(function (q) { return q.bottom.y === y; });
	        alignmentPatternQuads.push.apply(alignmentPatternQuads, activeAlignmentPatternQuads.filter(function (q) { return q.bottom.y !== y; }));
	        activeAlignmentPatternQuads = activeAlignmentPatternQuads.filter(function (q) { return q.bottom.y === y; });
	    };
	    for (var y = 0; y <= matrix.height; y++) {
	        _loop_1(y);
	    }
	    finderPatternQuads.push.apply(finderPatternQuads, activeFinderPatternQuads.filter(function (q) { return q.bottom.y - q.top.y >= 2; }));
	    alignmentPatternQuads.push.apply(alignmentPatternQuads, activeAlignmentPatternQuads);
	    var finderPatternGroups = finderPatternQuads
	        .filter(function (q) { return q.bottom.y - q.top.y >= 2; }) // All quads must be at least 2px tall since the center square is larger than a block
	        .map(function (q) {
	        var x = (q.top.startX + q.top.endX + q.bottom.startX + q.bottom.endX) / 4;
	        var y = (q.top.y + q.bottom.y + 1) / 2;
	        if (!matrix.get(Math.round(x), Math.round(y))) {
	            return;
	        }
	        var lengths = [q.top.endX - q.top.startX, q.bottom.endX - q.bottom.startX, q.bottom.y - q.top.y + 1];
	        var size = sum(lengths) / lengths.length;
	        var score = scorePattern({ x: Math.round(x), y: Math.round(y) }, [1, 1, 3, 1, 1], matrix);
	        return { score: score, x: x, y: y, size: size };
	    })
	        .filter(function (q) { return !!q; }) // Filter out any rejected quads from above
	        .sort(function (a, b) { return a.score - b.score; })
	        // Now take the top finder pattern options and try to find 2 other options with a similar size.
	        .map(function (point, i, finderPatterns) {
	        if (i > MAX_FINDERPATTERNS_TO_SEARCH) {
	            return null;
	        }
	        var otherPoints = finderPatterns
	            .filter(function (p, ii) { return i !== ii; })
	            .map(function (p) { return ({ x: p.x, y: p.y, score: p.score + (Math.pow((p.size - point.size), 2)) / point.size, size: p.size }); })
	            .sort(function (a, b) { return a.score - b.score; });
	        if (otherPoints.length < 2) {
	            return null;
	        }
	        var score = point.score + otherPoints[0].score + otherPoints[1].score;
	        return { points: [point].concat(otherPoints.slice(0, 2)), score: score };
	    })
	        .filter(function (q) { return !!q; }) // Filter out any rejected finder patterns from above
	        .sort(function (a, b) { return a.score - b.score; });
	    if (finderPatternGroups.length === 0) {
	        return null;
	    }
	    var _a = reorderFinderPatterns(finderPatternGroups[0].points[0], finderPatternGroups[0].points[1], finderPatternGroups[0].points[2]), topRight = _a.topRight, topLeft = _a.topLeft, bottomLeft = _a.bottomLeft;
	    var alignment = findAlignmentPattern(matrix, alignmentPatternQuads, topRight, topLeft, bottomLeft);
	    var result = [];
	    if (alignment) {
	        result.push({
	            alignmentPattern: { x: alignment.alignmentPattern.x, y: alignment.alignmentPattern.y },
	            bottomLeft: { x: bottomLeft.x, y: bottomLeft.y },
	            dimension: alignment.dimension,
	            topLeft: { x: topLeft.x, y: topLeft.y },
	            topRight: { x: topRight.x, y: topRight.y },
	        });
	    }
	    // We normally use the center of the quads as the location of the tracking points, which is optimal for most cases and will account
	    // for a skew in the image. However, In some cases, a slight skew might not be real and instead be caused by image compression
	    // errors and/or low resolution. For those cases, we'd be better off centering the point exactly in the middle of the black area. We
	    // compute and return the location data for the naively centered points as it is little additional work and allows for multiple
	    // attempts at decoding harder images.
	    var midTopRight = recenterLocation(matrix, topRight);
	    var midTopLeft = recenterLocation(matrix, topLeft);
	    var midBottomLeft = recenterLocation(matrix, bottomLeft);
	    var centeredAlignment = findAlignmentPattern(matrix, alignmentPatternQuads, midTopRight, midTopLeft, midBottomLeft);
	    if (centeredAlignment) {
	        result.push({
	            alignmentPattern: { x: centeredAlignment.alignmentPattern.x, y: centeredAlignment.alignmentPattern.y },
	            bottomLeft: { x: midBottomLeft.x, y: midBottomLeft.y },
	            topLeft: { x: midTopLeft.x, y: midTopLeft.y },
	            topRight: { x: midTopRight.x, y: midTopRight.y },
	            dimension: centeredAlignment.dimension,
	        });
	    }
	    if (result.length === 0) {
	        return null;
	    }
	    return result;
	}
	exports.locate = locate;
	function findAlignmentPattern(matrix, alignmentPatternQuads, topRight, topLeft, bottomLeft) {
	    var _a;
	    // Now that we've found the three finder patterns we can determine the blockSize and the size of the QR code.
	    // We'll use these to help find the alignment pattern but also later when we do the extraction.
	    var dimension;
	    var moduleSize;
	    try {
	        (_a = computeDimension(topLeft, topRight, bottomLeft, matrix), dimension = _a.dimension, moduleSize = _a.moduleSize);
	    }
	    catch (e) {
	        return null;
	    }
	    // Now find the alignment pattern
	    var bottomRightFinderPattern = {
	        x: topRight.x - topLeft.x + bottomLeft.x,
	        y: topRight.y - topLeft.y + bottomLeft.y,
	    };
	    var modulesBetweenFinderPatterns = ((distance(topLeft, bottomLeft) + distance(topLeft, topRight)) / 2 / moduleSize);
	    var correctionToTopLeft = 1 - (3 / modulesBetweenFinderPatterns);
	    var expectedAlignmentPattern = {
	        x: topLeft.x + correctionToTopLeft * (bottomRightFinderPattern.x - topLeft.x),
	        y: topLeft.y + correctionToTopLeft * (bottomRightFinderPattern.y - topLeft.y),
	    };
	    var alignmentPatterns = alignmentPatternQuads
	        .map(function (q) {
	        var x = (q.top.startX + q.top.endX + q.bottom.startX + q.bottom.endX) / 4;
	        var y = (q.top.y + q.bottom.y + 1) / 2;
	        if (!matrix.get(Math.floor(x), Math.floor(y))) {
	            return;
	        }
	        var lengths = [q.top.endX - q.top.startX, q.bottom.endX - q.bottom.startX, (q.bottom.y - q.top.y + 1)];
	        sum(lengths) / lengths.length;
	        var sizeScore = scorePattern({ x: Math.floor(x), y: Math.floor(y) }, [1, 1, 1], matrix);
	        var score = sizeScore + distance({ x: x, y: y }, expectedAlignmentPattern);
	        return { x: x, y: y, score: score };
	    })
	        .filter(function (v) { return !!v; })
	        .sort(function (a, b) { return a.score - b.score; });
	    // If there are less than 15 modules between finder patterns it's a version 1 QR code and as such has no alignmemnt pattern
	    // so we can only use our best guess.
	    var alignmentPattern = modulesBetweenFinderPatterns >= 15 && alignmentPatterns.length ? alignmentPatterns[0] : expectedAlignmentPattern;
	    return { alignmentPattern: alignmentPattern, dimension: dimension };
	}


	/***/ })
	/******/ ])["default"];
	}); 
} (jsQR$1));

var jsQRExports = jsQR$1.exports;
var jsQR = /*@__PURE__*/getDefaultExportFromCjs(jsQRExports);

/* src/routes/Verification.svelte generated by Svelte v3.59.2 */
const file$3 = "src/routes/Verification.svelte";

// (27:27) 
function create_if_block_5(ctx) {
	let modal;
	let current;

	modal = new Modal({
			props: {
				$$slots: { default: [create_default_slot_2] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(modal.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(modal, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const modal_changes = {};

			if (dirty & /*$$scope*/ 524288) {
				modal_changes.$$scope = { dirty, ctx };
			}

			modal.$set(modal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(modal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(modal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(modal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_5.name,
		type: "if",
		source: "(27:27) ",
		ctx
	});

	return block;
}

// (9:0) {#if validated_data}
function create_if_block_1$1(ctx) {
	let modal;
	let updating_show;
	let current;

	function modal_show_binding(value) {
		/*modal_show_binding*/ ctx[14](value);
	}

	let modal_props = {
		$$slots: { default: [create_default_slot_1] },
		$$scope: { ctx }
	};

	if (/*validated_data*/ ctx[6] !== void 0) {
		modal_props.show = /*validated_data*/ ctx[6];
	}

	modal = new Modal({ props: modal_props, $$inline: true });
	binding_callbacks.push(() => bind(modal, 'show', modal_show_binding));

	const block = {
		c: function create() {
			create_component(modal.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(modal, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const modal_changes = {};

			if (dirty & /*$$scope, validated_data, l_validating*/ 524608) {
				modal_changes.$$scope = { dirty, ctx };
			}

			if (!updating_show && dirty & /*validated_data*/ 64) {
				updating_show = true;
				modal_changes.show = /*validated_data*/ ctx[6];
				add_flush_callback(() => updating_show = false);
			}

			modal.$set(modal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(modal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(modal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(modal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1$1.name,
		type: "if",
		source: "(9:0) {#if validated_data}",
		ctx
	});

	return block;
}

// (28:2) <Modal>
function create_default_slot_2(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Validando...");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_2.name,
		type: "slot",
		source: "(28:2) <Modal>",
		ctx
	});

	return block;
}

// (15:6) {#if validated_data.ticket_instance.is_test}
function create_if_block_4(ctx) {
	let p;

	const block = {
		c: function create() {
			p = element("p");
			p.textContent = "INGRESSO TESTE";
			attr_dev(p, "class", "blu");
			add_location(p, file$3, 14, 51, 711);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_4.name,
		type: "if",
		source: "(15:6) {#if validated_data.ticket_instance.is_test}",
		ctx
	});

	return block;
}

// (17:6) {#if validated_data.ticket_instance.validated_at}
function create_if_block_3(ctx) {
	let p;
	let t0;
	let t1_value = format_date(/*validated_data*/ ctx[6].ticket_instance.validated_at) + "";
	let t1;

	const block = {
		c: function create() {
			p = element("p");
			t0 = text("JÁ USADO: ");
			t1 = text(t1_value);
			attr_dev(p, "class", "red");
			add_location(p, file$3, 17, 8, 818);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, t0);
			append_dev(p, t1);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*validated_data*/ 64 && t1_value !== (t1_value = format_date(/*validated_data*/ ctx[6].ticket_instance.validated_at) + "")) set_data_dev(t1, t1_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(17:6) {#if validated_data.ticket_instance.validated_at}",
		ctx
	});

	return block;
}

// (21:6) {#if !validated_data.ticket_instance.validated_at}
function create_if_block_2(ctx) {
	let button;
	let t_value = (/*l_validating*/ ctx[8] ? '...' : 'Confirmar') + "";
	let t;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			button = element("button");
			t = text(t_value);
			attr_dev(button, "class", "grn svelte-snaebf");
			button.disabled = /*l_validating*/ ctx[8];
			add_location(button, file$3, 21, 8, 986);
		},
		m: function mount(target, anchor) {
			insert_dev(target, button, anchor);
			append_dev(button, t);

			if (!mounted) {
				dispose = listen_dev(button, "click", /*validate*/ ctx[12], false, false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*l_validating*/ 256 && t_value !== (t_value = (/*l_validating*/ ctx[8] ? '...' : 'Confirmar') + "")) set_data_dev(t, t_value);

			if (dirty & /*l_validating*/ 256) {
				prop_dev(button, "disabled", /*l_validating*/ ctx[8]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(button);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(21:6) {#if !validated_data.ticket_instance.validated_at}",
		ctx
	});

	return block;
}

// (10:2) <Modal bind:show={validated_data}>
function create_default_slot_1(ctx) {
	let div;
	let h2;
	let t0_value = /*validated_data*/ ctx[6].event.name + "";
	let t0;
	let t1;
	let br0;
	let t2;
	let span;
	let t3_value = /*validated_data*/ ctx[6].ticket.name + "";
	let t3;
	let t4;

	let t5_value = (/*validated_data*/ ctx[6].ticket_instance.is_half
	? 'Meia'
	: 'Inteira') + "";

	let t5;
	let t6;
	let br1;
	let t7;
	let t8;
	let t9;
	let t10;
	let button;
	let t11;
	let mounted;
	let dispose;
	let if_block0 = /*validated_data*/ ctx[6].ticket_instance.is_test && create_if_block_4(ctx);
	let if_block1 = /*validated_data*/ ctx[6].ticket_instance.validated_at && create_if_block_3(ctx);
	let if_block2 = !/*validated_data*/ ctx[6].ticket_instance.validated_at && create_if_block_2(ctx);

	const block = {
		c: function create() {
			div = element("div");
			h2 = element("h2");
			t0 = text(t0_value);
			t1 = space();
			br0 = element("br");
			t2 = space();
			span = element("span");
			t3 = text(t3_value);
			t4 = text(" - ");
			t5 = text(t5_value);
			t6 = space();
			br1 = element("br");
			t7 = space();
			if (if_block0) if_block0.c();
			t8 = space();
			if (if_block1) if_block1.c();
			t9 = space();
			if (if_block2) if_block2.c();
			t10 = space();
			button = element("button");
			t11 = text("Cancelar");
			add_location(h2, file$3, 11, 6, 479);
			add_location(br0, file$3, 11, 45, 518);
			attr_dev(span, "class", "detail b svelte-snaebf");
			add_location(span, file$3, 12, 6, 529);
			add_location(br1, file$3, 12, 131, 654);
			attr_dev(button, "class", "red svelte-snaebf");
			button.disabled = /*l_validating*/ ctx[8];
			add_location(button, file$3, 23, 6, 1116);
			attr_dev(div, "class", "tac");
			toggle_class(div, "red", /*validated_data*/ ctx[6].ticket_instance.validated_at);
			add_location(div, file$3, 10, 4, 399);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, h2);
			append_dev(h2, t0);
			append_dev(div, t1);
			append_dev(div, br0);
			append_dev(div, t2);
			append_dev(div, span);
			append_dev(span, t3);
			append_dev(span, t4);
			append_dev(span, t5);
			append_dev(div, t6);
			append_dev(div, br1);
			append_dev(div, t7);
			if (if_block0) if_block0.m(div, null);
			append_dev(div, t8);
			if (if_block1) if_block1.m(div, null);
			append_dev(div, t9);
			if (if_block2) if_block2.m(div, null);
			append_dev(div, t10);
			append_dev(div, button);
			append_dev(button, t11);

			if (!mounted) {
				dispose = listen_dev(button, "click", /*click_handler*/ ctx[13], false, false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (dirty & /*validated_data*/ 64 && t0_value !== (t0_value = /*validated_data*/ ctx[6].event.name + "")) set_data_dev(t0, t0_value);
			if (dirty & /*validated_data*/ 64 && t3_value !== (t3_value = /*validated_data*/ ctx[6].ticket.name + "")) set_data_dev(t3, t3_value);

			if (dirty & /*validated_data*/ 64 && t5_value !== (t5_value = (/*validated_data*/ ctx[6].ticket_instance.is_half
			? 'Meia'
			: 'Inteira') + "")) set_data_dev(t5, t5_value);

			if (/*validated_data*/ ctx[6].ticket_instance.is_test) {
				if (if_block0) ; else {
					if_block0 = create_if_block_4(ctx);
					if_block0.c();
					if_block0.m(div, t8);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*validated_data*/ ctx[6].ticket_instance.validated_at) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_3(ctx);
					if_block1.c();
					if_block1.m(div, t9);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (!/*validated_data*/ ctx[6].ticket_instance.validated_at) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block_2(ctx);
					if_block2.c();
					if_block2.m(div, t10);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (dirty & /*l_validating*/ 256) {
				prop_dev(button, "disabled", /*l_validating*/ ctx[8]);
			}

			if (dirty & /*validated_data*/ 64) {
				toggle_class(div, "red", /*validated_data*/ ctx[6].ticket_instance.validated_at);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_1.name,
		type: "slot",
		source: "(10:2) <Modal bind:show={validated_data}>",
		ctx
	});

	return block;
}

// (31:0) {#if error}
function create_if_block$2(ctx) {
	let modal;
	let updating_show;
	let current;

	function modal_show_binding_1(value) {
		/*modal_show_binding_1*/ ctx[15](value);
	}

	let modal_props = {
		$$slots: { default: [create_default_slot] },
		$$scope: { ctx }
	};

	if (/*error*/ ctx[4] !== void 0) {
		modal_props.show = /*error*/ ctx[4];
	}

	modal = new Modal({ props: modal_props, $$inline: true });
	binding_callbacks.push(() => bind(modal, 'show', modal_show_binding_1));

	const block = {
		c: function create() {
			create_component(modal.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(modal, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const modal_changes = {};

			if (dirty & /*$$scope, error*/ 524304) {
				modal_changes.$$scope = { dirty, ctx };
			}

			if (!updating_show && dirty & /*error*/ 16) {
				updating_show = true;
				modal_changes.show = /*error*/ ctx[4];
				add_flush_callback(() => updating_show = false);
			}

			modal.$set(modal_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(modal.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(modal.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(modal, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$2.name,
		type: "if",
		source: "(31:0) {#if error}",
		ctx
	});

	return block;
}

// (32:2) <Modal bind:show={error}>
function create_default_slot(ctx) {
	let p;
	let t;

	const block = {
		c: function create() {
			p = element("p");
			t = text(/*error*/ ctx[4]);
			attr_dev(p, "class", "red");
			add_location(p, file$3, 32, 4, 1356);
		},
		m: function mount(target, anchor) {
			insert_dev(target, p, anchor);
			append_dev(p, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*error*/ 16) set_data_dev(t, /*error*/ ctx[4]);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(p);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(32:2) <Modal bind:show={error}>",
		ctx
	});

	return block;
}

function create_fragment$4(ctx) {
	let div1;
	let div0;
	let t0;
	let t1;
	let canvas_1;
	let canvas_1_hidden_value;
	let t2;
	let input;
	let t3;
	let button;
	let t4;
	let button_disabled_value;
	let t5;
	let current_block_type_index;
	let if_block0;
	let t6;
	let if_block1_anchor;
	let current;
	let mounted;
	let dispose;
	const if_block_creators = [create_if_block_1$1, create_if_block_5];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*validated_data*/ ctx[6]) return 0;
		if (/*l_validated_data*/ ctx[7]) return 1;
		return -1;
	}

	if (~(current_block_type_index = select_block_type(ctx))) {
		if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	}

	let if_block1 = /*error*/ ctx[4] && create_if_block$2(ctx);

	const block = {
		c: function create() {
			div1 = element("div");
			div0 = element("div");
			t0 = text(/*loading_message*/ ctx[9]);
			t1 = space();
			canvas_1 = element("canvas");
			t2 = space();
			input = element("input");
			t3 = space();
			button = element("button");
			t4 = text("Validar");
			t5 = space();
			if (if_block0) if_block0.c();
			t6 = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
			div0.hidden = /*cam_loaded*/ ctx[0];
			add_location(div0, file$3, 1, 2, 24);
			attr_dev(canvas_1, "width", /*width*/ ctx[1]);
			attr_dev(canvas_1, "height", /*height*/ ctx[2]);
			canvas_1.hidden = canvas_1_hidden_value = !/*cam_loaded*/ ctx[0];
			attr_dev(canvas_1, "class", "svelte-snaebf");
			toggle_class(canvas_1, "reading", /*reading*/ ctx[3]);
			add_location(canvas_1, file$3, 2, 2, 77);
			attr_dev(input, "placeholder", "Leia o QR ou digite");
			attr_dev(input, "class", "svelte-snaebf");
			toggle_class(input, "grn", /*reading*/ ctx[3]);
			add_location(input, file$3, 4, 2, 153);
			attr_dev(button, "class", "grn svelte-snaebf");
			button.disabled = button_disabled_value = !/*code*/ ctx[5];
			add_location(button, file$3, 5, 2, 242);
			attr_dev(div1, "class", "content svelte-snaebf");
			add_location(div1, file$3, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			append_dev(div1, div0);
			append_dev(div0, t0);
			append_dev(div1, t1);
			append_dev(div1, canvas_1);
			append_dev(div1, t2);
			append_dev(div1, input);
			append_dev(div1, t3);
			append_dev(div1, button);
			append_dev(button, t4);
			insert_dev(target, t5, anchor);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].m(target, anchor);
			}

			insert_dev(target, t6, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert_dev(target, if_block1_anchor, anchor);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(input, "input", /*update_code*/ ctx[10], false, false, false, false),
					listen_dev(button, "click", /*get_ticket_instance*/ ctx[11], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (!current || dirty & /*loading_message*/ 512) set_data_dev(t0, /*loading_message*/ ctx[9]);

			if (!current || dirty & /*cam_loaded*/ 1) {
				prop_dev(div0, "hidden", /*cam_loaded*/ ctx[0]);
			}

			if (!current || dirty & /*width*/ 2) {
				attr_dev(canvas_1, "width", /*width*/ ctx[1]);
			}

			if (!current || dirty & /*height*/ 4) {
				attr_dev(canvas_1, "height", /*height*/ ctx[2]);
			}

			if (!current || dirty & /*cam_loaded*/ 1 && canvas_1_hidden_value !== (canvas_1_hidden_value = !/*cam_loaded*/ ctx[0])) {
				prop_dev(canvas_1, "hidden", canvas_1_hidden_value);
			}

			if (!current || dirty & /*reading*/ 8) {
				toggle_class(canvas_1, "reading", /*reading*/ ctx[3]);
			}

			if (!current || dirty & /*reading*/ 8) {
				toggle_class(input, "grn", /*reading*/ ctx[3]);
			}

			if (!current || dirty & /*code*/ 32 && button_disabled_value !== (button_disabled_value = !/*code*/ ctx[5])) {
				prop_dev(button, "disabled", button_disabled_value);
			}

			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if (~current_block_type_index) {
					if_blocks[current_block_type_index].p(ctx, dirty);
				}
			} else {
				if (if_block0) {
					group_outros();

					transition_out(if_blocks[previous_block_index], 1, 1, () => {
						if_blocks[previous_block_index] = null;
					});

					check_outros();
				}

				if (~current_block_type_index) {
					if_block0 = if_blocks[current_block_type_index];

					if (!if_block0) {
						if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
						if_block0.c();
					} else {
						if_block0.p(ctx, dirty);
					}

					transition_in(if_block0, 1);
					if_block0.m(t6.parentNode, t6);
				} else {
					if_block0 = null;
				}
			}

			if (/*error*/ ctx[4]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*error*/ 16) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block$2(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(if_block1);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block0);
			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			if (detaching) detach_dev(t5);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].d(detaching);
			}

			if (detaching) detach_dev(t6);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach_dev(if_block1_anchor);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$4.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$4($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Verification', slots, []);
	let canvas, cam_loaded, width, height, reading, error, code, validated_data;
	let l_validated_data, l_validating;
	let loading_message = '🎥 Câmera inacessível, tente recarregar a página';
	let video = document.createElement('video');

	function update_code() {
		$$invalidate(5, code = document.querySelector('input').value);
	}

	function tick() {
		if (video.readyState != video.HAVE_ENOUGH_DATA) return requestAnimationFrame(tick);
		$$invalidate(0, cam_loaded = true);
		$$invalidate(2, height = video.videoHeight);
		$$invalidate(1, width = video.videoWidth);
		canvas.drawImage(video, 0, 0, width, height);
		const image_data = canvas.getImageData(0, 0, width, height);
		const read_code = jsQR(image_data.data, width, height, { inversionAttempts: 'dontInvert' });
		$$invalidate(3, reading = Boolean(read_code));

		if (read_code) {
			$$invalidate(5, code = read_code.data);
			document.querySelector('input').value = code;
			draw_square(canvas, read_code.location.topLeftCorner, read_code.location.topRightCorner, read_code.location.bottomRightCorner, read_code.location.bottomLeftCorner, '#00FF00');
		}

		setTimeout(_ => requestAnimationFrame(tick), 50);
	}

	async function get_ticket_instance() {
		$$invalidate(7, l_validated_data = true);
		const { res, data } = await api(`ticket-instance/${code}`);
		if (!res.ok) return $$invalidate(4, error = 'Ingresso não encontrado');
		$$invalidate(6, validated_data = data);
		$$invalidate(7, l_validated_data = false);
	}

	async function validate() {
		$$invalidate(8, l_validating = true);
		await api(`validate-ticket-instance/${code}`, 'PUT');

		history.update(curr => [
			...curr,
			{
				id: validated_data.ticket_instance.id,
				event: validated_data.event.name,
				ticket: validated_data.ticket.name,
				is_half: validated_data.ticket_instance.is_half,
				validated_at: new Date().toISOString()
			}
		]);

		$$invalidate(6, validated_data = undefined);
		document.querySelector('input').value = '';
		update_code();
		$$invalidate(8, l_validating = false);
	}

	onMount(async _ => {
		canvas = document.querySelector('canvas').getContext('2d');
		const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
		video.srcObject = stream;
		video.setAttribute('playsinline', true);
		video.play();
		requestAnimationFrame(tick);
		$$invalidate(9, loading_message = '⌛ Loading video...');
	});

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Verification> was created with unknown prop '${key}'`);
	});

	const click_handler = _ => $$invalidate(6, validated_data = undefined);

	function modal_show_binding(value) {
		validated_data = value;
		$$invalidate(6, validated_data);
	}

	function modal_show_binding_1(value) {
		error = value;
		$$invalidate(4, error);
	}

	$$self.$capture_state = () => ({
		Modal,
		draw_square,
		format_date,
		history,
		api,
		onMount,
		jsQR,
		canvas,
		cam_loaded,
		width,
		height,
		reading,
		error,
		code,
		validated_data,
		l_validated_data,
		l_validating,
		loading_message,
		video,
		update_code,
		tick,
		get_ticket_instance,
		validate
	});

	$$self.$inject_state = $$props => {
		if ('canvas' in $$props) canvas = $$props.canvas;
		if ('cam_loaded' in $$props) $$invalidate(0, cam_loaded = $$props.cam_loaded);
		if ('width' in $$props) $$invalidate(1, width = $$props.width);
		if ('height' in $$props) $$invalidate(2, height = $$props.height);
		if ('reading' in $$props) $$invalidate(3, reading = $$props.reading);
		if ('error' in $$props) $$invalidate(4, error = $$props.error);
		if ('code' in $$props) $$invalidate(5, code = $$props.code);
		if ('validated_data' in $$props) $$invalidate(6, validated_data = $$props.validated_data);
		if ('l_validated_data' in $$props) $$invalidate(7, l_validated_data = $$props.l_validated_data);
		if ('l_validating' in $$props) $$invalidate(8, l_validating = $$props.l_validating);
		if ('loading_message' in $$props) $$invalidate(9, loading_message = $$props.loading_message);
		if ('video' in $$props) video = $$props.video;
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		cam_loaded,
		width,
		height,
		reading,
		error,
		code,
		validated_data,
		l_validated_data,
		l_validating,
		loading_message,
		update_code,
		get_ticket_instance,
		validate,
		click_handler,
		modal_show_binding,
		modal_show_binding_1
	];
}

class Verification extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Verification",
			options,
			id: create_fragment$4.name
		});
	}
}

/* src/components/ValidatedCard.svelte generated by Svelte v3.59.2 */
const file$2 = "src/components/ValidatedCard.svelte";

function create_fragment$3(ctx) {
	let div2;
	let div1;
	let div0;
	let b0;
	let t0_value = /*data*/ ctx[0].event + "";
	let t0;
	let t1;
	let b1;
	let t2_value = /*data*/ ctx[0].ticket + "";
	let t2;
	let t3;
	let b2;
	let t4_value = (/*data*/ ctx[0].is_half ? 'Meia' : 'Inteira') + "";
	let t4;
	let t5;
	let t6_value = format_date(/*data*/ ctx[0].validated_at) + "";
	let t6;
	let t7;
	let t8;
	let code;
	let t9_value = /*data*/ ctx[0].id + "";
	let t9;
	let t10;
	let button;
	let current;

	button = new Button({
			props: {
				class: "blu right",
				action: /*undo*/ ctx[1],
				i: "undo"
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			div2 = element("div");
			div1 = element("div");
			div0 = element("div");
			b0 = element("b");
			t0 = text(t0_value);
			t1 = text(" | ");
			b1 = element("b");
			t2 = text(t2_value);
			t3 = text(" - ");
			b2 = element("b");
			t4 = text(t4_value);
			t5 = text("\n      (");
			t6 = text(t6_value);
			t7 = text(")");
			t8 = space();
			code = element("code");
			t9 = text(t9_value);
			t10 = space();
			create_component(button.$$.fragment);
			add_location(b0, file$2, 3, 6, 47);
			add_location(b1, file$2, 3, 30, 71);
			add_location(b2, file$2, 3, 55, 96);
			add_location(div0, file$2, 2, 4, 35);
			add_location(code, file$2, 6, 4, 197);
			add_location(div1, file$2, 1, 2, 25);
			attr_dev(div2, "class", "row card svelte-ozt7o6");
			add_location(div2, file$2, 0, 0, 0);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, div2, anchor);
			append_dev(div2, div1);
			append_dev(div1, div0);
			append_dev(div0, b0);
			append_dev(b0, t0);
			append_dev(div0, t1);
			append_dev(div0, b1);
			append_dev(b1, t2);
			append_dev(div0, t3);
			append_dev(div0, b2);
			append_dev(b2, t4);
			append_dev(div0, t5);
			append_dev(div0, t6);
			append_dev(div0, t7);
			append_dev(div1, t8);
			append_dev(div1, code);
			append_dev(code, t9);
			append_dev(div2, t10);
			mount_component(button, div2, null);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if ((!current || dirty & /*data*/ 1) && t0_value !== (t0_value = /*data*/ ctx[0].event + "")) set_data_dev(t0, t0_value);
			if ((!current || dirty & /*data*/ 1) && t2_value !== (t2_value = /*data*/ ctx[0].ticket + "")) set_data_dev(t2, t2_value);
			if ((!current || dirty & /*data*/ 1) && t4_value !== (t4_value = (/*data*/ ctx[0].is_half ? 'Meia' : 'Inteira') + "")) set_data_dev(t4, t4_value);
			if ((!current || dirty & /*data*/ 1) && t6_value !== (t6_value = format_date(/*data*/ ctx[0].validated_at) + "")) set_data_dev(t6, t6_value);
			if ((!current || dirty & /*data*/ 1) && t9_value !== (t9_value = /*data*/ ctx[0].id + "")) set_data_dev(t9, t9_value);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(button.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(button.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
			destroy_component(button);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('ValidatedCard', slots, []);
	let { data } = $$props;

	function undo() {
		if (!confirm('Certeza que quer reativar esse ingresso?')) return;
		history.update(curr => curr.filter(v => v.id != data.id));
		api(`undo-validation/${data.id}`, 'PUT');
	}

	$$self.$$.on_mount.push(function () {
		if (data === undefined && !('data' in $$props || $$self.$$.bound[$$self.$$.props['data']])) {
			console.warn("<ValidatedCard> was created without expected prop 'data'");
		}
	});

	const writable_props = ['data'];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ValidatedCard> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ('data' in $$props) $$invalidate(0, data = $$props.data);
	};

	$$self.$capture_state = () => ({
		Button,
		format_date,
		history,
		api,
		data,
		undo
	});

	$$self.$inject_state = $$props => {
		if ('data' in $$props) $$invalidate(0, data = $$props.data);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [data, undo];
}

class ValidatedCard extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3, create_fragment$3, safe_not_equal, { data: 0 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "ValidatedCard",
			options,
			id: create_fragment$3.name
		});
	}

	get data() {
		throw new Error("<ValidatedCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set data(value) {
		throw new Error("<ValidatedCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/routes/History.svelte generated by Svelte v3.59.2 */

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[1] = list[i];
	return child_ctx;
}

// (1:0) {#if !$history?.length}
function create_if_block$1(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Você não validou nenhum ingresso nessa sessão");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$1.name,
		type: "if",
		source: "(1:0) {#if !$history?.length}",
		ctx
	});

	return block;
}

// (3:0) {#each $history as validated}
function create_each_block$1(ctx) {
	let validatedcard;
	let current;

	validatedcard = new ValidatedCard({
			props: { data: /*validated*/ ctx[1] },
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(validatedcard.$$.fragment);
		},
		m: function mount(target, anchor) {
			mount_component(validatedcard, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const validatedcard_changes = {};
			if (dirty & /*$history*/ 1) validatedcard_changes.data = /*validated*/ ctx[1];
			validatedcard.$set(validatedcard_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(validatedcard.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(validatedcard.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(validatedcard, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$1.name,
		type: "each",
		source: "(3:0) {#each $history as validated}",
		ctx
	});

	return block;
}

function create_fragment$2(ctx) {
	let t;
	let each_1_anchor;
	let current;
	let if_block = !/*$history*/ ctx[0]?.length && create_if_block$1(ctx);
	let each_value = /*$history*/ ctx[0];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			t = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, t, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(target, anchor);
				}
			}

			insert_dev(target, each_1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (!/*$history*/ ctx[0]?.length) {
				if (if_block) ; else {
					if_block = create_if_block$1(ctx);
					if_block.c();
					if_block.m(t.parentNode, t);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty & /*$history*/ 1) {
				each_value = /*$history*/ ctx[0];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(t);
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(each_1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2($$self, $$props, $$invalidate) {
	let $history;
	validate_store(history, 'history');
	component_subscribe($$self, history, $$value => $$invalidate(0, $history = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('History', slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<History> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({ ValidatedCard, history, $history });
	return [$history];
}

class History extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "History",
			options,
			id: create_fragment$2.name
		});
	}
}

var browser = {};

// can-promise has a crash in some versions of react native that dont have
// standard global objects
// https://github.com/soldair/node-qrcode/issues/157

var canPromise$1 = function () {
  return typeof Promise === 'function' && Promise.prototype && Promise.prototype.then
};

var qrcode = {};

var utils$1 = {};

let toSJISFunction;
const CODEWORDS_COUNT = [
  0, // Not used
  26, 44, 70, 100, 134, 172, 196, 242, 292, 346,
  404, 466, 532, 581, 655, 733, 815, 901, 991, 1085,
  1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921, 2051, 2185,
  2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706
];

/**
 * Returns the QR Code size for the specified version
 *
 * @param  {Number} version QR Code version
 * @return {Number}         size of QR code
 */
utils$1.getSymbolSize = function getSymbolSize (version) {
  if (!version) throw new Error('"version" cannot be null or undefined')
  if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40')
  return version * 4 + 17
};

/**
 * Returns the total number of codewords used to store data and EC information.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Data length in bits
 */
utils$1.getSymbolTotalCodewords = function getSymbolTotalCodewords (version) {
  return CODEWORDS_COUNT[version]
};

/**
 * Encode data with Bose-Chaudhuri-Hocquenghem
 *
 * @param  {Number} data Value to encode
 * @return {Number}      Encoded value
 */
utils$1.getBCHDigit = function (data) {
  let digit = 0;

  while (data !== 0) {
    digit++;
    data >>>= 1;
  }

  return digit
};

utils$1.setToSJISFunction = function setToSJISFunction (f) {
  if (typeof f !== 'function') {
    throw new Error('"toSJISFunc" is not a valid function.')
  }

  toSJISFunction = f;
};

utils$1.isKanjiModeEnabled = function () {
  return typeof toSJISFunction !== 'undefined'
};

utils$1.toSJIS = function toSJIS (kanji) {
  return toSJISFunction(kanji)
};

var errorCorrectionLevel = {};

(function (exports) {
	exports.L = { bit: 1 };
	exports.M = { bit: 0 };
	exports.Q = { bit: 3 };
	exports.H = { bit: 2 };

	function fromString (string) {
	  if (typeof string !== 'string') {
	    throw new Error('Param is not a string')
	  }

	  const lcStr = string.toLowerCase();

	  switch (lcStr) {
	    case 'l':
	    case 'low':
	      return exports.L

	    case 'm':
	    case 'medium':
	      return exports.M

	    case 'q':
	    case 'quartile':
	      return exports.Q

	    case 'h':
	    case 'high':
	      return exports.H

	    default:
	      throw new Error('Unknown EC Level: ' + string)
	  }
	}

	exports.isValid = function isValid (level) {
	  return level && typeof level.bit !== 'undefined' &&
	    level.bit >= 0 && level.bit < 4
	};

	exports.from = function from (value, defaultValue) {
	  if (exports.isValid(value)) {
	    return value
	  }

	  try {
	    return fromString(value)
	  } catch (e) {
	    return defaultValue
	  }
	}; 
} (errorCorrectionLevel));

function BitBuffer$1 () {
  this.buffer = [];
  this.length = 0;
}

BitBuffer$1.prototype = {

  get: function (index) {
    const bufIndex = Math.floor(index / 8);
    return ((this.buffer[bufIndex] >>> (7 - index % 8)) & 1) === 1
  },

  put: function (num, length) {
    for (let i = 0; i < length; i++) {
      this.putBit(((num >>> (length - i - 1)) & 1) === 1);
    }
  },

  getLengthInBits: function () {
    return this.length
  },

  putBit: function (bit) {
    const bufIndex = Math.floor(this.length / 8);
    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0);
    }

    if (bit) {
      this.buffer[bufIndex] |= (0x80 >>> (this.length % 8));
    }

    this.length++;
  }
};

var bitBuffer = BitBuffer$1;

/**
 * Helper class to handle QR Code symbol modules
 *
 * @param {Number} size Symbol size
 */

function BitMatrix$1 (size) {
  if (!size || size < 1) {
    throw new Error('BitMatrix size must be defined and greater than 0')
  }

  this.size = size;
  this.data = new Uint8Array(size * size);
  this.reservedBit = new Uint8Array(size * size);
}

/**
 * Set bit value at specified location
 * If reserved flag is set, this bit will be ignored during masking process
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 * @param {Boolean} reserved
 */
BitMatrix$1.prototype.set = function (row, col, value, reserved) {
  const index = row * this.size + col;
  this.data[index] = value;
  if (reserved) this.reservedBit[index] = true;
};

/**
 * Returns bit value at specified location
 *
 * @param  {Number}  row
 * @param  {Number}  col
 * @return {Boolean}
 */
BitMatrix$1.prototype.get = function (row, col) {
  return this.data[row * this.size + col]
};

/**
 * Applies xor operator at specified location
 * (used during masking process)
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 */
BitMatrix$1.prototype.xor = function (row, col, value) {
  this.data[row * this.size + col] ^= value;
};

/**
 * Check if bit at specified location is reserved
 *
 * @param {Number}   row
 * @param {Number}   col
 * @return {Boolean}
 */
BitMatrix$1.prototype.isReserved = function (row, col) {
  return this.reservedBit[row * this.size + col]
};

var bitMatrix = BitMatrix$1;

var alignmentPattern = {};

/**
 * Alignment pattern are fixed reference pattern in defined positions
 * in a matrix symbology, which enables the decode software to re-synchronise
 * the coordinate mapping of the image modules in the event of moderate amounts
 * of distortion of the image.
 *
 * Alignment patterns are present only in QR Code symbols of version 2 or larger
 * and their number depends on the symbol version.
 */

(function (exports) {
	const getSymbolSize = utils$1.getSymbolSize;

	/**
	 * Calculate the row/column coordinates of the center module of each alignment pattern
	 * for the specified QR Code version.
	 *
	 * The alignment patterns are positioned symmetrically on either side of the diagonal
	 * running from the top left corner of the symbol to the bottom right corner.
	 *
	 * Since positions are simmetrical only half of the coordinates are returned.
	 * Each item of the array will represent in turn the x and y coordinate.
	 * @see {@link getPositions}
	 *
	 * @param  {Number} version QR Code version
	 * @return {Array}          Array of coordinate
	 */
	exports.getRowColCoords = function getRowColCoords (version) {
	  if (version === 1) return []

	  const posCount = Math.floor(version / 7) + 2;
	  const size = getSymbolSize(version);
	  const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
	  const positions = [size - 7]; // Last coord is always (size - 7)

	  for (let i = 1; i < posCount - 1; i++) {
	    positions[i] = positions[i - 1] - intervals;
	  }

	  positions.push(6); // First coord is always 6

	  return positions.reverse()
	};

	/**
	 * Returns an array containing the positions of each alignment pattern.
	 * Each array's element represent the center point of the pattern as (x, y) coordinates
	 *
	 * Coordinates are calculated expanding the row/column coordinates returned by {@link getRowColCoords}
	 * and filtering out the items that overlaps with finder pattern
	 *
	 * @example
	 * For a Version 7 symbol {@link getRowColCoords} returns values 6, 22 and 38.
	 * The alignment patterns, therefore, are to be centered on (row, column)
	 * positions (6,22), (22,6), (22,22), (22,38), (38,22), (38,38).
	 * Note that the coordinates (6,6), (6,38), (38,6) are occupied by finder patterns
	 * and are not therefore used for alignment patterns.
	 *
	 * let pos = getPositions(7)
	 * // [[6,22], [22,6], [22,22], [22,38], [38,22], [38,38]]
	 *
	 * @param  {Number} version QR Code version
	 * @return {Array}          Array of coordinates
	 */
	exports.getPositions = function getPositions (version) {
	  const coords = [];
	  const pos = exports.getRowColCoords(version);
	  const posLength = pos.length;

	  for (let i = 0; i < posLength; i++) {
	    for (let j = 0; j < posLength; j++) {
	      // Skip if position is occupied by finder patterns
	      if ((i === 0 && j === 0) || // top-left
	          (i === 0 && j === posLength - 1) || // bottom-left
	          (i === posLength - 1 && j === 0)) { // top-right
	        continue
	      }

	      coords.push([pos[i], pos[j]]);
	    }
	  }

	  return coords
	}; 
} (alignmentPattern));

var finderPattern = {};

const getSymbolSize = utils$1.getSymbolSize;
const FINDER_PATTERN_SIZE = 7;

/**
 * Returns an array containing the positions of each finder pattern.
 * Each array's element represent the top-left point of the pattern as (x, y) coordinates
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */
finderPattern.getPositions = function getPositions (version) {
  const size = getSymbolSize(version);

  return [
    // top-left
    [0, 0],
    // top-right
    [size - FINDER_PATTERN_SIZE, 0],
    // bottom-left
    [0, size - FINDER_PATTERN_SIZE]
  ]
};

var maskPattern = {};

/**
 * Data mask pattern reference
 * @type {Object}
 */

(function (exports) {
	exports.Patterns = {
	  PATTERN000: 0,
	  PATTERN001: 1,
	  PATTERN010: 2,
	  PATTERN011: 3,
	  PATTERN100: 4,
	  PATTERN101: 5,
	  PATTERN110: 6,
	  PATTERN111: 7
	};

	/**
	 * Weighted penalty scores for the undesirable features
	 * @type {Object}
	 */
	const PenaltyScores = {
	  N1: 3,
	  N2: 3,
	  N3: 40,
	  N4: 10
	};

	/**
	 * Check if mask pattern value is valid
	 *
	 * @param  {Number}  mask    Mask pattern
	 * @return {Boolean}         true if valid, false otherwise
	 */
	exports.isValid = function isValid (mask) {
	  return mask != null && mask !== '' && !isNaN(mask) && mask >= 0 && mask <= 7
	};

	/**
	 * Returns mask pattern from a value.
	 * If value is not valid, returns undefined
	 *
	 * @param  {Number|String} value        Mask pattern value
	 * @return {Number}                     Valid mask pattern or undefined
	 */
	exports.from = function from (value) {
	  return exports.isValid(value) ? parseInt(value, 10) : undefined
	};

	/**
	* Find adjacent modules in row/column with the same color
	* and assign a penalty value.
	*
	* Points: N1 + i
	* i is the amount by which the number of adjacent modules of the same color exceeds 5
	*/
	exports.getPenaltyN1 = function getPenaltyN1 (data) {
	  const size = data.size;
	  let points = 0;
	  let sameCountCol = 0;
	  let sameCountRow = 0;
	  let lastCol = null;
	  let lastRow = null;

	  for (let row = 0; row < size; row++) {
	    sameCountCol = sameCountRow = 0;
	    lastCol = lastRow = null;

	    for (let col = 0; col < size; col++) {
	      let module = data.get(row, col);
	      if (module === lastCol) {
	        sameCountCol++;
	      } else {
	        if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
	        lastCol = module;
	        sameCountCol = 1;
	      }

	      module = data.get(col, row);
	      if (module === lastRow) {
	        sameCountRow++;
	      } else {
	        if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
	        lastRow = module;
	        sameCountRow = 1;
	      }
	    }

	    if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
	    if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
	  }

	  return points
	};

	/**
	 * Find 2x2 blocks with the same color and assign a penalty value
	 *
	 * Points: N2 * (m - 1) * (n - 1)
	 */
	exports.getPenaltyN2 = function getPenaltyN2 (data) {
	  const size = data.size;
	  let points = 0;

	  for (let row = 0; row < size - 1; row++) {
	    for (let col = 0; col < size - 1; col++) {
	      const last = data.get(row, col) +
	        data.get(row, col + 1) +
	        data.get(row + 1, col) +
	        data.get(row + 1, col + 1);

	      if (last === 4 || last === 0) points++;
	    }
	  }

	  return points * PenaltyScores.N2
	};

	/**
	 * Find 1:1:3:1:1 ratio (dark:light:dark:light:dark) pattern in row/column,
	 * preceded or followed by light area 4 modules wide
	 *
	 * Points: N3 * number of pattern found
	 */
	exports.getPenaltyN3 = function getPenaltyN3 (data) {
	  const size = data.size;
	  let points = 0;
	  let bitsCol = 0;
	  let bitsRow = 0;

	  for (let row = 0; row < size; row++) {
	    bitsCol = bitsRow = 0;
	    for (let col = 0; col < size; col++) {
	      bitsCol = ((bitsCol << 1) & 0x7FF) | data.get(row, col);
	      if (col >= 10 && (bitsCol === 0x5D0 || bitsCol === 0x05D)) points++;

	      bitsRow = ((bitsRow << 1) & 0x7FF) | data.get(col, row);
	      if (col >= 10 && (bitsRow === 0x5D0 || bitsRow === 0x05D)) points++;
	    }
	  }

	  return points * PenaltyScores.N3
	};

	/**
	 * Calculate proportion of dark modules in entire symbol
	 *
	 * Points: N4 * k
	 *
	 * k is the rating of the deviation of the proportion of dark modules
	 * in the symbol from 50% in steps of 5%
	 */
	exports.getPenaltyN4 = function getPenaltyN4 (data) {
	  let darkCount = 0;
	  const modulesCount = data.data.length;

	  for (let i = 0; i < modulesCount; i++) darkCount += data.data[i];

	  const k = Math.abs(Math.ceil((darkCount * 100 / modulesCount) / 5) - 10);

	  return k * PenaltyScores.N4
	};

	/**
	 * Return mask value at given position
	 *
	 * @param  {Number} maskPattern Pattern reference value
	 * @param  {Number} i           Row
	 * @param  {Number} j           Column
	 * @return {Boolean}            Mask value
	 */
	function getMaskAt (maskPattern, i, j) {
	  switch (maskPattern) {
	    case exports.Patterns.PATTERN000: return (i + j) % 2 === 0
	    case exports.Patterns.PATTERN001: return i % 2 === 0
	    case exports.Patterns.PATTERN010: return j % 3 === 0
	    case exports.Patterns.PATTERN011: return (i + j) % 3 === 0
	    case exports.Patterns.PATTERN100: return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0
	    case exports.Patterns.PATTERN101: return (i * j) % 2 + (i * j) % 3 === 0
	    case exports.Patterns.PATTERN110: return ((i * j) % 2 + (i * j) % 3) % 2 === 0
	    case exports.Patterns.PATTERN111: return ((i * j) % 3 + (i + j) % 2) % 2 === 0

	    default: throw new Error('bad maskPattern:' + maskPattern)
	  }
	}

	/**
	 * Apply a mask pattern to a BitMatrix
	 *
	 * @param  {Number}    pattern Pattern reference number
	 * @param  {BitMatrix} data    BitMatrix data
	 */
	exports.applyMask = function applyMask (pattern, data) {
	  const size = data.size;

	  for (let col = 0; col < size; col++) {
	    for (let row = 0; row < size; row++) {
	      if (data.isReserved(row, col)) continue
	      data.xor(row, col, getMaskAt(pattern, row, col));
	    }
	  }
	};

	/**
	 * Returns the best mask pattern for data
	 *
	 * @param  {BitMatrix} data
	 * @return {Number} Mask pattern reference number
	 */
	exports.getBestMask = function getBestMask (data, setupFormatFunc) {
	  const numPatterns = Object.keys(exports.Patterns).length;
	  let bestPattern = 0;
	  let lowerPenalty = Infinity;

	  for (let p = 0; p < numPatterns; p++) {
	    setupFormatFunc(p);
	    exports.applyMask(p, data);

	    // Calculate penalty
	    const penalty =
	      exports.getPenaltyN1(data) +
	      exports.getPenaltyN2(data) +
	      exports.getPenaltyN3(data) +
	      exports.getPenaltyN4(data);

	    // Undo previously applied mask
	    exports.applyMask(p, data);

	    if (penalty < lowerPenalty) {
	      lowerPenalty = penalty;
	      bestPattern = p;
	    }
	  }

	  return bestPattern
	}; 
} (maskPattern));

var errorCorrectionCode = {};

const ECLevel$1 = errorCorrectionLevel;

const EC_BLOCKS_TABLE = [
// L  M  Q  H
  1, 1, 1, 1,
  1, 1, 1, 1,
  1, 1, 2, 2,
  1, 2, 2, 4,
  1, 2, 4, 4,
  2, 4, 4, 4,
  2, 4, 6, 5,
  2, 4, 6, 6,
  2, 5, 8, 8,
  4, 5, 8, 8,
  4, 5, 8, 11,
  4, 8, 10, 11,
  4, 9, 12, 16,
  4, 9, 16, 16,
  6, 10, 12, 18,
  6, 10, 17, 16,
  6, 11, 16, 19,
  6, 13, 18, 21,
  7, 14, 21, 25,
  8, 16, 20, 25,
  8, 17, 23, 25,
  9, 17, 23, 34,
  9, 18, 25, 30,
  10, 20, 27, 32,
  12, 21, 29, 35,
  12, 23, 34, 37,
  12, 25, 34, 40,
  13, 26, 35, 42,
  14, 28, 38, 45,
  15, 29, 40, 48,
  16, 31, 43, 51,
  17, 33, 45, 54,
  18, 35, 48, 57,
  19, 37, 51, 60,
  19, 38, 53, 63,
  20, 40, 56, 66,
  21, 43, 59, 70,
  22, 45, 62, 74,
  24, 47, 65, 77,
  25, 49, 68, 81
];

const EC_CODEWORDS_TABLE = [
// L  M  Q  H
  7, 10, 13, 17,
  10, 16, 22, 28,
  15, 26, 36, 44,
  20, 36, 52, 64,
  26, 48, 72, 88,
  36, 64, 96, 112,
  40, 72, 108, 130,
  48, 88, 132, 156,
  60, 110, 160, 192,
  72, 130, 192, 224,
  80, 150, 224, 264,
  96, 176, 260, 308,
  104, 198, 288, 352,
  120, 216, 320, 384,
  132, 240, 360, 432,
  144, 280, 408, 480,
  168, 308, 448, 532,
  180, 338, 504, 588,
  196, 364, 546, 650,
  224, 416, 600, 700,
  224, 442, 644, 750,
  252, 476, 690, 816,
  270, 504, 750, 900,
  300, 560, 810, 960,
  312, 588, 870, 1050,
  336, 644, 952, 1110,
  360, 700, 1020, 1200,
  390, 728, 1050, 1260,
  420, 784, 1140, 1350,
  450, 812, 1200, 1440,
  480, 868, 1290, 1530,
  510, 924, 1350, 1620,
  540, 980, 1440, 1710,
  570, 1036, 1530, 1800,
  570, 1064, 1590, 1890,
  600, 1120, 1680, 1980,
  630, 1204, 1770, 2100,
  660, 1260, 1860, 2220,
  720, 1316, 1950, 2310,
  750, 1372, 2040, 2430
];

/**
 * Returns the number of error correction block that the QR Code should contain
 * for the specified version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction blocks
 */
errorCorrectionCode.getBlocksCount = function getBlocksCount (version, errorCorrectionLevel) {
  switch (errorCorrectionLevel) {
    case ECLevel$1.L:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 0]
    case ECLevel$1.M:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 1]
    case ECLevel$1.Q:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 2]
    case ECLevel$1.H:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 3]
    default:
      return undefined
  }
};

/**
 * Returns the number of error correction codewords to use for the specified
 * version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction codewords
 */
errorCorrectionCode.getTotalCodewordsCount = function getTotalCodewordsCount (version, errorCorrectionLevel) {
  switch (errorCorrectionLevel) {
    case ECLevel$1.L:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0]
    case ECLevel$1.M:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1]
    case ECLevel$1.Q:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2]
    case ECLevel$1.H:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3]
    default:
      return undefined
  }
};

var polynomial = {};

var galoisField = {};

const EXP_TABLE = new Uint8Array(512);
const LOG_TABLE = new Uint8Array(256)
/**
 * Precompute the log and anti-log tables for faster computation later
 *
 * For each possible value in the galois field 2^8, we will pre-compute
 * the logarithm and anti-logarithm (exponential) of this value
 *
 * ref {@link https://en.wikiversity.org/wiki/Reed%E2%80%93Solomon_codes_for_coders#Introduction_to_mathematical_fields}
 */
;(function initTables () {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    EXP_TABLE[i] = x;
    LOG_TABLE[x] = i;

    x <<= 1; // multiply by 2

    // The QR code specification says to use byte-wise modulo 100011101 arithmetic.
    // This means that when a number is 256 or larger, it should be XORed with 0x11D.
    if (x & 0x100) { // similar to x >= 256, but a lot faster (because 0x100 == 256)
      x ^= 0x11D;
    }
  }

  // Optimization: double the size of the anti-log table so that we don't need to mod 255 to
  // stay inside the bounds (because we will mainly use this table for the multiplication of
  // two GF numbers, no more).
  // @see {@link mul}
  for (let i = 255; i < 512; i++) {
    EXP_TABLE[i] = EXP_TABLE[i - 255];
  }
}());

/**
 * Returns log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */
galoisField.log = function log (n) {
  if (n < 1) throw new Error('log(' + n + ')')
  return LOG_TABLE[n]
};

/**
 * Returns anti-log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */
galoisField.exp = function exp (n) {
  return EXP_TABLE[n]
};

/**
 * Multiplies two number inside Galois Field
 *
 * @param  {Number} x
 * @param  {Number} y
 * @return {Number}
 */
galoisField.mul = function mul (x, y) {
  if (x === 0 || y === 0) return 0

  // should be EXP_TABLE[(LOG_TABLE[x] + LOG_TABLE[y]) % 255] if EXP_TABLE wasn't oversized
  // @see {@link initTables}
  return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]]
};

(function (exports) {
	const GF = galoisField;

	/**
	 * Multiplies two polynomials inside Galois Field
	 *
	 * @param  {Uint8Array} p1 Polynomial
	 * @param  {Uint8Array} p2 Polynomial
	 * @return {Uint8Array}    Product of p1 and p2
	 */
	exports.mul = function mul (p1, p2) {
	  const coeff = new Uint8Array(p1.length + p2.length - 1);

	  for (let i = 0; i < p1.length; i++) {
	    for (let j = 0; j < p2.length; j++) {
	      coeff[i + j] ^= GF.mul(p1[i], p2[j]);
	    }
	  }

	  return coeff
	};

	/**
	 * Calculate the remainder of polynomials division
	 *
	 * @param  {Uint8Array} divident Polynomial
	 * @param  {Uint8Array} divisor  Polynomial
	 * @return {Uint8Array}          Remainder
	 */
	exports.mod = function mod (divident, divisor) {
	  let result = new Uint8Array(divident);

	  while ((result.length - divisor.length) >= 0) {
	    const coeff = result[0];

	    for (let i = 0; i < divisor.length; i++) {
	      result[i] ^= GF.mul(divisor[i], coeff);
	    }

	    // remove all zeros from buffer head
	    let offset = 0;
	    while (offset < result.length && result[offset] === 0) offset++;
	    result = result.slice(offset);
	  }

	  return result
	};

	/**
	 * Generate an irreducible generator polynomial of specified degree
	 * (used by Reed-Solomon encoder)
	 *
	 * @param  {Number} degree Degree of the generator polynomial
	 * @return {Uint8Array}    Buffer containing polynomial coefficients
	 */
	exports.generateECPolynomial = function generateECPolynomial (degree) {
	  let poly = new Uint8Array([1]);
	  for (let i = 0; i < degree; i++) {
	    poly = exports.mul(poly, new Uint8Array([1, GF.exp(i)]));
	  }

	  return poly
	}; 
} (polynomial));

const Polynomial = polynomial;

function ReedSolomonEncoder$1 (degree) {
  this.genPoly = undefined;
  this.degree = degree;

  if (this.degree) this.initialize(this.degree);
}

/**
 * Initialize the encoder.
 * The input param should correspond to the number of error correction codewords.
 *
 * @param  {Number} degree
 */
ReedSolomonEncoder$1.prototype.initialize = function initialize (degree) {
  // create an irreducible generator polynomial
  this.degree = degree;
  this.genPoly = Polynomial.generateECPolynomial(this.degree);
};

/**
 * Encodes a chunk of data
 *
 * @param  {Uint8Array} data Buffer containing input data
 * @return {Uint8Array}      Buffer containing encoded data
 */
ReedSolomonEncoder$1.prototype.encode = function encode (data) {
  if (!this.genPoly) {
    throw new Error('Encoder not initialized')
  }

  // Calculate EC for this data block
  // extends data size to data+genPoly size
  const paddedData = new Uint8Array(data.length + this.degree);
  paddedData.set(data);

  // The error correction codewords are the remainder after dividing the data codewords
  // by a generator polynomial
  const remainder = Polynomial.mod(paddedData, this.genPoly);

  // return EC data blocks (last n byte, where n is the degree of genPoly)
  // If coefficients number in remainder are less than genPoly degree,
  // pad with 0s to the left to reach the needed number of coefficients
  const start = this.degree - remainder.length;
  if (start > 0) {
    const buff = new Uint8Array(this.degree);
    buff.set(remainder, start);

    return buff
  }

  return remainder
};

var reedSolomonEncoder = ReedSolomonEncoder$1;

var version = {};

var mode = {};

var versionCheck = {};

/**
 * Check if QR Code version is valid
 *
 * @param  {Number}  version QR Code version
 * @return {Boolean}         true if valid version, false otherwise
 */

versionCheck.isValid = function isValid (version) {
  return !isNaN(version) && version >= 1 && version <= 40
};

var regex = {};

const numeric = '[0-9]+';
const alphanumeric = '[A-Z $%*+\\-./:]+';
let kanji = '(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|' +
  '[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|' +
  '[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|' +
  '[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+';
kanji = kanji.replace(/u/g, '\\u');

const byte = '(?:(?![A-Z0-9 $%*+\\-./:]|' + kanji + ')(?:.|[\r\n]))+';

regex.KANJI = new RegExp(kanji, 'g');
regex.BYTE_KANJI = new RegExp('[^A-Z0-9 $%*+\\-./:]+', 'g');
regex.BYTE = new RegExp(byte, 'g');
regex.NUMERIC = new RegExp(numeric, 'g');
regex.ALPHANUMERIC = new RegExp(alphanumeric, 'g');

const TEST_KANJI = new RegExp('^' + kanji + '$');
const TEST_NUMERIC = new RegExp('^' + numeric + '$');
const TEST_ALPHANUMERIC = new RegExp('^[A-Z0-9 $%*+\\-./:]+$');

regex.testKanji = function testKanji (str) {
  return TEST_KANJI.test(str)
};

regex.testNumeric = function testNumeric (str) {
  return TEST_NUMERIC.test(str)
};

regex.testAlphanumeric = function testAlphanumeric (str) {
  return TEST_ALPHANUMERIC.test(str)
};

(function (exports) {
	const VersionCheck = versionCheck;
	const Regex = regex;

	/**
	 * Numeric mode encodes data from the decimal digit set (0 - 9)
	 * (byte values 30HEX to 39HEX).
	 * Normally, 3 data characters are represented by 10 bits.
	 *
	 * @type {Object}
	 */
	exports.NUMERIC = {
	  id: 'Numeric',
	  bit: 1 << 0,
	  ccBits: [10, 12, 14]
	};

	/**
	 * Alphanumeric mode encodes data from a set of 45 characters,
	 * i.e. 10 numeric digits (0 - 9),
	 *      26 alphabetic characters (A - Z),
	 *   and 9 symbols (SP, $, %, *, +, -, ., /, :).
	 * Normally, two input characters are represented by 11 bits.
	 *
	 * @type {Object}
	 */
	exports.ALPHANUMERIC = {
	  id: 'Alphanumeric',
	  bit: 1 << 1,
	  ccBits: [9, 11, 13]
	};

	/**
	 * In byte mode, data is encoded at 8 bits per character.
	 *
	 * @type {Object}
	 */
	exports.BYTE = {
	  id: 'Byte',
	  bit: 1 << 2,
	  ccBits: [8, 16, 16]
	};

	/**
	 * The Kanji mode efficiently encodes Kanji characters in accordance with
	 * the Shift JIS system based on JIS X 0208.
	 * The Shift JIS values are shifted from the JIS X 0208 values.
	 * JIS X 0208 gives details of the shift coded representation.
	 * Each two-byte character value is compacted to a 13-bit binary codeword.
	 *
	 * @type {Object}
	 */
	exports.KANJI = {
	  id: 'Kanji',
	  bit: 1 << 3,
	  ccBits: [8, 10, 12]
	};

	/**
	 * Mixed mode will contain a sequences of data in a combination of any of
	 * the modes described above
	 *
	 * @type {Object}
	 */
	exports.MIXED = {
	  bit: -1
	};

	/**
	 * Returns the number of bits needed to store the data length
	 * according to QR Code specifications.
	 *
	 * @param  {Mode}   mode    Data mode
	 * @param  {Number} version QR Code version
	 * @return {Number}         Number of bits
	 */
	exports.getCharCountIndicator = function getCharCountIndicator (mode, version) {
	  if (!mode.ccBits) throw new Error('Invalid mode: ' + mode)

	  if (!VersionCheck.isValid(version)) {
	    throw new Error('Invalid version: ' + version)
	  }

	  if (version >= 1 && version < 10) return mode.ccBits[0]
	  else if (version < 27) return mode.ccBits[1]
	  return mode.ccBits[2]
	};

	/**
	 * Returns the most efficient mode to store the specified data
	 *
	 * @param  {String} dataStr Input data string
	 * @return {Mode}           Best mode
	 */
	exports.getBestModeForData = function getBestModeForData (dataStr) {
	  if (Regex.testNumeric(dataStr)) return exports.NUMERIC
	  else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC
	  else if (Regex.testKanji(dataStr)) return exports.KANJI
	  else return exports.BYTE
	};

	/**
	 * Return mode name as string
	 *
	 * @param {Mode} mode Mode object
	 * @returns {String}  Mode name
	 */
	exports.toString = function toString (mode) {
	  if (mode && mode.id) return mode.id
	  throw new Error('Invalid mode')
	};

	/**
	 * Check if input param is a valid mode object
	 *
	 * @param   {Mode}    mode Mode object
	 * @returns {Boolean} True if valid mode, false otherwise
	 */
	exports.isValid = function isValid (mode) {
	  return mode && mode.bit && mode.ccBits
	};

	/**
	 * Get mode object from its name
	 *
	 * @param   {String} string Mode name
	 * @returns {Mode}          Mode object
	 */
	function fromString (string) {
	  if (typeof string !== 'string') {
	    throw new Error('Param is not a string')
	  }

	  const lcStr = string.toLowerCase();

	  switch (lcStr) {
	    case 'numeric':
	      return exports.NUMERIC
	    case 'alphanumeric':
	      return exports.ALPHANUMERIC
	    case 'kanji':
	      return exports.KANJI
	    case 'byte':
	      return exports.BYTE
	    default:
	      throw new Error('Unknown mode: ' + string)
	  }
	}

	/**
	 * Returns mode from a value.
	 * If value is not a valid mode, returns defaultValue
	 *
	 * @param  {Mode|String} value        Encoding mode
	 * @param  {Mode}        defaultValue Fallback value
	 * @return {Mode}                     Encoding mode
	 */
	exports.from = function from (value, defaultValue) {
	  if (exports.isValid(value)) {
	    return value
	  }

	  try {
	    return fromString(value)
	  } catch (e) {
	    return defaultValue
	  }
	}; 
} (mode));

(function (exports) {
	const Utils = utils$1;
	const ECCode = errorCorrectionCode;
	const ECLevel = errorCorrectionLevel;
	const Mode = mode;
	const VersionCheck = versionCheck;

	// Generator polynomial used to encode version information
	const G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0);
	const G18_BCH = Utils.getBCHDigit(G18);

	function getBestVersionForDataLength (mode, length, errorCorrectionLevel) {
	  for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
	    if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
	      return currentVersion
	    }
	  }

	  return undefined
	}

	function getReservedBitsCount (mode, version) {
	  // Character count indicator + mode indicator bits
	  return Mode.getCharCountIndicator(mode, version) + 4
	}

	function getTotalBitsFromDataArray (segments, version) {
	  let totalBits = 0;

	  segments.forEach(function (data) {
	    const reservedBits = getReservedBitsCount(data.mode, version);
	    totalBits += reservedBits + data.getBitsLength();
	  });

	  return totalBits
	}

	function getBestVersionForMixedData (segments, errorCorrectionLevel) {
	  for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
	    const length = getTotalBitsFromDataArray(segments, currentVersion);
	    if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
	      return currentVersion
	    }
	  }

	  return undefined
	}

	/**
	 * Returns version number from a value.
	 * If value is not a valid version, returns defaultValue
	 *
	 * @param  {Number|String} value        QR Code version
	 * @param  {Number}        defaultValue Fallback value
	 * @return {Number}                     QR Code version number
	 */
	exports.from = function from (value, defaultValue) {
	  if (VersionCheck.isValid(value)) {
	    return parseInt(value, 10)
	  }

	  return defaultValue
	};

	/**
	 * Returns how much data can be stored with the specified QR code version
	 * and error correction level
	 *
	 * @param  {Number} version              QR Code version (1-40)
	 * @param  {Number} errorCorrectionLevel Error correction level
	 * @param  {Mode}   mode                 Data mode
	 * @return {Number}                      Quantity of storable data
	 */
	exports.getCapacity = function getCapacity (version, errorCorrectionLevel, mode) {
	  if (!VersionCheck.isValid(version)) {
	    throw new Error('Invalid QR Code version')
	  }

	  // Use Byte mode as default
	  if (typeof mode === 'undefined') mode = Mode.BYTE;

	  // Total codewords for this QR code version (Data + Error correction)
	  const totalCodewords = Utils.getSymbolTotalCodewords(version);

	  // Total number of error correction codewords
	  const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);

	  // Total number of data codewords
	  const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;

	  if (mode === Mode.MIXED) return dataTotalCodewordsBits

	  const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version);

	  // Return max number of storable codewords
	  switch (mode) {
	    case Mode.NUMERIC:
	      return Math.floor((usableBits / 10) * 3)

	    case Mode.ALPHANUMERIC:
	      return Math.floor((usableBits / 11) * 2)

	    case Mode.KANJI:
	      return Math.floor(usableBits / 13)

	    case Mode.BYTE:
	    default:
	      return Math.floor(usableBits / 8)
	  }
	};

	/**
	 * Returns the minimum version needed to contain the amount of data
	 *
	 * @param  {Segment} data                    Segment of data
	 * @param  {Number} [errorCorrectionLevel=H] Error correction level
	 * @param  {Mode} mode                       Data mode
	 * @return {Number}                          QR Code version
	 */
	exports.getBestVersionForData = function getBestVersionForData (data, errorCorrectionLevel) {
	  let seg;

	  const ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);

	  if (Array.isArray(data)) {
	    if (data.length > 1) {
	      return getBestVersionForMixedData(data, ecl)
	    }

	    if (data.length === 0) {
	      return 1
	    }

	    seg = data[0];
	  } else {
	    seg = data;
	  }

	  return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl)
	};

	/**
	 * Returns version information with relative error correction bits
	 *
	 * The version information is included in QR Code symbols of version 7 or larger.
	 * It consists of an 18-bit sequence containing 6 data bits,
	 * with 12 error correction bits calculated using the (18, 6) Golay code.
	 *
	 * @param  {Number} version QR Code version
	 * @return {Number}         Encoded version info bits
	 */
	exports.getEncodedBits = function getEncodedBits (version) {
	  if (!VersionCheck.isValid(version) || version < 7) {
	    throw new Error('Invalid QR Code version')
	  }

	  let d = version << 12;

	  while (Utils.getBCHDigit(d) - G18_BCH >= 0) {
	    d ^= (G18 << (Utils.getBCHDigit(d) - G18_BCH));
	  }

	  return (version << 12) | d
	}; 
} (version));

var formatInfo = {};

const Utils$3 = utils$1;

const G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0);
const G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1);
const G15_BCH = Utils$3.getBCHDigit(G15);

/**
 * Returns format information with relative error correction bits
 *
 * The format information is a 15-bit sequence containing 5 data bits,
 * with 10 error correction bits calculated using the (15, 5) BCH code.
 *
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Number} mask                 Mask pattern
 * @return {Number}                      Encoded format information bits
 */
formatInfo.getEncodedBits = function getEncodedBits (errorCorrectionLevel, mask) {
  const data = ((errorCorrectionLevel.bit << 3) | mask);
  let d = data << 10;

  while (Utils$3.getBCHDigit(d) - G15_BCH >= 0) {
    d ^= (G15 << (Utils$3.getBCHDigit(d) - G15_BCH));
  }

  // xor final data with mask pattern in order to ensure that
  // no combination of Error Correction Level and data mask pattern
  // will result in an all-zero data string
  return ((data << 10) | d) ^ G15_MASK
};

var segments = {};

const Mode$4 = mode;

function NumericData (data) {
  this.mode = Mode$4.NUMERIC;
  this.data = data.toString();
}

NumericData.getBitsLength = function getBitsLength (length) {
  return 10 * Math.floor(length / 3) + ((length % 3) ? ((length % 3) * 3 + 1) : 0)
};

NumericData.prototype.getLength = function getLength () {
  return this.data.length
};

NumericData.prototype.getBitsLength = function getBitsLength () {
  return NumericData.getBitsLength(this.data.length)
};

NumericData.prototype.write = function write (bitBuffer) {
  let i, group, value;

  // The input data string is divided into groups of three digits,
  // and each group is converted to its 10-bit binary equivalent.
  for (i = 0; i + 3 <= this.data.length; i += 3) {
    group = this.data.substr(i, 3);
    value = parseInt(group, 10);

    bitBuffer.put(value, 10);
  }

  // If the number of input digits is not an exact multiple of three,
  // the final one or two digits are converted to 4 or 7 bits respectively.
  const remainingNum = this.data.length - i;
  if (remainingNum > 0) {
    group = this.data.substr(i);
    value = parseInt(group, 10);

    bitBuffer.put(value, remainingNum * 3 + 1);
  }
};

var numericData = NumericData;

const Mode$3 = mode;

/**
 * Array of characters available in alphanumeric mode
 *
 * As per QR Code specification, to each character
 * is assigned a value from 0 to 44 which in this case coincides
 * with the array index
 *
 * @type {Array}
 */
const ALPHA_NUM_CHARS = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  ' ', '$', '%', '*', '+', '-', '.', '/', ':'
];

function AlphanumericData (data) {
  this.mode = Mode$3.ALPHANUMERIC;
  this.data = data;
}

AlphanumericData.getBitsLength = function getBitsLength (length) {
  return 11 * Math.floor(length / 2) + 6 * (length % 2)
};

AlphanumericData.prototype.getLength = function getLength () {
  return this.data.length
};

AlphanumericData.prototype.getBitsLength = function getBitsLength () {
  return AlphanumericData.getBitsLength(this.data.length)
};

AlphanumericData.prototype.write = function write (bitBuffer) {
  let i;

  // Input data characters are divided into groups of two characters
  // and encoded as 11-bit binary codes.
  for (i = 0; i + 2 <= this.data.length; i += 2) {
    // The character value of the first character is multiplied by 45
    let value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45;

    // The character value of the second digit is added to the product
    value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]);

    // The sum is then stored as 11-bit binary number
    bitBuffer.put(value, 11);
  }

  // If the number of input data characters is not a multiple of two,
  // the character value of the final character is encoded as a 6-bit binary number.
  if (this.data.length % 2) {
    bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
  }
};

var alphanumericData = AlphanumericData;

var encodeUtf8$1 = function encodeUtf8 (input) {
  var result = [];
  var size = input.length;

  for (var index = 0; index < size; index++) {
    var point = input.charCodeAt(index);

    if (point >= 0xD800 && point <= 0xDBFF && size > index + 1) {
      var second = input.charCodeAt(index + 1);

      if (second >= 0xDC00 && second <= 0xDFFF) {
        // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        point = (point - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
        index += 1;
      }
    }

    // US-ASCII
    if (point < 0x80) {
      result.push(point);
      continue
    }

    // 2-byte UTF-8
    if (point < 0x800) {
      result.push((point >> 6) | 192);
      result.push((point & 63) | 128);
      continue
    }

    // 3-byte UTF-8
    if (point < 0xD800 || (point >= 0xE000 && point < 0x10000)) {
      result.push((point >> 12) | 224);
      result.push(((point >> 6) & 63) | 128);
      result.push((point & 63) | 128);
      continue
    }

    // 4-byte UTF-8
    if (point >= 0x10000 && point <= 0x10FFFF) {
      result.push((point >> 18) | 240);
      result.push(((point >> 12) & 63) | 128);
      result.push(((point >> 6) & 63) | 128);
      result.push((point & 63) | 128);
      continue
    }

    // Invalid character
    result.push(0xEF, 0xBF, 0xBD);
  }

  return new Uint8Array(result).buffer
};

const encodeUtf8 = encodeUtf8$1;
const Mode$2 = mode;

function ByteData (data) {
  this.mode = Mode$2.BYTE;
  if (typeof (data) === 'string') {
    data = encodeUtf8(data);
  }
  this.data = new Uint8Array(data);
}

ByteData.getBitsLength = function getBitsLength (length) {
  return length * 8
};

ByteData.prototype.getLength = function getLength () {
  return this.data.length
};

ByteData.prototype.getBitsLength = function getBitsLength () {
  return ByteData.getBitsLength(this.data.length)
};

ByteData.prototype.write = function (bitBuffer) {
  for (let i = 0, l = this.data.length; i < l; i++) {
    bitBuffer.put(this.data[i], 8);
  }
};

var byteData = ByteData;

const Mode$1 = mode;
const Utils$2 = utils$1;

function KanjiData (data) {
  this.mode = Mode$1.KANJI;
  this.data = data;
}

KanjiData.getBitsLength = function getBitsLength (length) {
  return length * 13
};

KanjiData.prototype.getLength = function getLength () {
  return this.data.length
};

KanjiData.prototype.getBitsLength = function getBitsLength () {
  return KanjiData.getBitsLength(this.data.length)
};

KanjiData.prototype.write = function (bitBuffer) {
  let i;

  // In the Shift JIS system, Kanji characters are represented by a two byte combination.
  // These byte values are shifted from the JIS X 0208 values.
  // JIS X 0208 gives details of the shift coded representation.
  for (i = 0; i < this.data.length; i++) {
    let value = Utils$2.toSJIS(this.data[i]);

    // For characters with Shift JIS values from 0x8140 to 0x9FFC:
    if (value >= 0x8140 && value <= 0x9FFC) {
      // Subtract 0x8140 from Shift JIS value
      value -= 0x8140;

    // For characters with Shift JIS values from 0xE040 to 0xEBBF
    } else if (value >= 0xE040 && value <= 0xEBBF) {
      // Subtract 0xC140 from Shift JIS value
      value -= 0xC140;
    } else {
      throw new Error(
        'Invalid SJIS character: ' + this.data[i] + '\n' +
        'Make sure your charset is UTF-8')
    }

    // Multiply most significant byte of result by 0xC0
    // and add least significant byte to product
    value = (((value >>> 8) & 0xff) * 0xC0) + (value & 0xff);

    // Convert result to a 13-bit binary string
    bitBuffer.put(value, 13);
  }
};

var kanjiData = KanjiData;

var dijkstra = {exports: {}};

(function (module) {

	/******************************************************************************
	 * Created 2008-08-19.
	 *
	 * Dijkstra path-finding functions. Adapted from the Dijkstar Python project.
	 *
	 * Copyright (C) 2008
	 *   Wyatt Baldwin <self@wyattbaldwin.com>
	 *   All rights reserved
	 *
	 * Licensed under the MIT license.
	 *
	 *   http://www.opensource.org/licenses/mit-license.php
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 *****************************************************************************/
	var dijkstra = {
	  single_source_shortest_paths: function(graph, s, d) {
	    // Predecessor map for each node that has been encountered.
	    // node ID => predecessor node ID
	    var predecessors = {};

	    // Costs of shortest paths from s to all nodes encountered.
	    // node ID => cost
	    var costs = {};
	    costs[s] = 0;

	    // Costs of shortest paths from s to all nodes encountered; differs from
	    // `costs` in that it provides easy access to the node that currently has
	    // the known shortest path from s.
	    // XXX: Do we actually need both `costs` and `open`?
	    var open = dijkstra.PriorityQueue.make();
	    open.push(s, 0);

	    var closest,
	        u, v,
	        cost_of_s_to_u,
	        adjacent_nodes,
	        cost_of_e,
	        cost_of_s_to_u_plus_cost_of_e,
	        cost_of_s_to_v,
	        first_visit;
	    while (!open.empty()) {
	      // In the nodes remaining in graph that have a known cost from s,
	      // find the node, u, that currently has the shortest path from s.
	      closest = open.pop();
	      u = closest.value;
	      cost_of_s_to_u = closest.cost;

	      // Get nodes adjacent to u...
	      adjacent_nodes = graph[u] || {};

	      // ...and explore the edges that connect u to those nodes, updating
	      // the cost of the shortest paths to any or all of those nodes as
	      // necessary. v is the node across the current edge from u.
	      for (v in adjacent_nodes) {
	        if (adjacent_nodes.hasOwnProperty(v)) {
	          // Get the cost of the edge running from u to v.
	          cost_of_e = adjacent_nodes[v];

	          // Cost of s to u plus the cost of u to v across e--this is *a*
	          // cost from s to v that may or may not be less than the current
	          // known cost to v.
	          cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;

	          // If we haven't visited v yet OR if the current known cost from s to
	          // v is greater than the new cost we just found (cost of s to u plus
	          // cost of u to v across e), update v's cost in the cost list and
	          // update v's predecessor in the predecessor list (it's now u).
	          cost_of_s_to_v = costs[v];
	          first_visit = (typeof costs[v] === 'undefined');
	          if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
	            costs[v] = cost_of_s_to_u_plus_cost_of_e;
	            open.push(v, cost_of_s_to_u_plus_cost_of_e);
	            predecessors[v] = u;
	          }
	        }
	      }
	    }

	    if (typeof d !== 'undefined' && typeof costs[d] === 'undefined') {
	      var msg = ['Could not find a path from ', s, ' to ', d, '.'].join('');
	      throw new Error(msg);
	    }

	    return predecessors;
	  },

	  extract_shortest_path_from_predecessor_list: function(predecessors, d) {
	    var nodes = [];
	    var u = d;
	    while (u) {
	      nodes.push(u);
	      predecessors[u];
	      u = predecessors[u];
	    }
	    nodes.reverse();
	    return nodes;
	  },

	  find_path: function(graph, s, d) {
	    var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
	    return dijkstra.extract_shortest_path_from_predecessor_list(
	      predecessors, d);
	  },

	  /**
	   * A very naive priority queue implementation.
	   */
	  PriorityQueue: {
	    make: function (opts) {
	      var T = dijkstra.PriorityQueue,
	          t = {},
	          key;
	      opts = opts || {};
	      for (key in T) {
	        if (T.hasOwnProperty(key)) {
	          t[key] = T[key];
	        }
	      }
	      t.queue = [];
	      t.sorter = opts.sorter || T.default_sorter;
	      return t;
	    },

	    default_sorter: function (a, b) {
	      return a.cost - b.cost;
	    },

	    /**
	     * Add a new item to the queue and ensure the highest priority element
	     * is at the front of the queue.
	     */
	    push: function (value, cost) {
	      var item = {value: value, cost: cost};
	      this.queue.push(item);
	      this.queue.sort(this.sorter);
	    },

	    /**
	     * Return the highest priority element in the queue.
	     */
	    pop: function () {
	      return this.queue.shift();
	    },

	    empty: function () {
	      return this.queue.length === 0;
	    }
	  }
	};


	// node.js module exports
	{
	  module.exports = dijkstra;
	} 
} (dijkstra));

var dijkstraExports = dijkstra.exports;

(function (exports) {
	const Mode = mode;
	const NumericData = numericData;
	const AlphanumericData = alphanumericData;
	const ByteData = byteData;
	const KanjiData = kanjiData;
	const Regex = regex;
	const Utils = utils$1;
	const dijkstra = dijkstraExports;

	/**
	 * Returns UTF8 byte length
	 *
	 * @param  {String} str Input string
	 * @return {Number}     Number of byte
	 */
	function getStringByteLength (str) {
	  return unescape(encodeURIComponent(str)).length
	}

	/**
	 * Get a list of segments of the specified mode
	 * from a string
	 *
	 * @param  {Mode}   mode Segment mode
	 * @param  {String} str  String to process
	 * @return {Array}       Array of object with segments data
	 */
	function getSegments (regex, mode, str) {
	  const segments = [];
	  let result;

	  while ((result = regex.exec(str)) !== null) {
	    segments.push({
	      data: result[0],
	      index: result.index,
	      mode: mode,
	      length: result[0].length
	    });
	  }

	  return segments
	}

	/**
	 * Extracts a series of segments with the appropriate
	 * modes from a string
	 *
	 * @param  {String} dataStr Input string
	 * @return {Array}          Array of object with segments data
	 */
	function getSegmentsFromString (dataStr) {
	  const numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
	  const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
	  let byteSegs;
	  let kanjiSegs;

	  if (Utils.isKanjiModeEnabled()) {
	    byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
	    kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
	  } else {
	    byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
	    kanjiSegs = [];
	  }

	  const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);

	  return segs
	    .sort(function (s1, s2) {
	      return s1.index - s2.index
	    })
	    .map(function (obj) {
	      return {
	        data: obj.data,
	        mode: obj.mode,
	        length: obj.length
	      }
	    })
	}

	/**
	 * Returns how many bits are needed to encode a string of
	 * specified length with the specified mode
	 *
	 * @param  {Number} length String length
	 * @param  {Mode} mode     Segment mode
	 * @return {Number}        Bit length
	 */
	function getSegmentBitsLength (length, mode) {
	  switch (mode) {
	    case Mode.NUMERIC:
	      return NumericData.getBitsLength(length)
	    case Mode.ALPHANUMERIC:
	      return AlphanumericData.getBitsLength(length)
	    case Mode.KANJI:
	      return KanjiData.getBitsLength(length)
	    case Mode.BYTE:
	      return ByteData.getBitsLength(length)
	  }
	}

	/**
	 * Merges adjacent segments which have the same mode
	 *
	 * @param  {Array} segs Array of object with segments data
	 * @return {Array}      Array of object with segments data
	 */
	function mergeSegments (segs) {
	  return segs.reduce(function (acc, curr) {
	    const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
	    if (prevSeg && prevSeg.mode === curr.mode) {
	      acc[acc.length - 1].data += curr.data;
	      return acc
	    }

	    acc.push(curr);
	    return acc
	  }, [])
	}

	/**
	 * Generates a list of all possible nodes combination which
	 * will be used to build a segments graph.
	 *
	 * Nodes are divided by groups. Each group will contain a list of all the modes
	 * in which is possible to encode the given text.
	 *
	 * For example the text '12345' can be encoded as Numeric, Alphanumeric or Byte.
	 * The group for '12345' will contain then 3 objects, one for each
	 * possible encoding mode.
	 *
	 * Each node represents a possible segment.
	 *
	 * @param  {Array} segs Array of object with segments data
	 * @return {Array}      Array of object with segments data
	 */
	function buildNodes (segs) {
	  const nodes = [];
	  for (let i = 0; i < segs.length; i++) {
	    const seg = segs[i];

	    switch (seg.mode) {
	      case Mode.NUMERIC:
	        nodes.push([seg,
	          { data: seg.data, mode: Mode.ALPHANUMERIC, length: seg.length },
	          { data: seg.data, mode: Mode.BYTE, length: seg.length }
	        ]);
	        break
	      case Mode.ALPHANUMERIC:
	        nodes.push([seg,
	          { data: seg.data, mode: Mode.BYTE, length: seg.length }
	        ]);
	        break
	      case Mode.KANJI:
	        nodes.push([seg,
	          { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
	        ]);
	        break
	      case Mode.BYTE:
	        nodes.push([
	          { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
	        ]);
	    }
	  }

	  return nodes
	}

	/**
	 * Builds a graph from a list of nodes.
	 * All segments in each node group will be connected with all the segments of
	 * the next group and so on.
	 *
	 * At each connection will be assigned a weight depending on the
	 * segment's byte length.
	 *
	 * @param  {Array} nodes    Array of object with segments data
	 * @param  {Number} version QR Code version
	 * @return {Object}         Graph of all possible segments
	 */
	function buildGraph (nodes, version) {
	  const table = {};
	  const graph = { start: {} };
	  let prevNodeIds = ['start'];

	  for (let i = 0; i < nodes.length; i++) {
	    const nodeGroup = nodes[i];
	    const currentNodeIds = [];

	    for (let j = 0; j < nodeGroup.length; j++) {
	      const node = nodeGroup[j];
	      const key = '' + i + j;

	      currentNodeIds.push(key);
	      table[key] = { node: node, lastCount: 0 };
	      graph[key] = {};

	      for (let n = 0; n < prevNodeIds.length; n++) {
	        const prevNodeId = prevNodeIds[n];

	        if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
	          graph[prevNodeId][key] =
	            getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) -
	            getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);

	          table[prevNodeId].lastCount += node.length;
	        } else {
	          if (table[prevNodeId]) table[prevNodeId].lastCount = node.length;

	          graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) +
	            4 + Mode.getCharCountIndicator(node.mode, version); // switch cost
	        }
	      }
	    }

	    prevNodeIds = currentNodeIds;
	  }

	  for (let n = 0; n < prevNodeIds.length; n++) {
	    graph[prevNodeIds[n]].end = 0;
	  }

	  return { map: graph, table: table }
	}

	/**
	 * Builds a segment from a specified data and mode.
	 * If a mode is not specified, the more suitable will be used.
	 *
	 * @param  {String} data             Input data
	 * @param  {Mode | String} modesHint Data mode
	 * @return {Segment}                 Segment
	 */
	function buildSingleSegment (data, modesHint) {
	  let mode;
	  const bestMode = Mode.getBestModeForData(data);

	  mode = Mode.from(modesHint, bestMode);

	  // Make sure data can be encoded
	  if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
	    throw new Error('"' + data + '"' +
	      ' cannot be encoded with mode ' + Mode.toString(mode) +
	      '.\n Suggested mode is: ' + Mode.toString(bestMode))
	  }

	  // Use Mode.BYTE if Kanji support is disabled
	  if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
	    mode = Mode.BYTE;
	  }

	  switch (mode) {
	    case Mode.NUMERIC:
	      return new NumericData(data)

	    case Mode.ALPHANUMERIC:
	      return new AlphanumericData(data)

	    case Mode.KANJI:
	      return new KanjiData(data)

	    case Mode.BYTE:
	      return new ByteData(data)
	  }
	}

	/**
	 * Builds a list of segments from an array.
	 * Array can contain Strings or Objects with segment's info.
	 *
	 * For each item which is a string, will be generated a segment with the given
	 * string and the more appropriate encoding mode.
	 *
	 * For each item which is an object, will be generated a segment with the given
	 * data and mode.
	 * Objects must contain at least the property "data".
	 * If property "mode" is not present, the more suitable mode will be used.
	 *
	 * @param  {Array} array Array of objects with segments data
	 * @return {Array}       Array of Segments
	 */
	exports.fromArray = function fromArray (array) {
	  return array.reduce(function (acc, seg) {
	    if (typeof seg === 'string') {
	      acc.push(buildSingleSegment(seg, null));
	    } else if (seg.data) {
	      acc.push(buildSingleSegment(seg.data, seg.mode));
	    }

	    return acc
	  }, [])
	};

	/**
	 * Builds an optimized sequence of segments from a string,
	 * which will produce the shortest possible bitstream.
	 *
	 * @param  {String} data    Input string
	 * @param  {Number} version QR Code version
	 * @return {Array}          Array of segments
	 */
	exports.fromString = function fromString (data, version) {
	  const segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());

	  const nodes = buildNodes(segs);
	  const graph = buildGraph(nodes, version);
	  const path = dijkstra.find_path(graph.map, 'start', 'end');

	  const optimizedSegs = [];
	  for (let i = 1; i < path.length - 1; i++) {
	    optimizedSegs.push(graph.table[path[i]].node);
	  }

	  return exports.fromArray(mergeSegments(optimizedSegs))
	};

	/**
	 * Splits a string in various segments with the modes which
	 * best represent their content.
	 * The produced segments are far from being optimized.
	 * The output of this function is only used to estimate a QR Code version
	 * which may contain the data.
	 *
	 * @param  {string} data Input string
	 * @return {Array}       Array of segments
	 */
	exports.rawSplit = function rawSplit (data) {
	  return exports.fromArray(
	    getSegmentsFromString(data, Utils.isKanjiModeEnabled())
	  )
	}; 
} (segments));

const Utils$1 = utils$1;
const ECLevel = errorCorrectionLevel;
const BitBuffer = bitBuffer;
const BitMatrix = bitMatrix;
const AlignmentPattern = alignmentPattern;
const FinderPattern = finderPattern;
const MaskPattern = maskPattern;
const ECCode = errorCorrectionCode;
const ReedSolomonEncoder = reedSolomonEncoder;
const Version = version;
const FormatInfo = formatInfo;
const Mode = mode;
const Segments = segments;

/**
 * QRCode for JavaScript
 *
 * modified by Ryan Day for nodejs support
 * Copyright (c) 2011 Ryan Day
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
//---------------------------------------------------------------------
// QRCode for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
// The word "QR Code" is registered trademark of
// DENSO WAVE INCORPORATED
//   http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------
*/

/**
 * Add finder patterns bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */
function setupFinderPattern (matrix, version) {
  const size = matrix.size;
  const pos = FinderPattern.getPositions(version);

  for (let i = 0; i < pos.length; i++) {
    const row = pos[i][0];
    const col = pos[i][1];

    for (let r = -1; r <= 7; r++) {
      if (row + r <= -1 || size <= row + r) continue

      for (let c = -1; c <= 7; c++) {
        if (col + c <= -1 || size <= col + c) continue

        if ((r >= 0 && r <= 6 && (c === 0 || c === 6)) ||
          (c >= 0 && c <= 6 && (r === 0 || r === 6)) ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
          matrix.set(row + r, col + c, true, true);
        } else {
          matrix.set(row + r, col + c, false, true);
        }
      }
    }
  }
}

/**
 * Add timing pattern bits to matrix
 *
 * Note: this function must be called before {@link setupAlignmentPattern}
 *
 * @param  {BitMatrix} matrix Modules matrix
 */
function setupTimingPattern (matrix) {
  const size = matrix.size;

  for (let r = 8; r < size - 8; r++) {
    const value = r % 2 === 0;
    matrix.set(r, 6, value, true);
    matrix.set(6, r, value, true);
  }
}

/**
 * Add alignment patterns bits to matrix
 *
 * Note: this function must be called after {@link setupTimingPattern}
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */
function setupAlignmentPattern (matrix, version) {
  const pos = AlignmentPattern.getPositions(version);

  for (let i = 0; i < pos.length; i++) {
    const row = pos[i][0];
    const col = pos[i][1];

    for (let r = -2; r <= 2; r++) {
      for (let c = -2; c <= 2; c++) {
        if (r === -2 || r === 2 || c === -2 || c === 2 ||
          (r === 0 && c === 0)) {
          matrix.set(row + r, col + c, true, true);
        } else {
          matrix.set(row + r, col + c, false, true);
        }
      }
    }
  }
}

/**
 * Add version info bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */
function setupVersionInfo (matrix, version) {
  const size = matrix.size;
  const bits = Version.getEncodedBits(version);
  let row, col, mod;

  for (let i = 0; i < 18; i++) {
    row = Math.floor(i / 3);
    col = i % 3 + size - 8 - 3;
    mod = ((bits >> i) & 1) === 1;

    matrix.set(row, col, mod, true);
    matrix.set(col, row, mod, true);
  }
}

/**
 * Add format info bits to matrix
 *
 * @param  {BitMatrix} matrix               Modules matrix
 * @param  {ErrorCorrectionLevel}    errorCorrectionLevel Error correction level
 * @param  {Number}    maskPattern          Mask pattern reference value
 */
function setupFormatInfo (matrix, errorCorrectionLevel, maskPattern) {
  const size = matrix.size;
  const bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
  let i, mod;

  for (i = 0; i < 15; i++) {
    mod = ((bits >> i) & 1) === 1;

    // vertical
    if (i < 6) {
      matrix.set(i, 8, mod, true);
    } else if (i < 8) {
      matrix.set(i + 1, 8, mod, true);
    } else {
      matrix.set(size - 15 + i, 8, mod, true);
    }

    // horizontal
    if (i < 8) {
      matrix.set(8, size - i - 1, mod, true);
    } else if (i < 9) {
      matrix.set(8, 15 - i - 1 + 1, mod, true);
    } else {
      matrix.set(8, 15 - i - 1, mod, true);
    }
  }

  // fixed module
  matrix.set(size - 8, 8, 1, true);
}

/**
 * Add encoded data bits to matrix
 *
 * @param  {BitMatrix}  matrix Modules matrix
 * @param  {Uint8Array} data   Data codewords
 */
function setupData (matrix, data) {
  const size = matrix.size;
  let inc = -1;
  let row = size - 1;
  let bitIndex = 7;
  let byteIndex = 0;

  for (let col = size - 1; col > 0; col -= 2) {
    if (col === 6) col--;

    while (true) {
      for (let c = 0; c < 2; c++) {
        if (!matrix.isReserved(row, col - c)) {
          let dark = false;

          if (byteIndex < data.length) {
            dark = (((data[byteIndex] >>> bitIndex) & 1) === 1);
          }

          matrix.set(row, col - c, dark);
          bitIndex--;

          if (bitIndex === -1) {
            byteIndex++;
            bitIndex = 7;
          }
        }
      }

      row += inc;

      if (row < 0 || size <= row) {
        row -= inc;
        inc = -inc;
        break
      }
    }
  }
}

/**
 * Create encoded codewords from data input
 *
 * @param  {Number}   version              QR Code version
 * @param  {ErrorCorrectionLevel}   errorCorrectionLevel Error correction level
 * @param  {ByteData} data                 Data input
 * @return {Uint8Array}                    Buffer containing encoded codewords
 */
function createData (version, errorCorrectionLevel, segments) {
  // Prepare data buffer
  const buffer = new BitBuffer();

  segments.forEach(function (data) {
    // prefix data with mode indicator (4 bits)
    buffer.put(data.mode.bit, 4);

    // Prefix data with character count indicator.
    // The character count indicator is a string of bits that represents the
    // number of characters that are being encoded.
    // The character count indicator must be placed after the mode indicator
    // and must be a certain number of bits long, depending on the QR version
    // and data mode
    // @see {@link Mode.getCharCountIndicator}.
    buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version));

    // add binary data sequence to buffer
    data.write(buffer);
  });

  // Calculate required number of bits
  const totalCodewords = Utils$1.getSymbolTotalCodewords(version);
  const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
  const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;

  // Add a terminator.
  // If the bit string is shorter than the total number of required bits,
  // a terminator of up to four 0s must be added to the right side of the string.
  // If the bit string is more than four bits shorter than the required number of bits,
  // add four 0s to the end.
  if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
    buffer.put(0, 4);
  }

  // If the bit string is fewer than four bits shorter, add only the number of 0s that
  // are needed to reach the required number of bits.

  // After adding the terminator, if the number of bits in the string is not a multiple of 8,
  // pad the string on the right with 0s to make the string's length a multiple of 8.
  while (buffer.getLengthInBits() % 8 !== 0) {
    buffer.putBit(0);
  }

  // Add pad bytes if the string is still shorter than the total number of required bits.
  // Extend the buffer to fill the data capacity of the symbol corresponding to
  // the Version and Error Correction Level by adding the Pad Codewords 11101100 (0xEC)
  // and 00010001 (0x11) alternately.
  const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
  for (let i = 0; i < remainingByte; i++) {
    buffer.put(i % 2 ? 0x11 : 0xEC, 8);
  }

  return createCodewords(buffer, version, errorCorrectionLevel)
}

/**
 * Encode input data with Reed-Solomon and return codewords with
 * relative error correction bits
 *
 * @param  {BitBuffer} bitBuffer            Data to encode
 * @param  {Number}    version              QR Code version
 * @param  {ErrorCorrectionLevel} errorCorrectionLevel Error correction level
 * @return {Uint8Array}                     Buffer containing encoded codewords
 */
function createCodewords (bitBuffer, version, errorCorrectionLevel) {
  // Total codewords for this QR code version (Data + Error correction)
  const totalCodewords = Utils$1.getSymbolTotalCodewords(version);

  // Total number of error correction codewords
  const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);

  // Total number of data codewords
  const dataTotalCodewords = totalCodewords - ecTotalCodewords;

  // Total number of blocks
  const ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel);

  // Calculate how many blocks each group should contain
  const blocksInGroup2 = totalCodewords % ecTotalBlocks;
  const blocksInGroup1 = ecTotalBlocks - blocksInGroup2;

  const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);

  const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
  const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;

  // Number of EC codewords is the same for both groups
  const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;

  // Initialize a Reed-Solomon encoder with a generator polynomial of degree ecCount
  const rs = new ReedSolomonEncoder(ecCount);

  let offset = 0;
  const dcData = new Array(ecTotalBlocks);
  const ecData = new Array(ecTotalBlocks);
  let maxDataSize = 0;
  const buffer = new Uint8Array(bitBuffer.buffer);

  // Divide the buffer into the required number of blocks
  for (let b = 0; b < ecTotalBlocks; b++) {
    const dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;

    // extract a block of data from buffer
    dcData[b] = buffer.slice(offset, offset + dataSize);

    // Calculate EC codewords for this data block
    ecData[b] = rs.encode(dcData[b]);

    offset += dataSize;
    maxDataSize = Math.max(maxDataSize, dataSize);
  }

  // Create final data
  // Interleave the data and error correction codewords from each block
  const data = new Uint8Array(totalCodewords);
  let index = 0;
  let i, r;

  // Add data codewords
  for (i = 0; i < maxDataSize; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      if (i < dcData[r].length) {
        data[index++] = dcData[r][i];
      }
    }
  }

  // Apped EC codewords
  for (i = 0; i < ecCount; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      data[index++] = ecData[r][i];
    }
  }

  return data
}

/**
 * Build QR Code symbol
 *
 * @param  {String} data                 Input string
 * @param  {Number} version              QR Code version
 * @param  {ErrorCorretionLevel} errorCorrectionLevel Error level
 * @param  {MaskPattern} maskPattern     Mask pattern
 * @return {Object}                      Object containing symbol data
 */
function createSymbol (data, version, errorCorrectionLevel, maskPattern) {
  let segments;

  if (Array.isArray(data)) {
    segments = Segments.fromArray(data);
  } else if (typeof data === 'string') {
    let estimatedVersion = version;

    if (!estimatedVersion) {
      const rawSegments = Segments.rawSplit(data);

      // Estimate best version that can contain raw splitted segments
      estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel);
    }

    // Build optimized segments
    // If estimated version is undefined, try with the highest version
    segments = Segments.fromString(data, estimatedVersion || 40);
  } else {
    throw new Error('Invalid data')
  }

  // Get the min version that can contain data
  const bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel);

  // If no version is found, data cannot be stored
  if (!bestVersion) {
    throw new Error('The amount of data is too big to be stored in a QR Code')
  }

  // If not specified, use min version as default
  if (!version) {
    version = bestVersion;

  // Check if the specified version can contain the data
  } else if (version < bestVersion) {
    throw new Error('\n' +
      'The chosen QR Code version cannot contain this amount of data.\n' +
      'Minimum version required to store current data is: ' + bestVersion + '.\n'
    )
  }

  const dataBits = createData(version, errorCorrectionLevel, segments);

  // Allocate matrix buffer
  const moduleCount = Utils$1.getSymbolSize(version);
  const modules = new BitMatrix(moduleCount);

  // Add function modules
  setupFinderPattern(modules, version);
  setupTimingPattern(modules);
  setupAlignmentPattern(modules, version);

  // Add temporary dummy bits for format info just to set them as reserved.
  // This is needed to prevent these bits from being masked by {@link MaskPattern.applyMask}
  // since the masking operation must be performed only on the encoding region.
  // These blocks will be replaced with correct values later in code.
  setupFormatInfo(modules, errorCorrectionLevel, 0);

  if (version >= 7) {
    setupVersionInfo(modules, version);
  }

  // Add data codewords
  setupData(modules, dataBits);

  if (isNaN(maskPattern)) {
    // Find best mask pattern
    maskPattern = MaskPattern.getBestMask(modules,
      setupFormatInfo.bind(null, modules, errorCorrectionLevel));
  }

  // Apply mask pattern
  MaskPattern.applyMask(maskPattern, modules);

  // Replace format info bits with correct values
  setupFormatInfo(modules, errorCorrectionLevel, maskPattern);

  return {
    modules: modules,
    version: version,
    errorCorrectionLevel: errorCorrectionLevel,
    maskPattern: maskPattern,
    segments: segments
  }
}

/**
 * QR Code
 *
 * @param {String | Array} data                 Input data
 * @param {Object} options                      Optional configurations
 * @param {Number} options.version              QR Code version
 * @param {String} options.errorCorrectionLevel Error correction level
 * @param {Function} options.toSJISFunc         Helper func to convert utf8 to sjis
 */
qrcode.create = function create (data, options) {
  if (typeof data === 'undefined' || data === '') {
    throw new Error('No input text')
  }

  let errorCorrectionLevel = ECLevel.M;
  let version;
  let mask;

  if (typeof options !== 'undefined') {
    // Use higher error correction level as default
    errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
    version = Version.from(options.version);
    mask = MaskPattern.from(options.maskPattern);

    if (options.toSJISFunc) {
      Utils$1.setToSJISFunction(options.toSJISFunc);
    }
  }

  return createSymbol(data, version, errorCorrectionLevel, mask)
};

var canvas = {};

var utils = {};

(function (exports) {
	function hex2rgba (hex) {
	  if (typeof hex === 'number') {
	    hex = hex.toString();
	  }

	  if (typeof hex !== 'string') {
	    throw new Error('Color should be defined as hex string')
	  }

	  let hexCode = hex.slice().replace('#', '').split('');
	  if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
	    throw new Error('Invalid hex color: ' + hex)
	  }

	  // Convert from short to long form (fff -> ffffff)
	  if (hexCode.length === 3 || hexCode.length === 4) {
	    hexCode = Array.prototype.concat.apply([], hexCode.map(function (c) {
	      return [c, c]
	    }));
	  }

	  // Add default alpha value
	  if (hexCode.length === 6) hexCode.push('F', 'F');

	  const hexValue = parseInt(hexCode.join(''), 16);

	  return {
	    r: (hexValue >> 24) & 255,
	    g: (hexValue >> 16) & 255,
	    b: (hexValue >> 8) & 255,
	    a: hexValue & 255,
	    hex: '#' + hexCode.slice(0, 6).join('')
	  }
	}

	exports.getOptions = function getOptions (options) {
	  if (!options) options = {};
	  if (!options.color) options.color = {};

	  const margin = typeof options.margin === 'undefined' ||
	    options.margin === null ||
	    options.margin < 0
	    ? 4
	    : options.margin;

	  const width = options.width && options.width >= 21 ? options.width : undefined;
	  const scale = options.scale || 4;

	  return {
	    width: width,
	    scale: width ? 4 : scale,
	    margin: margin,
	    color: {
	      dark: hex2rgba(options.color.dark || '#000000ff'),
	      light: hex2rgba(options.color.light || '#ffffffff')
	    },
	    type: options.type,
	    rendererOpts: options.rendererOpts || {}
	  }
	};

	exports.getScale = function getScale (qrSize, opts) {
	  return opts.width && opts.width >= qrSize + opts.margin * 2
	    ? opts.width / (qrSize + opts.margin * 2)
	    : opts.scale
	};

	exports.getImageWidth = function getImageWidth (qrSize, opts) {
	  const scale = exports.getScale(qrSize, opts);
	  return Math.floor((qrSize + opts.margin * 2) * scale)
	};

	exports.qrToImageData = function qrToImageData (imgData, qr, opts) {
	  const size = qr.modules.size;
	  const data = qr.modules.data;
	  const scale = exports.getScale(size, opts);
	  const symbolSize = Math.floor((size + opts.margin * 2) * scale);
	  const scaledMargin = opts.margin * scale;
	  const palette = [opts.color.light, opts.color.dark];

	  for (let i = 0; i < symbolSize; i++) {
	    for (let j = 0; j < symbolSize; j++) {
	      let posDst = (i * symbolSize + j) * 4;
	      let pxColor = opts.color.light;

	      if (i >= scaledMargin && j >= scaledMargin &&
	        i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
	        const iSrc = Math.floor((i - scaledMargin) / scale);
	        const jSrc = Math.floor((j - scaledMargin) / scale);
	        pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
	      }

	      imgData[posDst++] = pxColor.r;
	      imgData[posDst++] = pxColor.g;
	      imgData[posDst++] = pxColor.b;
	      imgData[posDst] = pxColor.a;
	    }
	  }
	}; 
} (utils));

(function (exports) {
	const Utils = utils;

	function clearCanvas (ctx, canvas, size) {
	  ctx.clearRect(0, 0, canvas.width, canvas.height);

	  if (!canvas.style) canvas.style = {};
	  canvas.height = size;
	  canvas.width = size;
	  canvas.style.height = size + 'px';
	  canvas.style.width = size + 'px';
	}

	function getCanvasElement () {
	  try {
	    return document.createElement('canvas')
	  } catch (e) {
	    throw new Error('You need to specify a canvas element')
	  }
	}

	exports.render = function render (qrData, canvas, options) {
	  let opts = options;
	  let canvasEl = canvas;

	  if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
	    opts = canvas;
	    canvas = undefined;
	  }

	  if (!canvas) {
	    canvasEl = getCanvasElement();
	  }

	  opts = Utils.getOptions(opts);
	  const size = Utils.getImageWidth(qrData.modules.size, opts);

	  const ctx = canvasEl.getContext('2d');
	  const image = ctx.createImageData(size, size);
	  Utils.qrToImageData(image.data, qrData, opts);

	  clearCanvas(ctx, canvasEl, size);
	  ctx.putImageData(image, 0, 0);

	  return canvasEl
	};

	exports.renderToDataURL = function renderToDataURL (qrData, canvas, options) {
	  let opts = options;

	  if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
	    opts = canvas;
	    canvas = undefined;
	  }

	  if (!opts) opts = {};

	  const canvasEl = exports.render(qrData, canvas, opts);

	  const type = opts.type || 'image/png';
	  const rendererOpts = opts.rendererOpts || {};

	  return canvasEl.toDataURL(type, rendererOpts.quality)
	}; 
} (canvas));

var svgTag = {};

const Utils = utils;

function getColorAttrib (color, attrib) {
  const alpha = color.a / 255;
  const str = attrib + '="' + color.hex + '"';

  return alpha < 1
    ? str + ' ' + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"'
    : str
}

function svgCmd (cmd, x, y) {
  let str = cmd + x;
  if (typeof y !== 'undefined') str += ' ' + y;

  return str
}

function qrToPath (data, size, margin) {
  let path = '';
  let moveBy = 0;
  let newRow = false;
  let lineLength = 0;

  for (let i = 0; i < data.length; i++) {
    const col = Math.floor(i % size);
    const row = Math.floor(i / size);

    if (!col && !newRow) newRow = true;

    if (data[i]) {
      lineLength++;

      if (!(i > 0 && col > 0 && data[i - 1])) {
        path += newRow
          ? svgCmd('M', col + margin, 0.5 + row + margin)
          : svgCmd('m', moveBy, 0);

        moveBy = 0;
        newRow = false;
      }

      if (!(col + 1 < size && data[i + 1])) {
        path += svgCmd('h', lineLength);
        lineLength = 0;
      }
    } else {
      moveBy++;
    }
  }

  return path
}

svgTag.render = function render (qrData, options, cb) {
  const opts = Utils.getOptions(options);
  const size = qrData.modules.size;
  const data = qrData.modules.data;
  const qrcodesize = size + opts.margin * 2;

  const bg = !opts.color.light.a
    ? ''
    : '<path ' + getColorAttrib(opts.color.light, 'fill') +
      ' d="M0 0h' + qrcodesize + 'v' + qrcodesize + 'H0z"/>';

  const path =
    '<path ' + getColorAttrib(opts.color.dark, 'stroke') +
    ' d="' + qrToPath(data, size, opts.margin) + '"/>';

  const viewBox = 'viewBox="' + '0 0 ' + qrcodesize + ' ' + qrcodesize + '"';

  const width = !opts.width ? '' : 'width="' + opts.width + '" height="' + opts.width + '" ';

  const svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + '</svg>\n';

  if (typeof cb === 'function') {
    cb(null, svgTag);
  }

  return svgTag
};

const canPromise = canPromise$1;

const QRCode = qrcode;
const CanvasRenderer = canvas;
const SvgRenderer = svgTag;

function renderCanvas (renderFunc, canvas, text, opts, cb) {
  const args = [].slice.call(arguments, 1);
  const argsNum = args.length;
  const isLastArgCb = typeof args[argsNum - 1] === 'function';

  if (!isLastArgCb && !canPromise()) {
    throw new Error('Callback required as last argument')
  }

  if (isLastArgCb) {
    if (argsNum < 2) {
      throw new Error('Too few arguments provided')
    }

    if (argsNum === 2) {
      cb = text;
      text = canvas;
      canvas = opts = undefined;
    } else if (argsNum === 3) {
      if (canvas.getContext && typeof cb === 'undefined') {
        cb = opts;
        opts = undefined;
      } else {
        cb = opts;
        opts = text;
        text = canvas;
        canvas = undefined;
      }
    }
  } else {
    if (argsNum < 1) {
      throw new Error('Too few arguments provided')
    }

    if (argsNum === 1) {
      text = canvas;
      canvas = opts = undefined;
    } else if (argsNum === 2 && !canvas.getContext) {
      opts = text;
      text = canvas;
      canvas = undefined;
    }

    return new Promise(function (resolve, reject) {
      try {
        const data = QRCode.create(text, opts);
        resolve(renderFunc(data, canvas, opts));
      } catch (e) {
        reject(e);
      }
    })
  }

  try {
    const data = QRCode.create(text, opts);
    cb(null, renderFunc(data, canvas, opts));
  } catch (e) {
    cb(e);
  }
}

browser.create = QRCode.create;
browser.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
browser.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);

// only svg for now.
browser.toString = renderCanvas.bind(null, function (data, _, opts) {
  return SvgRenderer.render(data, opts)
});

/* src/routes/Test.svelte generated by Svelte v3.59.2 */
const file$1 = "src/routes/Test.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[13] = list[i];
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[16] = list[i];
	return child_ctx;
}

// (4:6) {#each events || [] as event}
function create_each_block_1(ctx) {
	let option;
	let t0_value = /*event*/ ctx[16].name + "";
	let t0;
	let t1;
	let option_value_value;

	const block = {
		c: function create() {
			option = element("option");
			t0 = text(t0_value);
			t1 = space();
			option.__value = option_value_value = /*event*/ ctx[16].id;
			option.value = option.__value;
			add_location(option, file$1, 4, 8, 191);
		},
		m: function mount(target, anchor) {
			insert_dev(target, option, anchor);
			append_dev(option, t0);
			append_dev(option, t1);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*events*/ 1 && t0_value !== (t0_value = /*event*/ ctx[16].name + "")) set_data_dev(t0, t0_value);

			if (dirty & /*events*/ 1 && option_value_value !== (option_value_value = /*event*/ ctx[16].id)) {
				prop_dev(option, "__value", option_value_value);
				option.value = option.__value;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(option);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_1.name,
		type: "each",
		source: "(4:6) {#each events || [] as event}",
		ctx
	});

	return block;
}

// (12:6) {#each tickets || [] as ticket}
function create_each_block(ctx) {
	let option;
	let t0_value = /*ticket*/ ctx[13].name + "";
	let t0;
	let t1;
	let option_value_value;

	const block = {
		c: function create() {
			option = element("option");
			t0 = text(t0_value);
			t1 = space();
			option.__value = option_value_value = /*ticket*/ ctx[13].id;
			option.value = option.__value;
			add_location(option, file$1, 12, 8, 435);
		},
		m: function mount(target, anchor) {
			insert_dev(target, option, anchor);
			append_dev(option, t0);
			append_dev(option, t1);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*tickets*/ 2 && t0_value !== (t0_value = /*ticket*/ ctx[13].name + "")) set_data_dev(t0, t0_value);

			if (dirty & /*tickets*/ 2 && option_value_value !== (option_value_value = /*ticket*/ ctx[13].id)) {
				prop_dev(option, "__value", option_value_value);
				option.value = option.__value;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(option);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(12:6) {#each tickets || [] as ticket}",
		ctx
	});

	return block;
}

// (27:0) {#if l_ticket_instance}
function create_if_block_1(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("Carregando...");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(27:0) {#if l_ticket_instance}",
		ctx
	});

	return block;
}

// (29:0) {#if ticket_instance.id}
function create_if_block(ctx) {
	let img;
	let img_src_value;
	let t0;
	let p;
	let t1_value = /*ticket_instance*/ ctx[6].id + "";
	let t1;
	let t2;
	let icon;
	let current;
	let mounted;
	let dispose;

	icon = new Icon({
			props: { i: "content_copy" },
			$$inline: true
		});

	const block = {
		c: function create() {
			img = element("img");
			t0 = space();
			p = element("p");
			t1 = text(t1_value);
			t2 = space();
			create_component(icon.$$.fragment);
			if (!src_url_equal(img.src, img_src_value = /*ticket_instance*/ ctx[6].qr)) attr_dev(img, "src", img_src_value);
			attr_dev(img, "alt", "QR Code");
			attr_dev(img, "class", "svelte-1h2q3xn");
			add_location(img, file$1, 29, 2, 798);
			attr_dev(p, "class", "code t-w-icon svelte-1h2q3xn");
			add_location(p, file$1, 31, 2, 906);
		},
		m: function mount(target, anchor) {
			insert_dev(target, img, anchor);
			insert_dev(target, t0, anchor);
			insert_dev(target, p, anchor);
			append_dev(p, t1);
			append_dev(p, t2);
			mount_component(icon, p, null);
			current = true;

			if (!mounted) {
				dispose = listen_dev(p, "click", /*copy*/ ctx[7], false, false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (!current || dirty & /*ticket_instance*/ 64 && !src_url_equal(img.src, img_src_value = /*ticket_instance*/ ctx[6].qr)) {
				attr_dev(img, "src", img_src_value);
			}

			if ((!current || dirty & /*ticket_instance*/ 64) && t1_value !== (t1_value = /*ticket_instance*/ ctx[6].id + "")) set_data_dev(t1, t1_value);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(img);
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(p);
			destroy_component(icon);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(29:0) {#if ticket_instance.id}",
		ctx
	});

	return block;
}

function create_fragment$1(ctx) {
	let form;
	let label0;
	let t0;
	let select0;
	let t1;
	let label1;
	let t2;
	let select1;
	let select1_disabled_value;
	let t3;
	let label2;
	let t4;
	let input;
	let t5;
	let button;
	let t6;
	let button_disabled_value;
	let t7;
	let div;
	let t8;
	let t9;
	let if_block1_anchor;
	let current;
	let mounted;
	let dispose;
	let each_value_1 = /*events*/ ctx[0] || [];
	validate_each_argument(each_value_1);
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	let each_value = /*tickets*/ ctx[1] || [];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	let if_block0 = /*l_ticket_instance*/ ctx[5] && create_if_block_1(ctx);
	let if_block1 = /*ticket_instance*/ ctx[6].id && create_if_block(ctx);

	const block = {
		c: function create() {
			form = element("form");
			label0 = element("label");
			t0 = text("Evento:\n    ");
			select0 = element("select");

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			t1 = space();
			label1 = element("label");
			t2 = text("Ingresso:\n    ");
			select1 = element("select");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t3 = space();
			label2 = element("label");
			t4 = text("Meia:\n    ");
			input = element("input");
			t5 = space();
			button = element("button");
			t6 = text("Criar Ingresso Teste");
			t7 = space();
			div = element("div");
			t8 = space();
			if (if_block0) if_block0.c();
			t9 = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
			attr_dev(select0, "class", "svelte-1h2q3xn");
			if (/*event_id*/ ctx[2] === void 0) add_render_callback(() => /*select0_change_handler*/ ctx[10].call(select0));
			toggle_class(select0, "cw", /*events*/ ctx[0] == undefined);
			add_location(select0, file$1, 2, 4, 60);
			add_location(label0, file$1, 1, 2, 40);
			select1.disabled = select1_disabled_value = !/*event_id*/ ctx[2];
			attr_dev(select1, "class", "svelte-1h2q3xn");
			if (/*ticket_id*/ ctx[3] === void 0) add_render_callback(() => /*select1_change_handler*/ ctx[11].call(select1));
			toggle_class(select1, "cw", /*tickets*/ ctx[1] == undefined);
			add_location(select1, file$1, 10, 4, 304);
			add_location(label1, file$1, 9, 2, 282);
			attr_dev(input, "type", "checkbox");
			add_location(input, file$1, 18, 4, 546);
			add_location(label2, file$1, 17, 2, 528);
			attr_dev(button, "class", "grn svelte-1h2q3xn");
			attr_dev(button, "type", "submit");
			button.disabled = button_disabled_value = !/*ticket_id*/ ctx[3];
			add_location(button, file$1, 21, 2, 609);
			attr_dev(form, "class", "tas svelte-1h2q3xn");
			add_location(form, file$1, 0, 0, 0);
			attr_dev(div, "class", "hr");
			add_location(div, file$1, 24, 0, 706);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			insert_dev(target, form, anchor);
			append_dev(form, label0);
			append_dev(label0, t0);
			append_dev(label0, select0);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				if (each_blocks_1[i]) {
					each_blocks_1[i].m(select0, null);
				}
			}

			select_option(select0, /*event_id*/ ctx[2], true);
			append_dev(form, t1);
			append_dev(form, label1);
			append_dev(label1, t2);
			append_dev(label1, select1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(select1, null);
				}
			}

			select_option(select1, /*ticket_id*/ ctx[3], true);
			append_dev(form, t3);
			append_dev(form, label2);
			append_dev(label2, t4);
			append_dev(label2, input);
			input.checked = /*is_half*/ ctx[4];
			append_dev(form, t5);
			append_dev(form, button);
			append_dev(button, t6);
			insert_dev(target, t7, anchor);
			insert_dev(target, div, anchor);
			insert_dev(target, t8, anchor);
			if (if_block0) if_block0.m(target, anchor);
			insert_dev(target, t9, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert_dev(target, if_block1_anchor, anchor);
			current = true;

			if (!mounted) {
				dispose = [
					listen_dev(select0, "change", /*select0_change_handler*/ ctx[10]),
					listen_dev(select0, "change", /*load_tickets*/ ctx[8], false, false, false, false),
					listen_dev(select1, "change", /*select1_change_handler*/ ctx[11]),
					listen_dev(input, "change", /*input_change_handler*/ ctx[12]),
					listen_dev(form, "submit", /*submit*/ ctx[9], false, false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*events*/ 1) {
				each_value_1 = /*events*/ ctx[0] || [];
				validate_each_argument(each_value_1);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_1(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(select0, null);
					}
				}

				for (; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].d(1);
				}

				each_blocks_1.length = each_value_1.length;
			}

			if (dirty & /*event_id, events*/ 5) {
				select_option(select0, /*event_id*/ ctx[2]);
			}

			if (!current || dirty & /*events, undefined*/ 1) {
				toggle_class(select0, "cw", /*events*/ ctx[0] == undefined);
			}

			if (dirty & /*tickets*/ 2) {
				each_value = /*tickets*/ ctx[1] || [];
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(select1, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (!current || dirty & /*event_id, events*/ 5 && select1_disabled_value !== (select1_disabled_value = !/*event_id*/ ctx[2])) {
				prop_dev(select1, "disabled", select1_disabled_value);
			}

			if (dirty & /*ticket_id, tickets*/ 10) {
				select_option(select1, /*ticket_id*/ ctx[3]);
			}

			if (!current || dirty & /*tickets, undefined*/ 2) {
				toggle_class(select1, "cw", /*tickets*/ ctx[1] == undefined);
			}

			if (dirty & /*is_half*/ 16) {
				input.checked = /*is_half*/ ctx[4];
			}

			if (!current || dirty & /*ticket_id, tickets*/ 10 && button_disabled_value !== (button_disabled_value = !/*ticket_id*/ ctx[3])) {
				prop_dev(button, "disabled", button_disabled_value);
			}

			if (/*l_ticket_instance*/ ctx[5]) {
				if (if_block0) ; else {
					if_block0 = create_if_block_1(ctx);
					if_block0.c();
					if_block0.m(t9.parentNode, t9);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*ticket_instance*/ ctx[6].id) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*ticket_instance*/ 64) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block1);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(form);
			destroy_each(each_blocks_1, detaching);
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(t7);
			if (detaching) detach_dev(div);
			if (detaching) detach_dev(t8);
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach_dev(t9);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach_dev(if_block1_anchor);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('Test', slots, []);
	let events, tickets, event_id, ticket_id, is_half;
	let l_ticket_instance;
	let ticket_instance = {};

	function copy() {
		copy_to_clipboard(ticket_instance.id);
	}

	async function load_tickets() {
		$$invalidate(1, tickets = undefined);
		let { data } = await api(`event-tickets/${event_id}`);
		let all_tickets = data.tickets;

		$$invalidate(1, tickets = (await Promise.all(all_tickets.map(async t => {
			const { data } = await api(`ticket-batches/${t.id}`);
			return { ...t, has_batch: data.batches.length };
		}))).filter(t => t.has_batch));

		if (tickets.length) $$invalidate(3, ticket_id = tickets[0].id);
	}

	async function submit(e) {
		e.preventDefault();
		$$invalidate(5, l_ticket_instance = true);
		let { data } = await api(`ticket-batches/${ticket_id}`);
		const batch_id = data.batches[0].id;

		const { id } = (await api(`ticket-instance/${batch_id}`, 'POST', {
			price_in_cents: 0,
			is_half,
			is_test: true
		})).data;

		$$invalidate(6, ticket_instance.qr = await browser.toDataURL(id), ticket_instance);
		$$invalidate(6, ticket_instance.id = id, ticket_instance);
		$$invalidate(5, l_ticket_instance = false);
	}

	onMount(async _ => $$invalidate(0, events = (await api('all-events')).data.events));
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Test> was created with unknown prop '${key}'`);
	});

	function select0_change_handler() {
		event_id = select_value(this);
		$$invalidate(2, event_id);
		$$invalidate(0, events);
	}

	function select1_change_handler() {
		ticket_id = select_value(this);
		$$invalidate(3, ticket_id);
		$$invalidate(1, tickets);
	}

	function input_change_handler() {
		is_half = this.checked;
		$$invalidate(4, is_half);
	}

	$$self.$capture_state = () => ({
		Icon,
		copy_to_clipboard,
		api,
		onMount,
		QRCode: browser,
		events,
		tickets,
		event_id,
		ticket_id,
		is_half,
		l_ticket_instance,
		ticket_instance,
		copy,
		load_tickets,
		submit
	});

	$$self.$inject_state = $$props => {
		if ('events' in $$props) $$invalidate(0, events = $$props.events);
		if ('tickets' in $$props) $$invalidate(1, tickets = $$props.tickets);
		if ('event_id' in $$props) $$invalidate(2, event_id = $$props.event_id);
		if ('ticket_id' in $$props) $$invalidate(3, ticket_id = $$props.ticket_id);
		if ('is_half' in $$props) $$invalidate(4, is_half = $$props.is_half);
		if ('l_ticket_instance' in $$props) $$invalidate(5, l_ticket_instance = $$props.l_ticket_instance);
		if ('ticket_instance' in $$props) $$invalidate(6, ticket_instance = $$props.ticket_instance);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [
		events,
		tickets,
		event_id,
		ticket_id,
		is_half,
		l_ticket_instance,
		ticket_instance,
		copy,
		load_tickets,
		submit,
		select0_change_handler,
		select1_change_handler,
		input_change_handler
	];
}

class Test extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Test",
			options,
			id: create_fragment$1.name
		});
	}
}

/* src/App.svelte generated by Svelte v3.59.2 */
const file = "src/App.svelte";

function create_fragment(ctx) {
	let topbar;
	let t0;
	let div1;
	let sidebar;
	let t1;
	let main;
	let h1;
	let t2_value = /*routes*/ ctx[1][/*curr_route*/ ctx[0]][0] + "";
	let t2;
	let t3;
	let div0;
	let t4;
	let switch_instance;
	let current;
	topbar = new TopBar({ $$inline: true });
	sidebar = new SideBar({ $$inline: true });
	var switch_value = /*routes*/ ctx[1][/*curr_route*/ ctx[0]][1];

	function switch_props(ctx) {
		return { $$inline: true };
	}

	if (switch_value) {
		switch_instance = construct_svelte_component_dev(switch_value, switch_props());
	}

	const block = {
		c: function create() {
			create_component(topbar.$$.fragment);
			t0 = space();
			div1 = element("div");
			create_component(sidebar.$$.fragment);
			t1 = space();
			main = element("main");
			h1 = element("h1");
			t2 = text(t2_value);
			t3 = space();
			div0 = element("div");
			t4 = space();
			if (switch_instance) create_component(switch_instance.$$.fragment);
			attr_dev(h1, "class", "tabname");
			add_location(h1, file, 4, 4, 57);
			attr_dev(div0, "class", "hr");
			add_location(div0, file, 5, 4, 114);
			attr_dev(main, "class", "svelte-12upzpe");
			add_location(main, file, 3, 2, 46);
			attr_dev(div1, "class", "page svelte-12upzpe");
			add_location(div1, file, 1, 0, 11);
		},
		l: function claim(nodes) {
			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
		},
		m: function mount(target, anchor) {
			mount_component(topbar, target, anchor);
			insert_dev(target, t0, anchor);
			insert_dev(target, div1, anchor);
			mount_component(sidebar, div1, null);
			append_dev(div1, t1);
			append_dev(div1, main);
			append_dev(main, h1);
			append_dev(h1, t2);
			append_dev(main, t3);
			append_dev(main, div0);
			append_dev(main, t4);
			if (switch_instance) mount_component(switch_instance, main, null);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if ((!current || dirty & /*curr_route*/ 1) && t2_value !== (t2_value = /*routes*/ ctx[1][/*curr_route*/ ctx[0]][0] + "")) set_data_dev(t2, t2_value);

			if (dirty & /*curr_route*/ 1 && switch_value !== (switch_value = /*routes*/ ctx[1][/*curr_route*/ ctx[0]][1])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = construct_svelte_component_dev(switch_value, switch_props());
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, main, null);
				} else {
					switch_instance = null;
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(topbar.$$.fragment, local);
			transition_in(sidebar.$$.fragment, local);
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(topbar.$$.fragment, local);
			transition_out(sidebar.$$.fragment, local);
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(topbar, detaching);
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(div1);
			destroy_component(sidebar);
			if (switch_instance) destroy_component(switch_instance);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let $logged_user;
	let $curr_path;
	validate_store(logged_user, 'logged_user');
	component_subscribe($$self, logged_user, $$value => $$invalidate(2, $logged_user = $$value));
	validate_store(curr_path, 'curr_path');
	component_subscribe($$self, curr_path, $$value => $$invalidate(3, $curr_path = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots('App', slots, []);
	let curr_route;

	const routes = {
		'': ['Login', Login, 0],
		usuarios: ['Usuários', Users, 2],
		eventos: ['Eventos', Events, 2],
		evento: ['Evento', EventDetails, 2],
		ingresso: ['Ingresso', TicketDetails, 2],
		verificacao: ['Verificação', Verification, 1],
		historico: ['Histórico', History, 1],
		teste: ['Teste', Test, 1],
		not_found: ['404', undefined, 1]
	};

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({
		TopBar,
		SideBar,
		Users,
		Events,
		EventDetails,
		TicketDetails,
		Login,
		Verification,
		History,
		Test,
		curr_path,
		logged_user,
		curr_route,
		routes,
		$logged_user,
		$curr_path
	});

	$$self.$inject_state = $$props => {
		if ('curr_route' in $$props) $$invalidate(0, curr_route = $$props.curr_route);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$curr_path, curr_route, $logged_user*/ 13) {
			{
				$$invalidate(0, curr_route = $curr_path.split('/')[1]);
				if (!routes[curr_route]) $$invalidate(0, curr_route = 'not_found');

				const user_level = ({
					'admin': 2,
					'portaria': 1,
					'undefined': 0
				})[$logged_user?.role];

				if (!user_level) $$invalidate(0, curr_route = '');
				if (user_level == 2 && curr_route == '') $$invalidate(0, curr_route = 'eventos');
				if (user_level == 1 && curr_route == '') $$invalidate(0, curr_route = 'verificacao');
				if (user_level < routes[curr_route][2] || !routes[curr_route]) $$invalidate(0, curr_route = 'not_found');
			}
		}
	};

	return [curr_route, routes, $logged_user, $curr_path];
}

class App extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "App",
			options,
			id: create_fragment.name
		});
	}
}

var main = new App({ target: document.body });

export { main as default };
//# sourceMappingURL=main.js.map
