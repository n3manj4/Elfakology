import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Place } from '../photo/placeInterface';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-photo',
  templateUrl: 'photo.html'
})

export class PhotoPage {
  place: Place = {
    id: 0,
    name: '',
    imgUrl: '',
    coordinates: {
      lat: 0,
      lng: 0
    },
    //userId: ''
  };
  places: string[];

  constructor(public navCtrl: NavController,
              private camera: Camera,
              private photoViewer: PhotoViewer,
              public storage: Storage)
             {
            storage.get('lat').then((val) => {
              this.place.coordinates.lat = val;
              })
            storage.get('lng').then((val) => {
             this.place.coordinates.lng = val;
             })
            storage.get('places').then((val) => {
              this.places = val;
               })
            this.places = [];

  }

  takePicture() {
    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
    };

    this.camera.getPicture(options)
      .then(imgUrl => this.place.imgUrl = imgUrl);
  }

  showPhoto() {
    this.photoViewer.show(this.place.imgUrl);
    // this.storage.get('places').then((val) => {
    //   console.log(" pre: " + val);
    //    })
    // this.storage.clear();
    // this.storage.get('places').then((val) => {
    //   console.log(" posle " + val);
    //    })
  }

  addPlace() {
    if (this.places == null) this.places = [];
    this.place.id = Date.now();
    this.places.push(JSON.stringify(this.place));
    console.log(this.places);
    this.storage.set('places', this.places);
    this.navCtrl.parent.select(0);
  }

}
