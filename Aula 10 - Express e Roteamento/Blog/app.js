//npm i express body-parser ejs

const express = require('express');
const app = express();
const porta = 8080;
const bodyParser = require('body-parser');

//Configurar EJA como mecânismo de visualização
app.set('view engine', 'ejs');
app.set('views',__dirname + 'views');

//Configurar os arquivos da pasta public
app.use(express.static('public'));

//Configurar o processamento de dados do forms
app.use(bodyParser.urlencoded({extended: true}));


