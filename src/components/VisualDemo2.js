import { useRef }  from 'react';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { makeStyles } from '@material-ui/core/styles';
import './AudioComp.css';
import { IonButton } from '@ionic/react';

const useStyles = makeStyles(theme => ({
  flexContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: '4%',
    maxHeight: 'inherit'
  }
}));

export default function VisualDemo2(props) {

    const classes = useStyles();

    const amplitudeValues = useRef(null);

    

    

 

    return (

      <div>

        {/* <div>
          <Tooltip
            title="Start"
            aria-label="Start"
            placement="right">
            <IonButton
              id='startButton'
              onClick={() => runSpectrum()}
              disabled={!!props.audioData ? true : false}>
              <EqualizerIcon/>
            </IonButton>
          </Tooltip>
        </div> */}

        <div className={classes.flexContainer}>
          {props.frequencyBandArray.map((num) =>
            <Paper
              className={'frequencyBands'}
              elevation={8}
              id={num}
              key={num}
            />
          )}
        </div>

      </div>

    );

}
