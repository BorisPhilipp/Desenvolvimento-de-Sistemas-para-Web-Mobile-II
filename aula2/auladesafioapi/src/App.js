import { useState, useEffect } from "react";

function App(){
  const [quote, setQuote] = useState();

  useEffect(()=>{
    let url = 'https://api.kanye.rest/';

    fetch(url)
    .then((r)=> r.json())
    .then((json) => setQuote(json))
  }, []);

    {quote.map((item)=>{
      return(
        <div>
          <article key={item.id}></article>
        </div>
      );
    })}

}

export default App;