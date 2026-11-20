@extends('layouts.app')


@section('title', 'SoundGrid - Search')

@section('content')

<div class="my-playlists-header">
    <div>
        <h1 class = "my-playlists-header__title">Search &amp; Discover </h1>

        <p class = "my-playlists-header__subtitle">Filter songs by genre or search across playlists</p>
</div>
</div>


{{--Browse Categories--}}
<section class = "sg-section">
    <div class = "sg-section__header">
        <h2 class = "sg-section__title">Browse Categories</h2>
</div>

<div class = "category-grid">
    
<div class = "category-tile category-tile--all is-selected" data-genre="">
    <div class = "category-tile__title">All</div>
    <div class = "category-tile__count">25 tracks</div>
</div>

<div class = "category-tile category-tile--electronic" data-genre = "Electronic / EDM">
    <div class = "category-tile__title">Electronic / EDM</div>
    <div class = "category-tile__count">5 tracks</div>
</div>

<div class = "category-tile category-tile--pop" data-genre = "Pop / R&B">
    <div class = "category-tile__title">Pop / R&amp;B</div>
    <div class = "category-tile__count">5 tracks</div>

</div>

<div class = "category-tile category-tile--classical" data-genre = "Classical">
    <div class = "category-tile__title">Classical</div>
    <div class = "category-tile__count">5 tracks</div>
</div>

<div class = "category-tile category-tile--calm" data-genre = "Gaming Anthems">
    <div class = "category-tile__title">Gaming Anthems</div>
    <div class = "category-tile__count">5 tracks</div>

</div>


<div class = "category-tile category-tile--acoustic" data-genre = "Soulful / Melodic">
    <div class = "category-tile__title">Soulful / Melodic</div>
    <div class = "category-tile__count">5 tracks</div>
</div>
</section>

{{--Search Results--}}
<div class = "search-dual-results">

       {{--Matching Songs--}}
       <section>

       <div class = "sg-section__header">
        <h2 class = "sg-section__title">Matching Songs</h2>
      </div>

      <div class = "track-table-wrap">

      <table class = "track-table">
        <thead>
            <tr>
                <th class = "col-num">#</th>
                <th class = "col-title">Title</th>
                <th class = "col-artist">Artist</th>
                <th class = "col-duration">Duration</th>
            </tr>
        </thead>

        <tbody>
            
            @foreach ($songs as $index=>$song)
            <tr 
            class = "js-song-row"
            data-id = "{{ $song['id']?? ' ' }}"
            data-title = "{{ $song['title'] }}"
            data-artist = "{{ $song['artist'] }}"
            data-duration = "{{ $song['duration'] ?? '3:30' }}"
            data-genre="{{ $song['genre'] }}">
                <td>{{ $index + 1}}</td>
                <td>{{ $song['title'] }}</td>
                <td>{{ $song['artist'] }}</td>
                <td>{{ $song['duration'] ?? '--:--' }}</td>
            </tr>            
            
@endforeach

@if(count($songs) == 0)
            <tr>
                <td colspan = "4"
          class = "text-center">
            No songs found

         </td>
            </tr>
@endif
        </tbody>

      </table>

    </div>

  </section>

  {{--Matching Playlists--}}

  <section>

  <div class = "sg-section__header">
    <h2 class = "sg-section__title">Matching Playlists</h2>
  </div>

  <div class = "playlist-cards-grid--compact">

  {{-- Playlist 1 --}}
  <div class = "playlist-card">

  <div class = "playlist-card__art">
    <img src = "{{ asset('images/covers/alan walker cover.jpg') }}" alt = "Alan Walker playlist" class = "playlist-cover">
    
   
    </div>



<div class = "playlist-card__title">Alan Walker Hits</div>
<div class = "playlist-card__meta">5 songs</div>
</div>

{{-- Playlist 2 --}}
<div class = "playlist-card">
    <div class = "playlist-card__art">
        <img src = "{{ asset('images/covers/weeknd cover.jpg') }}" alt = "The Weeknd playlist" class = "playlist-cover">
      
        </div>


<div class = "playlist-card__title">The Weeknd Collection</div>
<div class = "playlist-card__meta">5 songs</div>
</div>

{{-- Playlist 3 --}}
<div class = "playlist-card">
    <div class = "playlist-card__art">
        <img src = "{{ asset('images/covers/mj cover.jpg') }}" alt = "Michael Jackson playlist" class = "playlist-cover">
        
</div>

   <div class = "playlist-card__title">King of Pop</div>
   <div class = "playlist-card__meta">5 songs</div>

</div>

</div>

</section>



@endsection