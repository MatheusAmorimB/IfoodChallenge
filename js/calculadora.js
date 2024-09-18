let displayValue = '';
let selectedType = '';

      function appendNumber(number) {
        displayValue += number;
        document.getElementById('display').value = displayValue;
      }

      function clearDisplay() {
        displayValue = '';
        document.getElementById('display').value = displayValue;
        document.getElementById('result').innerHTML = '';
        document.getElementById('resultContainer').classList.add('hidden');
      }

      function selectType(type) {
        selectedType = type;
      }

      function calculate() {
        let value = parseFloat(displayValue);
        if (isNaN(value)) {
          document.getElementById('result').innerHTML = 'Por favor, insira um valor válido.';
          return;
        }

        if (!selectedType) {
            let alertModal = new bootstrap.Modal(document.getElementById('alertModal'));
            alertModal.show();
            return;
        }

        let commissionRate = selectedType === 'delivery' ? 0.23 : 0.12;
        let ifoodFeeRate = 0.032;

        let commissionFee = value * commissionRate;
        let ifoodFee = value * ifoodFeeRate;
        let totalFee = commissionFee + ifoodFee;
        let netValue = value - totalFee;

        document.getElementById('result').innerHTML = `
          <p class="maior">Você Recebe: R$ ${netValue.toFixed(2)}</p>
          <p class="menor">Valor líquido</p>
          <p class="maior">Valor Total das Taxas: R$ ${totalFee.toFixed(2)}</p>
          <p class="menor">Comissão (${(commissionRate * 100).toFixed(0)}%): R$ ${commissionFee.toFixed(2)}</p>
          <p class="menor">Pagamento via iFood (3.2%): R$ ${ifoodFee.toFixed(2)}</p>
          <p class="maior">Valor a Cobrar: R$ ${value.toFixed(2)}</p>
          <p class="menor">Seu cliente paga</p>
        `;

                let escolhaContent = '';
        if (selectedType === 'basic') {
            escolhaContent = `
            <span>Básico</span>
            <div class="icon">
                <i class="bi bi-bag-fill"></i>
            </div>
            `;
        } else if (selectedType === 'delivery') {
            escolhaContent = `
            <span>Entrega</span>
            <div class="icon">
                <i class="bi bi-bicycle bike"></i>
            </div>
            `;
        }

        document.querySelector('.opcao').innerHTML = escolhaContent;
        document.getElementById('resultContainer').classList.remove('hidden');
        displayValue = '';
        document.getElementById('display').value = '';
}