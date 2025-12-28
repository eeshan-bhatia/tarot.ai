# Fix: CredentialsProviderError in Amplify

This error occurs because the Amplify service role doesn't have Bedrock permissions. Follow these steps:

## Step 1: Find Your Amplify Service Role

1. Go to **AWS Amplify Console** → Your app (`tarot.ai`)
2. Click **App settings** (left sidebar)
3. Click **Access control**
4. Look for **"Service role"** section
5. You'll see a role name like: `amplify-tarot-ai-xxxxx-role` or `amplify-tarot-ai-xxxxx-service-role`
6. **Copy the role name** (you'll need it in Step 2)

## Step 2: Create Bedrock Policy

1. Go to [IAM Console](https://console.aws.amazon.com/iam)
2. Click **Policies** (left sidebar)
3. Click **Create policy**
4. Click **JSON** tab
5. Delete the default content and paste this:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "BedrockInvokeModel",
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel",
        "bedrock:InvokeModelWithResponseStream"
      ],
      "Resource": [
        "arn:aws:bedrock:ap-southeast-2::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0",
        "arn:aws:bedrock:ap-southeast-2::foundation-model/anthropic.claude-3-haiku-20240307-v1:0",
        "arn:aws:bedrock:ap-southeast-2::foundation-model/anthropic.claude-3-opus-20240229-v1:0"
      ]
    },
    {
      "Sid": "BedrockListModels",
      "Effect": "Allow",
      "Action": [
        "bedrock:ListFoundationModels",
        "bedrock:GetFoundationModel"
      ],
      "Resource": "*"
    }
  ]
}
```

6. Click **Next**
7. Name it: `TarotAIBedrockPolicy`
8. Add description: `Allows Amplify to invoke Bedrock models for tarot readings`
9. Click **Create policy**

## Step 3: Attach Policy to Service Role

1. In IAM Console, click **Roles** (left sidebar)
2. **Search for your service role** (the name you copied in Step 1)
3. Click on the role name
4. Click **Add permissions** → **Attach policies**
5. In the search box, type: `TarotAIBedrockPolicy`
6. Check the box next to `TarotAIBedrockPolicy`
7. Click **Add permissions** at the bottom

## Step 4: Verify Trust Relationship (Important!)

1. Still in the role page, click **Trust relationships** tab
2. Click **Edit trust policy**
3. Make sure it includes `amplify.amazonaws.com` as a trusted service:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "amplify.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

4. If it's different, update it to match above, then click **Update policy**

## Step 5: Redeploy Your App

1. Go back to **AWS Amplify Console** → Your app
2. Click **Redeploy this version** (or make a small commit and push to trigger a new deployment)
3. Wait for deployment to complete

## Step 6: Test Again

Try getting a reading on your deployed website. The error should be resolved!

## Troubleshooting

### Still getting credentials error?

1. **Check CloudWatch Logs**:
   - Amplify Console → Your app → **Monitoring** → **Logs**
   - Look for the API route logs to see detailed errors

2. **Verify Environment Variables**:
   - App settings → Environment variables
   - Ensure `AWS_REGION` and `BEDROCK_MODEL_ID` are set

3. **Check Bedrock Model Access**:
   - Go to [Bedrock Console](https://console.aws.amazon.com/bedrock)
   - Click **Model access**
   - Ensure Anthropic Claude 3 Sonnet is enabled

4. **Verify Role Name**:
   - Make sure you attached the policy to the correct role
   - The role should be the one listed in Amplify → App settings → Access control

### Alternative: Use Environment Variables (Not Recommended)

If IAM roles still don't work, you can temporarily add credentials as environment variables:
- `AWS_ACCESS_KEY_ID` = your access key
- `AWS_SECRET_ACCESS_KEY` = your secret key

**⚠️ Warning**: This is less secure than IAM roles. Only use as a last resort.






