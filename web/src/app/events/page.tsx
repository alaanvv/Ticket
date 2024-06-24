"use client";

import FormEvents from "./components/FormEvents";

export default function Events() {
  return (
    <div className="bg-[#fff] w-full rounded py-3 px-6 h-full overflow-auto">
      <h2 className="text-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-6">
        Eventos
      </h2>
      <div>
        <FormEvents />
      </div>
    </div>
  );
}
