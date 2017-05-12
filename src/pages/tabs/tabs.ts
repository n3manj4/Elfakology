import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { PhotoPage } from '../photo/photo';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PhotoPage;
  tab3Root = AboutPage;

  constructor() {

  }

}
