import { AfterHarvestCard } from './AfterHarvestCard'
import { PreHarvestCard } from './PreHarvestCard'
import { totalNetRealisedGains } from '../utils/capitalMath'
import { formatInr } from '../utils/format'

export function HarvestSummaryCards({ preHarvestData, afterHarvestData }) {
  const preHarvestRealised = totalNetRealisedGains(preHarvestData)
  const postHarvestRealised = totalNetRealisedGains(afterHarvestData)
  const savings = preHarvestRealised - postHarvestRealised

  return (
    <section
      aria-label="Harvesting summary"
      className="stagger-harvest grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 md:items-stretch lg:gap-10"
    >
      <div className="animate-fade-in-up h-full">
        <PreHarvestCard data={preHarvestData} />
      </div>
      <div className="animate-fade-in-up flex h-full flex-col gap-4">
        <AfterHarvestCard data={afterHarvestData} />
        {savings > 0 ? (
          <p
            className="text-center text-sm font-bold text-emerald-400 drop-shadow-[0_0_14px_rgba(52,211,153,0.35)] transition-opacity duration-200 md:text-left md:text-base"
            role="status"
          >
            You&apos;re going to save {formatInr(savings)}
          </p>
        ) : null}
      </div>
    </section>
  )
}
