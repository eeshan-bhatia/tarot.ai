# Deployment Guide for Tarot.AI

This guide covers deploying your Next.js tarot reading application to AWS Amplify, which is the recommended deployment platform for this application.

## Why AWS Amplify?

- ✅ **Native AWS Integration**: Seamlessly integrates with AWS Bedrock via IAM roles (no credentials needed)
- ✅ **Next.js Optimized**: Automatically handles SSR, API routes, and static generation
- ✅ **Auto-Scaling**: Handles traffic spikes automatically
- ✅ **Global CDN**: Fast content delivery worldwide
- ✅ **Cost-Effective**: Pay only for what you use
- ✅ **Easy CI/CD**: Automatic deployments from GitHub

## Prerequisites

1. AWS Account with Bedrock access enabled
2. GitHub repository (or GitLab/Bitbucket)
3. AWS CLI installed (optional, for manual setup)

## Step 1: Prepare Your Repository

Ensure your code is pushed to GitHub:

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

## Step 2: Create AWS Amplify App

### Option A: Via AWS Console (Recommended)

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Click **"New app"** → **"Host web app"**
3. Connect your Git provider (GitHub, GitLab, or Bitbucket)
4. Authorize AWS to access your repository
5. Select your repository and branch (usually `main` or `master`)
6. Amplify will auto-detect Next.js and use the `amplify.yml` configuration

### Option B: Via AWS CLI

```bash
aws amplify create-app \
  --name tarot-ai \
  --repository https://github.com/YOUR_USERNAME/tarot.ai \
  --platform WEB \
  --environment-variables \
    AWS_REGION=ap-southeast-2 \
    BEDROCK_MODEL_ID=anthropic.claude-3-sonnet-20240229-v1:0
```

## Step 3: Configure IAM Role for Bedrock Access

**Important**: Instead of using AWS credentials, Amplify will use an IAM role. This is more secure.

1. In AWS Amplify Console, go to your app → **App settings** → **Environment variables**
2. **DO NOT** add `AWS_ACCESS_KEY_ID` or `AWS_SECRET_ACCESS_KEY`
3. Go to **App settings** → **Access control** → **Service role**
4. Create or select an IAM role that has Bedrock permissions

### Create IAM Policy for Bedrock

1. Go to [IAM Console](https://console.aws.amazon.com/iam)
2. Click **Policies** → **Create policy**
3. Use JSON editor and paste this policy:

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
        "arn:aws:bedrock:ap-southeast-2::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0",
        "arn:aws:bedrock:ap-southeast-2::foundation-model/anthropic.claude-3-haiku-20240307-v1:0"
      ]
    }
  ]
}
```

4. Name it `TarotAIBedrockPolicy`
5. Attach this policy to the Amplify service role

### Attach Policy to Amplify Service Role

1. In IAM Console, go to **Roles**
2. Find your Amplify service role (usually named like `amplify-tarot-ai-xxx`)
3. Click **Add permissions** → **Attach policies**
4. Select `TarotAIBedrockPolicy` and attach

## Step 4: Configure Environment Variables

In AWS Amplify Console → Your app → **App settings** → **Environment variables**, add:

```
AWS_REGION=ap-southeast-2
BEDROCK_MODEL_ID=anthropic.claude-3-sonnet-20240229-v1:0
```

**Do NOT add** `AWS_ACCESS_KEY_ID` or `AWS_SECRET_ACCESS_KEY` - Amplify will use the IAM role automatically.

## Step 5: Enable Bedrock Access (If Not Already Done)

1. Go to [AWS Bedrock Console](https://console.aws.amazon.com/bedrock)
2. Click **Model access** in the left sidebar
3. Request access to:
   - Anthropic Claude 3 Sonnet
   - Anthropic Claude 3 Haiku (optional, as backup)
4. Wait for approval (usually instant for Anthropic models)

## Step 6: Deploy

1. In Amplify Console, click **"Redeploy this version"** or push a new commit
2. Watch the build logs in real-time
3. Once complete, your app will be live at: `https://main.xxxxx.amplifyapp.com`

## Step 7: Custom Domain (Optional)

1. In Amplify Console → **App settings** → **Domain management**
2. Click **Add domain**
3. Enter your domain name
4. Follow the DNS configuration instructions
5. SSL certificate is automatically provisioned

## Monitoring & Logs

- **Build logs**: Available in Amplify Console → Your app → **Deployments**
- **Runtime logs**: Available in **Monitoring** section
- **CloudWatch**: For detailed API route logs

## Troubleshooting

### Build Fails

- Check build logs in Amplify Console
- Ensure `node_modules` is in `.gitignore` (it should be)
- Verify `package.json` has all dependencies

### Bedrock API Errors

- Verify IAM role has Bedrock permissions
- Check that Bedrock model access is enabled in your AWS account
- Ensure `AWS_REGION` matches your Bedrock region
- Check CloudWatch logs for detailed error messages

### Environment Variables Not Working

- Ensure variables are set in Amplify Console (not just `.env.local`)
- Redeploy after adding/changing environment variables
- Variables are available at build time and runtime

## Cost Estimation

- **Amplify Hosting**: Free tier includes 15 GB storage and 5 GB bandwidth/month
- **Bedrock API**: Pay per token (~$0.003 per 1K input tokens, ~$0.015 per 1K output tokens)
- **Estimated cost**: ~$0.01-0.05 per reading (depending on response length)

## Alternative: Vercel Deployment

If you prefer Vercel (also excellent for Next.js):

1. Connect your GitHub repo to [Vercel](https://vercel.com)
2. Add environment variables in Vercel dashboard:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION`
   - `BEDROCK_MODEL_ID`
3. Deploy automatically on every push

**Note**: Vercel requires explicit AWS credentials (can't use IAM roles like Amplify).

## Security Best Practices

✅ **DO**:
- Use IAM roles (Amplify) instead of access keys when possible
- Keep `.env` files in `.gitignore`
- Use least-privilege IAM policies
- Enable HTTPS (automatic with Amplify)

❌ **DON'T**:
- Commit AWS credentials to Git
- Use root AWS account credentials
- Share access keys publicly

## Support

For issues:
- AWS Amplify: [AWS Amplify Documentation](https://docs.aws.amazon.com/amplify/)
- Next.js: [Next.js Documentation](https://nextjs.org/docs)
- AWS Bedrock: [Bedrock Documentation](https://docs.aws.amazon.com/bedrock/)





