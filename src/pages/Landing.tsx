import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export default function Landing() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  const slides = [
    {
      title: "REVOLUTIONIZE YOUR BUSINESS",
      subtitle: "WITH AI-POWERED INTELLIGENCE",
      description:
        "Transform your operations with cutting-edge AI technology designed for modern enterprises.",
      cta: "Start Your Empire",
      ctaLink: "/get-started"
    },
    {
      title: "UNLIMITED SCALE",
      subtitle: "INFINITE POSSIBILITIES",
      description:
        "Build, deploy, and scale AI solutions that grow with your ambitions.",
      cta: "Explore Solutions",
      ctaLink: "/solutions"
    },
    {
      title: "DOMINATE YOUR MARKET",
      subtitle: "WITH SAINTSAL™ EMPIRE",
      description:
        "Join thousands of businesses already transforming their industry with our platform.",
      cta: "Join the Empire",
      ctaLink: "/signup"
    }
  ]

  useEffect(() => {
    setIsLoaded(true)
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-yellow-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <span className="text-black font-black text-xl">SV</span>
              </div>
              <div>
                <div className="text-xl font-black text-yellow-400">
                  SAINTSAL™
                </div>
                <div className="text-xs text-gray-400 -mt-1">EMPIRE</div>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/solutions"
                className="text-gray-300 hover:text-yellow-400 transition-colors"
              >
                Solutions
              </Link>
              <Link
                to="/pricing"
                className="text-gray-300 hover:text-yellow-400 transition-colors"
              >
                Pricing
              </Link>
              <Link
                to="/about"
                className="text-gray-300 hover:text-yellow-400 transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-300 hover:text-yellow-400 transition-colors"
              >
                Contact
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/signin"
                className="text-gray-300 hover:text-yellow-400 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-6 py-2 rounded-lg font-bold hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10"></div>

        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-yellow-500/5"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-yellow-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className={`transform transition-all duration-1000 ${isLoaded ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
            >
              <div className="mb-6">
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2 rounded-full text-sm font-bold">
                  🚀 REVOLUTIONARY AI PLATFORM
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                  {slides[currentSlide].title}
                </span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                  {slides[currentSlide].subtitle}
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                {slides[currentSlide].description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={slides[currentSlide].ctaLink}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-4 rounded-lg font-bold text-lg hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105 text-center"
                >
                  {slides[currentSlide].cta} →
                </Link>
                <Link
                  to="/demo"
                  className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 hover:text-black transition-all text-center"
                >
                  Watch Demo
                </Link>
              </div>

              {/* Slide Indicators */}
              <div className="flex space-x-2 mt-8">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentSlide ? "bg-yellow-400" : "bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div
              className={`transform transition-all duration-1000 delay-500 ${isLoaded ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-3xl blur-xl"></div>
                <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 p-8 rounded-3xl border border-yellow-500/30 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="text-6xl mb-6">🧠</div>
                    <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                      AI-Powered Intelligence
                    </h3>
                    <p className="text-gray-300 mb-6">
                      Experience the future of business automation with our
                      advanced AI ecosystem.
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-black/50 rounded-lg">
                        <span className="text-gray-300">Performance</span>
                        <div className="flex items-center">
                          <div className="w-24 h-2 bg-gray-700 rounded-full mr-3">
                            <div className="w-20 h-2 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full"></div>
                          </div>
                          <span className="text-yellow-400 font-bold">98%</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-black/50 rounded-lg">
                        <span className="text-gray-300">Efficiency</span>
                        <div className="flex items-center">
                          <div className="w-24 h-2 bg-gray-700 rounded-full mr-3">
                            <div className="w-22 h-2 bg-gradient-to-r from-blue-400 to-yellow-400 rounded-full"></div>
                          </div>
                          <span className="text-yellow-400 font-bold">95%</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-black/50 rounded-lg">
                        <span className="text-gray-300">Reliability</span>
                        <div className="flex items-center">
                          <div className="w-24 h-2 bg-gray-700 rounded-full mr-3">
                            <div className="w-full h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
                          </div>
                          <span className="text-yellow-400 font-bold">
                            99.9%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                UNLEASH THE POWER OF
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                ARTIFICIAL INTELLIGENCE
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transform your business operations with our comprehensive AI
              platform designed for the modern enterprise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🚀",
                title: "Lightning Fast",
                description:
                  "Deploy AI solutions in minutes, not months. Our platform accelerates your time to market."
              },
              {
                icon: "🧠",
                title: "Intelligent Automation",
                description:
                  "Automate complex workflows with AI that learns and adapts to your business needs."
              },
              {
                icon: "📈",
                title: "Scalable Growth",
                description:
                  "Grow without limits. Our infrastructure scales automatically with your success."
              },
              {
                icon: "🛡️",
                title: "Enterprise Security",
                description:
                  "Bank-level security ensures your data and operations remain protected at all times."
              },
              {
                icon: "🔗",
                title: "Seamless Integration",
                description:
                  "Connect with your existing tools and systems through our comprehensive API ecosystem."
              },
              {
                icon: "💡",
                title: "Advanced Analytics",
                description:
                  "Gain deep insights with real-time analytics and predictive intelligence capabilities."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative p-6 bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl border border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-300 transform hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-yellow-400 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
              READY TO BUILD YOUR
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              AI EMPIRE?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of businesses already transforming their operations
            with SAINTSAL™ Empire.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-4 rounded-lg font-bold text-lg hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105"
            >
              Start Building Today →
            </Link>
            <Link
              to="/contact"
              className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 hover:text-black transition-all"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-yellow-500/20 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                  <span className="text-black font-black text-xl">SV</span>
                </div>
                <div>
                  <div className="text-xl font-black text-yellow-400">
                    SAINTSAL™
                  </div>
                  <div className="text-xs text-gray-400 -mt-1">EMPIRE</div>
                </div>
              </div>
              <p className="text-gray-400">
                Building the future of AI-powered business intelligence.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/solutions"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    Solutions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/features"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    Features
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/help"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/docs"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    to="/api"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    API
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 SAINTSAL™ Empire. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
