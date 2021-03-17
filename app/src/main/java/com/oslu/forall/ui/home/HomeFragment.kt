package com.oslu.forall.ui.home

import android.graphics.drawable.Drawable
import android.os.Build
import androidx.lifecycle.ViewModelProvider
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import androidx.annotation.RequiresApi
import androidx.core.content.res.ResourcesCompat
import com.oslu.forall.R

class HomeFragment : Fragment() {

    companion object {
        fun newInstance() = HomeFragment()
    }

    private lateinit var viewModel: HomeViewModel

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.home_fragment, container, false)
    }

    // Requiring that API > Jelly Bean in order to change button icons
    // TODO maybe make minApi >= 21?
    @RequiresApi(Build.VERSION_CODES.JELLY_BEAN_MR1)
    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProvider(this).get(HomeViewModel::class.java)
        // TODO: Use the ViewModel for all values and persist (locally) !


        // When DURATION is clicked, go to next duration
        val durationButton = view?.findViewById<Button>(R.id.assistDuration)
        var duration = 1
        durationButton?.setOnClickListener(){
            val icon = when(duration){
                0 -> ResourcesCompat.getDrawable(resources, R.drawable.ic_timelapse_24_white, null)
                1 -> ResourcesCompat.getDrawable(resources, R.drawable.ic_baseline_access_time_filled_24, null)
                else -> ResourcesCompat.getDrawable(resources, R.drawable.ic_time_short_24, null)
            }
            durationButton.setCompoundDrawablesWithIntrinsicBounds(icon,null,null,null)
            duration = if(duration==2) 0 else duration+1 // cycle durations
        }


        // If LOG DATA is clicked, check current state, invert and set appropriate icon
        val logButton = view?.findViewById<Button>(R.id.toggleLog)
        var saveLogs = false
        logButton?.setOnClickListener(){
            saveLogs = changeIcon(logButton,
                ResourcesCompat.getDrawable(resources, R.drawable.ic_logs_24_white, null),
                ResourcesCompat.getDrawable(resources, R.drawable.ic_mobile_off_24_white, null),
                saveLogs)
        }


        // INPUT button logic (same as above)
        val inputButton = view?.findViewById<Button>(R.id.toggleInputType)
        var inputType = false // false for list TRUE for mic
        inputButton?.setOnClickListener(){
            inputType = changeIcon(inputButton,
                                   ResourcesCompat.getDrawable(resources, R.drawable.ic_baseline_mic_24_white, null),
                                   ResourcesCompat.getDrawable(resources, R.drawable.ic_music_list_24_white, null),
                                   inputType)
        }

        // SIGNAL button logic (same as above)
        val signalButton = view?.findViewById<Button>(R.id.toggleAssistType)
        var signalType: Boolean = true // TRUE for vibrate, FALSE for flashlight
        signalButton?.setOnClickListener(){
            signalType = changeIcon(signalButton,
                                    ResourcesCompat.getDrawable(resources, R.drawable.ic_vibration_24_white, null),
                                    ResourcesCompat.getDrawable(resources, R.drawable.ic_flashlight_24, null),
                                    signalType)
        }

        // TEMPO button logic (same as above)
        val tempoButton = view?.findViewById<Button>(R.id.toggleTempo)
        var tempoType = false // TRUE for fast (double beat), FALSE for slow (single beat)
        tempoButton?.setOnClickListener(){
            tempoType = changeIcon(tempoButton,
                                    ResourcesCompat.getDrawable(resources, R.drawable.ic_tempo_strong_24_white, null),
                                    ResourcesCompat.getDrawable(resources, R.drawable.ic_tempo_weak_24_white, null),
                                    tempoType)
        }

    }

    private fun changeIcon(clickedButton: Button?, icon1: Drawable?, icon2: Drawable?, state: Boolean): Boolean{
        val img = if (!state) {icon1} else {icon2}
        clickedButton?.setCompoundDrawablesWithIntrinsicBounds(img,null,null,null)
        return !state
    }
}