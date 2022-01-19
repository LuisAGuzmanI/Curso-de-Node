
const fs = require('fs')

const archivo = './db/data.json'

const guardarDB = ( dt ) => {


    fs.writeFileSync(archivo, JSON.stringify( dt ) );

}

const leerDB = () => {
    if (!fs.existsSync(archivo)) {
        return null
    }

    const info = fs.readFileSync(archivo, {encoding: 'utf-8' })

    if (info === '') return null
    

    const data = JSON.parse(info)
    return data
    
}

module.exports = {
    guardarDB,
    leerDB
}