// Importar Express.js
const express = require('express');

// Crea una aplicación Express
const app = express();

// Middleware para analizar cuerpos JSON
app.use(express.json());

// Establecer el puerto y verify_token
const port = process.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN;

// Ruta para solicitudes GET
app.get('/', (req, res) => {
  const mode = req.query['hub.mode'];
  const challenge = req.query['hub.challenge'];
  const token = req.query['hub.verify_token'];

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK VERIFICADO');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Ruta para solicitudes POST
app.post('/', (req, res) => {
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  console.log(`\n\nWebhook recibido ${timestamp}\n`);
  console.log(JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// Inicia la aplicación del servidor
app.listen(port, () => {
  console.log(`\nEscuchando en el puerto ${port}\n`);
});
