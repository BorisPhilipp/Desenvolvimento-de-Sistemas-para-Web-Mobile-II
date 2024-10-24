//importando express e cookie-parser, express-session
const express = require('express');

//cookies e sessions
const session = require('express-session');
const cookieParser = require('cookie-parser');

//inicializar express
const app = express();

app.use(cookieParser());

app.use(session(
    {
        secret: 'admin123', //chave para acessar os cookies
        resave: false, //evita gravar sessões sem alterações
        saveUninitialized: true //salvar na guia anônima
    }
));

//dados de exemplos
const produtos = [
    {id:1, nome: 'Alface', preco: 2},
    {id:2, nome: 'Pashmina', preco: 70},
    {id:3, nome: 'Pastel', preco: 6}
];

app.get('/produtos', (req,res) =>{
    res.send(`
        
        <h1>Lista de Produtos</h1>
        <ul>

            ${
                produtos.map((produto) => `
                    <li>${produto.nome} - ${produto.preco} <a href="/adicionar/${produto.id}">Adicionar ao Carrinho</a></li>
                `).join('')
            }

        </ul>
        <a href="/carrinho">Ver Carrinho</a>
    `);
});

//rota de adicionar produto
app.get('/adicionar/:id', (req,res) => {
    const id = parseInt(req.params.id);

    const produto = produtos.find((p)=> p.id === id);

    if(produto) {
        if(!req.session.carrinho){
            req.session.carrinho = [];
        }
        req.session.carrinho.push(produto);
    }

    res.redirect('/produtos');
});

//rota do carrinho
app.get('/carrinho', (req, res) => {
    const carrinho = req.session.carrinho || [];

    res.send(`
        
        <h1>Carrinho</h1>
        <ul>

            ${
                carrinho.map((produto) => `
                    <li>${produto.nome} - ${produto.preco}</li>
                `).join('')
            }

        </ul>
        <a href="/produtos">Continuar Comprando</a>
    `);
})

app.listen(8080);