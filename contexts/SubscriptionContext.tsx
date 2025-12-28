'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useAuth } from './AuthContext'
import { fetchUserAttributes, updateUserAttribute } from 'aws-amplify/auth'
import type { UserSubscription, SubscriptionTier } from '@/types/subscription'
import { SUBSCRIPTION_PLANS } from '@/types/subscription'

interface SubscriptionContextType {
  subscription: UserSubscription | null
  isLoading: boolean
  canDoReading: () => boolean
  incrementReadingCount: () => Promise<void>
  updateSubscription: (tier: SubscriptionTier) => Promise<void>
  refreshSubscription: () => Promise<void>
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined)

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth()
  const [subscription, setSubscription] = useState<UserSubscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const loadSubscription = async () => {
    if (!isAuthenticated || !user) {
      setSubscription(null)
      setIsLoading(false)
      return
    }

    try {
      const attributes = await fetchUserAttributes()
      
      // Get subscription tier from user attributes (stored as custom attribute or in metadata)
      const tier = (attributes['custom:subscription_tier'] as SubscriptionTier) || 'free'
      const readingsUsed = parseInt(attributes['custom:readings_used'] || '0', 10)
      const periodStart = attributes['custom:subscription_period_start']
        ? new Date(attributes['custom:subscription_period_start'])
        : null
      const periodEnd = attributes['custom:subscription_period_end']
        ? new Date(attributes['custom:subscription_period_end'])
        : null

      const plan = SUBSCRIPTION_PLANS[tier]
      
      // Reset readings if period has ended (monthly reset)
      let actualReadingsUsed = readingsUsed
      if (periodEnd && new Date() > periodEnd) {
        actualReadingsUsed = 0
        // Reset the count
        await updateUserAttribute({
          userAttribute: {
            attributeKey: 'custom:readings_used',
            value: '0',
          },
        })
        // Update period
        const newPeriodStart = new Date()
        const newPeriodEnd = new Date()
        newPeriodEnd.setMonth(newPeriodEnd.getMonth() + 1)
        await updateUserAttribute({
          userAttribute: {
            attributeKey: 'custom:subscription_period_start',
            value: newPeriodStart.toISOString(),
          },
        })
        await updateUserAttribute({
          userAttribute: {
            attributeKey: 'custom:subscription_period_end',
            value: newPeriodEnd.toISOString(),
          },
        })
      } else if (!periodStart) {
        // Initialize period for new users
        const newPeriodStart = new Date()
        const newPeriodEnd = new Date()
        newPeriodEnd.setMonth(newPeriodEnd.getMonth() + 1)
        await updateUserAttribute({
          userAttribute: {
            attributeKey: 'custom:subscription_period_start',
            value: newPeriodStart.toISOString(),
          },
        })
        await updateUserAttribute({
          userAttribute: {
            attributeKey: 'custom:subscription_period_end',
            value: newPeriodEnd.toISOString(),
          },
        })
      }

      setSubscription({
        tier,
        readingsUsed: actualReadingsUsed,
        readingsLimit: plan.readingsLimit,
        periodStart: periodStart || new Date(),
        periodEnd: periodEnd || (() => {
          const end = new Date()
          end.setMonth(end.getMonth() + 1)
          return end
        })(),
        status: 'active',
      })
    } catch (error) {
      console.error('Error loading subscription:', error)
      // Default to free tier on error
      setSubscription({
        tier: 'free',
        readingsUsed: 0,
        readingsLimit: SUBSCRIPTION_PLANS.free.readingsLimit,
        periodStart: new Date(),
        periodEnd: (() => {
          const end = new Date()
          end.setMonth(end.getMonth() + 1)
          return end
        })(),
        status: 'active',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadSubscription()
    } else {
      setSubscription(null)
      setIsLoading(false)
    }
  }, [isAuthenticated, user])

  const canDoReading = (): boolean => {
    if (!subscription) return false
    if (subscription.readingsLimit === null) return true // unlimited
    return subscription.readingsUsed < subscription.readingsLimit
  }

  const incrementReadingCount = async (): Promise<void> => {
    if (!subscription || !isAuthenticated) return

    const newCount = subscription.readingsUsed + 1
    
    try {
      await updateUserAttribute({
        userAttribute: {
          attributeKey: 'custom:readings_used',
          value: newCount.toString(),
        },
      })
      
      setSubscription({
        ...subscription,
        readingsUsed: newCount,
      })
    } catch (error) {
      console.error('Error incrementing reading count:', error)
    }
  }

  const updateSubscription = async (tier: SubscriptionTier): Promise<void> => {
    if (!isAuthenticated) return

    try {
      await updateUserAttribute({
        userAttribute: {
          attributeKey: 'custom:subscription_tier',
          value: tier,
        },
      })
      
      const plan = SUBSCRIPTION_PLANS[tier]
      setSubscription({
        ...subscription!,
        tier,
        readingsLimit: plan.readingsLimit,
        readingsUsed: tier === 'free' ? subscription?.readingsUsed || 0 : 0, // Reset on upgrade
      })
    } catch (error) {
      console.error('Error updating subscription:', error)
      throw error
    }
  }

  const refreshSubscription = async (): Promise<void> => {
    await loadSubscription()
  }

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        isLoading,
        canDoReading,
        incrementReadingCount,
        updateSubscription,
        refreshSubscription,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscription() {
  const context = useContext(SubscriptionContext)
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider')
  }
  return context
}


