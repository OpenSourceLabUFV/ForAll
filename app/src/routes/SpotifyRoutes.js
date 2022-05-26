const baseURL = 'https://api.spotify.com/';
const SpotifyRoutes = {
	authorization: 'https://accounts.spotify.com/authorize',
	token: 'https://accounts.spotify.com/api/token',
	recentlyPlayed: `${baseURL}v1/me/player/recently-played`
};

export default SpotifyRoutes;
