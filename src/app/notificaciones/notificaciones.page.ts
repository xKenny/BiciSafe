import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {

  constructor(private menu: MenuController,
    public router: Router) { }

  ngOnInit() {
    this.menu.enable(true);
  }

  ionViewDidEnter(){
    this.menu.enable(true);
    this.menu.close();
  }

  salir(){
    this.router.navigate(['/login']);
  }
}
