# AWS Cognito Setup Guide

This guide will help you set up AWS Cognito for user authentication in your Tarot.ai application.

## Step 1: Create a Cognito User Pool

1. Go to the [AWS Cognito Console](https://console.aws.amazon.com/cognito/)
2. Click **"User pools"** in the left sidebar
3. Click **"Create user pool"**

### Configure Sign-in Experience

1. **Sign-in options**: Select "Email" (or "Email and username" if you prefer)
2. Click **"Next"**

### Configure Security Requirements

1. **Password policy**: 
   - Minimum length: 8 characters (recommended)
   - You can customize other requirements as needed
2. **Multi-factor authentication**: Optional (can be enabled later)
3. Click **"Next"**

### Configure Sign-up Experience

1. **Self-service sign-up**: Enable this option
2. **Cognito-assisted verification**: Select "Send email with Cognito"
3. **Required attributes**: Keep default (email is required)
4. Click **"Next"**

### Configure Message Delivery

1. **Email provider**: Choose "Send email with Cognito"
2. Click **"Next"**

### Integrate Your App

1. **User pool name**: Enter a name (e.g., "tarot-ai-users")
2. Click **"Next"**

### Review and Create

1. Review your settings
2. Click **"Create user pool"**

## Step 2: Create an App Client

After creating the user pool:

1. In your User Pool, go to the **"App integration"** tab
2. Scroll down to **"App clients"** section
3. Click **"Create app client"**
4. **App client name**: Enter a name (e.g., "tarot-ai-web-client")
5. **⚠️ IMPORTANT: Client secret**: 
   - **DO NOT check this box** - Leave it **unchecked**!
   - Client secrets are for server-side apps only
   - For web applications, you should NOT use a client secret
   - If you see "Client is configured with secret but SECRET_HASH was not received" error, you created the client with a secret by mistake
6. **Auth flows configuration**:
   - ✅ Enable "ALLOW_USER_PASSWORD_AUTH"
   - ✅ Enable "ALLOW_USER_SRP_AUTH"
7. Click **"Create app client"**

**Note**: If you accidentally created an App Client with a secret, see `FIX-SECRET-HASH-ERROR.md` for instructions on how to fix it.

## Step 3: Get Your Configuration Values

1. **User Pool ID**: 
   - Found in the User Pool overview page
   - Format: `ap-southeast-2_XXXXXXXXX`

2. **App Client ID**: 
   - Found in the App clients section
   - Format: `xxxxxxxxxxxxxxxxxxxxxxxxxx`

3. **Region**: 
   - The AWS region where you created the User Pool
   - Example: `ap-southeast-2`

## Step 4: Configure Environment Variables

Add these to your `.env.local` file (for local development):

```bash
NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID=ap-southeast-2_XXXXXXXXX
NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_AWS_REGION=ap-southeast-2
```

### For AWS Amplify Hosting

If you're deploying to AWS Amplify:

1. Go to your Amplify app in the AWS Console
2. Navigate to **"Environment variables"**
3. Add the three variables above:
   - `NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID`
   - `NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID`
   - `NEXT_PUBLIC_AWS_REGION`

## Step 5: Test Authentication

1. Start your development server: `npm run dev`
2. Navigate to your app
3. Click **"Sign Up"** in the navbar
4. Create a test account
5. Check your email for the verification code
6. Enter the verification code to complete signup
7. You should now be logged in!

## Troubleshooting

### "Client is configured with secret but SECRET_HASH was not received"

**This is the most common error!** It means your App Client was created with a client secret, but web apps shouldn't use secrets.

**Solution**: Create a new App Client **without** a client secret. See `FIX-SECRET-HASH-ERROR.md` for detailed instructions.

### "Configuration missing" warning

- Make sure all three environment variables are set
- Restart your development server after adding environment variables
- For production, ensure variables are set in Amplify Console

### "User pool not found" error

- Verify the User Pool ID is correct
- Ensure the region matches where you created the User Pool
- Check that the User Pool is in the same AWS account

### Email verification not working

- Check your email spam folder
- Verify email delivery settings in Cognito
- For production, consider using Amazon SES for email delivery

### "Username cannot be of email format, since user pool is configured for email alias"

**This error is now automatically handled!** The code generates a unique username from the email address during signup.

- Users still sign in with their email address
- The username is automatically generated (e.g., `user@example.com` → `user_abc123`)
- No action required - the fix is already in place
- See `FIX-EMAIL-ALIAS-ERROR.md` for more details

### Sign-in fails

- Verify the App Client has the correct auth flows enabled
- Check that password meets the requirements
- Ensure the user account is verified
- **Make sure your App Client does NOT have a client secret** (see first troubleshooting item)

## Additional Configuration (Optional)

### Custom Email Templates

1. In your User Pool, go to **"Messaging"** tab
2. Customize email templates for verification and password reset

### Password Reset

Password reset is automatically enabled. Users can request password resets through the Cognito hosted UI or you can implement a custom flow.

### Enable Username Changes (Optional)

To allow users to change their username in the account settings:

1. Go to your User Pool → **"Attributes"** tab
2. Under **"Standard attributes"**, ensure **"preferred_username"** is listed
3. If not visible, you may need to add it as a custom attribute:
   - Go to **"Attributes"** → **"Add custom attribute"**
   - Name: `preferred_username`
   - Type: String
   - Mutable: Yes (this is important!)
4. Save the changes

**Note**: The `preferred_username` attribute is a standard Cognito attribute, but it may need to be explicitly enabled in some User Pool configurations. If users can't change their username, check that this attribute is mutable in your User Pool settings.

### Social Sign-in (Optional)

You can add social identity providers (Google, Facebook, etc.) in the **"Sign-in experience"** tab of your User Pool.

## Security Best Practices

1. **Enable MFA**: Consider enabling multi-factor authentication for better security
2. **Password Policy**: Use strong password requirements
3. **Account Recovery**: Configure account recovery options
4. **Rate Limiting**: Cognito automatically provides rate limiting protection
5. **HTTPS Only**: Always use HTTPS in production

## Cost

AWS Cognito offers a **Free Tier**:
- 50,000 monthly active users (MAU)
- After free tier: $0.0055 per MAU

For most applications, this means authentication is essentially free!

