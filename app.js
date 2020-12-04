const argv = require('./config/yargs').argv;
const buscador = require('./buscador/buscar')


switch (argv._[0]) {

//Mostrar datos
    case 'mostrar':
    buscador.mostrar(argv.archivo, argv.pais, argv.anio);
        break;
//Guardar datos
    case 'guardar':
        buscador.guardar(argv.archivo, argv.pais, argv.anio);
        break;
    default:
        console.log('Comando no valido');
}