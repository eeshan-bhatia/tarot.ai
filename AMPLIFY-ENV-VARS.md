# Amplify Environment Variables Setup

Amplify doesn't allow environment variables starting with "AWS", so we use custom names.

## Add These Environment Variables in Amplify

1. Go to **AWS Amplify Console** → Your app (`tarot.ai`)
2. Click **App settings** (left sidebar)
3. Click **Environment variables**
4. Click **"+ Add new"**

### Add These Variables:

**Variable 1:**
- Key: `ACCESS_KEY_ID`
- Value: `[Your AWS Access Key ID]`

**Variable 2:**
- Key: `SECRET_ACCESS_KEY`
- Value: `[Your AWS Secret Access Key]`

**Variable 3:**
- Key: `REGION`
- Value: `ap-southeast-2`

**Variable 4:**
- Key: `BEDROCK_MODEL_ID`
- Value: `anthropic.claude-3-sonnet-20240229-v1:0`

## Important Notes

- ✅ Use `ACCESS_KEY_ID` (not `AWS_ACCESS_KEY_ID`)
- ✅ Use `SECRET_ACCESS_KEY` (not `AWS_SECRET_ACCESS_KEY`)
- ✅ Use `REGION` (not `AWS_REGION`)
- ✅ `BEDROCK_MODEL_ID` is fine as-is

## After Adding Variables

1. Click **Save**
2. Go back to your app
3. Click **Redeploy this version**
4. Wait for deployment
5. Test your website!

The code has been updated to read from these custom variable names.






