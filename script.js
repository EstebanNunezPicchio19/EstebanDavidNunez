document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const appointmentForm = document.getElementById('appointmentForm');
    const appointmentsList = document.getElementById('appointmentsList');
    const appointmentsTitle = document.getElementById('appointmentsTitle');
    
    let currentUser = null;

    const users = [
        { username: 'user1', password: 'password1' },
        { username: 'user2', password: 'password2' }
    ];

    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];

    // Fetch initial data from JSON file (simulated)
    fetch('appointments.json')
        .then(response => response.json())
        .then(data => {
            if (appointments.length === 0) {
                appointments = data;
                localStorage.setItem('appointments', JSON.stringify(appointments));
            }
            console.log('Turnos iniciales cargados:', data);
        })
        .catch(error => console.error('Error al cargar los turnos iniciales:', error));

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            currentUser = user;
            Swal.fire({
                icon: 'success',
                title: 'Inicio de sesión exitoso',
                text: '¡Bienvenido!'
            });
            loginForm.classList.add('d-none');
            appointmentForm.classList.remove('d-none');
            appointmentsTitle.classList.remove('d-none');
            appointmentsList.classList.remove('d-none');
            displayAppointments();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Usuario o contraseña incorrectos'
            });
        }
    });

    appointmentForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        const duplicate = appointments.some(appointment => appointment.date === date && appointment.time === time);

        if (duplicate) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ya existe un turno agendado para esa fecha y hora.'
            });
        } else {
            const newAppointment = { user: currentUser.username, name, date, time };
            appointments.push(newAppointment);
            localStorage.setItem('appointments', JSON.stringify(appointments));
            console.log('Nuevo turno agregado:', newAppointment);
            console.log('Turnos actualizados:', appointments);
            displayAppointments();
            appointmentForm.reset();

            Swal.fire({
                icon: 'success',
                title: 'Turno agendado',
                text: 'El turno ha sido agendado con éxito.'
            });
        }
    });

    function displayAppointments() {
        appointmentsList.innerHTML = '';
        appointments.forEach(appointment => {
            if (appointment.user === currentUser.username) {
                const li = document.createElement('li');
                li.classList.add('list-group-item');
                li.textContent = `${appointment.name} - ${appointment.date} - ${appointment.time}`;
                appointmentsList.appendChild(li);
            }
        });
    }
});