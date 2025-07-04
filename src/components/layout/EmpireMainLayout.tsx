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

