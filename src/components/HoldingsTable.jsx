import { useEffect, useRef } from 'react'
import { formatInr, formatShares } from '../utils/format'

const checkboxClass =
  'size-4 shrink-0 cursor-pointer rounded-md border-2 border-zinc-600/90 bg-zinc-900/90 text-violet-500 accent-violet-500 shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)] transition-all duration-200 hover:border-zinc-500 hover:shadow-[inset_0_1px_2px_rgba(0,0,0,0.25),0_0_0_1px_rgba(139,92,246,0.2)] focus:ring-2 focus:ring-violet-500/40 focus:ring-offset-2 focus:ring-offset-zinc-950 checked:border-violet-500/60 checked:bg-violet-500/15'

function gainClass(n) {
  if (n > 0)
    return 'font-semibold tabular-nums text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]'
  if (n < 0)
    return 'font-semibold tabular-nums text-rose-400 drop-shadow-[0_0_8px_rgba(251,113,133,0.3)]'
  return 'font-semibold tabular-nums text-zinc-400'
}

/**
 * @param {{
 *   holdings: Array<{
 *     symbol: string
 *     name: string
 *     shares: number
 *     cost: number
 *     value: number
 *     unrealized: number
 *     stcg_gain: number
 *     ltcg_gain: number
 *     wash: string
 *   }>
 *   selectedAssets: string[]
 *   onToggleAsset: (symbol: string) => void
 *   onToggleSelectAll: () => void
 * }} props
 */
export function HoldingsTable({
  holdings,
  selectedAssets,
  onToggleAsset,
  onToggleSelectAll,
}) {
  const selectedSet = new Set(selectedAssets)
  const selectAllRef = useRef(null)

  const allSelected =
    holdings.length > 0 && selectedAssets.length === holdings.length
  const someSelected =
    selectedAssets.length > 0 && selectedAssets.length < holdings.length

  useEffect(() => {
    const el = selectAllRef.current
    if (el) el.indeterminate = someSelected
  }, [someSelected])

  return (
    <section
      aria-label="Holdings"
      className="rounded-3xl border border-zinc-700/40 bg-gradient-to-b from-zinc-900/50 to-zinc-950/80 shadow-[0_25px_50px_-20px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)] ring-1 ring-inset ring-white/[0.04] transition-shadow duration-200 hover:shadow-[0_28px_55px_-20px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.06)]"
    >
      <div className="flex flex-col gap-1.5 border-b border-zinc-800/80 px-5 py-5 sm:px-7 sm:py-6">
        <h2 className="text-base font-bold tracking-tight text-zinc-100 sm:text-lg">
          Holdings
        </h2>
        <p className="max-w-2xl text-[13px] leading-relaxed text-zinc-500">
          Select lots to model harvest impact. Amount to sell is the full position
          value when a row is selected.
        </p>
      </div>

      <div className="relative -mx-4 sm:mx-0">
        <div
          className="table-scroll max-h-[min(70vh,720px)] overflow-auto scroll-smooth px-4 pb-2 sm:max-h-none sm:px-0"
          tabIndex={0}
          role="region"
          aria-label="Holdings table, scroll horizontally on small screens"
        >
          <table className="w-full min-w-[58rem] border-collapse text-left text-sm">
            <thead>
              <tr className="sticky top-0 z-20 border-b border-zinc-700/80 bg-zinc-950/90 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.5)] backdrop-blur-md">
                <th className="w-12 px-3 py-3.5 sm:w-14 sm:px-4">
                  <input
                    ref={selectAllRef}
                    type="checkbox"
                    checked={allSelected}
                    onChange={onToggleSelectAll}
                    aria-label="Select all holdings"
                    className={checkboxClass}
                  />
                </th>
                <th className="px-3 py-3.5 text-left text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-300 sm:px-4">
                  Symbol
                </th>
                <th className="hidden px-3 py-3.5 text-left text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-300 sm:table-cell sm:px-4">
                  Name
                </th>
                <th className="px-3 py-3.5 text-right text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-300 sm:px-4">
                  Shares
                </th>
                <th className="px-3 py-3.5 text-right text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-300 sm:px-4">
                  Cost
                </th>
                <th className="px-3 py-3.5 text-right text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-300 sm:px-4">
                  Value
                </th>
                <th className="px-3 py-3.5 text-right text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-300 sm:px-4">
                  To sell
                </th>
                <th className="px-3 py-3.5 text-right text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-300 sm:px-4">
                  Unrealized
                </th>
                <th className="px-3 py-3.5 text-right text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-300 sm:px-4">
                  ST gain
                </th>
                <th className="px-3 py-3.5 text-right text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-300 sm:px-4">
                  LT gain
                </th>
                <th className="px-3 py-3.5 text-right text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-300 sm:px-4">
                  Wash
                </th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((row, index) => {
                const isSelected = selectedSet.has(row.symbol)
                const zebra = index % 2 === 0 ? 'bg-zinc-900/35' : 'bg-zinc-950/25'
                return (
                  <tr
                    key={row.symbol}
                    aria-selected={isSelected}
                    className={`group border-b border-zinc-800/50 transition-all duration-200 last:border-0 ${
                      isSelected
                        ? 'border-l-4 border-l-violet-400 bg-violet-500/[0.16] shadow-[inset_0_0_0_1px_rgba(139,92,246,0.25)] hover:bg-violet-500/[0.22]'
                        : `${zebra} border-l-4 border-l-transparent hover:bg-zinc-800/55`
                    }`}
                  >
                    <td className="px-3 py-3 align-middle sm:px-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleAsset(row.symbol)}
                        aria-label={`Include ${row.symbol} in harvest model`}
                        className={checkboxClass}
                      />
                    </td>
                    <td className="px-3 py-3.5 sm:px-4">
                      <span className="font-bold tabular-nums text-zinc-100 transition-colors duration-200 group-hover:text-white">
                        {row.symbol}
                      </span>
                      <span className="mt-0.5 block text-xs text-zinc-500 sm:hidden">
                        {row.name}
                      </span>
                    </td>
                    <td className="hidden px-3 py-3.5 text-zinc-400 sm:table-cell sm:px-4">
                      {row.name}
                    </td>
                    <td className="px-3 py-3.5 text-right tabular-nums text-zinc-300 sm:px-4">
                      {formatShares(row.shares)}
                    </td>
                    <td className="px-3 py-3.5 text-right tabular-nums text-zinc-300 sm:px-4">
                      {formatInr(row.cost)}
                    </td>
                    <td className="px-3 py-3.5 text-right tabular-nums text-zinc-300 sm:px-4">
                      {formatInr(row.value)}
                    </td>
                    <td
                      className={`px-3 py-3.5 text-right font-semibold tabular-nums transition-colors duration-200 sm:px-4 ${
                        isSelected
                          ? 'font-bold text-violet-200 drop-shadow-[0_0_10px_rgba(196,181,253,0.25)]'
                          : 'text-zinc-600'
                      }`}
                    >
                      {isSelected ? formatInr(row.value) : '—'}
                    </td>
                    <td
                      className={`px-3 py-3.5 text-right tabular-nums sm:px-4 ${
                        row.unrealized < 0
                          ? 'font-semibold text-rose-400 drop-shadow-[0_0_8px_rgba(251,113,133,0.25)]'
                          : 'font-semibold text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.25)]'
                      }`}
                    >
                      {formatInr(row.unrealized)}
                    </td>
                    <td
                      className={`px-3 py-3.5 text-right tabular-nums sm:px-4 ${gainClass(row.stcg_gain)}`}
                    >
                      {formatInr(row.stcg_gain)}
                    </td>
                    <td
                      className={`px-3 py-3.5 text-right tabular-nums sm:px-4 ${gainClass(row.ltcg_gain)}`}
                    >
                      {formatInr(row.ltcg_gain)}
                    </td>
                    <td className="px-3 py-3.5 text-right sm:px-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-transform duration-200 motion-safe:group-hover:scale-[1.03] ${
                          row.wash === 'Clear'
                            ? 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30'
                            : 'bg-amber-500/15 text-amber-200 ring-1 ring-amber-500/30'
                        }`}
                      >
                        {row.wash}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
