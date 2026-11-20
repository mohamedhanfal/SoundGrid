<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\PlaylistController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/stream/{song}', [HomeController::class, 'stream'])->name('songs.stream');
Route::get('/playlists', [PlaylistController::class, 'index'])->name('playlists.index');
Route::get('/playlists/{playlist:slug}', [PlaylistController::class, 'show'])->name('playlists.show');

