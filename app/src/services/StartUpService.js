import AsyncStorage from '@react-native-async-storage/async-storage';

import {
	CLEAN_DATA
	// eslint-disable-next-line import/no-unresolved
} from '@env';
import SpotifyService from './SpotifyService';

// Services inicialization
const startup = async () => {
	console.log('The Services are starting...');

	if (JSON.parse(CLEAN_DATA)) {
		console.log('THE APP STORAGE WAS CLENED');
		await AsyncStorage.clear();
		await AsyncStorage.setItem('isInitialized', JSON.stringify(false));
	}

	await SpotifyService.initSpotifyData();

	console.log('All Services are running!\n');

	return true;
};

export default { startup };
