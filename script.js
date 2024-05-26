document.getElementById('auth-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        // Simulamos un registro/inicio de sesión exitoso
        localStorage.setItem('user', username);
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('app-container').style.display = 'block';
    } else {
        alert('Por favor, complete todos los campos.');
    }
});

document.getElementById('appointment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const patientName = document.getElementById('patient-name').value;
    const appointmentDate = document.getElementById('appointment-date').value;
    const appointmentTime = document.getElementById('appointment-time').value;

    if (patientName && appointmentDate && appointmentTime) {
        if (isDuplicateAppointment(appointmentDate, appointmentTime)) {
            alert('Ya existe una cita para la misma fecha y hora.');
        } else {
            addAppointment(patientName, appointmentDate, appointmentTime);
            document.getElementById('appointment-form').reset();
        }
    }
});

function isDuplicateAppointment(date, time) {
    const appointmentList = document.getElementById('appointment-list').children;
    for (let i = 0; i < appointmentList.length; i++) {
        const appointment = appointmentList[i].textContent.split(' - ')[1];
        const appointmentDate = appointment.split(' a las ')[0];
        const appointmentTime = appointment.split(' a las ')[1].replace('Eliminar', '').trim();
        if (appointmentDate === date && appointmentTime === time) {
            return true;
        }
    }
    return false;
}

function addAppointment(name, date, time) {
    const appointmentList = document.getElementById('appointment-list');

    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.textContent = `${name} - ${date} a las ${time}`;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm';
    deleteButton.textContent = 'Eliminar';
    deleteButton.onclick = function() {
        appointmentList.removeChild(li);
    };

    li.appendChild(deleteButton);
    appointmentList.appendChild(li);
}