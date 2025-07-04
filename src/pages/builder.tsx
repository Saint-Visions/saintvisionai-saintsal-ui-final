export default function Page() { return (import { BuilderComponent, builder } from "@builder.io/react";

builder.init(import.meta.env.VITE_BUILDER_API_KEY);

export default function BuilderPage() {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <BuilderComponent model="page" />
    </div>
  );
}
); }