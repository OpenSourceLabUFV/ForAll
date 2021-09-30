import { IonGrid, IonCol, IonRow } from '@ionic/react';
import './BtnGrid.css'

import SwitchIconButton from './SwitchIconButton';

interface BtnGridProps {
    nameList: string;
    stateList: number;
    numEl: number;
  }
  
  const BtnGrid: React.FC<BtnGridProps> = ({ nameList, stateList, numEl }) => {
    return (
      <div className="switchBtnDiv">
        <IonGrid>
            <SwitchIconButton name= {nameList} state = {stateList} />
            <strong>{nameList}, icone = {stateList*2}, botoes: {numEl}</strong>
        </IonGrid>
      </div>
    );
  };
  
  
  export default BtnGrid;