//import
import * as sys from './sys.js';
import express from 'express';
import bodyParser from 'body-parser';
import authRouter from './authRouter.js';
import db from './db.js';
import Users from './models/Users.js';
import Reps from './models/Reps.js';
import cookie from "cookie-parser";
import authMiddleware from './authMiddleware.js';

//const
const PORT = 3001;
const app = express();

db.authenticate().catch(error => console.error(error));

//middleware - операции которые происходят между получением данных от клиента и отправки ответа
app.use(express.static('public')); //разрешить доступ клиента к папке
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/auth", authRouter);
app.use(cookie());

//config
app.set('view engine', 'ejs');
app.set('views', './templates');

//run
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

//routes
app.get('/', (req, res) => {
    //db.sync({ force: true });
    res.render('index');
});

// app.post('/start', (req, res) => {
//     controller.Start(req);
// });

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