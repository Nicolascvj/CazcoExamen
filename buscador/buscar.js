
const colors = require("colors");
const fs = require("fs");
const csv = require("csv-parser");
let datos = [];


const readcsv = async(file) => {
    const g = fs.createReadStream(file)
        .on("error", (err) => console.log('Error en el path'.red)) 
        .pipe(csv({ cast: true, delimiter: ';' }))

        for await (const row of g) {
        for (let i = 4; i < 65; i++) {
            if (row[i] == "" || row[i] == " " || row[i] == "") {
                row[i] = "0";
            }
        }
        datos.push(row);
    }
    return 'Lectura datos csv';
};

let resultados = async(file, country, year) => {

    let doc = await readcsv(file);
//    console.log(datos);

    est = await imprimirDatos(country, year, datos);

    //console.log(datos);
    return est;
}


const imprimirDatos = async(pais, anio, datos) => {
    
    console.log(datos);
    for (var i = 4; i < datos.length; i++) {
        if (datos[i][1] === pais) {
            break;
        }
    }
    for (var j = 4; j < 65; j++) {
        if (datos[3][j] == anio) {
            break;
        }
    }
    txt = `(${datos[i][2]}) \nPaís  : ${datos[i][0]}  \nAño   : ${anio.toString()}  \nValor : ${datos[i][j]}`;
    

    console.log(`Datos:(${datos[i][2]})`);
    console.log(`País  : ${datos[i][0].blue}`);
    console.log(`Año   : ${anio.toString().yellow}`);
    console.log(`Valor : ${datos[i][j].red}`);

    return txt;
};



const mostrar = (file, country, year) => {
    resultados(file, country, year).then(v => console.log()).catch(msg => console.log(msg.message));
};

const guardar = (file, country, year) => {
    resultados(file, country, year).then(v => archivo(country, year, v).then(m => console.log(m))).catch(msg => console.log(msg.message));
};

const archivo = async(pais, anio, data) => {

    if (!fs.existsSync('resultados')) {
        fs.mkdirSync('resultados');
    }
    fs.writeFile(`./resultados/${pais}-${anio}.txt`, data, (err) => {
        if (err) throw new Error("No se puede guardar", err);
    });
    
    return `Archivo guardado: resultados/${pais}-${anio}.txt`
};

module.exports = {
    mostrar,
    guardar,
}



