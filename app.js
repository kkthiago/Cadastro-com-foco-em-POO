import { Usuario } from './classes.js';
import { validarEmail, limparCampos } from "./utils.js";


const cadastroNE = document.getElementById("cadastroNE");
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");

const carregarUsuarios = () => {
    fetch("https://crudcrud.com/api/7b04b002195240ec9274845a7f469f12/cadastrodecontas")
        .then(resposta => resposta.json())
        .then(cadastro => {
            cadastro
                .map(c => new Usuario(c.nome, c.email))
                .forEach((usuario,index) => {
                    const li = usuario.toHTML(cadastro[index]._id)
                    cadastroNE.appendChild(li);
                });
        })
        .catch(erro => console.error("Erro ao buscar cadastro:", erro));
};
        

const cadastrarUsuario = ()=>{
    const nome = nomeInput.value;
    const email = emailInput.value;

    if(!validarEmail(email)){
        alert("Email inválido... <br>Tente novamente")
        return;
    }

    const novoUsuario = new Usuario(nome,email);
 
    fetch("https://crudcrud.com/api/7b04b002195240ec9274845a7f469f12/cadastrodecontas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome: nome, email: email })
    })
    .then(resposta => resposta.json())
    .then(cadastro =>{
        const li = novoUsuario.toHTML(cadastro._id);
        cadastroNE.appendChild(li);
        limparCampos("nome","email");
    })
    .catch(erro => console.error("Erro ao cadastrar usuário:", erro));
        
};

document.getElementById("cadastrar").addEventListener("click", cadastrarUsuario);



document.addEventListener("click", (event) => {
    if (event.target.classList.contains("deletarUsuario")) {
        const item = event.target.parentElement;
        const _id = item.id;
      
        fetch(`https://crudcrud.com/api/7b04b002195240ec9274845a7f469f12/cadastrodecontas/${_id}`, {
            method: "DELETE"
        })
        .then(() => {
            item.remove();
        })
        .catch(erro => console.error("Erro ao deletar usuário:", erro));
        }
    });
    


carregarUsuarios();