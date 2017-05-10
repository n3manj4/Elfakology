import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Place } from '../photo/placeInterface';

@Component({
  selector: 'page-photo',
  templateUrl: 'photo.html'
})

export class PhotoPage {
  place: Place = {
    id: Date.now(),
    name: '',
    imgUrl: '',
    coordinates: {
      lat: 0,
      lng: 0
    },
    userId: ''
  };
  constructor(public navCtrl: NavController,
              private camera: Camera,
              private photoViewer: PhotoViewer) {

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
    }
}
