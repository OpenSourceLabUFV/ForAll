import React from 'react';
import axios from 'axios';

import { WebView } from 'react-native-webview';
import { Buffer } from 'buffer';

import AsyncStorage from '@react-native-async-storage/async-storage';
import SpotifyService from '../../services/SpotifyService';
import SpotifyRoutes from '../../routes/SpotifyRoutes';

const queryString = require('query-string');

// eslint-disable-next-line react/prop-types
const LoginWebView = ({ setIsLogged_ }) => {
	const { codeVerifier, authRoute } =
		SpotifyService.getSpotifyAuthorizationRoute();

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
				console.log('url', url);
				const authCode = params.code;
				SpotifyService.setSpotifyData('spotifyAuthCode', authCode);

				getToken(authCode);
			} catch (err) {
				console.log(err);
			}
		}
	};

	const getToken = async (codeData) => {
		const redirectURI = SpotifyService.getSpotifyData(
			'spotify_redirect_uri'
		);
		const data = queryString.stringify({
			code: codeData,
			grant_type: 'authorization_code',
			redirect_uri: redirectURI,
			code_verifier: codeVerifier
		});

		const config = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${Buffer.from(
					`${SpotifyService.getSpotifyData(
						'spotify_client_id'
					)}:${SpotifyService.getSpotifyData(
						'spotify_client_secret'
					)}`,
					'utf8'
				).toString('base64')}`
			}
		};

		await axios
			.post(SpotifyRoutes.token, data, config)
			.then((response) => {
				if (response.status === 200) {
					console.log(response.data);

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

					// On true the screen will be redirected to the app home
					setIsLogged_(true);
				} else if (response.status === 400) {
					console.log(response);
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
