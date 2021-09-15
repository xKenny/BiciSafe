import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-mis-bicicletas',
  templateUrl: './mis-bicicletas.page.html',
  styleUrls: ['./mis-bicicletas.page.scss'],
})
export class MisBicicletasPage implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {
    this.menu.enable(true);
  }
  ionViewDidEnter(){
    this.menu.enable(true);
    this.menu.close();
  }

}
