window.onload = function() {
    init();
    setupHomeButton();
    const queryParams = new URLSearchParams(window.location.search);
    const employeeId = queryParams.get('id');

    document.getElementById('create-employee').addEventListener('click', function() {
        createEmployee(employeeId);
    });
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

function createEmployee() {
    const updatedEmployee = {
        employee_name: document.getElementById('employee-name').value,
        employee_lastname: document.getElementById('employee-lastname').value,
        employee_phone: document.getElementById('employee-phone').value,
        employee_mail: document.getElementById('employee-mail').value,
        employee_address: document.getElementById('employee-address').value
    };

    console.log('Datos del empleado para actualizar:', updatedEmployee);
    
    axios.post(url + "/employee", updatedEmployee, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    })
    .then(function(res) {
        alert('Empleado creado con éxito.');
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
