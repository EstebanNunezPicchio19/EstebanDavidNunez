const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());

// Ruta para manejar el método PUT
app.put('/appointments', (req, res) => {
    // Obtener los datos del cuerpo de la solicitud
    const newData = req.body;

    // Leer el archivo appointments.json
    fs.readFile('appointments.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return res.status(500).send('Error interno del servidor');
        }

        // Convertir el contenido del archivo a objeto JavaScript
        const appointments = JSON.parse(data);

        // Agregar los nuevos datos al objeto
        appointments.turnos.push(newData);

        // Escribir los datos actualizados de vuelta al archivo
        fs.writeFile('appointments.json', JSON.stringify(appointments), (err) => {
            if (err) {
                console.error('Error al escribir en el archivo:', err);
                return res.status(500).send('Error interno del servidor');
            }
            // Enviar una respuesta exitosa
            res.status(200).send('Datos actualizados correctamente');
        });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
