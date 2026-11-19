<?php

namespace Database\Seeders;

use App\Models\Playlist;
use App\Models\Song;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $password = Hash::make('123');

        $sk = User::create([
            'name' => 'SK',
            'email' => 'sk@gmail.com',
            'password' => $password,
        ]);

        $hanfal = User::create([
            'name' => 'Mohamed hanfal',
            'email' => 'hanfal@gmail.com',
            'password' => $password,
        ]);

        $vidura = User::create([
            'name' => 'Vidura',
            'email' => 'vidura@gmail.com',
            'password' => $password,
        ]);

        $nethmini = User::create([
            'name' => 'Nethmini',
            'email' => 'nethmini@gmail.com',
            'password' => $password,
        ]);

        $osadi = User::create([
            'name' => 'Osadi',
            'email' => 'osadi@gmail.com',
            'password' => $password,
        ]);

        $faded = Song::create([
            'title' => 'Faded',
            'artist' => 'Alan Walker',
            'album' => 'Different World',
            'genre' => 'Electronic / EDM',
            'duration' => '3:32',
            'cover_image' => 'images/covers/alan walker cover.jpg',
        ]);

        $blindingLights = Song::create([
            'title' => 'Blinding Lights',
            'artist' => 'The Weeknd',
            'album' => 'After Hours',
            'genre' => 'Pop / R&B',
            'duration' => '3:20',
            'cover_image' => 'images/covers/weeknd cover.jpg',
        ]);

        $billieJean = Song::create([
            'title' => 'Billie Jean',
            'artist' => 'Michael Jackson',
            'album' => 'Thriller',
            'genre' => 'Classics / Funk',
            'duration' => '4:54',
            'cover_image' => 'images/covers/mj cover.jpg',
        ]);

        $unity = Song::create([
            'title' => 'Unity',
            'artist' => 'TheFatRat',
            'album' => 'Unity',
            'genre' => 'Gaming Anthems',
            'duration' => '4:09',
            'cover_image' => 'images/covers/thefatrat cover.jpg',
        ]);

        $srivalli = Song::create([
            'title' => 'Srivalli',
            'artist' => 'Sid Sriram',
            'album' => 'Pushpa: The Rise',
            'genre' => 'Soulful / Melodic',
            'duration' => '3:41',
            'cover_image' => 'images/covers/sid cover.jpg',
        ]);

        $alanWalkerTracks = [
            $faded->id,
            Song::create([
                'title' => 'Alone',
                'artist' => 'Alan Walker',
                'album' => 'Alone',
                'genre' => 'Electronic / EDM',
                'duration' => '2:40',
                'cover_image' => 'images/covers/alan walker cover.jpg',
            ])->id,
            Song::create([
                'title' => 'On My Way',
                'artist' => 'Alan Walker, Sabrina Carpenter',
                'album' => 'World of Walker',
                'genre' => 'Electronic / EDM',
                'duration' => '3:13',
                'cover_image' => 'images/covers/alan walker cover.jpg',
            ])->id,
            Song::create([
                'title' => 'The Spectre',
                'artist' => 'Alan Walker',
                'album' => 'The Spectre',
                'genre' => 'Electronic / EDM',
                'duration' => '3:13',
                'cover_image' => 'images/covers/alan walker cover.jpg',
            ])->id,
            Song::create([
                'title' => 'Darkside',
                'artist' => 'Alan Walker ft. Au/Ra',
                'album' => 'Different World',
                'genre' => 'Electronic / EDM',
                'duration' => '3:31',
                'cover_image' => 'images/covers/alan walker cover.jpg',
            ])->id,
        ];

        $weekndTracks = [
            $blindingLights->id,
            Song::create([
                'title' => 'Starboy',
                'artist' => 'The Weeknd ft. Daft Punk',
                'album' => 'Starboy',
                'genre' => 'Pop / R&B',
                'duration' => '3:50',
                'cover_image' => 'images/covers/weeknd cover.jpg',
            ])->id,
            Song::create([
                'title' => 'Save Your Tears',
                'artist' => 'The Weeknd',
                'album' => 'After Hours',
                'genre' => 'Pop / R&B',
                'duration' => '3:35',
                'cover_image' => 'images/covers/weeknd cover.jpg',
            ])->id,
            Song::create([
                'title' => 'The Hills',
                'artist' => 'The Weeknd',
                'album' => 'Beauty Behind the Madness',
                'genre' => 'Pop / R&B',
                'duration' => '4:02',
                'cover_image' => 'images/covers/weeknd cover.jpg',
            ])->id,
            Song::create([
                'title' => 'Die For You',
                'artist' => 'The Weeknd',
                'album' => 'Starboy',
                'genre' => 'Pop / R&B',
                'duration' => '4:20',
                'cover_image' => 'images/covers/weeknd cover.jpg',
            ])->id,
        ];

        $mjTracks = [
            $billieJean->id,
            Song::create([
                'title' => 'Beat It',
                'artist' => 'Michael Jackson',
                'album' => 'Thriller',
                'genre' => 'Classics / Funk',
                'duration' => '4:18',
                'cover_image' => 'images/covers/mj cover.jpg',
            ])->id,
            Song::create([
                'title' => 'Smooth Criminal',
                'artist' => 'Michael Jackson',
                'album' => 'Bad',
                'genre' => 'Classics / Funk',
                'duration' => '4:17',
                'cover_image' => 'images/covers/mj cover.jpg',
            ])->id,
            Song::create([
                'title' => 'Thriller',
                'artist' => 'Michael Jackson',
                'album' => 'Thriller',
                'genre' => 'Classics / Funk',
                'duration' => '5:57',
                'cover_image' => 'images/covers/mj cover.jpg',
            ])->id,
            Song::create([
                'title' => 'Man in the Mirror',
                'artist' => 'Michael Jackson',
                'album' => 'Bad',
                'genre' => 'Classics / Funk',
                'duration' => '5:19',
                'cover_image' => 'images/covers/mj cover.jpg',
            ])->id,
        ];

        $fatratTracks = [
            $unity->id,
            Song::create([
                'title' => 'Monody',
                'artist' => 'TheFatRat ft. Laura Brehm',
                'album' => 'Monody',
                'genre' => 'Gaming Anthems',
                'duration' => '4:50',
                'cover_image' => 'images/covers/thefatrat cover.jpg',
            ])->id,
            Song::create([
                'title' => 'Fly Away',
                'artist' => 'TheFatRat ft. Anjulie',
                'album' => 'Fly Away',
                'genre' => 'Gaming Anthems',
                'duration' => '3:14',
                'cover_image' => 'images/covers/thefatrat cover.jpg',
            ])->id,
            Song::create([
                'title' => 'The Calling',
                'artist' => 'TheFatRat ft. Laura Brehm',
                'album' => 'The Calling',
                'genre' => 'Gaming Anthems',
                'duration' => '3:55',
                'cover_image' => 'images/covers/thefatrat cover.jpg',
            ])->id,
            Song::create([
                'title' => 'Xenogenesis',
                'artist' => 'TheFatRat',
                'album' => 'Xenogenesis',
                'genre' => 'Gaming Anthems',
                'duration' => '3:53',
                'cover_image' => 'images/covers/thefatrat cover.jpg',
            ])->id,
        ];

        $sidTracks = [
            $srivalli->id,
            Song::create([
                'title' => 'Kadhaippoma',
                'artist' => 'Sid Sriram',
                'album' => 'Oh My Kadavule',
                'genre' => 'Soulful / Melodic',
                'duration' => '4:18',
                'cover_image' => 'images/covers/sid cover.jpg',
            ])->id,
            Song::create([
                'title' => 'Samajavaragamana',
                'artist' => 'Sid Sriram',
                'album' => 'Ala Vaikunthapurramuloo',
                'genre' => 'Soulful / Melodic',
                'duration' => '3:44',
                'cover_image' => 'images/covers/sid cover.jpg',
            ])->id,
            Song::create([
                'title' => 'Inkem Inkem',
                'artist' => 'Sid Sriram',
                'album' => 'Geetha Govindam',
                'genre' => 'Soulful / Melodic',
                'duration' => '4:27',
                'cover_image' => 'images/covers/sid cover.jpg',
            ])->id,
            Song::create([
                'title' => 'Ennodu Nee Irundhaal',
                'artist' => 'Sid Sriram, Sunitha Sarathy',
                'album' => 'I',
                'genre' => 'Soulful / Melodic',
                'duration' => '5:52',
                'cover_image' => 'images/covers/sid cover.jpg',
            ])->id,
        ];

        $alanWalkerPlaylist = Playlist::create([
            'user_id' => $sk->id,
            'title' => 'Alan Walker Hits',
            'slug' => 'alan-walker',
            'description' => 'Signature electronic melodies, driving beats, and cinematic synth anthems featuring Faded, Alone, and On My Way.',
            'genre' => 'Electronic / EDM',
            'cover_image' => 'images/covers/alan walker cover.jpg',
            'is_featured' => true,
        ]);
        $alanWalkerPlaylist->songs()->attach($alanWalkerTracks);

        $weekndPlaylist = Playlist::create([
            'user_id' => $hanfal->id,
            'title' => 'The Weeknd Collection',
            'slug' => 'the-weeknd',
            'description' => 'Synth-pop hits and late-night R&B favorites by The Weeknd.',
            'genre' => 'Pop / R&B',
            'cover_image' => 'images/covers/weeknd cover.jpg',
            'is_featured' => false,
        ]);
        $weekndPlaylist->songs()->attach($weekndTracks);

        $mjPlaylist = Playlist::create([
            'user_id' => $vidura->id,
            'title' => 'King of Pop: Michael Jackson',
            'slug' => 'michael-jackson',
            'description' => 'Timeless pop, dance, and funk classics from Michael Jackson.',
            'genre' => 'Classics / Funk',
            'cover_image' => 'images/covers/mj cover.jpg',
            'is_featured' => false,
        ]);
        $mjPlaylist->songs()->attach($mjTracks);

        $fatratPlaylist = Playlist::create([
            'user_id' => $nethmini->id,
            'title' => 'TheFatRat Gaming Anthems',
            'slug' => 'thefatrat',
            'description' => 'High-energy electronic gaming anthems by TheFatRat.',
            'genre' => 'Gaming Anthems',
            'cover_image' => 'images/covers/thefatrat cover.jpg',
            'is_featured' => false,
        ]);
        $fatratPlaylist->songs()->attach($fatratTracks);

        $sidPlaylist = Playlist::create([
            'user_id' => $osadi->id,
            'title' => 'Sid Sriram Essentials',
            'slug' => 'sid-sriram',
            'description' => 'Soulful and melodic tracks performed by Sid Sriram.',
            'genre' => 'Soulful / Melodic',
            'cover_image' => 'images/covers/sid cover.jpg',
            'is_featured' => false,
        ]);
        $sidPlaylist->songs()->attach($sidTracks);
    }
}
