import { useState, useEffect } from 'react'
import "./style.css"
import api from './components/api'

function App() {
  const [data, setData] = useState([])
  const [table, setTable] = useState("")
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [host, setHost] = useState("")
  const [database, setDatabase] = useState("")

  async function Connect(){
    if (username && password && host && database){
      localStorage.setItem("username_db", username)
      localStorage.setItem("password", password)
      localStorage.setItem("host", host)
      localStorage.setItem("database", database)
      const response = await api.post("/database", {
        username, password, host, database
      })
      list_columns = []
      list_rows = []
      setData([])
      setData(response.data.db[table || 0].data)
    }
  }

  useEffect(() => {
    const username = localStorage.getItem("username_db")
    const host = localStorage.getItem("host")
    const password = localStorage.getItem("password")
    const database = localStorage.getItem("database")
    if (username && host && password && database){
      api.post("/database", {
        username, password, host, database
      })
      .then((response) => {
        list_columns = []
        list_rows = []
        setData([])
        setData(response.data.db[table || 0].data)
      })
    }
  }, [table])

  var list_columns = []
  var list_rows = []

  for (const column in data[0]){
    list_columns.push(<th>{column}</th>)
  }

  for (const rows of data){
    const list_columns_rows = []
    for (const valor in rows){
      list_columns_rows.push(<td key={rows[valor]}>{rows[valor]}</td>)
    }
    list_rows.push(<tr key={rows}>{list_columns_rows}</tr>)
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
        </div>
      </header>
      <main>
        <div id="table">
          <ul id="tables">
            <li onClick={() => setTable("0")}>1</li>
            <li onClick={() => setTable("1")}>2</li>
            <li onClick={() => setTable("2")}>3</li>
            <li onClick={() => setTable("3")}>4</li>
          </ul>
          <table>
            <thead>
              <tr>
                {list_columns}
              </tr>
            </thead>
            <tbody>
              {list_rows}
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}

export default App
