import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';
import { LoginPage } from '../login-page/login-page';

export interface User {
  name: string,
  imgSrc: string,
}
@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class Logout {
  user: User = {
  imgSrc: '',
  name: ''
}
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:Storage, private fb:Facebook) {
    storage.get('user_photo').then((val) => {
      console.log(val);
      if (val != null){
        this.user.imgSrc = val.url;
        this.user.name = val.name;
      console.log(this.user.name);
    }
      })
  }


  logout() {
    this.storage.get('user_photo').then((val) => {
      if (val.data != null) {
        this.fb.logout();
        if (this.navCtrl.parent != null && this.navCtrl.parent.parent != null) this.navCtrl.parent.parent.setRoot(LoginPage);
        else if (this.navCtrl.parent != null) this.navCtrl.parent.setRoot(LoginPage);
        else this.navCtrl.setRoot(LoginPage);
        console.log("Logged out from fb");
        }
        else { this.navCtrl.parent.parent.setRoot(LoginPage);
        console.log("Logged out "); }
      })
  }
}
