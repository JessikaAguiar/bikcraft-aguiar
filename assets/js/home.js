import { preencherDadosNoDOM } from './utils.js';
const JSON_PATH = '../assets/js/dados.json';
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
              <a href="/pages/bike.html?id=${bike.id}"><div class="bike">
                <img src="./assets/img/bicicletas/${bike.image}" alt="${bike.name}">
                <h3>${bike.name}</h3>
                <p>${bike.price}</p>
              </div></a>
            `
          )
          .join('');
      }
      // Atualizar Tecnologia
      if (homeData.technology) {
        document.querySelector('.technology-title').textContent =
          homeData.technology.title;
        document.querySelector('.technology-description').textContent =
          homeData.technology.description;

        const technologyDetailsContainer =
          document.getElementById('technology-details');
        technologyDetailsContainer.innerHTML = homeData.technology.details
          .map(
            (detail) => `
              <div class="detail">
                <h4>${detail.title}</h4>
                <p>${detail.description}</p>
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
        plansContainer.innerHTML = homeData.plans
          .map(
            (plan) => `
              <div class="plan">
                <h3>${plan.type}</h3>
                <p>${plan.price}</p>
                <ul>
                  ${plan.features
                    .map((feature) => `<li>${feature}</li>`)
                    .join('')}
                </ul>
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

carregarDadosHome();
