import SpotifyService from './SpotifyService';

// Services inicialization
const startup = async () => {
	console.log('The Services are starting...');
	await SpotifyService.initSpotifyData();
	console.log('All Services are running!\n');
};

export default { startup };
