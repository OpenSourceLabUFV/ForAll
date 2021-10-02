// TODO: reimplementar visualização, otimizando!
import React, { useState } from 'react';
import { IonButton,IonFab, IonFabButton, IonIcon } from '@ionic/react';
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
      paddingTop: '7%',
      maxHeight: 'inherit'
    }
  }));

  
interface AudioVizProps {
    vizFlag:number
}

const AudioViz: React.FC<AudioVizProps> = ({vizFlag}) => {
    // Globals
    var aCtx;
    var analyser: AnalyserNode;
    var microphone;

    let bufferLength: number
    const [amplitudeArray, setAmplitudeArray] = useState(new Uint8Array(3));
    // const [frequencyBandArray, setfrequencyBandArray] = useState(new Uint8Array(16));
    const frequencyBandArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,15,16]
  
    if(vizFlag>0){
        navigator.mediaDevices.getUserMedia({audio:true}).then((stream)=>{
            aCtx = new AudioContext();
            analyser = aCtx.createAnalyser();
            analyser.fftSize = 32
            microphone = aCtx.createMediaStreamSource(stream);
            microphone.connect(analyser);
            // analyser.connect(aCtx.destination);
            getFrequencyData(analyser);
        });
    }
    function getFrequencyData(analyser:AnalyserNode){
        setInterval(function(){
            var FFTData = new Uint8Array(analyser.frequencyBinCount);
            // analyser.getFloatFrequencyData(FFTData);
            analyser.getByteFrequencyData(FFTData);
            setAmplitudeArray(FFTData)
            adjustFreqBandStyle();
        },
        1 //intervalor entre calculos em ms 
        );

        // var FFTData = new Uint8Array(analyser.frequencyBinCount);
        // // analyser.getFloatFrequencyData(FFTData);
        // analyser.getByteFrequencyData(FFTData);
        // setAmplitudeArray(FFTData)
        // adjustFreqBandStyle();
    }

    function adjustFreqBandStyle(){
        let domElements = frequencyBandArray.map((num:number) =>
          document.getElementById(num.toString()))

        for(let i=0; i<frequencyBandArray.length; i++){
            // let num = frequencyBandArray[i]
            let num = i
            domElements[num]!.style.opacity= `${amplitudeArray[num]}`
            domElements[num]!.style.backgroundColor = `rgb(128,128,128)`
            domElements[num]!.style.height = `${amplitudeArray[num]*0.45 +5}px`
            }
    };

    const classes = useStyles();
    
    return (
            
        // <div style={{}}>
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


            //  <a>
            //     Currently: {amplitudeArray.toString()}
            // </a> 

      
            // <IonFab vertical="top" horizontal="center" slot="fixed">
            //     <IonFabButton 
            //     onClick={()=>getData()}>
            //         <a>
            //             GO
            //         </a>
            //     </IonFabButton>
            // </IonFab> 
            

            //  <IonFab vertical="center" horizontal="center" slot="fixed">
            //     <IonFabButton 
            //     onClick={()=>play()}>
            //         <IonIcon icon={micOutline} />
            //     </IonFabButton>
            // </IonFab> 
        // </div> 
    );
    
    

};
export default AudioViz;
  