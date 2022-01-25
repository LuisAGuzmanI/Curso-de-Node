
const http = require('http')

http.createServer( (req, res) => {

    // res.writeHead(200, { 'Content-Type': 'application/csv' })
    
    // res.setHeader('Content-Disposition', 'attachment; filename=lista.csv')
    // res.writeHead(200, { 'Content-Type': 'application/csv' })

    // const persona = {
    //     id: 1,
    //     nombre: 'Luis'
    // }

    // res.write( JSON.stringify( persona ) )

    // res.write('id, nombre\n')
    // res.write('1, Fer\n')
    // res.write('2, Antonio\n')
    // res.write('3, Luis\n')
    // res.write('4, AAAAAAAA\n')

    res.write('Hola mundo')

    res.end()

})
.listen( 8080 );

console.log('Escuchando el puerto: ', 8080);







