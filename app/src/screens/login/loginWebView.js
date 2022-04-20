import React from 'react';
import axios from 'axios';

import { WebView } from 'react-native-webview';
import { Buffer } from 'buffer';

import SpotifyServiceController from '../../services/SpotifyServiceController';

const queryString = require('query-string');

const SpotifyService = SpotifyServiceController.shared();

// eslint-disable-next-line react/prop-types
const LoginWebView = ({ setIsLogged_ }) => {
	const { codeChallenge, codeVerifier, authRoute } =
		SpotifyService.getAuthorizationRoute();
	console.log(
		'codeChallenge ------------------>',
		codeChallenge,
		codeVerifier
	);
	console.log('codeVerifier ------------------>', codeVerifier);

	const onNavigationStateChange = (navigationState) => {
		const { url } = navigationState;
		if (url.includes('code=')) {
			try {
				const regex = /[?&]([^=#]+)=([^&#]*)/g;
				const params = {};
				let match;
				// eslint-disable-next-line no-cond-assign
				while ((match = regex.exec(url))) {
					// eslint-disable-next-line prefer-destructuring
					params[match[1]] = match[2];
				}
				console.log(url);
				const authCode = params.code;
				SpotifyService.set('spotifyAuthCode', authCode);

				getToken(authCode);
			} catch (err) {
				console.log(err);
			}
		}
	};

	const getToken = async (codeData) => {
		console.log(
			'6a5s4d654sad654sa65d4654654-----------------------------------------------------------------------------------------'
		);
		const data = queryString.stringify({
			code: codeData,
			grant_type: 'authorization_code',
			redirect_uri: SpotifyService.get('spotify_redirect_uri'),
			code_verifier: codeVerifier
		});
		console.log(data);
		const config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${Buffer.from(
					`${SpotifyService.get(
						'spotify_client_id'
					)}:${SpotifyService.get('spotify_client_secret')}`,
					'utf8'
				).toString('base64')}`
			}
		};

		// eslint-disable-next-line no-unused-vars
		const res = await axios
			.post(SpotifyService.getRoute('token'), data, config)
			.then((response) => {
				if (response.status === 200) {
					console.log(response.data);
					SpotifyService.set(
						'access_token',
						response.data.access_token
					);
					SpotifyService.set('expires_in', response.data.expires_in);
					SpotifyService.set('token_type', response.data.token_type);
					SpotifyService.set(
						'spotify_refresh_token',
						response.data.refresh_token
					);
					SpotifyService.set('isLogged', true);

					// On true the screen will be redirected to the app home
					setIsLogged_(true);
				} else if (response.status === 400) {
					console.log(
						'----------------------------------------------- >>>>>',
						response
					);
				}
			})
			.catch((error) => {
				console.log(error.response.data);
			});
	};

	return (
		<>
			<WebView
				source={{ uri: authRoute }}
				onNavigationStateChange={onNavigationStateChange}
			/>
		</>
	);
};

export default LoginWebView;
