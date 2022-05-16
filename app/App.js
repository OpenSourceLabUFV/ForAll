import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';

import { func } from './src/constants';
import AppState from './src/context/AppState';
import RootStack from './src/navigation/RootStack';
import LoginWebView from './src/screens/login/loginWebView';

import StartUpService from './src/services/StartUpService';

const App = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [isLogged_, setIsLogged_] = useState(false);

	// pre-loading assets/fonts?
	if (isLoading) {
		StartUpService.startup();
		return (
			<AppLoading
				onError={() => {
					// console.warn
				}}
				onFinish={() => setIsLoading(false)}
				startAsync={func.loadAssetsAsync}
			/>
		);
	}

	if (!isLogged_) {
		return <LoginWebView setIsLogged_={setIsLogged_} />;
	}

	return (
		<AppState>
			<StatusBar barStyle="light-content" />
			<RootStack />
		</AppState>
	);
};

export default App;
