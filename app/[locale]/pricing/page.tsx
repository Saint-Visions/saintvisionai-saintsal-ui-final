import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PricingCards } from "@/components/ui/pricing-cards"
import { ArrowRight, Users, Zap, Shield } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing - SaintSal™ | Plans for Every Operator",
  description:
    "Choose the perfect SaintSal™ plan for your business. From startup to enterprise, we have AI-powered solutions that grow with you."
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-purple-500/10"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 text-center">
          <h1 className="mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
            Plans for Every Operator
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-300 md:text-2xl">
            Whether you're starting or scaling — SaintSal™ grows with you.
          </p>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400">
            Transform your business with AI-powered lead discovery, intelligent
            deal analysis, and automated referral networks. Choose the plan that
            matches your ambition.
          </p>
        </div>
      </div>

      {/* Pricing Cards Section */}
      <div className="mx-auto max-w-7xl px-6 pb-16">
        <PricingCards />
      </div>

      {/* Features Comparison */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-12 text-center text-3xl font-bold text-white">
          Why Choose SaintSal™?
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card className="border border-blue-500/20 bg-gradient-to-br from-blue-900/50 to-blue-800/30">
            <CardContent className="p-6 text-center">
              <Users className="mx-auto mb-4 size-12 text-blue-400" />
              <h3 className="mb-3 text-xl font-semibold text-blue-400">
                AI-Powered Lead Discovery
              </h3>
              <p className="text-gray-300">
                Find and qualify high-value prospects with advanced AI that
                learns your ideal customer profile.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-purple-500/20 bg-gradient-to-br from-purple-900/50 to-purple-800/30">
            <CardContent className="p-6 text-center">
              <Zap className="mx-auto mb-4 size-12 text-purple-400" />
              <h3 className="mb-3 text-xl font-semibold text-purple-400">
                Intelligent Deal Analysis
              </h3>
              <p className="text-gray-300">
                Get GPT-4o powered insights on every deal, with predictive
                scoring and strategic recommendations.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-green-500/20 bg-gradient-to-br from-green-900/50 to-green-800/30">
            <CardContent className="p-6 text-center">
              <Shield className="mx-auto mb-4 size-12 text-green-400" />
              <h3 className="mb-3 text-xl font-semibold text-green-400">
                Enterprise Security
              </h3>
              <p className="text-gray-300">
                Bank-level security with SOC 2 compliance, GDPR ready, and full
                data encryption.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-t border-yellow-500/20 bg-gradient-to-r from-yellow-900/50 to-yellow-800/30">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-yellow-400">
            Ready to Transform Your Business?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-300">
            Join thousands of businesses already using SaintSal™ to accelerate
            their growth with AI-powered automation.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 px-8 py-4 font-semibold text-black transition-all duration-300 hover:scale-105 hover:from-yellow-400 hover:to-yellow-500"
            >
              <a href="/en/setup">
                Get Started Now
                <ArrowRight className="ml-2 size-5" />
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-gray-600 px-8 py-4 text-gray-300 hover:bg-gray-800"
            >
              <a href="/en/setup">Contact Sales</a>
            </Button>
          </div>

          <p className="mt-6 text-sm text-gray-400">
            No setup fees • Cancel anytime • 30-day money-back guarantee
          </p>
        </div>
      </div>

      {/* Social Proof */}
      <div className="border-t border-gray-700 bg-gradient-to-r from-gray-900 to-black">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <p className="mb-8 text-center text-gray-400">
            Trusted by innovative businesses worldwide
          </p>
          <div className="grid grid-cols-2 place-items-center gap-8 opacity-60 md:grid-cols-4">
            <div className="text-2xl font-bold text-gray-500">TechCorp</div>
            <div className="text-2xl font-bold text-gray-500">InnovateCo</div>
            <div className="text-2xl font-bold text-gray-500">FutureScale</div>
            <div className="text-2xl font-bold text-gray-500">GrowthLab</div>
          </div>
        </div>
      </div>
    </div>
  )
}
