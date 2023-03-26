//import
const controller = require('app');
const express = require('express');
const app = express();

//static
app.use(express.static('public'));

//config
const port = 3001;
app.set('view engine', 'ejs');
app.set('views', './templates');

//run
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});


//routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/start', (req, res) => {
    controller.Start(req);
});

app.get('/about', (req, res) => {
    res.render('index');
});

app.get('/app', (req, res) => {
    res.render('cssalive');
});
