"use client"

import Image from "next/image";
import FormTicket from "./components/FormTicket";

export default function Tickets() {
  return (
    <div className="bg-[#fff] w-full rounded p-3 h-full">
      <h3 className="text-center">Ingressos</h3>
      <div>
        <FormTicket />
      </div>
    </div>
  );
}
