import React from 'react';
import VisualDemo from './VisualDemo';
// import soundFile from '../assets/xote_dos_milagres.mp3'

class AudioDataContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.frequencyBandArray = [...Array(16).keys()]
  }

  initializeAudioAnalyser = () => {
    const audioContext = new AudioContext();
    var destination = audioContext.createMediaStreamDestination();
    const source = audioContext.createMediaStreamSource(destination.stream);
    const analyser = audioContext.createAnalyser();
    // audioFile.src = soundFile;
    analyser.fftSize = 64
    source.connect(audioContext.destination);
    source.connect(analyser);
    // audioFile.play()
      this.setState({
        audioData: analyser
      })
  }

  getFrequencyData = (styleAdjuster) => {
    const bufferLength = this.state.audioData.frequencyBinCount;
    const amplitudeArray = new Uint8Array(bufferLength);
    this.state.audioData.getByteFrequencyData(amplitudeArray)
    styleAdjuster(amplitudeArray)
  }

  render(){

    return (
      <div>
        <VisualDemo
          initializeAudioAnalyser={this.initializeAudioAnalyser}
          frequencyBandArray={this.frequencyBandArray}
          getFrequencyData={this.getFrequencyData}
          audioData={this.state.audioData}
        />
      </div>
    );
  }
}

export default AudioDataContainer;