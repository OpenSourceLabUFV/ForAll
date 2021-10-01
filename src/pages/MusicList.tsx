import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import MyHeader from '../components/MyHeader';
import ExploreContainer from '../components/ExploreContainer';
import './MusicList.css';

const MusicList: React.FC = () => {
  return (
    <IonPage>
      <MyHeader name ="MusicList"/>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">MusicList</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="MusicList page" />
      </IonContent>
    </IonPage>
  );
};

export default MusicList;
