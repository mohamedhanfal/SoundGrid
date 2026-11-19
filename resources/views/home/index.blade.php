@extends('layouts.app')

@section('title', 'SoundGrid')

@section('content')
  <section class="home-hero" aria-label="Featured Playlist Banner">
    <div class="home-hero__content">
      <span class="home-hero__tag">Featured Creator Playlist</span>
      <h1 class="home-hero__title">Alan Walker Hits</h1>
      <p class="home-hero__subtitle">
        Signature electronic melodies, driving beats, and cinematic synth anthems featuring Faded, Alone, and On My Way.
      </p>
      <div class="home-hero__actions">
        <button type="button" class="btn btn--primary" id="btn-play-playlist">
          <i class="ri-play-fill"></i>
          <span>Listen Now</span>
        </button>
        <a href="#" class="btn btn--outline">
          <span>Open Playlist</span>
        </a>
      </div>
    </div>

    <div class="home-hero__art">
      <img
        src="{{ asset('images/covers/alan walker cover.jpg') }}"
        alt="Alan Walker Hits"
        class="home-hero__art-img"
      />
      <i class="ri-play-circle-fill cover-play-badge"></i>
    </div>
  </section>

  <section class="sg-section" aria-label="Popular Playlists">
    <div class="sg-section__header">
      <h2 class="sg-section__title">Popular Playlists</h2>
      <a href="#" class="sg-section__link">View all playlists</a>
    </div>

    <div class="playlist-cards-grid">
      <a href="#" class="playlist-card">
        <div class="playlist-card__art">
          <img src="{{ asset('images/covers/alan walker cover.jpg') }}" alt="Alan Walker Hits" class="playlist-card__img" />
          <i class="ri-play-circle-fill cover-play-badge"></i>
        </div>
        <div class="playlist-card__title">Alan Walker Hits</div>
        <div class="playlist-card__meta">By SK &bull; 5 songs</div>
      </a>

      <a href="#" class="playlist-card">
        <div class="playlist-card__art">
          <img src="{{ asset('images/covers/weeknd cover.jpg') }}" alt="The Weeknd Collection" class="playlist-card__img" />
          <i class="ri-play-circle-fill cover-play-badge"></i>
        </div>
        <div class="playlist-card__title">The Weeknd Collection</div>
        <div class="playlist-card__meta">By Mohamed hanfal &bull; 5 songs</div>
      </a>

      <a href="#" class="playlist-card">
        <div class="playlist-card__art">
          <img src="{{ asset('images/covers/mj cover.jpg') }}" alt="King of Pop: Michael Jackson" class="playlist-card__img" />
          <i class="ri-play-circle-fill cover-play-badge"></i>
        </div>
        <div class="playlist-card__title">King of Pop: Michael Jackson</div>
        <div class="playlist-card__meta">By Vidura &bull; 5 songs</div>
      </a>

      <a href="#" class="playlist-card">
        <div class="playlist-card__art">
          <img src="{{ asset('images/covers/thefatrat cover.jpg') }}" alt="TheFatRat Gaming Anthems" class="playlist-card__img" />
          <i class="ri-play-circle-fill cover-play-badge"></i>
        </div>
        <div class="playlist-card__title">TheFatRat Gaming Anthems</div>
        <div class="playlist-card__meta">By Nethmini &bull; 5 songs</div>
      </a>

      <a href="#" class="playlist-card">
        <div class="playlist-card__art">
          <img src="{{ asset('images/covers/sid.jpg') }}" alt="Sid Sriram Essentials" class="playlist-card__img" />
          <i class="ri-play-circle-fill cover-play-badge"></i>
        </div>
        <div class="playlist-card__title">Sid Sriram Essentials</div>
        <div class="playlist-card__meta">By Osadi &bull; 5 songs</div>
      </a>
    </div>
  </section>

  <section class="sg-section" aria-label="Recently Played">
    <div class="sg-section__header">
      <h2 class="sg-section__title">Recently Played</h2>
      <a href="#" class="sg-section__link">Browse all tracks</a>
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
          <tr
            class="js-song-row is-active"
            data-title="Faded"
            data-artist="Alan Walker"
            data-duration="3:32"
            data-cover="{{ asset('images/covers/alan walker cover.jpg') }}"
          >
            <td class="col-num">1</td>
            <td class="col-title">Faded</td>
            <td class="col-artist">Alan Walker</td>
            <td class="col-album">Different World</td>
            <td class="col-duration">3:32</td>
            <td class="col-more">
              <button type="button" class="track-more-btn" aria-label="More options">
                <i class="ri-more-fill"></i>
              </button>
            </td>
          </tr>
          <tr
            class="js-song-row"
            data-title="Blinding Lights"
            data-artist="The Weeknd"
            data-duration="3:20"
            data-cover="{{ asset('images/covers/weeknd cover.jpg') }}"
          >
            <td class="col-num">2</td>
            <td class="col-title">Blinding Lights</td>
            <td class="col-artist">The Weeknd</td>
            <td class="col-album">After Hours</td>
            <td class="col-duration">3:20</td>
            <td class="col-more">
              <button type="button" class="track-more-btn" aria-label="More options">
                <i class="ri-more-fill"></i>
              </button>
            </td>
          </tr>
          <tr
            class="js-song-row"
            data-title="Billie Jean"
            data-artist="Michael Jackson"
            data-duration="4:54"
            data-cover="{{ asset('images/covers/mj cover.jpg') }}"
          >
            <td class="col-num">3</td>
            <td class="col-title">Billie Jean</td>
            <td class="col-artist">Michael Jackson</td>
            <td class="col-album">Thriller</td>
            <td class="col-duration">4:54</td>
            <td class="col-more">
              <button type="button" class="track-more-btn" aria-label="More options">
                <i class="ri-more-fill"></i>
              </button>
            </td>
          </tr>
          <tr
            class="js-song-row"
            data-title="Unity"
            data-artist="TheFatRat"
            data-duration="4:09"
            data-cover="{{ asset('images/covers/thefatrat cover.jpg') }}"
          >
            <td class="col-num">4</td>
            <td class="col-title">Unity</td>
            <td class="col-artist">TheFatRat</td>
            <td class="col-album">Unity</td>
            <td class="col-duration">4:09</td>
            <td class="col-more">
              <button type="button" class="track-more-btn" aria-label="More options">
                <i class="ri-more-fill"></i>
              </button>
            </td>
          </tr>
          <tr
            class="js-song-row"
            data-title="Srivalli"
            data-artist="Sid Sriram"
            data-duration="3:41"
            data-cover="{{ asset('images/covers/sid.jpg') }}"
          >
            <td class="col-num">5</td>
            <td class="col-title">Srivalli</td>
            <td class="col-artist">Sid Sriram</td>
            <td class="col-album">Pushpa: The Rise</td>
            <td class="col-duration">3:41</td>
            <td class="col-more">
              <button type="button" class="track-more-btn" aria-label="More options">
                <i class="ri-more-fill"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
@endsection

@push('scripts')
<script>
(function () {
  let isPlaying = false;
  let isMuted = false;
  let currentSeconds = 45;
  let tickerId = null;

  const playBtn = document.getElementById('player-btn-play');
  const prevBtn = document.getElementById('player-btn-prev');
  const nextBtn = document.getElementById('player-btn-next');
  const shuffleBtn = document.getElementById('player-btn-shuffle');
  const repeatBtn = document.getElementById('player-btn-repeat');
  const muteBtn = document.getElementById('player-btn-mute');
  const headerPlayBtn = document.getElementById('btn-play-playlist');

  const titleEl = document.getElementById('player-song-title');
  const artistEl = document.getElementById('player-song-artist');
  const totalTimeEl = document.getElementById('player-time-total');
  const currentTimeEl = document.getElementById('player-time-current');
  const scrubberEl = document.getElementById('player-scrubber');
  const thumbImgEl = document.getElementById('player-thumb-img');
  const searchInput = document.getElementById('global-topbar-search');

  function parseDurationToSeconds(str) {
    if (!str || !str.includes(':')) return 200;
    const parts = str.split(':').map((p) => parseInt(p, 10));
    return parts.length === 2 ? parts[0] * 60 + parts[1] : 200;
  }

  function formatSeconds(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  function updatePlayButtonIcon() {
    if (!playBtn) return;
    playBtn.innerHTML = isPlaying
      ? '<i class="ri-pause-fill"></i>'
      : '<i class="ri-play-fill player-play-icon"></i>';
  }

  function stopTicker() {
    if (tickerId) {
      clearInterval(tickerId);
      tickerId = null;
    }
  }

  function startTicker(totalSeconds) {
    stopTicker();
    tickerId = setInterval(() => {
      if (!isPlaying) return;
      currentSeconds = (currentSeconds + 1) % (totalSeconds || 200);
      if (currentTimeEl) currentTimeEl.textContent = formatSeconds(currentSeconds);
      if (scrubberEl) {
        scrubberEl.value = Math.floor((currentSeconds / (totalSeconds || 200)) * 100);
      }
    }, 1000);
  }

  function setPlayerTrack(track, autoPlay = true) {
    if (!track) return;
    if (titleEl) titleEl.textContent = track.title;
    if (artistEl) artistEl.textContent = track.artist;
    if (totalTimeEl) totalTimeEl.textContent = track.duration;
    if (thumbImgEl && track.cover) thumbImgEl.src = track.cover;

    currentSeconds = 0;
    if (currentTimeEl) currentTimeEl.textContent = '0:00';
    if (scrubberEl) scrubberEl.value = '0';

    if (autoPlay) {
      isPlaying = true;
      updatePlayButtonIcon();
      startTicker(parseDurationToSeconds(track.duration));
    }
  }

  function getPageSongRows() {
    return Array.from(document.querySelectorAll('.js-song-row'));
  }

  function selectSongRow(row) {
    const rows = getPageSongRows();
    rows.forEach((item) => item.classList.remove('is-active'));
    row.classList.add('is-active');

    const track = {
      title: row.dataset.title || 'Unknown Title',
      artist: row.dataset.artist || 'Unknown Artist',
      duration: row.dataset.duration || '3:30',
      cover: row.dataset.cover || '',
    };

    setPlayerTrack(track, true);
  }

  function stepSong(direction) {
    const rows = getPageSongRows();
    if (rows.length > 0) {
      const activeIndex = rows.findIndex((r) => r.classList.contains('is-active'));
      const nextIndex = (activeIndex + direction + rows.length) % rows.length;
      selectSongRow(rows[nextIndex]);
    }
  }

  function bindRowEvents() {
    getPageSongRows().forEach((row) => {
      row.onclick = () => selectSongRow(row);
    });
  }

  playBtn?.addEventListener('click', () => {
    isPlaying = !isPlaying;
    updatePlayButtonIcon();
    if (isPlaying) {
      startTicker(parseDurationToSeconds(totalTimeEl?.textContent || '3:30'));
    } else {
      stopTicker();
    }
  });

  prevBtn?.addEventListener('click', () => stepSong(-1));
  nextBtn?.addEventListener('click', () => stepSong(1));

  shuffleBtn?.addEventListener('click', () => {
    shuffleBtn.classList.toggle('is-active');
  });

  repeatBtn?.addEventListener('click', () => {
    repeatBtn.classList.toggle('is-active');
  });

  muteBtn?.addEventListener('click', () => {
    isMuted = !isMuted;
    muteBtn.innerHTML = isMuted
      ? '<i class="ri-volume-mute-line"></i>'
      : '<i class="ri-volume-up-line"></i>';
  });

  headerPlayBtn?.addEventListener('click', () => {
    const rows = getPageSongRows();
    if (rows.length > 0) selectSongRow(rows[0]);
  });

  scrubberEl?.addEventListener('input', (e) => {
    const pct = parseInt(e.target.value, 10) / 100;
    const totalSec = parseDurationToSeconds(totalTimeEl?.textContent || '3:30');
    currentSeconds = Math.floor(pct * totalSec);
    if (currentTimeEl) currentTimeEl.textContent = formatSeconds(currentSeconds);
  });

  searchInput?.addEventListener('input', (event) => {
    const query = event.target.value.trim().toLowerCase();
    getPageSongRows().forEach((row) => {
      row.hidden = !row.textContent.toLowerCase().includes(query);
    });
    document.querySelectorAll('.playlist-card').forEach((card) => {
      card.hidden = !card.textContent.toLowerCase().includes(query);
    });
  });

  bindRowEvents();
})();
</script>
@endpush
