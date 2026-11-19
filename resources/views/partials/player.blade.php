<footer class="app-player" aria-label="Audio Player">
  <div class="player-now-playing">
    <div class="player-thumb">
      <img
        src="{{ asset('images/covers/alan walker cover.jpg') }}"
        alt="Now Playing"
        id="player-thumb-img"
      />
    </div>
    <div class="player-meta">
      <div class="player-meta__title" id="player-song-title">Faded</div>
      <div class="player-meta__artist" id="player-song-artist">Alan Walker</div>
    </div>
  </div>

  <div class="player-center">
    <div class="player-transport">
      <button
        type="button"
        class="player-ctrl-btn"
        id="player-btn-shuffle"
        aria-label="Shuffle"
      >
        <i class="ri-shuffle-line"></i>
      </button>
      <button
        type="button"
        class="player-ctrl-btn"
        id="player-btn-prev"
        aria-label="Previous"
      >
        <i class="ri-skip-back-fill"></i>
      </button>
      <button
        type="button"
        class="player-play-circle"
        id="player-btn-play"
        aria-label="Play"
      >
        <i class="ri-play-fill player-play-icon"></i>
      </button>
      <button
        type="button"
        class="player-ctrl-btn"
        id="player-btn-next"
        aria-label="Next"
      >
        <i class="ri-skip-forward-fill"></i>
      </button>
      <button
        type="button"
        class="player-ctrl-btn"
        id="player-btn-repeat"
        aria-label="Repeat"
      >
        <i class="ri-repeat-2-line"></i>
      </button>
    </div>

    <div class="player-timeline">
      <span class="player-time" id="player-time-current">0:45</span>
      <input
        type="range"
        min="0"
        max="100"
        value="20"
        class="sg-slider"
        id="player-scrubber"
        aria-label="Seek timeline"
      />
      <span class="player-time player-time--end" id="player-time-total">3:32</span>
    </div>
  </div>

  <div class="player-right">
    <div class="player-volume-wrap">
      <button
        type="button"
        class="player-ctrl-btn"
        id="player-btn-mute"
        aria-label="Mute"
      >
        <i class="ri-volume-up-line"></i>
      </button>
      <input
        type="range"
        min="0"
        max="100"
        value="65"
        class="sg-slider"
        id="player-volume-slider"
        aria-label="Volume"
      />
    </div>
    <a
      href="#"
      class="player-ctrl-btn"
      title="Open Current Playlist"
      aria-label="Queue"
    >
      <i class="ri-play-list-2-fill"></i>
    </a>
  </div>
</footer>
