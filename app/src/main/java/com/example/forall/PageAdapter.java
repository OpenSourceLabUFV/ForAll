package com.example.forall;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentPagerAdapter;

public class PageAdapter extends FragmentPagerAdapter {

    private int numtabs;

    public PageAdapter(@NonNull FragmentManager fm, int behavior,int numTabs) {
        super(fm, behavior);
        this.numtabs = numTabs;
    }

    @NonNull
    @Override
    public Fragment getItem(int position) {
        switch (position){
            case 0:
                return new redeneural();
            case 1:
                return new musicas();
            default:
                return null;
        }
    }

    @Override
    public int getCount() {
        return numtabs;
    }

    @Override
    public int getItemPosition(@NonNull Object object) {
        return POSITION_NONE;
    }
}
