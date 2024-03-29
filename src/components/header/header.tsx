import { useState } from "react"
import { HeaderProps } from "../types/types";
import style from "./header.module.css"

function Header(props: HeaderProps){
    const [language, setLanguage] = useState("Postegresql")
    
    return(
        <header id={style.header}>
            <div id={style.div}>
                <div id={style.inputs}>
                    <div>
                        <input type="text" id={style.input} placeholder={language === "Postegresql" ? "postgres://user:password@host/database" : "mysql://user:password@host/database"} onChange={(e) => props.setUrl(e.target.value)}/>
                    </div>
                    <div>
                        <select id={style.select} onChange={(e) => {props.setLanguage(e.target.value); setLanguage(e.target.value)}}>
                            <option value="Postegresql">Postegresql</option>
                            <option value="Mysql">Mysql</option>
                        </select>
                    </div>
                </div>
                <button id={style.button} onClick={() => props.connection()} disabled={ props.load == "Connecting..." ? true : false}>{props.load}</button>
            </div>
        </header>
    )
}

export default Header