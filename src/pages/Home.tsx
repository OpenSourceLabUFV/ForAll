import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

// import SwitchIconButton from '../components/SwitchIconButton';
import BtnGrid from '../components/BtnGrid';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        <BtnGrid nameList ="teste" stateList = {-0.320984/2} numEl = {2}/>
        {/* <SwitchIconButton name="home page" state = {1}/> */}
        {/* <ExploreContainer name="home page" /> */}
      </IonContent>
    </IonPage>
  );
};

export default Home;
