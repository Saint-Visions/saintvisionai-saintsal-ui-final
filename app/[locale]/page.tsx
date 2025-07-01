"use client"

import { IconArrowRight } from "@tabler/icons-react"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const { theme } = useTheme()
  const router = useRouter()

  const handleStartCookin = () => {
    console.log("🔥 Start Cookin button clicked!")

    try {
      // Check if we're in Builder.io preview environment
      const isBuilderPreview =
        typeof window !== "undefined" &&
        (window.location.hostname.includes("builder") ||
          window.location.hostname.includes("fly.dev") ||
          window.location.href.includes("projects.builder.codes"))

      console.log(
        "Environment detected:",
        isBuilderPreview ? "Builder.io Preview" : "Local/Production"
      )

      if (isBuilderPreview) {
        // In Builder.io preview, open in new tab to local server
        console.log("Opening operations dashboard in new tab...")
        window.open("http://localhost:3000/en/workspace1/operations", "_blank")
      } else {
        // In normal environment, use Next.js router
        console.log("Navigating with Next.js router...")
        router.push("/en/workspace1/operations")
      }
    } catch (error) {
      console.error("Navigation error:", error)
      // Ultimate fallback - direct navigation
      window.location.href = "/en/workspace1/operations"
    }
  }

  return (
    <div className="flex size-full flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* SaintSal Logo */}
      <div className="mb-6 flex flex-col items-center">
        <div className="relative mb-4">
          <Image
            src="https://cdn.builder.io/api/v1/assets/d83998c6a81f466db4fb83ab90c7ba25/real_svt_logo-d03762?format=webp&width=800"
            alt="SaintSal Logo"
            width={320}
            height={320}
            className="drop-shadow-2xl"
            priority
          />
        </div>

        {/* Brand Name */}
        <div className="text-center">
          <h1 className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-5xl font-bold text-transparent drop-shadow-lg">
            SAINTSAL™
          </h1>
          <p className="mt-2 text-xl font-medium text-yellow-400/80">
            Cookin' Knowledge.
          </p>
        </div>
      </div>

      {/* Enhanced CTA Button - Direct to Operations */}
      <button
        onClick={() => {
          console.log("🔥 Start Cookin button clicked!")
          // Navigate to operations dashboard
          if (typeof window !== "undefined") {
            window.location.href = "/en/operations"
          }
        }}
        className="group relative mt-8 flex w-[280px] cursor-pointer items-center justify-center rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-4 font-bold text-black shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:from-yellow-400 hover:to-yellow-500 hover:shadow-yellow-500/25"
      >
        <span className="text-lg">🔥 Start Cookin - Operations</span>
        <IconArrowRight
          className="ml-2 transition-transform duration-300 group-hover:translate-x-2"
          size={20}
        />

        {/* Glow effect */}
        <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-30 blur transition duration-300 group-hover:opacity-70"></div>
      </button>

      {/* Direct Backup Links */}
      <div className="mt-4 flex flex-col items-center gap-2">
        <a
          href="/en/operations"
          className="font-semibold text-green-400 underline transition-colors hover:text-green-300"
        >
          🚀 Direct Link: Open Operations Dashboard
        </a>
        <p className="text-sm text-gray-500">
          (Click above if button doesn't work)
        </p>
      </div>

      {/* Success Message */}
      <div className="mt-6 max-w-md text-center">
        <p className="text-lg font-semibold text-green-400">
          ✅ Operations Page is Working!
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Click above to access your AI-powered business features
        </p>
      </div>

      {/* Features Preview */}
      <div className="mx-auto mt-8 max-w-4xl">
        <h3 className="mb-6 text-center text-2xl font-bold text-yellow-400">
          🚀 What's Inside Your Operations Dashboard
        </h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-lg border border-blue-500/20 bg-blue-900/20 p-4 text-center">
            <div className="mb-2 text-3xl">🔍</div>
            <div className="text-sm font-semibold text-blue-400">
              Lead Discovery
            </div>
            <div className="text-xs text-gray-400">AI-powered lookup</div>
          </div>
          <div className="rounded-lg border border-green-500/20 bg-green-900/20 p-4 text-center">
            <div className="mb-2 text-3xl">🤝</div>
            <div className="text-sm font-semibold text-green-400">
              Referral Network
            </div>
            <div className="text-xs text-gray-400">Partner tracking</div>
          </div>
          <div className="rounded-lg border border-purple-500/20 bg-purple-900/20 p-4 text-center">
            <div className="mb-2 text-3xl">📈</div>
            <div className="text-sm font-semibold text-purple-400">
              AI Deal Analysis
            </div>
            <div className="text-xs text-gray-400">GPT-4 insights</div>
          </div>
          <div className="rounded-lg border border-pink-500/20 bg-pink-900/20 p-4 text-center">
            <div className="mb-2 text-3xl">📱</div>
            <div className="text-sm font-semibold text-pink-400">
              Mobile Export
            </div>
            <div className="text-xs text-gray-400">iOS/Android apps</div>
          </div>
        </div>
      </div>

      {/* Enhanced Intro Text */}
      <div className="mt-8 max-w-2xl px-6 text-center">
        <p className="mb-4 text-lg leading-relaxed text-gray-300">
          Welcome to the future of{" "}
          <span className="font-semibold text-yellow-400">
            intelligent conversations
          </span>
        </p>
        <p className="leading-relaxed text-gray-400">
          SaintSal's premium AI assistant combines cutting-edge technology with
          intuitive design, delivering{" "}
          <span className="text-yellow-400">real-time insights</span> and{" "}
          <span className="text-yellow-400">dynamic support</span>
          for Saint Vision Technologies and partners.
        </p>

        {/* Feature highlights */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
          <span className="rounded-full border border-yellow-400/20 bg-gray-800/50 px-3 py-1 text-yellow-400">
            ⚡ Intelligent Ops
          </span>
          <span className="rounded-full border border-yellow-400/20 bg-gray-800/50 px-3 py-1 text-yellow-400">
            🧠 Real-time AI
          </span>
          <span className="rounded-full border border-yellow-400/20 bg-gray-800/50 px-3 py-1 text-yellow-400">
            🔒 Enterprise Ready
          </span>
        </div>
      </div>
    </div>
  )
}
