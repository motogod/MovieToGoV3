import React from 'react';
import { Platform } from 'react-native';
import firebase from 'react-native-firebase';
import { serverData } from '../../api/ApiData';

const Banner = firebase.admob.Banner;
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();

const unitId =
Platform.OS === 'ios'
  ? serverData.iosAdmobId
  : serverData.androidAdmobId;

const AdMobBanner = () => {
  return (
    <Banner
      unitId={unitId}
      size={'SMART_BANNER'}
      request={request.build()}
      onAdLoaded={() => {
      console.log('Advert loaded');
    }}
    />
  );
};

export default AdMobBanner;
