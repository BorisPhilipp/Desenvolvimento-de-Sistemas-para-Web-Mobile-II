//npm i express express-session cookie-parser

//importando express e cookie-parser, express-session
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

//inicializar express
const app = express();

//middleware que processa REQUEST BODIES codificadas na url
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

//middleware que verifica se o usuário está autenticado através do session
function isAuthenticaded(req, res, next){
    if (req.session.isAuthenticaded){
        return next();
    }
    res.redirect('/login');
}

//rota 1 - Homepage (Default)
app.get('/', (req,res) => {
    res.send('<h1>HOME</h1><h2>Insira \'/login\' na URL para prosseguir!</h2><p>Ou clique <a href="http://localhost:8080/login">aqui</a>! :)</p>');
});


//rota 2 - Login 
app.get('/login', (req,res) => {
    res.send(`<h1>LOGIN</h1>
        <h2>Realize o Login com uma Conta ou Use: admin 123</h2>
        <form method="POST" action="/login">
            <label>Insira o Nome de Usuário</label></br>
            <input type="text" name="username" placeholder="Usuário" required /></br></br>
            <label>Insira a Senha</label></br>
            <input type="password" name="password" placeholder="Senha" required /></br></br>
            <button type="submit">Login</button>
        </form>
        `);
});

//rota 3 - Dashboard
app.get('/dashboard', isAuthenticaded, (req,res) => {
    res.send(`<h1>Dashboard</h1>
        <h3>Bem vindo, ${req.session.username}!</h3>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Rick Astley - Never Gonna Give You Up (Video)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></br></br>
        <p>Ou se preferir, clique aqui para <a href="/logout">sair</a>!</p>`);
});

//rota 4 - Logout
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Erro ao tentar fazer logout.');
        }
        res.clearCookie('loggedIn');
        res.redirect('/login'); // Redireciona para a página de login
    });
});

//rota 5 - Requisição POST do Formulário da Rota 2 (Login)
app.post('/login', (req,res) => {
    //propriedade que armazena os dados da requisição POST
    const {username, password} = req.body;

    //validação das credenciais de usuário com as do administrador.
    if(username === 'admin' && password === '123'){
        req.session.isAuthenticaded = true;
        req.session.username = username;

        //geração de um cookie que carrega o status de login do usuário
        res.cookie('loggedIn','true',{ maxAge: 900000, httpOnly: true});

        res.redirect('/dashboard');
    } else {
        res.send('<h1>Credenciais inválidas</h1><a href="/login">Tente novamente</a>');
    }
});

//subindo o servidor
app.listen(8080);
console.log("Servidor aberto em 8080.");

/*
Requisitos:

° - Criar um servidor web básico usando Express.
° - Implementar rotas para login e logout.
° - Usar cookies para armazenar informações do usuário.
° - Utilizar sessions para manter o estado de autenticação.
° - Criar uma página protegida que só pode ser acessada por usuários autenticados.

Passo a passo para resolver o exercício:

1 - Instalar as dependências necessárias. -feito
2 - Configurar o servidor Express.  -feito
3 - Implementar rotas básicas.  -feito, /, /login, /logout e /dashboard
4 - Adicionar suporte a sessions. -feito
5 - Implementar rota de login.  -feito
6 - Implementar rota de logout.  -nao
7 - Criar rota protegida.  -feito, /dashboard
8 - Implementar middleware de autenticação.  -feito
*/
