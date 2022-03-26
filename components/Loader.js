/* React JS Template using functions */
import React, {useState, useEffect} from "react"

export default function Loader({ show }) {
    return show ? <div className={"loader"}></div> : null;
}
