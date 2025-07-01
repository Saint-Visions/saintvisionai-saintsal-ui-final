"use client"

import { Brand } from "@/components/ui/brand"

export default function TestLogin() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="w-full max-w-md space-y-8 px-8">
        <div className="text-center">
          <Brand />
          <h2 className="mt-6 text-3xl font-bold text-white">
            Welcome to SaintSal™
          </h2>
          <p className="mt-2 text-gray-400">
            Sign in to access your AI assistant
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="mt-1 w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:border-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500"
              placeholder="••••••••"
            />
          </div>

          <button className="w-full rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 px-4 py-2 font-bold text-black transition-all duration-300 hover:from-yellow-400 hover:to-yellow-500">
            🔥 Start Cookin
          </button>
        </div>
      </div>
    </div>
  )
}
