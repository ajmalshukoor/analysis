import React from "react";
import Table from "../Table";

export default function Leverage(props){
    const {apiData} = props;
    console.log(apiData)
    const pageName = "Leverage";
    const colData = [
        {field: 'Year'},
        {field: 'InterestCoverage'},
        {field: 'DebtToEqutiy'},
        {field: 'DebtToAsset'},
        {field: 'FinancialLeverage'},
    ];
    const reqData = apiData.map((el, i) => {
        return{
            Year: (el.calendarYear),
            InterestCoverage: el.interestCoverage.toFixed(2),
            DebtToEqutiy: el.debtEquityRatio.toFixed(2),
            DebtToAsset: el.debtRatio.toFixed(2),
            FinancialLeverage: (el.debtEquityRatio/el.debtRatio).toFixed(2),
        }
    })

    return(
            <Table apiData={apiData} reqData={reqData} colData={colData} pageName={pageName}/>
    )
}