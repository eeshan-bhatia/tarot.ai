import { Amplify } from 'aws-amplify'

// Amplify configuration
// These values should be set in your environment variables
// For AWS Amplify Hosting, configure them in the Amplify Console
// For local development, add them to .env.local

const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID || '',
      userPoolClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID || '',
      region: process.env.NEXT_PUBLIC_AWS_REGION || process.env.REGION || 'ap-southeast-2',
    }
  }
}

// Only configure Amplify if we have the required environment variables
if (amplifyConfig.Auth.Cognito.userPoolId && amplifyConfig.Auth.Cognito.userPoolClientId) {
  Amplify.configure(amplifyConfig)
} else {
  console.warn('AWS Cognito configuration missing. Authentication features will not work.')
  console.warn('Please set NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID and NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID')
}

export default amplifyConfig


