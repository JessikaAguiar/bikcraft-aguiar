import { preencherDadosNoDOM } from './utils.js';
// `${window.location.origin}/bikcraft-aguiar/assets/js/dados.json`
const JSON_PATH = `/assets/db/dados.json`;
function carregarDadosHome() {
  fetch(JSON_PATH)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao carregar o JSON');
      }
      return response.json();
    })
    .then((data) => {
      const homeData = data.pages.home;
      if (homeData.hero) {
        const selectors = {
          title: '.hero-title',
          description: '.hero-description',
        };

        preencherDadosNoDOM(homeData.hero, selectors);
      }

      if (homeData.bikes) {
        const bikesContainer = document.getElementById('bikes-container');
        bikesContainer.innerHTML = homeData.bikes
          .map(
            (bike) => `
              <li><a href="/bikcraft-aguiar/pages/bike.html?id=${bike.id}">
                <img src="./assets/img/bicicletas/${bike.image}" alt="${bike.name}">
                <h3 class="font-1-xl">${bike.name}</h3>
                <span class="font-2-m cor-8">${bike.price}</span>
              </a></li>
            `
          )
          .join('');
      }
      // Atualizar Tecnologia
      if (homeData.technology) {
        document.getElementById('technology-title').textContent =
          homeData.technology.title;
         document.getElementById('technology-description').textContent =
          homeData.technology.description;

        const technologyDetailsContainer =
          document.getElementById('technology-details');
        technologyDetailsContainer.innerHTML = homeData.technology.details
          .map(
            (detail) => `
              <div class="detail">
                <img src="./assets/img/icones/${detail.img}" width="24" height="24" alt="">
                <h3 class="font-1-m cor-0">${detail.title}</h3>
                <p class="font-2-s cor-5">${detail.description}</p>
              </div>
            `
          )
          .join('');
      }

      // Atualizar Depoimento
      if (homeData.testimonial) {
        document.querySelector('.testimonial-quote').textContent =
          homeData.testimonial.quote;
        document.querySelector('.testimonial-author').textContent =
          homeData.testimonial.author;
      }

      // Atualizar Planos
      if (homeData.plans) {
        const plansContainer = document.getElementById('plans');
        const plansHTML = homeData.plans
          .map(
            (plan) => `
            <div class="seguros-item">
              <h3 class="font-1-xl cor-6">${plan.type}</h3>
              <span class="font-1-xl cor-0">${plan.price}</span>
              <ul class="font-2-m cor-0">
                ${plan.features
                  .map((feature) => `<li>${feature}</li>`)
                  .join('')}
              </ul>
              <a class="botao secundario" href="/bikcraft-aguiar/pages/orcamento.html">Inscreva-se</a>
            </div>
            `
          )
          .join('');
        plansContainer.insertAdjacentHTML('beforeend', plansHTML);
      }
    })
    .catch((error) =>
      console.error('Erro ao carregar os dados da Home:', error)
    );
}

carregarDadosHome();
