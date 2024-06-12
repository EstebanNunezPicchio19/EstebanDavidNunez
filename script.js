document.getElementById('auth-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username && password) {
      // Simulando la autenticación exitosa
      localStorage.setItem('user', username);
      document.getElementById('auth-container').style.display = 'none';
      document.getElementById('app-container').style.display = 'block';
  } else {
      showAlert('Por favor, complete todos los campos.');
  }
});

document.getElementById('appointment-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const patientName = document.getElementById('patient-name').value;
  const appointmentDate = document.getElementById('appointment-date').value;
  const appointmentTime = document.getElementById('appointment-time').value;

  if (patientName && appointmentDate && appointmentTime) {
      if (isDuplicateAppointment(appointmentDate, appointmentTime)) {
          showAlert('Ya existe una cita para la misma fecha y hora.');
      } else {
          try {
              addAppointment(patientName, appointmentDate, appointmentTime);
              document.getElementById('appointment-form').reset();
              updateDatabase(patientName, appointmentDate, appointmentTime);
          } catch (error) {
              showAlert('Ha ocurrido un error al agregar el turno.');
          }
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
  li.innerHTML = `${name} - ${date} a las ${time} <button class="btn btn-danger btn-sm">Eliminar</button>`;

  li.querySelector('button').addEventListener('click', function() {
      appointmentList.removeChild(li);
  });

  appointmentList.appendChild(li);
}

function updateDatabase(name, date, time) {
  fetch('appointments.json')
      .then(response => response.json())
      .then(data => {
          data.turnos.push({
              paciente: name,
              fecha: date,
              hora: time
          });
          return data;
      })
      .then(updatedData => {
          return fetch('appointments.json', {
              method: 'PUT', // Actualización de datos
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedData)
          });
      })
      .catch(error => {
          throw new Error('Error al actualizar la base de datos.');
      });
}

function showAlert(message) {
  const alertDiv = document.createElement('div');
  alertDiv.className = 'alert alert-danger';
  alertDiv.textContent = message;
  document.body.appendChild(alertDiv);
  setTimeout(() => {
      alertDiv.remove();
  }, 3000);
}