const express = require('express');
const path = require('path');

const db = require('./database');

const app = express();

const PORT = 3000;

// Permite leer JSON enviados desde el frontend
app.use(express.json());

// Permite acceder a la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// ==========================
// GUARDAR AGRICULTOR (POST)
// ==========================
app.post('/agricultores', (req, res) => {

    const {
        cedula,
        nombre,
        area,
        cultivo,
        inversion,
        ubicacion
    } = req.body;

    db.run(
        `INSERT INTO agricultores
        (cedula, nombre, area, cultivo, inversion, ubicacion)
        VALUES (?, ?, ?, ?, ?, ?)`,

        [
            cedula,
            nombre,
            area,
            cultivo,
            inversion,
            JSON.stringify(ubicacion)
        ],

        function(err){

            if(err){

                console.error(err);

                res.status(500).json({
                    mensaje: "Error al guardar agricultor"
                });

            }
            else{

                res.json({
                    mensaje: "Agricultor guardado correctamente",
                    id: this.lastID
                });

            }

        }
    );

});

// ==========================
// CONSULTAR AGRICULTORES (GET)
// ==========================
app.get('/agricultores', (req, res) => {

    db.all(
        'SELECT * FROM agricultores',
        [],
        (err, rows) => {

            if(err){

                res.status(500).json({
                    mensaje: 'Error al consultar agricultores'
                });

            }
            else{

                res.json(rows);

            }

        }
    );

});

// ==========================
// INICIAR SERVIDOR
// ==========================
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});