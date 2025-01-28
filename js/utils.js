const JSON_PATH = `${window.location.origin}/js/dados.json`;
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

      // Atualizar os links do footer
      const footerLinksContainer = document.getElementById('footer-links');
      footerLinksContainer.innerHTML = footerData.links
        .map((link) => {
          let links = '';
          if (window.location.pathname !== `/pages/${link.link}`) {
            links = `/pages/${link.link}`;
          }
          return `<a href="${links}">${link.name}</a>`;
        })
        .join(' | ');

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
            let linkPath = `/pages/${item.link}`;
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
