import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

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

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

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

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a wise, compassionate, and insightful tarot reader with deep knowledge of tarot symbolism and meaning. You provide thoughtful, personalized readings that help people gain clarity and guidance.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 1000,
    })

    const reading = completion.choices[0]?.message?.content

    if (!reading) {
      throw new Error('No reading generated')
    }

    return NextResponse.json({ reading })
  } catch (error) {
    console.error('Error generating reading:', error)
    return NextResponse.json(
      { error: 'Failed to generate reading' },
      { status: 500 }
    )
  }
}

