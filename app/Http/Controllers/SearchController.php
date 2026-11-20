<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SearchController extends Controller
{

   public function index(Request $request){

      $search = $request->input('search');
      
      $songs = [
    [
        'title' => 'Faded',
        'artist' => 'Alan Walker',
        'duration' => '03:32',
        'genre' => 'Electronic / EDM'
    ],
    [
        'title' => 'Blinding Lights',
        'artist' => 'The Weeknd',
        'duration' => '03:20',
        'genre' => 'Pop / R&B'
    ],
    [
        'title' => 'Billie Jean',
        'artist' => 'Michael Jackson',
        'duration' => '04:54',
        'genre' => 'Classical'
    ],
    [
        'title' => 'Unity',
        'artist' => 'TheFatRat',
        'duration' => '04:11',
        'genre' => 'Gaming Anthems'
    ],
    [
        'title' => 'Srivalli',
        'artist' => 'Sid Sriram',
        'duration' => '03:45',
        'genre' => 'Soulful / Melodic'
    ],
];


      $results = [];

      foreach ($songs as $song) {
         if(
          $search == ''|| 
          stripos($song['title'], $search) !== false ||
          stripos($song['artist'], $search) !== false
         ){
          $results[] = $song;
         }
         }
        
         return view('home.search',[
          'search'=>$search, 
         'songs'=>$results
         ]);
      }
      
   
}
