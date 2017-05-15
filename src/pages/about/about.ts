import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the About page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  @ViewChild('logo')
  public logo: ElementRef;

  appName: String = "Elfakology";
  nemanja: String = "Nemanja Miladinović - 14748";
  milan: String = "Milan Vasić - 14978";
  fax: String = "Faculty of Electronic Engineering in Niš";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngAfterViewInit() {
    this.drawLogo();
  }

  private drawLogo() {
    let context = this.logo.nativeElement.getContext('2d');

    // list
    context.lineWidth = 2;
    context.fillStyle = '#39b559';
    //context.lineJoin = 'miter';
    //context.lineCap = 'round';
    context.beginPath();
    context.moveTo(61, 120);
    context.lineTo(64, 105);
    context.bezierCurveTo(30, 80, 50, 50, 64, 20);
    context.bezierCurveTo(98, 80, 50, 50, 64, 105);
    context.lineTo(67, 120);
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = '#39b559';
    context.moveTo(64, 105);
    context.bezierCurveTo(98, 80, 78, 50, 64, 20);
    context.stroke();
    context.font = "20px Arial";
    context.strokeText(this.appName,20,140);
  }
}
