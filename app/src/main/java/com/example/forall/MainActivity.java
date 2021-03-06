package com.example.forall;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.hardware.camera2.CameraAccessException;
import android.hardware.camera2.CameraManager;
import android.media.AudioManager;
import android.media.AudioRecord;
import android.media.AudioFormat;
import android.media.MediaRecorder;
import android.os.Build;
import android.os.Bundle;
import android.os.PowerManager;
import android.os.Vibrator;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Toast;
import android.widget.ToggleButton;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.viewpager.widget.PagerAdapter;
import androidx.viewpager.widget.ViewPager;

import com.google.android.material.tabs.TabItem;
import com.google.android.material.tabs.TabLayout;

public class MainActivity extends AppCompatActivity {

    //Declarar variáveis
    private TabLayout tabLayout;
    private ViewPager viewPager;
    private TabItem redeNeural, musicas;
    public PageAdapter pageAdapter;

    RadioButton radioGButton1, radioGButton2, radioGButton3, radioGButton4;
    EditText textoTempo, nomeTXT;
    long tzero;
    int ts;
    long tempo;
    CameraManager cameraManager;
    String cameraId;
    boolean metodoSinal;
    int quantSinal = 1;
    boolean aquisicao = true;

    final int REQUEST_PERMISSION_CODE = 1000;

    public MainActivity() {
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //requisitar permissão ao abrir
        if (!checkPermissionFromDevice()) {
            requestPermissions();
        }

        tabLayout = (TabLayout) findViewById(R.id.tablayout);
        redeNeural = (TabItem) findViewById(R.id.redeneural);
        musicas = (TabItem) findViewById(R.id.musicas);
        viewPager = findViewById(R.id.viewpager);

        pageAdapter = new PageAdapter(getSupportFragmentManager(),tabLayout.getTabCount(), 2);
        viewPager.setAdapter(pageAdapter);

        tabLayout.setOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                viewPager.setCurrentItem(tab.getPosition());
                if(tab.getPosition() == 0){
                    pageAdapter.notifyDataSetChanged();
                }
                else if(tab.getPosition() == 1){
                    pageAdapter.notifyDataSetChanged();
                }
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {

            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {

            }
        });

        viewPager.addOnPageChangeListener(new TabLayout.TabLayoutOnPageChangeListener(tabLayout));

        //mainactivitycore
    }

    private void requestPermissions() {
        ActivityCompat.requestPermissions(this,new String[]{
                Manifest.permission.WRITE_EXTERNAL_STORAGE,
                Manifest.permission.READ_EXTERNAL_STORAGE,
                Manifest.permission.RECORD_AUDIO,
                Manifest.permission.CAMERA,
                Manifest.permission.WAKE_LOCK
        },REQUEST_PERMISSION_CODE);
    }
    //Apertando ctrl+o
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        if (requestCode == REQUEST_PERMISSION_CODE) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED)
                Toast.makeText(this, "Permissão Concedida", Toast.LENGTH_SHORT).show();
            else
                Toast.makeText(this, "Permissão Negada", Toast.LENGTH_SHORT).show();
        }
    }

    protected boolean checkPermissionFromDevice() {
        int write_external_storage_result = ContextCompat.checkSelfPermission(this, Manifest.permission.WRITE_EXTERNAL_STORAGE);
        int read_external_storage_result = ContextCompat.checkSelfPermission(this, Manifest.permission.READ_EXTERNAL_STORAGE);
        int record_audio_result = ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO);
        int camera = ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA);
        int wake_lock = ContextCompat.checkSelfPermission(this, Manifest.permission.WAKE_LOCK);
        return write_external_storage_result == PackageManager.PERMISSION_GRANTED &&
                read_external_storage_result == PackageManager.PERMISSION_GRANTED &&
                record_audio_result == PackageManager.PERMISSION_GRANTED &&
                camera == PackageManager.PERMISSION_GRANTED &&
                wake_lock == PackageManager.PERMISSION_GRANTED;
    }
}