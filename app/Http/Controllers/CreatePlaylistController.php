<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CreatePlaylistController extends Controller
{
     public function create()
    {
        return view('home.create-playlist');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'nullable',
            'cover' => 'nullable|image',
            'songs' => 'nullable|array',
        ]);

        return back()->with('success', 'Playlist created successfully!');
    }
}
