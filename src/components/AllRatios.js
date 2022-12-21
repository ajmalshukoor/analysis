import React from "react";
import Profitability from "./Ratios/Profitability";
import Valuation from "./Ratios/Valuation";
import Operational from "./Ratios/Operational";
import Leverage from "./Ratios/Leverage";
export default function AllRatios(props){
    const {apiData} = props
    return(
        <>
            <Profitability apiData = {apiData}/>
            <Leverage apiData = {apiData}/>
            <Valuation apiData = {apiData}/>
            <Operational apiData = {apiData}/>
        </>
    )
}