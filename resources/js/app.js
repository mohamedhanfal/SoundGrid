(function () {
  const audio = document.getElementById('audio-player');
  const playBtn = document.getElementById('player-btn-play');
  const prevBtn = document.getElementById('player-btn-prev');
  const nextBtn = document.getElementById('player-btn-next');
  const shuffleBtn = document.getElementById('player-btn-shuffle');
  const repeatBtn = document.getElementById('player-btn-repeat');
  const muteBtn = document.getElementById('player-btn-mute');
  const volumeSlider = document.getElementById('player-volume-slider');
  const headerPlayBtn = document.getElementById('btn-play-playlist');
  const heroArt = document.querySelector('.home-hero__art');

  const titleEl = document.getElementById('player-song-title');
  const artistEl = document.getElementById('player-song-artist');
  const totalTimeEl = document.getElementById('player-time-total');
  const currentTimeEl = document.getElementById('player-time-current');
  const scrubberEl = document.getElementById('player-scrubber');
  const thumbImgEl = document.getElementById('player-thumb-img');
  const searchInput = document.getElementById('global-topbar-search');

  const tracksTitleEl = document.getElementById('home-tracks-title');
  const tracksBodyEl = document.getElementById('home-tracks-body');
  const resetRecentBtn = document.getElementById('btn-reset-recent');
  const homeDataEl = document.getElementById('home-page-data');
  const homeData = homeDataEl ? JSON.parse(homeDataEl.dataset.home) : null;

  let isPlaying = false;
  let isShuffle = false;
  let isRepeat = false;
  let isSeeking = false;
  let usingFallback = false;
  let fallbackSeconds = 0;
  let fallbackTotalSeconds = 200;
  let tickerId = null;

  function parseDurationToSeconds(str) {
    if (!str || !str.includes(':')) return 200;
    const parts = str.split(':').map((p) => parseInt(p, 10));
    return parts.length === 2 ? parts[0] * 60 + parts[1] : 200;
  }

  function formatSeconds(sec) {
    const safeSec = Number.isFinite(sec) && sec >= 0 ? sec : 0;
    const m = Math.floor(safeSec / 60);
    const s = Math.floor(safeSec % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  function updatePlayButtonIcon() {
    if (!playBtn) return;
    playBtn.innerHTML = isPlaying
      ? '<i class="ri-pause-fill"></i>'
      : '<i class="ri-play-fill player-play-icon"></i>';
  }

  function updateMuteIcon() {
    if (!muteBtn || !audio) return;
    const muted = audio.muted || audio.volume === 0;
    muteBtn.innerHTML = muted
      ? '<i class="ri-volume-mute-line"></i>'
      : '<i class="ri-volume-up-line"></i>';
  }

  function stopTicker() {
    if (tickerId) {
      clearInterval(tickerId);
      tickerId = null;
    }
  }

  function startFallbackTicker() {
    stopTicker();
    usingFallback = true;
    tickerId = setInterval(() => {
      if (!isPlaying) return;
      fallbackSeconds += 1;
      if (fallbackSeconds >= (fallbackTotalSeconds || 200)) {
        if (isRepeat) {
          fallbackSeconds = 0;
        } else {
          stepSong(1);
          return;
        }
      }
      if (!isSeeking) {
        if (currentTimeEl) currentTimeEl.textContent = formatSeconds(fallbackSeconds);
        if (scrubberEl) {
          scrubberEl.value = ((fallbackSeconds / (fallbackTotalSeconds || 200)) * 100).toFixed(1);
        }
      }
    }, 1000);
  }

  function playFallback() {
    isPlaying = true;
    updatePlayButtonIcon();
    startFallbackTicker();
  }

  function setPlayerTrack(track, autoPlay = true) {
    if (!track) return;

    stopTicker();
    usingFallback = false;
    fallbackSeconds = 0;
    fallbackTotalSeconds = parseDurationToSeconds(track.duration);

    if (titleEl) titleEl.textContent = track.title;
    if (artistEl) artistEl.textContent = track.artist;
    if (totalTimeEl) totalTimeEl.textContent = track.duration || '0:00';
    if (thumbImgEl && track.cover) thumbImgEl.src = track.cover;
    if (currentTimeEl) currentTimeEl.textContent = '0:00';
    if (scrubberEl) scrubberEl.value = '0';

    try {
      localStorage.setItem('soundgrid_current_track', JSON.stringify(track));
    } catch (e) {
    }

    if (audio) {
      audio.pause();
      if (track.audio) {
        audio.src = track.audio;
        audio.load();
      } else {
        audio.removeAttribute('src');
      }
    }

    if (!autoPlay) {
      isPlaying = false;
      updatePlayButtonIcon();
      return;
    }

    if (audio && track.audio) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            usingFallback = false;
            isPlaying = true;
            updatePlayButtonIcon();
          })
          .catch(() => {
            playFallback();
          });
      }
    } else {
      playFallback();
    }
  }

  function getPageSongRows() {
    return Array.from(document.querySelectorAll('.js-song-row'));
  }

  function trackFromRow(row) {
    return {
      title: row.dataset.title || 'Unknown Title',
      artist: row.dataset.artist || 'Unknown Artist',
      duration: row.dataset.duration || '3:30',
      cover: row.dataset.cover || '',
      audio: row.dataset.audio || '',
    };
  }

  function selectSongRow(row, autoPlay = true) {
    const rows = getPageSongRows();
    rows.forEach((item) => item.classList.remove('is-active'));
    row.classList.add('is-active');
    setPlayerTrack(trackFromRow(row), autoPlay);
  }

  function stepSong(direction) {
    const allRows = getPageSongRows();
    const visibleRows = allRows.filter((r) => !r.hidden);
    const rows = visibleRows.length > 0 ? visibleRows : allRows;
    if (rows.length === 0) return;

    const activeIndex = rows.findIndex((r) => r.classList.contains('is-active'));
    let nextIndex;

    if (isShuffle && direction > 0 && rows.length > 1) {
      do {
        nextIndex = Math.floor(Math.random() * rows.length);
      } while (nextIndex === activeIndex);
    } else {
      const baseIndex = activeIndex === -1 ? 0 : activeIndex;
      nextIndex = (baseIndex + direction + rows.length) % rows.length;
    }

    selectSongRow(rows[nextIndex], true);
  }

  function bindRowEvents() {
    getPageSongRows().forEach((row) => {
      row.onclick = () => selectSongRow(row, true);
    });
  }

  function renumberVisibleRows() {
    let visibleIndex = 1;
    getPageSongRows().forEach((row) => {
      if (!row.hidden) {
        const numCell = row.querySelector('.col-num');
        if (numCell) numCell.textContent = String(visibleIndex);
        visibleIndex += 1;
      }
    });
  }

  function applySearchAndGenreFilter() {
    const query = (searchInput?.value || '').trim().toLowerCase();
    const activeTile = document.querySelector('.category-tile.is-selected');
    const selectedGenre = (activeTile?.dataset.genre || '').trim().toLowerCase();

    getPageSongRows().forEach((row) => {
      const matchesQuery = query === '' || row.textContent.toLowerCase().includes(query);
      const rowGenre = (row.dataset.genre || '').trim().toLowerCase();
      const matchesGenre = selectedGenre === '' || rowGenre === selectedGenre;
      row.hidden = !(matchesQuery && matchesGenre);
    });

    document.querySelectorAll('.playlist-card').forEach((card) => {
      const matchesQuery = query === '' || card.textContent.toLowerCase().includes(query);
      const cardGenre = (card.dataset.genre || '').trim().toLowerCase();
      const matchesGenre = selectedGenre === '' || cardGenre === selectedGenre;
      card.hidden = !(matchesQuery && matchesGenre);
    });

    renumberVisibleRows();
  }

  function buildTrackRow(track, index) {
    const tr = document.createElement('tr');
    tr.className = 'js-song-row' + (index === 0 ? ' is-active' : '');
    tr.dataset.title = track.title || '';
    tr.dataset.artist = track.artist || '';
    tr.dataset.duration = track.duration || '';
    tr.dataset.cover = track.cover || '';
    tr.dataset.audio = track.audio || '';

    const numTd = document.createElement('td');
    numTd.className = 'col-num';
    numTd.textContent = String(index + 1);

    const titleTd = document.createElement('td');
    titleTd.className = 'col-title';
    titleTd.textContent = track.title || '';

    const artistTd = document.createElement('td');
    artistTd.className = 'col-artist';
    artistTd.textContent = track.artist || '';

    const albumTd = document.createElement('td');
    albumTd.className = 'col-album';
    albumTd.textContent = track.album || '';

    const durationTd = document.createElement('td');
    durationTd.className = 'col-duration';
    durationTd.textContent = track.duration || '';

    const moreTd = document.createElement('td');
    moreTd.className = 'col-more';
    const moreBtn = document.createElement('button');
    moreBtn.type = 'button';
    moreBtn.className = 'track-more-btn';
    moreBtn.setAttribute('aria-label', 'More options');
    const moreIcon = document.createElement('i');
    moreIcon.className = 'ri-more-fill';
    moreBtn.appendChild(moreIcon);
    moreTd.appendChild(moreBtn);

    tr.append(numTd, titleTd, artistTd, albumTd, durationTd, moreTd);
    return tr;
  }

  function renderTracks(tracks, headingTitle, showReset) {
    if (!tracksBodyEl || !Array.isArray(tracks)) return;

    if (tracksTitleEl) tracksTitleEl.textContent = headingTitle;
    if (resetRecentBtn) resetRecentBtn.hidden = !showReset;

    tracksBodyEl.innerHTML = '';
    tracks.forEach((track, index) => {
      tracksBodyEl.appendChild(buildTrackRow(track, index));
    });

    bindRowEvents();
  }

  function playPlaylistBySlug(slug) {
    const playlist = homeData?.playlists?.[slug];
    if (!playlist || !playlist.tracks || playlist.tracks.length === 0) return;

    renderTracks(playlist.tracks, playlist.title, true);
    const rows = getPageSongRows();
    if (rows.length > 0) {
      selectSongRow(rows[0], true);
    }
  }

  if (audio) {
    audio.volume = (parseInt(volumeSlider?.value || '65', 10) || 65) / 100;

    audio.addEventListener('loadedmetadata', () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        if (totalTimeEl) totalTimeEl.textContent = formatSeconds(audio.duration);
      }
    });

    audio.addEventListener('timeupdate', () => {
      if (isSeeking || usingFallback || !Number.isFinite(audio.duration) || audio.duration <= 0) return;
      if (currentTimeEl) currentTimeEl.textContent = formatSeconds(audio.currentTime);
      if (scrubberEl) {
        scrubberEl.value = ((audio.currentTime / audio.duration) * 100).toFixed(1);
      }
    });

    audio.addEventListener('ended', () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
        return;
      }
      stepSong(1);
    });

    audio.addEventListener('error', () => {
      if (isPlaying) {
        playFallback();
      }
    });
  }

  playBtn?.addEventListener('click', () => {
    if (isPlaying) {
      isPlaying = false;
      updatePlayButtonIcon();
      if (usingFallback) {
        stopTicker();
      } else {
        audio?.pause();
      }
      return;
    }

    if (usingFallback || !audio || !audio.getAttribute('src') || audio.error) {
      playFallback();
      return;
    }

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isPlaying = true;
          updatePlayButtonIcon();
        })
        .catch(() => {
          playFallback();
        });
    }
  });

  prevBtn?.addEventListener('click', () => stepSong(-1));
  nextBtn?.addEventListener('click', () => stepSong(1));

  shuffleBtn?.addEventListener('click', () => {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle('is-active', isShuffle);
  });

  repeatBtn?.addEventListener('click', () => {
    isRepeat = !isRepeat;
    repeatBtn.classList.toggle('is-active', isRepeat);
    if (audio) audio.loop = isRepeat;
  });

  muteBtn?.addEventListener('click', () => {
    if (!audio) return;
    audio.muted = !audio.muted;
    updateMuteIcon();
  });

  volumeSlider?.addEventListener('input', (e) => {
    if (!audio) return;
    const vol = parseInt(e.target.value, 10) / 100;
    audio.volume = Math.max(0, Math.min(1, vol));
    if (audio.volume > 0 && audio.muted) {
      audio.muted = false;
    }
    updateMuteIcon();
  });

  if (scrubberEl) {
    const startSeek = () => {
      isSeeking = true;
    };

    scrubberEl.addEventListener('pointerdown', startSeek);
    scrubberEl.addEventListener('mousedown', startSeek);
    scrubberEl.addEventListener('touchstart', startSeek, { passive: true });

    scrubberEl.addEventListener('input', (e) => {
      isSeeking = true;
      const pct = parseFloat(e.target.value) / 100;
      if (!usingFallback && audio && Number.isFinite(audio.duration) && audio.duration > 0) {
        if (currentTimeEl) currentTimeEl.textContent = formatSeconds(pct * audio.duration);
      } else {
        const previewSec = Math.floor(pct * fallbackTotalSeconds);
        if (currentTimeEl) currentTimeEl.textContent = formatSeconds(previewSec);
      }
    });

    scrubberEl.addEventListener('change', (e) => {
      const pct = parseFloat(e.target.value) / 100;
      if (!usingFallback && audio && Number.isFinite(audio.duration) && audio.duration > 0) {
        audio.currentTime = pct * audio.duration;
        if (currentTimeEl) currentTimeEl.textContent = formatSeconds(audio.currentTime);
      } else {
        fallbackSeconds = Math.floor(pct * fallbackTotalSeconds);
        if (currentTimeEl) currentTimeEl.textContent = formatSeconds(fallbackSeconds);
      }
      isSeeking = false;
    });

    scrubberEl.addEventListener('pointercancel', () => {
      isSeeking = false;
    });
  }

  headerPlayBtn?.addEventListener('click', () => {
    const slug = headerPlayBtn.dataset.playlistSlug;
    if (slug && homeData?.playlists?.[slug]) {
      playPlaylistBySlug(slug);
      return;
    }
    const rows = getPageSongRows();
    if (rows.length > 0) selectSongRow(rows[0], true);
  });

  heroArt?.addEventListener('click', () => {
    const slug = heroArt.dataset.playlistSlug;
    if (slug && homeData?.playlists?.[slug]) {
      playPlaylistBySlug(slug);
    }
  });

  document.querySelectorAll('.playlist-card[data-playlist-slug]').forEach((card) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      playPlaylistBySlug(card.dataset.playlistSlug);
    });
  });

  document.querySelectorAll('.playlist-card[data-genre]:not([data-playlist-slug])').forEach((card) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const targetGenre = (card.dataset.genre || '').trim().toLowerCase();
      document.querySelectorAll('.category-tile').forEach((tile) => {
        const matches = (tile.dataset.genre || '').trim().toLowerCase() === targetGenre;
        tile.classList.toggle('is-selected', matches);
      });
      applySearchAndGenreFilter();
      const firstVisibleRow = getPageSongRows().find((r) => !r.hidden);
      if (firstVisibleRow) {
        selectSongRow(firstVisibleRow, true);
      }
    });
  });

  document.querySelectorAll('.category-tile').forEach((tile) => {
    tile.addEventListener('click', () => {
      document.querySelectorAll('.category-tile').forEach((t) => t.classList.remove('is-selected'));
      tile.classList.add('is-selected');
      applySearchAndGenreFilter();
    });
  });

  resetRecentBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    if (homeData?.recent) {
      renderTracks(homeData.recent, 'Recently Played', false);
    }
  });

  searchInput?.addEventListener('input', applySearchAndGenreFilter);

  const coverInput = document.getElementById('playlist-cover-input');
  const coverPreviewBox = document.getElementById('cover-preview-box');
  if (coverInput && coverPreviewBox) {
    coverInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        coverPreviewBox.innerHTML = '';
        const img = document.createElement('img');
        img.src = String(ev.target?.result || '');
        img.alt = 'Cover preview';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        coverPreviewBox.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  }

  bindRowEvents();
  const firstRow = getPageSongRows()[0];
  if (firstRow) {
    setPlayerTrack(trackFromRow(firstRow), false);
  }
})();
