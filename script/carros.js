const tableBody = document.getElementById("tableBody")
const inputId = document.getElementById("inputId")
const inputNombre = document.getElementById("inputNombre")
const selectGama = document.getElementById("selectGama")
const inputMarca = document.getElementById("inputMarca")
const inputAnio = document.getElementById("inputAnio")
const inputDescripcion = document.getElementById("inputDescripcion")
const contenedorId = document.getElementById("contenedorId")
const btnsAgregar = document.getElementsByClassName("btn-agregar")
const btnsDetalles = document.getElementsByClassName("btn-detalles")

const valueSelect = selectGama.getElementsByTagName('selectGama')

function btnAgregar(){
    btnsAgregar[0].style.display = 'block'
    btnsDetalles[0].style.display = 'none'
    btnsDetalles[1].style.display = 'none'
    contenedorId.style.display = 'none'
    selectGama.disabled = false
    obtenerGamas()
    limpiarInput()
}

function btnDetalles(id){
    btnsAgregar[0].style.display = 'none'
    btnsDetalles[0].style.display = 'block'
    btnsDetalles[1].style.display = 'block'
    contenedorId.style.display = 'block'
    selectGama.disabled = true
    obtenerPorId(id)
}

function crear(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "name": inputNombre.value,
    "brand": inputMarca.value,
    "year": inputAnio.value,
    "description": inputDescripcion.value,
    "gama":{
        "idGama": selectGama.value
    }
    });

    console.log(raw)
    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost/api/Car/save", requestOptions)
    .then(response => {
        console.log(response)
        window.location.reload()
    })
    .catch(error => console.log('error', error));
}

function obtener(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
    fetch("http://localhost/api/Car/all", requestOptions)
    .then(response => response.json())
    .then(result => {
        result.forEach(element => {
            tableBody.innerHTML +=
            `
            <tr>
                <td>${element.name}</td>
                <td>${element.brand}</td>
                <td>${element.year}</td>
                <td>${element.description}</td>
                <td>${element.gama.name}</td>
                <td>
                    <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modal" onclick="btnDetalles(${element.idCar})">
                        Detalles
                    </button>
                </td>
            </tr>
            `
        });
    })
    .catch(error => console.log('error', error));
}

function obtenerPorId(id){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    
    
    fetch(`http://localhost/api/Car/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
        if(result){
            console.log(result.gama.idGama)
            inputId.value = result.idCar
            inputNombre.value = result.name
            inputMarca.value = result.brand
            inputAnio.value = result.year
            inputDescripcion.value = result.description
            //selectGama.selectedOption.text = result.gama.idGama
        }
    })
    .catch(error => console.log('error', error));
}

function eliminarPorId(){
    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };
    
    fetch(`http://localhost/api/Car/${inputId.value}`, requestOptions)
    .then(response => {
        console.log(response)
        window.location.reload()
    })
    .catch(error => console.log('error', error));
}

function actualizarPorId(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "idCar": inputId.value,
    "name": inputNombre.value,
    "brand": inputMarca.value,
    "year": inputAnio.value,
    "description": inputDescripcion.value
    });

    var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost/api/Car/update", requestOptions)
    .then(response => {
        console.log(response)
        window.location.reload()
    })
    .catch(error => console.log('error', error));
}

function limpiarInput(){
    inputId.value = null
    inputNombre.value = null
    inputMarca.value = null
    inputAnio.value = null
    inputDescripcion.value = null
}

function obtenerGamas(){
    selectGama.innerHTML = ""
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
    fetch("http://localhost/api/Gama/all", requestOptions)
    .then(response => response.json())
    .then(result => {
        result.forEach(element => {
            selectGama.innerHTML += `<option value="${element.idGama}">${element.name}</option>`
        });
    })
    .catch(error => console.log('error', error));
}




obtener()


