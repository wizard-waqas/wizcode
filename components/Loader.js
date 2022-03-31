/* React JS Template using functions */
import React from "react"

/**
 * loading symbol
 *
 * @param show - boolean dictating whether or not to show the loader
 */
export default function Loader({ show }) {
    return show ? <div className={"loader"}></div> : null;
}
