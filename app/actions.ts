'use server'

import webpush, { PushSubscription as WebPushSubscription } from 'web-push'

webpush.setVapidDetails(
  'mailto:hi@hndr.xyz',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
)

let subscriptions: WebPushSubscription[] = []

export async function subscribeUser(sub: PushSubscription) {
  const webPushSub = sub as unknown as WebPushSubscription

  // Check if subscription already exists (avoid duplicates)
  const exists = subscriptions.some((s) => s.endpoint === webPushSub.endpoint)

  if (!exists) {
    subscriptions.push(webPushSub)
  }

  // In a production environment, you would want to store the subscription in a database
  // For example: await db.subscriptions.create({ data: sub })
  return { success: true }
}

export async function unsubscribeUser() {
  // Remove the last subscription (simplified - in production, identify by user ID)
  subscriptions = []
  // In a production environment, you would want to remove the subscription from the database
  // For example: await db.subscriptions.delete({ where: { ... } })
  return { success: true }
}

export async function sendNotification(message: string) {
  if (subscriptions.length === 0) {
    throw new Error('No subscriptions available')
  }

  try {
    // Send notification to all subscribed users
    const results = await Promise.allSettled(
      subscriptions.map((subscription) =>
        webpush.sendNotification(
          subscription,
          JSON.stringify({
            title: 'Demo PWA Notification',
            body: message,
            icon: '/icon1.png',
          }),
        ),
      ),
    )

    // Filter out failed subscriptions (e.g., expired or uninstalled)
    const failedEndpoints = results
      .map((result, index) =>
        result.status === 'rejected' ? subscriptions[index].endpoint : null,
      )
      .filter(Boolean)

    // Remove failed subscriptions
    if (failedEndpoints.length > 0) {
      subscriptions = subscriptions.filter(
        (sub) => !failedEndpoints.includes(sub.endpoint),
      )
    }

    return { success: true }
  } catch (error) {
    console.error('Error sending push notification:', error)
    return { success: false, error: 'Failed to send notification' }
  }
}
