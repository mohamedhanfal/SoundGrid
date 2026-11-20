<?php

namespace App\Http\Controllers;

use App\Models\Playlist;
use App\Models\Song;
use Illuminate\Http\Request;
use Illuminate\View\View;
use Symfony\Component\HttpFoundation\StreamedResponse;

class HomeController extends Controller
{
    public function index(): View
    {
        $featuredPlaylist = Playlist::with(['user', 'songs'])
            ->withCount('songs')
            ->where('is_featured', true)
            ->first();

        $playlists = Playlist::with(['user', 'songs'])
            ->withCount('songs')
            ->get();

        $recentSongs = Song::take(5)->get();

        $mapSong = fn (Song $song): array => [
            'title' => $song->title,
            'artist' => $song->artist,
            'album' => $song->album,
            'duration' => $song->duration,
            'cover' => $song->cover_image ? asset($song->cover_image) : '',
            'audio' => $song->audio_path ? route('songs.stream', $song) : '',
        ];

        $homeData = [
            'recent' => $recentSongs->map($mapSong)->values(),
            'playlists' => $playlists->mapWithKeys(fn (Playlist $playlist): array => [
                $playlist->slug => [
                    'title' => $playlist->title,
                    'tracks' => $playlist->songs->map($mapSong)->values(),
                ],
            ]),
        ];

        return view('home.index', compact('featuredPlaylist', 'playlists', 'recentSongs', 'homeData'));
    }

    public function stream(Request $request, Song $song): StreamedResponse
    {
        $path = $song->audio_path ? public_path($song->audio_path) : '';
        abort_unless($path !== '' && file_exists($path), 404);

        $size = filesize($path);
        $start = 0;
        $end = $size - 1;
        $status = 200;
        $chunkLimit = 2097152;

        $headers = [
            'Content-Type' => 'audio/mpeg',
            'Accept-Ranges' => 'bytes',
            'Content-Disposition' => 'inline',
            'Cache-Control' => 'no-cache',
        ];

        $range = $request->header('Range');
        if ($range && preg_match('/bytes=(\d+)-(\d*)/', $range, $matches)) {
            $start = (int) $matches[1];
            if ($matches[2] !== '') {
                $end = min($size - 1, (int) $matches[2]);
            } else {
                $end = min($size - 1, $start + $chunkLimit - 1);
            }

            if ($start <= $end && $start < $size) {
                $status = 206;
                $headers['Content-Range'] = "bytes {$start}-{$end}/{$size}";
            } else {
                $start = 0;
                $end = $size - 1;
            }
        }

        $length = $end - $start + 1;
        $headers['Content-Length'] = (string) $length;

        return response()->stream(function () use ($path, $start, $length): void {
            $handle = fopen($path, 'rb');
            if (! $handle) {
                return;
            }
            if ($start > 0) {
                fseek($handle, $start);
            }
            $remaining = $length;
            while ($remaining > 0 && ! feof($handle)) {
                $buffer = fread($handle, min(65536, $remaining));
                if ($buffer === false || $buffer === '') {
                    break;
                }
                echo $buffer;
                $remaining -= strlen($buffer);
                flush();
            }
            fclose($handle);
        }, $status, $headers);
    }
}
