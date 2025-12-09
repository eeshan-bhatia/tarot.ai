# Troubleshooting Credentials Error in Amplify

If you're still getting `CredentialsProviderError` after attaching the IAM policy, follow these steps:

## Step 1: Verify IAM Policy is Attached

1. Go to [IAM Console](https://console.aws.amazon.com/iam) → **Roles**
2. Search for `amplify-tarot-ai` or just `amplify`
3. Click on the role (should be something like `amplify-tarot-ai-xxxxx-role`)
4. Check the **Permissions** tab
5. Verify you see `TarotAIBedrockPolicy` (or your Bedrock policy) in the list
6. If not attached, click **Add permissions** → **Attach policies** → Select the policy

## Step 2: Check Trust Relationship

1. Still in the role page, click **Trust relationships** tab
2. Verify it shows:

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

3. If different, click **Edit trust policy** and update it

## Step 3: Verify Amplify is Using the Role

1. Go to **AWS Amplify Console** → Your app
2. Click **App settings** (left sidebar)
3. Look for **"Service role"** or **"Access control"**
4. Verify the role ARN matches the one you just updated in IAM
5. If it shows "No service role", you need to create/assign one

## Step 4: Check CloudWatch Logs

1. In Amplify Console → Your app → **Monitoring** → **Logs**
2. Look for API route logs (should be under function logs)
3. Check for detailed error messages
4. Look for lines like:
   - `Calling Bedrock with model: ...`
   - `Error generating reading: ...`
   - Any credential-related errors

## Step 5: Verify Environment Variables

1. Amplify Console → Your app → **App settings** → **Environment variables**
2. Ensure these are set:
   - `AWS_REGION` = `ap-southeast-2`
   - `BEDROCK_MODEL_ID` = `anthropic.claude-3-sonnet-20240229-v1:0`
3. **DO NOT** have `AWS_ACCESS_KEY_ID` or `AWS_SECRET_ACCESS_KEY` set

## Step 6: Verify Bedrock Model Access

1. Go to [Bedrock Console](https://console.aws.amazon.com/bedrock)
2. Click **Model access** (left sidebar)
3. Verify **Anthropic Claude 3 Sonnet** shows as **"Access granted"**
4. If not, click **Request model access** and fill out the form

## Step 7: Redeploy After Changes

After making any IAM changes:
1. Go to Amplify Console → Your app
2. Click **Redeploy this version** (or make a small commit and push)
3. Wait for deployment to complete
4. **Important**: IAM changes can take 1-2 minutes to propagate

## Step 8: Test with Explicit Role (If Still Failing)

If the above doesn't work, we may need to explicitly pass the role. This requires a code change.

## Common Issues:

### Issue: "No service role configured"
**Fix**: In Amplify → App settings → Access control → Service role, create/assign a role

### Issue: "Role exists but permissions not working"
**Fix**: 
- Wait 2-3 minutes after attaching policy
- Redeploy the app
- Check CloudWatch logs for specific errors

### Issue: "Bedrock model not found"
**Fix**: 
- Verify model access in Bedrock Console
- Check the model ID matches exactly: `anthropic.claude-3-sonnet-20240229-v1:0`
- Try without the `:0` suffix: `anthropic.claude-3-sonnet-20240229-v1`

### Issue: "Access denied" even with policy
**Fix**:
- Verify the policy resource ARN matches your region
- Check the policy allows `bedrock:InvokeModel`
- Ensure the role trust relationship includes `amplify.amazonaws.com`

## Still Not Working?

If none of the above works, we can:
1. Add temporary credentials as environment variables (less secure)
2. Update the code to explicitly use the role ARN
3. Check if there's an Amplify-specific configuration needed

Let me know what you see in the CloudWatch logs - that will help pinpoint the exact issue.

