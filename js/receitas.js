window.onload = function() {
  const receitas = [
      { data: '2024-09-07', valor: 1500.00, descricao: '' },
      { data: '2024-09-08', valor: 2000.00, descricao: '' },
      { data: '2024-09-09', valor: 1200.00, descricao: '' },
      { data: '2024-09-10', valor: 2500.00, descricao: '' },
      { data: '2024-09-11', valor: 1800.00, descricao: '' },
      { data: '2024-09-12', valor: 2800.00, descricao: '' },
      { data: '2024-09-13', valor: 1500.00, descricao: '' }
    ];

  const receitasHoje = [
    { data: '2024-09-14', valor: 55.25, descricao: "Entrega/ Combo Wendy's burger" },
    { data: '2024-09-14', valor: 40.00, descricao: 'Double K + refrigerante' },
    { data: '2024-09-14', valor: 135.00, descricao: 'Entrega/ Combo 3 hamburgues' },
    { data: '2024-09-14', valor: 36.75, descricao: 'Vegetarian + suco' }
  ];

  const hoje = new Date().toISOString().split('T')[0];

  function salvarReceitaGeral() {
    const receitasPassadas = [...receitas]
    const todasAsReceitas = [...receitas, ...receitasHoje];
    const receitaTotal = todasAsReceitas.reduce((acumulador, receita) => acumulador + receita.valor, 0);
    localStorage.setItem('receitaGeral', receitaTotal.toFixed(2));
    localStorage.setItem('listaReceitas', JSON.stringify(todasAsReceitas));
  }

  // Função para preencher a tabela com as receitas de hoje
  function preencherTabelaReceitasHoje() {
    const tabelaReceitasHoje = document.getElementById('tabelaReceitasHoje');
    tabelaReceitasHoje.innerHTML = '';

    receitasHoje.forEach(receita => {
      const row = `
        <tr>
          <td>${receita.data}</td>
          <td>R$ ${receita.valor.toFixed(2)}</td>
          <td>${receita.descricao}</td>
        </tr>
      `;
      tabelaReceitasHoje.innerHTML += row;
    });
  }

  // Função para renderizar o gráfico de receitas acumuladas dos dias passados
  function renderizarGraficoReceitas() {
    const ctx = document.getElementById('receitaAcumuladaChart').getContext('2d');
    const receitasPassadas = receitas.filter(receita => receita.data !== hoje);

    const labels = receitasPassadas.map(receita => receita.data);
    const dataValores = receitasPassadas.map(receita => receita.valor);

    const receitaAcumuladaChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Receitas Acumuladas',
          data: dataValores,
          backgroundColor: 'green',
          borderColor: 'blue',
          borderWidth: 3,
          fill: true
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Valor (R$)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Data'
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        }
      }
    });
  }

  // Chamando as funções para preencher a tabela e renderizar o gráfico
  salvarReceitaGeral();
  preencherTabelaReceitasHoje();
  renderizarGraficoReceitas();
  salvarTabelaReceitas();
}