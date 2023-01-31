import { Database, row } from "../../store/ducks/database/types"
import style from "./table.module.css"
import { BsTrash, BsArrowRepeat } from "react-icons/bs"
import { FiSave } from "react-icons/fi"

type TableProps = {
    database: Database
    setNewRow: Function
    newRow: row
    saveNewRow: Function
    deleteRow: Function
}

function Table(props: TableProps){
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
            { props.database.values.map((row: any ) => (
                    <tr>
                        <td><BsTrash size={18} cursor="pointer" onClick={() => props.deleteRow(row)}/></td>
                        <td><BsArrowRepeat size={18} color="white" cursor="pointer"/></td>
                        {
                            Object.values(row).map((value: any) => (
                                <td>{String(value)}</td>
                            ))
                        }
                    </tr>
                )) 
            }
        </table>
    )
}

export default Table