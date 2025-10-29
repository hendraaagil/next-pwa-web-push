'use client'

import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window),
    )

    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)

    // Listen for the beforeinstallprompt event (Chrome, Edge, etc.)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      )
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return
    }

    // Show the install prompt
    deferredPrompt.prompt()

    // Wait for the user to respond
    const { outcome } = await deferredPrompt.userChoice
    console.log(`User response: ${outcome}`)

    // Track if user accepted the install
    if (outcome === 'accepted') {
      localStorage.setItem('app-installed', 'true')
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null)
  }

  if (isStandalone || localStorage.getItem('app-installed') === 'true') {
    return null // Don't show install button if already installed
  }

  const showInstallButton = !!deferredPrompt
  const showIOSInstructions = isIOS && !deferredPrompt

  return (
    <div className="flex flex-col gap-2">
      <h3>Install App</h3>

      {showInstallButton && (
        <button onClick={handleInstallClick}>Add to Home Screen</button>
      )}

      {showIOSInstructions && (
        <>
          <button disabled>Add to Home Screen</button>
          <p className="text-sm">
            To install this app on your iOS device, tap the share button
            <span role="img" aria-label="share icon">
              {' '}
              ⎋{' '}
            </span>
            and then &quot;Add to Home Screen&quot;
            <span role="img" aria-label="plus icon">
              {' '}
              ➕{' '}
            </span>
            .
          </p>
        </>
      )}
    </div>
  )
}
