/* React JS Template using functions */
import React, {useContext, useEffect, useState} from "react"
import {UserContext} from "../lib/context";

export default function InvoicesPage() {
    const {user} = useContext(UserContext);
    const [invoices, setinvoices] = useState([])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/api/stripe/${user.email}`)
            const data = await response.json()
            setinvoices(data.invoices)
        }

        if (user !== null) {
            fetchData().then(value => console.log(value))
        }
    }, [user])

    return (
        <div className={"flex"}>
            {invoices ?
                invoices.map(invoice => (
                    <Invoice key={invoice.number} invoice={invoice}/>
                ))
                :
                <h3>No invoices to display.</h3>
            }
        </div>
    );
};

function Invoice({invoice}) {
    return (
        <div className={"flex bg-blue rounded-xl p-4 m-4 w-4/5"}>
            <img className={"w-28 mr-4"} src={"/icons/lesson.png"} alt={"lesson icon"}/>
            <div className={"relative w-full"}>
                <h1 className={"absolute top-0 right-4"}>{invoice.number}</h1>
                <p>Amount Due: {getAmountDue(invoice.amount_due)}</p>
                <span>Paid: <input type={"checkbox"} checked={invoice.paid} readOnly/></span>
                <a className={"absolute bg-darkgold p-2 rounded-lg bottom-0 right-4"} href={invoice.hosted_invoice_url}>Pay Here &gt;</a>
            </div>
        </div>

    )
}

function getAmountDue(amountDue) {
    const dollars = amountDue / 100;
    return dollars.toLocaleString("en-US", {style: "currency", currency: "USD"});
}
