import { PopUpProps } from "../types/types"
import style from "./popUp.module.css"

function PopUp(props: PopUpProps){
    return (
        <div id={style.localPopUp}>
            <div id={style.popUp}>
                <p>{props.message}</p>
                <div>
                    <button onClick={() => props.deny()}>Deny</button>
                    <button onClick={() => props.confirm()}>Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default PopUp