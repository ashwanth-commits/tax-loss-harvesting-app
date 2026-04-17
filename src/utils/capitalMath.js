/**
 * @typedef {{ profits: number, losses: number }} CapitalBucket
 * @typedef {{ stcg: CapitalBucket, ltcg: CapitalBucket }} CapitalGainsState
 */

/**
 * Bottom-line realised capital gains (ST net + LT net), same as card footers.
 * @param {CapitalGainsState} data
 */
export function totalNetRealisedGains(data) {
  const st = data.stcg.profits - data.stcg.losses
  const lt = data.ltcg.profits - data.ltcg.losses
  return st + lt
}
