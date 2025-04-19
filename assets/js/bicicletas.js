import { preencherDadosNoDOM, JSON_PATH } from './utils.js';

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

        bicicletasData.bikes.forEach((bike, index) => {
          let bikeItem = '';
          if(index == 1) {
             bikeItem = `
              <div class="bicicletas-bg">
                <div class="bicicletas container item">
                  <div class="bicicletas-imagem">
                    <img src="../assets/img/bicicleta/${bike.image}" alt="${bike.name}">
                    <span class="font-2-m cor-0">${bike.price}</span>
                  </div>
                  <div class="bicicletas-conteudo">
                    <h2 class="font-1-xl cor-0">${bike.name}</h2>
                    <p class="font-2-s cor-5">${bike.description}</p>
                    <ul class="font-1-m cor-5">
                      ${bike.features.map((feature) => `<li><img src="../assets/img/icones/${feature.img}">${feature.title}</li>`).join('')}
                    </ul>
                    <a class="botao seta" href="./bike.html?id=${bike.id}">Mais Sobre</a>
                  </div>
                </div>
              </div>
            `;

          } else {
          bikeItem = `
              <div class="bicicletas container item">
                <div class="bicicletas-imagem">
                <img src="../assets/img/bicicleta/${bike.image}" alt="${bike.name}">
                <span class="font-2-m cor-0">${bike.price}</span>
                </div>
                <div class="bicicletas-conteudo">
                  <h2 class="font-1-xl">${bike.name}</h2>
                  <p class="font-2-s cor-8">${bike.description}</p>
                  <ul class="font-1-m cor-8">
                    ${bike.features.map((feature) => `<li><img src="../assets/img/icones/${feature.img}">${feature.title}</li>`).join('')}
                  </ul>
                  <a class="botao seta" href="./bike.html?id=${bike.id}">Mais Sobre</a>
                </div>
              </div>
            `;
          }
         
          bikeContainer.innerHTML += bikeItem;
        });
      }
    })
    .catch((error) =>
      console.error('Erro ao carregar os dados da Home:', error)
    );
}
carregarDadosBicicletas();
