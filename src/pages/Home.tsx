import { IonFab, IonFabButton, IonButton, IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import MyHeader from '../components/MyHeader';
import './Home.css';

import BtnGrid from '../components/BtnGrid';
// import prev from '../assets/fft_preview.png';
import { micOutline, play } from 'ionicons/icons';
import AudioDataContainer from '../components/AudioDataContainer';
import AudioViz from '../components/AudioViz';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <MyHeader name ="Home"/>

        {/* <div style = {{display:'relative',height:"20%", width:"80%", margin: 'auto'}}>
          <AudioDataContainer />
        </div> */}        

        <BtnGrid/>
        
        <div style={{justifyContent:'center', alignItems:'center', display:'flex'}}>
          <IonButton>
            <IonIcon icon={play} />
            Play
          </IonButton>
        </div>

        <AudioViz />

        

      </IonContent>
    </IonPage>
  );
};

export default Home;
