import { preencherDadosNoDOM } from './utils.js';
const JSON_PATH = '../assets/js/dados.json';
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

          const bikeImage = document.getElementById('bike-image');
          bikeImage.src = `../assets/img/bicicleta/${bike.image}`;
          bikeImage.alt = bike.name;

          // Renderizar os recursos
          const featuresList = document.getElementById('bike-features');
          featuresList.innerHTML = bike.features
            .map((feature) => `<li>${feature}</li>`)
            .join('');

          // Renderizar os detalhes técnicos
          const technicalDetails = bike.technicalDetails;
          const technicalDetailsContainer = document.getElementById(
            'bike-technical-details'
          );
          technicalDetailsContainer.innerHTML = Object.entries(technicalDetails)
            .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
            .join('');
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
