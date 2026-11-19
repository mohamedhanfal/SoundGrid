<?php

namespace App\Http\Controllers;

use App\Models\Playlist;
use App\Models\Song;
use Illuminate\View\View;

class HomeController extends Controller
{
    public function index(): View
    {
        $featuredPlaylist = Playlist::with('user')
            ->withCount('songs')
            ->where('is_featured', true)
            ->first();

        $playlists = Playlist::with('user')
            ->withCount('songs')
            ->get();

        $recentSongs = Song::take(5)->get();

        return view('home.index', compact('featuredPlaylist', 'playlists', 'recentSongs'));
    }
}
