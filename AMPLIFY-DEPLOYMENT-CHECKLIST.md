# Complete AWS Amplify Deployment Checklist

This is a step-by-step guide to deploy your Tarot.AI application to AWS Amplify from scratch.

## Prerequisites

- [ ] AWS Account with admin access
- [ ] GitHub account (or GitLab/Bitbucket)
- [ ] Code pushed to a Git repository
- [ ] Node.js 18+ installed locally (for testing)

---

## Phase 1: AWS Setup

### Step 1: Enable Bedrock Model Access

1. Go to [AWS Bedrock Console](https://console.aws.amazon.com/bedrock)
2. Click **"Model access"** in the left sidebar
3. Click **"Request model access"**
4. Select **"Anthropic"** → **"Claude 3 Sonnet"**
5. Fill out the use case form:
   - Use case: "AI-powered tarot reading application"
   - Description: "Personalized tarot card readings using AI"
6. Submit and wait for approval (usually instant for Anthropic models)
7. Verify it shows **"Access granted"** status

### Step 2: Create IAM User (for Environment Variables)

1. Go to [IAM Console](https://console.aws.amazon.com/iam) → **Users**
2. Click **"Create user"**
3. Username: `tarot-ai-amplify-user`
4. Click **"Next"**
5. **Attach policies directly** → Click **"Create policy"**
6. Click **"JSON"** tab and paste:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel",
        "bedrock:InvokeModelWithResponseStream"
      ],
      "Resource": [
        "arn:aws:bedrock:ap-southeast-2::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0"
      ]
    },
    {
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

7. Click **"Next"** → Name: `TarotAIBedrockPolicy` → **"Create policy"**
8. Go back to user creation, refresh, select `TarotAIBedrockPolicy` → **"Next"** → **"Create user"**

### Step 3: Create Access Keys

1. Click on the user you just created (`tarot-ai-amplify-user`)
2. Go to **"Security credentials"** tab
3. Scroll to **"Access keys"** section
4. Click **"Create access key"**
5. Select **"Application running outside AWS"**
6. Click **"Next"** → **"Create access key"**
7. **IMPORTANT**: Copy both:
   - **Access key ID** (starts with `AKIA...`)
   - **Secret access key** (long string - you can only see it once!)
8. Save these securely - you'll need them in Step 8

---

## Phase 2: Code Preparation

### Step 4: Verify Code is Ready

Verify these files exist and are correct:

- [ ] `amplify.yml` exists in root directory
- [ ] `next.config.js` is configured (no AWS SDK externalization)
- [ ] `app/api/reading/route.ts` uses `ACCESS_KEY_ID` and `SECRET_ACCESS_KEY` (not `AWS_ACCESS_KEY_ID`)
- [ ] All code is committed and pushed to Git

### Step 5: Verify amplify.yml

Your `amplify.yml` should look like this:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

### Step 6: Commit and Push Code

```bash
git add .
git commit -m "Prepare for Amplify deployment"
git push origin main
```

---

## Phase 3: Amplify Setup

### Step 7: Create Amplify App

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Click **"New app"** → **"Host web app"**
3. Select your Git provider (GitHub, GitLab, or Bitbucket)
4. Authorize AWS to access your repository
5. Select your repository: `tarot.ai` (or your repo name)
6. Select branch: `main` (or `master`)
7. Click **"Next"**

### Step 8: Configure Build Settings

1. **App name**: `tarot-ai` (or keep default)
2. **Build settings**: Should auto-detect Next.js
   - Frontend build command: `npm run build`
   - Build output directory: `.next`
3. Click **"Next"**

### Step 9: Add Environment Variables

1. Scroll to **"Advanced settings"** → Expand it
2. In **"Environment variables"** section, click **"+ Add new"**
3. Add these **4 variables** (exact names, case-sensitive):

   **Variable 1:**
   - Key: `ACCESS_KEY_ID`
   - Value: `[Paste your Access Key ID from Step 3]`

   **Variable 2:**
   - Key: `SECRET_ACCESS_KEY`
   - Value: `[Paste your Secret Access Key from Step 3]`

   **Variable 3:**
   - Key: `REGION`
   - Value: `ap-southeast-2`

   **Variable 4:**
   - Key: `BEDROCK_MODEL_ID`
   - Value: `anthropic.claude-3-sonnet-20240229-v1:0`

4. **Important**: 
   - ✅ Use `ACCESS_KEY_ID` (NOT `AWS_ACCESS_KEY_ID`)
   - ✅ Use `SECRET_ACCESS_KEY` (NOT `AWS_SECRET_ACCESS_KEY`)
   - ✅ Use `REGION` (NOT `AWS_REGION`)

5. Click **"Next"**

### Step 10: Review and Deploy

1. Review all settings
2. Click **"Save and deploy"**
3. Wait for deployment to complete (5-10 minutes)
4. You'll see a green checkmark when done

---

## Phase 4: Verification

### Step 11: Test Your Deployment

1. Click on your app in Amplify Console
2. Find your app URL (e.g., `https://main.xxxxx.amplifyapp.com`)
3. Open it in a browser
4. Test the full flow:
   - [ ] Landing page loads
   - [ ] Can navigate to question input
   - [ ] Can select 3 cards
   - [ ] Can get a reading (this tests Bedrock integration)

### Step 12: Check Logs (If Issues)

1. In Amplify Console → Your app → **"Monitoring"** → **"Logs"**
2. Look for:
   - Build logs (should show successful build)
   - Function logs (API route logs)
   - Check for any errors

### Step 13: Verify Environment Variables

1. Amplify Console → Your app → **"App settings"** → **"Environment variables"**
2. Verify all 4 variables are present:
   - `ACCESS_KEY_ID`
   - `SECRET_ACCESS_KEY`
   - `REGION`
   - `BEDROCK_MODEL_ID`

---

## Troubleshooting

### Error: "UnrecognizedClientException"

**Causes:**
1. Invalid credentials
2. Credentials don't have Bedrock permissions
3. Typo in environment variable names

**Fix:**
1. Verify IAM user has `TarotAIBedrockPolicy` attached
2. Verify environment variable names are exact (case-sensitive)
3. Create new access keys and update in Amplify
4. Redeploy

### Error: "AccessDeniedException"

**Causes:**
1. Bedrock model access not enabled
2. IAM policy not attached

**Fix:**
1. Enable Bedrock model access (Step 1)
2. Verify IAM policy is attached to user
3. Wait 2-3 minutes for changes to propagate
4. Redeploy

### Error: "Model not found"

**Causes:**
1. Wrong model ID
2. Model not available in region

**Fix:**
1. Verify `BEDROCK_MODEL_ID` is correct
2. Verify region matches (`ap-southeast-2`)
3. Check Bedrock Console → Model access

### Build Fails

**Causes:**
1. Missing dependencies
2. TypeScript errors
3. Build configuration issues

**Fix:**
1. Check build logs in Amplify Console
2. Test build locally: `npm run build`
3. Fix any errors
4. Commit and push

---

## Code Compatibility Checklist

✅ **Environment Variables**: Code uses `ACCESS_KEY_ID` and `SECRET_ACCESS_KEY` (not `AWS_` prefixed)
✅ **Next.js Config**: AWS SDK is bundled (not externalized) for Lambda compatibility
✅ **API Route**: Handles both IAM roles and explicit credentials
✅ **Error Handling**: Comprehensive error messages for debugging
✅ **Amplify Config**: `amplify.yml` is properly configured for Next.js

---

## Post-Deployment

### Custom Domain (Optional)

1. Amplify Console → Your app → **"App settings"** → **"Domain management"**
2. Click **"Add domain"**
3. Enter your domain
4. Follow DNS configuration instructions
5. SSL certificate is automatically provisioned

### Monitoring

- **Build logs**: Amplify Console → Deployments
- **Runtime logs**: Amplify Console → Monitoring → Logs
- **CloudWatch**: For detailed API route logs

### Cost Estimation

- **Amplify Hosting**: Free tier includes 15 GB storage, 5 GB bandwidth/month
- **Bedrock API**: ~$0.01-0.05 per reading (depends on response length)
- **Total**: Very low cost for personal/small-scale use

---

## Security Best Practices

✅ **IAM User**: Created dedicated user (not root account)
✅ **Least Privilege**: Policy only grants Bedrock permissions
✅ **Environment Variables**: Credentials stored securely in Amplify (not in code)
✅ **HTTPS**: Automatically enabled by Amplify
✅ **No Credentials in Git**: `.env` files are in `.gitignore`

---

## Success Criteria

Your deployment is successful when:
- [ ] App builds without errors
- [ ] Landing page loads correctly
- [ ] Can complete full user flow (question → cards → reading)
- [ ] Bedrock API calls work (readings are generated)
- [ ] No errors in CloudWatch logs

---

## Quick Reference

**Environment Variables in Amplify:**
- `ACCESS_KEY_ID` = Your AWS Access Key ID
- `SECRET_ACCESS_KEY` = Your AWS Secret Access Key
- `REGION` = `ap-southeast-2`
- `BEDROCK_MODEL_ID` = `anthropic.claude-3-sonnet-20240229-v1:0`

**IAM Policy Name:** `TarotAIBedrockPolicy`

**IAM User Name:** `tarot-ai-amplify-user`

**Bedrock Model:** Anthropic Claude 3 Sonnet

**Region:** `ap-southeast-2` (Asia Pacific - Sydney)

---

## Need Help?

1. Check CloudWatch logs for detailed errors
2. Verify all steps in this checklist
3. Test credentials locally with AWS CLI
4. Review Amplify documentation: https://docs.aws.amazon.com/amplify/
