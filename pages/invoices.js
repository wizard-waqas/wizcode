/* React JS Template using functions */
import React, { useContext } from "react"
import {loadStripe} from "@stripe/stripe-js";
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
        props: {invoices, customer}
    }
}

export default function InvoicesPage({ invoices, customer}) {
    console.log(invoices)
    return (
        <div>
            {invoices.map(invoice => (
                <Invoice invoice={invoice}/>
            ))}
        </div>
    );
};

function Invoice({ invoice }){


    return (
        <div>
            <h1>{invoice.number}</h1>
            <p>{getAmountDue(invoice.amount_due)}</p>
            <span>Paid: <input type={"checkbox"} checked={invoice.paid}/></span>
        </div>
    )
}

function getAmountDue(amountDue){
    const dollars = amountDue / 100;
    console.log(dollars)
    return dollars.toLocaleString("en-US", {style:"currency", currency:"USD"});
}
