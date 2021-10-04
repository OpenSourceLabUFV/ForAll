import { IonFab, IonFabButton, IonButton, IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import MyHeader from '../components/MyHeader';
import './Home.css';

import BtnGrid from '../components/BtnGrid';
// import prev from '../assets/fft_preview.png';
import { micOutline, play } from 'ionicons/icons';
import AudioDataContainer from '../components/AudioDataContainer';
import AudioViz from '../components/AudioViz';

const Home: React.FC = () => {

  //TODO: Fix viz, apagar quando for -1
  const [vFlag,setvFlag] = useState(-1)
  function visualizar(vFlag:number){
    if(vFlag==-1) setvFlag(1)
    else setvFlag(-1)
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <MyHeader name ="Home"/>
        {/* <AudioViz vizFlag={vFlag} /> */}

        <div style = {{display:'relative',height:"14%", width:"80%", margin: 'auto'}}>
          {/* <AudioDataContainer /> */}
          <AudioViz vizFlag={vFlag} />
        </div>       

        <BtnGrid/>
        
        <div style={{justifyContent:'center', alignItems:'center', display:'flex'}}>
          <IonButton>
            <IonIcon icon={play} />
            Play
          </IonButton>
        </div>

        <IonFab vertical="center" horizontal="center" slot="fixed">
          <IonFabButton 
            onClick={()=>visualizar(vFlag)}>
                <IonIcon icon={micOutline} />
          </IonFabButton>
        </IonFab> 

        

        

      </IonContent>
    </IonPage>
  );
};

export default Home;
