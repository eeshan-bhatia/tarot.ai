# How Errors Are Determined and Displayed

## Error Flow

### 1. API Route (`app/api/reading/route.ts`)

When an error occurs, the code checks `error.name` to determine the error type:

```typescript
catch (error: any) {
  // Error is categorized by error.name:
  
  if (error.name === 'UnrecognizedClientException') {
    // Shows: "Access denied: ... credentials are invalid..."
  }
  else if (error.name === 'AccessDeniedException') {
    // Shows: "Access denied: ... credentials don't have permissions..."
  }
  else if (error.name === 'ValidationException') {
    // Shows: "Validation error: ... request format issue..."
  }
  else if (error.name === 'ResourceNotFoundException') {
    // Shows: "Model not found: ..."
  }
  else if (error.name === 'ThrottlingException') {
    // Shows: "Rate limit exceeded: ..."
  }
  else {
    // Shows: "Error: [error.message]"
  }
}
```

### 2. Response Format

The API returns:
```json
{
  "error": "The error message shown to user",
  "errorName": "UnrecognizedClientException",
  "errorCode": 403,
  "details": { ... } // Only in development
}
```

### 3. Frontend (`app/page.tsx`)

The frontend receives the error and displays it:
```typescript
if (!response.ok) {
  const errorData = await response.json()
  // errorData.error contains the message
  alert(errorData.error) // Shows the error message
}
```

## How to Debug the Actual Error

### Step 1: Check Browser Console

1. Open your deployed website
2. Press `F12` or `Cmd+Option+I` (Mac) to open DevTools
3. Go to **Console** tab
4. Try to get a reading
5. Look for:
   - `API Error Response:` - Shows the full error from API
   - `Error generating reading:` - Shows frontend error

### Step 2: Check CloudWatch Logs (Amplify)

1. Go to **AWS Amplify Console** → Your app
2. Click **Monitoring** → **Logs**
3. Look for **Function logs** (API route logs)
4. Check for:
   - `Error generating reading:`
   - `Error name:`
   - `Error message:`
   - `Full error:`

### Step 3: Check What Error Name You're Getting

The error name determines which message you see:

| Error Name | What It Means | Common Causes |
|------------|---------------|---------------|
| `UnrecognizedClientException` | Invalid credentials | Wrong access key, expired key, typo |
| `AccessDeniedException` | No permissions | Missing Bedrock policy |
| `ValidationException` | Bad request format | Wrong model ID, malformed request |
| `ResourceNotFoundException` | Model not found | Model ID wrong, region mismatch |
| `ThrottlingException` | Rate limit | Too many requests |

## Current Error You're Seeing

If you're seeing "Access denied: UnrecognizedClientException", it means:

1. ✅ The error is being caught correctly
2. ✅ The error name is `UnrecognizedClientException`
3. ❌ Your credentials are invalid or not being read

## How to Fix

### Check Environment Variables

1. **Amplify Console** → Your app → **App settings** → **Environment variables**
2. Verify these exact names (case-sensitive):
   - `ACCESS_KEY_ID` (not `AWS_ACCESS_KEY_ID`)
   - `SECRET_ACCESS_KEY` (not `AWS_SECRET_ACCESS_KEY`)
   - `REGION` = `ap-southeast-2`
   - `BEDROCK_MODEL_ID` = `anthropic.claude-3-sonnet-20240229-v1:0`

### Check CloudWatch Logs

Look for this in CloudWatch logs:
```
Bedrock Client Config:
- Region: ap-southeast-2
- Access Key ID present: true/false
- Secret Key present: true/false
- Using credentials: true/false
```

If it shows `false` for credentials, they're not being read.

### Verify Credentials Work

Test your credentials locally:
```bash
export ACCESS_KEY_ID="your-key"
export SECRET_ACCESS_KEY="your-secret"
export REGION="ap-southeast-2"

# Test with AWS CLI
aws bedrock list-foundation-models --region ap-southeast-2
```

If this fails, your credentials are invalid.

## Next Steps

1. Check CloudWatch logs to see the actual error name and message
2. Verify environment variables are set correctly in Amplify
3. Check if credentials are being read (look for "Access Key ID present: true")
4. Share the CloudWatch log output for more specific help





