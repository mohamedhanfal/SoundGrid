<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Playlist extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'description',
        'genre',
        'cover_image',
        'is_featured',
    ];

    protected function casts(): array
    {
        return [
            'is_featured' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

   public function songs(): BelongsToMany
{
    return $this->belongsToMany(Song::class)
        ->withPivot('position')
        ->orderByPivot('position')
        ->orderByPivot('id');
}
}
