"use client"

import Link from "next/link"
import { FC } from "react"
import Image from "next/image"

interface BrandProps {
  theme?: "dark" | "light"
  compact?: boolean
}

export const Brand: FC<BrandProps> = ({ theme = "dark", compact = false }) => {
  return (
    <Link
      className="flex cursor-pointer flex-col items-center transition-opacity hover:opacity-80"
      href="/"
    >
      {compact ? (
        // Compact S logo for small spaces
        <div className="flex items-center space-x-3">
          <Image
            src="https://cdn.builder.io/api/v1/assets/d83998c6a81f466db4fb83ab90c7ba25/favicon-512x512-0722ac?format=webp&width=64"
            alt="SaintSal Logo"
            width={48}
            height={48}
            className="drop-shadow-lg"
          />
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-xl font-bold text-transparent">
            SaintSal™
          </div>
        </div>
      ) : (
        // Full side-by-side logo for login/main pages
        <div className="flex flex-col items-center">
          <Image
            src="https://cdn.builder.io/api/v1/assets/d83998c6a81f466db4fb83ab90c7ba25/sv.-cooking-knowledge-side-by-side-7f5577?format=webp&width=400"
            alt="SaintSal - Cookin' Knowledge"
            width={280}
            height={140}
            className="drop-shadow-xl"
            priority
          />
        </div>
      )}
    </Link>
  )
}
