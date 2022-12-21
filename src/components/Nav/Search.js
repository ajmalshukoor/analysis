import React, { useEffect, useState, useContext } from  "react";
import {ValueContext} from "../Context/Context";
import {API_KEY} from "../../token";

export default function Search(){
    //setVal is to update the value by passing current searchInput
    //used useState in App.js in order to make this change
    const {val, setVal} = useContext(ValueContext);
    const [searchInput, setSearchInput] = useState("");
    const [symbol, setSymbol] = useState([]);
    const search = document.querySelector('.search--input');
    
    function handleChange(event) {
        setSearchInput(event.target.value)
    }

    //By submitting the api calls and get data and setVal 
    function handleSubmit() {
            setVal(searchInput.toUpperCase())
            search.value = "";   
    }

    function handleErrorSubmit() {
            setSearchInput("Invalid Symbol...");
            search.style.color = "red";      
    }

    useEffect(()=>{
        fetch(`https://fmpcloud.io/api/v3/stock/list?apikey=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            setSymbol(data.map(sy => sy['symbol']))
        });
    }, [val])

    return(
        <>
        <div className="search content">
            <input type="search" className="search--input" value={searchInput} placeholder="Symbol" onChange={handleChange}/>
            <span type="submit" className="search--button fa fa-search" onClick={symbol.includes(searchInput.toUpperCase())?handleSubmit:handleErrorSubmit} ></span>
        </div>  
        </>      
    )
}

// const [symbolArr, setSymbolArr] = useState([]);

// const filter =  searchInput != "" ? symbolArr.flatMap(el => Object.keys(el)).map((v, i) => {
//         if( v.toUpperCase().indexOf(searchInput.toUpperCase()) > -1){
//         return v
//     } 
// }) : [];

// useEffect(()=>{
//             fetch(`https://fmpcloud.io/api/v3/stock/list?apikey=${API_KEY}`)
//             .then(res => res.json())
//             .then(data => {
//                 setSymbolArr(data.map(sy => {
//                     return {
//                     [sy['symbol']]: sy
//                     }
//                 }))
//             });

//         }, [val])
                    {/* <ul id="searchUL">
                        {
                        filter.filter(el => el !== undefined).slice(0,6).map(v => {
                                return <li >{v}</li>    
                        })
                        }
                    </ul> */}