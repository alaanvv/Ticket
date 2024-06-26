import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  route?: string;
  active: boolean;
  onClick?: () => void; // Adicionamos a propriedade onClick
  isOpen?: boolean; // Adicionamos a propriedade isOpen para indicar se o submenu está aberto
}

export default function ItemMenuSidebar({
  children,
  route,
  active,
  onClick,
  isOpen,
}: Props) {
  const isLink = !!route; // Verifica se é um link ou um item de submenu

  return (
    <li className="w-full">
      {isLink ? (
        <Link
          className={cn(
            "flex items-center gap-2 p-3 rounded-xl transition-all font-medium cursor-pointer hover:bg-primary/90 hover:text-white",
            active && "bg-primary text-white"
          )}
          href={`/${route}`}
        >
          {children}
        </Link>
      ) : (
        <button
          onClick={onClick}
          className={cn(
            "flex items-center gap-2 p-3 rounded-xl transition-all font-medium cursor-pointer w-full text-left hover:bg-primary hover:text-white",
            active && "bg-primary text-white",
            isOpen && "bg-primary text-white" // Marca como ativo se o submenu estiver aberto
          )}
        >
          {children}
        </button>
      )}
    </li>
  );
}
