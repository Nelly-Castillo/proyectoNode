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
        console.log(res);
        displayEmploye(res.data.message);
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

function displayEmploye(employee){
    var body = document.querySelector("body");
    for(var i=0; i< employee.length; i++){
        body.innerHTML += `<h3>${employee[i].employee_name}</h3>`
    }
}

