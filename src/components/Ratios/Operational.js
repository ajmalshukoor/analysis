import React from "react";
import Table from "../Table";

export default function Operational(props){
    const {apiData} = props;
    const pageName="Operational";
    const colData = [
        {field: 'Year'},
        {field: 'FixedAssetTurnover'},
        {field: 'TotalAssetTurnover'},
        {field: 'InventoryTurnover'},
        {field: 'DaysOfInventoryOutstanding'},
        {field: 'ReceivablesTurnover'},
        {field: 'DaysOfSalesOutstanding'},

    ];
    const reqData = apiData.map((el, i) => {
        return {
            Year: (el.calendarYear),
            FixedAssetTurnover: el.fixedAssetTurnover.toFixed(2),
            TotalAssetTurnover: el.assetTurnover.toFixed(2),
            InventoryTurnover: el.inventoryTurnover.toFixed(2),
            DaysOfInventoryOutstanding: el.daysOfInventoryOutstanding.toFixed(2),
            ReceivablesTurnover: el.receivablesTurnover.toFixed(2),
            DaysOfSalesOutstanding: el.daysOfSalesOutstanding.toFixed(2),
        }
    })

    return(
            <Table apiData={apiData} reqData={reqData} colData={colData} pageName={pageName}/>
    )
}