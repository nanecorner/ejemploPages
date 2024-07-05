const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const app = express();

app.use(cors());

// Configurar Body Parser para manejar solicitudes POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/send-whatsapp', async (req, res) => {
    const { to, body } = req.body;

    try {
        const message = await client.messages.create({
            body: body,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: to
        });
        console.log(message.sid);
        res.json({ success: true });
    } catch (error) {
        console.error('Error al enviar mensaje de WhatsApp:', error);
        res.status(500).json({ error: 'Error al enviar el mensaje de WhatsApp.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
