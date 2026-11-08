import { store } from '../state/store.js';

export function renderProfilePage(state) {
  return `
    <div class="view-container">
      <div class="profile-card">
        <div class="profile-card__avatar">${state.user.initials}</div>
        <div>
          <span class="home-hero__tag">Account Profile</span>
          <h1 style="font-size: 1.9rem; font-weight: 800; color: var(--text-dark); margin-bottom: 4px;">
            ${state.user.fullName}
          </h1>
          <p style="color: var(--text-secondary); font-size: 0.94rem;">
            @${state.user.name} • ${state.user.email}
          </p>
        </div>
      </div>

      <div class="profile-stats-row">
        <div class="profile-stat-box">
          <div class="profile-stat-box__val">${state.playlists.length}</div>
          <div class="profile-stat-box__label">Personal Playlists</div>
        </div>
        <div class="profile-stat-box">
          <div class="profile-stat-box__val">${state.songs.length}</div>
          <div class="profile-stat-box__label">Saved Library Tracks</div>
        </div>
        <div class="profile-stat-box">
          <div class="profile-stat-box__val">320 kbps</div>
          <div class="profile-stat-box__label">Audio Bitrate</div>
        </div>
      </div>

      <div style="display: flex; gap: 12px;">
        <button type="button" class="btn btn--primary" id="profile-open-playlists">
          View My Playlists
        </button>
        <button type="button" class="btn btn--outline" id="profile-open-auth">
          Sign Out / Switch Account
        </button>
      </div>
    </div>
  `;
}

export function bindProfileEvents(root) {
  root.querySelector('#profile-open-playlists')?.addEventListener('click', () => {
    store.navigate('my-playlists');
  });
  root.querySelector('#profile-open-auth')?.addEventListener('click', () => {
    store.navigate('auth');
  });
}
