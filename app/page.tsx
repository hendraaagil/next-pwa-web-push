import PWAProvider from './_components/PWAProvider'

export default function Home() {
  return (
    <div className="flex min-h-dvh items-center bg-slate-200 font-sans">
      <main className="flex w-full max-w-3xl mx-auto gap-8 flex-col justify-between py-16 px-8">
        <h1 className="text-3xl font-semibold leading-10 tracking-tight text-slate-900">
          This is a demo PWA app
        </h1>
        <PWAProvider />
      </main>
    </div>
  )
}
