/**
 * @typedef {{ profits: number, losses: number }} CapitalBucket
 * @typedef {{ stcg: CapitalBucket, ltcg: CapitalBucket }} AfterHarvestData
 */

import { formatInr } from '../utils/format'

function netCapitalGains(bucket) {
  return bucket.profits - bucket.losses
}

function signedValueClass(n) {
  if (n > 0)
    return 'font-bold tabular-nums text-emerald-300 drop-shadow-[0_0_12px_rgba(110,231,183,0.4)]'
  if (n < 0)
    return 'font-bold tabular-nums text-rose-300 drop-shadow-[0_0_12px_rgba(253,164,175,0.4)]'
  return 'font-bold tabular-nums text-sky-100'
}

/**
 * @param {{ data: AfterHarvestData }} props
 */
export function AfterHarvestCard({ data }) {
  const stNet = netCapitalGains(data.stcg)
  const ltNet = netCapitalGains(data.ltcg)
  const realised = stNet + ltNet

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-sky-500/30 bg-gradient-to-br from-sky-500/20 via-blue-600/30 to-blue-950/95 p-6 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.65),0_0_0_1px_rgba(56,189,248,0.12),inset_0_1px_0_0_rgba(255,255,255,0.08)] ring-1 ring-inset ring-sky-400/10 transition-all duration-200 ease-out motion-safe:hover:scale-[1.01] motion-safe:hover:shadow-[0_28px_70px_-15px_rgba(15,23,42,0.7),0_0_0_1px_rgba(56,189,248,0.2),0_0_55px_-10px_rgba(56,189,248,0.25)] sm:p-8 lg:p-9">
      <div
        className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-sky-400/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-28 left-1/4 h-48 w-48 rounded-full bg-indigo-500/15 blur-3xl"
        aria-hidden
      />

      <header className="relative flex items-start justify-between gap-4 border-b border-sky-400/25 pb-5">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-sky-50 sm:text-xl">
            After harvest
          </h2>
          <p className="mt-1.5 text-[13px] leading-relaxed text-sky-200/65">
            Includes realised impact of selected holdings
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-sky-400/35 bg-sky-500/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-sky-100">
          After
        </span>
      </header>

      <div className="relative mt-6 overflow-x-auto">
        <table className="w-full min-w-[280px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="pb-3 pr-4 text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-200/45" />
              <th className="pb-3 px-3 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-200/70">
                Short-term
              </th>
              <th className="pb-3 pl-3 text-right text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-200/70">
                Long-term
              </th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            <tr className="border-t border-sky-400/20">
              <th
                scope="row"
                className="py-3.5 pr-4 text-left text-xs font-medium text-sky-200/60"
              >
                Profits
              </th>
              <td className="px-3 py-3.5 text-right font-semibold text-sky-50">
                {formatInr(data.stcg.profits)}
              </td>
              <td className="pl-3 py-3.5 text-right font-semibold text-sky-50">
                {formatInr(data.ltcg.profits)}
              </td>
            </tr>
            <tr className="border-t border-sky-400/20">
              <th
                scope="row"
                className="py-3.5 pr-4 text-left text-xs font-medium text-sky-200/60"
              >
                Losses
              </th>
              <td className="px-3 py-3.5 text-right font-semibold text-sky-50">
                {formatInr(data.stcg.losses)}
              </td>
              <td className="pl-3 py-3.5 text-right font-semibold text-sky-50">
                {formatInr(data.ltcg.losses)}
              </td>
            </tr>
            <tr className="border-t border-sky-400/30 bg-blue-950/40">
              <th
                scope="row"
                className="py-3.5 pr-4 text-left text-xs font-semibold text-sky-100/90"
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

      <footer className="relative mt-6 border-t border-sky-400/25 pt-5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-200/55">
            Realised capital gains
          </span>
          <span className={`text-xl font-bold tracking-tight tabular-nums sm:text-2xl ${signedValueClass(realised)}`}>
            {formatInr(realised)}
          </span>
        </div>
        <p className="mt-2 text-xs text-sky-200/45">
          Sum of short-term and long-term net figures
        </p>
      </footer>
    </article>
  )
}
