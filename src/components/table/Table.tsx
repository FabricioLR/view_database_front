import style from "./table.module.css"
import { BsTrash } from "react-icons/bs"
import { FiSave } from "react-icons/fi"
import { useRef, useState } from "react"
import useOutsideClick from "../hooks/userOutsideClick"
import { TableProps, UpdateData } from "../types/types"

function Table(props: TableProps){
    const [update, setUpdate] = useState<UpdateData>()
    const ref = useRef(null)
    useOutsideClick({ref, setFunction: setUpdate})

    function confirm(){
        props.updateValue(update)
        props.setPopUp(undefined)
    }

    function deny(){
        props.setPopUp(undefined)
    }
    
    return(
        <table id={style.table}>
            <tr>
                <th></th>
                <th></th>
                { props.database.columns.map(column => <th>{String(column)}</th>) }
            </tr>
            <tr>
                <td><BsTrash size={18} cursor="pointer" onClick={() => props.setNewRow({})}/></td>
                <td><FiSave size={18} cursor="pointer" onClick={() => props.saveNewRow()}/></td>
                { props.database.columns.map(column => (
                        <td>
                            <input value={props.newRow[column] ? String(props.newRow[column]) : ""} type="text" onChange={(e) => {
                                const newRow = { ...props.newRow }
                                delete newRow[column]
                                e.target.value != "" ?
                                    props.setNewRow({ ...props.newRow, [column]: e.target.value })
                                :
                                    props.setNewRow(newRow)
                            }}/>
                        </td>
                    ))
                }
            </tr>
            { props.database.values.map((row: any, index1) => (
                    <tr>
                        <td><BsTrash size={18} cursor="pointer" onClick={() => props.deleteRow(row)}/></td>
                        <td>{/* <BsArrowRepeat size={18} color="white" cursor="pointer"/> */}</td>
                        {
                            Object.keys(row).map((value: any, index2) => (
                                <td onDoubleClick={() => {
                                    setUpdate({rowIndex: index1, columnIndex: index2, row, update: { [value]: row[value] }}) 
                                }}>
                                    {
                                        update?.rowIndex == index1 && update?.columnIndex == index2 ? 
                                            <input id={style.updateInput} onChange={(e) => setUpdate({ ...update, update: { [value]: e.target.value } })} ref={ref} type="text" value={String(update?.update[value])} onKeyUp={(key) => {
                                                if (key.key == "Enter"){
                                                    props.setPopUp({ message: "Do you realy want to update this value?", confirm, deny })
                                                }
                                            }}/>
                                        : 
                                            String(row[value])
                                    }
                                </td>
                            ))
                        }
                    </tr>
                )) 
            }
        </table>
    )
}

export default Table