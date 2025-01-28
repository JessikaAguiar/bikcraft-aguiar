import { preencherDadosNoDOM } from './utils.js';

const JSON_PATH = `${window.location.origin}/assets/js/dados.json`;
function carregarDadosContato() {
  fetch(JSON_PATH)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao carregar o JSON');
      }
      return response.json();
    })
    .then((data) => {
      const contatosData = data.pages.contato;
      if (contatosData.hero) {
        const selectors = {
          title: '.hero-title',
          description: '.hero-description',
        };
        preencherDadosNoDOM(contatosData.hero, selectors);
      }
      if (contatosData.contactInfo) {
        const selectors = {
          title: '.contact-title',
          address: '.contact-address',
          phone: '.contact-phone',
        };
        preencherDadosNoDOM(contatosData.contactInfo, selectors);

        document.querySelector('.contact-email').innerHTML =
          contatosData.contactInfo.emails
            .map((email) => `<p>${email}</p>`)
            .join('');
      }

      const storesContainer = document.querySelector('.local-stores');
      if (contatosData.localStores) {
        storesContainer.innerHTML = contatosData.localStores.locations
          .map(
            (location) => `
        <div class="store">
          <h3>${location.city}</h3>
          <p>${location.address}</p>
          <p>${location.email}</p>
          <p>${location.phone}</p>
          <p>${location.hours}</p>
          <img src="../assets/img/lojas/${location.map}" alt="Mapa de ${location.city}">
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
carregarDadosContato();
