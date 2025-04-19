import { preencherDadosNoDOM, JSON_PATH } from './utils.js';
const urlParams = new URLSearchParams(window.location.search);
const bikeId = urlParams.get('id');

function carregarDadosBike() {
  fetch(JSON_PATH)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao carregar o JSON');
      }
      return response.json();
    })
    .then((data) => {
      const bikes = data.pages.bicicletas.bikes;
      if (bikes) {
        const bike = bikes.find((b) => b.id === bikeId);
        if (bike) {
          const selectors = {
            name: '#bike-name',
            price: '#bike-price',
            description: '#bike-description',
          };

          preencherDadosNoDOM(bike, selectors);

          const bikesOrdenadas = [
            ...bikes.filter(b => b.id === bikeId),
            ...bikes.filter(b => b.id !== bikeId),
          ];

          const bikeImagesContainer  = document.getElementById('bike-image');
          bikeImagesContainer.innerHTML = bikesOrdenadas.map((bike) => 
            `<img src="../assets/img/bicicleta/${bike.image}" alt="${bike.name}">`
          ).join('');

          // Renderizar os recursos
          const featuresList = document.getElementById('bike-features');
          featuresList.innerHTML = bike.features
            .map((feature) => `
            <li>
              <img src="../assets/img/icones/${feature.img}" alt="${feature.title}">
              <h3 class="font-1-m cor-0">${feature.title}</h3>
              <p class="font-2-xs cor-5">${feature.description}</p>
            </li>`)
            .join('');

          // Renderizar os detalhes técnicos
          const technicalDetails = bike.technicalDetails;
          const technicalDetailsContainer = document.getElementById(
            'bike-technical-details'
          );
          technicalDetailsContainer.innerHTML = Object.entries(technicalDetails)
            .map(([key, value]) => `<li>${key}: <span>${value}</span></li>`)
            .join('');


          const otherBikes = [
            ...bikes.filter(b => b.id !== bikeId),
          ];

          const otherBikeImagesContainer  = document.getElementById('other-bikes');
          otherBikeImagesContainer.innerHTML = otherBikes.map((bike) => 
            `<li>
                <a href="/bikcraft-aguiar/pages/bike.html?id=${bike.id}">
                  <img src="../assets/img/bicicleta/${bike.image}" alt="">
                  <h3 class="font-1-xl">${bike.name}</h3>
                  <span class="font-2-m cor-8">R$ ${bike.price}</span>
                </a>
            </li>`
          ).join('');
        } else {
          document.getElementById('bike-details').innerHTML =
            '<p>Bicicleta não encontrada.</p>';
        }
      }
    })
    .catch((error) =>
      console.error('Erro ao carregar os dados da Home:', error)
    );
}

carregarDadosBike();
