import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.page.html',
  styleUrls: ['./contactanos.page.scss'],
})
export class ContactanosPage implements OnInit {

  
  public nombre : string = "";
  public email : string;

  constructor(private menu: MenuController,
    public router: Router,
    private auth: AuthService) { }

  ngOnInit() {
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
