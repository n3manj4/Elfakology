import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { Place } from '../photo/placeInterface';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Marker } from '../marker/marker';
import { LoginPage } from '../login-page/login-page';
import { Facebook } from '@ionic-native/facebook';
import { Logout } from '../logout/logout';

declare var google;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  lat: number;
  lng: number;
  place: Place;
  name: string;
  constructor(public navCtrl: NavController,
              public geolocation: Geolocation,
              private storage: Storage,
              private navParams: NavParams,
              private photoViewer: PhotoViewer,
              private fb: Facebook) {
              this.name = navParams.get('user');
  }

  ionViewDidLoad(){
    this.loadMap();
  }
  facebook()
  {
    this.navCtrl.push(LoginPage);
  }
  logout() {
    this.navCtrl.push(Logout,{'user' : this.name});
    //this.loggedIn = false;
  }
  
  addNewMarker()
  {

  this.storage.get('places').then((val) => {

      if (val != null){
      for (let place of val)
      {
        //console.log("JSOOOOON"+ place);
        this.place = JSON.parse(place);
        let latLng = new google.maps.LatLng(this.place.coordinates.lat, this.place.coordinates.lng);
        let marker = new google.maps.Marker({
          map: this.map,
          //animation: google.maps.Animation.DROP,
          id: this.place,
          position: latLng
        });

        google.maps.event.addListener(marker, 'click', () => {
          this.navCtrl.push(Marker, { 'place' : marker.id });
        });
    }
  }

})
  }



  loadMap(){

    this.geolocation.getCurrentPosition().then((position) => {

      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      let latLng = new google.maps.LatLng(this.lat, this.lng);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.storage.set('lat', this.lat);
      this.storage.set('lng', this.lng);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addNewMarker();
    }, (err) => {
      console.log(err);
    });

  }

  ionViewDidEnter()
  {
    this.loadMap();
  }
}
