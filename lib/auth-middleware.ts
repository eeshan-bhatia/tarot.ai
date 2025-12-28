import { fetchAuthSession } from 'aws-amplify/auth'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Middleware to protect API routes with authentication
 * Use this in your API route handlers to require authentication
 */
export async function requireAuth(request: NextRequest) {
  try {
    const session = await fetchAuthSession()
    
    if (!session.tokens || !session.tokens.accessToken) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Authentication required' },
        { status: 401 }
      )
    }

    return null // User is authenticated
  } catch (error) {
    console.error('Auth middleware error:', error)
    return NextResponse.json(
      { error: 'Unauthorized', message: 'Authentication failed' },
      { status: 401 }
    )
  }
}

/**
 * Get the current user's ID from the session
 */
export async function getUserId(): Promise<string | null> {
  try {
    const session = await fetchAuthSession()
    if (session.tokens?.accessToken) {
      // Extract user ID from the token
      const payload = session.tokens.accessToken.payload as any
      return payload.sub || payload.username || null
    }
    return null
  } catch (error) {
    console.error('Error getting user ID:', error)
    return null
  }
}


