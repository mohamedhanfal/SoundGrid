import { store } from '../state/store.js';
import { renderPlaylistCoverSVG } from '../components/CoverArtSVG.js';

const DEFAULT_CHECKED_COUNT = 3;

export function renderCreatePlaylistPage(state) {
  return `
    <div class="view-container">
      <div class="my-playlists-header">
        <div>
          <h1 class="my-playlists-header__title">Create New Playlist</h1>
          <p class="my-playlists-header__subtitle">Enter playlist details and pick tracks from your library</p>
        </div>
      </div>

      <form id="create-playlist-form">
        <div class="create-form-grid">
          <div class="cover-dropzone" title="Choose cover style">
            <div style="width: 110px; height: 110px; border-radius: 14px; overflow: hidden;">
              ${renderPlaylistCoverSVG('calm')}
            </div>
            <div class="cover-dropzone__title">Upload Cover Image</div>
            <div class="cover-dropzone__sub">PNG or JPG up to 5MB</div>
          </div>

          <div class="form-fields">
            <div class="form-group">
              <label for="pl-title-input">Playlist Name</label>
              <input
                type="text"
                id="pl-title-input"
                class="form-control"
                placeholder="Late Night Study Mix"
                required
              />
            </div>

            <div class="form-group">
              <label for="pl-desc-input">Description</label>
              <textarea
                id="pl-desc-input"
                class="form-control"
                rows="3"
                placeholder="Notes about this playlist..."
              ></textarea>
            </div>

            <div style="display: flex; gap: 12px; margin-top: 4px;">
              <button type="submit" class="btn btn--primary">Save &amp; Open Playlist</button>
              <button type="button" class="btn btn--outline" id="btn-cancel-create">Cancel</button>
            </div>
          </div>
        </div>

        <section class="sg-section">
          <div class="sg-section__header">
            <h2 class="sg-section__title">Select Songs to Add</h2>
          </div>

          <div class="song-checklist">
            ${state.songs
              .map(
                (song, index) => `
                  <label class="song-check-row">
                    <div style="display: flex; align-items: center; gap: 14px;">
                      <span style="width: 24px; color: var(--text-muted); font-size: 0.85rem;">${index + 1}</span>
                      <div>
                        <div style="font-weight: 700; color: var(--text-dark);">${song.title}</div>
                        <div style="font-size: 0.82rem; color: var(--text-secondary);">${song.artist} • ${song.album}</div>
                      </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 16px;">
                      <span style="font-size: 0.85rem; color: var(--text-secondary);">${song.duration}</span>
                      <input type="checkbox" name="songIds" value="${song.id}" ${index < DEFAULT_CHECKED_COUNT ? 'checked' : ''} />
                    </div>
                  </label>
                `
              )
              .join('')}
          </div>
        </section>
      </form>
    </div>
  `;
}

export function bindCreatePlaylistEvents(root) {
  root.querySelector('#btn-cancel-create')?.addEventListener('click', () => {
    store.navigate('my-playlists');
  });

  root.querySelector('#create-playlist-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = root.querySelector('#pl-title-input')?.value.trim();
    const description = root.querySelector('#pl-desc-input')?.value.trim();
    const selectedSongIds = Array.from(
      root.querySelectorAll('input[name="songIds"]:checked')
    ).map((checkbox) => Number(checkbox.value));

    store.createPlaylist({ title, description, songIds: selectedSongIds });
  });
}
