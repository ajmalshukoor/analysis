export function sliceArr(param){
    return param.slice(0,5).map(el => el.v)
}

export const profitKeys = 
{
    Year: "calendarYear",
    Revenue: "revenue",
    EPS: "eps",
    GrossMargin: "grossProfitMargin",
    PAT: "netIncome",
    PATMargin: "netProfitMargin",
    EBITA: "ebitda",
    ROE: "returnOnEquity",
    ROA: "returnOnAssets",
};

// EbtPerEbit: ebtPerEbit,
// InterestCoverage: interestCoverage,
// AssetTurnover: assetTurnover,
// DebtToEqutiy: debtEquityRatio,
// DebtToAsset:"",
// FinancialLeverage:"",