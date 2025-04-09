export const validarEmail = (email) =>{
    return email.includes("@") && email.includes(".");
};

export const limparCampos= (...ids) =>{
    ids.forEach(id => document.getElementById(id).value = "");
};
