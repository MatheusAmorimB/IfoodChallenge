window.onload = function() {
  const despesas = [
    { data: '2024-09-10', valor: 500.00, descricao: 'Compra de ingredientes' },
    { data: '2024-09-11', valor: 1200.00, descricao: 'Pagamento de aluguel' },
    { data: '2024-09-12', valor: 400.00, descricao: 'Manutenção de equipamentos' },
    { data: '2024-09-13', valor: 600.00, descricao: 'Compra de embalagens' },
    { data: '2024-09-14', valor: 300.00, descricao: 'Pagamento de funcionários' },
    { data: '2024-09-15', valor: 900.00, descricao: 'Compra de bebidas' },
    { data: '2024-09-16', valor: 350.00, descricao: 'Despesas diversas' }
  ];

  const despesasHoje = [
    { data: '2024-09-17', valor: 50.00, descricao: 'Compra de temperos' },
    { data: '2024-09-17', valor: 90.00, descricao: 'Entrega de mercadorias' },
    { data: '2024-09-17', valor: 75.00, descricao: 'Manutenção elétrica' },
    { data: '2024-09-17', valor: 120.00, descricao: 'Compra de embalagens' }
  ];
  
  const hoje = new Date().toISOString().split('T')[0];

  function salvarDespesaGeral() {
    const todasAsDespesas = [...despesas, ...despesasHoje];
    const despesaTotal = todasAsDespesas.reduce((acumulador, despesa) => acumulador + despesa.valor, 0);
    localStorage.setItem('despesaGeral', despesaTotal.toFixed(2));
    localStorage.setItem('listaDespesas', JSON.stringify(todasAsDespesas));
  }
  
  // Função para preencher a tabela com as despesas de hoje
  function preencherTabelaDespesasHoje() {
    const tabelaDespesasHoje = document.getElementById('tabelaDespesasHoje');
    tabelaDespesasHoje.innerHTML = '';
  
    despesasHoje.forEach(despesa => {
        const row = `
            <tr>
            <td>${despesa.data}</td>
            <td>R$ ${despesa.valor.toFixed(2)}</td>
            <td>${despesa.descricao}</td>
            </tr>
        `;
        tabelaDespesasHoje.innerHTML += row;
    });
  }
  
  // Função para renderizar o gráfico de despesas acumuladas dos dias passados
  function renderizarGraficoDespesas() {
    const ctx = document.getElementById('despesaAcumuladaChart').getContext('2d');
    const despesasPassadas = despesas.filter(despesa => despesa.data !== hoje);
  
    const labels = despesasPassadas.map(despesa => despesa.data);
    const dataValores = despesasPassadas.map(despesa => despesa.valor);
  
    const despesaAcumuladaChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Despesas Acumuladas',
            data: dataValores,
            backgroundColor: 'red',
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
  salvarDespesaGeral();
  preencherTabelaDespesasHoje();
  renderizarGraficoDespesas();
}