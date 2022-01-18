
const { crearArchivo } = require('./helpers/multiplicar')

const argv = require('./config/yargs')

console.clear()

// const [,,arg3 = 'base=5'] = process.argv
// const [ , base ] = arg3.split('=')


const { base, listar, hasta } = argv

crearArchivo( argv.b, argv.l, argv.h )
    .then(nombreArchivo => console.log(nombreArchivo, 'creado'))
    .catch(console.log)

