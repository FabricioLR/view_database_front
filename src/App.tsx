import { useState, useEffect } from 'react'
import "./style.css"
import api from './components/api'

function App() {
  const [data, setData] = useState([])
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [host, setHost] = useState("")
  const [database, setDatabase] = useState("")

  async function Connect(){
    if (username && host && database){
      localStorage.setItem("username_db", username)
      localStorage.setItem("password", password)
      localStorage.setItem("host", host)
      localStorage.setItem("database", database)
      const response = await api.post("/database", {
        username, password, host, database
      })
      setData(response.data.db)
    }
  }

  function showTable(index: number){
    document.getElementById("tables")!.style.transform = `translatex(${index * -100}%)`
  }

  useEffect(() => {
    const username = localStorage.getItem("username_db")
    const host = localStorage.getItem("host")
    const password = localStorage.getItem("password")
    const database = localStorage.getItem("database")
    if (username && host && database){
      api.post("/database", {
        username, password, host, database
      })
      .then((response) => {
        setData(response.data.db)
      })
    }
  }, [])
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
        </div>
      </header>
      <main>
        <ul id="change_table">
          {data.map((table, index) => <li onClick={() => showTable(index)}>{table["table"]}</li>)}
        </ul>
        <div id="tables">
          {data.map((table) => (
            <table key={table["table"]}>
              <thead>
                <tr>
                  {Object.keys(table["data"][0]).map((column) => <th>{column}</th>)}
                </tr>
              </thead>
              <tbody>
                {(table["data"] as never[]).map((row) => <tr>{Object.entries<string>(row).map((valor) => <td>{valor[1]}</td>)}</tr>)}
              </tbody>
            </table>
          ))}
        </div>
      </main>
    </>
  )
}

export default App
