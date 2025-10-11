// script.js

function openPdf(url) {
  if (!url || !url.endsWith('.pdf')) {
    console.error('Invalid PDF URL:', url);
    return;
  }

  const tab = window.open(url, '_blank', 'noopener,noreferrer');
  if (!tab || tab.closed || typeof tab.closed === 'undefined') {
    const confirmOpen = confirm(
      'Не удалось открыть PDF автоматически.\n\n' +
      'Нажмите "ОК", чтобы открыть вручную.'
    );
    if (confirmOpen) {
      window.location.href = url;
    }
  }
}

function showSection(id, pushState = true) {
  document.getElementById('main-screen').classList.add('hidden');
  document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
  const section = document.getElementById(id);
  if (!section) return;
  
  // Перезапуск анимации
  section.classList.remove('fade-in');
  void section.offsetWidth; // триггер
  section.classList.add('fade-in');
  
  section.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (pushState) history.pushState({ page: id }, '', '#' + id);
}

function showMain(pushState = true) {
  document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
  const mainScreen = document.getElementById('main-screen');
  if (!mainScreen) return;
  
  mainScreen.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (pushState) history.pushState({ page: 'main' }, '', '#main');
}

window.addEventListener('popstate', e => {
  const st = e.state;
  if (st && st.page) {
    st.page === 'main' ? showMain(false) : showSection(st.page, false);
  } else {
    showMain(false);
  }
});

window.addEventListener('load', () => {
  history.replaceState({ page: 'main' }, '', '#main');
  const hash = location.hash.replace('#', '');
  if (hash && document.getElementById(hash)) {
    showSection(hash, false);
  }
});