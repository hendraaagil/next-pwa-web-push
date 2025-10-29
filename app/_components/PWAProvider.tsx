import InstallPrompt from './InstallPrompt'
import PushNotificationManager from './PushNotificationManager'

export default function PWAProvider() {
  return (
    <>
      <PushNotificationManager />
      <InstallPrompt />
    </>
  )
}
