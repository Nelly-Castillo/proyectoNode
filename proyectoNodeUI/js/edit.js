window.onload = function() {
    init();
    setupHomeButton();
    const queryParams = new URLSearchParams(window.location.search);
    const employeeId = queryParams.get('id');

    if (employeeId) {
        document.getElementById('update-employee').addEventListener('click', function() {
            updateEmployee(employeeId);
        });
        document.getElementById('delete-employee').addEventListener('click', function() {
            deleteEmployee(employeeId);
        });
    } else {
        console.error('ID de empleado no proporcionado en la URL.');
        alert('ID de empleado no proporcionado.');
        window.location.href = 'index.html';
    }
};

var url = "http://localhost:3000";
var headers = {}; 

function init () {
    if (localStorage.getItem("token")) {
        headers = {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("token")
            }
        }
    } else {
        window.location.href = "index.html"; 
    }
}

function setupHomeButton() {
    const homeButton = document.querySelector('.btn-secondary');
    if (homeButton) {
        homeButton.addEventListener('click', function() {
            window.location.href = "employee.html";
        });
    } else {
        console.error('No entra el eventlistener');
    }
}

function updateEmployee(id) {
    const updatedEmployee = {
        employee_name: document.getElementById('employee-name').value,
        employee_lastname: document.getElementById('employee-lastname').value,
        employee_phone: document.getElementById('employee-phone').value,
        employee_mail: document.getElementById('employee-mail').value,
        employee_address: document.getElementById('employee-address').value
    };

    console.log('Datos del empleado para actualizar:', updatedEmployee);
    
    axios.put(`${url}/employee/${id}`, updatedEmployee, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    })
    .then(function(res) {
        alert('Empleado actualizado con éxito.');
    })
    .catch(function(error) {
        if (error.res) {
            console.error('Error en la respuesta:', error.response.data);
            alert(`Error al actualizar el empleado: ${error.response.data.message || error.response.statusText}`);
        } else if (error.req) {
            console.error('Error en la solicitud:', error.request);
            alert('Error en la solicitud al servidor. Por favor, inténtelo de nuevo.');
        } else {
            console.error('Error desconocido:', error.message);
            alert('Error desconocido. Por favor, intente de nuevo más tarde.');
        }
    });
}


function deleteEmployee(id) {
    axios.delete(url +`/employee/${id}`, headers).then(function(res){
        alert('Empleado eliminado con éxito.');
        window.location.href = "index.html";
    }).catch(function(error){
        console.error(error);
        alert('Error al eliminar el empleado.');
    });
}