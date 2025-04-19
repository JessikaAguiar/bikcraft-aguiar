import { preencherDadosNoDOM, JSON_PATH } from './utils.js';
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
        };
        preencherDadosNoDOM(contatosData.contactInfo, selectors);

        document.querySelector('.contact-phone').innerHTML =`<a href="tel:${contatosData.contactInfo.phone}">${contatosData.contactInfo.phone}</a>`;

        document.querySelector('.contact-email').innerHTML =
          contatosData.contactInfo.emails
            .map((email) => `<a href="mailto:${email}">${email}</a>`)
            .join('');
      }

      const storesContainer = document.querySelector('.local-stores');
      if (contatosData.localStores) {
        storesContainer.innerHTML = contatosData.localStores.locations
          .map(
            (location) => `
        <div class="lojas-item">
          <img src="../assets/img/lojas/${location.map}" alt="Mapa de ${location.city}">
          <div class="lojas-conteudo">
            <h3 class="font-1-xl">${location.city}</h3>
            <div class="lojas-dados font-2-s cor-8">
              <p>${location.address}</p>
            </div>
            <div class="lojas-dados font-2-s cor-8">
              <a href="mailto:${location.email}">${location.email}</a>
              <a href="tel:${location.phone}">${location.phone}</a>
            </div>
            
            <p class="lojas-tempo font-1-s"><img src="../assets/img/icones/horario.svg" alt="">${location.hours}</p>
          </div>
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
