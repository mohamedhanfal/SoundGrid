const RESTART_THRESHOLD_SECONDS = 5;
const TICK_INTERVAL_MS = 1000;
const DEFAULT_TRACK_DURATION_SEC = 180;
const INITIAL_PLAYBACK_OFFSET_SEC = 45;
const DEFAULT_VOLUME_PERCENT = 65;

export const INITIAL_SONGS = [
  {
    id: 1,
    title: 'Night Changes',
    artist: 'One Direction',
    album: 'Midnight Memories',
    duration: '3:46',
    durationSec: 226,
    category: 'Calm',
    thumbVariant: 'midnight'
  },
  {
    id: 2,
    title: 'Alone',
    artist: 'Alan Walker',
    album: 'Alone',
    duration: '2:40',
    durationSec: 160,
    category: 'Electronic',
    thumbVariant: 'blue'
  },
  {
    id: 3,
    title: 'Treat You Better',
    artist: 'Shawn Mendes',
    album: 'Illuminate',
    duration: '3:07',
    durationSec: 187,
    category: 'Pop',
    thumbVariant: 'purple'
  },
  {
    id: 4,
    title: 'On My Way',
    artist: 'Alan Walker',
    album: 'On My Way',
    duration: '3:13',
    durationSec: 193,
    category: 'Electronic',
    thumbVariant: 'teal'
  },
  {
    id: 5,
    title: 'Starboy',
    artist: 'The Weeknd',
    album: 'Starboy',
    duration: '3:50',
    durationSec: 230,
    category: 'Pop',
    thumbVariant: 'indigo'
  },
  {
    id: 6,
    title: 'Clair de Lune',
    artist: 'Claude Debussy',
    album: 'Suite bergamasque',
    duration: '4:52',
    durationSec: 292,
    category: 'Classical',
    thumbVariant: 'calm'
  },
  {
    id: 7,
    title: 'Weightless',
    artist: 'Marconi Union',
    album: 'Ambient Transmissions',
    duration: '4:18',
    durationSec: 258,
    category: 'Calm',
    thumbVariant: 'blue'
  },
  {
    id: 8,
    title: 'Acoustic Sunrise',
    artist: 'Nora Vance',
    album: 'Morning Dew',
    duration: '3:12',
    durationSec: 192,
    category: 'Acoustic',
    thumbVariant: 'purple'
  }
];

export const INITIAL_PLAYLISTS = [
  {
    id: 'calm-vibes',
    title: 'Calm Vibes',
    creator: 'your username',
    songCountLabel: '28 songs',
    durationLabel: '1h 32m',
    description: 'Soft melodic pop and soothing acoustic tracks for relaxed focus.',
    variant: 'calm',
    songIds: [1, 2, 3, 4, 5]
  },
  {
    id: 'midnight-coding',
    title: 'Midnight Coding',
    creator: 'Mohamed Hanifal',
    songCountLabel: '18 songs',
    durationLabel: '1h 04m',
    description: 'Deep electronic beats and ambient synth tracks for late work.',
    variant: 'indigo',
    songIds: [2, 4, 5, 7, 1]
  },
  {
    id: 'acoustic-mornings',
    title: 'Acoustic Mornings',
    creator: 'Nethmini',
    songCountLabel: '15 songs',
    durationLabel: '52m',
    description: 'Warm guitar melodies and quiet vocals for a calm morning.',
    variant: 'teal',
    songIds: [8, 1, 3, 6]
  },
  {
    id: 'pop-essentials',
    title: 'Pop Essentials',
    creator: 'Osadi',
    songCountLabel: '24 songs',
    durationLabel: '1h 21m',
    description: 'Popular radio singles and upbeat hooks.',
    variant: 'purple',
    songIds: [3, 5, 1, 4]
  },
  {
    id: 'classical-focus',
    title: 'Classical Focus',
    creator: 'Vidhura',
    songCountLabel: '20 songs',
    durationLabel: '1h 18m',
    description: 'Piano and orchestral works for reading and study.',
    variant: 'blue',
    songIds: [6, 7, 8, 1]
  }
];

export const CATEGORIES = [
  { name: 'All', count: '120+ tracks', bg: '#eef4ff' },
  { name: 'Calm', count: '28 tracks', bg: '#e6f0ff' },
  { name: 'Pop', count: '42 tracks', bg: '#f1ebff' },
  { name: 'Electronic', count: '34 tracks', bg: '#e6f7f5' },
  { name: 'Classical', count: '19 tracks', bg: '#eef0ff' },
  { name: 'Acoustic', count: '23 tracks', bg: '#fff1f2' }
];

class Store {
  constructor() {
    this.state = {
      currentPage: 'playlist-details',
      activePlaylistId: 'calm-vibes',
      searchQuery: '',
      selectedCategory: 'All',
      authMode: 'login',
      user: {
        name: 'your username',
        fullName: 'Mohamed Hanifal',
        initials: 'IS',
        email: 'hanifal@soundgrid.io'
      },
      songs: [...INITIAL_SONGS],
      playlists: [...INITIAL_PLAYLISTS],
      player: {
        currentSongId: 1,
        isPlaying: false,
        currentTime: INITIAL_PLAYBACK_OFFSET_SEC,
        volume: DEFAULT_VOLUME_PERCENT,
        isMuted: false,
        isShuffle: false,
        isRepeat: false
      }
    };

    this.listeners = new Set();
    this.timer = null;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify(reason = 'update') {
    this.listeners.forEach((listener) => listener(this.state, reason));
  }

  navigate(page, options = {}) {
    this.state.currentPage = page;
    if (options.playlistId) this.state.activePlaylistId = options.playlistId;
    if (options.authMode) this.state.authMode = options.authMode;
    this.notify('route');
  }

  setSearchQuery(query) {
    this.state.searchQuery = query;
    this.notify('search');
  }

  setCategory(category) {
    this.state.selectedCategory = category;
    this.notify('search');
  }

  get currentSong() {
    return (
      this.state.songs.find((song) => song.id === this.state.player.currentSongId) ||
      this.state.songs[0]
    );
  }

  get activePlaylist() {
    return (
      this.state.playlists.find((playlist) => playlist.id === this.state.activePlaylistId) ||
      this.state.playlists[0]
    );
  }

  playSong(songId) {
    if (this.state.player.currentSongId === songId) {
      this.togglePlay();
      return;
    }
    this.state.player.currentSongId = songId;
    this.state.player.currentTime = 0;
    this.state.player.isPlaying = true;
    this.startPlaybackLoop();
    this.notify('player');
  }

  togglePlay() {
    this.state.player.isPlaying = !this.state.player.isPlaying;
    if (this.state.player.isPlaying) {
      this.startPlaybackLoop();
    } else {
      this.stopPlaybackLoop();
    }
    this.notify('player');
  }

  nextSong() {
    const playlist = this.activePlaylist;
    const queueIds = playlist ? playlist.songIds : this.state.songs.map((song) => song.id);
    const currentIndex = queueIds.indexOf(this.state.player.currentSongId);

    const nextId = this.state.player.isShuffle
      ? queueIds[Math.floor(Math.random() * queueIds.length)]
      : queueIds[(currentIndex + 1) % queueIds.length] || this.state.songs[0].id;

    this.state.player.currentSongId = nextId;
    this.state.player.currentTime = 0;
    this.state.player.isPlaying = true;
    this.startPlaybackLoop();
    this.notify('player');
  }

  prevSong() {
    // Standard media player behavior: pressing previous after 5 seconds restarts the current song
    if (this.state.player.currentTime > RESTART_THRESHOLD_SECONDS) {
      this.state.player.currentTime = 0;
      this.notify('player-tick');
      return;
    }
    const playlist = this.activePlaylist;
    const queueIds = playlist ? playlist.songIds : this.state.songs.map((song) => song.id);
    const currentIndex = queueIds.indexOf(this.state.player.currentSongId);
    const prevIndex = (currentIndex - 1 + queueIds.length) % queueIds.length;

    this.state.player.currentSongId = queueIds[prevIndex] || this.state.songs[0].id;
    this.state.player.currentTime = 0;
    this.state.player.isPlaying = true;
    this.startPlaybackLoop();
    this.notify('player');
  }

  seekToPercent(percent) {
    const song = this.currentSong;
    this.state.player.currentTime = Math.round((percent / 100) * song.durationSec);
    this.notify('player-tick');
  }

  setVolume(volume) {
    this.state.player.volume = Math.max(0, Math.min(100, volume));
    this.state.player.isMuted = this.state.player.volume === 0;
    this.notify('player-volume');
  }

  toggleMute() {
    this.state.player.isMuted = !this.state.player.isMuted;
    this.notify('player-volume');
  }

  toggleShuffle() {
    this.state.player.isShuffle = !this.state.player.isShuffle;
    this.notify('player');
  }

  toggleRepeat() {
    this.state.player.isRepeat = !this.state.player.isRepeat;
    this.notify('player');
  }

  createPlaylist({ title, description, songIds }) {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const id = `${slug}-${Date.now().toString().slice(-3)}`;
    const selectedIds = songIds.length ? songIds : [1, 2, 3];
    const totalSeconds = selectedIds.reduce((sum, songId) => {
      const match = this.state.songs.find((song) => song.id === songId);
      return sum + (match ? match.durationSec : DEFAULT_TRACK_DURATION_SEC);
    }, 0);
    const minutes = Math.max(1, Math.round(totalSeconds / 60));

    const newPlaylist = {
      id,
      title: title || 'Untitled Playlist',
      creator: this.state.user.name,
      songCountLabel: `${selectedIds.length} songs`,
      durationLabel: `${minutes}m`,
      description: description || 'Personal playlist created on SoundGrid.',
      variant: 'calm',
      songIds: selectedIds
    };

    this.state.playlists.unshift(newPlaylist);
    this.state.activePlaylistId = newPlaylist.id;
    this.state.currentPage = 'playlist-details';
    this.notify('route');
  }

  addSampleTrackToActivePlaylist() {
    const playlist = this.activePlaylist;
    if (!playlist) return;
    const nextUnaddedSong = this.state.songs.find((song) => !playlist.songIds.includes(song.id));
    if (nextUnaddedSong) {
      playlist.songIds.push(nextUnaddedSong.id);
      playlist.songCountLabel = `${playlist.songIds.length} songs`;
      this.notify('route');
    }
  }

  startPlaybackLoop() {
    this.stopPlaybackLoop();
    this.timer = setInterval(() => {
      const song = this.currentSong;
      if (this.state.player.currentTime < song.durationSec) {
        this.state.player.currentTime += 1;
        this.notify('player-tick');
      } else if (this.state.player.isRepeat) {
        this.state.player.currentTime = 0;
        this.notify('player-tick');
      } else {
        this.nextSong();
      }
    }, TICK_INTERVAL_MS);
  }

  stopPlaybackLoop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}

export const store = new Store();

export function formatSeconds(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}
