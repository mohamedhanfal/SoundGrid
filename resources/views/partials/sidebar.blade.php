<aside class="app-sidebar" aria-label="Primary Navigation">
  <div>
    <a href="{{ route('home') }}" class="sidebar-brand">
      <span class="sidebar-brand__icon" aria-hidden="true">
        <img src="{{ asset('images/SoundGrid logo.png') }}" alt="SoundGrid Logo" class="brand-logo-img" />
      </span>
      <span class="sidebar-brand__title">SoundGrid</span>
    </a>

    <nav class="sidebar-nav">
      <a href="{{ route('home') }}" class="sidebar-nav__item {{ request()->routeIs('home') ? 'is-active' : '' }}">
        <i class="ri-home-5-line"></i>
        <span>Home</span>
      </a>

      <a href="{{ route('search') }}" class="sidebar-nav__item {{ request()->routeIs('search') ? 'is-active' : '' }}">
        <i class="ri-search-line"></i>
        <span>Search</span>
      </a>

      <a href="#" class="sidebar-nav__item {{ request()->routeIs('playlists.*') ? 'is-active' : '' }}">
        <i class="ri-play-list-line"></i>
        <span>My Playlists</span>
      </a>

      <a href="{{ route('create-playlist') }}" class="sidebar-nav__item {{ request()->routeIs('create-playlist.create') ? 'is-active' : '' }}">
        <i class="ri-add-circle-line"></i>
        <span>Create Playlist</span>
      </a>

      <a href="#" class="sidebar-nav__item {{ request()->routeIs('profile') ? 'is-active' : '' }}">
        <i class="ri-user-3-line"></i>
        <span>Profile</span>
      </a>
    </nav>
  </div>

  <div class="sidebar-footer">
    <a href="#" class="sidebar-auth-switch">
      <i class="ri-headphone-line"></i>
      <span>Calm Vibes</span>
    </a>
    <a href="#" class="sidebar-auth-switch">
      <i class="ri-lock-line"></i>
      <span>Login / Register</span>
    </a>
  </div>
</aside>
