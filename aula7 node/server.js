const http = require('http');
const fs = require('fs');
const path = require('path'); //Primeiro desafio

const requestListener = function (req, res) {
    if(req.url === "/"){
        res.writeHead(200);
        res.end("Você está na Página Inicial");
    } else if(req.url === "/sobre"){
        const filePath = path.join(__dirname, 'sobre.txt'); //Desafio
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                res.writeHead(200);
                res.end("Página não encontrada.");
                return;
            }
            res.writeHead(200);
            res.end(data);
        })

    }else{
        res.writeHead(404);
        res.end("Página não encontrada");
    }
};

const server = http.createServer(requestListener);

server.listen(8000, 'localhost', () => {
    console.log("Servidor está rodando em http://localhost:8000");
});
