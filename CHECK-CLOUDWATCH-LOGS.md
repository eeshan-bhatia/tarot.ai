# How to Check CloudWatch Logs for Amplify

## Step-by-Step: Access CloudWatch Logs

### Method 1: Through Amplify Console (Easiest)

1. **Go to AWS Amplify Console**
   - Open: https://console.aws.amazon.com/amplify
   - Sign in if needed

2. **Select Your App**
   - Click on `tarot.ai` (or your app name)

3. **Navigate to Logs**
   - In the left sidebar, click **"Monitoring"**
   - Click **"Logs"** (or look for "View logs" link)

4. **Select Log Group**
   - You'll see log groups like:
     - `/aws/amplify/tarot-ai-[branch]/[function-name]`
     - Or: `amplify/tarot-ai-[id]/[branch]/[function-name]`
   - Click on the log group that contains your API route logs
   - Usually named something like: `amplify/tarot-ai-xxx/main/api/reading`

5. **View Recent Logs**
   - Click on the most recent log stream (sorted by time)
   - Look for entries from when you tried to get a reading
   - Logs show timestamps, so find the time you made the request

### Method 2: Direct CloudWatch Console

1. **Go to CloudWatch Console**
   - Open: https://console.aws.amazon.com/cloudwatch
   - Make sure you're in the same region as your Amplify app (e.g., `ap-southeast-2`)

2. **Navigate to Log Groups**
   - In the left sidebar, click **"Logs"** → **"Log groups"**

3. **Find Amplify Logs**
   - Search for: `/aws/amplify` or `amplify/tarot`
   - Look for log groups related to your app
   - Common names:
     - `/aws/amplify/tarot-ai-[id]/[branch]/api/reading`
     - `/aws/amplify/tarot-ai-[id]/[branch]/functions/[function-name]`

4. **View Log Streams**
   - Click on a log group
   - Click on the most recent log stream
   - Scroll to find logs from when you made the request

## What to Look For in Logs

### 1. Credential Check Logs

Look for:
```
Bedrock Client Config:
- Region: ap-southeast-2
- Access Key ID present: true/false
- Secret Key present: true/false
- Using credentials: true/false
```

**If both show `false`**: Credentials aren't being read from environment variables

### 2. Error Details

Look for:
```
Error generating reading: [error object]
Error name: UnrecognizedClientException
Error message: The security token included in the request is invalid
Error code: 403
Full error: { ... }
```

### 3. API Call Attempts

Look for:
```
Calling Bedrock with model: anthropic.claude-3-sonnet-20240229-v1:0
Bedrock payload: { ... }
```

## Understanding 403 Forbidden

A **403 Forbidden** error means:

1. ✅ **Request reached the API** (not a network issue)
2. ✅ **API route is working** (it's processing the request)
3. ❌ **AWS is rejecting the request** (credentials/permissions issue)

### Common Causes:

1. **Invalid Credentials**
   - Wrong `ACCESS_KEY_ID` or `SECRET_ACCESS_KEY`
   - Credentials are expired
   - Typo in environment variable values

2. **Missing Permissions**
   - IAM user doesn't have Bedrock permissions
   - Policy not attached correctly

3. **Credentials Not Being Read**
   - Environment variable names are wrong
   - Variables not set in Amplify
   - Typo in variable names (case-sensitive!)

## Quick Diagnostic Steps

### Step 1: Verify Environment Variables in Amplify

1. Amplify Console → Your app → **App settings** → **Environment variables**
2. Verify these **exact** names (case-sensitive):
   - `ACCESS_KEY_ID` (NOT `AWS_ACCESS_KEY_ID`)
   - `SECRET_ACCESS_KEY` (NOT `AWS_SECRET_ACCESS_KEY`)
   - `REGION` = `ap-southeast-2`
   - `BEDROCK_MODEL_ID` = `anthropic.claude-3-sonnet-20240229-v1:0`

### Step 2: Check CloudWatch Logs

Follow the steps above to see:
- Are credentials being read? (Look for "Access Key ID present: true")
- What's the exact error? (Look for "Error name:" and "Error message:")

### Step 3: Verify IAM User Permissions

1. Go to **IAM Console** → **Users**
2. Find your user (`tarot-ai-amplify-user`)
3. Click **Permissions** tab
4. Verify `TarotAIBedrockPolicy` (or `BedrockFullAccess`) is attached

### Step 4: Test Credentials Locally

If you have AWS CLI installed:

```bash
export ACCESS_KEY_ID="your-key"
export SECRET_ACCESS_KEY="your-secret"
export AWS_ACCESS_KEY_ID=$ACCESS_KEY_ID
export AWS_SECRET_ACCESS_KEY=$SECRET_ACCESS_KEY
export AWS_DEFAULT_REGION="ap-southeast-2"

# Test Bedrock access
aws bedrock list-foundation-models --region ap-southeast-2
```

If this fails, your credentials are invalid.

## What to Share for Help

When asking for help, share:

1. **From CloudWatch Logs:**
   - "Access Key ID present: true/false"
   - "Error name: [name]"
   - "Error message: [message]"

2. **From Amplify Console:**
   - Screenshot of Environment Variables (hide actual values)
   - Or list the variable names you have set

3. **From IAM Console:**
   - Which policies are attached to your IAM user

## Common Fixes

### Fix 1: Credentials Not Being Read

**Symptom**: CloudWatch shows "Access Key ID present: false"

**Solution**:
1. Double-check environment variable names in Amplify
2. Make sure there are no extra spaces
3. Redeploy after changing variables

### Fix 2: Invalid Credentials

**Symptom**: CloudWatch shows "Access Key ID present: true" but still 403

**Solution**:
1. Create new access keys in IAM Console
2. Update `ACCESS_KEY_ID` and `SECRET_ACCESS_KEY` in Amplify
3. Redeploy

### Fix 3: Missing Permissions

**Symptom**: Error name is `AccessDeniedException`

**Solution**:
1. Verify IAM user has Bedrock policy attached
2. Check policy allows `bedrock:InvokeModel`
3. Wait 2-3 minutes for changes to propagate
4. Redeploy

## Next Steps

1. **Check CloudWatch logs** using the steps above
2. **Look for** "Access Key ID present: true/false"
3. **Share the log output** so we can pinpoint the exact issue

The logs will tell us exactly what's wrong!





