@extends('layouts.app')

@section('title', 'SoundGrid')

@section('content')
  @if ($featuredPlaylist)
    <section class="home-hero" aria-label="Featured Playlist Banner">
      <div class="home-hero__content">
        <span class="home-hero__tag">Featured Creator Playlist</span>
        <h1 class="home-hero__title">{{ $featuredPlaylist->title }}</h1>
        <p class="home-hero__subtitle">
          {{ $featuredPlaylist->description }}
        </p>
        <div class="home-hero__actions">
          <button
            type="button"
            class="btn btn--primary"
            id="btn-play-playlist"
            data-playlist-slug="{{ $featuredPlaylist->slug }}"
          >
            <i class="ri-play-fill"></i>
            <span>Listen Now</span>
          </button>
          <a href="#" class="btn btn--outline">
            <span>Open Playlist</span>
          </a>
        </div>
      </div>

      <div class="home-hero__art" data-playlist-slug="{{ $featuredPlaylist->slug }}" style="cursor: pointer;">
        <img
          src="{{ asset($featuredPlaylist->cover_image) }}"
          alt="{{ $featuredPlaylist->title }}"
          class="home-hero__art-img"
        />
        <i class="ri-play-circle-fill cover-play-badge"></i>
      </div>
    </section>
  @endif

  <section class="sg-section" aria-label="Popular Playlists">
    <div class="sg-section__header">
      <h2 class="sg-section__title">Popular Playlists</h2>
      <a href="#" class="sg-section__link">View all playlists</a>
    </div>

    <div class="playlist-cards-grid">
      @foreach ($playlists as $playlist)
        <a
          href="#"
          class="playlist-card"
          data-playlist-slug="{{ $playlist->slug }}"
          data-playlist-title="{{ $playlist->title }}"
        >
          <div class="playlist-card__art">
            <img src="{{ asset($playlist->cover_image) }}" alt="{{ $playlist->title }}" class="playlist-card__img" />
            <i class="ri-play-circle-fill cover-play-badge"></i>
          </div>
          <div class="playlist-card__title">{{ $playlist->title }}</div>
          <div class="playlist-card__meta">By {{ $playlist->user->name ?? 'SoundGrid' }} &bull; {{ $playlist->songs_count }} songs</div>
        </a>
      @endforeach
    </div>
  </section>

  <section class="sg-section" aria-label="Recently Played">
    <div class="sg-section__header">
      <h2 class="sg-section__title" id="home-tracks-title">Recently Played</h2>
      <a href="#" class="sg-section__link" id="btn-reset-recent" hidden>Back to Recently Played</a>
    </div>

    <div class="track-table-wrap">
      <table class="track-table">
        <thead>
          <tr>
            <th class="col-num">#</th>
            <th class="col-title">Title</th>
            <th class="col-artist">Artist</th>
            <th class="col-album">Album</th>
            <th class="col-duration">Duration</th>
            <th class="col-more"></th>
          </tr>
        </thead>
        <tbody id="home-tracks-body">
          @foreach ($recentSongs as $index => $song)
            <tr
              class="js-song-row {{ $index === 0 ? 'is-active' : '' }}"
              data-title="{{ $song->title }}"
              data-artist="{{ $song->artist }}"
              data-duration="{{ $song->duration }}"
              data-cover="{{ asset($song->cover_image) }}"
              data-audio="{{ $song->audio_path ? route('songs.stream', $song) : '' }}"
            >
              <td class="col-num">{{ $index + 1 }}</td>
              <td class="col-title">{{ $song->title }}</td>
              <td class="col-artist">{{ $song->artist }}</td>
              <td class="col-album">{{ $song->album }}</td>
              <td class="col-duration">{{ $song->duration }}</td>
              <td class="col-more">
                <button type="button" class="track-more-btn" aria-label="More options">
                  <i class="ri-more-fill"></i>
                </button>
              </td>
            </tr>
          @endforeach
        </tbody>
      </table>
    </div>
  </section>

  <div id="home-page-data" data-home="{{ json_encode($homeData) }}" hidden></div>
@endsection
