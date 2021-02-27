import React, { Component } from 'react';
import firebase from './config';

class App extends Component{
      constructor(props){
        super(props);
        this.state={
           email:'',
           senha:'',
           user:null
        }
       this.cadastrar= this.cadastrar.bind(this);
       this.logar    = this.logar.bind(this);
       this.deslogar = this.deslogar.bind(this);
    } 
    componentDidMount(){
        this.auth();
    }
    auth(){
       firebase.auth().onAuthStateChanged((user)=>{
         if(user){
          this.setState({email:"",senha:""});
          this.setState({user:user})
          }
       })
    }
    
      cadastrar(){
        firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.senha)
        .catch((error)=>{
           if(error){
             alert("Error: " +error.code)
           }
        })
       this.auth();
      }
      
      logar(){
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.senha)
        .catch((error)=>{
          if(error){
            alert('Error:' +error.code)
          }
        })
      }
      
      deslogar(){
        firebase.auth().signOut();
        this.setState({user:null})
      }

      render(){
        return(
          <div>
          {this.state.user?
             <div>
               <h1>Ola seja bem vindo</h1>
               <h3>{this.state.user.email}</h3>
               <button onClick={this.deslogar} >Deslogar</button>
             </div>  
          : 
          <div>
          <label>Email</label><br/>
          <input type="text" value={this.state.email}  
                 onChange={(e)=>{this.setState({email:e.target.value})}}
          /><br/>
           <label>Senha</label><br/>
          <input type="text" value={this.state.senha}  
                 onChange={(e)=>{this.setState({senha:e.target.value})}}
          /><br/>
          <button onClick={this.cadastrar}>Cadastrar</button>
          <button onClick={this.logar}>Logar</button>
        
          </div>
            }
          </div>
        );
      }
  }
export default App;