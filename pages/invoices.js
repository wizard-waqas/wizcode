/* React JS Template using functions */
import React, {useContext, useEffect, useState} from "react"
import {UserContext} from "../lib/context";
import Link from "next/link";
import Loader from "../components/homepage/Loader";

/**
 * display the invoices for a user from stripe
 */
export default function InvoicesPage() {
    const {user} = useContext(UserContext);
    const [invoices, setInvoices] = useState([])
    const [loading, setLoading] = useState(true);

    /**
     * when the page loads fetch the invoices from stripe api
     */
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const response = await fetch(`/api/stripe/${user.email}`)
                setLoading(false)
                return await response.json()
            } catch (e) {
                console.log(e)
                return []
            }
        }

        // only fetch data if there is a user logged in
        if (user !== null) {
            fetchData().then(data => setInvoices(data.invoices))
        }
    }, [user])

    if (loading) {
        return (
            <div className={"flex justify-center items-center mt-80"}>
                <Loader show={loading}/>
            </div>
        )
    }

    if (!user) {
        return (
            <div className={"flex justify-center items-center mt-80"}>
                <h3 className={"text-2xl text-center"}>You must be logged in to view your invoices.</h3>
            </div>
        )
    }

    return (
        <div className={"flex flex-col items-center"}>
            {invoices ?
                invoices.map(invoice => (
                    <Invoice key={invoice.number} invoice={invoice}/>
                ))
                :
                <div className={"flex justify-center items-center mt-80"}>
                    <h3 className={"text-2xl text-center"}>No invoices to display.</h3>
                </div>
            }
        </div>
    );
};

// convert a UNIX timestamp into readable date
function getDate(dateInSeconds) {
    const dateInMilliseconds = dateInSeconds * 1000
    return new Date(dateInMilliseconds).toLocaleDateString("en-US")
}

/**
 * Invoice card consisting of date and payment status
 *
 */
function Invoice({invoice}) {
    return (
        <div className={"flex flex-col bg-blue drop-shadow-xl rounded-xl p-3 my-4 w-full lg:w-1/2 transition-all"}>
            <div className={"flex"}>
                <img className={"w-16 mr-4"} src={"/img/lessons/lesson.png"} alt={"lesson icon"}/>
                <div className={"relative flex flex-column w-full"}>
                    <h1 className={"text-lg"}>Coding lesson</h1>
                    <h1 className={"sm:absolute sm:top-0 sm:right-4"}>{getDate(invoice.created)}</h1>
                    {invoice.paid ?
                        <></>
                        :
                        <p>Amount Due: {getAmountDue(invoice.amount_due)}</p>
                    }
                </div>
            </div>
            {invoice.paid ?
                <div className={"bg-darkblue p-2 rounded-lg bottom-0 right-4 text-center"}>Paid</div>
                :
                <Link href={invoice.hosted_invoice_url || "#"}>
                    <a className={"bg-darkgold p-2 rounded-lg bottom-0 right-4 text-center"}>Pay Now</a>
                </Link>
            }
        </div>
    )

}

// convert a float amount due into currency format
function getAmountDue(amountDue) {
    const dollars = amountDue / 100;
    return dollars.toLocaleString("en-US", {style: "currency", currency: "USD"});
}
