const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

export default async function handler(req, res) {
    const {email} = req.query  // get user email from route

    client.messages
        .create({
            body: `Trial requested from ${email}`,
            from: '+17629003136',
            to: '+17326684229'
        })
        .then(message => res.status(200).json(message))
        .catch(error => res.status(200).json(error));
}