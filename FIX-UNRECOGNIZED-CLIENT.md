# Fix: UnrecognizedClientException - Invalid Security Token

This error means the IAM role's trust relationship isn't configured correctly for Amplify to assume it.

## Step 1: Check Trust Relationship

1. Go to **IAM Console** → **Roles**
2. Find your role: `AmplifySSRLoggingRole-d097ab93-0d1e-4181-bd85-a4fb94937105`
3. Click on it → **Trust relationships** tab
4. Click **Edit trust policy**

## Step 2: Update Trust Policy

The trust policy should allow both Amplify AND the compute service to assume the role:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": [
          "amplify.amazonaws.com",
          "lambda.amazonaws.com"
        ]
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

**Important**: Make sure it includes BOTH services:
- `amplify.amazonaws.com` (for Amplify service operations)
- `lambda.amazonaws.com` (for API routes/compute)

## Step 3: Alternative - Use Separate Compute Role

If the above doesn't work, create a dedicated compute role:

1. **IAM Console** → **Roles** → **Create role**
2. Select **Lambda** as the trusted entity
3. Attach the Bedrock policy (`TarotAIBedrockPolicy`)
4. Name it: `AmplifyTarotAIComputeRole`
5. Trust policy should be:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

6. Then in **Amplify Console** → **App settings** → **IAM roles** → **Compute role** → **Edit**
7. Select "Use an existing role" → Choose `AmplifyTarotAIComputeRole`

## Step 4: Verify Permissions

Make sure the role has:
1. ✅ Bedrock policy attached (`TarotAIBedrockPolicy`)
2. ✅ Correct trust relationship (allows Lambda/Amplify to assume)
3. ✅ No conflicting policies that might deny access

## Step 5: Wait and Redeploy

1. Wait 2-3 minutes after updating trust policy (IAM changes propagate)
2. Redeploy in Amplify Console
3. Test again

## Still Not Working?

If you're still getting the error, try temporarily adding credentials as environment variables to test:

1. **Amplify Console** → **App settings** → **Environment variables**
2. Add:
   - `AWS_ACCESS_KEY_ID` = your access key
   - `AWS_SECRET_ACCESS_KEY` = your secret key
3. Redeploy

**⚠️ Note**: This is less secure but will help us determine if it's a role issue or something else. Once working, we can switch back to IAM roles.

