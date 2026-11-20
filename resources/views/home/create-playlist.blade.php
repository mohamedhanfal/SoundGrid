
@extends('layouts.app')

@section('title', 'Create Playlist')

@section('content')

<div class="my-playlist-header">
    <h1 class="my-playlist-title">Create Playlist</h1>
    <p class="my-playlist-subtitle">
        Create your own music collection.
    </p>
</div>

<section class="sg-action">

    <form action="{{ route('create-playlist.store') }}"
          method="POST"
          enctype="multipart/form-data">

        @csrf

        <div class="create-form-grid">

            <div>
                <label class="cover-dropzone">

                    <div class="cover-dropzone__preview">
                        <i class="ri-image-add-line"></i>
                    </div>

                    <span class="cover-dropzone__title">
                        Upload Cover
                    </span>

                    <span class="cover-dropzone__sub">
                        Choose a playlist image
                    </span>

                    <input type="file"
                           name="cover"
                           accept="image/*"
                           hidden>
                </label>
            </div>

            <div class="form-fields">

                <div class="form-group">
                    <label>Playlist Name</label>

                    <input type="text"
                           name="name"
                           class="form-control"
                           placeholder="Enter playlist name"
                           required>
                </div>

                <div class="form-group">
                    <label>Description</label>

                    <textarea name="description"
                              class="form-control"
                              placeholder="Write something about your playlist..."></textarea>
                </div>

                <div class="form-group">
                    <label>Select Songs</label>

                    <div class="song-checklist">

                        <label class="song-check-row">
                            <span class="song-check-row__left">
                                <span class="song-check-row__index">01</span>
                                <span>
                                    <span class="song-check-row__title">Faded</span>
                                    <br>
                                    <span class="song-check-row__meta">Alan Walker</span>
                                </span>
                            </span>
                            <input type="checkbox" name="songs[]" value="1">
                        </label>

                        <label class="song-check-row">
                            <span class="song-check-row__left">
                                <span class="song-check-row__index">02</span>
                                <span>
                                    <span class="song-check-row__title">Blinding Lights</span>
                                    <br>
                                    <span class="song-check-row__meta">The Weeknd</span>
                                </span>
                            </span>
                            <input type="checkbox" name="songs[]" value="2">
                        </label>

                        <label class="song-check-row">
                            <span class="song-check-row__left">
                                <span class="song-check-row__index">03</span>
                                <span>
                                    <span class="song-check-row__title">Billie Jean</span>
                                    <br>
                                    <span class="song-check-row__meta">Michael Jackson</span>
                                </span>
                            </span>
                            <input type="checkbox" name="songs[]" value="3">
                        </label>

                    </div>
                </div>

                <div class="form-actions">
                    <button type="submit">Create Playlist</button>
                </div>

            </div>

        </div>

    </form>

</section>

@endsection
