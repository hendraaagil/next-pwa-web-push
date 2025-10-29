import InstallPrompt from './InstallPrompt'
import PushNotificationManager from './PushNotificationManager'

export default function PWAProvider() {
  return (
    <div className="flex w-full max-w-3xl gap-4 flex-col">
      <PushNotificationManager />
      <InstallPrompt />
    </div>
  )
}
