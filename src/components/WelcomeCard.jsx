import { cn } from '../utils/cn'

export function WelcomeCard({ count, onIncrement, serviceStatus }) {
  return (
    <section
      className={cn(
        'rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 shadow-xl shadow-black/20',
        'ring-1 ring-white/5',
      )}
    >
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-50">
        Welcome
      </h1>
      <p className="mt-3 text-pretty text-zinc-400">
        Functional components, hooks, and Tailwind. Folders:{' '}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm text-violet-300">
          components
        </code>
        ,{' '}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm text-violet-300">
          services
        </code>
        ,{' '}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm text-violet-300">
          utils
        </code>
        .
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onIncrement}
          className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
        >
          Count is {count}
        </button>
        <span className="text-sm text-zinc-500">
          Service check:{' '}
          <span className="font-medium text-zinc-300">{serviceStatus}</span>
        </span>
      </div>
    </section>
  )
}
