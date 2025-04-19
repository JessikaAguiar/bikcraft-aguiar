import { preencherDadosNoDOM, JSON_PATH } from './utils.js';
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
        <div class="seguros-item">
          <h3 class="font-1-xl cor-p1">${plan.type}</h3>
          <span class="font-1-xl cor-0">${plan.price}<span class="font-1-xs cor-6">mensal</span></span>
          <ul class="font-2-m cor-0">
            ${plan.features.map((feature) => `<li>${feature}</li>`).join('')}
          </ul>
          <a class="botao" href="/bikcraft-aguiar/orcamento.html">Inscreva-se</a>
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
      <li>
        <img src="../assets/img/icones/${item.img}" alt="${item.title}">
        <h3 class="font-1-l cor-0">${item.title}</h3>
        <p class="font-2-s cor-5">${item.description}</p>
      </li>
    `
          )
          .join('');
      }

      const faqContainer = document.querySelector('.faq');
      if (seguroData.faq) {
        faqContainer.innerHTML = seguroData.faq.items
          .map(
            (item) => `
            <div>
              <dt class="font-1-m-b">${item.question}</dt>
              <dd class="font-2-s cor-9">${item.answer}</dd>
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
