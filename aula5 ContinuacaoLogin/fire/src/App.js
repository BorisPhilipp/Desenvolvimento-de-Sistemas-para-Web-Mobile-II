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

  const [usuario, setUsuario] = useState(false);
  const [detalhesUsuario, setDetalhesUsuario] = useState({});


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

  useEffect(()=>{
    async function verificarLogin(){

      onAuthStateChanged(auth, (user)=> {
        if(user){
          //tem usuario logado
          setUsuario(true);
          setDetalhesUsuario({
            uid: user.uid,
            email: user.email
          })
        } else {
          //não possui usuario logado
          setUsuario(false);
          setDetalhesUsuario({}); 
        }
      })

    }
    verificarLogin();
  }, [])

  async function novoUsuario(){
    await createUserWithEmailAndPassword(auth, email, senha)
    .then(()=>{
      alert("Usuario cadstrado com sucesso!")
      setEmail("");
      setSenha("");
    }).catch((error)=>{
      if(error.code === 'auth/weak-password'){
        alert("Senha muito fraca")
      } else if(error.code === 'auth/email-already-in-use'){
        alert("Email já existe!")
      }
    })
  }

  async function logarUsuario(){
    await signInWithEmailAndPassword(auth, email, senha)
    .then((value)=> {
      alert("Usuario logado com sucesso!")

      setUsuario(true);
      setDetalhesUsuario({
        uid: value.user.uid,
        email: value.user.email
      });

      setEmail("");
      setSenha("");
    })
    .catch(()=>{
      alert("Erro ao fazer o login")
    })
  }

  async function fazerLogout(){
    await signOut(auth)
    setUsuario(false)
    setDetalhesUsuario({})
  }

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

      {usuario && (
        <div>
          <strong>Seja bem-vindo (a)</strong>
          <br/>
          <span>ID: {detalhesUsuario.uid}</span>
          <br/>
          <span>Email: {detalhesUsuario.email}</span>
          <br/>
          <button onClick={fazerLogout}>Sair</button>
        </div>
      )}

      <h2>Usuários</h2>
      <label>Email:</label>
      <input
      type="email"
      placeholder="Digite seu email"
      value={email}
      onChange={ (e) => setEmail(e.target.value)}/>

      <label>Senha:</label>
      <input
      type="password"
      placeholder="Digite uma senha"
      value={senha}
      onChange={ (e) => setSenha(e.target.value)}/>

      <button onClick={novoUsuario}>Cadastrar</button>
      <button onClick={logarUsuario}>Login</button>

      <hr/>


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