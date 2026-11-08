import { store } from '../state/store.js';
import { renderPlaylistCoverSVG } from '../components/CoverArtSVG.js';

const RECENT_TRACKS_LIMIT = 5;

export function renderHomePage(state) {
  const query = state.searchQuery.trim().toLowerCase();
  const recentSongs = state.songs.slice(0, RECENT_TRACKS_LIMIT).filter((song) => {
    if (!query) return true;
    return (
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query) ||
      song.album.toLowerCase().includes(query)
    );
  });

  return `
    <div class="view-container">
      <section class="home-hero" aria-label="Featured Playlist Banner">
        <div class="home-hero__content">
          <span class="home-hero__tag">Featured Collection</span>
          <h1 class="home-hero__title">Daily Calm &amp; Focus Mix</h1>
          <p class="home-hero__subtitle">
            Play saved playlists, manage your personal music library, and keep audio running without interruption across pages.
          </p>
          <div class="home-hero__actions">
            <button type="button" class="btn btn--primary" id="home-btn-play-featured">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 20,12 5,21" />
              </svg>
              <span>Listen Now</span>
            </button>
            <button type="button" class="btn btn--outline" id="home-btn-open-calm">
              <span>Open Calm Vibes</span>
            </button>
          </div>
        </div>

        <div class="home-hero__art">
          ${renderPlaylistCoverSVG('calm')}
        </div>
      </section>

      <section class="sg-section" aria-label="Popular Playlists">
        <div class="sg-section__header">
          <h2 class="sg-section__title">Popular Playlists</h2>
          <span class="sg-section__link" id="home-see-all-playlists">View all playlists</span>
        </div>

        <div class="playlist-cards-grid">
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
      </section>

      <section class="sg-section" aria-label="Recently Played">
        <div class="sg-section__header">
          <h2 class="sg-section__title">Recently Played</h2>
          <span class="sg-section__link" id="home-open-search">Browse all tracks</span>
        </div>

        <div class="track-table-wrap">
          <table class="track-table">
            <thead>
              <tr>
                <th class="col-num">#</th>
                <th class="col-title">Title</th>
                <th class="col-artist">Artist</th>
                <th class="col-album">Album</th>
                <th class="col-duration">Duration</th>
                <th class="col-more"></th>
              </tr>
            </thead>
            <tbody>
              ${recentSongs
                .map((song, index) => {
                  const isActive = state.player.currentSongId === song.id;
                  return `
                    <tr class="js-song-row ${isActive ? 'is-active' : ''}" data-song-id="${song.id}">
                      <td class="col-num">${index + 1}</td>
                      <td class="col-title">${song.title}</td>
                      <td class="col-artist">${song.artist}</td>
                      <td class="col-album">${song.album}</td>
                      <td class="col-duration">${song.duration}</td>
                      <td class="col-more">
                        <button type="button" class="track-more-btn" aria-label="Play ${song.title}">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="5" cy="12" r="1.8" />
                            <circle cx="12" cy="12" r="1.8" />
                            <circle cx="19" cy="12" r="1.8" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  `;
                })
                .join('')}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `;
}

export function bindHomeEvents(root) {
  root.querySelector('#home-btn-play-featured')?.addEventListener('click', () => {
    store.playSong(1);
  });

  root.querySelector('#home-btn-open-calm')?.addEventListener('click', () => {
    store.navigate('playlist-details', { playlistId: 'calm-vibes' });
  });

  root.querySelector('#home-see-all-playlists')?.addEventListener('click', () => {
    store.navigate('my-playlists');
  });

  root.querySelector('#home-open-search')?.addEventListener('click', () => {
    store.navigate('search');
  });

  root.querySelectorAll('.js-open-playlist').forEach((card) => {
    card.addEventListener('click', () => {
      store.navigate('playlist-details', {
        playlistId: card.getAttribute('data-playlist-id')
      });
    });
  });

  root.querySelectorAll('.js-song-row').forEach((row) => {
    row.addEventListener('click', () => {
      store.playSong(Number(row.getAttribute('data-song-id')));
    });
  });
}
