
const inquirer = require('inquirer')
require('colors')

const preguntas = [{
    type: 'list',
    name: 'opcion',
    message: 'Que desea hacer?',
    choices: [
        {
            value: 1,
            name: `${ '1'.green }. Buscar ciudad`
        },
        {
            value: 2,
            name: `${ '2'.green }. Historial`
        },
        {
            value: 0,
            name: `${ '0'.green }. Salir`
        },

    ]
}];

const inquirerMenu = async () => {

    console.clear();
    console.log('========================='.green);
    console.log('  Seleccione una opción  '.white);
    console.log('=========================\n'.green);

    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;

}

const pausa = async () => {

    const inputs = [{
        type: 'input',
        name: 'enter',
        message: `\nPresione ${ 'Enter'.green } para continuar`,
    }]

    const {opcion} = await inquirer.prompt(inputs);
    return opcion;
}

const leerInput = async (message) => {

    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate ( value ) {
            if (value.length === 0) {
                return 'Por favor ingrese un valor'
            }
            return true
        }
    }]

    const desc = await inquirer.prompt(question);
    return desc.desc;

}

const listarLugares = async (lugares = []) => {

    let i = 0;
    const choices = lugares.map( lugar => {
        i++;
        const idx = `${i}.`.green
        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`,

        }
    })

    choices.unshift({
        value: '0',
        name:'0'.green + '. Cancelar'
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar:',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas)

    return id

}

const confirmarBorrado = async (message) => {
    const preguntas = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]
    const {ok} = await inquirer.prompt(preguntas);
    return ok
}

const mostrarListadoCheckList = async (tareas = []) => {

    let i = 0;
    const choices = tareas.map( tarea => {
        i++;
        const idx = `${i}.`.green
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false

        }
    })

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(preguntas)

    return ids

}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares
}