import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Marker } from './marker';

@NgModule({
  declarations: [
    Marker,
  ],
  imports: [
    IonicPageModule.forChild(Marker),
  ],
  exports: [
    Marker
  ]
})
export class MarkerModule {}
