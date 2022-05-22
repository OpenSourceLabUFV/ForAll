import axios from 'axios';
import { Buffer } from 'buffer';
import SpotifyService from '../services/SpotifyService';
import SpotifyRoutes from '../routes/SpotifyRoutes';

const getDefaultRequestConfiguration = async () => {
	const spotifyClientID = await SpotifyService.getSpotifyData(
		'spotify_client_id'
	);

	const spotifyClientSecret = await SpotifyService.getSpotifyData(
		'spotify_client_secret'
	);

	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Basic ${Buffer.from(
				`${spotifyClientID.replace(
					/['"]+/g,
					''
				)}:${spotifyClientSecret.replace(/['"]+/g, '')}`,
				'utf8'
			).toString('base64')}`
		}
	};

	return config;
};

const getRecentlyPlayed = async () => {
	const config = await getDefaultRequestConfiguration();
	console.log('config', config);
	console.log(`${SpotifyRoutes.recentlyPlayed}?limit=10`);
	const response = await axios
		.get(`${SpotifyRoutes.recentlyPlayed}?limit=10`, config)
		.then((resp) => {
			console.log(resp);
			if (resp.status === 200) {
				console.log(resp.data);
			}
		})
		.catch((error) => {
			console.log(error);
		});

	console.log(response);

	return response;
};

export default { getRecentlyPlayed };
