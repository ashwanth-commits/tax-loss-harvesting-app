import { HarvestSummaryCards } from './HarvestSummaryCards'
import { HoldingsTable } from './HoldingsTable'

export function TaxLossDashboard({
  preHarvestData,
  afterHarvestData,
  holdings,
  selectedAssets,
  onToggleAsset,
  onToggleSelectAll,
}) {
  return (
    <div className="w-full space-y-8 sm:space-y-10 lg:space-y-12">
      <header className="animate-fade-in-up border-b border-zinc-800/60 pb-8">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl">
          Tax loss harvesting
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-zinc-500">
          Select holdings to model realised short- and long-term capital flows.
          Estimates update instantly.
        </p>
      </header>

      <HarvestSummaryCards
        preHarvestData={preHarvestData}
        afterHarvestData={afterHarvestData}
      />

      <div
        className="h-px w-full bg-gradient-to-r from-transparent via-zinc-700/70 to-transparent"
        aria-hidden
      />

      <HoldingsTable
        holdings={holdings}
        selectedAssets={selectedAssets}
        onToggleAsset={onToggleAsset}
        onToggleSelectAll={onToggleSelectAll}
      />
    </div>
  )
}
