//importar express

const http = require('http');
const aleatorio = require('./utils.js');
const nome1 = 'Giovane';
const nome2 = 'Karina';
const express = require('express');
const app = express();
const dado = require('./dados.json');


// "corpo" do server
const requestListener = function(req, res){
    if(req.url === '/'){ //Exercicio 1 - Criar um servidor básico com Node.js

        res.writeHead(200, { 'Content-type': 'text/html; charset=utf8'}); //content-type altera a padronização de texto (plain, html, css)
        res.end('<h1>Bem-vindo!</h1><br><h1>Você está na Home.</h1><br><p>Por favor teste /sobre, /contato, /numero,<br>/saudacao/Giovane, /saudacao/Karina e localhost:3030/, /api/data, /api/data2.</p>');

    } else if(req.url === '/sobre') { //Exercicio 2 - Implementar múltiplas rotas básicas
        
        res.writeHead(200, {'Content-type': 'text/html; charset=utf8'});
        res.end('<h1>Sobre</h1><h1>Luigi Dominicano</h1>');

    } else if(req.url === '/contato') {

        res.writeHead(200, {'Content-type': 'text/html; charset=utf8'}); //charset=utf8 faz com que seja habilitado a funcionalidade de usar acentos.
        res.end('<h1>Contato</h1><h1>Making mofongo</h1>');

    } else if(req.url === '/numero') { //Exercicio 3 - Utilizar modulos personalizados

        res.writeHead(200 , {'Content-type': 'text/html; charset=utf8'});
        res.end(`<h1>Seu número é ${aleatorio.rand().toString()}!</h1>`);

    } else if(req.url === `/saudacao/${nome1}`) { //Exercicio 4 - Implementar rotas parametrizadas, acho que era assim para fazer

        res.writeHead(200 , {'Content-type': 'text/html; charset=utf8'});
        res.end(`<h1> Olá, ${nome1}!</h1><br><h2>Por favor teste /saudacao/Karina! (note o K maiusculo)</h2><br>`);

    } else if(req.url === `/saudacao/${nome2}`) { //Exercicio 4 - Extra pq sim.

        res.writeHead(200 , {'Content-type': 'text/html; charset=utf8'});
        res.end(`<h1> Olá, ${nome2}!</h1><br><h2>Por favor teste /saudacao/Giovane! (note o G maiusculo)</h2>`);

    } else {

        res.writeHead(404, {'Content-type': 'text/html; charset=utf8'});
        res.end("<h1>Página não encontrada!</h1>");

    }
}

//"abrindo" o server.
const server = http.createServer(requestListener);
server.listen(8000, 'localhost', ()=> {
    console.log("Servidor está rodando em http://localhost:8000 utilizando o http.");
})


app.get('/', (req, res) =>{ //Exercicio 5 - Criar um servidor Express básico
    res.send('<h1>Olá mundo, feito usando servidor Express.</h1><br><h2>Por favor teste /api/data e /api/data2.</h2>');
})

app.get('/api/data', (req, res) =>{ //api/data utilizando HTML
    res.set("Content-type", "text/html")
    res.send(`<h1>Nome: ${dado.nome}</h1>
                <h2>Idade: ${dado.idade}</h2>`)
})

app.get('/api/data2', (req, res) =>{//api/data2 json puro (não sei se era pra fazer assim.)
    res.send(dado);
})

app.listen(3030, () =>{
    console.log(`Servidor está rodando em http://localhost:3030 utilizando o express.`)
})
