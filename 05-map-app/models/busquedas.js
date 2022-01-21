const fs = require('fs')
const axios = require('axios');

class Busquedas {

    historial = []
    dbPath = './db/database.json'

    constructor() {

    }

    get historialCapitalizado() {
        return this.historial.map(nombre => {
            let palabras = nombre.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1) );

            return palabras.join(' ')
        })
    }   

    get ParamsMapbox() {
        return { // process.env.MAPBOX_KEY
            'access_token': process.env.MAPBOX_KEY,
            'limit': '5',
            'language': 'es'
        }
    }

    async cuidad ( lugar = '' ){

        try {
            const instance = axios.create({
                baseURL: 'https://api.mapbox.com/',
                params: this.ParamsMapbox
            })

            const resp = await instance.get(`geocoding/v5/mapbox.places/${ lugar }.json`)
            
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name_es,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }))

        } catch (error) {
            console.log(error);
            return []

        }
        
    }

    async climaLugar (lat, lon){
        try {

            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org//',
                params: {
                    'appid': process.env.OPENWEATHER_KEY,
                    'units': 'metric',
                    'lang': 'es',
                    lat,
                    lon
                }
            })

            const resp = (await instance.get('data/2.5/weather')).data
            
            return {
                desc: resp.weather[0].description,
                min: resp.main.temp_min,
                max: resp.main.temp_max,
                temp: resp.main.temp
            }

        } catch (error) {
            console.log(error);
        }
    }

    agregarHistorial( lugar = '' ) {

        if (this.historial.includes( lugar.toLocaleLowerCase() ) ) {
            return;
        }

        this.historial = this.historial.splice(0, 4);

        this.historial.unshift(lugar.toLocaleLowerCase())

        this.guardarDB()
    }

    guardarDB() {

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }

    leerDB() {
        if (!fs.existsSync(this.dbPath)) {
            return null
        }
    
        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8' })
    
        if (info === '') return null
    
        this.historial = (JSON.parse(info)).historial
    }

}

module.exports = Busquedas


