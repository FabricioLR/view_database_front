import React, { useState } from "react"
import style from "./home.module.css"
import { useDispatch, useSelector } from "react-redux"
import Header from "../../components/header/header"
import Table from "../../components/table/Table"
import { DatabaseState, DatabaseTypes } from "../../store/ducks/database/types"

type StateData = {
    database: DatabaseState
}

function Home(){
    const dispatch = useDispatch()
    const State = useSelector(state => state) as StateData
    const [url, setUrl] = useState("")
    const [language, setLanguage] = useState("Postgresql")
    const [load, setLoad] = useState("Connect")
    const [currentTable, setCurrentTable] = useState(0)
    const [searchValue, setSearchValue] = useState("")

    async function connection(){
        if (url !== ""){
            setLoad("Connecting...")
            dispatch({ type: DatabaseTypes.LOAD_REQUEST, payload: { url, language, setLoad }})
        }
    }

    function search(e: string){
        console.log(e)
        if (e == "") {
            dispatch({ type: DatabaseTypes.FILTER, payload: { currentTable, column: "", value: "" }})
            return
        }
        const parts = e.split(": ")
        if (parts[1] == "") dispatch({ type: DatabaseTypes.FILTER, payload: { currentTable, column: parts[0], value: parts[1] }})
        if (parts.length > 2 || !parts[0] || !parts[1]) return
        dispatch({ type: DatabaseTypes.FILTER, payload: { currentTable, column: parts[0], value: parts[1] }})
    }

    return(
        <>
            <Header connection={connection} setUrl={setUrl} load={load} setLanguage={setLanguage}/>
            <main id={style.main}>
                { 
                    State.database.data.length != 0 ?
                        <div id={style.localTable}>
                            <div id={style.selectSearch}>
                                <select onChange={(e: any) => {setCurrentTable(e.target.value); setSearchValue("")}}>
                                    { State.database.data.map((table, index) => <option value={index}>{table.table}</option>) }
                                </select>
                                <input value={searchValue} type="text" placeholder="column: value" onChange={(e) => {search(e.target.value), setSearchValue(e.target.value)}}/>
                            </div>
                            <div id={style.table}>
                                { 
                                    <Table database={State.database.search[currentTable]}/>
                                }
                            </div>
                        </div>
                    :
                        <></>
                }
            </main>
        </>
    )
}

export default Home