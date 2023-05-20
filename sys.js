
const { json } = require('body-parser');
const Comb = require('csscomb');
const CSSO = require('csso');
const fs = require('fs');

//const config = require('./csscomb.json');


async function startRefactor(data, config) {
    let comb = new Comb();
    comb.configure(JSON.parse(config));
    //console.log(JSON.parse(config));
    if (data.settings == "set_minify") {
        return CSSO.minify(data).css;
    }
    else {
        let css = await comb.processString(data);
        try{
            return css;
        }
        catch(e){
            return "ERROR USE CSSCOMB";
        }
    }
}

module.exports.startRefactor = startRefactor;