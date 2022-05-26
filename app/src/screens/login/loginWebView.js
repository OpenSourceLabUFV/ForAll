import React, { useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
// import axios from 'axios';

// import AsyncStorage from '@react-native-async-storage/async-storage';

import { WebView } from 'react-native-webview';
// import { Buffer } from 'buffer';

import SpotifyService from '../../services/SpotifyService';
// import SpotifyRoutes from '../../routes/SpotifyRoutes';

import LoginService from '../../services/LoginService';

// const queryString = require('query-string');

// eslint-disable-next-line react/prop-types
const LoginWebView = ({ setIsLogged_ }) => {
	const [loginWebViewState, setLoginWebViewState] = useState({
		pageIsLoading: true
	});

	const [uriData, setUriData] = useState();

	const handleUriData = async () => {
		await SpotifyService.getSpotifyAuthorizationRoute().then((resp) => {
			setUriData({
				codeVerifier: resp.codeVerifier,
				authRoute: encodeURI(resp.authRoute)
			});
			setLoginWebViewState((prevState) => ({
				...prevState,
				pageIsLoading: false
			}));
		});
	};

	if (loginWebViewState.pageIsLoading) {
		handleUriData();
	}

	const onNavigationStateChange = async (navigationState) => {
		const { url } = navigationState;
		const newUrl = url.replace('#', '?');
		console.log(newUrl);

		if (newUrl.includes('access_token=')) {
			LoginService.getCodeFromURI(newUrl).then((resp) => {
				setIsLogged_(resp);
			});
		}
	};

	if (loginWebViewState.pageIsLoading) {
		return (
			<View>
				<ActivityIndicator size="large" color="000" />
				<Text>Loading</Text>
			</View>
		);
	}

	return (
		<>
			<WebView
				source={{ uri: uriData.authRoute }}
				onNavigationStateChange={onNavigationStateChange}
			/>
		</>
	);
};

export default LoginWebView;
