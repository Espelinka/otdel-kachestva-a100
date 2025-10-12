/* ================================
   JavaScript for A-100 Development Quality Department
   Version 1.02 - Comprehensive Modernization
   ================================ */

// Utility functions
const DOMReady = (callback) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
};

// Loading overlay control
function showLoading() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) {
    overlay.classList.remove('hidden');
    overlay.setAttribute('aria-hidden', 'false');
  }
}

function hideLoading() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) {
    overlay.classList.add('hidden');
    overlay.setAttribute('aria-hidden', 'true');
  }
}

// Section navigation
function showSection(id, pushState = true) {
  try {
    const mainScreen = document.getElementById('main-screen');
    const section = document.getElementById(id);
    
    if (!section) {
      console.error(`Section with id "${id}" not found`);
      return;
    }
    
    // Hide main screen and all sections
    if (mainScreen) mainScreen.classList.add('hidden');
    document.querySelectorAll('.section').forEach(s => {
      s.classList.add('hidden');
      s.setAttribute('aria-hidden', 'true');
    });
    
    // Show selected section
    section.classList.remove('hidden');
    section.setAttribute('aria-hidden', 'false');
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update browser history
    if (pushState && history.pushState) {
      history.pushState({ page: id }, '', '#' + id);
    }
    
    // Set focus to section heading for accessibility
    const heading = section.querySelector('h2');
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus();
    }
  } catch (error) {
    console.error('Error showing section:', error);
  }
}

function showMain(pushState = true) {
  try {
    const mainScreen = document.getElementById('main-screen');
    
    // Hide all sections
    document.querySelectorAll('.section').forEach(s => {
      s.classList.add('hidden');
      s.setAttribute('aria-hidden', 'true');
    });
    
    // Show main screen
    if (mainScreen) {
      mainScreen.classList.remove('hidden');
      mainScreen.setAttribute('aria-hidden', 'false');
    }
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update browser history
    if (pushState && history.pushState) {
      history.pushState({ page: 'main' }, '', '#main');
    }
  } catch (error) {
    console.error('Error showing main screen:', error);
  }
}

// Improved PDF opening function
function openPdf(url) {
  try {
    if (!url) {
      throw new Error('PDF URL is required');
    }
    
    // Show loading indicator
    showLoading();
    
    // Create iframe to force PDF viewer instead of download
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;
    document.body.appendChild(iframe);
    
    // Open in new tab
    const tab = window.open(url, '_blank');
    
    // Hide loading after a short delay
    setTimeout(() => {
      hideLoading();
      // Remove iframe after opening
      if (iframe.parentNode) {
        document.body.removeChild(iframe);
      }
    }, 500);
    
    // Check if popup was blocked
    if (!tab || tab.closed || typeof tab.closed === 'undefined') {
      hideLoading();
      alert('Разрешите всплывающие окна для открытия PDF.');
      // Fallback: try to navigate directly
      window.location.href = url;
    }
  } catch (error) {
    hideLoading();
    console.error('Error opening PDF:', error);
    alert('Ошибка при открытии PDF: ' + error.message);
  }
}

// Browser history navigation
window.addEventListener('popstate', (e) => {
  const state = e.state;
  if (state && state.page) {
    if (state.page === 'main') {
      showMain(false);
    } else {
      showSection(state.page, false);
    }
  } else {
    showMain(false);
  }
});

// Initialize on page load
DOMReady(() => {
  try {
    // Set initial history state
    if (history.replaceState) {
      history.replaceState({ page: 'main' }, '', '#main');
    }
    
    // Check URL hash and navigate if present
    const hash = location.hash.replace('#', '');
    if (hash && hash !== 'main' && document.getElementById(hash)) {
      showSection(hash, false);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      // ESC key returns to main screen
      if (e.key === 'Escape') {
        const mainScreen = document.getElementById('main-screen');
        if (mainScreen && mainScreen.classList.contains('hidden')) {
          showMain();
        }
      }
    });
    
    console.log('Сайт успешно загружен ✅');
  } catch (error) {
    console.error('Initialization error:', error);
  }
});
