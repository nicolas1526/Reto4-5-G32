const tableBody = document.getElementById("tableBody")
const inputId = document.getElementById("inputId")
const inputNombre = document.getElementById("inputNombre")
const inputCorreo = document.getElementById("inputCorreo")
const inputContraseña = document.getElementById("inputContraseña")
const inputEdad = document.getElementById("inputEdad")
const btnsAgregar = document.getElementsByClassName("btn-agregar")
const btnsDetalles = document.getElementsByClassName("btn-detalles")

function btnAgregar(){
    btnsAgregar[0].style.display = 'block'
    btnsDetalles[0].style.display = 'none'
    btnsDetalles[1].style.display = 'none'

    limpiarInput()
}

function btnDetalles(id){
    btnsAgregar[0].style.display = 'none'
    btnsDetalles[0].style.display = 'block'
    btnsDetalles[1].style.display = 'block'
    obtenerPorId(id)
}

function crear(){
    
}

function obtener(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    
    fetch("http://localhost/api/Client/all", requestOptions)
    .then(response => response.json())
    .then(result => {
        result.forEach(element => {
            console.log(element)
            tableBody.innerHTML +=
            `
            <tr>
                <td>${element.name}</td>
                <td>${element.email}</td>
                <td>${element.age}</td>
                <td>
                    <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modal" onclick="btnDetalles(${element.idClient})">
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
    
    fetch(`http://localhost/api/Client/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
        if(result){
            inputId.value = result.idClient
            inputNombre.value = result.name
            inputCorreo.value = result.email
            inputContraseña.value = result.password
            inputEdad.value = result.age

        }
    })
    .catch(error => console.log('error', error));
}

function eliminarPorId(){

}

function actualizarPorId(){

}

function limpiarInput(){
    inputId.value = null
    inputNombre.value = null
    inputCorreo.value = null
    inputContraseña.value = null
    inputEdad.value = null
}



obtener()


