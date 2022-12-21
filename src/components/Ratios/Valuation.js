import React from "react";
import Table from "../Table";

export default function Valuation(props){
    const {apiData} = props;
    const pageName="Valuation";
    const colData = [
        {field: 'Year'},
        {field: 'PE'},
        {field: 'PBV'},
        {field: 'PS'},

    ];
    const reqData = apiData.map((el, i) => {
        return {
            Year: (el.calendarYear),
            PE: el.priceEarningsRatio.toFixed(2),
            PBV: el.priceBookValueRatio.toFixed(2),
            PS: el.priceToSalesRatio.toFixed(2),
        }
    })

    return(
            <Table apiData={apiData} reqData={reqData} colData={colData} pageName={pageName}/>
    )
}