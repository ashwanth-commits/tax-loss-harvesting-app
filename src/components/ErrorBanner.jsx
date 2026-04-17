export function ErrorBanner({ message, onRetry }) {
  return (
    <div
      className="animate-fade-in-up mx-auto max-w-lg rounded-2xl border border-rose-500/35 bg-rose-500/10 p-6 shadow-xl shadow-rose-950/20 ring-1 ring-rose-400/20"
      role="alert"
    >
      <h2 className="text-sm font-semibold text-rose-100">Something went wrong</h2>
      <p className="mt-2 text-sm leading-relaxed text-rose-200/80">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-5 rounded-lg bg-rose-500/20 px-4 py-2.5 text-sm font-semibold text-rose-100 ring-1 ring-rose-400/40 transition hover:bg-rose-500/30 hover:ring-rose-400/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
      >
        Try again
      </button>
    </div>
  )
}
