"use client"; // Para usar componentes do Shadcn no lado client

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { FaBookReader, FaUserAlt } from "react-icons/fa";
import { MdDashboard, MdEventNote } from "react-icons/md";
import { BsCalendarEventFill } from "react-icons/bs";
import ItemMenuSidebar from "./ItemMenuSidebar";

export default function Sidebar() {
  return (
    <nav className="col-span-3 h-full p-3">
      <div className="border-r-2 border-slate-300 h-full px-3">
        <h3 className="mb-3 px-6 font-bold">Admin Tools</h3>
        <ul className="flex flex-col w-full gap-1">
          <ItemMenuSidebar route="">
            <MdDashboard />
            Dashboard
          </ItemMenuSidebar>
          <ItemMenuSidebar route="events">
            <BsCalendarEventFill />
            Eventos
          </ItemMenuSidebar>
          <ItemMenuSidebar route="users">
            <FaUserAlt />
            Usuários
          </ItemMenuSidebar>
        </ul>
        <div className="my-3 w-full border-b-2 border-slate-300"></div>
      </div>
    </nav>
  );
}
