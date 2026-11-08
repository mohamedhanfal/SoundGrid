import { store } from '../state/store.js';

export function renderProfilePage(state) {
  return `
    <div class="view-container">
      <div class="profile-card">
        <div class="profile-card__avatar">${state.user.initials}</div>
        <div>
          <span class="home-hero__tag">Account Profile</span>
          <h1 class="profile-card__name">
            ${state.user.fullName}
          </h1>
          <p class="profile-card__handle">
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

      <div class="profile-actions">
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
