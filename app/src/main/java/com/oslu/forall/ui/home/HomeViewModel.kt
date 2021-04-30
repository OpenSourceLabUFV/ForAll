package com.oslu.forall.ui.home

import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.oslu.forall.R

class HomeViewModel : ViewModel() {
    // [0,1,2] = [Short, Average, Long] signal duration
    var signalDuration: MutableLiveData<Int> = MutableLiveData(1)

    // True means debug/runtime logs should be saved
    var saveLogs: MutableLiveData<Boolean> = MutableLiveData(false)

    // [False, True] = [Vibration, Flashlight] for signaling rhythm
    var signalType: MutableLiveData<Boolean> = MutableLiveData(false)

    // [False, True] = [Music List, Microphone Data] should be the source data for beat generation
    var inputType: MutableLiveData<Boolean> = MutableLiveData(false)

    // [False, True] = [Slow, Fast] single or double tempo on the desired beats
    var signalTempo: MutableLiveData<Boolean> = MutableLiveData(false)

    // [False, True] = whether beats are being generated (vibration or flashes)
    var isPlaying: MutableLiveData<Boolean> = MutableLiveData(false)

    val iconList = listOf(
            // Signal Duration:
            R.drawable.ic_timelapse_24_white,  // medium signal
            R.drawable.ic_baseline_access_time_filled_24, // long signal
            R.drawable.ic_time_short_24, // short signal

            // Data logging:
            R.drawable.ic_logs_24_white, // log data
            R.drawable.ic_mobile_off_24_white, // DO NOT log data

            // Input type:
            R.drawable.ic_baseline_mic_24_white, // listening with microphone
            R.drawable.ic_music_list_24_white, // get data from music list

            // Assist type:
            R.drawable.ic_vibration_24_white, // vibration mode
            R.drawable.ic_flashlight_24, // rhythm in flashes

            // Tempo choice:
            R.drawable.ic_tempo_strong_24_white, // double beat ("faster")
            R.drawable.ic_tempo_weak_24_white // single beat
    )

}

