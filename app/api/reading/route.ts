import { NextRequest, NextResponse } from 'next/server'
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime'

// Lazy initialization of Bedrock client to avoid build-time issues
function getBedrockClient() {
  const region = process.env.AWS_REGION || 'ap-southeast-2'
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
  
  const clientConfig: any = {
    region,
  }
  
  // Only add credentials if both are provided
  if (accessKeyId && secretAccessKey) {
    clientConfig.credentials = {
      accessKeyId: accessKeyId.trim(),
      secretAccessKey: secretAccessKey.trim(),
    }
  }
  
  return new BedrockRuntimeClient(clientConfig)
}

interface Card {
  name: string
  meaning: string
  keywords: string[]
  isReversed?: boolean
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

    const positions = ['Past', 'Present', 'Future']
    const cardDescriptions = cards.map((card: Card, index: number) => {
      const orientation = card.isReversed ? ' (Reversed)' : ' (Upright)'
      const keywords = Array.isArray(card.keywords) ? card.keywords.join(', ') : (card.keywords || '')
      const position = positions[index] || `Position ${index + 1}`
      return `${position} - ${card.name}${orientation}\nMeaning: ${card.meaning}\nKeywords: ${keywords}`
    }).join('\n\n')

    const isGeneralReading = !question || question.trim() === ''

    const prompt = isGeneralReading
      ? `Interpret these three tarot cards for a general reading. Each card is positioned to represent Past, Present, and Future:

${cardDescriptions}

Provide exactly 4 paragraphs:
1. First paragraph: Interpret the Past card (${cards[0].name}). Explain how this card represents past experiences, influences, or events that have shaped their current situation. Connect the card's meaning to what has come before in their life.
2. Second paragraph: Interpret the Present card (${cards[1].name}). Explain how this card represents their current circumstances, state of being, or what is happening now in their life. Focus on the immediate situation and current energies.
3. Third paragraph: Interpret the Future card (${cards[2].name}). Explain how this card represents potential outcomes, future possibilities, or what may come to pass. Discuss what this card suggests about the path ahead.
4. Fourth paragraph: Conclude by explaining how the Past, Present, and Future cards work together to tell a complete story about their journey. Show how the past has led to the present, and how the present influences the future. Offer guidance based on this temporal progression. Then, on a separate paragraph, provide a poignant, inspiring quote (in quotation marks) that relates to what the cards point towards. The quote MUST be from an actual person (author, philosopher, poet, historical figure, etc.) and MUST include attribution in the format " - [Name]" at the end. Do not create or invent quotes - only use real, existing quotes from real people.

Begin immediately with the Past card's interpretation. Do not include any introductory phrases or acknowledgments - start directly with the Past card. Be specific and personal, and always contextualize each card within its temporal position.`
      : `Interpret these three tarot cards in response to this question: "${question}"

Each card is positioned to represent Past, Present, and Future:

${cardDescriptions}

Provide exactly 4 paragraphs:
1. First paragraph: Interpret the Past card (${cards[0].name}). First explain the card's general meaning and symbolism, then explain how it specifically relates to their question in the context of past events, experiences, or influences that have led to their current situation regarding this question.
2. Second paragraph: Interpret the Present card (${cards[1].name}). First explain the card's general meaning and symbolism, then explain how it specifically relates to their question in the context of their current circumstances, what is happening now, or the immediate situation regarding this question.
3. Third paragraph: Interpret the Future card (${cards[2].name}). First explain the card's general meaning and symbolism, then explain how it specifically relates to their question in the context of potential outcomes, future possibilities, or what may come to pass regarding this question.
4. Fourth paragraph: Conclude by explaining how the Past, Present, and Future cards collectively answer their question. Show how past influences have shaped the current situation, how the present moment affects future outcomes, and offer practical guidance based on this temporal understanding. Then, on a separate paragraph, provide a poignant, inspiring quote (in quotation marks) that relates to their question and/or what the cards point towards. The quote MUST be from an actual person (author, philosopher, poet, historical figure, etc.) and MUST include attribution in the format " - [Name]" at the end. Do not create or invent quotes - only use real, existing quotes from real people.

Begin immediately with the Past card's interpretation. Do not include any introductory phrases or acknowledgments - start directly with the Past card. Be specific and personal, and always contextualize each card within its temporal position (Past, Present, or Future) when relating it to their question.`

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
    
    const systemPrompt = 'You are a wise, compassionate, and insightful tarot reader with deep knowledge of tarot symbolism and meaning. When given tarot cards, you immediately begin interpreting them without any introductory pleasantries, affirmations, or acknowledgments. You go straight into discussing the cards and their meanings, providing the reading directly.'
    
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

