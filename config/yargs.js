const descripcion = {
    demand: true,
    alias: 'd'
};

const completado = {
    demand: true,
    alias: 'c',
    default: true
};

const argv = require('yargs')
    .command('actualizar', 'Actualiza una tarea', {
        descripcion
    })
    .command('crear', 'Crear una tarea', {
        descripcion,
        completado
    })
    .command('listar', 'Listar lista de tareas')
    .command('borrar', 'Borrar tarea de la lista', { descripcion })
    .help()
    .argv;

module.exports = {
    argv
}