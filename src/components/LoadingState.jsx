export function LoadingState({ label = 'Loading your portfolio…' }) {
  return (
    <div
      className="flex min-h-[50vh] flex-col items-center justify-center gap-5 px-4 py-16"
      role="status"
      aria-live="polite"
    >
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-2 border-zinc-700" />
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-emerald-400 border-r-emerald-400/40" />
      </div>
      <p className="text-sm font-medium text-zinc-400">{label}</p>
    </div>
  )
}
