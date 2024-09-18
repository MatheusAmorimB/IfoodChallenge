window.onload = function() {
const produtos = {
  "Wendy's Burger": 36,
  "Double K": 20,
  "Cheddar Supreme": 25,
  "Fries": 30
};

const lat = -23.5317;
const lng = -46.7899;
const mapa = L.map('map').setView([lat,lng], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(mapa);

const pedidosHoje = 46;  
// Função para gerar uma coordenada aleatória em torno de um ponto central
function gerarCoordenadasAleatorias(lat, lng, raio) {
  const r = raio / 20000;
  const y0 = lat;
  const x0 = lng;
  const u = Math.random();
  const v = Math.random();
  const w = r * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);
  
  const latAleatoria = y + y0;
  const lngAleatoria = x + x0;
  
  return [latAleatoria, lngAleatoria];
}

for (let i = 0; i < pedidosHoje; i++) {
  const [latAleatoria, lngAleatoria] = gerarCoordenadasAleatorias(-23.53205, -46.8125, 1000); // Raio de 1 km
  L.marker([latAleatoria, lngAleatoria]).addTo(mapa)
    .bindPopup('Pedido realizado')
    .openPopup();
}
  
const ctx = document.getElementById('myChart').getContext('2d');
const labels = ["Wendy's", 'Double K'];
const data = [25, 15];
  
const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
  labels: labels,
  datasets: [{
    label: '# de Pedidos',
    data: data,
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgba(255, 99, 132, 1)',
    borderWidth: 1
  }]
    },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
});
  
  function mostrarSelecao() {
    document.getElementById('selecaoContainer').style.display = 'block';
  }
  
  function adicionarProduto() {
    const produtoSelecionado = document.getElementById('productSelect').value;
  
    if (produtoSelecionado && !labels.includes(produtoSelecionado)) {
      labels.push(produtoSelecionado); 
      data.push(produtos[produtoSelecionado]);
      myChart.update();
  
      const pedidoItem = document.createElement('div');
      pedidoItem.classList.add('pedido-item');
      pedidoItem.textContent = `Pedido ${labels.length}: ${produtoSelecionado}`;
      document.getElementById('listaPedidos').appendChild(pedidoItem);
  
      document.getElementById('selecaoContainer').style.display = 'none';
      document.getElementById('productSelect').value = "";
      } else {
        alert('Por favor, selecione um produto válido ou um que ainda não foi adicionado.');
      }
  }
}