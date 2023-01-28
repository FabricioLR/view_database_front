import { Database } from "../../store/ducks/database/types"
import style from "./table.module.css"

type TableProps = {
    database: Database
}

function Table(props: TableProps){
    return(
        <table id={style.table}>
            <tr>
                { props.database.columns.map(column => <th>{String(column)}</th>)}
            </tr>
            { props.database.values.map((row: any ) => <tr>{Object.values(row).map((value: any) => <td>{String(value)}</td>)}</tr>)}
        </table>
    )
}

export default Table