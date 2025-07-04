import Link from "next/link";

export default function EmpireSidebarClean() {
  return (
    <aside className="w-[240px] bg-black text-white h-full p-4 space-y-4 border-r border-neutral-800">
      <nav className="flex flex-col space-y-2">
        <Link href="/dashboard" className="hover:text-yellow-300 transition">Dashboard</Link>
        <Link href="/console" className="hover:text-yellow-300 transition">AI Console</Link>
        <Link href="/crm" className="hover:text-yellow-300 transition">Client CRM</Link>
        <Link href="/builder" className="hover:text-yellow-300 transition">Builder</Link>
        <Link href="/upgrade" className="text-yellow-400 font-semibold mt-4 hover:underline">Upgrade</Link>
      </nav>
    </aside>
  );
}

