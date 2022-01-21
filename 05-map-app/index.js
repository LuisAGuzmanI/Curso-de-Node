require('dotenv').config()

const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirerer");
const Busquedas = require("./models/busquedas");

const main = async () => {
    
    let opt = 0;

    const busquedas = new Busquedas();
    
    busquedas.leerDB()

    do {    

        opt = await inquirerMenu();
        
        switch (opt) {
            case 1:
                // Mostrar mensaje
                const termino = await leerInput('Ciudad: ');

                // Buscar lugares
                const lugares = await busquedas.cuidad( termino );
                
                // Seleccionar el lugar
                const idSeleccionado = await listarLugares( lugares );

                if ( idSeleccionado == 0 ) continue;

                const lugarSel = lugares.find( l => l.id === idSeleccionado )         

                busquedas.agregarHistorial( lugarSel.nombre )

                // Clima
                const climaLugar = await busquedas.climaLugar( lugarSel.lat, lugarSel.lng );

                // Mostrar resultados
                console.log('\nInfo de la ciudad\n'.green);
                console.log('Ciudad: ', lugarSel.nombre);
                console.log('Latitud: ', lugarSel.lat);
                console.log('Longitud: ', lugarSel.lng);
                console.log('Temperatura: ', climaLugar.temp);
                console.log('Minima: ', climaLugar.min);
                console.log('Maxima: ',  climaLugar.max);
                console.log('El tiempo: ', climaLugar.desc);
                
                break;

            case 2:
                busquedas.historialCapitalizado.forEach( (lugar, i) => {
                    const idx = `${i + 1} `.green
                    console.log(idx, lugar);
                })
                break;
        
        }

        if(opt !== 0) await pausa();

    } while (opt !== 0);


}

main();





