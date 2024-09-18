window.onload = function() {
    function exibirReceitaGeral() {
        const receitaGeral = localStorage.getItem('receitaGeral');

        if (receitaGeral) {
            document.getElementById('receitaGeral').innerText = `R$ ${receitaGeral}`
        } else {
            document.getElementById('receitaGeral').innerText = 'R$ 0,00'
        }
    }

    function exibirDespesaGeral() {
        const despesaGeral = localStorage.getItem('despesaGeral');

        if(despesaGeral) {
            document.getElementById('despesaGeral').innerText = `R$ ${despesaGeral}`
        } else {
            document.getElementById('despesaGeral').innerText = 'R$ 0,00'
        }
    }

    function exibirValorGeral() {
        const despesa = parseFloat(localStorage.getItem('despesaGeral'))
        const receita = parseFloat(localStorage.getItem('receitaGeral'))
        const valorGeral = receita - despesa;

        if(!isNaN(valorGeral)) {
            document.getElementById('valorGeral').innerText = `R$ ${valorGeral.toFixed(2)}`
        } else {
            document.getElementById('valorGeral').innerText = 'R$ 0,00'
        }
    }

    exibirReceitaGeral();
    exibirDespesaGeral();
    exibirValorGeral();
}