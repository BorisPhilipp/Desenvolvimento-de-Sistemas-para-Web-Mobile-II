import React, { useEffect, useState} from 'react';
import './App.css';

function App(){
  const [nutri, setNutri] = useState([]);

  useEffect(()=>{
    let url = 'https://sujeitoprogramador.com/rn-api/?api=posts';

    fetch(url)
    .then((r)=> r.json())
    .then((json) => setNutri(json))
  }, []);

  return(
    <div className='fundo'>
      <div className='secao-principal'>
        <header className='secao-header'>
          <strong>React-Nutri</strong>
          <li className='lista-direita'>
            <a href=''><ul>Entrar |</ul></a>
            <a href=''><ul>Noticias |</ul></a>
            <a href=''><ul>Contato</ul></a>
          </li>
        </header>


        {nutri.map((item)=>{
            return(
              <div className='secao-pagina'>
                <article key={item.id} className='secao-conteudo'>
                  <u><strong className='titulo-conteudo'>{item.titulo}</strong></u>
                  <br/>
                  <img src={item.capa} alt={item.titulo}/>
                  <p>{item.subtitulo}</p>
                  <br/>
                  <button>Acessar</button>
                </article>
              </div>  
            );
          })}
      </div>
    </div>
  );
}

export default App;
