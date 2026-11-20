
@extends('layouts.app')

@section('title', 'My Playlists | SoundGrid')

@section('content')
  <section class="my-playlists-header">
    <div>
      <h1 class="my-playlists-header__title">My Playlists</h1>
      <p class="my-playlists-header__subtitle">
        Your personal collection of playlists.
      </p>
    </div>
  </section>

  <div class="playlist-cards-grid">
   

    @forelse ($playlists as $playlist)
   <a href="{{ route('playlists.show', $playlist->slug) }}" class="playlist-card">
        <div class="playlist-card__art">
          <img
            src="{{ $playlist->cover_image ? asset($playlist->cover_image) : asset('images/default-cover.png') }}"
            alt="{{ $playlist->title }}"
            class="playlist-card__img"
          />
        </div>

        <div class="playlist-card__title">
          {{ $playlist->title }}
        </div>

        <div class="playlist-card__meta">
          By {{ $playlist->user->name ?? 'SoundGrid' }}
          &bull;
          {{ $playlist->songs_count }} songs
        </div>
      </a>
    @empty
      <p>No playlists available yet.</p>
    @endforelse
  </div>
@endsection
