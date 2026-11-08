import { store, CATEGORIES } from '../state/store.js';
import { renderPlaylistCoverSVG } from '../components/CoverArtSVG.js';

export function renderSearchPage(state) {
  const query = state.searchQuery.trim().toLowerCase();
  const activeCategory = state.selectedCategory;

  const matchingSongs = state.songs.filter((song) => {
    const matchesCategory = activeCategory === 'All' || song.category === activeCategory;
    const matchesText =
      !query ||
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query) ||
      song.album.toLowerCase().includes(query);
    return matchesCategory && matchesText;
  });

  const matchingPlaylists = state.playlists.filter((playlist) => {
    if (!query) return true;
    return (
      playlist.title.toLowerCase().includes(query) ||
      playlist.creator.toLowerCase().includes(query)
    );
  });

  return `
    <div class="view-container">
      <div class="my-playlists-header">
        <div>
          <h1 class="my-playlists-header__title">Search &amp; Discover</h1>
          <p class="my-playlists-header__subtitle">Filter songs by genre or search across playlists</p>
        </div>
      </div>

      <section class="sg-section" aria-label="Browse Categories">
        <div class="sg-section__header">
          <h2 class="sg-section__title">Browse Categories</h2>
        </div>

        <div class="category-grid">
          ${CATEGORIES.map(
            (category) => `
              <div
                class="category-tile js-category-tile ${category.themeClass} ${activeCategory === category.name ? 'is-selected' : ''}"
                data-category="${category.name}"
              >
                <div class="category-tile__title">${category.name}</div>
                <div class="category-tile__count">${category.count}</div>
              </div>
            `
          ).join('')}
        </div>
      </section>

      <div class="search-dual-results">
        <section>
          <div class="sg-section__header">
            <h2 class="sg-section__title">Matching Songs (${matchingSongs.length})</h2>
          </div>

          <div class="track-table-wrap">
            <table class="track-table">
              <thead>
                <tr>
                  <th class="col-num">#</th>
                  <th class="col-title">Title</th>
                  <th class="col-artist">Artist</th>
                  <th class="col-duration">Duration</th>
                </tr>
              </thead>
              <tbody>
                ${matchingSongs
                  .map((song, index) => {
                    const isActive = state.player.currentSongId === song.id;
                    return `
                      <tr class="js-song-row ${isActive ? 'is-active' : ''}" data-song-id="${song.id}">
                        <td class="col-num">${index + 1}</td>
                        <td class="col-title">${song.title}</td>
                        <td class="col-artist">${song.artist}</td>
                        <td class="col-duration">${song.duration}</td>
                      </tr>
                    `;
                  })
                  .join('')}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <div class="sg-section__header">
            <h2 class="sg-section__title">Matching Playlists</h2>
          </div>

          <div class="playlist-cards-grid playlist-cards-grid--compact">
            ${matchingPlaylists
              .map(
                (playlist) => `
                  <article class="playlist-card js-open-playlist" data-playlist-id="${playlist.id}">
                    <div class="playlist-card__art">
                      ${renderPlaylistCoverSVG(playlist.variant)}
                    </div>
                    <div class="playlist-card__title">${playlist.title}</div>
                    <div class="playlist-card__meta">${playlist.songCountLabel}</div>
                  </article>
                `
              )
              .join('')}
          </div>
        </section>
      </div>
    </div>
  `;
}

export function bindSearchEvents(root) {
  root.querySelectorAll('.js-category-tile').forEach((tile) => {
    tile.addEventListener('click', () => {
      store.setCategory(tile.getAttribute('data-category'));
    });
  });

  root.querySelectorAll('.js-song-row').forEach((row) => {
    row.addEventListener('click', () => {
      store.playSong(Number(row.getAttribute('data-song-id')));
    });
  });

  root.querySelectorAll('.js-open-playlist').forEach((card) => {
    card.addEventListener('click', () => {
      store.navigate('playlist-details', {
        playlistId: card.getAttribute('data-playlist-id')
      });
    });
  });
}
