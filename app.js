(function () {
  const CATALOG = {
    'alan-walker': {
      id: 'alan-walker',
      title: 'Alan Walker Hits',
      creator: 'Alan Walker',
      curator: 'SK',
      cover: 'resources/covers/alan walker cover.jpg',
      genre: 'Electronic / EDM',
      duration: '16m 09s',
      tracks: [
        { title: 'Faded', artist: 'Alan Walker', album: 'Different World', duration: '3:32', cover: 'resources/covers/alan walker cover.jpg' },
        { title: 'Alone', artist: 'Alan Walker', album: 'Alone', duration: '2:40', cover: 'resources/covers/alan walker cover.jpg' },
        { title: 'On My Way', artist: 'Alan Walker, Sabrina Carpenter', album: 'World of Walker', duration: '3:13', cover: 'resources/covers/alan walker cover.jpg' },
        { title: 'The Spectre', artist: 'Alan Walker', album: 'The Spectre', duration: '3:13', cover: 'resources/covers/alan walker cover.jpg' },
        { title: 'Darkside', artist: 'Alan Walker ft. Au/Ra', album: 'Different World', duration: '3:31', cover: 'resources/covers/alan walker cover.jpg' }
      ]
    },
    'the-weeknd': {
      id: 'the-weeknd',
      title: 'The Weeknd Collection',
      creator: 'The Weeknd',
      curator: 'Mohamed hanfal',
      cover: 'resources/covers/weeknd cover.jpg',
      genre: 'Pop / R&B',
      duration: '19m 07s',
      tracks: [
        { title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20', cover: 'resources/covers/weeknd cover.jpg' },
        { title: 'Starboy', artist: 'The Weeknd ft. Daft Punk', album: 'Starboy', duration: '3:50', cover: 'resources/covers/weeknd cover.jpg' },
        { title: 'Save Your Tears', artist: 'The Weeknd', album: 'After Hours', duration: '3:35', cover: 'resources/covers/weeknd cover.jpg' },
        { title: 'The Hills', artist: 'The Weeknd', album: 'Beauty Behind the Madness', duration: '4:02', cover: 'resources/covers/weeknd cover.jpg' },
        { title: 'Die For You', artist: 'The Weeknd', album: 'Starboy', duration: '4:20', cover: 'resources/covers/weeknd cover.jpg' }
      ]
    },
    'michael-jackson': {
      id: 'michael-jackson',
      title: 'King of Pop: Michael Jackson',
      creator: 'Michael Jackson',
      curator: 'Vidura',
      cover: 'resources/covers/mj cover.jpg',
      genre: 'Classics / Funk',
      duration: '24m 45s',
      tracks: [
        { title: 'Billie Jean', artist: 'Michael Jackson', album: 'Thriller', duration: '4:54', cover: 'resources/covers/mj cover.jpg' },
        { title: 'Beat It', artist: 'Michael Jackson', album: 'Thriller', duration: '4:18', cover: 'resources/covers/mj cover.jpg' },
        { title: 'Smooth Criminal', artist: 'Michael Jackson', album: 'Bad', duration: '4:17', cover: 'resources/covers/mj cover.jpg' },
        { title: 'Thriller', artist: 'Michael Jackson', album: 'Thriller', duration: '5:57', cover: 'resources/covers/mj cover.jpg' },
        { title: 'Man in the Mirror', artist: 'Michael Jackson', album: 'Bad', duration: '5:19', cover: 'resources/covers/mj cover.jpg' }
      ]
    },
    'thefatrat': {
      id: 'thefatrat',
      title: 'TheFatRat Gaming Anthems',
      creator: 'TheFatRat',
      curator: 'Nethmini',
      cover: 'resources/covers/thefatrat cover.jpg',
      genre: 'Gaming Anthems',
      duration: '20m 01s',
      tracks: [
        { title: 'Unity', artist: 'TheFatRat', album: 'Unity', duration: '4:09', cover: 'resources/covers/thefatrat cover.jpg' },
        { title: 'Monody', artist: 'TheFatRat ft. Laura Brehm', album: 'Monody', duration: '4:50', cover: 'resources/covers/thefatrat cover.jpg' },
        { title: 'Fly Away', artist: 'TheFatRat ft. Anjulie', album: 'Fly Away', duration: '3:14', cover: 'resources/covers/thefatrat cover.jpg' },
        { title: 'The Calling', artist: 'TheFatRat ft. Laura Brehm', album: 'The Calling', duration: '3:55', cover: 'resources/covers/thefatrat cover.jpg' },
        { title: 'Xenogenesis', artist: 'TheFatRat', album: 'Xenogenesis', duration: '3:53', cover: 'resources/covers/thefatrat cover.jpg' }
      ]
    },
    'sid-sriram': {
      id: 'sid-sriram',
      title: 'Sid Sriram Essentials',
      creator: 'Sid Sriram',
      curator: 'Osadi',
      cover: 'resources/covers/sid.jpg',
      genre: 'Soulful / Melodic',
      duration: '22m 02s',
      tracks: [
        { title: 'Srivalli', artist: 'Sid Sriram', album: 'Pushpa: The Rise', duration: '3:41', cover: 'resources/covers/sid.jpg' },
        { title: 'Kadhaippoma', artist: 'Sid Sriram', album: 'Oh My Kadavule', duration: '4:18', cover: 'resources/covers/sid.jpg' },
        { title: 'Samajavaragamana', artist: 'Sid Sriram', album: 'Ala Vaikunthapurramuloo', duration: '3:44', cover: 'resources/covers/sid.jpg' },
        { title: 'Inkem Inkem', artist: 'Sid Sriram', album: 'Geetha Govindam', duration: '4:27', cover: 'resources/covers/sid.jpg' },
        { title: 'Ennodu Nee Irundhaal', artist: 'Sid Sriram, Sunitha Sarathy', album: 'I', duration: '5:52', cover: 'resources/covers/sid.jpg' }
      ]
    }
  };

  const ALL_TRACKS = Object.values(CATALOG).flatMap((c) => c.tracks);

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

    try {
      localStorage.setItem('soundgrid_current_track', JSON.stringify(track));
    } catch (e) {
      /* ignore storage quota or disabled storage */
    }

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
      cover: row.dataset.cover || 'resources/covers/alan walker cover.jpg'
    };

    setPlayerTrack(track, true);
  }

  function stepSong(direction) {
    const rows = getPageSongRows();
    if (rows.length > 0) {
      const activeIndex = rows.findIndex((r) => r.classList.contains('is-active'));
      const nextIndex = (activeIndex + direction + rows.length) % rows.length;
      selectSongRow(rows[nextIndex]);
      return;
    }

    const currentTitle = titleEl ? titleEl.textContent : '';
    const currentIndex = ALL_TRACKS.findIndex((t) => t.title === currentTitle);
    const nextIndex = (currentIndex + direction + ALL_TRACKS.length) % ALL_TRACKS.length;
    setPlayerTrack(ALL_TRACKS[nextIndex], true);
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
    const rows = getPageSongRows();
    rows.forEach((row) => {
      const matches = row.textContent.toLowerCase().includes(query);
      row.hidden = !matches;
    });

    document.querySelectorAll('.playlist-card').forEach((card) => {
      const matches = card.textContent.toLowerCase().includes(query);
      card.hidden = !matches;
    });
  });

  document.querySelectorAll('.category-tile').forEach((tile) => {
    tile.addEventListener('click', () => {
      document.querySelectorAll('.category-tile').forEach((t) => t.classList.remove('is-selected'));
      tile.classList.add('is-selected');

      const filterGenre = tile.dataset.genre?.toLowerCase() || '';
      const rows = getPageSongRows();
      if (!filterGenre) {
        rows.forEach((r) => (r.hidden = false));
        return;
      }

      rows.forEach((row) => {
        const rowGenre = (row.dataset.genre || '').toLowerCase();
        row.hidden = rowGenre !== filterGenre;
      });
    });
  });

  function renderPlaylistDetails() {
    const container = document.getElementById('playlist-details-view');
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const creatorKey = params.get('creator') || 'alan-walker';
    const playlist = CATALOG[creatorKey] || CATALOG['alan-walker'];

    const coverEl = document.getElementById('playlist-header-cover');
    const titleEl = document.getElementById('playlist-header-title');
    const curatorEl = document.getElementById('playlist-header-curator');
    const countEl = document.getElementById('playlist-header-count');
    const durationEl = document.getElementById('playlist-header-duration');
    const tbody = document.getElementById('playlist-tracks-body');

    if (coverEl) coverEl.src = playlist.cover;
    if (titleEl) titleEl.textContent = playlist.title;
    if (curatorEl) curatorEl.textContent = 'By ' + playlist.curator;
    if (countEl) countEl.textContent = playlist.tracks.length + ' songs';
    if (durationEl) durationEl.textContent = playlist.duration;

    if (tbody) {
      tbody.innerHTML = playlist.tracks
        .map(
          (track, i) => `
        <tr class="js-song-row ${i === 0 ? 'is-active' : ''}"
            data-title="${track.title}"
            data-artist="${track.artist}"
            data-duration="${track.duration}"
            data-cover="${track.cover}">
          <td class="col-num">${i + 1}</td>
          <td class="col-title">${track.title}</td>
          <td class="col-artist">${track.artist}</td>
          <td class="col-album">${track.album}</td>
          <td class="col-duration">${track.duration}</td>
          <td class="col-more">
            <button type="button" class="track-more-btn" aria-label="More options">
              <i class="ri-more-fill"></i>
            </button>
          </td>
        </tr>
      `
        )
        .join('');
    }

    bindRowEvents();
  }

  function initPlayerState() {
    try {
      const stored = localStorage.getItem('soundgrid_current_track');
      if (stored) {
        const track = JSON.parse(stored);
        setPlayerTrack(track, false);
      }
    } catch (e) {
      /* ignore */
    }
  }

  renderPlaylistDetails();
  bindRowEvents();
  initPlayerState();
})();