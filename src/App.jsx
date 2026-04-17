import { useCallback, useEffect, useMemo, useState } from 'react'
import { Layout } from './components/Layout'
import { TaxLossDashboard } from './components/TaxLossDashboard'
import { LoadingState } from './components/LoadingState'
import { ErrorBanner } from './components/ErrorBanner'
import { fetchTaxLossDashboardData } from './services/api'
import { aggregateHarvestDeltas, applyHarvestToCapital } from './utils/harvest'

function App() {
  const [capitalGainsPre, setCapitalGainsPre] = useState(null)
  const [holdings, setHoldings] = useState([])
  const [selectedAssets, setSelectedAssets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [loadAttempt, setLoadAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false

    fetchTaxLossDashboardData()
      .then((data) => {
        if (cancelled) return
        setCapitalGainsPre(data.capitalGains)
        setHoldings(data.holdings)
        setSelectedAssets([])
      })
      .catch((e) => {
        if (!cancelled) {
          setError(
            e instanceof Error ? e.message : 'Something went wrong. Please try again.',
          )
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [loadAttempt])

  const retry = useCallback(() => {
    setError(null)
    setLoading(true)
    setLoadAttempt((n) => n + 1)
  }, [])

  const allSymbols = useMemo(() => holdings.map((h) => h.symbol), [holdings])

  const toggleAsset = useCallback((symbol) => {
    setSelectedAssets((prev) =>
      prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol],
    )
  }, [])

  const toggleSelectAll = useCallback(() => {
    setSelectedAssets((prev) =>
      prev.length === allSymbols.length ? [] : [...allSymbols],
    )
  }, [allSymbols])

  /** Post-harvest snapshot: pre-harvest buckets + realised ST/LT from selected lots (live). */
  const afterHarvestData = useMemo(() => {
    if (!capitalGainsPre) return null
    const deltas = aggregateHarvestDeltas(holdings, selectedAssets)
    return applyHarvestToCapital(capitalGainsPre, deltas)
  }, [capitalGainsPre, holdings, selectedAssets])

  if (loading) {
    return (
      <Layout>
        <LoadingState />
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="flex min-h-[50vh] items-center justify-center px-4">
          <ErrorBanner message={error} onRetry={retry} />
        </div>
      </Layout>
    )
  }

  if (!capitalGainsPre || !afterHarvestData) {
    return (
      <Layout>
        <div className="flex min-h-[50vh] items-center justify-center px-4">
          <ErrorBanner
            message="Portfolio data is unavailable."
            onRetry={retry}
          />
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <TaxLossDashboard
        preHarvestData={capitalGainsPre}
        afterHarvestData={afterHarvestData}
        holdings={holdings}
        selectedAssets={selectedAssets}
        onToggleAsset={toggleAsset}
        onToggleSelectAll={toggleSelectAll}
      />
    </Layout>
  )
}

export default App
