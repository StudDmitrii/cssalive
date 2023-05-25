//import
import * as sys from './sys.js';
import express from 'express';
import bodyParser from 'body-parser';
// const sys = require('./sys.js');
// const express = require('express');
// const bodyParser = require('body-parser');
//const
const PORT = 3001;
const app = express();

//middleware - операции которые происходят между получением данных от клиента и отправки ответа
app.use(express.static('public')); //разрешить доступ клиента к папке
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//config
app.set('view engine', 'ejs');
app.set('views', './templates');

//run
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

//routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/start', (req, res) => {
    controller.Start(req);
});

app.get('/about', (req, res) => {
    res.redirect('/');
});

app.get('/app', (req, res) => {
    res.render('cssalive');
});

app.post('/app/result', (req, res) => {
    //console.log("we are");
    let r = req.body;
    sys.startRefactor(r.text, r.configComb, r.configNano).then((data) => res.send(data));
});

app.use((req, res) => {
    res.send("404: PAGE NOT FOUND");
}); //midleware если не удалось найти путь