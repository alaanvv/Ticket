import Image from "next/image";
import { IoTicketSharp } from "react-icons/io5";
import SearchInput from "./SearchInput";

export default function Header() {
  return (
    <header className="bg-background text-black flex justify-between items-center shadow-sm row-span-1 px-12">
      <div className="flex items-center">
        <div className="flex items-center gap-3">
          <IoTicketSharp className="w-8 h-8" />
          <div className="grid items-center justify-center text-center">
            <h4 className="text-sm">iTicket</h4>
          </div>
        </div>
      </div>

      <div>
        <SearchInput />
      </div>

      <div className="flex items-center gap-4 h-full">
        <div className="flex flex-col text-end">
          <p className="text-xs uppercase">Welcome</p>
          <span className="font-semibold">Tom Miller</span>
        </div>
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScuOKcRCySbtTZHLPP2FT8nvNHG25StGcdhw&s"
          alt="Imagem de perfil do usuario"
          className="rounded-full object-contain"
          width={38}
          height={38}
        />
      </div>
    </header>
  );
}
