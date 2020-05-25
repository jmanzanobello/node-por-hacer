const fs = require('fs');


let listadoPorHacer = [];


const guadarDb = () => {
    let data = JSON.stringify(listadoPorHacer);

    return new Promise((resolve, reject) => {

        fs.writeFile(`./db/data.json`, data, (err) => {
            if (err) reject(err);
            else resolve(`OK`);

        });
    });
}

const cargarDb = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {

    cargarDb();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    guadarDb()
        .then(ok => console.log(`Se ha guardado la tarea correctamente`))
        .catch(e => console.log(e));
    return porHacer;

}

const getListado = () => {
    cargarDb();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDb();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guadarDb()
            .then(ok => {
                console.log(`Se ha guardado la tarea correctamente`);
                return true;
            })
            .catch(e => console.log(e));
    } else {
        return false;
    }


}

const borrarTarea = (descripcion) => {
    cargarDb();

    let nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    })

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guadarDb();
        return true;
    }

}


module.exports = {
    crear,
    getListado,
    actualizar,
    borrarTarea
}