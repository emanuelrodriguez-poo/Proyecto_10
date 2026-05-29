// =====================
// CREAR MAPA
// =====================

let mapa = L.map('map').setView([4.6097, -74.0817], 10);

L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        maxZoom: 19
    }
).addTo(mapa);

// =====================
// CAPA PARA POLIGONOS
// =====================

let elementosDibujados = new L.FeatureGroup();

mapa.addLayer(elementosDibujados);

// =====================
// HERRAMIENTAS DE DIBUJO
// =====================

let drawControl = new L.Control.Draw({

    draw: {

        polygon: true,

        polyline: false,

        rectangle: false,

        circle: false,

        marker: false,

        circlemarker: false

    },

    edit: {

        featureGroup: elementosDibujados

    }

});

mapa.addControl(drawControl);

// =====================
// VARIABLE DEL POLIGONO
// =====================

let poligonoGeoJSON = null;

// =====================
// EVENTO DE DIBUJO
// =====================

mapa.on(L.Draw.Event.CREATED, function (event) {

    elementosDibujados.clearLayers();

    const layer = event.layer;

    elementosDibujados.addLayer(layer);

    poligonoGeoJSON = layer.toGeoJSON();

    console.log(poligonoGeoJSON);

});

// =====================
// GUARDAR AGRICULTOR
// =====================

const botonGuardar = document.getElementById("guardar");

botonGuardar.addEventListener("click", async () => {

    const cedula = document.getElementById("cedula").value;
    const nombre = document.getElementById("nombre").value;
    const area = document.getElementById("area").value;
    const cultivo = document.getElementById("cultivo").value;
    const inversion = document.getElementById("inversion").value;

    // =====================
    // VALIDACIONES
    // =====================

    if (
        cedula === "" ||
        nombre === "" ||
        area === "" ||
        cultivo === "" ||
        inversion === ""
    ) {

        alert("Debe completar todos los campos");
        return;

    }

    if (poligonoGeoJSON === null) {

        alert("Debe dibujar el predio en el mapa");
        return;

    }

    // =====================
    // OBJETO AGRICULTOR
    // =====================

    const agricultor = {

        cedula,
        nombre,
        area,
        cultivo,
        inversion,
        ubicacion: poligonoGeoJSON

    };

    try {

        const respuesta = await fetch('/agricultores', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(agricultor)

        });

        const datos = await respuesta.json();

        alert(datos.mensaje);

        // =====================
        // LIMPIAR FORMULARIO
        // =====================

        document.getElementById("cedula").value = "";
        document.getElementById("nombre").value = "";
        document.getElementById("area").value = "";
        document.getElementById("cultivo").value = "";
        document.getElementById("inversion").value = "";

        elementosDibujados.clearLayers();

        poligonoGeoJSON = null;

    }
    catch (error) {

        alert("Error al guardar");

    }

});