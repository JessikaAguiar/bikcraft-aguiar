import { preencherDadosNoDOM } from './utils.js';
const JSON_PATH = `${window.location.origin}/assets/js/dados.json`;
function carregarDadosSeguro() {
  fetch(JSON_PATH)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao carregar o JSON');
      }
      return response.json();
    })
    .then((data) => {
      const seguroData = data.pages.seguros;
      if (seguroData.hero) {
        const selectors = {
          title: '.hero-title',
          description: '.hero-description',
        };

        preencherDadosNoDOM(seguroData.hero, selectors);
      }
      const plansContainer = document.querySelector('.plans');
      if (seguroData.plans) {
        seguroData.plans.forEach((plan) => {
          const planItem = `
        <div class="plan">
          <h3>${plan.type}</h3>
          <span class="price">${plan.price}</span>
          <ul>
            ${plan.features.map((feature) => `<li>${feature}</li>`).join('')}
          </ul>
        </div>
      `;
          plansContainer.innerHTML += planItem;
        });
      }

      const advantagesContainer = document.querySelector('.advantages');
      if (seguroData.advantages) {
        advantagesContainer.innerHTML = seguroData.advantages.items
          .map(
            (item) => `
      <div class="advantage">
        <h4>${item.title}</h4>
        <p>${item.description}</p>
      </div>
    `
          )
          .join('');
      }

      const faqContainer = document.querySelector('.faq');
      if (seguroData.faq) {
        faqContainer.innerHTML = seguroData.faq.items
          .map(
            (item) => `
            <div class="faq-item">
              <h4>${item.question}</h4>
              <p>${item.answer}</p>
            </div>
          `
          )
          .join('');
      }
    })
    .catch((error) =>
      console.error('Erro ao carregar os dados da Home:', error)
    );
}
carregarDadosSeguro();
