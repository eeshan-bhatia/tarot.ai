# tarot.ai

An AI powered web application for all things tarot. Get general readings, ask questions, or even learn and study the cards and their meanings in different contexts.

## Features

- **78 Tarot Cards**: Curated deck with Major Arcana and key Minor Arcana
- **AI-Powered Readings**: Personalized interpretations using AWS Bedrock (Claude)
- **User Authentication**: Secure login/signup with AWS Cognito
- **User Accounts**: Manage your profile and account settings
- **Beautiful UI**: Modern, responsive design with smooth animations

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **AWS Bedrock** - AI reading generation via Claude models
- **AWS Cognito** - User authentication and account management
- **AWS Amplify** - Authentication integration

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- AWS Account with Bedrock access
- AWS credentials (Access Key ID and Secret Access Key) or IAM role with Bedrock permissions
- AWS Cognito User Pool (for authentication features)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd tarot.ai
```

2. Install dependencies:
```bash
npm install
```

3. Set up AWS Cognito User Pool:

   a. Go to AWS Cognito Console → User Pools → Create User Pool
   b. Choose "Email" as the sign-in option
   c. Configure password policy (minimum 8 characters recommended)
   d. After creation, note your User Pool ID and create an App Client
   e. In the App Client settings, enable "ALLOW_USER_PASSWORD_AUTH" and "ALLOW_USER_SRP_AUTH"

4. Create a `.env.local` file in the root directory:
```bash
# AWS Credentials (OPTIONAL - only needed if not using IAM role)
# If you're running on AWS infrastructure (EC2, Lambda, ECS, etc.), 
# you can use IAM roles instead and skip these variables
ACCESS_KEY_ID=your_aws_access_key_id
SECRET_ACCESS_KEY=your_aws_secret_access_key

# AWS Region (optional, defaults to ap-southeast-2)
REGION=ap-southeast-2

# Bedrock Model ID (optional, defaults to Claude 3 Sonnet)
BEDROCK_MODEL_ID=anthropic.claude-3-sonnet-20240229-v1:0

# AWS Cognito Configuration (REQUIRED for authentication)
NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID=your_user_pool_id
NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID=your_app_client_id
NEXT_PUBLIC_AWS_REGION=ap-southeast-2
```

**Note**: 
- If you're running on AWS infrastructure (EC2, Lambda, ECS, etc.), you can use IAM roles instead of explicit credentials. Just make sure your IAM role has permissions for `bedrock:InvokeModel`. You can skip the `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` variables entirely.
- If running locally, you'll need both `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` (they come as a pair when you create access keys in AWS).

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Enter Your Question**: Type what you'd like guidance on
2. **Select 3 Cards**: Choose cards from the deck that resonate with you
3. **Get Your Reading**: Receive a personalized AI-generated interpretation

## Project Structure

```
tarot.ai/
├── app/
│   ├── api/
│   │   └── reading/      # API route for generating readings
│   ├── account/          # User account page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main page
├── components/
│   ├── CardSelector.tsx  # Card selection interface
│   ├── QuestionInput.tsx # Question input form
│   ├── ReadingDisplay.tsx # Reading results display
│   ├── LoginModal.tsx    # Login modal component
│   ├── SignupModal.tsx   # Signup modal component
│   └── Navbar.tsx        # Navigation bar with auth
├── contexts/
│   └── AuthContext.tsx   # Authentication context
├── lib/
│   ├── amplify-config.ts # AWS Amplify configuration
│   └── auth-middleware.ts # Auth middleware for API routes
├── data/
│   └── tarotCards.ts     # Tarot card data (78 cards)
└── package.json
```

## Environment Variables

### Required for Authentication
- `NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID` - Your AWS Cognito User Pool ID (required)
- `NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID` - Your AWS Cognito App Client ID (required)
- `NEXT_PUBLIC_AWS_REGION` - AWS region for Cognito (optional, defaults to `ap-southeast-2`)

### Optional (for Bedrock)
- `ACCESS_KEY_ID` - Your AWS Access Key ID (optional - only needed if not using IAM role)
- `SECRET_ACCESS_KEY` - Your AWS Secret Access Key (optional - only needed if not using IAM role)
- `REGION` - AWS region for Bedrock (optional, defaults to `ap-southeast-2`)
- `BEDROCK_MODEL_ID` - Bedrock model identifier (optional, defaults to `anthropic.claude-3-sonnet-20240229-v1:0`)

**Important**: 
- If you're using IAM roles (on EC2, Lambda, ECS, etc.), you don't need to set `AWS_ACCESS_KEY_ID` or `AWS_SECRET_ACCESS_KEY` at all. The SDK will automatically use the IAM role credentials.
- If running locally, you need both `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` together (they're created as a pair in AWS IAM).

### Available Bedrock Models

You can use any Bedrock model that supports the Anthropic Claude format. Common options:
- `anthropic.claude-3-sonnet-20240229-v1:0` (default)
- `anthropic.claude-3-haiku-20240307-v1:0`
- `anthropic.claude-3-opus-20240229-v1:0`
- `anthropic.claude-v2:1`
- `anthropic.claude-v2`

Make sure your AWS account has access to the model you choose in the Bedrock console.

## Building for Production

```bash
npm run build
npm start
```

## License

MIT
