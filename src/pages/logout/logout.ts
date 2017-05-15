import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';
import { LoginPage } from '../login-page/login-page';

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class Logout {
  imgSrc: string;
  name: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:Storage, private fb:Facebook) {
    storage.get('user_photo').then((val) => {
      this.imgSrc = val.data.url;
      this.name = val.data.name;
      })
      console.log(this.name);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Logout');
    console.log(this.imgSrc);
  }

  logout() {
    this.storage.get('user_photo').then((val) => {
      if (val != null) {
        this.fb.logout();
        this.navCtrl.parent.parent.setRoot(LoginPage);
        console.log("Logged out from fb");
        }
      })
  }
}
