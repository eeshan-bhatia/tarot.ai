import { NextRequest, NextResponse } from 'next/server'
import { fetchAuthSession } from 'aws-amplify/auth'
import { updateUserAttribute } from 'aws-amplify/auth'

export async function POST(request: NextRequest) {
  try {
    // Verify user is authenticated
    const session = await fetchAuthSession()
    if (!session.tokens?.accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { tier } = await request.json()

    if (!tier || !['free', 'basic', 'premium'].includes(tier)) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
    }

    // Update subscription tier in Cognito
    await updateUserAttribute({
      userAttribute: {
        attributeKey: 'custom:subscription_tier',
        value: tier,
      },
    })

    // Reset readings count if upgrading
    if (tier !== 'free') {
      await updateUserAttribute({
        userAttribute: {
          attributeKey: 'custom:readings_used',
          value: '0',
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Subscription update error:', error)
    return NextResponse.json({ error: error.message || 'Failed to update subscription' }, { status: 500 })
  }
}

