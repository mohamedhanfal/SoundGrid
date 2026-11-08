import { store } from '../state/store.js';

const AVATAR_SVG_DATA =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#374151"/>
          <stop offset="100%" stop-color="#111827"/>
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="32" fill="url(#g)"/>
      <circle cx="32" cy="24" r="11" fill="#f3d4c2"/>
      <path d="M21 20c2-7 19-8 22 0-3-3-8-4-11-4s-8 1-11 4z" fill="#1f2937"/>
      <path d="M14 58c2-12 11-18 18-18s16 6 18 18" fill="#3b82f6"/>
    </svg>
  `);

export function renderTopbar(state) {
  return `
    <header class="app-topbar">
      <div class="topbar-search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="7.5" />
          <line x1="20" y1="20" x2="16.3" y2="16.3" />
        </svg>
        <input
          type="search"
          id="global-topbar-search"
          class="topbar-search__input"
          placeholder="Search songs, artists, playlists..."
          value="${state.searchQuery}"
          aria-label="Search songs, artists, playlists"
        />
      </div>

      <div class="topbar-profile">
        <button type="button" class="topbar-icon-btn" title="Shared Playlists" data-nav-top="my-playlists">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="8" r="3.5" />
            <path d="M3 19c0-3.1 2.7-5.5 6-5.5s6 2.4 6 5.5" />
            <circle cx="17" cy="9" r="2.5" />
            <path d="M15.5 19c.3-2.2 2-4 4.5-4" />
          </svg>
        </button>

        <div class="topbar-badge" title="Switch Account" data-nav-top="auth">
          ${state.user.initials}
        </div>

        <img
          src="${AVATAR_SVG_DATA}"
          alt="User Avatar"
          class="topbar-avatar"
          title="View Profile"
          data-nav-top="profile"
        />
      </div>
    </header>
  `;
}

export function bindTopbarEvents(root) {
  const input = root.querySelector('#global-topbar-search');
  if (input) {
    input.addEventListener('input', (event) => {
      store.setSearchQuery(event.target.value);
    });
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && store.state.currentPage !== 'search') {
        store.navigate('search');
      }
    });
  }

  root.querySelectorAll('[data-nav-top]').forEach((element) => {
    element.addEventListener('click', () => {
      store.navigate(element.getAttribute('data-nav-top'));
    });
  });
}
