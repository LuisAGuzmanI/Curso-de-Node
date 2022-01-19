
require('colors')

const Tarea = require('./tarea')

class Tareas {

    _listado = {}
    
    constructor () {
        this._listado = {}
    }

    get ListadoArr() {

        // Implementación extrayendo los elementos de _listado
        return Object.values(this._listado)

        // Implementación usando las llaves de la tarea
        // const listado = []
        // Object.keys(this._listado).forEach(key => {
        //     listado.push(this._listado[key])
        // });
        // return listado
    }

    borrarTarea( id='' ){
        if (this._listado[id]) {
            delete this._listado[id]
        }
    }

    cargarTareasFromArray(tareas = []){

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea 
        });

    }

    crearTarea( desc = '' ){
        const tarea = new Tarea( desc )
        this._listado[tarea.id] = tarea
    }

    listadoCompleto() {

        let i = 0

        this.ListadoArr.forEach(tarea => {
            i++;
            let estado = tarea.completadoEn ? `Completada en - ${tarea.completadoEn}`.green : 'Pendiente'.red
            console.log(`${ i.toString().green }. ${ tarea.desc } :: `, estado);
        });
    }

    listadoFiltrado(completadas = true) {

        let i = 0

        this.ListadoArr.forEach(tarea => {
            i++;

            if (completadas == (tarea.completadoEn ? true : false)) {
                let estado = tarea.completadoEn ? `Completada en - ${tarea.completadoEn}`.green : 'Pendiente'.red
                console.log(`${ i.toString().green }. ${ tarea.desc } :: `, estado);
            }

        });
    }

    toggleCompletadas( ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id]
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        });

        this.ListadoArr.forEach( tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null
            }
        })
    }

}

module.exports = Tareas