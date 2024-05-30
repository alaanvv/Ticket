import { ReactNode } from "react";
type Props = {
  children: ReactNode;
};
export default function ItemMenuSidebar({ children }: Props) {
  return (
    <li className="flex text-gray-600 items-center gap-2 p-3 rounded-xl transition-all font-medium cursor-pointer hover:bg-primary hover:text-white">
      {children}
    </li>
  );
}
