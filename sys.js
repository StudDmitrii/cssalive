
const Comb = require('csscomb');
const CSSO = require('csso');

const config = require('./csscomb.json');

var comb = new Comb(config);

async function startRefactor(data){
    //console.log(data);
    if (data.settings == "set_minify") {
        //console.log('ss2');
        return CSSO.minify(data.text).css;
    }
    else {
        let css = await comb.processString(data.text);
        //console.log('ss1');
        return css;
    }
}

module.exports.startRefactor = startRefactor;