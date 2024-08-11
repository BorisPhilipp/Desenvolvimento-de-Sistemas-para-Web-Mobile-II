import React, { useEffect, useState } from 'react'; 
import './App.css'; 


function App() { //requisita um GET para API Kanye Rest e pega uma frase aleatória.
  const generateQuote = () => {
    fetch('https://api.kanye.rest/')// faz um GET para a API.
      .then(res => res.json()) //transforma a informação da API em JSON.
      .then(data => dailyQuote(data)) //chama a função e usa a frase aleatória como principal.
  }

  const dailyQuote = (quote) => {// exibe a frase
    const blockQuote = document.getElementById('daily-quote'); //adiciona um ID unico ao elemento "daily-quote"
    if (blockQuote) {
      blockQuote.classList.add('text-style');// clase text-style é atribuida ao elemento
      blockQuote.innerHTML = quote.quote;//define o conteudo
    }
  }

  return (//container onde fica os elementos HTML
    <div>
     
      <header><strong>
        Kayne Rest - Gerador de Frases
        </strong></header>
      <p id="daily-quote">

      </p>

      <img title= 'ME CLIQUE' src='https://upload.wikimedia.org/wikipedia/commons/b/bb/Kanye_West_at_the_Met_Gala_in_2019_2.png' onClick={() => generateQuote()}/>

      <footer>Kanye West</footer>


    </div>
  );
}


export default App;// exporta o componente para ser usado em outras áreas do React