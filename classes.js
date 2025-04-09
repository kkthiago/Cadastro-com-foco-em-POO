export class Usuario{
    constructor(nome, email){
        this.nome=nome
        this.email=email
    }

   toHTML(id=""){
    const li= document.createElement("li");
    li.id = id;
    li.innerHTML = `NOME: ${this.nome};<br> EMAIL: ${this.email} <button class="deletarUsuario">X</button>`;
    return li;
   }
}