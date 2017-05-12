import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { PhotoPage } from '../pages/photo/photo';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { Marker } from '../pages/marker/marker'

import { IonicStorageModule } from '@ionic/storage'
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera'
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    PhotoPage,
    HomePage,
    TabsPage,
    Marker
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    PhotoPage,
    HomePage,
    TabsPage,
    Marker
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    Camera,
    PhotoViewer,
    Storage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
