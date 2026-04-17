/**
 * @typedef {{ profits: number, losses: number }} CapitalBucket
 * @typedef {{ stcg: CapitalBucket, ltcg: CapitalBucket }} CapitalGainsState
 */

/**
 * @typedef {{ symbol: string, stcg_gain: number, ltcg_gain: number }} HarvestableHolding
 */

/**
 * Business rule: gain &gt; 0 increases profits; gain &lt; 0 increases losses (magnitude).
 * gain === 0 adds nothing.
 * @param {number} gain
 * @returns {{ toProfits: number, toLosses: number }}
 */
function partitionGain(gain) {
  const g = Number(gain)
  if (g > 0) return { toProfits: g, toLosses: 0 }
  if (g < 0) return { toProfits: 0, toLosses: -g }
  return { toProfits: 0, toLosses: 0 }
}

/**
 * Sum contributions from selected holdings: positive gain → profits, negative → losses.
 * @param {HarvestableHolding[]} holdings
 * @param {string[]} selectedSymbols
 */
export function aggregateHarvestDeltas(holdings, selectedSymbols) {
  const selected = new Set(selectedSymbols)
  let stProf = 0
  let stLoss = 0
  let ltProf = 0
  let ltLoss = 0

  for (const h of holdings) {
    if (!selected.has(h.symbol)) continue

    const st = partitionGain(h.stcg_gain)
    stProf += st.toProfits
    stLoss += st.toLosses

    const lt = partitionGain(h.ltcg_gain)
    ltProf += lt.toProfits
    ltLoss += lt.toLosses
  }

  return { stProf, stLoss, ltProf, ltLoss }
}

/**
 * Apply realised harvest deltas to a pre-harvest capital-gains snapshot.
 * @param {CapitalGainsState} pre
 * @param {{ stProf: number, stLoss: number, ltProf: number, ltLoss: number }} deltas
 * @returns {CapitalGainsState}
 */
export function applyHarvestToCapital(pre, deltas) {
  return {
    stcg: {
      profits: pre.stcg.profits + deltas.stProf,
      losses: pre.stcg.losses + deltas.stLoss,
    },
    ltcg: {
      profits: pre.ltcg.profits + deltas.ltProf,
      losses: pre.ltcg.losses + deltas.ltLoss,
    },
  }
}
