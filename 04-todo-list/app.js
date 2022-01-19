
require('colors')

const { 
    inquirerMenu, 
    pausa, 
    leerInput,
    listadoTareasBorrar,
    confirmarBorrado, 
    mostrarListadoCheckList} = require('./helpers/inquirerer');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');

const Tareas = require('./models/tareas');

console.clear()

const main = async () => {

    let opt = ''
    const tareas = new Tareas()

    const tareasDB = leerDB();
    
    

    if (tareasDB) {
        // Establecer las tareas 
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {

        opt = await inquirerMenu()
        // console.log({opt});

        switch (opt) {
            case '1': // Crear Tarea
                const desc = await leerInput('Descripción: ')
                tareas.crearTarea(desc)
                break;

            case '2': // Listar tareas
                tareas.listadoCompleto();
                break;

            case '3': // Listar tareas completadas
                tareas.listadoFiltrado(true)
                break;

            case '4': // Listar tareas pendientes
                tareas.listadoFiltrado(false)
                break;

            case '5': // Completar tarea(s)
                const ids = await mostrarListadoCheckList(tareas.ListadoArr);
                tareas.toggleCompletadas( ids )
                break;

            case '6': // Borrar tarea
                const id = await listadoTareasBorrar( tareas.ListadoArr )
                if (id !== '0'){
                    if (await confirmarBorrado('¿Estás seguro?')) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada correctamente');
                    }
                } 
                break;
        
            default:
                break;
        }

        guardarDB( tareas.ListadoArr )

        await pausa();

    } while (opt != '0');

    // pausa()
}

main();
