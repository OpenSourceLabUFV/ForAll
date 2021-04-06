package com.oslu.forall.controllers

import android.app.Notification
import android.app.Service
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.IBinder
import android.os.VibrationEffect
import android.os.Vibrator
import android.widget.Toast

// Tudo dessa classe foi escrito para teste

class AudioService : Service() {
    override fun onBind(intent: Intent?): IBinder? {
        TODO("Not yet implemented")
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {

        Toast.makeText(this, "starting service", Toast.LENGTH_SHORT).show()

        startForeground(22345, Notification())

        vibrate(10)

        return START_STICKY
    }

    override fun onDestroy() {
        Toast.makeText(this, "stopping service", Toast.LENGTH_SHORT).show()

        stopForeground(true)
    }

    private fun vibrate(milliseconds: Long) {

        val v = this.getSystemService(Context.VIBRATOR_SERVICE) as Vibrator

        if (Build.VERSION.SDK_INT >= 26) {
            v.vibrate(VibrationEffect.createOneShot(milliseconds, VibrationEffect.DEFAULT_AMPLITUDE))
        } else {
            v.vibrate(milliseconds)
        }
    }
}