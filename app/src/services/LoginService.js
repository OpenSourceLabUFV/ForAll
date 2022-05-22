import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from 'buffer';
import SpotifyService from './SpotifyService';
import SpotifyRoutes from '../routes/SpotifyRoutes';

const queryString = require('query-string');

const handleAppLogin = async () => {
	const userHasPreviouslyLogin = await SpotifyService.getSpotifyData(
		'isLogged'
	);

	return JSON.parse(userHasPreviouslyLogin);
};

const getCodeFromURI = async (url, uriData) => {
	try {
		const regex = /[?&]([^=#]+)=([^&#]*)/g;
		const params = {};
		let match;

		// eslint-disable-next-line no-cond-assign
		while ((match = regex.exec(url))) {
			// eslint-disable-next-line prefer-destructuring
			params[match[1]] = match[2];
		}

		const authCode = params.code;

		await AsyncStorage.setItem(
			'spotifyAuthCode',
			JSON.stringify(JSON.stringify(authCode))
		);

		return getToken(authCode, uriData);
	} catch (err) {
		console.log(err);
	}

	return false;
};

const getToken = async (codeData, uriData) => {
	const redirectURI = await SpotifyService.getSpotifyData(
		'spotify_redirect_uri'
	);

	const spotifyClientID = await SpotifyService.getSpotifyData(
		'spotify_client_id'
	);

	const spotifyClientSecret = await SpotifyService.getSpotifyData(
		'spotify_client_secret'
	);

	const data = queryString.stringify({
		code: codeData,
		grant_type: 'authorization_code',
		redirect_uri: encodeURI(redirectURI.replace(/['"]+/g, '')),
		code_verifier: uriData.codeVerifier
	});

	const config = {
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${Buffer.from(
				`${spotifyClientID.replace(
					/['"]+/g,
					''
				)}:${spotifyClientSecret.replace(/['"]+/g, '')}`,
				'utf8'
			).toString('base64')}`
		}
	};

	let sucessLogin = false;
	await axios
		.post(SpotifyRoutes.token, data, config)
		.then((response) => {
			if (response.status === 200) {
				AsyncStorage.setItem(
					'access_token',
					JSON.stringify(response.data.access_token)
				);

				AsyncStorage.setItem(
					'expires_in',
					JSON.stringify(response.data.expires_in)
				);
				AsyncStorage.setItem(
					'token_type',
					JSON.stringify(response.data.token_type)
				);
				AsyncStorage.setItem(
					'spotify_refresh_token',
					JSON.stringify(response.data.refresh_token)
				);
				AsyncStorage.setItem('isLogged', JSON.stringify(true));

				sucessLogin = true;
			}
			if (response.status === 400) {
				console.log('ERROR: ', response);
			}
		})
		.catch((error) => {
			console.log(error.response);
		});

	return sucessLogin;
};

export default { handleAppLogin, getCodeFromURI };
