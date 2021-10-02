import { IonList,IonItem,IonLabel,IonIcon, IonToggle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import MyHeader from '../components/MyHeader';
import ExploreContainer from '../components/ExploreContainer';
import './Settings.css';

const Settings: React.FC = () => {  
  if (navigator.mediaDevices) {
    console.log('getUserMedia supported.');
    navigator.mediaDevices.getUserMedia ({audio: true}).then(function(stream) {
      /* use the stream */
      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaStreamSource(stream);
      // const gainNode = new GainNode(audioCtx);
      // source.connect(gainNode).connect(audioCtx.destination);
      source.connect(audioCtx.destination);
    });
  }
  return (
    <IonPage>
      <MyHeader name ="Settings"/>
      <IonContent fullscreen>
        

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
