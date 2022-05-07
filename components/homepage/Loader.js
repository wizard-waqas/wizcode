/* React JS Template using functions */
import React from "react"

/**
 * loading symbol
 *
 * @param show - boolean dictating whether or not to show the loader
 */
export default function Loader({ show }) {
    return show ? <div className={"loader w-14 h-14 rounded-full"}></div> : null;
}
