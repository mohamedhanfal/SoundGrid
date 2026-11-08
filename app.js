(function () {
  let isPlaying = false;
  let isMuted = false;

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
  const searchInput = document.getElementById('global-topbar-search');
  const rows = Array.from(document.querySelectorAll('.js-song-row'));

  function updatePlayButtonIcon() {
    if (!playBtn) return;
    playBtn.innerHTML = isPlaying
      ? '<i class="ri-pause-fill"></i>'
      : '<i class="ri-play-fill player-play-icon"></i>';
  }

  function selectSongRow(row) {
    rows.forEach((item) => item.classList.remove('is-active'));
    row.classList.add('is-active');

    if (titleEl && row.dataset.title) titleEl.textContent = row.dataset.title;
    if (artistEl && row.dataset.artist) artistEl.textContent = row.dataset.artist;
    if (totalTimeEl && row.dataset.duration) totalTimeEl.textContent = row.dataset.duration;

    isPlaying = true;
    updatePlayButtonIcon();
  }

  function stepSong(direction) {
    if (rows.length === 0) return;
    const activeIndex = rows.findIndex((row) => row.classList.contains('is-active'));
    const nextIndex = (activeIndex + direction + rows.length) % rows.length;
    selectSongRow(rows[nextIndex]);
  }

  playBtn?.addEventListener('click', () => {
    isPlaying = !isPlaying;
    updatePlayButtonIcon();
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
    if (rows.length > 0) selectSongRow(rows[0]);
  });

  rows.forEach((row) => {
    row.addEventListener('click', () => selectSongRow(row));
  });

  searchInput?.addEventListener('input', (event) => {
    const query = event.target.value.trim().toLowerCase();
    rows.forEach((row) => {
      const matches = row.textContent.toLowerCase().includes(query);
      row.hidden = !matches;
    });
  });

  document.querySelectorAll('.category-tile').forEach((tile) => {
    tile.addEventListener('click', () => {
      document.querySelectorAll('.category-tile').forEach((item) => item.classList.remove('is-selected'));
      tile.classList.add('is-selected');
    });
  });
})();
