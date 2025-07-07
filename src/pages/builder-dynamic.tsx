// src/pages/builder-dynamic.tsx

import { useEffect, useState } from "react";
import { builder } from "@builder.io/react";
import { getBuilderContent, initializeBuilder } from "../lib/builder-config";

initializeBuilder();

const BuilderDynamic = () => {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    async function fetchContent() {
      const { content, error } = await getBuilderContent("page", {
        url: window.location.pathname
      });

      if (error) {
        console.error("Builder content error:", error);
      }

      setContent(content);
    }

    fetchContent();
  }, []);

  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{content?.data?.title || "Dynamic Page"}</h1>
      <div dangerouslySetInnerHTML={{ __html: content?.data?.body || "" }} />
    </div>
  );
};

export default BuilderDynamic;
