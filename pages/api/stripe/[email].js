import Stripe from "stripe";

/**
 * get invoices for a user from stripe using their email
 *
 * can also optionally return customer from here containing stripe customer data
 */
export default async function handler(req, res) {
    const {email} = req.query  // get user email from route

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: "2020-08-27",
    })

    const customer = await stripe.customers.list({
        email: email
    }).then(customers => {
        // return the first customer from the returned data
        return customers.data[0]
    })

    const invoices = await stripe.invoices.list({
        customer: customer.id,
        limit: 3,
    }).then(invoices => invoices.data)  // return a list of invoices for the user

    res.status(200).json({invoices})
}