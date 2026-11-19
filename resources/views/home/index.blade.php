@extends('layouts.app')

@section('title', 'SoundGrid')

@section('content')
  @if ($featuredPlaylist)
    <section class="home-hero" aria-label="Featured Playlist Banner">
      <div class="home-hero__content">
        <span class="home-hero__tag">Featured Creator Playlist</span>
        <h1 class="home-hero__title">{{ $featuredPlaylist->title }}</h1>
        <p class="home-hero__subtitle">
          {{ $featuredPlaylist->description }}
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
          src="{{ asset($featuredPlaylist->cover_image) }}"
          alt="{{ $featuredPlaylist->title }}"
          class="home-hero__art-img"
        />
        <i class="ri-play-circle-fill cover-play-badge"></i>
      </div>
    </section>
  @endif

  <section class="sg-section" aria-label="Popular Playlists">
    <div class="sg-section__header">
      <h2 class="sg-section__title">Popular Playlists</h2>
      <a href="#" class="sg-section__link">View all playlists</a>
    </div>

    <div class="playlist-cards-grid">
      @foreach ($playlists as $playlist)
        <a href="#" class="playlist-card">
          <div class="playlist-card__art">
            <img src="{{ asset($playlist->cover_image) }}" alt="{{ $playlist->title }}" class="playlist-card__img" />
            <i class="ri-play-circle-fill cover-play-badge"></i>
          </div>
          <div class="playlist-card__title">{{ $playlist->title }}</div>
          <div class="playlist-card__meta">By {{ $playlist->user->name ?? 'SoundGrid' }} &bull; {{ $playlist->songs_count }} songs</div>
        </a>
      @endforeach
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
          @foreach ($recentSongs as $index => $song)
            <tr
              class="js-song-row {{ $index === 0 ? 'is-active' : '' }}"
              data-title="{{ $song->title }}"
              data-artist="{{ $song->artist }}"
              data-duration="{{ $song->duration }}"
              data-cover="{{ asset($song->cover_image) }}"
            >
              <td class="col-num">{{ $index + 1 }}</td>
              <td class="col-title">{{ $song->title }}</td>
              <td class="col-artist">{{ $song->artist }}</td>
              <td class="col-album">{{ $song->album }}</td>
              <td class="col-duration">{{ $song->duration }}</td>
              <td class="col-more">
                <button type="button" class="track-more-btn" aria-label="More options">
                  <i class="ri-more-fill"></i>
                </button>
              </td>
            </tr>
          @endforeach
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
