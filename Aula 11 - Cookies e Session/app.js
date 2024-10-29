//npm i express express-session cookie-parser

//importando express e cookie-parser, express-session
const express = require('express');

//cookies e sessions
const session = require('express-session');
const cookieParser = require('cookie-parser');

//inicializar express
const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());


app.use(session(
    {
        secret: 'admin123', //chave para acessar os cookies
        resave: false, //evita gravar sessões sem alterações
        saveUninitialized: true, //salvar na guia anônima
        cookie: { secure: false }
    }
));

//Middleware de autenticação
function isAuthenticaded(req, res, next){
    if (req.session.isAuthenticaded){
        return next();
    }
    res.redirect('/login');
}

app.get('/', (req,res) => {
    res.send('<h1>HOME</h1><br><h3>Digite /login, após localhost:8080.</h3>');
});

app.get('/login', (req,res) => {
    res.send(`
        <form method="POST" action="/login">
            <input type="text" name="username" placeholder="Usuário" required />
            <input type="password" name="password" placeholder="Senha" required />
            <button type="submit">Login</button>
        </form>
        `);
});

app.get('/dashboard', isAuthenticaded, (req,res) => {
    res.send(`<h1>Dashboard</h1><h3>Bem vindo, ${req.session.username}!</h3>`);
});

app.post('/login', (req,res) => {
    const {username, password} = req.body;

    //Simulação de verificação de credenciais.
    if(username === 'admin' && password === '123'){
        req.session.isAuthenticaded = true;
        req.session.username = username;


        //Setando um cookie
        res.cookie('loggedIn','true',{ maxAge: 900000, httpOnly: true});

        res.redirect('/dashboard');
    } else{
        res.send('<h1>Credenciais inválidas</h1><a href="/login">Tente novamente</a>');
    }
});

app.listen(8080);
console.log("Servidor aberto em 8080.");
