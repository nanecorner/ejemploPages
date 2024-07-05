const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el módulo CORS

const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const app = express();

// Configurar CORS para permitir solicitudes desde cualquier origen
app.use(cors());

// Configurar Body Parser para manejar solicitudes POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Ruta para manejar el envío de mensajes de WhatsApp
app.post('/send-whatsapp', async (req, res) => {
    const { to, body } = req.body;

    try {
        // Enviar el mensaje usando el cliente de Twilio
        const message = await client.messages.create({
            body: body,
            from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`, // Usar whatsapp: en el número de Twilio
            to: `whatsapp:${to}` // Asegúrate de usar whatsapp: en el número de destino también
        });
        console.log(message.sid); // Loggear el SID del mensaje enviado
        res.json({ success: true }); // Enviar respuesta JSON de éxito
    } catch (error) {
        console.error('Error al enviar mensaje de WhatsApp:', error); // Registrar el error en la consola
        res.status(500).json({ error: 'Error al enviar el mensaje de WhatsApp.' }); // Enviar respuesta JSON de error
    }
});

// Iniciar el servidor y escuchar en el puerto proporcionado por Heroku
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
