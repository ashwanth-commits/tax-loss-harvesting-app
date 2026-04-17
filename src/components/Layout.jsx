import { useEffect, useId, useState } from 'react'

export function Layout({ children }) {
  const [howItWorksOpen, setHowItWorksOpen] = useState(false)
  const dialogTitleId = useId()

  useEffect(() => {
    if (!howItWorksOpen) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setHowItWorksOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [howItWorksOpen])

  return (
    <div className="min-h-svh bg-zinc-950 font-sans text-zinc-100 antialiased">
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(56,189,248,0.12),transparent),radial-gradient(ellipse_60%_40%_at_100%_0%,rgba(99,102,241,0.08),transparent)]"
        aria-hidden
      />
      <header className="sticky top-0 z-10 border-b border-zinc-800/70 bg-zinc-950/85 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-shadow duration-200 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400/50 to-blue-600/55 text-xs font-bold leading-none text-white shadow-[0_0_24px_-4px_rgba(56,189,248,0.45)] ring-1 ring-sky-400/35 transition-transform duration-200 motion-safe:hover:scale-105 sm:h-11 sm:w-11"
              aria-hidden
            >
              TO
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5 sm:gap-x-5">
                <span className="bg-gradient-to-r from-zinc-100 via-white to-sky-200/90 bg-clip-text text-2xl font-bold tracking-tight text-transparent drop-shadow-[0_0_28px_rgba(56,189,248,0.15)] sm:text-3xl md:text-4xl">
                  Tax optimization
                </span>
                <button
                  type="button"
                  onClick={() => setHowItWorksOpen(true)}
                  className="text-sm font-semibold text-sky-400 underline decoration-sky-400/50 underline-offset-[3px] transition duration-200 hover:text-sky-300 hover:decoration-sky-300 motion-safe:hover:translate-y-[-1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                >
                  How it works
                </button>
              </div>
              <span className="mt-1 block text-xs text-zinc-500 sm:text-[13px]">
                Model tax-loss harvesting before you trade
              </span>
            </div>
          </div>
          <span className="shrink-0 rounded-full border border-zinc-600/60 bg-zinc-900/70 px-3.5 py-1.5 text-xs font-semibold text-zinc-400 shadow-inner transition duration-200 hover:border-zinc-500 hover:text-zinc-300">
            Demo
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {children}
      </main>

      {howItWorksOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center sm:p-6"
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/65 backdrop-blur-[2px] transition-opacity"
            aria-label="Close how it works"
            onClick={() => setHowItWorksOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            className="relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-zinc-700/80 bg-zinc-900 p-5 shadow-2xl shadow-black/50 ring-1 ring-white/5 sm:p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <h2
                id={dialogTitleId}
                className="text-base font-semibold tracking-tight text-zinc-50"
              >
                How it works
              </h2>
              <button
                type="button"
                onClick={() => setHowItWorksOpen(false)}
                className="shrink-0 rounded-lg p-1.5 text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                aria-label="Close"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-400">
              <p className="text-zinc-300">
                <strong className="font-semibold text-zinc-200">Tax optimization</strong>{' '}
                helps you preview how selling selected holdings would move your{' '}
                <strong className="font-semibold text-zinc-200">
                  short-term and long-term capital gains
                </strong>{' '}
                before you place trades.
              </p>
              <ol className="list-decimal space-y-2 pl-4 marker:text-zinc-500">
                <li>
                  The <strong className="font-medium text-zinc-300">Pre harvest</strong> card
                  shows your current realised ST/LT profits and losses.
                </li>
                <li>
                  Tick holdings you might sell. Each lot&apos;s ST/LT gain is added to{' '}
                  <strong className="font-medium text-zinc-300">profits</strong> if positive or{' '}
                  <strong className="font-medium text-zinc-300">losses</strong> if negative.
                </li>
                <li>
                  The <strong className="font-medium text-zinc-300">After harvest</strong> card
                  updates instantly with the combined picture.
                </li>
                <li>
                  If your net realised position improves (pre minus post is positive), we show{' '}
                  <strong className="font-medium text-emerald-400">You&apos;re going to save ₹X</strong>{' '}
                  using that difference—this demo is illustrative, not tax advice.
                </li>
              </ol>
              <p className="text-xs text-zinc-500">
                Consult a qualified tax professional before making investment or filing
                decisions.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
