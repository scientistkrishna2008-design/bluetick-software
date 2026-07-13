import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { JWT } from 'https://esm.sh/google-auth-library@9'

// Initialize Supabase Client
const supabaseUrl = Deno.env.get('SUPABASE_URL') as string
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Firebase Service Account configuration (Stored in Supabase Secrets)
// You will get this JSON from Firebase Console -> Project Settings -> Service Accounts -> Generate new private key
const FIREBASE_SERVICE_ACCOUNT = JSON.parse(Deno.env.get('FIREBASE_SERVICE_ACCOUNT') || '{}')

const getAccessToken = async () => {
  const jwtClient = new JWT({
    email: FIREBASE_SERVICE_ACCOUNT.client_email,
    key: FIREBASE_SERVICE_ACCOUNT.private_key,
    scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
  })
  const tokens = await jwtClient.authorize()
  return tokens.access_token
}

serve(async (req) => {
  try {
    // 1. Parse the incoming webhook payload from Supabase
    const payload = await req.json()
    
    // The webhook triggers on INSERT to the notifications table
    const notification = payload.record
    
    if (!notification || !notification.user_id) {
      return new Response("No notification data", { status: 400 })
    }

    // 2. Fetch the user's push token from the push_subscriptions table
    const { data: subscription } = await supabase
      .from('push_subscriptions')
      .select('token')
      .eq('user_id', notification.user_id)
      .single()

    if (!subscription || !subscription.token) {
      return new Response("User has no push subscription", { status: 200 })
    }

    // 3. Get Firebase OAuth2 Access Token
    const accessToken = await getAccessToken()

    // 4. Construct the FCM HTTP v1 API payload
    const fcmMessage = {
      message: {
        token: subscription.token,
        notification: {
          title: notification.title,
          body: notification.message,
        },
        webpush: {
          fcm_options: {
            link: notification.link || 'https://growbro.app'
          }
        }
      }
    }

    // 5. Send the push notification via Firebase
    const response = await fetch(
      `https://fcm.googleapis.com/v1/projects/${FIREBASE_SERVICE_ACCOUNT.project_id}/messages:send`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fcmMessage),
      }
    )

    const responseData = await response.json()

    if (!response.ok) {
      throw new Error(`FCM Error: ${JSON.stringify(responseData)}`)
    }

    return new Response(JSON.stringify({ success: true, data: responseData }), {
      headers: { "Content-Type": "application/json" },
    })

  } catch (error: any) {
    console.error('Error sending push notification:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
})
