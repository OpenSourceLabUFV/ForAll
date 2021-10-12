// TODO: Add pallete https://ionicframework.com/docs/theming/basics
// TODO: Load and display songslist
// TODO: Implement songlist bpm selection
// TODO: Implement AudioService ui and functions (mic recording + fft + graph)
// TODO: Implement Vibration
// TODO: Implement Flashlight
// TODO: Implement duration/tempo selection
// TODO: Implement data logging
// TODO: Implement data processing with premade

import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
	IonApp,
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
} from "@ionic/react";

import { IonReactRouter } from "@ionic/react-router";
import { ellipse, listOutline, settings } from "ionicons/icons";
import Settings from "./pages/Settings/Settings";
import Home from "./pages/Home/Home";
import MusicList from "./pages/MusicList/MusicList";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

const App = () => (
	<IonApp>
		<IonReactRouter>
			<IonTabs>
				<IonRouterOutlet>
					<Route exact path="/Settings">
						<Settings />
					</Route>
					<Route exact path="/Home">
						<Home />
					</Route>
					<Route path="/MusicList">
						<MusicList />
					</Route>
					<Route exact path="/">
						<Redirect to="/Settings" />
					</Route>
				</IonRouterOutlet>
				<IonTabBar slot="bottom">
					<IonTabButton tab="Settings" href="/Settings">
						<IonIcon icon={settings} />
						<IonLabel>Settings</IonLabel>
					</IonTabButton>
					<IonTabButton tab="Home" href="/Home">
						<IonIcon icon={ellipse} />
						<IonLabel>Home</IonLabel>
					</IonTabButton>
					<IonTabButton tab="MusicList" href="/MusicList">
						<IonIcon icon={listOutline} />
						<IonLabel>MusicList</IonLabel>
					</IonTabButton>
				</IonTabBar>
			</IonTabs>
		</IonReactRouter>
	</IonApp>
);

export default App;