import { store } from '../state/store.js';
import { renderPlaylistCoverSVG } from '../components/CoverArtSVG.js';

export function renderPlaylistDetailsPage(state) {
  const playlist = store.activePlaylist;
  const query = state.searchQuery.trim().toLowerCase();

  const playlistSongs = playlist.songIds
    .map((id) => state.songs.find((song) => song.id === id))
    .filter(Boolean)
    .filter((song) => {
      if (!query) return true;
      return (
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query) ||
        song.album.toLowerCase().includes(query)
      );
    });

  return `
    <div class="view-container">
      <section class="playlist-header" aria-label="Playlist Overview">
        <div class="playlist-cover-art">
          ${renderPlaylistCoverSVG(playlist.variant)}
        </div>

        <div class="playlist-info">
          <h1 class="playlist-info__title">${playlist.title}</h1>
          <div class="playlist-info__meta">
            <span>By ${playlist.creator}</span>
            <span class="playlist-info__dot">•</span>
            <span>${playlist.songCountLabel}</span>
            <span class="playlist-info__dot">•</span>
            <span>${playlist.durationLabel}</span>
          </div>

          <div class="playlist-info__actions">
            <button type="button" class="btn btn--primary" id="btn-play-playlist">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 20,12 5,21" />
              </svg>
              <span>Play</span>
            </button>

            <button type="button" class="btn btn--outline" id="btn-add-to-playlist">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span>Add to Playlist</span>
            </button>
          </div>
        </div>
      </section>

      <section class="track-table-wrap" aria-label="Tracklist">
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
            ${playlistSongs
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
                      <button
                        type="button"
                        class="track-more-btn js-song-more"
                        data-song-id="${song.id}"
                        title="Track options"
                        aria-label="More options for ${song.title}"
                      >
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
      </section>
    </div>
  `;
}

export function bindPlaylistDetailsEvents(root) {
  root.querySelector('#btn-play-playlist')?.addEventListener('click', () => {
    const playlist = store.activePlaylist;
    if (playlist && playlist.songIds.length > 0) {
      store.playSong(playlist.songIds[0]);
    }
  });

  root.querySelector('#btn-add-to-playlist')?.addEventListener('click', () => {
    store.addSampleTrackToActivePlaylist();
  });

  root.querySelectorAll('.js-song-row').forEach((row) => {
    row.addEventListener('click', (event) => {
      if (event.target.closest('.js-song-more')) return;
      store.playSong(Number(row.getAttribute('data-song-id')));
    });
  });
}
