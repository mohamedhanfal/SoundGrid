<?php

namespace App\Http\Controllers;

use App\Models\Playlist;
use App\Models\Song;
use Illuminate\Http\Request;
use Illuminate\View\View;

class SearchController extends Controller
{
    public function index(Request $request): View
    {
        $search = trim((string) $request->input('search', ''));

        $songs = Song::query()
            ->when($search !== '', function ($query) use ($search): void {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('artist', 'like', "%{$search}%")
                    ->orWhere('album', 'like', "%{$search}%")
                    ->orWhere('genre', 'like', "%{$search}%");
            })
            ->get();

        $playlists = Playlist::with('user')
            ->withCount('songs')
            ->when($search !== '', function ($query) use ($search): void {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('genre', 'like', "%{$search}%");
            })
            ->get();

        return view('home.search', compact('search', 'songs', 'playlists'));
    }
}
