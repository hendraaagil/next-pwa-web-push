# Next.js PWA with Web Push Notifications

A Progressive Web App (PWA) built with Next.js that demonstrates installable web applications and web push notifications. This project showcases how to create a modern PWA with home screen installation and push notifications without requiring native mobile apps.

## Features

- **Progressive Web App (PWA)**: Installable on desktop and mobile devices
- **Web Push Notifications**: Send notifications to users even when the app is closed
- **Service Worker**: Background script for handling push events
- **VAPID Authentication**: Secure push notifications using Voluntary Application Server Identification
- **Cross-platform**: Works on Chrome, Edge, Firefox, Safari, and Brave (with opt-in)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Bun package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/hendraaagil/next-pwa-web-push.git
cd next-pwa-web-push
```

2. Install dependencies:

```bash
bun install
```

3. Generate VAPID keys for web push:

```bash
bun -e "console.log(require('web-push').generateVAPIDKeys())"
```

4. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_public_key_here
VAPID_PRIVATE_KEY=your_private_key_here
```

5. Run the development server:

```bash
bun dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Important Notes

- **HTTPS Required**: Web push notifications only work on HTTPS or localhost
- **Brave Browser**: Users need to enable "Use Google services for push messaging" in settings
- **iOS**: Manual installation via Safari's share button (no programmatic prompt available)

## Project Structure

```
app/
├── _components/
│   ├── InstallPrompt.tsx       # PWA installation UI
│   ├── PushNotificationManager.tsx  # Push notification handling
│   └── PWAProvider.tsx         # Combines PWA features
├── actions.ts                  # Server actions for push notifications
├── layout.tsx                  # Root layout
├── manifest.ts                 # PWA manifest configuration
└── page.tsx                    # Home page
public/
└── sw.js                       # Service worker for push events
```

## How It Works

1. **PWA Installation**: Browser detects the manifest and shows an install prompt
2. **Push Subscription**: User grants permission and receives a unique subscription object
3. **Server Storage**: Subscription is stored (currently in memory, use a database for production)
4. **Sending Notifications**: Server uses the subscription to send push notifications via browser push services
5. **Service Worker**: Receives push events and displays notifications

## License

MIT
