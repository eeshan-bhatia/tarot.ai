import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-11-20.acacia',
})

export async function POST(request: NextRequest) {
  try {
    // Get authorization header
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('No authorization header found')
      return NextResponse.json({ error: 'Unauthorized - No token provided' }, { status: 401 })
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    if (!token || token.trim() === '') {
      console.error('Empty token provided')
      return NextResponse.json({ error: 'Unauthorized - Empty token' }, { status: 401 })
    }

    // Decode JWT token (Cognito tokens are base64 encoded)
    let payload: any
    try {
      // JWT format: header.payload.signature
      const parts = token.split('.')
      if (parts.length !== 3) {
        throw new Error('Invalid token format - expected 3 parts, got ' + parts.length)
      }
      
      // Decode the payload (second part)
      const payloadBase64 = parts[1]
      // Add padding if needed
      const padded = payloadBase64 + '='.repeat((4 - payloadBase64.length % 4) % 4)
      const payloadJson = Buffer.from(padded, 'base64').toString('utf-8')
      payload = JSON.parse(payloadJson)
      
      console.log('Token decoded successfully, user:', payload.sub || payload.username)
    } catch (error: any) {
      console.error('Token decode error:', error.message || error)
      return NextResponse.json({ 
        error: 'Unauthorized - Invalid token', 
        details: error.message 
      }, { status: 401 })
    }

    const { tier } = await request.json()

    if (!tier || !['basic', 'premium'].includes(tier)) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
    }

    // Get user email from token
    const userEmail = payload.email || payload['cognito:username']

    // Get price ID from environment variables
    const priceId =
      tier === 'basic'
        ? process.env.STRIPE_BASIC_PRICE_ID
        : process.env.STRIPE_PREMIUM_PRICE_ID

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID not configured' }, { status: 500 })
    }

    // Create Stripe Checkout Session
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: userEmail,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/subscription`,
      metadata: {
        userId: payload.sub || payload.username,
        tier,
      },
    })

    return NextResponse.json({ 
      sessionId: checkoutSession.id,
      url: checkoutSession.url 
    })
  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json({ error: error.message || 'Failed to create checkout session' }, { status: 500 })
  }
}

