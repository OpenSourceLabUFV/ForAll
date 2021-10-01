import { IonList,IonItem,IonLabel,IonIcon, IonToggle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import MyHeader from '../components/MyHeader';
import ExploreContainer from '../components/ExploreContainer';
import './Settings.css';

const Settings: React.FC = () => {  
  return (
    <IonPage>
      <MyHeader name ="Settings"/>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Settings</IonTitle>
          </IonToolbar>
        </IonHeader>

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
