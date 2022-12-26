import { useState } from "react"
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
    const [error, setError] = useState("")
    const [currentTable, setCurrentTable] = useState(0)

    function timeout(delay: number) {
        return new Promise(res => setTimeout(res, delay))
    }

    async function connection(){
        if (url !== ""){
            setLoad("Connecting...")
            dispatch({ type: DatabaseTypes.LOAD_REQUEST, payload: { url, language, setLoad }})
        } else {
            setError("Empty url")
            await timeout(2000)
            setError("")
        }
    }

    return(
        <>
            <Header connection={connection} setUrl={setUrl} load={load} error={error} setLanguage={setLanguage}/>
            <main id={style.main}>
                { 
                    State.database.data.length != 0 ?
                        <div id={style.table}>
                            <div id={style.select}>
                                <select onChange={(e: any) => setCurrentTable(e.target.value)}>
                                    { State.database.data.map((table, index) => <option value={index}>{table.table}</option>) }
                                </select>
                            </div>
                            <div style={{"overflowX": "auto"}}>
                                { 
                                    <Table database={State.database.data[currentTable]}/>
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