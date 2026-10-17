(() => {
  // Preserve previously shared download links after moving the product page.
  if (location.hash === '#download') {
    location.replace('musica.html#download');
    return;
  }
  const buttons = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('[data-category]')];
  const status = document.querySelector('#catalog-status');
  const categories = ['all', ...cards.map(card => card.dataset.category)];
  let selected = 'all';

  function filter(category) {
    selected = categories.includes(category) ? category : 'all';
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === selected)));
    cards.forEach(card => { card.hidden = selected !== 'all' && card.dataset.category !== selected; });
    const visible = cards.filter(card => !card.hidden);
    const released = visible.filter(card => card.dataset.released === 'true').length;
    const pending = visible.length - released;
    const en = document.documentElement.lang === 'en';
    status.textContent = en ? `${released} released · ${pending} planned ${pending === 1 ? 'category' : 'categories'}` : `${released} 个已发布作品 · ${pending} 个筹备中的分类`;
  }
  function readHash() {
    if (location.hash === '#download') {
      location.replace('musica.html#download');
      return;
    }
    const match = location.hash.match(/^#category=([a-z]+)$/);
    filter(match ? match[1] : 'all');
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    history.replaceState(null, '', category === 'all' ? '#projects' : `#category=${category}`);
    filter(category);
  }));
  new MutationObserver(() => filter(selected)).observe(document.documentElement, {attributes:true, attributeFilter:['lang']});
  window.addEventListener('hashchange', readHash);
  readHash();
  if (location.hash.startsWith('#category=')) document.querySelector('#projects').scrollIntoView();
})();
