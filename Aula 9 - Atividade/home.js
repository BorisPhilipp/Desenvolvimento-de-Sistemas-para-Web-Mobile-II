//importar fs (readline-sync)

const http = require('http');
const read = require('fs')
const aleatorio = require('./utils.js')
console.log(aleatorio.rand)

const requestListener = function(req, res){
    if(req.url === '/'){
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end('<h1>Bem-vindo!</h1><br><h1>Voce esta na Home.</h1>')
    } else if(req.url === '/sobre') {
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end('<h1>Sobre</h1><h1>Luigi Dominicano</h1>')
    } else if(req.url === '/contato') {
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end('<h1>Contato</h1><h1>Making mofongo</h1>')
    } else if(req.url === '/numero') {
        res.writeHead(200 , {'Content-type': 'text/html'});
        res.end(`Seu numero e ${aleatorio.rand().toString()}`)
    }else {
        res.writeHead(404);
        res.end("<h1>Página não encontrada</h1>");
    }
}

const server = http.createServer(requestListener);

server.listen(8000, 'localhost', ()=> {
    console.log("Servidor está rodando em http://localhost:8000");
})


/*
Exercício 4: Implementar rotas parametrizadas
Crie um servidor que responda com uma saudação personalizada quando acessado por
uma URL como "/saudacao/seu_nome". Por exemplo, "/saudacao/joao" deve responder
com "Olá, João!".
Pontos-chave:
● Usar parâmetros na rota
● Extrair informações da URL para personalizar a resposta

Exercício 5: Criar um servidor Express básico
Usando o framework Express, crie um servidor que tenha duas rotas:
● "/" - Responder com uma página HTML simples
● "/api/data" - Responder com um objeto JSON contendo informações básicas sobre
você
Pontos-chave:
● Instalar e configurar o Express
● Usar o Express para gerenciar rotas
● Responder com diferentes tipos de conteúdo (HTML e JSON)
*/