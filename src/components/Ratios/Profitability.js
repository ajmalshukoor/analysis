import React from "react";
import Table from "../Table";

export default function Profitability(props){
    const {apiData} = props;
    const pageName="Profitability";
    
    const colData = [
        {field: 'Year'},
        {field: 'Revenue'},
        {field: 'PAT'},
        {field: 'PATMargin'},
        {field: 'EPS'},
        {field: 'GrossMargin'},
    ];

    const reqData = apiData.map((el, i) => {
        return {
            Year: (el.calendarYear),
            Revenue: (el.revenue/1000000000).toFixed(2)+" B",
            PAT: (el.netIncome/1000000000).toFixed(2)+" B",
            EPS: el.eps.toFixed(2),
            GrossMargin: el.grossProfitMargin.toFixed(2),
            PATMargin: el.netProfitMargin.toFixed(2),
        }
    })

    return(
            <Table apiData={apiData} reqData={reqData} colData={colData} pageName={pageName}/>
    )
}