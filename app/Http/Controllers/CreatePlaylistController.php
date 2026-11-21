<?php

namespace App\Http\Controllers;

use App\Models\Playlist;
use App\Models\Song;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\View\View;

class CreatePlaylistController extends Controller
{
    public function create(): View
    {
        $songs = Song::all();

        return view('home.create-playlist', compact('songs'));
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'cover' => ['nullable', 'image', 'max:5120'],
            'songs' => ['nullable', 'array'],
            'songs.*' => ['integer', 'exists:songs,id'],
        ]);

        $coverPath = 'images/covers/alan walker cover.jpg';
        if ($request->hasFile('cover')) {
            $file = $request->file('cover');
            $filename = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('images/covers'), $filename);
            $coverPath = 'images/covers/' . $filename;
        }

        $baseSlug = Str::slug($validated['name']) ?: 'playlist';
        $slug = $baseSlug;
        $counter = 1;
        while (Playlist::where('slug', $slug)->exists()) {
            $slug = $baseSlug . '-' . $counter;
            $counter++;
        }

        $defaultUser = User::where('email', 'hanfal@soundgrid.io')->first() ?? User::first();

        $playlist = Playlist::create([
            'user_id' => $defaultUser?->id,
            'title' => $validated['name'],
            'slug' => $slug,
            'description' => $validated['description'] ?? null,
            'genre' => 'Custom Mix',
            'cover_image' => $coverPath,
            'is_featured' => false,
        ]);

        if (! empty($validated['songs'])) {
            $attachments = [];
            foreach (array_values($validated['songs']) as $index => $songId) {
                $attachments[$songId] = ['position' => $index + 1];
            }
            $playlist->songs()->attach($attachments);
        }

        return redirect()->route('playlists.show', $playlist->slug);
    }
}
