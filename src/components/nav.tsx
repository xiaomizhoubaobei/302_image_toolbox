"use client";

import { useRouter } from "next/navigation";


export function Navbar() {
  const router = useRouter();
  // const { token } = useStore();

  return (
    <header className="w-full h-12 flex fixed bg-background/95 z-20 justify-between items-center px-2 py-1 shadow-sm md:shadow-none md:py-1">
      <div className="flex items-center gap-4 p-2">
      </div>
    </header>
  );
}
