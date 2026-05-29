console.log("database.js cargado");

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./agricultores.db', (err) => {

    if (err) {
        console.log("Error al conectar la base de datos");
    } else {
        console.log("Base de datos SQLite conectada");
    }

});

db.run(`
    CREATE TABLE IF NOT EXISTS agricultores(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cedula TEXT,
        nombre TEXT,
        area REAL,
        cultivo TEXT,
        inversion REAL,
        ubicacion TEXT
    )
`);

module.exports = db;