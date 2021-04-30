package com.oslu.forall.ui.home

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import androidx.core.content.res.ResourcesCompat
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import com.oslu.forall.R
import com.oslu.forall.controllers.AudioService


class HomeFragment : Fragment() {

/*
    companion object {
        fun newInstance() = HomeFragment()
    }
*/

    private lateinit var homeViewModel: HomeViewModel

    override fun onCreateView(
            inflater: LayoutInflater,
            container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.home_fragment, container, false)
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        // Get Shared Preferences (user options)
        val sharedPref = activity?.getPreferences(Context.MODE_PRIVATE) ?: return

        // Get ViewModel from provider:
        homeViewModel = ViewModelProvider(this).get(HomeViewModel::class.java)

        // Getting UI components from view:
        val signalDurationButton = view?.findViewById<Button>(R.id.assistDuration)
        val logButton = view?.findViewById<Button>(R.id.toggleLog)
        val signalButton = view?.findViewById<Button>(R.id.toggleAssistType)
        val inputButton = view?.findViewById<Button>(R.id.toggleInputType)
        val tempoButton = view?.findViewById<Button>(R.id.toggleTempo)


        // Creating the observers that will update the UI when homeViewModel's data changes:
        // Why do we need observers? Because it guarantees that UI appearance is synced with logic.
        // Still confused? Read about LiveData in the docs:
        // https://developer.android.com/topic/libraries/architecture/livedata

        val signalDurationObserver = Observer<Int> {
            val icon = when(it){
                1 -> ResourcesCompat.getDrawable(resources, homeViewModel.iconList[Icons.MEDIUM_DURATION.id], null) // medium signal
                2 -> ResourcesCompat.getDrawable(resources, homeViewModel.iconList[Icons.LONG_DURATION.id], null) // long signal
                else -> ResourcesCompat.getDrawable(resources, homeViewModel.iconList[Icons.SHORT_DURATION.id], null) // short signal
            }

            signalDurationButton?.setCompoundDrawablesWithIntrinsicBounds(icon, null, null, null)

            with (sharedPref.edit()) {
                putInt("SIGNAL_DURATION", homeViewModel.signalDuration.value!!)
                commit()
            }
        }

        val saveLogsObserver = Observer<Boolean> {
            changeIcon(logButton, Icons.LOG_DATA.id, Icons.DO_NOT_LOG_DATA.id, it)

            with (sharedPref.edit()) {
                putBoolean("LOG_DATA", homeViewModel.saveLogs.value!!)
                commit()
            }
        }

        val inputTypeObserver = Observer<Boolean> {
            changeIcon(inputButton, Icons.MIC_DATA.id, Icons.LIST_DATA.id, it)

            with (sharedPref.edit()) {
                putBoolean("INPUT_TYPE", homeViewModel.inputType.value!!)
                commit()
            }
        }

        val signalTypeObserver = Observer<Boolean> {
            changeIcon(signalButton, Icons.VIBRATE.id, Icons.FLASHLIGHT.id, it)

            with (sharedPref.edit()) {
                putBoolean("SIGNAL_TYPE", homeViewModel.signalType.value!!)
                commit()
            }
        }

        val tempoTypeObserver = Observer<Boolean> {
            changeIcon(tempoButton, Icons.DOUBLE_BEAT.id, Icons.SINGLE_BEAT.id, it)

            with (sharedPref.edit()) {
                putBoolean("SIGNAL_TEMPO", homeViewModel.signalTempo.value!!)
                commit()
            }
        }

        // Observe the LiveData, passing in this activity as the LifecycleOwner and the observer.
        homeViewModel.signalDuration.observe(viewLifecycleOwner, signalDurationObserver)
        homeViewModel.saveLogs.observe(viewLifecycleOwner, saveLogsObserver)
        homeViewModel.inputType.observe(viewLifecycleOwner, inputTypeObserver)
        homeViewModel.signalType.observe(viewLifecycleOwner, signalTypeObserver)
        homeViewModel.signalTempo.observe(viewLifecycleOwner, tempoTypeObserver)

        // Defining onClickListeners for each button:
        // When DURATION is clicked, updates values
        signalDurationButton?.setOnClickListener{
            homeViewModel.signalDuration.postValue(
                    // cycling through signal duration values:
                    if (homeViewModel.signalDuration.value == 2) 0 else homeViewModel.signalDuration.value!!.plus(1)
            )
        }

        // If LOG DATA is clicked: check current state and invert
        // (this triggers the observer we defined above, which changes icon)
        logButton?.setOnClickListener{
            homeViewModel.saveLogs.postValue(
                    homeViewModel.saveLogs.value?.not() ?: false
            )
        }

        // INPUT button logic (same as above)
        inputButton?.setOnClickListener{
            homeViewModel.inputType.postValue(
                    homeViewModel.inputType.value?.not() ?: false
            )
        }

        // SIGNAL TYPE button logic (same as above)
        signalButton?.setOnClickListener{
            homeViewModel.signalType.postValue(
                    homeViewModel.signalType.value?.not() ?: false
            )
        }

        // TEMPO button logic (same as above)
        tempoButton?.setOnClickListener{
            homeViewModel.signalTempo.postValue(
                    homeViewModel.signalTempo.value?.not() ?: false
            )

            // Teste do Serviço de Áudio
            Intent(context, AudioService::class.java).also { intent ->
                context?.startService(intent)
                context?.stopService(intent)
            }
        }

    }

    // UI logic for updating icons according to the user's options:
    private fun changeIcon(clickedButton: Button?, icon1: Int, icon2: Int, it: Boolean){
        val icon = if(it) {
            // user option (when clicked)
            ResourcesCompat.getDrawable(resources, homeViewModel.iconList[icon1], null)
        }else{
            // default value
            ResourcesCompat.getDrawable(resources, homeViewModel.iconList[icon2], null)
        }

        clickedButton?.setCompoundDrawablesWithIntrinsicBounds(icon, null, null, null)
    }

    // When the view is reloaded, update data for UI logic
    override fun onViewStateRestored(savedInstanceState: Bundle?) {
        // Get Shared Preferences objects data is stored in the user's memory
        val sharedPref = activity?.getPreferences(Context.MODE_PRIVATE) ?: return

        // Update ViewModel using Shared Preferences
        homeViewModel.signalDuration.postValue(sharedPref.getInt("SIGNAL_DURATION",1))
        homeViewModel.signalType.postValue(sharedPref.getBoolean("SIGNAL_TYPE",false))
        homeViewModel.signalTempo.postValue(sharedPref.getBoolean("SIGNAL_TEMPO",false))
        homeViewModel.inputType.postValue(sharedPref.getBoolean("INPUT_TYPE",false))
        homeViewModel.saveLogs.postValue(sharedPref.getBoolean("LOG_DATA",false))
        homeViewModel.isPlaying.postValue(sharedPref.getBoolean("IS_PLAYING",false))

        // Logcat info for debugging:
        /*
        Log.i("SIGNAL_DURATION", "onViewStateRestored: ${sharedPref.getInt("SIGNAL_DURATION",1)}")
        Log.i("SIGNAL_TYPE", "onViewStateRestored ${sharedPref.getBoolean("SIGNAL_TYPE",false)}")
        Log.i("SIGNAL_TEMPO", "onViewStateRestored ${sharedPref.getBoolean("SIGNAL_TEMPO",false)}")
        Log.i("INPUT_TYPE", "onViewStateRestored ${sharedPref.getBoolean("INPUT_TYPE",false)}")
        Log.i("IS_PLAYING", "onViewStateRestored ${sharedPref.getBoolean("IS_PLAYING",false)}")
        */

        super.onViewStateRestored(savedInstanceState)
    }

    // Saves user options "between onStart() and onPostCreate(Bundle)" according to:
    // https://developer.android.com/reference/android/app/Activity#onSaveInstanceState(android.os.Bundle)
    override fun onSaveInstanceState(savedInstanceState: Bundle) {

        // Saving options using Shared Preferences
        val sharedPref = activity?.getPreferences(Context.MODE_PRIVATE) ?: return
        with (sharedPref.edit()) {
            putInt("SIGNAL_DURATION", homeViewModel.signalDuration.value!!)
            putBoolean("SIGNAL_TYPE", homeViewModel.signalType.value!!)
            putBoolean("SIGNAL_TEMPO", homeViewModel.signalTempo.value!!)
            putBoolean("INPUT_TYPE", homeViewModel.inputType.value!!)
            putBoolean("LOG_DATA", homeViewModel.saveLogs.value!!)
            putBoolean("IS_PLAYING", homeViewModel.isPlaying.value!!)
            commit()
        }

        // Logcat info for debugging:
        /*
        Log.i("SIGNAL_DURATION", "saved on exit ${sharedPref.getInt("SIGNAL_DURATION",0)}")
        Log.i("SIGNAL_TYPE", "saved on exit ${sharedPref.getBoolean("SIGNAL_TYPE",false)}")
        Log.i("SIGNAL_TEMPO", "saved on exit ${sharedPref.getBoolean("SIGNAL_TEMPO",false)}")
        Log.i("INPUT_TYPE", "saved on exit ${sharedPref.getBoolean("INPUT_TYPE",false)}")
        Log.i("IS_PLAYING", "saved on exit ${sharedPref.getBoolean("IS_PLAYING",false)}")
        */

        super.onSaveInstanceState(savedInstanceState)
    }

    // Save user prefs when navigating to other views
    override fun onDestroyView() {

        // Saving options using Shared Preferences
        val sharedPref = activity?.getPreferences(Context.MODE_PRIVATE) ?: return
        with (sharedPref.edit()) {
            putInt("SIGNAL_DURATION", homeViewModel.signalDuration.value!!)
            putBoolean("SIGNAL_TYPE", homeViewModel.signalType.value!!)
            putBoolean("SIGNAL_TEMPO", homeViewModel.signalTempo.value!!)
            putBoolean("INPUT_TYPE", homeViewModel.inputType.value!!)
            putBoolean("LOG_DATA", homeViewModel.saveLogs.value!!)
            putBoolean("IS_PLAYING", homeViewModel.isPlaying.value!!)
            commit()
        }

        // Logcat info for debugging:
        /*
        Log.i("SIGNAL_DURATION", "saved while navigating ${sharedPref.getInt("SIGNAL_DURATION",0)}")
        Log.i("SIGNAL_TYPE", "saved while navigating ${sharedPref.getBoolean("SIGNAL_TYPE",false)}")
        Log.i("SIGNAL_TEMPO", "saved while navigating ${sharedPref.getBoolean("SIGNAL_TEMPO",false)}")
        Log.i("INPUT_TYPE", "saved while navigating ${sharedPref.getBoolean("INPUT_TYPE",false)}")
        Log.i("IS_PLAYING", "saved while navigating ${sharedPref.getBoolean("IS_PLAYING",false)}")
        */

        super.onDestroyView()
    }

    enum class Icons(val id: Int){
        // Signal Duration:
        MEDIUM_DURATION(0),
        LONG_DURATION(1),
        SHORT_DURATION(2),

        // Data logging:
        LOG_DATA(3),
        DO_NOT_LOG_DATA(4),

        // Input type:
        MIC_DATA(5),
        LIST_DATA(6),

        // Assist type:
        VIBRATE(7),
        FLASHLIGHT(8),

        // Tempo choice:
        DOUBLE_BEAT(9),
        SINGLE_BEAT(10)
    }

}