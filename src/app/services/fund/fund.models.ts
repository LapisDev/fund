export interface FundInfo {
  code: string,
  name: string,
  type: string
}

export interface FundSummary {
  code: string,
  name: string,
  type: string,
  imputedPrice: number,
  imputedIncrease: number,
  price: number,
  date: string,
  increase: number
}

export interface FundDetail {
  code: string,
  name: string,
  accNetValue?: { name: string, data: [number, number][] }[],
  totalGrand?: { name: string, data: [number, number][] }[],
  sevenDaysYearIncome?: { name: string, data: [number, number][] }[]
}