(function () {
  let isPlaying = false;
  const playBtn = document.getElementById('player-btn-play');
  const headerPlayBtn = document.getElementById('btn-play-playlist');
  const titleEl = document.getElementById('player-song-title');
  const artistEl = document.getElementById('player-song-artist');
  const totalTimeEl = document.getElementById('player-time-total');
  const searchInput = document.getElementById('global-topbar-search');
  const rows = Array.from(document.querySelectorAll('.js-song-row'));

  function updatePlayButtonIcon() {
    if (!playBtn) return;
    playBtn.innerHTML = isPlaying
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" class="player-play-icon"><polygon points="6,4 20,12 6,20" /></svg>';
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

  playBtn?.addEventListener('click', () => {
    isPlaying = !isPlaying;
    updatePlayButtonIcon();
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
