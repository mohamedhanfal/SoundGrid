import { store } from '../state/store.js';

export function renderAuthPage(state) {
  const isLogin = state.authMode !== 'register';

  return `
    <div class="auth-screen">
      <div class="auth-card">
        <div class="auth-card__brand">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="9" width="2.6" height="6" rx="1.3" fill="#1a73e8" />
            <rect x="6.5" y="4" width="2.6" height="16" rx="1.3" fill="#1a73e8" />
            <rect x="11" y="7" width="2.6" height="10" rx="1.3" fill="#3b82f6" />
            <rect x="15.5" y="5" width="2.6" height="14" rx="1.3" fill="#1a73e8" />
            <rect x="20" y="10" width="2.6" height="4" rx="1.3" fill="#60a5fa" />
          </svg>
          <span style="font-size: 1.35rem; font-weight: 800; color: var(--text-dark);">SoundGrid</span>
        </div>

        <h1 class="auth-card__title">${isLogin ? 'Welcome Back' : 'Create Your Account'}</h1>
        <p class="auth-card__subtitle">
          ${
            isLogin
              ? 'Sign in to access your Calm Vibes and personal playlists'
              : 'Create an account to build and stream your playlists'
          }
        </p>

        <form class="auth-form" id="auth-form">
          ${
            !isLogin
              ? `
            <div class="form-group">
              <label for="auth-name">Username</label>
              <input type="text" id="auth-name" class="form-control" placeholder="your username" required />
            </div>
          `
              : ''
          }

          <div class="form-group">
            <label for="auth-email">Email Address</label>
            <input type="email" id="auth-email" class="form-control" value="hanifal@soundgrid.io" required />
          </div>

          <div class="form-group">
            <label for="auth-password">Password</label>
            <input type="password" id="auth-password" class="form-control" value="••••••••" required />
          </div>

          <button type="submit" class="btn btn--primary auth-submit-btn">
            ${isLogin ? 'Sign In to SoundGrid' : 'Create Account'}
          </button>
        </form>

        <div class="auth-switch">
          ${
            isLogin
              ? `Don't have an account? <button type="button" id="toggle-auth-mode">Register</button>`
              : `Already have an account? <button type="button" id="toggle-auth-mode">Sign In</button>`
          }
        </div>
      </div>
    </div>
  `;
}

export function bindAuthEvents(root) {
  root.querySelector('#toggle-auth-mode')?.addEventListener('click', () => {
    const nextMode = store.state.authMode === 'register' ? 'login' : 'register';
    store.navigate('auth', { authMode: nextMode });
  });

  root.querySelector('#auth-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    store.navigate('playlist-details', { playlistId: 'calm-vibes' });
  });
}
