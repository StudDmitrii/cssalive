import Reps from './models/Reps.js';
import Users from './models/Users.js';

import postcss from 'postcss';
import cssnano from 'cssnano';
import advencedPreset from 'cssnano-preset-advanced';
import * as fs from 'fs';

import Comb from 'csscomb';
import autoprefixer2 from 'autoprefixer';
//const Comb = require('csscomb');
//const fs = require('fs');


export async function startRefactor(data, configComb, configNano) {
    configComb = JSON.parse(configComb);
    configNano = JSON.parse(configNano);
    //console.log('ss');
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
    //console.log(data);
    return data;
}



export function saveFiles(fileTexts, userName, fileName = "style.css") {
    let path = './users/' + userName;
    checkUserDir(path);
    path += '/' + new Date().getTime();
    checkDateDir(path);
    path += '/';
    fileTexts.forEach((fileText, i) => { createFile(i, fileName, fileText, path, userName); });
    return "success";
}

function checkUserDir(path) {
    fs.stat(path, (err) => {
        if (!err) return;
        fs.mkdirSync(path);
    });
}

function checkDateDir(path) {
    fs.stat(path, (err) => {
        if (!err) return;
        fs.mkdirSync(path);
    });
}

let pathOld;
let pathNew;

function createFile(id, fileName, content, path, userName) {

    if (id == 1) {
        path += 'index.html';
    }
    else if (id == 2) {
        path += "AFTER_" + fileName;
        pathNew = path;
        pathNew = pathNew.toString().replace('./users/' + userName, '');
    }
    else {
        path += fileName;
        pathOld = path;
        pathOld = pathOld.toString().replace('./users/' + userName, '');
    }

    fs.stat(path, (err) => {
        if (!err) return;
        fs.writeFileSync(path, content);
        if (id == 2)
            createFileRep(pathOld, pathNew, userName);
    });
}

async function createFileRep(pathOld, pathNew, userName) {
    let user = await Users.findOne({ where: { user_name: userName } });
    let rep = await Reps.create({
        rep_file_old: pathOld,
        rep_file_new: pathNew,
        userUserId: user.user_id
    });
    //await user.setReps(rep);
}