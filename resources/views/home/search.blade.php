@extends('layouts.app')

@section('title', 'SoundGrid - Search')

@section('content')
  <div class="my-playlists-header">
    <div>
      <h1 class="my-playlists-header__title">Search &amp; Discover</h1>
      <p class="my-playlists-header__subtitle">
        Filter songs by genre or search across playlists
      </p>
    </div>
  </div>

  <section class="sg-section" aria-label="Browse Categories">
    <div class="sg-section__header">
      <h2 class="sg-section__title">Browse Categories</h2>
    </div>

    <div class="category-grid">
      <div class="category-tile is-selected" data-genre="">
        <div class="category-tile__title">All</div>
        <div class="category-tile__count">25 tracks</div>
      </div>

      <div class="category-tile" data-genre="Electronic / EDM">
        <div class="category-tile__title">Electronic / EDM</div>
        <div class="category-tile__count">5 tracks</div>
      </div>

      <div class="category-tile" data-genre="Pop / R&B">
        <div class="category-tile__title">Pop / R&amp;B</div>
        <div class="category-tile__count">5 tracks</div>
      </div>

      <div class="category-tile" data-genre="Classics / Funk">
        <div class="category-tile__title">Classics / Funk</div>
        <div class="category-tile__count">5 tracks</div>
      </div>

      <div class="category-tile" data-genre="Gaming Anthems">
        <div class="category-tile__title">Gaming Anthems</div>
        <div class="category-tile__count">5 tracks</div>
      </div>

      <div class="category-tile" data-genre="Soulful / Melodic">
        <div class="category-tile__title">Soulful / Melodic</div>
        <div class="category-tile__count">5 tracks</div>
      </div>
    </div>
  </section>

  <div class="search-dual-results">
    <section>
      <div class="sg-section__header">
        <h2 class="sg-section__title">Matching Songs</h2>
      </div>

      <div class="track-table-wrap">
        <table class="track-table">
          <thead>
            <tr>
              <th class="col-num">#</th>
              <th class="col-title">Title</th>
              <th class="col-artist">Artist</th>
              <th class="col-duration">Duration</th>
            </tr>
          </thead>
          <tbody>
            @forelse ($songs as $index => $song)
              <tr
                class="js-song-row {{ $index === 0 ? 'is-active' : '' }}"
                data-title="{{ $song->title }}"
                data-artist="{{ $song->artist }}"
                data-duration="{{ $song->duration }}"
                data-genre="{{ $song->genre }}"
                data-cover="{{ asset($song->cover_image) }}"
                data-audio="{{ $song->audio_path ? route('songs.stream', $song) : '' }}"
              >
                <td class="col-num">{{ $index + 1 }}</td>
                <td class="col-title">{{ $song->title }}</td>
                <td class="col-artist">{{ $song->artist }}</td>
                <td class="col-duration">{{ $song->duration }}</td>
              </tr>
            @empty
              <tr>
                <td colspan="4" class="text-center">No songs found</td>
              </tr>
            @endforelse
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <div class="sg-section__header">
        <h2 class="sg-section__title">Matching Playlists</h2>
      </div>

      <div class="playlist-cards-grid playlist-cards-grid--compact">
        @foreach ($playlists as $playlist)
          <a
            href="#"
            class="playlist-card"
            data-genre="{{ $playlist->genre }}"
          >
            <div class="playlist-card__art">
              <img src="{{ asset($playlist->cover_image) }}" alt="{{ $playlist->title }}" class="playlist-card__img" />
              <i class="ri-play-circle-fill cover-play-badge"></i>
            </div>
            <div class="playlist-card__title">{{ $playlist->title }}</div>
            <div class="playlist-card__meta">{{ $playlist->songs_count }} songs</div>
          </a>
        @endforeach
      </div>
    </section>
  </div>
@endsection
