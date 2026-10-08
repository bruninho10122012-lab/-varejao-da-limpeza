(() => {
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const search = document.getElementById('productSearch');
  const category = document.getElementById('categoryFilter');
  const clear = document.getElementById('clearFilters');
  const cards = [...document.querySelectorAll('.product-card')];
  const status = document.getElementById('catalogStatus');
  const whatsapp = 'https://wa.me/5571991618530?text=';

  menuToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.textContent = open ? '×' : '☰';
  });
  mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  }));

  function filterProducts() {
    const query = (search.value || '').trim().toLocaleLowerCase('pt-BR');
    const selected = category.value;
    let visible = 0;
    cards.forEach(card => {
      const searchable = `${card.dataset.name} ${card.innerText}`.toLocaleLowerCase('pt-BR');
      const categoryMatch = selected === 'all' || card.dataset.category === selected;
      const searchMatch = !query || searchable.includes(query);
      const show = categoryMatch && searchMatch;
      card.classList.toggle('hidden-card', !show);
      if (show) visible++;
    });
    status.textContent = `${visible} ${visible === 1 ? 'opção encontrada' : 'opções encontradas'}. Consulte disponibilidade pelo WhatsApp.`;
  }
  search.addEventListener('input', filterProducts);
  category.addEventListener('change', filterProducts);
  clear.addEventListener('click', () => {
    search.value = '';
    category.value = 'all';
    filterProducts();
    search.focus();
  });
  document.querySelectorAll('.wa-product').forEach(link => {
    const product = link.dataset.product;
    link.href = whatsapp + encodeURIComponent(`Olá! Vi o produto ${product} no site do Varejão da Limpeza. Gostaria de consultar o preço e a disponibilidade.`);
    link.target = '_blank';
    link.rel = 'noopener';
  });
  document.getElementById('year').textContent = new Date().getFullYear();
  filterProducts();
})();
