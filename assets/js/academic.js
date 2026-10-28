(() => {
  'use strict';
  const defaultPortraits = Array.from(document.querySelectorAll('img.member-placeholder'));
  if (defaultPortraits.length) {
    // One choice per page: 90% typing, 2% for each of the five leisure scenes.
    const leisurePortraits = [
      'coda-cat-coffee.png',
      'coda-cat-badminton.png',
      'coda-cat-switch.png',
      'coda-cat-television.png',
      'coda-cat-shopping.png',
    ];
    const choice = Math.floor(Math.random() * 100);
    const filename = choice < 90
      ? 'coda-cat-typing.png'
      : leisurePortraits[Math.floor((choice - 90) / 2)];
    const source = new URL(filename, defaultPortraits[0].src).href;
    defaultPortraits.forEach((portrait) => { portrait.src = source; });
  }
  const button = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-navigation');
  if (button && nav) {
    document.documentElement.classList.add('nav-ready');
    const mobile = window.matchMedia('(max-width: 760px)');
    const closeMenu = () => {
      nav.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
    };
    const syncMenu = () => { button.hidden = !mobile.matches; closeMenu(); };
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') { closeMenu(); button.focus(); }
    });
    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target) && !button.contains(event.target)) closeMenu();
    });
    nav.addEventListener('click', (event) => { if (event.target.closest('a')) closeMenu(); });
    mobile.addEventListener('change', syncMenu);
    syncMenu();
  }
  const filters = document.querySelector('#publication-filters');
  if (filters) {
    const query = filters.querySelector('[name="q"]');
    const type = filters.querySelector('[name="type"]');
    const year = filters.querySelector('[name="year"]');
    const topic = filters.querySelector('[name="topic"]');
    const topicButtons = Array.from(filters.querySelectorAll('[data-topic]'));
    const topicValues = new Set(topicButtons.map((button) => button.dataset.topic));
    const topicData = new Map(JSON.parse(document.querySelector('#publication-topic-data').textContent)
      .map((paper) => [paper.id, paper.topics]));
    const papers = Array.from(document.querySelectorAll('[data-publication]'));
    const groups = Array.from(document.querySelectorAll('[data-publication-group]'));
    const count = document.querySelector('#publication-count');
    const empty = document.querySelector('#publication-empty');
    const normalize = (value) => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
    const searchable = new Map(papers.map((paper) => [paper, normalize(paper.dataset.search)]));
    const readURL = () => {
      const params = new URLSearchParams(window.location.search);
      query.value = params.get('q') || '';
      type.value = params.get('type') || '';
      year.value = params.get('year') || '';
      topic.value = topicValues.has(params.get('topic')) ? params.get('topic') : '';
      if (type.selectedIndex < 0) type.value = '';
      if (year.selectedIndex < 0) year.value = '';
    };
    const applyFilters = (updateURL = true) => {
      const terms = normalize(query.value.trim()).split(/\s+/).filter(Boolean);
      let visible = 0;
      const topicCounts = new Map(topicButtons.map((button) => [button.dataset.topic, 0]));
      papers.forEach((paper) => {
        const baseMatch = (!type.value || paper.dataset.type === type.value)
          && (!year.value || paper.dataset.year === year.value)
          && terms.every((term) => searchable.get(paper).includes(term));
        const paperTopics = topicData.get(paper.id) || [];
        if (baseMatch) {
          topicCounts.set('', topicCounts.get('') + 1);
          paperTopics.forEach((value) => {
            if (topicCounts.has(value)) topicCounts.set(value, topicCounts.get(value) + 1);
          });
        }
        const matches = baseMatch && (!topic.value || paperTopics.includes(topic.value));
        paper.hidden = !matches;
        if (matches) visible += 1;
      });
      topicButtons.forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.topic === topic.value));
        button.querySelector('[data-topic-count]').textContent = topicCounts.get(button.dataset.topic);
      });
      groups.forEach((group) => { group.hidden = !group.querySelector('[data-publication]:not([hidden])'); });
      count.textContent = visible === papers.length ? `${visible} publications` : `${visible} of ${papers.length} publications`;
      count.hidden = false;
      empty.hidden = visible !== 0;
      if (updateURL) {
        const url = new URL(window.location.href);
        [['q', query.value.trim()], ['type', type.value], ['year', year.value], ['topic', topic.value]].forEach(([key, value]) => {
          if (value) url.searchParams.set(key, value); else url.searchParams.delete(key);
        });
        url.hash = '';
        window.history.replaceState(null, '', url);
      }
    };
    const reset = () => {
      query.value = ''; type.value = ''; year.value = ''; topic.value = '';
      applyFilters();
    };
    const revealAnchor = () => {
      if (!window.location.hash) return;
      let id;
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      const target = document.getElementById(id);
      const article = target && target.closest('[data-publication]');
      if (article && article.hidden) {
        query.value = ''; type.value = ''; year.value = ''; topic.value = '';
        applyFilters(false);
        const url = new URL(window.location.href);
        ['q', 'type', 'year', 'topic'].forEach((key) => url.searchParams.delete(key));
        window.history.replaceState(null, '', url);
      }
      if (target) requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
    };
    filters.hidden = false;
    filters.addEventListener('submit', (event) => { event.preventDefault(); applyFilters(); });
    query.addEventListener('input', () => applyFilters());
    type.addEventListener('change', () => applyFilters());
    year.addEventListener('change', () => applyFilters());
    topicButtons.forEach((button) => button.addEventListener('click', () => {
      topic.value = button.dataset.topic;
      applyFilters();
    }));
    filters.addEventListener('reset', (event) => { event.preventDefault(); reset(); query.focus(); });
    document.querySelector('#publication-clear').addEventListener('click', () => { reset(); query.focus(); });
    window.addEventListener('popstate', () => { readURL(); applyFilters(false); revealAnchor(); });
    window.addEventListener('hashchange', revealAnchor);
    readURL();
    applyFilters(false);
    revealAnchor();
  }
  document.querySelectorAll('.prose table').forEach((table) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'table-scroll';
    wrapper.tabIndex = 0;
    wrapper.setAttribute('role', 'region');
    let heading = table.previousElementSibling;
    while (heading && !/^H[1-6]$/.test(heading.tagName)) heading = heading.previousElementSibling;
    wrapper.setAttribute('aria-label', (heading ? heading.textContent.trim() : 'Data') + ' table; scroll horizontally on small screens');
    table.before(wrapper);
    wrapper.appendChild(table);
  });
})();
