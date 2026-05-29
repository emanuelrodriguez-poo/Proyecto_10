async function cargarAgricultores() {

    const respuesta = await fetch('/agricultores');

    const agricultores = await respuesta.json();

    const tbody = document.querySelector('#tablaAgricultores tbody');

    agricultores.forEach(agricultor => {

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

cargarAgricultores();