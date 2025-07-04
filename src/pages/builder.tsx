import { BuilderComponent, builder } from "@builder.io/react"
import { useEffect, useState } from "react"
import "../builder-registry" // Import to register components

builder.init(import.meta.env.VITE_BUILDER_API_KEY)

export default function Page() {
  const [content, setContent] = useState<any>(null)

  useEffect(() => {
    builder
      .get("page", { url: window.location.pathname })
      .toPromise()
      .then(res => setContent(res))
  }, [])

  return (
    <div>
      {content ? (
        <BuilderComponent model="page" content={content} />
      ) : (
        <p>Loading Builder content...</p>
      )}
    </div>
  )
}
