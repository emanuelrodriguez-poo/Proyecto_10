const parametros = new URLSearchParams(window.location.search);

const id = parametros.get('id');

const mapa = L.map('map').setView([4.6, -74.1], 10);

L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        maxZoom: 19
    }
).addTo(mapa);

async function cargarPredio(){

    const respuesta = await fetch('/agricultores');

    const agricultores = await respuesta.json();

    const agricultor = agricultores.find(
        a => a.id == id
    );

    if(!agricultor){
        alert("Predio no encontrado");
        return;
    }

    document.getElementById("nombre").textContent =
        agricultor.nombre;

    document.getElementById("cedula").textContent =
        agricultor.cedula;

    document.getElementById("area").textContent =
        agricultor.area + " ha";

    document.getElementById("cultivo").textContent =
        agricultor.cultivo;

    document.getElementById("inversion").textContent =
        "$ " + agricultor.inversion;

    if(!agricultor.ubicacion){
        return;
    }

    const geojson =
        JSON.parse(agricultor.ubicacion);

    const capa =
        L.geoJSON(geojson);

    capa.addTo(mapa);

    mapa.fitBounds(capa.getBounds());

}

cargarPredio();