const fs = require('fs');

// Array inicial de turnos vacío
const initialAppointments = [];

// Convertir el array a formato JSON
const initialAppointmentsJSON = JSON.stringify(initialAppointments);

// Escribir el JSON en el archivo appointments.json
fs.writeFile('appointments.json', initialAppointmentsJSON, (err) => {
    if (err) {
        console.error('Error al crear el archivo appointments.json:', err);
    } else {
        console.log('Archivo appointments.json creado correctamente');
    }
});
