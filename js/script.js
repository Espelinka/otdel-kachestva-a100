function showSection(id, pushState = true) {
  document.getElementById('main-screen').classList.add('hidden');
  document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
  const section = document.getElementById(id);
  if (!section) return;
  section.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (pushState) history.pushState({ page: id }, '', '#' + id);
}

function showMain(pushState = true) {
  document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
  document.getElementById('main-screen').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (pushState) history.pushState({ page: 'main' }, '', '#main');
}

window.addEventListener('popstate', e => {
  const st = e.state;
  if (st && st.page) {
    st.page === 'main' ? showMain(false) : showSection(st.page, false);
  } else showMain(false);
});

window.addEventListener('load', () => {
  history.replaceState({ page: 'main' }, '', '#main');
  const hash = location.hash.replace('#', '');
  if (hash && document.getElementById(hash)) showSection(hash, false);
});

function openPdf(url) {
  const tab = window.open(url, '_blank');
  if (!tab) alert('Разрешите всплывающие окна для открытия PDF.');
}
