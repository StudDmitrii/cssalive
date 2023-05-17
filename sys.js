
const { json } = require('body-parser');
const Comb = require('csscomb');
const CSSO = require('csso');
const fs = require('fs');

//const config = require('./csscomb.json');


async function startRefactor(data, config) {
    let json = config;
    //fs.writeFileSync('csscomb.json', json, 'utf8');
    //fs.readFileSync('./csscomb.json', 'utf8', (err, data) => {
    //    console.log(JSON.parse(data));
    //});
    let path = require('.');
    let comb = new Comb(path);
    //console.log(data);
    if (data.settings == "set_minify") {
        //console.log('ss2');
        return CSSO.minify(data).css;
    }
    else {
        let css = await comb.processString(data);
        //console.log('ss1');
        return css;
    }
}

module.exports.startRefactor = startRefactor;