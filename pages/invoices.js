/* React JS Template using functions */
import React, {useContext} from "react"
import Stripe from "stripe";
import {UserContext} from "../lib/context";

export const getServerSideProps = async () => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2020-08-27",
    })

    const customer = await stripe.customers.list({
        email: "wp23@njit.edu"
    }).then(customers => (
        // return the first customer from the returned data
        customers.data[0]
    ))

    const invoices = await stripe.invoices.list({
        customer: customer.id,
        limit: 3,
    }).then(invoices => invoices.data)


    return {
        props: {
            invoices,
            customer,
        }
    }
}

export default function InvoicesPage({ invoices, customer, params }) {
    console.log(params.toString())

    return (
        <div className={"flex"}>
            {invoices.map(invoice => (
                <Invoice invoice={invoice}/>
            ))}
        </div>
    );
};

function Invoice({ invoice }) {
    return (
        <div className={"bg-blue rounded-xl p-4 m-4"}>
            <h1>{invoice.number}</h1>
            <p>Amount Due: {getAmountDue(invoice.amount_due)}</p>
            <span>Paid: <input type={"checkbox"} checked={invoice.paid} readOnly/></span>
            <a href={invoice.hosted_invoice_url}>Pay Here</a>
        </div>
    )
}

function getAmountDue(amountDue) {
    const dollars = amountDue / 100;
    return dollars.toLocaleString("en-US", {style: "currency", currency: "USD"});
}
