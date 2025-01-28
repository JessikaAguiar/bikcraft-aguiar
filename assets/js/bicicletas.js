import { preencherDadosNoDOM } from './utils.js';

const JSON_PATH = `${window.location.origin}/bikcraft-aguiar/assets/js/dados.json`;
function carregarDadosBicicletas() {
  fetch(JSON_PATH)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao carregar o JSON');
      }
      return response.json();
    })
    .then((data) => {
      const bicicletasData = data.pages.bicicletas;
      if (bicicletasData.hero) {
        const selectors = {
          title: '.hero-title',
          description: '.hero-description',
        };

        preencherDadosNoDOM(bicicletasData.hero, selectors);
      }
      if (bicicletasData.bikes) {
        const bikeContainer = document.querySelector('.bike-list');

        bicicletasData.bikes.forEach((bike) => {
          const bikeItem = `
        <div class="bike-item">
          <img src="../assets/img/bicicleta/${bike.image}" alt="${bike.name}">
          <h2>${bike.name}</h2>
          <p>${bike.description}</p>
          <ul>
            ${bike.features.map((feature) => `<li>${feature}</li>`).join('')}
          </ul>
          <span class="price">${bike.price}</span>
        </div>
      `;
          bikeContainer.innerHTML += bikeItem;
        });
      }
    })
    .catch((error) =>
      console.error('Erro ao carregar os dados da Home:', error)
    );
}
carregarDadosBicicletas();
