import { store } from '../state/store.js';
import { renderPlaylistCoverSVG } from '../components/CoverArtSVG.js';

export function renderMyPlaylistsPage(state) {
  return `
    <div class="view-container">
      <div class="my-playlists-header">
        <div>
          <h1 class="my-playlists-header__title">My Playlists</h1>
          <p class="my-playlists-header__subtitle">Manage your personal collections or build a new mix</p>
        </div>

        <button type="button" class="btn btn--primary" id="btn-go-create">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Create Playlist</span>
        </button>
      </div>

      <div class="playlist-cards-grid">
        <div class="create-playlist-tile" id="tile-create-playlist">
          <div class="create-playlist-tile__circle">+</div>
          <div class="create-playlist-tile__label">Create New Playlist</div>
          <div class="create-playlist-tile__hint">Select songs and cover art</div>
        </div>

        ${state.playlists
          .map(
            (playlist) => `
              <article class="playlist-card js-open-playlist" data-playlist-id="${playlist.id}">
                <div class="playlist-card__art">
                  ${renderPlaylistCoverSVG(playlist.variant)}
                </div>
                <div class="playlist-card__title">${playlist.title}</div>
                <div class="playlist-card__meta">By ${playlist.creator} • ${playlist.songCountLabel}</div>
              </article>
            `
          )
          .join('')}
      </div>
    </div>
  `;
}

export function bindMyPlaylistsEvents(root) {
  root.querySelector('#btn-go-create')?.addEventListener('click', () => {
    store.navigate('create-playlist');
  });

  root.querySelector('#tile-create-playlist')?.addEventListener('click', () => {
    store.navigate('create-playlist');
  });

  root.querySelectorAll('.js-open-playlist').forEach((card) => {
    card.addEventListener('click', () => {
      store.navigate('playlist-details', {
        playlistId: card.getAttribute('data-playlist-id')
      });
    });
  });
}
