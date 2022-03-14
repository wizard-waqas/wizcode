/* React JS Template using functions */
import React from "react"
// import styles from '../styles/SplashSection.module.css'
import Tilt from 'react-parallax-tilt';
import { Fragment } from "react/cjs/react.development";

export default function GoalsSection() {
    return (
        <div className={"w-full mt-16"}>
            <h2 className={"text-4xl"}>Our Goals</h2>
            <div className="flex flex-wrap justify-around">

                <GoalCard 
                    icon={"code.png"}
                    title={"Programming Fundamentals"} 
                    paragraph={
                        <Fragment>
                            In programming, each concept builds atop the last. If you have a
                            <span className={'text-gold'}> good understanding of the fundamentals</span>. 
                            not only will you be able to learn complex concepts easier, but you’ll also
                            <span className={'text-gold'}> work exponentially more productively</span>.
                        </Fragment>
                    } 
                />

                <GoalCard 
                    icon={"learning.png"}
                    title={"Become Autodidactic"} 
                    paragraph={
                        <Fragment>
                            An autoditactic person is
                            <span className={'text-gold'}> someone who can teach themselves. </span>
                            Wouldn’t it be cool to 
                            <span className={'text-gold'}>learn anything on your own</span>?
                        </Fragment>
                    } 
                />

                <GoalCard 
                    icon="brainstorm.png"
                    title="Who is this for?"
                    paragraph={
                        <Fragment>
                            <span className={'text-gold'}>If you fit</span> either of the 2 <span className={'text-gold'}>criteria</span>:
                            <br/><span className={'text-gold'}>1.</span> You can put a program together but you're not exactly sure how you did it.
                            <br/><span className={'text-gold'}>2.</span> You want to learn how to program, but don't know how to start.
                        </Fragment>
                    }
                />

                <GoalCard 
                    icon="brainstorm.png"
                    title="Our Mission"
                    paragraph={
                        <Fragment>
                            Coding allows you to 
                            <span className={'text-gold'}> create something from nothing. </span>
                            At WizCode, our goal is not just to teach you how to code
                            but to give you the knowledge necessary to 
                            <span className={'text-gold'}> learn on your own</span>.
                        </Fragment>
                    }
                />

            </div>

        </div>
    )
}

function GoalCard({ icon, title, paragraph }){
    return (
        <div className="bg-blue p-4 my-4 rounded-2xl flex-column flex w-full items-center lg:basis-5/12">
            <img className="w-24 h-24 mr-4" src={icon} />
            <div className="">
                <h3 className="text-xl">{ title }</h3>
                <p className="text-md text-lightgrey">
                    { paragraph }
                </p>
            </div>
        </div>
    )
}

/**

<div className="bg-blue p-5 rounded-2xl m-2">
    <h3 className="text-xl">Programming Fundamentals</h3>
    <p className="text-md text-lightgrey">
        In programming, each concept builds atop the last. 
        If you have a <span className={"text-gold"}>good understanding of the fundamentals</span>, 
        not only will you be able to learn complex concepts easier, 
        but you’ll also <span className={"text-gold"}>work exponentially more productively</span>.
    </p>
</div>
<div className="bg-blue p-5 rounded-2xl m-2">
    <h3 className="text-xl">Become Autodidactic</h3>
    <p className="text-md">
        An autoditactic person is someone who can teach themselves. 
        Wouldn’t it be cool to learn anything on your own?
    </p>
</div>
<div className="bg-blue p-5 rounded-2xl m-2">
    <h3 className="text-xl">Who is this for?</h3>
    <p className="text-md">
        If you fit either of the 2 criteria:
        1. You can put a program together but you're not exactly sure how you did it.
        2. You want to learn how to program, but don't know how to start.
    </p>
</div>
<div className="bg-blue p-5 rounded-2xl m-2">
    <h3 className="text-xl">Our Mission</h3>
    <p className="text-md">
        Coding allows you to create something from nothing. 
        At WizCode, our goal is not just to teach you how to code
        but to give you the knowledge necessary to learn on your own.
    </p>
</div>

 */