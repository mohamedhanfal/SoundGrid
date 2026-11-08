import './styles/variables.css';
import './styles/global.css';
import './styles/layout.css';
import './styles/playlist-details.css';
import './styles/home.css';
import './styles/search.css';
import './styles/my-playlists.css';
import './styles/create-playlist.css';
import './styles/profile.css';
import './styles/auth.css';

import { store } from './state/store.js';
import { renderSidebar, bindSidebarEvents } from './components/Sidebar.js';
import { renderTopbar, bindTopbarEvents } from './components/Topbar.js';
import {
  renderAudioPlayer,
  bindAudioPlayerEvents,
  updateAudioPlayerTimelineOnly
} from './components/AudioPlayer.js';

import {
  renderPlaylistDetailsPage,
  bindPlaylistDetailsEvents
} from './pages/PlaylistDetailsPage.js';
import { renderHomePage, bindHomeEvents } from './pages/HomePage.js';
import { renderSearchPage, bindSearchEvents } from './pages/SearchPage.js';
import {
  renderMyPlaylistsPage,
  bindMyPlaylistsEvents
} from './pages/MyPlaylistsPage.js';
import {
  renderCreatePlaylistPage,
  bindCreatePlaylistEvents
} from './pages/CreatePlaylistPage.js';
import { renderProfilePage, bindProfileEvents } from './pages/ProfilePage.js';
import { renderAuthPage, bindAuthEvents } from './pages/AuthPage.js';

const appRoot = document.getElementById('app');

const PAGE_VIEWS = {
  home: { render: renderHomePage, bind: bindHomeEvents },
  search: { render: renderSearchPage, bind: bindSearchEvents },
  'my-playlists': { render: renderMyPlaylistsPage, bind: bindMyPlaylistsEvents },
  'create-playlist': { render: renderCreatePlaylistPage, bind: bindCreatePlaylistEvents },
  profile: { render: renderProfilePage, bind: bindProfileEvents },
  'playlist-details': { render: renderPlaylistDetailsPage, bind: bindPlaylistDetailsEvents }
};

function getActiveView(page) {
  return PAGE_VIEWS[page] || PAGE_VIEWS['playlist-details'];
}

function renderFullShell(state) {
  if (state.currentPage === 'auth') {
    appRoot.innerHTML = renderAuthPage(state);
    bindAuthEvents(appRoot);
    return;
  }

  const activeView = getActiveView(state.currentPage);

  appRoot.innerHTML = `
    <div class="app-shell">
      ${renderSidebar(state)}
      <main class="app-main" id="app-main-viewport">
        ${renderTopbar(state)}
        <div id="page-view-outlet">
          ${activeView.render(state)}
        </div>
      </main>
      <div id="player-outlet">
        ${renderAudioPlayer()}
      </div>
    </div>
  `;

  bindSidebarEvents(appRoot);
  bindTopbarEvents(appRoot);
  activeView.bind(document.getElementById('page-view-outlet'), state);
  bindAudioPlayerEvents(document.getElementById('player-outlet'));
}

// Re-render only the page outlet during search typing so the topbar input keeps focus and cursor position
function renderOutletOnly(state) {
  const outlet = document.getElementById('page-view-outlet');
  if (!outlet) {
    renderFullShell(state);
    return;
  }
  const activeView = getActiveView(state.currentPage);
  outlet.innerHTML = activeView.render(state);
  activeView.bind(outlet, state);
}

function renderPlayerOnly() {
  const playerOutlet = document.getElementById('player-outlet');
  if (playerOutlet) {
    playerOutlet.innerHTML = renderAudioPlayer();
    bindAudioPlayerEvents(playerOutlet);
  }
}

store.subscribe((state, reason) => {
  if (reason === 'player-tick') {
    updateAudioPlayerTimelineOnly();
    return;
  }
  if (reason === 'player-volume') {
    renderPlayerOnly();
    return;
  }
  if (reason === 'search') {
    renderOutletOnly(state);
    return;
  }
  if (reason === 'player') {
    renderPlayerOnly();
    renderOutletOnly(state);
    return;
  }
  renderFullShell(state);
});

renderFullShell(store.state);
