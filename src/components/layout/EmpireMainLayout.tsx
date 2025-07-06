import * as React from "react";
import EmpireSidebarClean from "../EmpireSidebarClean"; // Adjust path if needed

interface EmpireMainLayoutProps {
  children: React.ReactNode;
}

export default function EmpireMainLayout({ children }: EmpireMainLayoutProps) {
  return (
    <div className="min-h-screen bg-black flex">
      <EmpireSidebarClean />
      <main className="flex-1 bg-gray-950 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
