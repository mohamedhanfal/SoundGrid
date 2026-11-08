import { store } from '../state/store.js';

export function renderSidebar(state) {
  const current = state.currentPage;
  const isPlaylistsActive = current === 'my-playlists' || current === 'playlist-details';

  return `
    <aside class="app-sidebar" aria-label="Primary Navigation">
      <div>
        <div class="sidebar-brand" data-nav="home">
          <span class="sidebar-brand__icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="9" width="2.6" height="6" rx="1.3" fill="#1a73e8" />
              <rect x="6.5" y="4" width="2.6" height="16" rx="1.3" fill="#1a73e8" />
              <rect x="11" y="7" width="2.6" height="10" rx="1.3" fill="#3b82f6" />
              <rect x="15.5" y="5" width="2.6" height="14" rx="1.3" fill="#1a73e8" />
              <rect x="20" y="10" width="2.6" height="4" rx="1.3" fill="#60a5fa" />
            </svg>
          </span>
          <span class="sidebar-brand__title">SoundGrid</span>
        </div>

        <nav class="sidebar-nav">
          <button
            type="button"
            class="sidebar-nav__item ${current === 'home' ? 'is-active' : ''}"
            data-nav="home"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1V9.5z" />
            </svg>
            <span>Home</span>
          </button>

          <button
            type="button"
            class="sidebar-nav__item ${current === 'search' ? 'is-active' : ''}"
            data-nav="search"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="7.5" />
              <line x1="20" y1="20" x2="16.3" y2="16.3" />
            </svg>
            <span>Search</span>
          </button>

          <button
            type="button"
            class="sidebar-nav__item ${isPlaylistsActive ? 'is-active' : ''}"
            data-nav="my-playlists"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="6" x2="13" y2="6" />
              <line x1="3" y1="12" x2="11" y2="12" />
              <line x1="3" y1="18" x2="11" y2="18" />
              <path d="M16 17V6l5-1v3l-5 1" />
              <circle cx="14.5" cy="17.5" r="2.5" />
            </svg>
            <span>My Playlists</span>
          </button>

          <button
            type="button"
            class="sidebar-nav__item ${current === 'create-playlist' ? 'is-active' : ''}"
            data-nav="create-playlist"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="9" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
            <span>Create Playlist</span>
          </button>

          <button
            type="button"
            class="sidebar-nav__item ${current === 'profile' ? 'is-active' : ''}"
            data-nav="profile"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M5 20c0-3.8 3.1-6.5 7-6.5s7 2.7 7 6.5" />
            </svg>
            <span>Profile</span>
          </button>
        </nav>
      </div>

      <div class="sidebar-footer">
        <button type="button" class="sidebar-auth-switch" data-nav="playlist-details" data-playlist-id="calm-vibes">
          <span>Calm Vibes</span>
        </button>
        <button type="button" class="sidebar-auth-switch" data-nav="auth">
          <span>Login / Register</span>
        </button>
      </div>
    </aside>
  `;
}

export function bindSidebarEvents(root) {
  root.querySelectorAll('[data-nav]').forEach((element) => {
    element.addEventListener('click', () => {
      const targetPage = element.getAttribute('data-nav');
      const playlistId = element.getAttribute('data-playlist-id');
      store.navigate(targetPage, playlistId ? { playlistId } : {});
    });
  });
}
