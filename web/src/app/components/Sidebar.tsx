"use client";

import {
  FaChevronDown,
  FaChevronRight,
  FaEye,
  FaPlus,
  FaUserAlt,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { BsCalendarEventFill } from "react-icons/bs";
import ItemMenuSidebar from "./ItemMenuSidebar";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const [isEventosOpen, setIsEventosOpen] = useState(false);

  const toggleEventosMenu = () => {
    setIsEventosOpen(!isEventosOpen);
  };
  const pathname = usePathname();

  return (
    <nav className="col-span-3 h-full p-3">
      <div className="border-r-2 border-slate-300 h-full px-3">
        <h3 className="mb-3 px-6 font-bold">Admin Tools</h3>
        <ul className="flex flex-col w-full gap-1">
          <ItemMenuSidebar active={pathname === "/"} route="/">
            <MdDashboard />
            Dashboard
          </ItemMenuSidebar>
          <ItemMenuSidebar active={pathname === "/users"} route="users">
            <FaUserAlt />
            Usuários
          </ItemMenuSidebar>
          <ItemMenuSidebar
            active={pathname.startsWith("/events")} // Ativo se a rota começar com "/events"
            onClick={toggleEventosMenu}
            isOpen={isEventosOpen} // Passamos o estado para o componente
          >
            <BsCalendarEventFill />
            Eventos
            {isEventosOpen ? <FaChevronDown /> : <FaChevronRight />}
          </ItemMenuSidebar>

          {isEventosOpen && ( // Exibimos o submenu se isEventosOpen for true
            <ul className="pl-4 flex flex-col w-full gap-1">
              <ItemMenuSidebar
                active={pathname === "/events/create"}
                route="events/create"
              >
                <FaPlus />
                Criar Evento
              </ItemMenuSidebar>
              <ItemMenuSidebar
                active={pathname === "/events/show"}
                route="events/show"
              >
                <FaEye />
                Visualizar Eventos
              </ItemMenuSidebar>
            </ul>
          )}
        </ul>
        <div className="my-3 w-full border-b-2 border-slate-300"></div>
      </div>
    </nav>
  );
}
