import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Place } from '../photo/placeInterface';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the Marker page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-marker',
  templateUrl: 'marker.html',
})
export class Marker {
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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private photoViewer: PhotoViewer,
              private storage: Storage) {
                this.place.name = this.navParams.get('place').name;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Marker');
  }

  showPhoto() {
    let tmpPlace = this.navParams.get('place');
    this.photoViewer.show(tmpPlace.imgUrl);
  }

  removeMarker() {
    let tmpPlace = this.navParams.get('place');
    let i = -1;
    this.storage.get('places').then((val) => {
      let strArr = val;
      for (let p of val)
      {
        i++;
        this.place = JSON.parse(p);
         if (this.place.id == tmpPlace.id){
          strArr.splice(i, 1);
          this.storage.set('places', strArr);
        }
      }
     })
     this.navCtrl.pop();
  }

  close(){
    this.navCtrl.pop();
  }
}
