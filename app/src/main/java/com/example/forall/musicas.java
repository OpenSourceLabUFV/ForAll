package com.example.forall;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.widget.SearchView;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.Objects;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link musicas#newInstance} factory method to
 * create an instance of this fragment.
 */

public class musicas extends Fragment {

    private SearchView musBusca;
    ListView listView;
    String[] mTitulo;
    String[] mBanda;
    String[] mTempos;
    String[][] listaMusicas;

    String[] fTitulo;
    String[] fBanda;
    String[] fTempos;
    int f;

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    public musicas() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment musicas.
     */
    // TODO: Rename and change types and number of parameters
    public static musicas newInstance(String param1, String param2) {
        musicas fragment = new musicas();
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
            // TODO: Rename and change types of parameters
            String mParam1 = getArguments().getString(ARG_PARAM1);
            String mParam2 = getArguments().getString(ARG_PARAM2);
        }
        listaMusicas = lerLista();
        mTitulo = new String[listaMusicas.length];
        mBanda = new String[listaMusicas.length];
        mTempos = new String[listaMusicas.length];
        for(int i = 0; i < listaMusicas.length;i++){
            mTitulo[i] = listaMusicas[i][1];
            mBanda[i] = listaMusicas[i][0];
            mTempos[i] = listaMusicas[i][2];
        }

        fTitulo = new String[0];
        fBanda = new String[0];
        fTempos = new String[0];
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View layout = inflater.inflate(R.layout.fragment_musicas, container, false);

        musBusca = layout.findViewById(R.id.searchview);
        listView = layout.findViewById(R.id.listView);

        musBusca.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                return false;
            }

            @Override
            public boolean onQueryTextChange(String newText) {
            if(newText.isEmpty()){
                MyAdapter adapter = new MyAdapter(getContext(), mTitulo, mBanda, mTempos);
                listView.setAdapter(adapter);

                listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                    @Override
                    public void onItemClick(AdapterView<?> adapterView, View view, int position, long id) {
                        Intent fragIntent = new Intent(getActivity(),MainActivity.class);
                        fragIntent.putExtra("tMusica", mTempos[position]);
                        fragIntent.putExtra("Titulo", mTitulo[position]);
                        Objects.requireNonNull(getActivity()).startActivity(fragIntent);
                    }
                });
            }else {
                f = 0;
                for (int i = 0; i < mTitulo.length; i++) {
                    if (mTitulo[i].toLowerCase().contains(newText.toLowerCase())) {
                        fTitulo = Arrays.copyOf(fTitulo,f+1);
                        fTitulo[f] = mTitulo[i];
                        fBanda = Arrays.copyOf(fBanda,f+1);
                        fBanda[f] = mBanda[i];
                        fTempos = Arrays.copyOf(fTempos,f+1);
                        fTempos[f] = mTempos[i];
                        f++;
                    }
                }
                if(f==0){
                    fTitulo = Arrays.copyOf(fTitulo,f+1);
                    fTitulo[f] = "Sem resultados";
                    fBanda = Arrays.copyOf(fBanda,f+1);
                    fBanda[f] = " ";
                    fTempos = Arrays.copyOf(fTempos,f+1);
                    fTempos[f] = " ";
                }
                MyAdapter adapter = new MyAdapter(getContext(), fTitulo, fBanda, fTempos);
                listView.setAdapter(adapter);

                listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                    @Override
                    public void onItemClick(AdapterView<?> adapterView, View view, int position, long id) {
                        Intent fragIntent = new Intent(getActivity(),MainActivity.class);
                        fragIntent.putExtra("tMusica", fTempos[position]);
                        fragIntent.putExtra("Titulo", fTitulo[position]);
                        Objects.requireNonNull(getActivity()).startActivity(fragIntent);
                    }
                });
            }
            return false;
            }
        });

        /*listView = layout.findViewById(R.id.listView);
        MyAdapter adapter = new MyAdapter(getContext(), mTitulo, mBanda, mTempos);
        listView.setAdapter(adapter);

        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int position, long id) {
                Intent fragIntent = new Intent(getActivity(),MainActivity.class);
                fragIntent.putExtra("tMusica", mTempos[position]);
                fragIntent.putExtra("Titulo", mTitulo[position]);
                Objects.requireNonNull(getActivity()).startActivity(fragIntent);
            }
        });*/

        // Inflate the layout for this fragment
        return layout;
        //return inflater.inflate(R.layout.fragment_musicas, container, false);
    }

    private String[][] lerLista() {
        String[][] matriz = new String[0][];
        try {
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(Objects.requireNonNull(getActivity()).getAssets().open("listamusicas.txt")));
            String mLine;
            int j = 0;
            while ((mLine = reader.readLine()) != null) {
                String[] matrizLinha = mLine.split("\t");
                matriz = Arrays.copyOf(matriz, matriz.length + 1);
                matriz[j] = matrizLinha;
                j = j + 1;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return matriz;
    }

    static class MyAdapter extends ArrayAdapter<String>{
        Context context;
        String[] rTitulo;
        String[] rBanda;
        String[] rTempos;

        MyAdapter (Context context, String[] titulo, String[] banda, String[] tempos){
            super(context, R.layout.lista, R.id.tituloLista, titulo);
            this.context = context;
            this.rTitulo = titulo;
            this.rBanda = banda;
            this.rTempos = tempos;

        }
        @NonNull
        @Override
        public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
            LayoutInflater layoutInflater;
            layoutInflater = (LayoutInflater) getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            @SuppressLint("ViewHolder") View lista = layoutInflater.inflate(R.layout.lista, parent, false);

            TextView myTitulo = lista.findViewById(R.id.tituloLista);
            TextView myBanda = lista.findViewById(R.id.bandaLista);
            TextView myTempos = lista.findViewById(R.id.temposLista);

            myTitulo.setText(rTitulo[position]);
            myBanda.setText(rBanda[position]);
            myTempos.setText(rTempos[position]);

            return lista;
        }
    }
}