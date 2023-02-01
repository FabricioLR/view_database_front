import {  useEffect } from "react";
import { UseOutsideCLickData } from "../types/types";

function useOutsideClick(data: UseOutsideCLickData) {

    useEffect(() => {
        function handleClickOutside(event: Event) {
            if (data.ref?.current && !data.ref.current?.contains((event!.target as Node | null))) {
                data.setFunction(undefined)
            }
        }
      
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [data.ref]);
}

export default useOutsideClick