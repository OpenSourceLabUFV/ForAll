package com.oslu.forall.views

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.res.ResourcesCompat
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.ui.setupWithNavController
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.google.android.material.floatingactionbutton.FloatingActionButton
import com.oslu.forall.R


class MainActivity : AppCompatActivity() {


    override fun onCreate(savedInstanceState: Bundle?) {

        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val navView: BottomNavigationView = findViewById(R.id.bottomNavigationView)

        val navHostFragment =
            supportFragmentManager.findFragmentById(R.id.my_nav_host_fragment) as NavHostFragment

        val navController = navHostFragment.navController

        navView.setupWithNavController(navController)

        // TODO: isPlaying and icons have to be set to true/"play" when navigating to other screens
        val fab = findViewById<FloatingActionButton>(R.id.fab)
        var isPlaying = true
        fab.setOnClickListener(){
            if(isPlaying){
                fab.setImageDrawable(ResourcesCompat.getDrawable(resources, R.drawable.ic_baseline_pause_24_black, null))
                isPlaying = !isPlaying
                navController.navigate(R.id.navigation_home)
            }else{
                fab.setImageDrawable(ResourcesCompat.getDrawable(resources, R.drawable.ic_play_24_black, null))
                isPlaying = !isPlaying
            }
        }


    }
}