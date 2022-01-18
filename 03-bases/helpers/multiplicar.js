
const fs = require('fs')
const colors = require('colors');

const crearArchivo = async ( base = 0, listar = true, hasta = 10) => {

    try {
        let salida = ''
        let consola = ''

        for (let i = 1; i <= hasta; i++) {
            consola += `${base} ${ 'x'.green } ${i} ${ '='.green } ${base*i} \n`
            salida += `${base} x ${i} = ${base*i} \n`
        }

        if (listar){
            console.log(`Tabla del ${ base }`.underline, );
            console.log(consola);
        } 


        fs.writeFileSync(`./salida/tabla-${ base }.txt`, salida);

        return `Tabla-${base}.txt creada`;

    } catch (error) {
        return error
    }

}

module.exports = {
    crearArchivo
}
