import React, {useContext, useEffect, useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import {ValueContext} from "../Context/ValueContext"
import {API_KEY} from "../token"
import {profitKeys} from "../helper";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

export default function Ratios(){
    const [fullData, setFullData] = useState([]);
    const [filterInput, setFilterInput] = useState("");
    const [test, setTest] = useState([]);
    const colData = [
        {field: 'Date'},
        {field: 'Revenue'},
        {field: 'PAT'},
        {field: 'PATMargin'},
        {field: 'EPS'},
        {field: 'GrossMargin'},
    ];
    //used this context to get input value from search. Complicated!
    const {val} = useContext(ValueContext);
    //for add param input to show and hide
    const [addClicked, setAddClicked] = useState(false);
    //for remove param input to show and hide
    const [removeClicked, setRemoveClicked] = useState(false);
    //stores columns for AgGrid
    const [columnDefs, setColumnDefs] = useState(colData);
    //stores rows for AgGrid
    const [rowData, setRowData] = useState([]);

    function handleAddClick(){
        setAddClicked(!addClicked);
    }
    function handleRemoveClick(){
        setRemoveClicked(!removeClicked);
    }

    //when filtered parms clicked
    function handleLink(event){
        const linkVal = event.target.textContent
        const validator = columnDefs.map(el=>el['field'].indexOf(linkVal));
        setFilterInput("");

        if(addClicked){
            //check if the columns have the key already, if not proceed
            if(!validator.includes(0)){
                //rowData changes thus the table changes
                setRowData(prevData => {
                    return prevData.map((el,i) => {
                        const value = fullData[i][profitKeys[linkVal]]
                        return {
                            ...el,
                            [linkVal]: typeof value === "number"? value.toFixed(2): value,
                        }
                    })
                })
                //column changes thus the table changes
                setColumnDefs(prevData => {
                    return [...prevData, {field: linkVal}]
                }) 
            }
        }
        if(removeClicked){
            //column changes thus the table changes
            setColumnDefs(prevData => {
                //filter items filed is not equal to clicked
                return prevData.filter(el => el["field"] != linkVal);
            })
        }
    }

    function handleChange(event) {
        setFilterInput(event.target.value)
    }

    const additionalCol = columnDefs.filter(el => {
        if(!colData.map(i => i['field']).includes(el['field'])){
            return el
        }
    })
    //calls two apis for both incomestatement and ratios, chained
    useEffect(()=>{
        fetch(`https://fmpcloud.io/api/v3/key-metrics/${val}?limit=40&apikey=${API_KEY}`)
        .then(res1 => res1.json())
        .then(data1 => {
            fetch(`https://fmpcloud.io/api/v3/ratios/${val}?limit=40&apikey=${API_KEY}`)
            .then(res2 => res2.json())
            .then(data2 => {
                console.log(data2);
                if(additionalCol.length !==0){
                    additionalCol.forEach(col => {
                         data2.forEach((el, i) => {
                         const value = fullData[i][profitKeys[col['field']]]
                         setRowData
                         (prevData =>{
                                return(
                                    [...prevData,
                                    {
                                        Date: el.date,
                                        Revenue: (data1[i].revenue/1000000000).toFixed(2)+" B",
                                        PAT: ((data1[i]).netIncome/1000000000).toFixed(2)+" B",
                                        EPS: data1[i].eps.toFixed(2),
                                        GrossMargin: el.grossProfitMargin.toFixed(2),
                                        PATMargin: el.netProfitMargin.toFixed(2),
                                        [col['field']]: typeof value === "number"? value.toFixed(2): value,
                                    }
                                    ]
                                )
                            })

                        })
                        console.log("req", rowData)
                    })

                }
                if(additionalCol.length ===0){
                    const reqData = data2.map((el, i) => {
                        return{
                            Date: el.date,
                            Revenue: (data1[i].revenue/1000000000).toFixed(2)+" B",
                            PAT: ((data1[i]).netIncome/1000000000).toFixed(2)+" B",
                            EPS: data1[i].eps.toFixed(2),
                            GrossMargin: el.grossProfitMargin.toFixed(2),
                            PATMargin: el.netProfitMargin.toFixed(2),
                        }
                    })
                    setRowData(reqData);
                }
                setFullData(data2);
            })
        });
    }, [val])

    //change values in the added columns when submit new symbol request
    useEffect(()=>{
        //reset to default values in the table columns when new symbol called
        // setColumnDefs(colData);
        
    }, [val])

    //related to AgGrid
    const  defaultColDef = {
        flex: 1,
        minWidth: 100,
        sortable: true,
        filter: true,
      }
    const setWidth = columnDefs.length <=7 ? String(columnDefs.length*13)+"%": "95%";

    return(
        <div className="grid ag-theme-balham-dark"  style={{width:setWidth}}>
            <h3 className="page-head">Ratios</h3>
            <div className="tableBtns">
                <button className="add" onClick={handleAddClick} disabled={removeClicked}>Add Param</button>
                <button className="add" onClick={handleRemoveClick} disabled={addClicked}>Remove Param</button>
            </div>
            <AgGridReact
                domLayout='autoHeight'
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
            />
            <input type="text" placeholder="type keyword.." className={addClicked ? "filter": "hide"} value={filterInput} onChange={handleChange}></input>
            <input type="text" placeholder="type keyword.." className={removeClicked ? "filter": "hide"} value={filterInput} onChange={handleChange}></input>
            <ul id="myUL">
                {
                    Object.keys(profitKeys).map(el => {
                        if(filterInput != ""){
                            if(el.toUpperCase().indexOf(filterInput.toUpperCase()) > -1){
                                return <li onClick={handleLink}>{el}</li>
                            }
                        }
                    })
                }
            </ul>
        </div>
    )
}