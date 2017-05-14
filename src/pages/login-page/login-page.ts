import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login-page.html',
})
export class LoginPage {
  FB_APP_ID: number = 686386604880696;

  constructor(public navCtrl: NavController, private storage: Storage,private fb: Facebook) {
    fb.browserInit(this.FB_APP_ID, "v2.9");
  }

  doFbLogin(){
    let permissions = new Array();
    let nav = this.navCtrl;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];


    this.fb.login(permissions)
    .then(function(response){
      let userId = response.authResponse.userID;
      let params = new Array();

      //Getting name and gender properties
      this.fb.api("/me?fields=name,gender", params)
      .then(function(user) {
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        //now we have the users info, let's save it in the NativeStorage
        this.storage.set('user',
        {
          name: user.name,
          gender: user.gender,
          picture: user.picture
        })
        .then(function(){
          nav.push(HomePage);
        }, function (error) {
          console.log(error);
        })
      })
    }, function(error){
      console.log(error);
    });
  }
}
