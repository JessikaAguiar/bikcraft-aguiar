import { preencherDadosNoDOM, JSON_PATH } from './utils.js';
function carregarDadosOrcamento() {
  fetch(JSON_PATH)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao carregar o JSON');
      }
      return response.json();
    })
    .then((data) => {
      const orcamentoData = data.pages.orcamento;
      if (orcamentoData.hero) {
        const selectors = {
          title: '.hero-title',
          description: '.hero-description',
        };

        preencherDadosNoDOM(orcamentoData.hero, selectors);
      }
    })
    .catch((error) =>
      console.error('Erro ao carregar os dados da Home:', error)
    );
}
carregarDadosOrcamento();
