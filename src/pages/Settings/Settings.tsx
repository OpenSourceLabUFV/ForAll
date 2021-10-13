import React from "react";
import { IonContent, IonPage } from "@ionic/react";

import MyHeader from "../../components/MyHeader/MyHeader";
import ExploreContainer from "../../components/ExploreContainer/ExploreContainer";
import "./Settings.css";
import AudioDataContainer from "../../components/AudioDataContainer";

const Settings = () => {
	// if (navigator.mediaDevices) {
	//   console.log('getUserMedia supported.');
	//   navigator.mediaDevices.getUserMedia ({audio: true}).then(function(stream) {
	//     /* use the stream */
	//     const audioCtx = new AudioContext();
	//     const source = audioCtx.createMediaStreamSource(stream);
	//     // const gainNode = new GainNode(audioCtx);
	//     // source.connect(gainNode).connect(audioCtx.destination);
	//     source.connect(audioCtx.destination);
	//   });
	// }

	// const audioContext = new AudioContext();

	// var destination = audioContext.createMediaStreamDestination();
	// var promise = navigator.mediaDevices.getUserMedia({audio:true});

	// const source = audioContext.createMediaStreamSource(destination.stream);
	// source.connect(audioContext.destination)

	return (
		<IonPage>
			<MyHeader name="Settings" />
			<IonContent fullscreen>
				<AudioDataContainer />

				{/* <IonList>
        <IonItem lines="full">
          <IonIcon slot="start" name="moon"></IonIcon>
          <IonLabel>
            Toggle Dark Theme
          </IonLabel>
          <IonToggle id="themeToggle" slot="end"></IonToggle>
        </IonItem>
        </IonList> */}

				{/* <IonButton onClick ={()=>changeTheme()}/> */}

				<ExploreContainer name="Settings page" />
			</IonContent>
		</IonPage>
	);
};

export default Settings;
