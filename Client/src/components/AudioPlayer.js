import { store, formatSeconds } from '../state/store.js';
import { renderAlbumThumbSVG } from './CoverArtSVG.js';

export function renderAudioPlayer() {
  const state = store.state;
  const song = store.currentSong;
  const { isPlaying, currentTime, volume, isMuted, isShuffle, isRepeat } = state.player;

  const progressPct = Math.min(100, Math.round((currentTime / song.durationSec) * 100));
  const effectiveVolume = isMuted ? 0 : volume;

  return `
    <footer class="app-player" aria-label="Audio Player">
      <div class="player-now-playing">
        <div class="player-thumb" id="player-thumb-box">
          ${renderAlbumThumbSVG(song.thumbVariant)}
        </div>
        <div class="player-meta">
          <div class="player-meta__title" id="player-song-title">${song.title}</div>
          <div class="player-meta__artist" id="player-song-artist">${song.artist}</div>
        </div>
      </div>

      <div class="player-center">
        <div class="player-transport">
          <button
            type="button"
            class="player-ctrl-btn ${isShuffle ? 'is-active' : ''}"
            id="player-btn-shuffle"
            title="Shuffle"
            aria-label="Shuffle"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="16 3 21 3 21 8" />
              <line x1="4" y1="20" x2="21" y2="3" />
              <polyline points="21 16 21 21 16 21" />
              <line x1="15" y1="15" x2="21" y2="21" />
              <line x1="4" y1="4" x2="9" y2="9" />
            </svg>
          </button>

          <button
            type="button"
            class="player-ctrl-btn"
            id="player-btn-prev"
            title="Previous"
            aria-label="Previous"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 5h2v14H6V5zm3.5 7l8.5 6V6l-8.5 6z" />
            </svg>
          </button>

          <button
            type="button"
            class="player-play-circle"
            id="player-btn-play"
            title="${isPlaying ? 'Pause' : 'Play'}"
            aria-label="${isPlaying ? 'Pause' : 'Play'}"
          >
            ${
              isPlaying
                ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                     <rect x="6" y="5" width="4" height="14" rx="1" />
                     <rect x="14" y="5" width="4" height="14" rx="1" />
                   </svg>`
                : `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style="margin-left: 2px;">
                     <polygon points="6,4 20,12 6,20" />
                   </svg>`
            }
          </button>

          <button
            type="button"
            class="player-ctrl-btn"
            id="player-btn-next"
            title="Next"
            aria-label="Next"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 5h2v14h-2V5zM6 18l8.5-6L6 6v12z" />
            </svg>
          </button>

          <button
            type="button"
            class="player-ctrl-btn ${isRepeat ? 'is-active' : ''}"
            id="player-btn-repeat"
            title="Repeat"
            aria-label="Repeat"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="17 1 21 5 17 9" />
              <path d="M3 11V9a4 4 0 0 1 4-4h14" />
              <polyline points="7 23 3 19 7 15" />
              <path d="M21 13v2a4 4 0 0 1-4 4H3" />
            </svg>
          </button>
        </div>

        <div class="player-timeline">
          <span class="player-time" id="player-time-current">${formatSeconds(currentTime)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value="${progressPct}"
            class="sg-slider"
            id="player-scrubber"
            style="background: linear-gradient(to right, var(--primary-blue) ${progressPct}%, var(--slider-track) ${progressPct}%);"
            aria-label="Seek timeline"
          />
          <span class="player-time player-time--end" id="player-time-total">${song.duration}</span>
        </div>
      </div>

      <div class="player-right">
        <div class="player-volume-wrap">
          <button
            type="button"
            class="player-ctrl-btn"
            id="player-btn-mute"
            title="Mute / Unmute"
            aria-label="Mute or Unmute"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              ${
                effectiveVolume === 0
                  ? `<line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />`
                  : `<path d="M15.54 8.46a5 5 0 0 1 0 7.07" />`
              }
            </svg>
          </button>

          <input
            type="range"
            min="0"
            max="100"
            value="${effectiveVolume}"
            class="sg-slider"
            id="player-volume-slider"
            style="background: linear-gradient(to right, var(--primary-blue) ${effectiveVolume}%, var(--slider-track) ${effectiveVolume}%);"
            aria-label="Volume"
          />
        </div>

        <button
          type="button"
          class="player-ctrl-btn"
          id="player-btn-queue"
          title="Open Current Playlist"
          aria-label="Open Current Playlist"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round">
            <circle cx="5" cy="7" r="1.2" fill="currentColor" />
            <line x1="9" y1="7" x2="20" y2="7" />
            <circle cx="5" cy="12" r="1.2" fill="currentColor" />
            <line x1="9" y1="12" x2="20" y2="12" />
            <circle cx="5" cy="17" r="1.2" fill="currentColor" />
            <line x1="9" y1="17" x2="20" y2="17" />
          </svg>
        </button>
      </div>
    </footer>
  `;
}

export function bindAudioPlayerEvents(root) {
  root.querySelector('#player-btn-play')?.addEventListener('click', () => store.togglePlay());
  root.querySelector('#player-btn-prev')?.addEventListener('click', () => store.prevSong());
  root.querySelector('#player-btn-next')?.addEventListener('click', () => store.nextSong());
  root.querySelector('#player-btn-shuffle')?.addEventListener('click', () => store.toggleShuffle());
  root.querySelector('#player-btn-repeat')?.addEventListener('click', () => store.toggleRepeat());
  root.querySelector('#player-btn-mute')?.addEventListener('click', () => store.toggleMute());

  root.querySelector('#player-scrubber')?.addEventListener('input', (event) => {
    store.seekToPercent(Number(event.target.value));
  });

  root.querySelector('#player-volume-slider')?.addEventListener('input', (event) => {
    store.setVolume(Number(event.target.value));
  });

  root.querySelector('#player-btn-queue')?.addEventListener('click', () => {
    store.navigate('playlist-details');
  });
}

// Patch only the slider value and timestamp on 1s ticks so dragging the thumb doesn't get interrupted by innerHTML replacement
export function updateAudioPlayerTimelineOnly() {
  const song = store.currentSong;
  const { currentTime } = store.state.player;
  const progressPct = Math.min(100, Math.round((currentTime / song.durationSec) * 100));

  const currentEl = document.getElementById('player-time-current');
  const scrubber = document.getElementById('player-scrubber');

  if (currentEl) currentEl.textContent = formatSeconds(currentTime);
  if (scrubber) {
    scrubber.value = progressPct;
    scrubber.style.background = `linear-gradient(to right, var(--primary-blue) ${progressPct}%, var(--slider-track) ${progressPct}%)`;
  }
}
