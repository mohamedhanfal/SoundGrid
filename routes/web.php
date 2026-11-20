
<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\CreatePlaylistController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/search', [SearchController::class, 'index'])->name('search');

Route::get('/stream/{song}', [HomeController::class, 'stream'])->name('songs.stream');

Route::get('/create-playlist', [CreatePlaylistController::class, 'create'])->name('create-playlist');

Route::post('/create-playlist', [CreatePlaylistController::class, 'store'])->name('create-playlist.store');
