package com.example.forall;

import android.content.Context;
import android.content.Intent;
import android.hardware.camera2.CameraAccessException;
import android.hardware.camera2.CameraManager;
import android.os.Build;
import android.os.Bundle;

import androidx.annotation.RequiresApi;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.PowerManager;
import android.text.SpannableString;
import android.text.Spanned;
import android.text.style.ImageSpan;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Toast;
import android.widget.ToggleButton;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link redeneural#newInstance} factory method to
 * create an instance of this fragment.
 */
public class redeneural extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    //Declarar variáveis
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

    private RecyclerView recyclerView;

    public redeneural() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment redeneural.
     */
    // TODO: Rename and change types and number of parameters
    public static redeneural newInstance(String param1, String param2) {
        redeneural fragment = new redeneural();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View layout = inflater.inflate(R.layout.fragment_redeneural, container, false);
        recyclerView = (RecyclerView) layout.findViewById(R.id.redeneural);
        LinearLayoutManager layoutManager;

        //Declarar botões
        final ToggleButton toggleButton = (ToggleButton) layout.findViewById(R.id.toggleButton);
        final RadioGroup radioGroup1 = layout.findViewById(R.id.radioGroup1);
        final RadioGroup radioGroup2 = layout.findViewById(R.id.radioGroup2);
        final RadioGroup radioGroup3 = layout.findViewById(R.id.radioGroup3);
        final RadioGroup radioGroup4 = layout.findViewById(R.id.radioGroup4);
        final Button radioButton1 = (RadioButton) layout.findViewById(R.id.radioButton1);
        final Button radioButton2 = (RadioButton) layout.findViewById(R.id.radioButton2);
        final Button radioButton3 = (RadioButton) layout.findViewById(R.id.radioButton3);
        final Button radioButton4 = (RadioButton) layout.findViewById(R.id.radioButton4);
        final Button radioButton5 = (RadioButton) layout.findViewById(R.id.radioButton5);
        final Button radioButton6 = (RadioButton) layout.findViewById(R.id.radioButton6);
        final Button radioButton7 = (RadioButton) layout.findViewById(R.id.radioButton7);
        final Button radioButton8 = (RadioButton) layout.findViewById(R.id.radioButton8);
        final Button radioButton9 = (RadioButton) layout.findViewById(R.id.radioButton9);
        final EditText textoTempo = (EditText) layout.findViewById(R.id.editText);
        final EditText nomeTXT = (EditText) layout.findViewById(R.id.nomeTXT);

        PowerManager powerManager = (PowerManager) getActivity().getSystemService(Context.POWER_SERVICE);
        final PowerManager.WakeLock wakeLock = powerManager.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK,
                "ForAll::Grava o áudio garai");

        cameraManager = (CameraManager) getActivity().getSystemService(Context.CAMERA_SERVICE);
        try {
            cameraId = cameraManager.getCameraIdList()[0];
        } catch (CameraAccessException e) {
            e.printStackTrace();
        }
        Intent intent = getActivity().getIntent();
        if(intent.getStringExtra("tMusica")!=null) {
            nomeTXT.setText(intent.getStringExtra("Titulo"));
            textoTempo.setText(intent.getStringExtra("tMusica"));
            radioGroup2.check(R.id.radioButton4);
        }

        ImageSpan imageSpanOff = new ImageSpan(getActivity(), android.R.drawable.ic_media_play);
        SpannableString contentOff = new SpannableString("X");
        contentOff.setSpan(imageSpanOff, 0, 1, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
        ImageSpan imageSpanOn = new ImageSpan(getActivity(), android.R.drawable.ic_media_pause);
        SpannableString contentOn = new SpannableString("X");
        contentOn.setSpan(imageSpanOn, 0, 1, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
        toggleButton.setText(contentOff);
        toggleButton.setTextOn(contentOn);
        toggleButton.setTextOff(contentOff);

        //Botão q faz as coisa
        toggleButton.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @RequiresApi(api = Build.VERSION_CODES.KITKAT)
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                if(isChecked){
                    wakeLock.acquire(60*60*1000L); //60 minutos
                    tzero = System.currentTimeMillis();

                    //Encontrar ts
                    int rTsinal = radioGroup3.getCheckedRadioButtonId();
                    radioGButton3 = getActivity().findViewById(rTsinal);
                    if(radioGButton3.getText()==radioButton5.getText()){ts=100;}
                    if(radioGButton3.getText()==radioButton6.getText()){ts=250;}
                    if(radioGButton3.getText()==radioButton7.getText()){ts=400;}

                    //Encontrar método de sinalização
                    int rSinal = radioGroup1.getCheckedRadioButtonId();
                    radioGButton1 = getActivity().findViewById(rSinal);
                    metodoSinal = radioGButton1.getText() == radioButton1.getText();

                    //Encontrar quantos sinais durante um ciclo
                    int cicloMarcado = radioGroup4.getCheckedRadioButtonId();
                    radioGButton4 = getActivity().findViewById(cicloMarcado);
                    if(radioGButton4.getText()==radioButton9.getText()){
                        quantSinal = 2;
                    }
                    else{
                        quantSinal = 1;
                    }

                    //Encontrar método de aquisição de tempo
                    int sinalMarcado = radioGroup2.getCheckedRadioButtonId();
                    radioGButton2 = getActivity().findViewById(sinalMarcado);
                    if (radioGButton2.getText()==radioButton3.getText()) {
                        aquisicao = true;
                        tempo = 3000;
                    }
                    else {
                        if(!textoTempo.getText().toString().equals("")) {
                            tempo = Long.parseLong(textoTempo.getText().toString());
                        }else{
                            tempo = 3000;
                        }
                        aquisicao = false;
                        //Toast.makeText(getActivity(), "Sinalizando a cada "+tempo/quantSinal+"ms.", Toast.LENGTH_SHORT).show();
                    }
                    String txtNome = nomeTXT.getText().toString();
                    Intent serviceIntent = new Intent(getActivity(),ServicoAudio.class);
                    serviceIntent.putExtra("tempo", tempo);
                    serviceIntent.putExtra("metodoSinal", metodoSinal);
                    serviceIntent.putExtra("tempoSinal", ts);
                    serviceIntent.putExtra("quantSinal", quantSinal);
                    serviceIntent.putExtra("aquisicao", aquisicao);
                    serviceIntent.putExtra("nomeTXT", txtNome);

                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        getActivity().startForegroundService(serviceIntent);
                    }
                    else {
                        getActivity().startService(serviceIntent);
                    }

                    radioButton1.setEnabled(false);
                    radioButton2.setEnabled(false);
                    radioButton3.setEnabled(false);
                    radioButton4.setEnabled(false);
                    radioButton5.setEnabled(false);
                    radioButton6.setEnabled(false);
                    radioButton7.setEnabled(false);
                    radioButton8.setEnabled(false);
                    radioButton9.setEnabled(false);
                    textoTempo.setEnabled(false);
                    nomeTXT.setEnabled(false);
                }
                else {
                    wakeLock.release();
                    //Toast.makeText(MainActivity.this, "Sinalização finalizada.", Toast.LENGTH_SHORT).show();
                    Intent serviceIntent = new Intent(getActivity(),ServicoAudio.class);
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        getActivity().startForegroundService(serviceIntent);
                    }
                    //stopService(serviceIntent);
                    try {
                        assert cameraId != null;
                        cameraManager.setTorchMode(cameraId, false);
                    } catch (CameraAccessException e) {
                        e.printStackTrace();
                    }

                    radioButton1.setEnabled(true);
                    radioButton2.setEnabled(true);
                    radioButton3.setEnabled(true);
                    radioButton4.setEnabled(true);
                    radioButton5.setEnabled(true);
                    radioButton6.setEnabled(true);
                    radioButton7.setEnabled(true);
                    radioButton8.setEnabled(true);
                    radioButton9.setEnabled(true);
                    textoTempo.setEnabled(true);
                    nomeTXT.setEnabled(true);
                }
            }
        });
        // Inflate the layout for this fragment
        return layout;
        //return inflater.inflate(R.layout.fragment_redeneural, container, false);
    }
}