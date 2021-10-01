import { IonLabel, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import logo from '../assets/ic_launcher-web.png';


interface MyHeaderProps {name: string}

const MyHeader: React.FC<MyHeaderProps> = ({name}) => {
    return (
    <IonHeader>
        <IonToolbar>
          <IonTitle>{name}</IonTitle>
          <IonLabel slot = "end"><img height={60} src={logo} /></IonLabel>
        </IonToolbar>
    </IonHeader> 
    );
};

export default MyHeader;