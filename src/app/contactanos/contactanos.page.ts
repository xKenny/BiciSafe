import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.page.html',
  styleUrls: ['./contactanos.page.scss'],
})
export class ContactanosPage implements OnInit {

  constructor(private menu: MenuController,
    public router: Router) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.menu.enable(true);
    this.menu.close();
  }

  salir(){
    this.router.navigate(['/login']);
  }
}
