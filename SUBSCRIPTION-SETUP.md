# Subscription System Setup Guide

This guide will help you set up the three-tier subscription system for Tarot.ai.

## Subscription Tiers

1. **Free Tier** - 5 tarot readings per month
   - Perfect for casual users exploring tarot
   - Basic card interpretations
   - Question-based and general readings

2. **Basic Tier** - $5/month - Unlimited readings
   - For frequent users who want unlimited access
   - All reading types
   - Save your readings
   - Reading history

3. **Premium Tier** - $10/month - Unlimited readings + Educational features
   - For enthusiasts and aspiring tarot readers
   - Everything in Basic
   - Card library with detailed meanings
   - Interactive flashcards
   - Educational resources
   - Advanced interpretations

## Setup Steps

### 1. Configure Cognito Custom Attributes

You need to add custom attributes to your Cognito User Pool to track subscriptions:

1. Go to AWS Cognito Console → Your User Pool
2. Navigate to **"Attributes"** tab
3. Click **"Add custom attribute"**
4. Add the following custom attributes (all as String type, Mutable: Yes):
   - `subscription_tier` - Stores the subscription tier (free, basic, premium)
   - `readings_used` - Tracks number of readings used this period
   - `subscription_period_start` - Start date of current subscription period
   - `subscription_period_end` - End date of current subscription period

### 2. Set Up Stripe

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from Stripe Dashboard → Developers → API keys
3. Create products and prices in Stripe:
   - **Basic Plan**: $5/month recurring
   - **Premium Plan**: $10/month recurring
4. Note the Price IDs for each plan

### 3. Configure Environment Variables

Add these to your `.env.local` file (for local development):

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_BASIC_PRICE_ID=price_...
STRIPE_PREMIUM_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App URL (for Stripe redirects)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

For production (AWS Amplify), add these in the Amplify Console → Environment variables.

### 4. Set Up Stripe Webhook

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click **"Add endpoint"**
3. **Choose "Webhook endpoint"** (NOT Amazon EventBridge - that's for more complex enterprise setups)
4. Enter your webhook URL: `https://your-domain.com/api/subscription/webhook`
   - For production: `https://your-amplify-domain.amplifyapp.com/api/subscription/webhook`
   - For local testing: Use Stripe CLI (see below)
5. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
6. Copy the webhook signing secret (starts with `whsec_`) and add it to your environment variables as `STRIPE_WEBHOOK_SECRET`

**Note**: For local development, use Stripe CLI to forward webhooks:
```bash
stripe listen --forward-to localhost:3000/api/subscription/webhook
```
This will give you a webhook secret for local testing.

### 5. Test the Subscription Flow

1. **Free Tier**: New users automatically get free tier with 5 readings
2. **Upgrade Flow**:
   - User goes to `/subscription` page
   - Clicks "Upgrade" on Basic or Premium plan
   - Redirected to Stripe Checkout
   - After payment, redirected to success page
   - Webhook updates user's subscription tier in Cognito

## How It Works

### Reading Limits

- Free tier users: Limited to 5 readings per month
- Basic/Premium users: Unlimited readings
- Reading count resets monthly based on `subscription_period_end`

### Subscription Tracking

- Subscription tier stored in Cognito custom attribute: `custom:subscription_tier`
- Reading count stored in: `custom:readings_used`
- Period dates stored in: `custom:subscription_period_start` and `custom:subscription_period_end`

### Educational Features

- **Card Library** (`/library`): Available only to Premium users
- **Flashcards** (`/flashcards`): Available only to Premium users
- Both features check subscription tier and show upgrade prompt if not Premium

## API Routes

- `/api/subscription/checkout` - Creates Stripe Checkout session
- `/api/subscription/update` - Updates subscription tier (for downgrades)
- `/api/subscription/webhook` - Handles Stripe webhook events

## Pages

- `/subscription` - Subscription management and upgrade page
- `/subscription/success` - Success page after Stripe checkout
- `/library` - Card library (Premium only)
- `/flashcards` - Interactive flashcards (Premium only)

## Troubleshooting

### "Custom attribute not found" error

- Make sure you've added the custom attributes to your Cognito User Pool
- Attributes must be named exactly: `subscription_tier`, `readings_used`, `subscription_period_start`, `subscription_period_end`
- All attributes must be String type and Mutable

### Stripe checkout not working

- Verify your Stripe API keys are correct
- Check that Price IDs match your Stripe products
- Ensure `NEXT_PUBLIC_APP_URL` is set correctly

### Webhook not updating subscriptions

- Verify webhook URL is accessible
- Check webhook secret is correct
- Ensure webhook events are selected in Stripe Dashboard
- Check CloudWatch logs for webhook errors

### Reading count not resetting

- Check that `subscription_period_end` is set correctly
- Verify the date comparison logic in SubscriptionContext

## Security Notes

- Never expose Stripe secret key in client-side code
- Always verify webhook signatures
- Use environment variables for all sensitive keys
- Test with Stripe test mode before going live

