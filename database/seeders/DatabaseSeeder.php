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
        $password = Hash::make('password123');

        $sk = User::create([
            'name' => 'SK',
            'email' => 'sk@soundgrid.io',
            'password' => $password,
        ]);

        $hanfal = User::create([
            'name' => 'Mohamed hanfal',
            'email' => 'hanfal@soundgrid.io',
            'password' => $password,
        ]);

        $vidura = User::create([
            'name' => 'Vidura',
            'email' => 'vidura@soundgrid.io',
            'password' => $password,
        ]);

        $nethmini = User::create([
            'name' => 'Nethmini',
            'email' => 'nethmini@soundgrid.io',
            'password' => $password,
        ]);

        $osadi = User::create([
            'name' => 'Osadi',
            'email' => 'osadi@soundgrid.io',
            'password' => $password,
        ]);

        $faded = Song::create([
            'title' => 'Faded',
            'artist' => 'Alan Walker',
            'album' => 'Different World',
            'genre' => 'Electronic / EDM',
            'duration' => '3:32',
            'cover_image' => 'audio/thumbnail/alan_walker_faded_thumbnail.jpg',
            'audio_path' => 'audio/alan_walker_faded.mp3',
        ]);

        $blindingLights = Song::create([
            'title' => 'Blinding Lights',
            'artist' => 'The Weeknd',
            'album' => 'After Hours',
            'genre' => 'Pop / R&B',
            'duration' => '3:20',
            'cover_image' => 'audio/thumbnail/the_weeknd_blinding_lights_thumbnail.jpg',
            'audio_path' => 'audio/the_weeknd_blinding_lights.mp3',
        ]);

        $billieJean = Song::create([
            'title' => 'Billie Jean',
            'artist' => 'Michael Jackson',
            'album' => 'Thriller',
            'genre' => 'Classics / Funk',
            'duration' => '4:54',
            'cover_image' => 'audio/thumbnail/michael_jackson_billie_jean_thumbnail.jpg',
            'audio_path' => 'audio/michael_jackson_billie_jean.mp3',
        ]);

        $unity = Song::create([
            'title' => 'Unity',
            'artist' => 'TheFatRat',
            'album' => 'Unity',
            'genre' => 'Gaming Anthems',
            'duration' => '4:09',
            'cover_image' => 'audio/thumbnail/thefatrat_unity_thumbnail.jpg',
            'audio_path' => 'audio/thefatrat_unity.mp3',
        ]);

        $srivalli = Song::create([
            'title' => 'Srivalli',
            'artist' => 'Sid Sriram',
            'album' => 'Pushpa: The Rise',
            'genre' => 'Soulful / Melodic',
            'duration' => '3:41',
            'cover_image' => 'audio/thumbnail/sid_sriram_srivalli_thumbnail.jpg',
            'audio_path' => 'audio/sid_sriram_srivalli.mp3',
        ]);

        $alanWalkerTracks = [
            $faded->id,
            Song::create([
                'title' => 'Alone',
                'artist' => 'Alan Walker',
                'album' => 'Alone',
                'genre' => 'Electronic / EDM',
                'duration' => '2:40',
                'cover_image' => 'audio/thumbnail/alan_walker_alone_thumbnail.jpg',
                'audio_path' => 'audio/alan_walker_alone.mp3',
            ])->id,
            Song::create([
                'title' => 'On My Way',
                'artist' => 'Alan Walker, Sabrina Carpenter',
                'album' => 'World of Walker',
                'genre' => 'Electronic / EDM',
                'duration' => '3:13',
                'cover_image' => 'audio/thumbnail/alan_walker_on_my_way_thumbnail.jpg',
                'audio_path' => 'audio/alan_walker_on_my_way.mp3',
            ])->id,
            Song::create([
                'title' => 'The Spectre',
                'artist' => 'Alan Walker',
                'album' => 'The Spectre',
                'genre' => 'Electronic / EDM',
                'duration' => '3:13',
                'cover_image' => 'audio/thumbnail/alan_walker_the_spectre_thumbnail.jpg',
                'audio_path' => 'audio/alan_walker_the_spectre.mp3',
            ])->id,
            Song::create([
                'title' => 'Darkside',
                'artist' => 'Alan Walker ft. Au/Ra',
                'album' => 'Different World',
                'genre' => 'Electronic / EDM',
                'duration' => '3:31',
                'cover_image' => 'audio/thumbnail/alan_walker_darkside_thumbnail.jpg',
                'audio_path' => 'audio/alan_walker_darkside.mp3',
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
                'cover_image' => 'audio/thumbnail/the_weeknd_starboy_thumbnail.jpg',
                'audio_path' => 'audio/the_weeknd_starboy.mp3',
            ])->id,
            Song::create([
                'title' => 'Save Your Tears',
                'artist' => 'The Weeknd',
                'album' => 'After Hours',
                'genre' => 'Pop / R&B',
                'duration' => '3:35',
                'cover_image' => 'audio/thumbnail/the_weeknd_save_your_tears_thumbnail.jpg',
                'audio_path' => 'audio/the_weeknd_save_your_tears.mp3',
            ])->id,
            Song::create([
                'title' => 'The Hills',
                'artist' => 'The Weeknd',
                'album' => 'Beauty Behind the Madness',
                'genre' => 'Pop / R&B',
                'duration' => '4:02',
                'cover_image' => 'audio/thumbnail/the_weeknd_the_hills_thumbnail.jpg',
                'audio_path' => 'audio/the_weeknd_the_hills.mp3',
            ])->id,
            Song::create([
                'title' => 'Die For You',
                'artist' => 'The Weeknd',
                'album' => 'Starboy',
                'genre' => 'Pop / R&B',
                'duration' => '4:20',
                'cover_image' => 'audio/thumbnail/the_weeknd_die_for_you_thumbnail.jpg',
                'audio_path' => 'audio/the_weeknd_die_for_you.mp3',
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
                'cover_image' => 'audio/thumbnail/michael_jackson_beat_it_thumbnail.jpg',
                'audio_path' => 'audio/michael_jackson_beat_it.mp3',
            ])->id,
            Song::create([
                'title' => 'Smooth Criminal',
                'artist' => 'Michael Jackson',
                'album' => 'Bad',
                'genre' => 'Classics / Funk',
                'duration' => '4:17',
                'cover_image' => 'audio/thumbnail/michael_jackson_smooth_criminal_thumbnail.jpg',
                'audio_path' => 'audio/michael_jackson_smooth_criminal.mp3',
            ])->id,
            Song::create([
                'title' => 'Thriller',
                'artist' => 'Michael Jackson',
                'album' => 'Thriller',
                'genre' => 'Classics / Funk',
                'duration' => '5:57',
                'cover_image' => 'audio/thumbnail/michael_jackson_thriller_thumbnail.jpg',
                'audio_path' => 'audio/michael_jackson_thriller.mp3',
            ])->id,
            Song::create([
                'title' => 'Man in the Mirror',
                'artist' => 'Michael Jackson',
                'album' => 'Bad',
                'genre' => 'Classics / Funk',
                'duration' => '5:19',
                'cover_image' => 'audio/thumbnail/michael_jackson_man_in_the_mirror_thumbnail.jpg',
                'audio_path' => 'audio/michael_jackson_man_in_the_mirror.mp3',
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
                'cover_image' => 'audio/thumbnail/thefatrat_monody_thumbnail.jpg',
                'audio_path' => 'audio/thefatrat_monody.mp3',
            ])->id,
            Song::create([
                'title' => 'Fly Away',
                'artist' => 'TheFatRat ft. Anjulie',
                'album' => 'Fly Away',
                'genre' => 'Gaming Anthems',
                'duration' => '3:14',
                'cover_image' => 'audio/thumbnail/thefatrat_fly_away_thumbnail.jpg',
                'audio_path' => 'audio/thefatrat_fly_away.mp3',
            ])->id,
            Song::create([
                'title' => 'The Calling',
                'artist' => 'TheFatRat ft. Laura Brehm',
                'album' => 'The Calling',
                'genre' => 'Gaming Anthems',
                'duration' => '3:55',
                'cover_image' => 'audio/thumbnail/thefatrat_the_calling_thumbnail.jpg',
                'audio_path' => 'audio/thefatrat_the_calling.mp3',
            ])->id,
            Song::create([
                'title' => 'Xenogenesis',
                'artist' => 'TheFatRat',
                'album' => 'Xenogenesis',
                'genre' => 'Gaming Anthems',
                'duration' => '3:53',
                'cover_image' => 'audio/thumbnail/thefatrat_xenogenesis_thumbnail.jpg',
                'audio_path' => 'audio/thefatrat_xenogenesis.mp3',
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
                'cover_image' => 'audio/thumbnail/sid_sriram_kadhaippoma_thumbnail.jpg',
                'audio_path' => 'audio/sid_sriram_kadhaippoma.mp3',
            ])->id,
            Song::create([
                'title' => 'Samajavaragamana',
                'artist' => 'Sid Sriram',
                'album' => 'Ala Vaikunthapurramuloo',
                'genre' => 'Soulful / Melodic',
                'duration' => '3:44',
                'cover_image' => 'audio/thumbnail/sid_sriram_samajavaragamana_thumbnail.jpg',
                'audio_path' => 'audio/sid_sriram_samajavaragamana.mp3',
            ])->id,
            Song::create([
                'title' => 'Inkem Inkem',
                'artist' => 'Sid Sriram',
                'album' => 'Geetha Govindam',
                'genre' => 'Soulful / Melodic',
                'duration' => '4:27',
                'cover_image' => 'audio/thumbnail/sid_sriram_inkem_inkem_thumbnail.jpg',
                'audio_path' => 'audio/sid_sriram_inkem_inkem.mp3',
            ])->id,
            Song::create([
                'title' => 'Ennodu Nee Irundhaal',
                'artist' => 'Sid Sriram, Sunitha Sarathy',
                'album' => 'I',
                'genre' => 'Soulful / Melodic',
                'duration' => '5:52',
                'cover_image' => 'audio/thumbnail/sid_sriram_ennodu_nee_irundhaal_thumbnail.jpg',
                'audio_path' => 'audio/sid_sriram_ennodu_nee_irundhaal.mp3',
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
