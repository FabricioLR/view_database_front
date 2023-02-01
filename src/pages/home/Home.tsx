import { useState } from "react"
import style from "./home.module.css"
import { useDispatch, useSelector } from "react-redux"
import Header from "../../components/header/header"
import Table from "../../components/table/Table"
import { DatabaseTypes } from "../../store/ducks/database/types"
import PopUp from "../../components/popup/PopUp"
import { ApplicationState } from "../../store"
import { PopUpProps, row, UpdateData } from "../../components/types/types"

function Home(){
    const dispatch = useDispatch()
    const State = useSelector(state => state) as ApplicationState
    const [url, setUrl] = useState("")
    const [language, setLanguage] = useState("Postgresql")
    const [load, setLoad] = useState("Connect")
    const [tableIndex, setTableIndex] = useState(0)
    const [searchValue, setSearchValue] = useState("")
    const [newRow, setNewRow] = useState<row>({})
    const [popUp, setPopUp] = useState<PopUpProps>()

    async function connection(){
        if (url !== ""){
            setLoad("Connecting...")
            dispatch({ type: DatabaseTypes.LOAD_REQUEST, payload: { url, language, setLoad }})
        }
    }

    function search(e: string){
        if (e == "") {
            dispatch({ type: DatabaseTypes.FILTER, payload: { tableIndex, column: "", value: "" }})
            return
        }
        const parts = e.split(": ")
        if (parts[1] == "") dispatch({ type: DatabaseTypes.FILTER, payload: { tableIndex, column: parts[0], value: parts[1] }})
        if (parts.length > 2 || !parts[0] || !parts[1]) return
        dispatch({ type: DatabaseTypes.FILTER, payload: { tableIndex, column: parts[0], value: parts[1] }})
    }

    function saveNewRow(){
        if (Object.keys(newRow).length == 0) return
        dispatch({ type: DatabaseTypes.SAVE_NEW_ROW, payload: { update: {...newRow}, tableName: State.database.data[tableIndex].table, tableIndex, setNewRow }})
    }

    function deleteRow(row: row){
        dispatch({ type: DatabaseTypes.DELETE_ROW, payload: { row, tableName: State.database.data[tableIndex].table, tableIndex}})
    }

    function updateValue(data: UpdateData){
        dispatch({ type: DatabaseTypes.UPDATE_VALUE, payload: { ...data, tableName: State.database.data[tableIndex].table, tableIndex }})
    }
    
    return(
        <>
            {
                popUp ?
                    <PopUp message={popUp.message} confirm={popUp.confirm} deny={popUp.deny}/>
                :
                    null
            }
            <Header connection={connection} setUrl={setUrl} load={load} setLanguage={setLanguage}/>
            <main id={style.main}>
                { 
                    State.database.data.length != 0 ?
                        <div id={style.localTable}>
                            <div id={style.selectSearch}>
                                <select onChange={(e: any) => {setTableIndex(e.target.value); setSearchValue("")}}>
                                    { State.database.data.map((table, index) => <option value={index}>{table.table}</option>) }
                                </select>
                                <input value={searchValue} type="text" placeholder="column: value" onChange={(e) => {search(e.target.value), setSearchValue(e.target.value)}}/>
                            </div>
                            <div id={style.table}>
                                {
                                    searchValue == "" ?
                                        <Table key={Math.floor(Math.random() * 100)} database={State.database.data[tableIndex]} setPopUp={setPopUp} updateValue={updateValue} saveNewRow={saveNewRow} setNewRow={setNewRow} newRow={newRow} deleteRow={deleteRow}/>
                                    :
                                        <Table key={Math.floor(Math.random() * 100)} database={State.database.search[tableIndex]} setPopUp={setPopUp} updateValue={updateValue} saveNewRow={saveNewRow} setNewRow={setNewRow} newRow={newRow} deleteRow={deleteRow}/>
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