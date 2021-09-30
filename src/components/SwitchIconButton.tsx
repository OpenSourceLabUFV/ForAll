import { IonButton } from '@ionic/react';
import './SwitchIconButton.css'

// TODO Create list of button icons and strings
// TODO Style button color, shape and content like Kotlin model
// TODO Implement abstract button Icon from list + Text from list

interface SwitchIconButtonProps {
    name: string;
    state: number;
  }
  
  const SwitchIconButton: React.FC<SwitchIconButtonProps> = ({ name,state }) => {
    return (
      <div className="switchBtnDiv">
        <IonButton>
            <strong>{name}, icone = {state}</strong>
        </IonButton>
      </div>
    );
  };
  
  
  export default SwitchIconButton;
  