import { useState } from 'react'
import "./style.css"
import { useDispatch, useSelector } from 'react-redux'
import { DataDBTypes } from './store/ducks/dataDB/types'
import { DataDBState } from "./store/ducks/dataDB/types"
import { AiOutlineMenu } from "react-icons/ai"

type StateProps = {
  DB: DataDBState
}

function App() {
  const dispatch = useDispatch()
  const state = useSelector(state => state) as StateProps
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [host, setHost] = useState("")
  const [database, setDatabase] = useState("")
  const [table, setTable] = useState(0)

  async function Connect(){
    ShowConnectionMenu()
    if (username && host && database){
      dispatch({ type: DataDBTypes.LOAD_REQUEST, payload: { username, host, password, database }})
    }
  }

  function ShowConnectionMenu(){
    document.getElementById("connectionMenu")?.classList.toggle("active")
  }
  
  return (
    <>
      <header>
        <div id="cabecalho">
          <div id="inputs">
            <input type="text" placeholder="username" onChange={
              (e) => {
                  setUserName(e.target.value)
                }
              }/>
            <input type="text" placeholder="password" onChange={
              (e) => {
                  setPassword(e.target.value)
                }
              }/>
            <input type="text" placeholder="host" onChange={
              (e) => {
                  setHost(e.target.value)
                }
              }/>
            <input type="text" placeholder="database" onChange={
              (e) => {
                  setDatabase(e.target.value)
                }
              }/>
          </div>
          <div id="connection">
            <button onClick={Connect}>Connect</button>
          </div>
          <div id="connectionMenuButton" onClick={ShowConnectionMenu}>
              <AiOutlineMenu/>
          </div>
        </div>
      </header>
      <div id="connectionMenu">
          <input type="text" placeholder="username" onChange={
            (e) => {
                setUserName(e.target.value)
              }
            }/>
          <input type="text" placeholder="password" onChange={
            (e) => {
                setPassword(e.target.value)
              }
            }/>
          <input type="text" placeholder="host" onChange={
            (e) => {
                setHost(e.target.value)
              }
            }/>
          <input type="text" placeholder="database" onChange={
            (e) => {
                setDatabase(e.target.value)
              }
            }/>
          <button onClick={Connect}>Connect</button>
        </div>
      <main>
        <ul id="change_table">
          {state.DB.data.map((table, index) => <li key={table["table"]} onClick={() => setTable(index)}>{table["table"]}</li>)}
        </ul>
        <div id="table">
          <table>
            <thead>
              <tr>
                {state.DB.data.length > 0 ? Object.keys(state.DB.data[table]["data"][0]).map((column) => <th key={column}>{column}</th>) : null}
              </tr>
            </thead>
            <tbody>
              {state.DB.data.length > 0 ? (state.DB.data[table]["data"] as never[]).map((row) => <tr key={row}>{Object.entries<string>(row).map((valor) => <td>{valor[1]}</td>)}</tr>) : null}
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}

export default App
