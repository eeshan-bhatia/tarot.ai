import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { CognitoIdentityProviderClient, AdminUpdateUserAttributesCommand } from '@aws-sdk/client-cognito-identity-provider'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20.acacia',
})

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION || 'ap-southeast-2',
})

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    )
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const tier = session.metadata?.tier || 'basic'
        const userId = session.metadata?.userId

        if (userId && process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID) {
          // Update user's subscription tier in Cognito
          await cognitoClient.send(
            new AdminUpdateUserAttributesCommand({
              UserPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID,
              Username: userId,
              UserAttributes: [
                {
                  Name: 'custom:subscription_tier',
                  Value: tier,
                },
                {
                  Name: 'custom:readings_used',
                  Value: '0',
                },
              ],
            })
          )
        }
        break
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const userId = subscription.metadata?.userId

        if (userId && process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID) {
          const tier = subscription.status === 'active' ? subscription.metadata?.tier || 'basic' : 'free'

          await cognitoClient.send(
            new AdminUpdateUserAttributesCommand({
              UserPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID,
              Username: userId,
              UserAttributes: [
                {
                  Name: 'custom:subscription_tier',
                  Value: tier,
                },
              ],
            })
          )
        }
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Webhook processing error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}


