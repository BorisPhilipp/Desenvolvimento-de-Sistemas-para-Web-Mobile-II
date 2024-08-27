import { useState, useEffect } from 'react';
import { db, auth } from './firebaseConnection';

import {
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,

} from 'firebase/firestore'

import{
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged
} from 'firebase/auth'

function App(){
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [idPost, setIdPost] = useState("");

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [post, setPost] = useState([]);

  useEffect(()=>{
    async function carregarPosts(){
      const dados = onSnapshot(collection(db,"posts"), (snapshot)=>{
        let listaPost = [];

        snapshot.forEach((doc)=>{
          listaPost.push(
            {
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor
            }
          );
        });
        setPost(listaPost)
      });
    }
    carregarPosts();
  }, [])

  //C - create
  async function adicionarPosts(){
    await addDoc(collection(db,"posts"),{
      titulo: titulo,
      autor: autor,
    }).then(()=>{
      alert("Cadastrado realizado com sucesso!")
      setAutor("");
      setTitulo("");
    }).catch((error) => {
      console.log(error);
    })
  }

  //R - read
  async function buscarPosts(){
    const config = collection(db, "posts");
    await getDocs(config).then((snapshot)=>{
      let lista = [];

      snapshot.forEach((doc)=>{
        lista.push(
          {
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor
          }
        );
      });

      setPost(lista);


    }).catch((error) => {
      console.log(error);
    })

  }

  //U - update
  async function editarPost(){
    const postEditado = doc(db, "post", idPost);

    await updateDoc(postEditado, {
      titulo: titulo,
      autor: autor
    }).then(()=>{
      alert("Post editado com sucesso!");
      setIdPost("");
      setTitulo("");
      setAutor("");
    }).catch((error) => {
      console.log(error);
    })
  }

  async function excluirPost(id){
    const postDeletado = doc(db, "posts", id);
    await deleteDoc(postDeletado).then(()=>{
      alert("Post deletado com sucesso")
    }).catch((error) => {
      console.log(error);
    })
  }

  //D - delete 
  async function excluirPost(id){
    const postDeletado = doc(db, "posts", id);
    await deleteDoc(postDeletado).then(() => {
      alert("Post Deletado com sucesso!");
    }).catch(error => {
      console.log(error);
    })
  }

  return(
    <div>
      <h1>ReactJS + Firebase</h1>

      <h2>POSTS</h2>
      <label>ID do Post</label>
      <input placeholder="ID do post"
      value={idPost}
      onChange={ (e) => setIdPost(e.target.value)}/>
      <br/>
      <br/>

      <label>Título:</label>
      <textarea
      type="text"
      placeholder="Título"
      value={titulo}
      onChange={ (e) => setTitulo(e.target.value)}/>
      <br/>
      <br/>

      <label>Autor:</label>
      <input
      type="text"
      placeholder="Autor do post"
      value={autor}
      onChange={ (e) => setAutor(e.target.value)}/>
      <br/>
      <br/>

      <button onClick={adicionarPosts}>Inserir</button>
      <button onClick={buscarPosts}>Buscar</button>
      <button onClick={editarPost}>Editar</button>

      <ul>
        {post.map(
          (value) => (
            <li key={value.id}>
              <strong>ID: {value.id}</strong>
              <span>Título: {value.titulo}</span>
              <span>Autor: {value.autor}</span>
              <button onClick={() => excluirPost(value.id)}>Excluir</button>
            </li>
          )
        )}
      </ul>
    </div>
  );



}

export default App;