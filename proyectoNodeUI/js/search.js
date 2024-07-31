window.onload = init; 
var headers = {}; 
var url = "http://localhost:3000";

function init(){
    if (localStorage.getItem("token")) {
        token = localStorage.getItem("token");
        headers = {
            headers: {
                'Authorization': "Bearer " + token
            }
        }
        loadEmployee();
        document.getElementById('search-button').addEventListener('click', searchEmployees);
    } else {
        window.location.href = "index.html";
    }
}

function loadEmployee(){
    axios.get(url + "/employee", headers).then(function(res){
        console.log(res);
        displayEmployee(res.data.message);
    }).catch(function(error){
        console.log(error);
    });
}

function displayEmployee(employee){
    console.log("entra display");
    var body = document.querySelector("body");
    for (var i = 0; i < employee.length; i++) {
        body.innerHTML += `<h3>${employee[i].employee_name}</h3>`;
    }
}

function searchEmployees(){
    const searchTerm = document.getElementById('search-input').value;
    if (searchTerm) {
        axios.get(`${url}/employees/search?searchTerm=${encodeURIComponent(searchTerm)}`, headers)
            .then(function(response){
                console.log(response.data.results);
            })
            .catch(function(error){
                console.error(error);
                alert('Error al buscar empleados');
            });
    } else {
        alert('Por favor ingrese un término de búsqueda');
    }
}
