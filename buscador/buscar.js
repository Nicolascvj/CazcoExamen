const fs = require("fs");
const contr = require("./control");

const mostrar = (file, country, year) => {
    contr.resultados(file, country, year).then(v => console.log()).catch(msg => console.log(msg.message));
};

const guardar = (file, country, year) => {
    contr.resultados(file, country, year).then(v => archivo(country, year, v).then(m => console.log(m))).catch(msg => console.log(msg.message));
};

const archivo = async(pais, anio, data) => {

    if (!fs.existsSync('resultados')) {
        fs.mkdirSync('resultados');
    }
    fs.writeFile(`./resultados/${pais}-${anio}.txt`, data, (err) => {
        if (err) throw new Error("No se puede guardar", err);
    });
    //console.log(data);
    return `Archivo guardado: resultados/${pais}-${anio}.txt`
};

module.exports = {
    mostrar,
    guardar
}