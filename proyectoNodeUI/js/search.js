window.onload = function() {
    init();
    setupHomeButton();
};

var headers = {}; 
var url = "http://localhost:3000";

function init(){
    if (localStorage.getItem("token")) {
        token = localStorage.getItem("token");
        headers = {
            headers: {
                'authorization': "Bearer " + token
            }
        }
        loadEmployee();
    } else {
        window.location.href = "index.html";
    }
}

function loadEmployee(){
    axios.get(url + "/employee", headers).then(function(res){
        displayEmployee(res.data.message);
        setupHomeButton();
        document.getElementById('search-button').addEventListener('click', searchEmployees);
    }).catch(function(error){
        console.log(error);
    });
}

function setupHomeButton() {
    const homeButton = document.getElementById('go_home');
    if (homeButton) {
        homeButton.addEventListener('click', function() {
            window.location.href = "employee.html";
        });
    } else {
        console.error('No entra el eventlistener');
    }
}

function searchEmployees(){
    const searchTerm = document.getElementById('search-input').value;
    if (searchTerm) {
        axios.get(`${url}/employee/search?q=${encodeURIComponent(searchTerm)}`, headers).then(function(res){
            displayEmployee(res.data.message);
            setupHomeButton()
        }).catch(function(error){
            console.error(error);
            alert('Error al buscar empleados');
        });
    } else {
        alert('Por favor ingrese un término de búsqueda');
    }
}

function displayEmployee(employees){
    var body = document.querySelector("body");
    body.innerHTML = `
        <div>
            <h1>Busqueda de empleados por nombre</h1>
            <button id="go_home" class="btn btn-secondary">Ir a la página de inicio</button>
            <div class="input-group">
                <input type="search" id="search-input" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                <button type="button" id="search-button" class="btn btn-outline-primary" data-mdb-ripple-init>Search</button>
            </div>
        </div>
    `;
    if (Array.isArray(employees)) {
        employees.forEach(function(employee) {
            body.innerHTML += `<h3>${employee.employee_name}</h3>`;
        });
    } else {
        console.error('No se encontraron empleados:', employees);
        body.innerHTML += `<p>No se encontraron empleados.</p>`;
    }

    document.getElementById('search-button').addEventListener('click', searchEmployees);
    
}

