package com.example.forall;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.hardware.camera2.CameraAccessException;
import android.hardware.camera2.CameraManager;
import android.media.AudioFormat;
import android.media.AudioManager;
import android.media.AudioRecord;
import android.media.MediaRecorder;
import android.os.Build;
import android.os.Environment;
import android.os.IBinder;
import android.os.Vibrator;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.core.app.NotificationCompat;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;

import static java.lang.Math.cos;
import static java.lang.Math.sin;
import static java.lang.Math.sqrt;

public class ServicoAudio extends Service {
    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    //Declarar variáveis
    long tempo;
    String temposCalc, nomeTXT;
    boolean aquisicao = false;

    //Variáveis da sinalização.
    boolean luzAcesa = false; // Flag de luz acesa.
    boolean metodoSinal;
    int quantSinal;
    long tzero;
    int ts;
    private long tluz;
    CameraManager cameraManager;
    String cameraId;

    //Variáveis do áudio.
    //int fs = 44100;
    int fs = 11025;
    float razaofs = (float) 131072/44100;
    boolean cicloAtivo; // Indica se o ciclo está acontecendo.
    int bufferSize = AudioRecord.getMinBufferSize(fs,
            AudioFormat.CHANNEL_IN_MONO,
            AudioFormat.ENCODING_PCM_16BIT);
    AudioRecord record = new AudioRecord(MediaRecorder.AudioSource.DEFAULT,
            fs,
            AudioFormat.CHANNEL_IN_MONO,
            AudioFormat.ENCODING_PCM_16BIT,
            bufferSize);
    AudioManager am = null;

    //Declarar rede
    double[][] pesosIAoculto;
    double[][] viesesIAoculto;
    double[][] pesosIAsaida;
    double[][] viesesIAsaida;
    double[][] re;
    double[][] rs;

    @Override
    public void onCreate(){
        super.onCreate();
        //Ler rede.
        /*pesosIAoculto = lerAssets( "IW.txt");
        viesesIAoculto = lerAssets( "b0.txt");
        pesosIAsaida = lerAssets("LW.txt");
        viesesIAsaida = lerAssets("b1.txt");
        re = lerAssets("re.txt");
        rs = lerAssets("rs.txt");*/

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O)
            startMyOwnForeground();
        else {
            startForeground(22982004, new Notification());
        }

        cameraManager = (CameraManager) getSystemService(Context.CAMERA_SERVICE);
        try {
            cameraId = cameraManager.getCameraIdList()[0];
        } catch (CameraAccessException e) {
            e.printStackTrace();
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    private void startMyOwnForeground(){
        String NOTIFICATION_CHANNEL_ID = "com.example.ForAll";
        String channelName = "Calculando Tempo";
        NotificationChannel chan = new NotificationChannel(NOTIFICATION_CHANNEL_ID, channelName, NotificationManager.IMPORTANCE_NONE);
        chan.setLightColor(Color.BLACK);
        chan.setLockscreenVisibility(Notification.VISIBILITY_PRIVATE);
        NotificationManager manager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        assert manager != null;
        manager.createNotificationChannel(chan);

        NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(this, NOTIFICATION_CHANNEL_ID);
        Notification notification = notificationBuilder.setOngoing(true)
                .setSmallIcon(R.drawable.ic_stat_name)
                .setColor(this.getResources().getColor(R.color.colorPrimary))
                .setLargeIcon(BitmapFactory.decodeResource(this.getResources(),
                        R.drawable.iconeforall))
                .setContentTitle("ForAll")
                .setContentText("O Aplicativo está sinalizando o tempo.")
                .setPriority(NotificationManager.IMPORTANCE_MIN)
                .setCategory(Notification.CATEGORY_SERVICE)
                .build();
        startForeground(22982004, notification);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if(cicloAtivo){
            cicloAtivo = false;
            /*if(temposCalc != null) {
                gravarTXT("T "+nomeTXT);
            }*/
            stopSelf();
        }
        else {
            cicloAtivo = true;
            //nomeTXT = intent.getStringExtra("nomeTXT");
            tempo = intent.getLongExtra("tempo",3000);
            //Variáveis de sinal
            ts = intent.getIntExtra("tempoSinal",100); //tempo de sinalização
            metodoSinal = intent.getBooleanExtra("metodoSinal",true); //método de sinalização
            quantSinal = intent.getIntExtra("quantSinal",1);
            aquisicao = intent.getBooleanExtra("aquisicao",false);
            Toast.makeText(this, "Sinalizando a cada "+tempo/quantSinal+"ms.", Toast.LENGTH_SHORT).show();
            /*if(aquisicao){
                new Thread() {
                    @Override
                    public void run() {
                        gravarEtransformar();
                    }
                }.start();
            }*/
            new Thread() {
                @Override
                public void run() {
                    acionarSinal();
                }
            }.start();

        }
        return START_REDELIVER_INTENT;
    }
    @Override
    public void onDestroy() {
        super.onDestroy();
        cicloAtivo = false;
        /*if(temposCalc != null) {
            gravarTXT("T "+nomeTXT);
        }*/
    }

    private void gravarTXT(String nomeArq){
        File diretorio;
        String nomeDiretorio = "Tempos da Rede";
        String diretorioApp;

        diretorioApp = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS)
                + "/" + nomeDiretorio + "/";

        diretorio = new File(diretorioApp);
        diretorio.mkdirs();
        nomeArq = nomeArq+".txt";
        //Quando o File() tem um parâmetro ele cria um diretório.
        //Quando tem dois ele cria um arquivo no diretório onde é informado.
        File fileExt = new File(diretorioApp, nomeArq);

        //Cria o arquivo
        fileExt.getParentFile().mkdirs();

        //Abre o arquivo
        FileOutputStream fosExt = null;
        try {
            fosExt = new FileOutputStream(fileExt);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        //Escreve no arquivo
        try {
            assert fosExt != null;
            fosExt.write(temposCalc.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }

        //Obrigatoriamente você precisa fechar
        try {
            fosExt.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void acionarSinal() {
        long sinalizar;
        while (cicloAtivo) {
            sinalizar = tempo/quantSinal;
            if(System.currentTimeMillis()-tzero>=sinalizar) {
                tzero = System.currentTimeMillis();
                if (metodoSinal) {
                    Vibrator v = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
                    v.vibrate(ts);
                }
                else {
                    if(!luzAcesa) {
                        tluz = System.currentTimeMillis();
                        try {
                            assert cameraId != null;
                            cameraManager.setTorchMode(cameraId, true);
                        } catch (CameraAccessException e) {
                            e.printStackTrace();
                        }
                        luzAcesa = true;
                    }
                }
            }
            if(System.currentTimeMillis()-tluz>=ts && luzAcesa) {
                tluz = System.currentTimeMillis();
                try {
                    assert cameraId != null;
                    cameraManager.setTorchMode(cameraId, false);
                } catch (CameraAccessException e) {
                    e.printStackTrace();
                }
                luzAcesa = false;
            }
        }
    }

    private double[][] lerAssets(String arq) {
        double[][] matriz = new double[0][];
        try {
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(getAssets().open(arq)));
            String mLine;
            int j = 0;
            while ((mLine = reader.readLine()) != null) {
                String[] matrizLinha = mLine.split(" ");
                double[] linhaMatriz = new double[0];
                int k = 0;
                for (int i = 0; i < matrizLinha.length; i++) {
                    if (!matrizLinha[i].equals("")) {
                        linhaMatriz = Arrays.copyOf(linhaMatriz, linhaMatriz.length + 1);
                        String[] valorMatriz = matrizLinha[i].split("e");
                        float base = Float.parseFloat(valorMatriz[0]);
                        double pot = Double.parseDouble(valorMatriz[1]);
                        linhaMatriz[k] = base * Math.pow(10, pot);
                        k = k + 1;
                    }
                }
                matriz = Arrays.copyOf(matriz, matriz.length + 1);
                matriz[j] = linhaMatriz;
                j = j + 1;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return matriz;
    }

    private void gravarEtransformar() {
        int amostrasLen = (int) (fs*razaofs);
        int min = AudioRecord.getMinBufferSize(fs, AudioFormat.CHANNEL_IN_MONO, AudioFormat.ENCODING_PCM_16BIT);
        record = new AudioRecord(MediaRecorder.AudioSource.VOICE_COMMUNICATION, fs, AudioFormat.CHANNEL_IN_MONO,
                AudioFormat.ENCODING_PCM_16BIT, amostrasLen);
        //short[] lin = new short[min];
        short[] lin = new short[amostrasLen];
        am = (AudioManager) this.getSystemService(Context.AUDIO_SERVICE);
        assert am != null;
        am.setMode(AudioManager.MODE_IN_COMMUNICATION);
        try {
            record.startRecording();
        } catch (Exception e){
            Log.v("obtido", "exception", e);
        }

        //double[] freqs = new double[amostrasLen/2];

        temposCalc = tempo +" ";

        //double[] audioData = new double[min];
        double[] audioData = new double[amostrasLen];
        double[] iAudio = new double[amostrasLen];
        FFT fftFuncAudio = new FFT(amostrasLen);
        //double[][][] preTrig;
        double[] fftAudio = new double[amostrasLen/2];
        //double[] fftAudio2;
        //long tempo2;

        while (cicloAtivo) {
            record.read(lin, 0, amostrasLen);
            for (int i = 0; i < lin.length; i++){
                audioData[i] = lin[i];
                iAudio[i] = 0;
            }

            //long tRede = System.currentTimeMillis();

            normalizar(audioData);
            //temposCalc = temposCalc + Arrays.toString(audioData);

            //Teste da Transformada
            /*double fTeste = 60;
            for(int i = 0; i < amostrasLen; i++){
                audioData[i] = 10*cos(i*fTeste*2*Math.PI/fs);
            }*/

            fftFuncAudio.fft(audioData,iAudio);
            for(int i = 0;i<amostrasLen/2;i++){
                fftAudio[i]=2*sqrt(Math.pow(audioData[i],2)+Math.pow(iAudio[i],2))/amostrasLen;
            }
            double[] freqs = new double[amostrasLen/2];
            for(int i = 0;i<amostrasLen/2;i++){
                freqs[i] = (float) i *fs/amostrasLen;
            }

            tempo = 2*aplicarIA(definirEntradas(fftAudio,freqs));
            //tempo2 = 2*aplicarIA(definirEntradas(fftAudio2,freqs));

            //tRede = System.currentTimeMillis()-tRede;
            //Log.v("tempo", String.valueOf(tRede));

            //temposCalc = temposCalc + tempo +" ";
            //temposCalc = temposCalc + tRede +" ";
            //Log.v("obtido", String.valueOf(tempo));
        }
        record.stop();
        record.release();
    }

    private void normalizar(double[] audio){
        double Vrms = 0;
        for (double v : audio) {
            Vrms = Vrms + Math.pow(v,2);
        }
        Vrms = sqrt(Vrms/audio.length);
        for(int i=0; i<audio.length;i++){
            audio[i] = audio[i]/Vrms;
        }
    }

    private double[] definirEntradas(double[] fftAudio,double[] freqs){
        int ins = 25;
        double[] entradas = new double[ins];
        for(int i = 0;i<ins;i++){
            double n = 0;
            for(int j=0;j<fftAudio.length;j++){
                if(freqs[j]>=(50+10*i)&&freqs[j]<(60+10*i)){
                    entradas[i] = entradas[i]+fftAudio[j];
                    n = n+1;
                }
            }
            entradas[i]=entradas[i]/n;
        }
        return entradas;
    }

    private long aplicarIA(double[] entradas){

        double[] camadaOculta = new double[pesosIAoculto.length];

        double[] entNorm = new double[entradas.length];
        for(int n = 0; n<pesosIAoculto.length; n++){
            for(int i = 0; i<entradas.length; i++){
                entNorm[i] = normEntradas(entradas[i],re[i][0],re[i][1]);
                camadaOculta[n]=camadaOculta[n]+entNorm[i]*pesosIAoculto[n][i];
            }
            camadaOculta[n]=Math.tanh(camadaOculta[n]+viesesIAoculto[n][0]);
        }

        double camadaSaida = 0;
        for(int i = 0; i<camadaOculta.length; i++){
            camadaSaida = camadaSaida+camadaOculta[i]*pesosIAsaida[0][i];
        }
        camadaSaida = camadaSaida+viesesIAsaida[0][0];
        camadaSaida = normSaida(camadaSaida,rs[0][0],rs[0][1]);
        return (long) (camadaSaida*1000);
    }

    private double normEntradas(double valor, double min, double max) {
        return ((valor-min)*2)/(max-min)-1;
    }

    private double normSaida(double valor, double min, double max) {
        return (valor+1)*(max-min)/2+min;
    }

    public static class FFT {

        int n, m;

        // Lookup tables. Only need to recompute when size of FFT changes.
        double[] cos;
        double[] sin;

        public FFT(int n) {
            this.n = n;
            this.m = (int) (Math.log(n) / Math.log(2));

            // Make sure n is a power of 2
            if (n != (1 << m))
                throw new RuntimeException("FFT length must be power of 2");

            // precompute tables
            cos = new double[n / 2];
            sin = new double[n / 2];

            for (int i = 0; i < n / 2; i++) {
                cos[i] = Math.cos(-2 * Math.PI * i / n);
                sin[i] = Math.sin(-2 * Math.PI * i / n);
            }

        }

        public void fft(double[] x, double[] y) {
            int i, j, k, n1, n2, a;
            double c, s, t1, t2;

            // Bit-reverse
            j = 0;
            n2 = n / 2;
            for (i = 1; i < n - 1; i++) {
                n1 = n2;
                while (j >= n1) {
                    j = j - n1;
                    n1 = n1 / 2;
                }
                j = j + n1;

                if (i < j) {
                    t1 = x[i];
                    x[i] = x[j];
                    x[j] = t1;
                    t1 = y[i];
                    y[i] = y[j];
                    y[j] = t1;
                }
            }

            // FFT
            n1 = 0;
            n2 = 1;

            for (i = 0; i < m; i++) {
                n1 = n2;
                n2 = n2 + n2;
                a = 0;

                for (j = 0; j < n1; j++) {
                    c = cos[a];
                    s = sin[a];
                    a += 1 << (m - i - 1);

                    for (k = j; k < n; k = k + n2) {
                        t1 = c * x[k + n1] - s * y[k + n1];
                        t2 = s * x[k + n1] + c * y[k + n1];
                        x[k + n1] = x[k] - t1;
                        y[k + n1] = y[k] - t2;
                        x[k] = x[k] + t1;
                        y[k] = y[k] + t2;
                    }
                }
            }
        }
    }
}