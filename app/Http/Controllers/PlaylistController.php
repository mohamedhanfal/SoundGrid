<?php

namespace App\Http\Controllers;

use App\Models\Playlist;
use Illuminate\View\View;

class PlaylistController extends Controller
{
    public function index(): View
    {
        $playlists = Playlist::with(['user', 'songs'])
            ->withCount('songs')
            ->latest()
            ->get();

        return view('playlists.index', compact('playlists'));
    }
    public function show(Playlist $playlist): View
{
    $playlist->load(['user', 'songs']);

    return view('playlists.show', compact('playlist'));
}
public function removeSong(Playlist $playlist, int $songId): \Illuminate\Http\RedirectResponse
{
    $playlist->songs()->detach($songId);

    return redirect()
        ->route('playlists.show', $playlist->slug)
        ->with('success', 'Song removed from playlist successfully.');
}
}
