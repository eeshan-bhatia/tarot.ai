export type SubscriptionTier = 'free' | 'basic' | 'premium'

export interface SubscriptionPlan {
  id: SubscriptionTier
  name: string
  price: number
  priceId?: string // Stripe price ID
  readingsLimit: number | null // null = unlimited
  features: string[]
  description: string
}

export const SUBSCRIPTION_PLANS: Record<SubscriptionTier, SubscriptionPlan> = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    readingsLimit: 5,
    features: [
      '5 tarot readings per month',
      'Basic card interpretations',
      'Question-based readings',
      'General readings',
    ],
    description: 'Perfect for casual users exploring tarot',
  },
  basic: {
    id: 'basic',
    name: 'Basic',
    price: 5,
    priceId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID || '',
    readingsLimit: null, // unlimited
    features: [
      'Unlimited tarot readings',
      'All reading types',
      'Save your readings',
      'Reading history',
    ],
    description: 'For frequent users who want unlimited access',
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    price: 10,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID || '',
    readingsLimit: null, // unlimited
    features: [
      'Unlimited tarot readings',
      'All reading types',
      'Save your readings',
      'Reading history',
      'Card library with detailed meanings',
      'Interactive flashcards',
      'Educational resources',
      'Advanced interpretations',
    ],
    description: 'For enthusiasts and aspiring tarot readers',
  },
}

export interface UserSubscription {
  tier: SubscriptionTier
  readingsUsed: number
  readingsLimit: number | null
  periodStart: Date | null
  periodEnd: Date | null
  stripeCustomerId?: string
  stripeSubscriptionId?: string
  status: 'active' | 'canceled' | 'past_due' | 'trialing'
}


