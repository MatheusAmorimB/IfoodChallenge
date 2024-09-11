window.onload = function() {

    function getValueById(id) {
        return document.getElementById(id).value.trim();
    }

    function saveToLocalStorage(key, value) {
        localStorage.setItem(key, value);
    }

    document.getElementById('formCadastro').addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = getValueById('nome');
        const email = getValueById('email');
        const senha = getValueById('password');
        const confirmSenha = getValueById('confirmPassword');
        const estabelecimento = getValueById('estabelecimento');
        const cnpj = getValueById('cnpj');

        if(senha !== confirmSenha) {
            alert("Senhas diferentes, verifique sua senha novamente!");
        }

        saveToLocalStorage('nomeCompleto', nome);
        saveToLocalStorage('emailCadastrado', email);
        saveToLocalStorage('senhaCadastrada', senha);
        saveToLocalStorage('confirmaSenha', confirmSenha);
        saveToLocalStorage('nomeEstabelecimento', estabelecimento);
        saveToLocalStorage('cnpj', cnpj);

        alert("Cadastro realizado com sucesso!");
        window.location.href = '/index.html'; 
    })
};