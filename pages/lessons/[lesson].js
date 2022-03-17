/* React JS Template using functions */
import React, {useState, useEffect, Fragment} from "react"
import {useRouter} from "next/router";
import Navbar from "../../components/Navbar";

export default function LessonPage() {
    const router = useRouter()
    const { lesson } = router.query

    useEffect(() => {
        document.body.style.margin = "0";

        return (() => {
            document.body.style.margin = "0 10%";
        })
    }, [])

    return (

        <div className={"h-full"}>

            <div className={"h-full flex flex-row"}>
                <iframe className="w-1/2 h-screen fixed" src="https://replit.com/@waqasp/wizcode-blank?lite=true"/>

                <div className="w-1/2 h-screen"></div>
                <div className="w-1/2">
                    <Item title={`Project: ${lesson}`} body={"Description: Build a million dollar word game"}/>
                    <Item title={"Requirements"}
                          body={
                              <ul>
                                  <li>
                                      <input className={"bg-black"} id="req1" type="checkbox"/>
                                      <label htmlFor="req1">Proper color coding for right, wrong, and misplaced
                                          letters</label>
                                  </li>
                                  <li>
                                      <input id="req2" type="checkbox"/>
                                      <label htmlFor="req2">Neat console output</label>
                                  </li>
                                  <li>
                                      <input id="req3" type="checkbox"/>
                                      <label htmlFor="req3">User should have 6 tries</label>
                                  </li>
                              </ul>
                          }
                    />

                    <Item title={"Steps"}
                          body={
                              <ol>
                                  <li>Generate a random word</li>
                                  <li>Ask user to guess a word</li>
                                  <li>Check which letters were right, wrong, or incorrect</li>
                              </ol>
                          }
                    />
                    <Item title={"Hints"}
                          body={
                              <ol>
                                  <li>Use random.choice to get a random word</li>
                              </ol>
                          }
                    />

                    <Item title={"Video Tutorial"}
                          body={
                              <Fragment>
                                  <h3>Still stuck? Watch the video tutorial</h3>
                                  <iframe className="w-full h-full" src="https://www.youtube.com/embed/mro4tuciKr0"></iframe>
                              </Fragment>
                          }
                    />

                </div>
            </div>
        </div>)
}

function Item({title, body}) {
    return (
        <div className="bg-blue m-8 p-4 rounded-xl ">
            <h2>{title}</h2>
            <p>{body}</p>
        </div>
    )
}
