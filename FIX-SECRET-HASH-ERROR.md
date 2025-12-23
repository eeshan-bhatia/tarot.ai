# Fix: "Client is configured with secret but SECRET_HASH was not received"

## What This Error Means

This error occurs when your AWS Cognito App Client was created **with a client secret**, but your application is trying to authenticate **without providing the secret hash**.

## Why This Happens

When you create a Cognito App Client, AWS gives you the option to generate a client secret. However:

- ✅ **Client secrets are for server-side applications** (like backend APIs)
- ❌ **Client secrets should NOT be used for client-side web applications** because:
  - The secret would be exposed in your JavaScript code
  - Anyone could view it in the browser
  - It's a security risk

## Solution: Create a New App Client Without a Secret

You need to create a **new App Client without a client secret** for your web application.

### Step 1: Delete or Keep the Old App Client

You can either:
- **Delete the old App Client** (if you're not using it)
- **Keep it** (if you might use it for server-side authentication later)

### Step 2: Create a New App Client

1. Go to [AWS Cognito Console](https://console.aws.amazon.com/cognito/)
2. Select your User Pool
3. Go to the **"App integration"** tab
4. Scroll to **"App clients"** section
5. Click **"Create app client"**

### Step 3: Configure the New App Client

1. **App client name**: Enter a name (e.g., "tarot-ai-web-client")
2. **Client secret**: ⚠️ **DO NOT check this box** - Leave it unchecked!
3. **Auth flows configuration**:
   - ✅ Enable "ALLOW_USER_PASSWORD_AUTH"
   - ✅ Enable "ALLOW_USER_SRP_AUTH"
4. Click **"Create app client"**

### Step 4: Update Your Environment Variables

Use the **new App Client ID** (the one without a secret):

```bash
NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID=your_new_app_client_id_without_secret
```

### Step 5: Restart Your Application

```bash
# Stop your dev server (Ctrl+C)
npm run dev
```

## How to Identify App Clients With/Without Secrets

In the Cognito Console:
- App clients **with secrets** show: "Client secret: Yes"
- App clients **without secrets** show: "Client secret: No"

## Alternative: If You Must Use a Client Secret

⚠️ **Not recommended for web applications!**

If you absolutely must use a client secret (e.g., for a server-side API), you would need to:

1. Store the secret securely (never in client-side code)
2. Calculate SECRET_HASH using HMAC-SHA256
3. Include it in every authentication request

However, for Next.js client-side authentication, **this is not recommended**.

## Verification

After creating the new App Client without a secret:

1. Try signing up a new user
2. Try signing in
3. The error should be gone!

## Summary

- ❌ **Old App Client**: Has a client secret → Causes the error
- ✅ **New App Client**: No client secret → Works perfectly for web apps

The key is: **For client-side web applications, always create App Clients WITHOUT a client secret.**

