const http = require('http');

const requestListener = function (req, res) {
    if(req.url === "/"){
        res.writeHead(200);
        res.end("Você está na Página Inicial");
    } else if(req.url === "/sobre"){
        res.writeHead(200);
        res.end("Você está na página sobre")
    }else{
        res.writeHead(404);
        res.end("Página não encontrada");
    }
};

const server = http.createServer(requestListener);

server.listen(8000, 'localhost', () => {
    console.log("Servidor está rodando em http://localhost:8000");
});