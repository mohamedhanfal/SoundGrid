<?php

use App\Http\Controllers\CreatePlaylistController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PlaylistController;
use App\Http\Controllers\SearchController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/search', [SearchController::class, 'index'])->name('search');
Route::get('/stream/{song}', [HomeController::class, 'stream'])->name('songs.stream');
Route::get('/playlists', [PlaylistController::class, 'index'])->name('playlists.index');
Route::get('/playlists/{playlist:slug}', [PlaylistController::class, 'show'])->name('playlists.show');
Route::get('/create-playlist', [CreatePlaylistController::class, 'create'])->name('create-playlist');
Route::post('/create-playlist', [CreatePlaylistController::class, 'store'])->name('create-playlist.store');
