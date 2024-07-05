require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const twilio = require('twilio');

const app = express();
const port = process.env.PORT || 3000;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.post('/send-whatsapp', (req, res) => {
    const { message, to } = req.body;
    
    client.messages
        .create({
            body: message,
            from: 'whatsapp:+19803724374', // Twilio sandbox number
            to: `whatsapp:${to}`
        })
        .then((message) => res.status(200).json({ success: true, messageSid: message.sid }))
        .catch((error) => res.status(500).json({ success: false, error: error.message }));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
