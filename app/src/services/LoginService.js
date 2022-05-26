import AsyncStorage from '@react-native-async-storage/async-storage';
import SpotifyService from './SpotifyService';

const handleAppLogin = async () => {
	const userHasPreviouslyLogin = await SpotifyService.getSpotifyData(
		'isLogged'
	);

	return JSON.parse(userHasPreviouslyLogin);
};

const getCodeFromURI = async (url) => {
	console.log('url', url);
	try {
		const regex = /[?&]([^=#]+)=([^&#]*)/g;
		const params = {};
		let match;

		// eslint-disable-next-line no-cond-assign
		while ((match = regex.exec(url))) {
			// eslint-disable-next-line prefer-destructuring
			params[match[1]] = match[2];
		}

		const expireTime = params.expires_in;

		await AsyncStorage.setItem(
			'spotify_access_token',
			JSON.stringify(params.access_token)
		);

		await AsyncStorage.setItem(
			'spotify_expires_in',
			JSON.stringify(expireTime)
		);
		let d = new Date();
		d = new Date(d.getTime() + JSON.parse(expireTime) * 1000);

		await AsyncStorage.setItem(
			'spotify_token_expires_time',
			JSON.stringify(d)
		);
		await AsyncStorage.setItem('isLogged', JSON.stringify(true));

		return true;
		// return getToken(authCode, uriData);
	} catch (err) {
		console.log(err);
	}

	return false;
};

// const getToken = async (codeData, uriData) => {
// 	let redirectURI = await SpotifyService.getSpotifyData(
// 		'spotify_redirect_uri'
// 	);
// 	redirectURI = redirectURI.replace(/['"]+/g, '');

// 	let spotifyClientID = await SpotifyService.getSpotifyData(
// 		'spotify_client_id'
// 	);
// 	spotifyClientID = spotifyClientID.replace(/['"]+/g, '');

// 	let spotifyClientSecret = await SpotifyService.getSpotifyData(
// 		'spotify_client_secret'
// 	);
// 	spotifyClientSecret = spotifyClientSecret.replace(/['"]+/g, '');

// 	console.log('codeData', codeData);

// 	const data = queryString.stringify({
// 		grant_type: 'authorization_code',
// 		code: codeData,
// 		redirect_uri: encodeURI(redirectURI)
// 		// code_verifier: uriData.codeVerifier,
// 		// client_id: spotifyClientID
// 	});

// 	console.log('data', data);

// 	const config = {
// 		headers: {
// 			'Content-Type': 'application/x-www-form-urlencoded',
// 			Authorization: `Basic ${Buffer.from(
// 				`${spotifyClientID}:${spotifyClientSecret}`
// 			).toString('base64')}`
// 		}
// 	};

// 	console.log('config', config);

// 	let sucessLogin = false;
// 	await axios
// 		.post(SpotifyRoutes.token, data, config)
// 		.then((response) => {
// 			if (response.status === 200) {
// 				AsyncStorage.setItem(
// 					'spotify_access_token',
// 					JSON.stringify(response.data.access_token)
// 				);
// 				AsyncStorage.setItem(
// 					'spotify_expires_in',
// 					JSON.stringify(response.data.expires_in)
// 				);
// 				let d = Date.now();
// 				d = new Date(
// 					d.getTime() + JSON.parse(response.data.expires_in) * 1000
// 				);
// 				console.log('spotify_expires_in', response.data.expires_in);
// 				console.log('expire on', d);

// 				AsyncStorage.setItem(
// 					'spotify_token_expires_time',
// 					JSON.stringify(d)
// 				);
// 				AsyncStorage.setItem(
// 					'spotify_token_type',
// 					JSON.stringify(response.data.token_type)
// 				);
// 				AsyncStorage.setItem(
// 					'spotify_refresh_token',
// 					JSON.stringify(response.data.refresh_token)
// 				);
// 				AsyncStorage.setItem('isLogged', JSON.stringify(true));

// 				sucessLogin = true;
// 			}
// 			if (response.status === 400) {
// 				console.log('ERROR: ', response.data);
// 			}
// 		})
// 		.catch((error) => {
// 			console.log(error.response.data);
// 		});

// 	return sucessLogin;
// };

export default { handleAppLogin, getCodeFromURI };
