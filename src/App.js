import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ValueContext } from "./components/Context/Context";
import { API_KEY } from "./token";
import Form from "./components/Form/Form";
import Profitability from "./components/Ratios/Profitability";
import Valuation from "./components/Ratios/Valuation";
import Operational from "./components/Ratios/Operational";
import Leverage from "./components/Ratios/Leverage";
import AllRatios from "./components/AllRatios";
import Overview from "./components/Overview";
import NavBar from "./components/Nav/NavBar";
import "./App.css";


export default function App(){
  //This val is for context from search input in navbar
  const [val, setVal] = useState("RCI");
  //save data from api and pass it to the other components
  const [resData, setResData] = useState([]);
  //not the useCallback hook, just a state made for an adjustment in sending data
  const [callBack, setCallBack] = useState(false);

  //chained two api to recieve data 
  useEffect(()=>{
    fetch(`https://fmpcloud.io/api/v3/income-statement/${val}?limit=40&apikey=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
          // const data = Object.entries(apiData).map(el =>el[1])
          fetch(`https://fmpcloud.io/api/v3/ratios/${val}?limit=40&apikey=${API_KEY}`)
          .then(diffRes => diffRes.json())
          .then(diffData => {
            const arr = data.map((el,i) => ({...el,...diffData[i]}))
            setResData(arr);
            setCallBack(true);
          })
        })
        setInterval(setCallBack(false), 1000)
  }, [val])

  if(callBack) {
  return(
    <>
    <div>
    <Router>
    <div className="App">
      <ValueContext.Provider value={{val, setVal}}>
        <NavBar/>
        <Routes>
          <Route path="/"  exact element={<Overview/>}/>
          <Route path="/form"  exact element={<Form/>}/>
          <Route path="/allRatios" element={<AllRatios apiData={resData}/>}/>
          <Route path="/operational" element={<Operational apiData={resData}/>}/>
          <Route path="/valuation" element={<Valuation apiData={resData}/>}/>
          <Route path="/profitability" element={<Profitability apiData={resData}/>}/>
          <Route path="/leverage" element={<Leverage apiData={resData}/>}/>
        </Routes>
      </ValueContext.Provider>
    </div>
    </Router>
    </div>
    </>
  )
  }

}
