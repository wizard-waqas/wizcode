/* React JS Template using functions */
import React, {useState, useEffect} from "react"
import {useRouter} from "next/router";

export default function TutorialPage() {
    const router = useRouter()
    const { tutorial } = router.query

    return (
        <div>
            <h1>{tutorial}</h1>
        </div>
    )
}
