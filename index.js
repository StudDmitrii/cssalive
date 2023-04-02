//import
const sys = require('./sys.js');
const express = require('express');
const bodyParser = require('body-parser');
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
    sys.startRefactor(req.body.text).then((data) => res.send(data));
});

app.use((req, res) => {
    res.send("404: PAGE NOT FOUND");
}); //midleware если не удалось найти путь