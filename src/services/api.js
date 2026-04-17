const DASHBOARD_SEED = {
  capitalGains: {
    stcg: { profits: 12_400, losses: 8_200 },
    ltcg: { profits: 26_800, losses: 31_500 },
  },
  holdings: [
    {
      symbol: 'VTI',
      name: 'Vanguard Total Stock',
      shares: 1240,
      cost: 298_400,
      value: 285_920,
      unrealized: -12_480,
      stcg_gain: -2_100,
      ltcg_gain: -10_380,
      wash: 'Clear',
    },
    {
      symbol: 'VXUS',
      name: 'Vanguard Total Intl',
      shares: 890,
      cost: 52_100,
      value: 48_230,
      unrealized: -3_870,
      stcg_gain: 800,
      ltcg_gain: -4_670,
      wash: 'Watch',
    },
    {
      symbol: 'BND',
      name: 'Vanguard Total Bond',
      shares: 2100,
      cost: 77_700,
      value: 76_050,
      unrealized: -1_650,
      stcg_gain: -400,
      ltcg_gain: -1_250,
      wash: 'Clear',
    },
  ],
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

/**
 * Mock portfolio fetch. Append `?mockError=1` to the URL to exercise error UI.
 */
export async function fetchTaxLossDashboardData() {
  await delay(750 + Math.random() * 400)

  if (
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('mockError') === '1'
  ) {
    throw new Error(
      'We could not load your portfolio. Check your connection and try again.',
    )
  }

  return {
    capitalGains: structuredClone(DASHBOARD_SEED.capitalGains),
    holdings: structuredClone(DASHBOARD_SEED.holdings),
  }
}
