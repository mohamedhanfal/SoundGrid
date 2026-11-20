<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Song extends Model
{
    protected $fillable = [
        'title',
        'artist',
        'album',
        'genre',
        'duration',
        'cover_image',
        'audio_path',
    ];

    public function playlists(): BelongsToMany
    {
        return $this->belongsToMany(Playlist::class);
    }
}
