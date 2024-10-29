const express = require('express')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();

app.get('/', (req,res) =>{
    res.send("<h1>TESTE</h1>");
})

app.get('/dashboard', (req,res) =>{
    res.send("<h1>Dashboard</h1>");
})




app.listen(8080); //2 - Configurar o servidor Express.
/*
Requisitos:

° Criar um servidor web básico usando Express.a
° Implementar rotas para login e logout.
° Usar cookies para armazenar informações do usuário.
° Utilizar sessions para manter o estado de autenticação.
° Criar uma página protegida que só pode ser acessada por usuários autenticados.

Passo a passo para resolver o exercício:

1 - Instalar as dependências necessárias. O
2 - Configurar o servidor Express. O
3 - Implementar rotas básicas. +-
4 - Adicionar suporte a sessions.
5 - Implementar rota de login.
6 - Implementar rota de logout.
7 - Criar rota protegida.
8 - Implementar middleware de autenticação.
*/