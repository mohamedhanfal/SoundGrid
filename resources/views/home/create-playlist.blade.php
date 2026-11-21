@extends('layouts.app')

@section('title', 'SoundGrid - Create Playlist')

@section('content')
  <div class="my-playlists-header">
    <div>
      <h1 class="my-playlists-header__title">Create New Playlist</h1>
      <p class="my-playlists-header__subtitle">
        Enter playlist details and pick tracks from your library
      </p>
    </div>
  </div>

  <form action="{{ route('create-playlist.store') }}" method="POST" enctype="multipart/form-data">
    @csrf

    <div class="create-form-grid">
      <div>
        <label class="cover-dropzone" title="Choose cover image">
          <div class="cover-dropzone__preview" id="cover-preview-box">
            <i class="ri-image-add-line"></i>
          </div>
          <span class="cover-dropzone__title">Upload Cover Image</span>
          <span class="cover-dropzone__sub">PNG or JPG up to 5MB</span>
          <input type="file" name="cover" id="playlist-cover-input" accept="image/*" hidden />
        </label>
      </div>

      <div class="form-fields">
        <div class="form-group">
          <label for="pl-title-input">Playlist Name</label>
          <input
            type="text"
            id="pl-title-input"
            name="name"
            class="form-control"
            placeholder="Late Night Study Mix"
            value="{{ old('name') }}"
            required
          />
        </div>

        <div class="form-group">
          <label for="pl-desc-input">Description</label>
          <textarea
            id="pl-desc-input"
            name="description"
            class="form-control"
            rows="3"
            placeholder="Notes about this playlist..."
          >{{ old('description') }}</textarea>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn--primary">
            Save &amp; Open Playlist
          </button>
          <a href="{{ route('playlists.index') }}" class="btn btn--outline">Cancel</a>
        </div>
      </div>
    </div>

    <section class="sg-section">
      <div class="sg-section__header">
        <h2 class="sg-section__title">Select Songs to Add</h2>
      </div>

      <div class="song-checklist">
        @foreach ($songs as $index => $song)
          <label class="song-check-row">
            <span class="song-check-row__left">
              <span class="song-check-row__index">{{ $index + 1 }}</span>
              <span>
                <span class="song-check-row__title">{{ $song->title }}</span>
                <br />
                <span class="song-check-row__meta">{{ $song->artist }} &bull; {{ $song->album }}</span>
              </span>
            </span>
            <span class="song-check-row__right">
              <span class="song-check-row__duration">{{ $song->duration }}</span>
              <input
                type="checkbox"
                name="songs[]"
                value="{{ $song->id }}"
                {{ $index < 3 ? 'checked' : '' }}
              />
            </span>
          </label>
        @endforeach
      </div>
    </section>
  </form>
@endsection
