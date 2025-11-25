import { NextRequest, NextResponse } from 'next/server'
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime'

// Lazy initialization of Bedrock client to avoid build-time issues
function getBedrockClient() {
  return new BedrockRuntimeClient({
    region: process.env.AWS_REGION || 'ap-southeast-2',
    ...(process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
      ? {
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          },
        }
      : {}),
  })
}

interface Card {
  name: string
  meaning: string
  keywords: string[]
}

export async function POST(request: NextRequest) {
  try {
    const { question, cards } = await request.json()

    if (!cards || cards.length !== 3) {
      return NextResponse.json(
        { error: '3 cards are required' },
        { status: 400 }
      )
    }

    // AWS credentials are optional if using IAM roles (EC2, Lambda, ECS, etc.)
    // The Bedrock client will automatically use the default credential chain if
    // AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY are not provided

    const cardDescriptions = cards.map((card: Card, index: number) => 
      `Card ${index + 1}: ${card.name}\nMeaning: ${card.meaning}\nKeywords: ${card.keywords.join(', ')}`
    ).join('\n\n')

    const isGeneralReading = !question || question.trim() === ''

    const prompt = isGeneralReading
      ? `You are a wise and compassionate tarot reader. A person has requested a general reading to discover what the universe wants them to know.

They have drawn the following three cards:
${cardDescriptions}

Please provide a thoughtful, personalized general tarot reading that:
1. Reveals insights about their current life path and situation
2. Interprets the meaning of each card and what it represents in their life
3. Explains how the cards work together to tell a story about their journey
4. Offers guidance about what they should focus on or be aware of
5. Maintains a warm, supportive, and mystical tone

Format your response as a flowing narrative (2-3 paragraphs) that weaves together the card meanings into a cohesive reading. Be specific and personal, as if you're speaking directly to them.`
      : `You are a wise and compassionate tarot reader. A person has asked: "${question}"

They have drawn the following three cards:
${cardDescriptions}

Please provide a thoughtful, personalized tarot reading that:
1. Addresses their specific question
2. Interprets the meaning of each card in the context of their question
3. Explains how the cards work together to provide guidance
4. Offers practical, empowering advice
5. Maintains a warm, supportive, and mystical tone

Format your response as a flowing narrative (2-3 paragraphs) that weaves together the card meanings into a cohesive reading. Be specific and personal, as if you're speaking directly to them.`

    // Use Claude model via Bedrock (you can change this to other Bedrock models)
    // Note: Model IDs in Bedrock sometimes need to be without the version suffix
    // Try: 'anthropic.claude-3-sonnet-20240229-v1:0' or 'anthropic.claude-3-sonnet-20240229-v1'
    // or just 'anthropic.claude-3-sonnet-20240229-v1' depending on what's available
    let modelId = process.env.BEDROCK_MODEL_ID || 'anthropic.claude-3-sonnet-20240229-v1:0'
    const region = process.env.AWS_REGION || 'ap-southeast-2'
    
    // Remove version suffix if present and try base model ID
    // Some regions require the model ID without the :0 suffix
    if (modelId.includes(':') && !process.env.BEDROCK_MODEL_ID) {
      // Try without version suffix as fallback
      const baseModelId = modelId.split(':')[0]
      console.log('Trying model ID:', modelId, 'or base:', baseModelId)
    }
    
    console.log('Calling Bedrock with model:', modelId, 'in region:', region)
    
    const systemPrompt = 'You are a wise, compassionate, and insightful tarot reader with deep knowledge of tarot symbolism and meaning. You provide thoughtful, personalized readings that help people gain clarity and guidance.'
    
    // Format for Claude API (Anthropic format)
    // For Claude 3, content should be an array of text blocks
    const bedrockPayload = {
      anthropic_version: 'bedrock-2023-05-31',
      max_tokens: 1000,
      temperature: 0.8,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt,
            },
          ],
        },
      ],
    }

    console.log('Bedrock payload:', JSON.stringify(bedrockPayload, null, 2))

    const bedrockClient = getBedrockClient()
    const command = new InvokeModelCommand({
      modelId,
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify(bedrockPayload),
    })
    
    const response = await bedrockClient.send(command)
    const responseBody = JSON.parse(new TextDecoder().decode(response.body))
    
    // Extract the reading from Claude's response
    const reading = responseBody.content?.[0]?.text

    if (!reading) {
      throw new Error('No reading generated')
    }

    return NextResponse.json({ reading })
  } catch (error: any) {
    console.error('Error generating reading:', error)
    console.error('Error name:', error.name)
    console.error('Error message:', error.message)
    console.error('Error code:', error.$metadata?.httpStatusCode)
    console.error('Full error:', JSON.stringify(error, null, 2))
    
    // Provide more detailed error information
    let errorMessage = 'Failed to generate reading'
    let statusCode = 500
    
    // Check for specific AWS error types
    const errorMsg = error.message || ''
    
    // Check for Anthropic use case form requirement
    if (errorMsg.includes('use case details') || errorMsg.includes('use case form')) {
      errorMessage = `Anthropic Use Case Form Required: You need to fill out the Anthropic use case details form in the AWS Bedrock console before using Claude models. Go to AWS Bedrock Console → Model access → Request model access → Fill out the Anthropic use case form. After submitting, wait 15 minutes before trying again.`
      statusCode = 403
    } else if (error.name === 'ValidationException') {
      errorMessage = `Validation error: ${errorMsg || error.name}. This might indicate an issue with the request format or model ID.`
      statusCode = 400
    } else if (error.name === 'AccessDeniedException') {
      errorMessage = `Access denied: ${errorMsg || error.name}. Please check your AWS credentials and Bedrock permissions.`
      statusCode = 403
    } else if (error.name === 'ResourceNotFoundException' || error.$metadata?.httpStatusCode === 404) {
      errorMessage = `Model not found: ${errorMsg || 'The specified model ID may not be available in this region or may need to be enabled.'}`
      statusCode = 404
    } else if (error.name === 'ThrottlingException') {
      errorMessage = `Rate limit exceeded: ${errorMsg || error.name}. Please try again in a moment.`
      statusCode = 429
    } else if (errorMsg) {
      errorMessage = `${error.name || 'Error'}: ${errorMsg}`
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        errorName: error.name,
        errorCode: error.$metadata?.httpStatusCode,
        details: process.env.NODE_ENV === 'development' ? {
          stack: error.stack,
          fullError: error.toString(),
          modelId: process.env.BEDROCK_MODEL_ID || 'anthropic.claude-3-sonnet-20240229-v1:0',
          region: process.env.AWS_REGION || 'ap-southeast-2',
        } : undefined
      },
      { status: statusCode }
    )
  }
}

