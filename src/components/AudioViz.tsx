// TODO: reimplementar visualização, otimizando!
import React, { useRef } from 'react';
import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { micOutline } from 'ionicons/icons';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import './AudioComp.css';


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

const AudioViz: React.FC = () => {
    var analyser: any
    let frequencyBandArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,15,15]
    function play(){
        navigator.mediaDevices.getUserMedia({audio:true}).then((stream)=>{
            const audioCtx = new AudioContext();
            const source = audioCtx.createMediaStreamSource(stream);
            // const gainNode = new GainNode(audioCtx);
            // source.connect(gainNode).connect(audioCtx.destination);
            source.connect(audioCtx.destination);
            const analyser = getAnalyser(source,audioCtx)
            runSpectrum(
                getFrequencyData(analyser),
                frequencyBandArray,
                adjustFreqBandStyle,
                analyser)
        })
    }

    function getAnalyser(source: MediaStreamAudioSourceNode,audioCtx: AudioContext){
        // Criar analyser:
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 64
        source.connect(audioCtx.destination);
        source.connect(analyser);
        return analyser
    }

    function getFrequencyData(analyser:any):any {
        // Pegar saída do analyser:
        const bufferLength = analyser.frequencyBinCount;
        const amplitudeArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(amplitudeArray)
        return amplitudeArray
        // adjustFreqBandStyle(amplitudeArray)
    }

    function runSpectrum(newAmplitudeData:any,frequencyBandArray:any,analyser:any, adjustFreqBandStyle:any){
        newAmplitudeData = getFrequencyData(analyser)
        adjustFreqBandStyle(newAmplitudeData,frequencyBandArray)
        // requestAnimationFrame(runSpectrum(newAmplitudeData,frequencyBandArray, analyser))
    }

    function adjustFreqBandStyle(newAmplitudeData:any, frequencyBandArray:any){
        let domElements = frequencyBandArray.map((num:number) =>
          document.getElementById(num.toString()))
        for(let i=0; i<frequencyBandArray.length; i++){
          let num = frequencyBandArray[i]
          domElements[num].style.opacity= `${newAmplitudeData[num]}`
          domElements[num].style.backgroundColor = `rgb(128,128,128)`
          domElements[num].style.height = `${newAmplitudeData[num]*0.25}px`
        }
    };

    const classes = useStyles();
    
    return (    
        <div>
            <div className={classes.flexContainer}>
                {frequencyBandArray.map((num) =>
                    <Paper
                    className={'frequencyBands'}
                    elevation={8}
                    id={num.toString()}
                    key={num}
                    />
                )}
            </div>

            <IonFab vertical="center" horizontal="center" slot="fixed">
                <IonFabButton 
                onClick={()=>play()}>
                    <IonIcon icon={micOutline} />
                </IonFabButton>
            </IonFab>
        </div> 
    );
    
    

};
export default AudioViz;
  