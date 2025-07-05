import React from "react";
import EmpireSidebarClean from "../EmpireSidebarClean"; // 👈 Adjusted for local path, not alias

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
import React from "react";
import EmpireSidebarClean from "@/components/EmpireSidebarClean";

interface EmpireMainLayoutProps {
  children: React.ReactNode;
}

export default function EmpireMainLayout({ children }: EmpireMainLayoutProps) {
  return (
    <div className="min-h-screen bg-black flex">
      <EmpireSidebarClean />
      <main className="flex-1">{children}</main>
    </div>
  );
}

