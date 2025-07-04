import { BuilderComponent, builder } from "@builder.io/react";
import { useEffect, useState } from "react";

// Initialize Builder.io with your public API key
builder.init(import.meta.env.VITE_BUILDER_API_KEY);

export default function Page() {
  const [builderContent, setBuilderContent] = useState<any>(null);

  useEffect(() => {
    builder
      .get("page", { url: window.location.pathname })
      .toPromise()
      .then((content) => setBuilderContent(content));
  }, []);

  return (
    <div>
      {builderContent ? (
        <BuilderComponent model="page" content={builderContent} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
import { BuilderComponent, builder } from "@builder.io/react";
import React from "react";

builder.init(import.meta.env.VITE_BUILDER_API_KEY);

export default function Page() {
  return (
    <div>
      <BuilderComponent model="page" />
    </div>
  );
}
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
