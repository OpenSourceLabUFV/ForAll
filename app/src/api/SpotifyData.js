import axios from 'axios';
import { useState } from 'react';
import SpotifyService from '../services/SpotifyService';
import SpotifyRoutes from '../routes/SpotifyRoutes';

const getDefaultRequestConfiguration = async () => {
	const spotifyAccessToken = await SpotifyService.getSpotifyData(
		'spotify_access_token'
	);

	const config = {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${spotifyAccessToken.replace(/['"]+/g, '')}`
		}
	};

	return config;
};

// const tokenIsValid = async () => {
// 	const spotifyAccessToken = await SpotifyService.getSpotifyData(
// 		'spotify_access_token'
// 	);

// 	const spotifyAccessToken = await SpotifyService.getSpotifyData(
// 		'spotify_access_token'
// 	);

// 	console.log(spotifyAccessToken);
// };

const getRecentlyPlayed = async () => {
	const config = await getDefaultRequestConfiguration();
	// const [isResponse, setResponse] = useState();

	const response = await axios
		.get(`${SpotifyRoutes.recentlyPlayed}?limit=10`, config)
		.then((resp) => {
			// console.log(resp);
			if (resp.status === 200) {
				console.log(resp.data.items);
				return resp.data.items;
			}

			return undefined;
		})
		.catch((error) => {
			console.log(error);
		});

	const recentlyPlayedItems = [];
	response.forEach((element) => {
		// const trackName = element.track.name;
		const title = element.track.album.name;
		const { id } = element.track.album;
		const image = element.track.album.images[0].url;
		recentlyPlayedItems.push({
			title,
			id,
			image
		});
		console.log(title, id, image);
	});

	// "images": Array [
	// 	Object {
	// 	  "height": 640,
	// 	  "url": "https://i.scdn.co/image/ab67616d0000b2735d48e2f56d691f9a4e4b0bdf",
	// 	  "width": 640,
	// 	},

	// console.log(isResponse);
	return recentlyPlayedItems;
};

export default { getRecentlyPlayed };
