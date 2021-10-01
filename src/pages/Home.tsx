import { IonButton,IonLabel, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
// import ExploreContainer from '../components/ExploreContainer';
import MyHeader from '../components/MyHeader';
import './Home.css';

// import SwitchIconButton from '../components/SwitchIconButton';
import BtnGrid from '../components/BtnGrid';
import prev from '../assets/fft_preview.png';


const Home: React.FC = () => {
  return (
    <IonPage>
      <MyHeader name ="Home"/>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* <IonButton size = "large" fill = "clear" target="_blank" rel="noopener noreferrer" href="https://google.com" >
          <img height ="fill" width = {250} src ="https://cdn.pixabay.com/photo/2015/12/11/11/43/google-1088004_640.png"/>
        </IonButton> */}
        <div style={{justifyContent:'center', alignItems:'center', display:'flex'}}>
          <img height={80} src={prev} />
        </div>
        
        <BtnGrid/>

        
        {/* <BtnGrid nameList ={["teste"]} stateList = {[2]} numEl = {2}/> */}
        {/* <SwitchIconButton name="START RECORDING" state = {0}/> */}
        {/* <ExploreContainer name="home page" /> */}
      </IonContent>
    </IonPage>
  );
};

export default Home;
