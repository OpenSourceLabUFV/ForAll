import { pkceChallenge } from 'react-native-pkce-challenge';

import {
	SPOTIFY_REDIRECT_URI,
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENTE_SECRET,
	SPOTIFY_PERMISSION_SCOPE
	// eslint-disable-next-line import/no-unresolved
} from '@env';

import AsyncStorage from '@react-native-async-storage/async-storage';
import SpotifyRoutes from '../routes/SpotifyRoutes';

const initSpotifyData = async () => {
	try {
		const isInitialized = await getSpotifyData('isInitialized');

		if (!isInitialized) {
			const spotifyRedirectURI = SPOTIFY_REDIRECT_URI;
			const spotifyClientID = SPOTIFY_CLIENT_ID;
			const spotifyClientSecret = SPOTIFY_CLIENTE_SECRET;

			await AsyncStorage.setItem('isLogged', JSON.stringify(false));
			await AsyncStorage.setItem('spotifyAuthCode', JSON.stringify('-'));
			await AsyncStorage.setItem('access_token', JSON.stringify('-'));
			await AsyncStorage.setItem('token_type', JSON.stringify('-'));
			await AsyncStorage.setItem('expires_in', JSON.stringify(0));
			await AsyncStorage.setItem(
				'spotify_refresh_token',
				JSON.stringify('-')
			);
			await AsyncStorage.setItem(
				'spotify_redirect_uri',
				JSON.stringify(spotifyRedirectURI)
			);
			await AsyncStorage.setItem(
				'spotify_client_id',
				JSON.stringify(spotifyClientID)
			);
			await AsyncStorage.setItem(
				'spotify_client_secret',
				JSON.stringify(spotifyClientSecret)
			);
			await AsyncStorage.setItem(
				'spotify_permission',
				JSON.stringify(JSON.stringify(SPOTIFY_PERMISSION_SCOPE))
			);
			await AsyncStorage.setItem('isInitialized', JSON.stringify(true));
		}
	} catch (error) {
		console.log(error);
	}
};

const getSpotifyData = async (key) => {
	try {
		const response = await AsyncStorage.getItem(key);
		return response;
	} catch (error) {
		console.log(error);
	}

	return undefined;
};

const getSpotifyAuthorizationRoute = async () => {
	const { codeChallenge, codeVerifier } = pkceChallenge();

	const clientID = await getSpotifyData('spotify_client_id');
	const redirectURI = await getSpotifyData('spotify_redirect_uri');
	const scope = await getSpotifyData('spotify_permission');

	let authRoute = `${SpotifyRoutes.authorization}?response_type=code&show_dialog=true`;
	authRoute += `&client_id=${clientID}`;
	authRoute += `&redirect_uri=${redirectURI}`;
	authRoute += `&scope=${scope}`;
	authRoute += `&code_challenge_method=S256&code_challenge=${codeChallenge}`;

	return { codeChallenge, codeVerifier, authRoute };
};

export default {
	getSpotifyData,
	getSpotifyAuthorizationRoute,
	initSpotifyData
};
