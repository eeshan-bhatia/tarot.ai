# Quick Fix: Use Environment Variables (Temporary Solution)

Since the IAM role approach is having issues, let's use environment variables to get your site working immediately.

## Step 1: Add Credentials to Amplify

1. Go to **AWS Amplify Console** → Your app (`tarot.ai`)
2. Click **App settings** (left sidebar)
3. Click **Environment variables**
4. Click **"+ Add new"** button

### Add These 4 Variables:

**Variable 1:**
- Key: `AWS_ACCESS_KEY_ID`
- Value: `[Your AWS Access Key ID]`

**Variable 2:**
- Key: `AWS_SECRET_ACCESS_KEY`
- Value: `[Your AWS Secret Access Key]`

**Variable 3:**
- Key: `AWS_REGION`
- Value: `ap-southeast-2`

**Variable 4:**
- Key: `BEDROCK_MODEL_ID`
- Value: `anthropic.claude-3-sonnet-20240229-v1:0`

## Step 2: Redeploy

1. After adding all variables, click **Save**
2. Go back to your app overview
3. Click **Redeploy this version**
4. Wait for deployment to complete

## Step 3: Test

Try getting a reading on your website. It should work now!

## Security Note

⚠️ **This uses explicit credentials, which is less secure than IAM roles, but it will work immediately.**

Once your site is working, we can troubleshoot the IAM role issue separately. The environment variables approach is fine for now, especially if this is a personal project or small-scale deployment.

## Finding Your AWS Credentials

If you don't have your credentials:
1. Go to [IAM Console](https://console.aws.amazon.com/iam) → **Users**
2. Click on your user
3. Click **Security credentials** tab
4. Click **Create access key**
5. Choose **"Application running outside AWS"** or **"Other"**
6. Copy the **Access key ID** and **Secret access key**
7. **Important**: Save the secret key immediately - you can't see it again!

## After It's Working

Once your site works with environment variables, we can:
1. Troubleshoot why the IAM role isn't working
2. Switch back to IAM roles for better security
3. Or keep using environment variables if that works for you

