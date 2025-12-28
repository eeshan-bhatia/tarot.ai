# Verify Credentials and Permissions

Since environment variables are set correctly, let's check:

## Step 1: Verify Secret Key is Complete

In your screenshot, `SECRET_ACCESS_KEY` shows as truncated (ending with `...`)

**Important**: The secret key must be the FULL value (usually 40 characters). Make sure:
1. Click on the variable to edit it
2. Verify the entire secret key is there (not cut off)
3. No extra spaces at the beginning or end

## Step 2: Test Credentials Locally

Let's verify your credentials actually work:

```bash
# Set the credentials
export AWS_ACCESS_KEY_ID="[YOUR_ACCESS_KEY_ID]"
export AWS_SECRET_ACCESS_KEY="[YOUR FULL SECRET KEY]"
export AWS_DEFAULT_REGION="ap-southeast-2"

# Test Bedrock access
aws bedrock list-foundation-models --region ap-southeast-2
```

If this fails with "UnrecognizedClientException", your credentials are invalid.

## Step 3: Verify IAM User Permissions

1. Go to **IAM Console** → **Users**
2. Find the user that has the access key you're using
   - (You can search by access key prefix in IAM)
3. Click on the user → **Permissions** tab
4. Verify you see:
   - `TarotAIBedrockPolicy` OR
   - `BedrockFullAccess`
5. If no policy is attached, attach one

## Step 4: Check New CloudWatch Logs

After the new deployment (with debug logging), check logs again. You should now see:

```
=== Bedrock Client Configuration ===
Region: ap-southeast-2
Access Key ID present: true AKIA...XXXX
Secret Key present: true/false
Using explicit credentials: true/false
Environment variables checked: { ... }
```

This will tell us if credentials are being read.

## Step 5: Verify Credentials Haven't Been Deleted

1. Go to **IAM Console** → **Users**
2. Find your user
3. **Security credentials** tab
4. Check **Access keys** section
5. Verify your access key still exists and is **Active**
6. If it shows as "Inactive" or doesn't exist, create a new one

## Step 6: Check for Extra Spaces

Sometimes copy/paste adds spaces. In Amplify:
1. Click **"Manage variables"**
2. Click on `ACCESS_KEY_ID` → Edit
3. Make sure there are NO spaces before or after the value
4. Do the same for `SECRET_ACCESS_KEY`

## Most Likely Issues:

1. **Secret key is incomplete** (truncated when pasted)
2. **Credentials are invalid/expired** (key was deleted or rotated)
3. **IAM user doesn't have permissions** (policy not attached)
4. **Extra spaces** in the values

## Quick Test:

Try creating NEW access keys:
1. IAM Console → Your user → Security credentials
2. Delete old key (if safe)
3. Create new access key
4. Update both `ACCESS_KEY_ID` and `SECRET_ACCESS_KEY` in Amplify
5. Redeploy
6. Test again






