import React from "react"

interface PricingPlan {
  title: string
  price: string
  features: string[]
  button: string
  link: string
}

interface SaintVisionAIPricingCardsProps {
  plans?: PricingPlan[]
  backgroundColor?: string
  borderColor?: string
  titleColor?: string
  buttonColor?: string
  buttonTextColor?: string
}

const defaultPlans = [
  {
    title: "Free Trial",
    price: "$0",
    features: ["GPT Chat", "2 messages", "Basic UI"],
    button: "Get Started",
    link: "/"
  },
  {
    title: "Pro",
    price: "$27/mo",
    features: ["Unlimited Chat", "Save History", "Companion Mode"],
    button: "Upgrade to Pro",
    link: import.meta.env.VITE_STRIPE_PRO_PRICE_ID || "#"
  },
  {
    title: "Enterprise",
    price: "$497/mo",
    features: ["CRM Tools", "Admin Console", "Webhook Automations"],
    button: "Join Enterprise",
    link: import.meta.env.VITE_STRIPE_ENTERPRISE_PRICE_ID || "#"
  }
]

export function SaintVisionAIPricingCards(
  props: SaintVisionAIPricingCardsProps
) {
  const {
    plans = defaultPlans,
    backgroundColor = "black",
    borderColor = "yellow-500",
    titleColor = "yellow-400",
    buttonColor = "yellow-500",
    buttonTextColor = "black"
  } = props
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-3 gap-6 text-white p-6 bg-${backgroundColor}`}
    >
      {plans.map(plan => (
        <div
          key={plan.title}
          className={`border border-${borderColor} p-6 rounded-xl bg-[#10161C] shadow-md`}
        >
          <h2 className={`text-xl font-bold text-${titleColor}`}>
            {plan.title}
          </h2>
          <p className="text-3xl my-4">{plan.price}</p>
          <ul className="space-y-2 mb-6">
            {plan.features.map((feature, i) => (
              <li key={i}>✅ {feature}</li>
            ))}
          </ul>
          <a href={plan.link} target="_blank" rel="noopener noreferrer">
            <button
              className={`bg-${buttonColor} text-${buttonTextColor} px-4 py-2 rounded hover:opacity-80`}
            >
              {plan.button}
            </button>
          </a>
        </div>
      ))}
    </div>
  )
}

export default SaintVisionAIPricingCards
