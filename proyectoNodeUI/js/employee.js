window.onload = init; 
var headers = {}; 
var url = "http://localhost:3000";

function init (){

    if (localStorage.getItem("token")) {
        token = localStorage.getItem("token");
        headers = {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("token")
            }
        }
        loadEmploye();
    }
    else {
        window.location.href = "index.html"
    }
}

function loadEmploye(){
    axios.get(url + "/employee", headers).then(function(res){
        displayEmploye(res.data.message);
        setupCreateButton();
        setupSearchButton();
    }).catch(function(error){
        console.log(error);
    })
}

function setupSearchButton() {
    const searchButton = document.querySelector('.btn-secondary');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            window.location.href = "search.html";
        });
    } else {
        console.error('No entra el eventlistener');
    }
}

function setupCreateButton() {
    const searchButton = document.querySelector('.btn-primary');
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            window.location.href = "create.html";
        });
    } else {
        console.error('No entra el eventlistener');
    }
}

function displayEmploye(employees){
    var employeesList = document.getElementById('employees-list');
    employeesList.innerHTML = ''; // Limpiar la lista antes de llenarla
    employees.forEach(employee => {
        var employeeElement = document.createElement('h3');
        employeeElement.textContent = employee.employee_name;
        employeeElement.style.cursor = 'pointer';
        employeeElement.addEventListener('click', function() {
            window.location.href = `edit.html?id=${employee.employee_id}`;
        });
        employeesList.appendChild(employeeElement);
    });
}

