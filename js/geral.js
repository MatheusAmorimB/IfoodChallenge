window.onload = function() {
    function carregarDados() {
      const receitas = JSON.parse(localStorage.getItem('listaReceitas')) || []; // Receitas salvas
      const despesas = JSON.parse(localStorage.getItem('listaDespesas')) || []; // Despesas salvas
      return { receitas, despesas };
    }
  
    // Função para preencher a tabela Receita vs Despesa
    function preencherTabelaReceitaDespesa() {
      const { receitas, despesas } = carregarDados();
      const tabela = document.getElementById('tabelaReceitaDespesa');
      tabela.innerHTML = '';
      
      receitas.forEach((receita, index) => {
        const despesa = despesas[index] || { valor: 0, descricao: 'Sem despesa correspondente' };
        const row = `
          <tr>
            <td>${receita.data}</td>
            <td>R$ ${receita.valor.toFixed(2)}</td>
            <td>R$ ${despesa.valor.toFixed(2)}</td>
          </tr>
        `;
        tabela.innerHTML += row;
      });
    }
  
    // Função para calcular e exibir o Lucro/Prejuízo Acumulado
    function exibirLucroPrejuizoAcumulado() {
      const { receitas, despesas } = carregarDados();
      const receitaTotal = receitas.reduce((total, r) => total + r.valor, 0);
      const despesaTotal = despesas.reduce((total, d) => total + d.valor, 0);
      const lucroPrejuizo = receitaTotal - despesaTotal;

      if (lucroPrejuizo >= 0) {
        document.getElementById('lucroPrejuizoAcumulado').innerText = `R$ +${lucroPrejuizo.toFixed(2)}`;
      } else {
        document.getElementById('lucroPrejuizoAcumulado').innerText = `R$ -${lucroPrejuizo.toFixed(2)}`;
      }  
    }
  
    // Função para calcular e exibir o Percentual de Lucro/Prejuízo
    function exibirPercentualLucroPrejuizo() {
      const { receitas, despesas } = carregarDados();
      const receitaTotal = receitas.reduce((total, r) => total + r.valor, 0);
      const despesaTotal = despesas.reduce((total, d) => total + d.valor, 0);
      
      const percentual = receitaTotal > 0 ? ((receitaTotal - despesaTotal) / receitaTotal) * 100 : 0;
      const progressBar = document.getElementById('percentualLucroPrejuizo');
      progressBar.style.width = `${percentual}%`;
      progressBar.innerText = `${percentual.toFixed(2)}%`;
    }
  
    // Função para preencher a tabela de Categorias de Despesas/Receitas
    function preencherTabelaCategorias() {
      const { receitas, despesas } = carregarDados();
      const categorias = [
        { categoria: 'Aluguel', receita: 0 || 0, despesa: 3500 || 0 },
        { categoria: 'Promoção Especial', receita: 1864 || 0, despesa: despesas[1]?.valor || 0 },
        { categoria: 'Pedidos Online', receita: receitas[2]?.valor || 0, despesa: despesas[2]?.valor || 0 },
        { categoria: 'Compra de Ingredientes', receita: 0 || 0, despesa: 2000 || 0 }
      ];
  
      const tabela = document.getElementById('tabelaCategorias');
      tabela.innerHTML = ''; // Limpa a tabela antes de preencher
      
      categorias.forEach(categoria => {
        const row = `
          <tr>
            <td>${categoria.categoria}</td>
            <td>R$ ${categoria.receita.toFixed(2)}</td>
            <td>R$ ${categoria.despesa.toFixed(2)}</td>
          </tr>
        `;
        tabela.innerHTML += row;
      });
    }

    // Chamando as funções para preencher os dados
    preencherTabelaReceitaDespesa();
    exibirLucroPrejuizoAcumulado();
    exibirPercentualLucroPrejuizo();
    preencherTabelaCategorias();
    preencherComparacaoSemanal();
}
  
