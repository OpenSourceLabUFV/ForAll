import { IonFab, IonFabButton, IonButton, IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
// import ExploreContainer from '../components/ExploreContainer';
import MyHeader from '../components/MyHeader';
import './Home.css';

// import SwitchIconButton from '../components/SwitchIconButton';
import BtnGrid from '../components/BtnGrid';
import prev from '../assets/fft_preview.png';
import { micOutline, play } from 'ionicons/icons';
import AudioDataContainer from '../components/AudioDataContainer';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <MyHeader name ="Home"/>

        <div style = {{display:'relative',height:"20%", width:"80%", margin: 'auto'}}>
          <AudioDataContainer />
        </div>

        {/* <div style={{justifyContent:'center', alignItems:'center', display:'flex'}}>
          <img height={80} src={prev} />
        </div> */}

        {/* <div style = {{display:'absolute',maxHeight:200}}>
          <AudioDataContainer />
        </div> */}

        <BtnGrid/>
        
        <div style={{justifyContent:'center', alignItems:'center', display:'flex'}}>
          <IonButton>
            <IonIcon icon={play} />
            Play
          </IonButton>
        </div>

        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton>
            <IonIcon icon={micOutline} />
          </IonFabButton>
        </IonFab>
        
        {/* <BtnGrid nameList ={["teste"]} stateList = {[2]} numEl = {2}/> */}
        {/* <SwitchIconButton name="START RECORDING" state = {0}/> */}
        {/* <ExploreContainer name="home page" /> */}
      </IonContent>
    </IonPage>
  );
};

export default Home;
