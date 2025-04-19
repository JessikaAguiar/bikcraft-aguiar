export const JSON_PATH = `/bikcraft-aguiar/assets/db/dados.json`;
export function carregarFooter() {
  fetch(JSON_PATH)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao carregar o JSON');
      }
      return response.json();
    })
    .then((data) => {
      const footerData = data.layout.footer;

      // Atualizar os dados de contato
      document.getElementById('footer-contact-phone').textContent =
        footerData.contact.phone;
      document.getElementById('footer-contact-email').textContent =
        footerData.contact.email;
      document.getElementById('footer-contact-address').textContent =
        footerData.contact.address;
      document.getElementById('footer-contact-country').textContent =
        footerData.contact.country;

      // Atualizar os links do footer
      const footerLinksContainer = document.getElementById('footer-links');
      footerLinksContainer.innerHTML = footerData.links
        .map((link) => {
          let links = '';
          if (window.location.pathname !== `/pages/${link.link}`) {
            links = `/bikcraft-aguiar/pages/${link.link}`;
          }
          return `<li><a href="${links}">${link.name}</a></li>`;
        })
        .join('');

      // Atualizar o copyright
      document.getElementById('footer-copy').textContent = footerData.copy;
    })
    .catch((error) => console.error('Erro ao carregar o footer:', error));
}

export function carregarMenu() {
  fetch(JSON_PATH)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao carregar o JSON');
      }
      return response.json();
    })
    .then((data) => {
      const menuData = data.layout.menu;

      // Localizar o contêiner do menu
      const menuContainer = document.getElementById('menu');
      if (menuContainer) {
        menuContainer.innerHTML = menuData
          .map((item) => {
            // TODO: alterar antes de subir `/bikcraft-aguiar/pages/${item.link}`;
            let linkPath = `/bikcraft-aguiar/pages/${item.link}`;
            if (`${item.link}` === 'index.html') {
              linkPath = `/${item.link}`;
            }
            return `<li>
                      <a href="${linkPath}">${item.name}</a>
                    </li>`;
          })
          .join('');
      }
    })
    .catch((error) => console.error('Erro ao carregar o menu:', error));
}

export function preencherDadosNoDOM(data, selectors) {
  Object.keys(selectors).forEach((key) => {
    const elemento = document.querySelector(selectors[key]);
    if (elemento && data[key]) {
      elemento.textContent = data[key];
    }
  });
}
