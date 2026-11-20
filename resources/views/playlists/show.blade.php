@extends('layouts.app')

@section('title', $playlist->title . ' | SoundGrid')

@section('content')

<div class="view-container" id="playlist-details-view">

    {{-- Playlist Header --}}
    <section class="playlist-header" aria-label="Playlist Overview">

        <div class="playlist-cover-art">
            <img
                src="{{ $playlist->cover_image ? asset($playlist->cover_image) : asset('images/default-cover.png') }}"
                alt="{{ $playlist->title }}"
                class="playlist-cover-art__img"
            >
        </div>

        <div class="playlist-info">

            <h1 class="playlist-info__title">
                {{ $playlist->title }}
            </h1>

            <div class="playlist-info__meta">

                <span>
                    By {{ $playlist->user->name ?? 'SoundGrid' }}
                </span>

                <span class="playlist-info__dot">&bull;</span>

                <span>
                    {{ $playlist->songs->count() }} songs
                </span>

            </div>

            <div class="playlist-info__actions">

                <button
                    type="button"
                    class="btn btn--primary"
                    id="btn-play-playlist"
                >
                    <i class="ri-play-fill"></i>
                    <span>Play</span>
                </button>

                <a href="{{ route('playlists.index') }}" class="btn btn--outline">
                    <i class="ri-arrow-left-line"></i>
                    <span>Back to Playlists</span>
                </a>

            </div>

        </div>

    </section>


    {{-- Tracklist --}}
    <section class="track-table-wrap" aria-label="Tracklist">

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

            <tbody id="playlist-tracks-body">

                @forelse ($playlist->songs as $index => $song)

                   <tr
    class="js-song-row"
    data-title="{{ $song->title }}"
    data-artist="{{ $song->artist }}"
    data-duration="{{ $song->duration }}"
    data-cover="{{ $song->cover_image ? asset($song->cover_image) : '' }}"
    data-audio="{{ $song->audio_path ? asset($song->audio_path) : '' }}"
>

                        <td class="col-num">
                            {{ $index + 1 }}
                        </td>

                        <td class="col-title">
                            {{ $song->title }}
                        </td>

                        <td class="col-artist">
                            {{ $song->artist }}
                        </td>

                        <td class="col-album">
                            {{ $song->album ?? 'Unknown Album' }}
                        </td>

                        <td class="col-duration">
                            {{ $song->duration }}
                        </td>

                    <td class="col-more">
    <button
        type="button"
        class="track-more-btn"
        aria-label="More options"
        title="More options"
    >
        <i class="ri-more-fill"></i>
    </button>
</td>
                    </tr>

                @empty

                    <tr>
                        <td colspan="6">
                            No songs available in this playlist.
                        </td>
                    </tr>

                @endforelse

            </tbody>

        </table>

    </section>

</div>

@endsection