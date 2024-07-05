const express = require('express');
const bodyParser = require('body-parser');
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const app = express();

// Configurar Body Parser para manejar solicitudes POST
app.use(bodyParser.urlencoded({ extended: false }));

// Ruta para manejar el envío de mensajes de WhatsApp
app.post('/send-whatsapp', async (req, res) => {
    const { to, body } = req.body;

    try {
        // Enviar el mensaje usando el cliente de Twilio
        const message = await client.messages.create({
            body: body,
            from: process.env.TWILIO_PHONE_NUMBER, // Usar el número de Twilio configurado
            to: to
        });
        console.log(message.sid); // Loggear el SID del mensaje enviado
        res.send('Mensaje de WhatsApp enviado exitosamente!');
    } catch (error) {
        console.error(error); // Manejar errores de envío
        res.status(500).send('Error al enviar el mensaje de WhatsApp.');
    }
});

// Iniciar el servidor y escuchar en el puerto proporcionado por Heroku
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
