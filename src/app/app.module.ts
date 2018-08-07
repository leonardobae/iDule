import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import firebase from 'firebase';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { IntroPage } from '../pages/intro/intro';
import { MainPage } from '../pages/main/main';


import { CalendarModule, CalendarDateFormatter, CalendarEventTitleFormatter } from 'angular-calendar';
import { CalendarWeekHoursViewModule } from 'angular-calendar-week-hours-view';
import { CustomEventTitleFormatterProvider } from '../providers/custom-event-title-formatter/custom-event-title-formatter';
import { CustomDateFormatterProvider } from '../providers/custom-date-formatter/custom-date-formatter';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import localeKo from '@angular/common/locales/ko';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeKo);


export const firebaseConfig={
  apiKey: "AIzaSyDRQO5GT-57KfD0tI0SrmWo2miLAXV47rU",
  authDomain: "idule-5433b.firebaseapp.com",
  databaseURL: "https://idule-5433b.firebaseio.com",
  projectId: "idule-5433b",
  storageBucket: "idule-5433b.appspot.com",
  messagingSenderId: "780605404174"
}

firebase.initializeApp(firebaseConfig);


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    IntroPage,
    MainPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    IonicStorageModule.forRoot(),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot(),
    CalendarWeekHoursViewModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    IntroPage,
    MainPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatterProvider
    },
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatterProvider
    }
    
  ]
})
export class AppModule {}
