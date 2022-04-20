import { pkceChallenge } from 'react-native-pkce-challenge';

export default class SpotifyServiceController {
	DATA = {
		isLogged: false,
		spotifyAuthCode: '',
		access_token: '',
		expires_in: 0,
		token_type: '',
		spotify_refresh_token: "",
		spotify_redirect_uri: 'http://192.168.2.29:19000',
		spotify_client_id: '1edaebb6be0d42d3b3bf9e61c499148e',
		spotify_client_secret: '9156f9b80808493c9bfdaa4ceb2c0edc',
		spotify_permission:
			'user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private'
	};

	BASE_ROUTES = {
		authorization: 'https://accounts.spotify.com/authorize',
		token: 'https://accounts.spotify.com/api/token'
	};

	ROUTES = {
		authorization: `${this.BASE_ROUTES.authorization}?response_type=code&client_id=${this.DATA.spotify_client_id}&redirect_uri=${this.DATA.spotify_redirect_uri}&show_dialog=true&scope=${this.DATA.spotify_permission}`,
		token: this.BASE_ROUTES.token
	};

	static myInstance = null;

	static shared() {
		if (SpotifyServiceController.myInstance === null) {
			SpotifyServiceController.myInstance =
				new SpotifyServiceController();
		}
		return this.myInstance;
	}

	set(param, payload) {
		const a = this.DATA[param];
		a.value = payload;
	}

	get(param) {
		return this.DATA[param];
	}

	getRoute(param) {
		return this.ROUTES[param];
	}

	getAuthorizationRoute() {
		const { codeChallenge, codeVerifier } = pkceChallenge();
		const authRoute = `${this.ROUTES.authorization}&code_challenge_method=S256&code_challenge=${codeChallenge}`;
		console.log(authRoute);

		return { codeChallenge, codeVerifier, authRoute };
	}

	getData() {
		return this.DATA;
	}
}
