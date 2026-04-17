/**
 * @typedef {{ profits: number, losses: number }} CapitalBucket
 * @typedef {{ stcg: CapitalBucket, ltcg: CapitalBucket }} PreHarvestData
 */

import { formatInr } from '../utils/format'

function netCapitalGains(bucket) {
  return bucket.profits - bucket.losses
}

function signedValueClass(n) {
  if (n > 0)
    return 'font-bold tabular-nums text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.35)]'
  if (n < 0)
    return 'font-bold tabular-nums text-rose-400 drop-shadow-[0_0_12px_rgba(251,113,133,0.35)]'
  return 'font-bold tabular-nums text-zinc-300'
}

/**
 * @param {{ data: PreHarvestData }} props
 */
export function PreHarvestCard({ data }) {
  const stNet = netCapitalGains(data.stcg)
  const ltNet = netCapitalGains(data.ltcg)
  const realised = stNet + ltNet

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-700/40 bg-gradient-to-br from-zinc-800/50 via-zinc-900/92 to-zinc-950 p-6 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_0_rgba(255,255,255,0.06)] ring-1 ring-inset ring-white/[0.04] transition-all duration-200 ease-out motion-safe:hover:scale-[1.01] motion-safe:hover:shadow-[0_28px_70px_-15px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.08),0_0_50px_-12px_rgba(113,113,122,0.25)] sm:p-8 lg:p-9">
      <div
        className="pointer-events-none absolute -left-24 top-0 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-emerald-500/5 blur-3xl"
        aria-hidden
      />

      <header className="relative flex items-start justify-between gap-4 border-b border-zinc-700/50 pb-5">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-zinc-50 sm:text-xl">
            Pre harvest
          </h2>
          <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-500">
            Short-term vs long-term capital flows
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-zinc-600/50 bg-zinc-800/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
          Before
        </span>
      </header>

      <div className="relative mt-6 overflow-x-auto">
        <table className="w-full min-w-[280px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="pb-3 pr-4 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500" />
              <th className="pb-3 px-3 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                Short-term
              </th>
              <th className="pb-3 pl-3 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                Long-term
              </th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            <tr className="border-t border-zinc-800/60">
              <th
                scope="row"
                className="py-3.5 pr-4 text-left text-xs font-medium text-zinc-500"
              >
                Profits
              </th>
              <td className="px-3 py-3.5 text-right font-semibold text-zinc-200">
                {formatInr(data.stcg.profits)}
              </td>
              <td className="pl-3 py-3.5 text-right font-semibold text-zinc-200">
                {formatInr(data.ltcg.profits)}
              </td>
            </tr>
            <tr className="border-t border-zinc-800/60">
              <th
                scope="row"
                className="py-3.5 pr-4 text-left text-xs font-medium text-zinc-500"
              >
                Losses
              </th>
              <td className="px-3 py-3.5 text-right font-semibold text-zinc-200">
                {formatInr(data.stcg.losses)}
              </td>
              <td className="pl-3 py-3.5 text-right font-semibold text-zinc-200">
                {formatInr(data.ltcg.losses)}
              </td>
            </tr>
            <tr className="border-t border-zinc-700/60 bg-zinc-950/50">
              <th
                scope="row"
                className="py-3.5 pr-4 text-left text-xs font-semibold text-zinc-400"
              >
                Net capital gains
              </th>
              <td className={`px-3 py-3.5 text-right text-sm ${signedValueClass(stNet)}`}>
                {formatInr(stNet)}
              </td>
              <td className={`pl-3 py-3.5 text-right text-sm ${signedValueClass(ltNet)}`}>
                {formatInr(ltNet)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <footer className="relative mt-6 border-t border-zinc-700/50 pt-5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
            Realised capital gains
          </span>
          <span className={`text-xl font-bold tracking-tight tabular-nums sm:text-2xl ${signedValueClass(realised)}`}>
            {formatInr(realised)}
          </span>
        </div>
        <p className="mt-2 text-xs text-zinc-600">
          Sum of short-term and long-term net figures
        </p>
      </footer>
    </article>
  )
}
