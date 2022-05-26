import React, {Fragment} from "react"
import {Fade} from "react-awesome-reveal";

/**
 * section containing WizCode's goals
 */
export default function GoalsSection() {
    return (
        <div className={"w-full mt-16"}>
            <h2 className={"text-4xl"}>Our Goals</h2>
            <div className="flex flex-wrap justify-around">
                <GoalCard
                    icon="brainstorm.png"
                    title="Who is this for?"
                    paragraph={
                        <Fragment>
                            <span className={'text-gold'}>If you fit</span> either of the 2 <span
                            className={'text-gold'}>criteria</span>:
                            <br/><span className={'text-gold'}>1.</span> You can put a program together but
                            you&apos;re not exactly sure how you did it.
                            <br/><span className={'text-gold'}>2.</span> You want to learn how to program, but
                            don&apos;t know how to start.
                        </Fragment>
                    }
                />
                <GoalCard
                    icon={"coding.png"}
                    title={"Coding Fundamentals"}
                    paragraph={
                        <Fragment>
                            When learning how to code, know that each concept builds atop the last. If you have a
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
                            An autodidactic person is
                            <span className={'text-gold'}> someone who can teach themselves. </span>
                            Wouldn’t it be cool to
                            <span className={'text-gold'}> learn anything on your own</span>?
                        </Fragment>
                    }
                />
                <GoalCard
                    icon="creative.png"
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

/**
 * information card containing WizCode's goals.
 * Consists of an icon, title, and description paragraph
 */
function GoalCard({icon, title, paragraph}) {
    return (
        <Fade className={"basis-full lg:!basis-5/12"}>
            <div className="drop-shadow-xl bg-blue p-4 my-3 rounded-2xl flex-column flex transition-all items-center lg:!my-8 lg:!flex-row">
                <img className="w-24 h-24 mr-4" src={"/img/homepage/goals/" + icon} alt={"goal icon"}/>
                <div>
                    <h3 className="text-xl">{title}</h3>
                    <p className="text-md text-lightgrey">
                        {paragraph}
                    </p>
                </div>
            </div>
        </Fade>
    )
}
