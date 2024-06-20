import Link from "next/link";
import { ReactNode } from "react";
type Props = {
  children: ReactNode;
  route?: string;
};
export default function ItemMenuSidebar({ children, route }: Props) {
  return (
    <li className="w-full">
      <Link
        className="flex text-gray-600 items-center gap-2 p-3 rounded-xl transition-all font-medium cursor-pointer hover:bg-primary hover:text-white"
        href={`/${route}`}
      >
        {children}
      </Link>
    </li>
  );
}
