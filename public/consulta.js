let agricultores = [];

async function cargarAgricultores() {

    const respuesta = await fetch('/agricultores');

    agricultores = await respuesta.json();

    mostrarAgricultores(agricultores);

}

function mostrarAgricultores(lista) {

    const tbody =
        document.querySelector('#tablaAgricultores tbody');

    tbody.innerHTML = "";

    lista.forEach(agricultor => {

        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${agricultor.id}</td>
            <td>${agricultor.cedula}</td>
            <td>${agricultor.nombre}</td>
            <td>${agricultor.area}</td>
            <td>${agricultor.cultivo}</td>
            <td>${agricultor.inversion}</td>
            <td>
                <a href="predio.html?id=${agricultor.id}">
                    Ver Predio
                </a>
            </td>
        `;

        tbody.appendChild(fila);

    });

}

document.getElementById("buscarCedula")
.addEventListener("input", function(){

    const cedulaBuscada =
        this.value.toLowerCase();

    const filtrados =
        agricultores.filter(a =>
            a.cedula.toLowerCase()
            .includes(cedulaBuscada)
        );

    mostrarAgricultores(filtrados);

});

cargarAgricultores();