'use client';

import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function SearchInput() {
  return (
    <div className="relative">
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
      <Input
        type="text"
        placeholder="Search..."
        className="pl-10 pr-4 py-2 rounded-xl border placeholder:text-zinc-500 text-zinc-700 focus-visible:bg-transparent border-gray-300"
      />
    </div>
  );
}
