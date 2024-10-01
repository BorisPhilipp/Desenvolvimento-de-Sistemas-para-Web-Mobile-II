const fs = require("fs");
const http = require("http");
const path = require("path")
const porta = 8080;

console.log(`http://localhost:${porta}`);
console.log("Faça seu Login!");


http.createServer(function(req, res){
    if(req.url === "/"){
        fs.readFile("index.html", function(err, data){
            res.writeHead(200, {"Content-Type": "text/html"});
            if (data){
                res.end(data);
            }
        });
    }
    else if(req.url.match("\.css$")){
        var csspath = path.join(__dirname, req.url);
        var fileStream = fs.createReadStream(csspath);
        res.writeHead(200, {"Content-Type": "text/css"});
        fileStream.pipe(res);
    }
    else if(req.url.match("\.png$")){
        var pngpath = path.join(__dirname, req.url);
        var fileStream = fs.createReadStream(pngpath);
        res.writeHead(200, {"Content-Type": "image/png"});
        fileStream.pipe(res);
    }
    else if(req.url=== '/inicio'){
        res.writeHead(200,{ "content-type": "text/html"});
        res.end("<h1>Bem-vindo a Pagina Inicial!</h1>");
    } else {
        fs.readFile("erro.html", function(err,data){
            if(data){
                res.writeHead(333, {"Content-Type": "text/html"});
                res.end(data);
            }
        })
    }

}).listen(porta);
