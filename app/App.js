import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';

import { func } from './src/constants';
import AppState from './src/context/AppState';
import RootStack from './src/navigation/RootStack';
import LoginWebView from './src/screens/login/loginWebView';

import StartUpService from './src/services/StartUpService';
import LoginService from './src/services/LoginService';

const App = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [isServicesRunning, setIsServicesRunning] = useState(false);
	const [isLogged_, setIsLogged_] = useState(false);

	// pre-loading assets/fonts?
	if (isLoading) {
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

	if (!isServicesRunning) {
		StartUpService.startup().then((resp) => {
			setIsServicesRunning(resp);
		});
	}

	LoginService.handleAppLogin().then((resp) => {
		setIsLogged_(resp);
	});

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
