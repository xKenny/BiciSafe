import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {

  public nombre : string = "";
  public email : string;

  constructor(private menu: MenuController,
    public router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    this.menu.enable(true);
    this.email = (this.auth.obtenerUsuario());
    this.auth.obtenerNombre(this.email).subscribe(response => this.nombre = response[0])
  }

  ionViewDidEnter(){
    this.menu.enable(true);
    this.menu.close();
  }

  salir(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
