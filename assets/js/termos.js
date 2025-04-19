import { preencherDadosNoDOM, JSON_PATH } from './utils.js';
function carregarDadosTermos() {
  fetch(JSON_PATH)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao carregar o JSON');
      }
      return response.json();
    })
    .then((data) => {
      const termosData = data.pages.termos;
      if (termosData.hero) {
        const selectors = {
          title: '.hero-title',
          description: '.hero-description',
        };

        preencherDadosNoDOM(termosData.hero, selectors);
      }

      const termsContainer = document.querySelector('.terms');
      if (termosData.terms) {
        termosData.terms.forEach((term) => {
          const termSection = `
        <div>
          <h2>${term.title}</h2>
          <ul>
            ${term.items.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      `;
          termsContainer.innerHTML += termSection;
        });
      }
    })
    .catch((error) =>
      console.error('Erro ao carregar os dados da Home:', error)
    );
}
carregarDadosTermos();
