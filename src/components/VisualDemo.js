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

export default function VisualDemo(props) {

    const classes = useStyles();

    const amplitudeValues = useRef(null);

    function adjustFreqBandStyle(newAmplitudeData){
      amplitudeValues.current = newAmplitudeData;
      let domElements = props.frequencyBandArray.map((num) =>
        document.getElementById(num))
      for(let i=0; i<props.frequencyBandArray.length; i++){
        let num = props.frequencyBandArray[i]
        domElements[num].style.opacity= `${amplitudeValues.current[num]}`
        domElements[num].style.backgroundColor = `rgb(128,128,128)`
        domElements[num].style.height = `${amplitudeValues.current[num]*0.25}px`
      }
    };

    function runSpectrum(){
      props.getFrequencyData(adjustFreqBandStyle)
      requestAnimationFrame(runSpectrum)
    }

    function handleStartBottonClick(){
      props.initializeAudioAnalyser()
      requestAnimationFrame(runSpectrum)
    }

    return (

      <div>

        <div>
          <Tooltip
            title="Start"
            aria-label="Start"
            placement="right">
            <IonButton
              id='startButton'
              onClick={() => handleStartBottonClick()}
              disabled={!!props.audioData ? true : false}>
              <EqualizerIcon/>
            </IonButton>
          </Tooltip>
        </div>

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
