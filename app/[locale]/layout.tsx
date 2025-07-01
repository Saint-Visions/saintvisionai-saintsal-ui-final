import { Toaster } from "@/components/ui/sonner"
import { GlobalState } from "@/components/utility/global-state"
import { Providers } from "@/components/utility/providers"
import TranslationsProvider from "@/components/utility/translations-provider"
import initTranslations from "@/lib/i18n"
import { Database } from "@/supabase/types"
import { createServerClient } from "@supabase/ssr"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { cookies } from "next/headers"
import { ReactNode } from "react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const APP_NAME = "SaintSal™"
const APP_DEFAULT_TITLE = "SaintSal™ — Cookin' Knowledge"
const APP_TITLE_TEMPLATE = "%s - SaintSal™"
const APP_DESCRIPTION =
  "The embedded AI system for dynamic support, intelligent ops, and real-time insights — built for Saint Vision Technologies and partners."

interface RootLayoutProps {
  children: ReactNode
  params: {
    locale: string
  }
}

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  icons: {
    icon: [
      {
        url: "https://cdn.builder.io/api/v1/assets/d83998c6a81f466db4fb83ab90c7ba25/favicon-192x192-5218fa?format=webp&width=192",
        sizes: "192x192",
        type: "image/webp"
      },
      {
        url: "https://cdn.builder.io/api/v1/assets/d83998c6a81f466db4fb83ab90c7ba25/favicon-512x512-0722ac?format=webp&width=512",
        sizes: "512x512",
        type: "image/webp"
      }
    ],
    apple: {
      url: "https://cdn.builder.io/api/v1/assets/d83998c6a81f466db4fb83ab90c7ba25/favicon-256x256-8484bf?format=webp&width=256",
      sizes: "256x256",
      type: "image/webp"
    }
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: APP_DEFAULT_TITLE
  },
  formatDetection: {
    telephone: false
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION,
    images: [
      {
        url: "https://cdn.builder.io/api/v1/assets/d83998c6a81f466db4fb83ab90c7ba25/real_svt_logo-d03762?format=webp&width=800",
        width: 800,
        height: 800,
        alt: "SaintSal™ - Cookin' Knowledge"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION,
    images: [
      "https://cdn.builder.io/api/v1/assets/d83998c6a81f466db4fb83ab90c7ba25/real_svt_logo-d03762?format=webp&width=800"
    ]
  }
}

export const viewport: Viewport = {
  themeColor: "#D4AF37"
}

const i18nNamespaces = ["translation"]

export default async function RootLayout({
  children,
  params: { locale }
}: RootLayoutProps) {
  const cookieStore = cookies()
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        }
      }
    }
  )
  const session = (await supabase.auth.getSession()).data.session

  const { t, resources } = await initTranslations(locale, i18nNamespaces)

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers attribute="class" defaultTheme="dark">
          <TranslationsProvider
            namespaces={i18nNamespaces}
            locale={locale}
            resources={resources}
          >
            <Toaster richColors position="top-center" duration={3000} />
            <div className="bg-background text-foreground flex h-dvh flex-col items-center overflow-x-auto">
              {session ? <GlobalState>{children}</GlobalState> : children}
            </div>
            <SpeedInsights />
          </TranslationsProvider>
        </Providers>
      </body>
    </html>
  )
}
