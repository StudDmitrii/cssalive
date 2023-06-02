import postcss from 'postcss';
import cssnano from 'cssnano';
import advencedPreset from 'cssnano-preset-advanced';

import Comb from 'csscomb';
import autoprefixer2 from 'autoprefixer';
//const Comb = require('csscomb');
//const fs = require('fs');


export async function startRefactor(data, configComb, configNano) {
    configComb = JSON.parse(configComb);
    configNano = JSON.parse(configNano);

    let autoprefixer_enabler = {};
    if (configNano.autoprefixer == true) autoprefixer_enabler = { plugins: [autoprefixer2] };

    let comb = new Comb();
    comb.configure(configComb);
    try {
        data = await comb.processString(data);
    }
    catch (e) {
        return "ERROR WHILE PROCCESSING CSSCOMB";
    }
    data = await postcss([cssnano({
        preset: [advencedPreset, configNano],
        ...autoprefixer_enabler,
    })]).process(data, { from: undefined }).then(res => res.css);
    return data;
}