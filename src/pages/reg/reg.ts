import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ToastController } from 'ionic-angular';
//import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { SqlStorage } from "../../providers/sql-storage";
//import { SqlStorage } from "../../providers/sql-storage";
import { Storage } from "@ionic/storage";
import { HomePage } from "../home/home";
import { TabsPage } from '../tabs/tabs';


export interface User {
  id: string,
  username: string,
  email: string,
  password: string,
}

@Component({
  selector: 'page-reg',
  templateUrl: 'reg.html',
})
export class RegPage {
  loggedIn: boolean = false;
  userProfile: User = {
    id: '',
    username:'',
    email:'',
    password:''
  };
  //email:string;

//  public database: SQLite;
  public users: Array<Object>;

  public registrationForm:any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _form: FormBuilder,
              public storage: Storage,
              private platform: Platform,
              private sqlStorage: SqlStorage,
              private toastCtrl: ToastController) {

                this.platform = platform;

    this.registrationForm = this._form.group({
      "email": ['', [Validators.required, this.emailValidator.bind(this)]],
    //  "email": ['', Validators.required],
      "username": ['', Validators.required],
      "password": ['', [Validators.required, Validators.minLength(5)]]
    });



  }

    emailValidator(control: FormControl): {[s: string]: boolean} {
      if (!(control.value.toLowerCase().match('^[a-zA-Z]\\w*@gmail\\.com$') || control.value.toLowerCase().match('^[a-zA-Z]\\w*@yahoo\\.com$'))) {
        return {invalidEmail: true};
      }}

    registrationSubmit() {


    this.userProfile.email = this.registrationForm.value.email;
    this.userProfile.username = this.registrationForm.value.username;
    this.userProfile.password = this.registrationForm.value.password;
    this.userProfile.id = this.userProfile.username+this.userProfile.password;
    console.log(this.userProfile);
    console.log("---------------------");

    //this.sqlStorage.query(...);



    //this.sqlStorage.addUser(this.userProfile);
      //this.navCtrl.push(HomePage);

      let checkEmail: boolean=true;

      this.sqlStorage.gelAll2().then(data => {
        console.log(this.userProfile.email);
        let  i;
        for (i = 0; i < data.res.rows.length; i++) {
          console.log(data.res.rows.item(i).email);


          if(this.userProfile.email == data.res.rows.item(i).email)
          {
            //alert("Email vec postoji.");

            let toast1 = this.toastCtrl.create({
                  message: 'Email vec postoji',
                  duration: 3000,
                  position: 'bottom'
                });
                toast1.present();


            // checkEmail = false;
            return;
          }

        }
        this.sqlStorage.set(this.userProfile.id,this.userProfile.email,this.userProfile.username,this.userProfile.password);
        let toast2 = this.toastCtrl.create({
              message: 'Uspesna registracija ' + this.userProfile.username,
              duration: 1500,
              position: 'bottom'
            });

            setTimeout(()=>{

              this.navCtrl.setRoot(TabsPage);
            }, 1000);
            toast2.present();



      });
      console.log(checkEmail);
    }

    public refresh() {

        this.sqlStorage.gelAll2().then(data => {
          let  i;
          for (i = 0; i < data.res.rows.length; i++) {

            console.log(data.res.rows.item(i).username);
          }

        });

    }

    public addUser() {

      //console.log(this.email);

    }

  }
