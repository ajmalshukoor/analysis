import React, {useState, useEffect, useContext} from "react";
import { ValueContext } from "./Context/Context";
import { API_KEY } from "../token";


export default function Overview(props){
    const {val} = useContext(ValueContext)
    const [resData, setResData] = useState("");

    useEffect(()=>{
        fetch(`https://fmpcloud.io/api/v3/quote/${val}?apikey=${API_KEY}`)
        .then(res => res.json())
        .then(data =>{
            setResData(data)
        })
    },[val])
    console.log(resData)
    // https://fmpcloud.io/api/v3/quote/AAPL?apikey=f3dffc4ffe756720fa1328f2f35ed378
    if(resData != ""){
        const {name, symbol, price, volume, yearHigh, yearLow} = resData[0]
    return(
            <div className="card">
                <h1>{name}</h1>
                <div className="card--content">
                    <p>Symbol      : {symbol}</p>
                    <p>Stock Price : {price}</p>
                    <p>Volume      : {volume}</p>
                    <p>Year High   : {yearHigh}</p>
                    <p>Year Low    : {yearLow}</p>
                </div>
            </div>
    )
    }
}