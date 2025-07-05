import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Console", path: "/console" },
  { label: "CRM", path: "/crm" },
  { label: "Operations", path: "/operations" },
  { label: "PartnerTech.AI", path: "/partnertech" },
];

export default function EmpireSidebarClean() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  return (
    <aside className="w-72 min-h-screen bg-black border-r border-yellow-500/20 p-4 text-yellow-400">
      <div className="text-2xl font-extrabold mb-6 tracking-widest">EmpireNav™</div>
      <ul className="space-y-3">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`block px-4 py-2 rounded-lg transition-all ${
                isActive(item.path)
                  ? "bg-yellow-500/10 text-yellow-300 border border-yellow-500/30"
                  : "text-gray-300 hover:bg-yellow-500/5 hover:text-yellow-200"
              }`}
              style={{ textDecoration: "none" }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

