/* React JS Template using functions */
import React, {useContext, useEffect, useState} from "react"
import {UserContext} from "../lib/context";

export default function InvoicesPage() {
    const {user} = useContext(UserContext);
    const [invoices, setInvoices] = useState([])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/api/stripe/${user.email}`)
            return await response.json()
        }

        if (user !== null) {
            fetchData().then(data => setInvoices(data.invoices))
        }
    }, [user])

    return (
        <div className={"flex flex-col"}>
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

function getDate(dateInSeconds) {
    const dateInMilliseconds = dateInSeconds * 1000
    return new Date(dateInMilliseconds).toLocaleDateString("en-US")
}

function Invoice({invoice}) {
    return (
        <div className={"flex flex-col bg-blue drop-shadow-xl rounded-xl p-3 my-4 w-full"}>
            <div className={"flex"}>
                <img className={"w-16 mr-4"} src={"/icons/lesson.png"} alt={"lesson icon"}/>
                <div className={"relative w-full"}>
                    <h1 className={"text-lg"}>Coding lesson</h1>
                    <h1 className={"absolute top-0 right-4"}>{getDate(invoice.created)}</h1>
                    {invoice.paid ?
                        <></>
                        :
                        <p>Amount Due: {getAmountDue(invoice.amount_due)}</p>
                    }
                </div>
            </div>
            {invoice.paid ?
                <a className={"bg-darkblue p-2 rounded-lg bottom-0 right-4 text-center"}>Paid</a>
                :
                <a className={"bg-darkgold p-2 rounded-lg bottom-0 right-4 text-center"}
                   href={invoice.hosted_invoice_url}>Pay Now</a>
            }
        </div>

    )
}

function getAmountDue(amountDue) {
    const dollars = amountDue / 100;
    return dollars.toLocaleString("en-US", {style: "currency", currency: "USD"});
}
