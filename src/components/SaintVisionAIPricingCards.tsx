import React from 'react'

const plans = [
  {
    title: 'Free Trial',
    price: '$0',
    features: ['GPT Chat', '2 messages', 'Basic UI'],
    button: 'Get Started',
    link: '/'
  },
  {
    title: 'Pro',
    price: '$27/mo',
    features: ['Unlimited Chat', 'Save History', 'Companion Mode'],
    button: 'Upgrade to Pro',
    link: import.meta.env.VITE_STRIPE_PRO_PRICE_ID
  },
  {
    title: 'Enterprise',
    price: '$497/mo',
    features: ['CRM Tools', 'Admin Console', 'Webhook Automations'],
    button: 'Join Enterprise',
    link: import.meta.env.VITE_STRIPE_ENTERPRISE_PRICE_ID
  }
]

export default function SaintVisionAIPricingCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white p-6 bg-black">
      {plans.map((plan) => (
        <div key={plan.title} className="border border-yellow-500 p-6 rounded-xl bg-[#10161C] shadow-md">
          <h2 className="text-xl font-bold text-yellow-400">{plan.title}</h2>
          <p className="text-3xl my-4">{plan.price}</p>
          <ul className="space-y-2 mb-6">
            {plan.features.map((feature, i) => (
              <li key={i}>✅ {feature}</li>
            ))}
          </ul>
          <a href={plan.link} target="_blank" rel="noopener noreferrer">
            <button className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400">
              {plan.button}
            </button>
          </a>
        </div>
      ))}
    </div>
  )
}
