window.onload = function() {
    function getValueById(id) {
       return document.getElementById(id).value.trim();
    }

    document.getElementById('formLogin').addEventListener('submit', function(event){
        event.preventDefault();

        const email = getValueById('loginEmail');
        const senha = getValueById('loginPassword');

        if (email === "" || senha === "") {
            alert("Por favor, preencha todos os campos.")
            return;
        }

        const emailCadastrado = localStorage.getItem('emailCadastrado');
        const senhaCadastrada = localStorage.getItem('senhaCadastrada');

        if(!emailCadastrado || !senhaCadastrada) {
            alert("Voce ainda não possui um cadastro. Cadastra-se agora mesmo!");
            return;
        }

        if (email.toLowerCase() === emailCadastrado.toLowerCase() && senha === senhaCadastrada) {
            alert("Login realizado com sucesso!");
            window.location.href = '/Pages/dashboard.html';
        } else {
            alert("Email ou senha incorretos.Tente novamente!")
        }
    })
};