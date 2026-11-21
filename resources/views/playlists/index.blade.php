@extends('layouts.app')

@section('title', 'SoundGrid - My Playlists')

@section('content')
  <div class="my-playlists-header">
    <div>
      <h1 class="my-playlists-header__title">My Playlists</h1>
      <p class="my-playlists-header__subtitle">
        Manage your personal collections or build a new mix
      </p>
    </div>

    <a href="{{ route('create-playlist') }}" class="btn btn--primary">
      <i class="ri-add-line"></i>
      <span>Create Playlist</span>
    </a>
  </div>

  <div class="playlist-cards-grid">
    <a href="{{ route('create-playlist') }}" class="create-playlist-tile">
      <div class="create-playlist-tile__circle">
        <i class="ri-add-line"></i>
      </div>
      <div class="create-playlist-tile__label">Create New Playlist</div>
      <div class="create-playlist-tile__hint">Select songs and cover art</div>
    </a>

    @foreach ($playlists as $playlist)
      <a href="{{ route('playlists.show', $playlist->slug) }}" class="playlist-card">
        <div class="playlist-card__art">
          <img
            src="{{ $playlist->cover_image ? asset($playlist->cover_image) : asset('images/covers/alan walker cover.jpg') }}"
            alt="{{ $playlist->title }}"
            class="playlist-card__img"
          />
          <i class="ri-play-circle-fill cover-play-badge"></i>
        </div>
        <div class="playlist-card__title">{{ $playlist->title }}</div>
        <div class="playlist-card__meta">
          By {{ $playlist->user->name ?? 'SoundGrid' }} &bull; {{ $playlist->songs_count }} songs
        </div>
      </a>
    @endforeach
  </div>
@endsection
