import { Platform } from 'react-native';
import firebase from 'react-native-firebase';
import { serverData } from '../../api/ApiData';

const unitId =
Platform.OS === 'ios'
  ? serverData.iosAdmobIdInterintitial
  : serverData.androidAdmobIdInterintitial;

// ca-app-pub-3940256099942544/1033173712 => test id

const advert = firebase.admob().interstitial(unitId);

const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
request.addKeyword('foo').addKeyword('bar');

export const showAdMobInterstitial = () => {
  // Load the advert with our AdRequest
  advert.loadAd(request.build());

  advert.on('onAdLoaded', () => {
    console.log('Advert ready to show.');
  });

  advert.on('onAdFailedToLoad', error => {
      console.log('error is', error);
  });

  // Simulate the interstitial being shown "sometime" later during the apps lifecycle
  this.timer = setTimeout(() => {
    if (advert.isLoaded()) {
      advert.show();
    } else {
    // Unable to show interstitial - not loaded yet.
    }
  }, 2300);
};
