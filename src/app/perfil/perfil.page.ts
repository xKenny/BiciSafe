import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService, perfil } from "../services/auth.service";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public nombre : string = "";
  public email : string;

  perfilInfo : perfil[] = [{
    id : "",
    Nombres : "",
    Apellidos : "",
    Correo : "",
    Direccion : "",
    FechaNac : null,
    Celular : "",
    Documento :"",
    Foto : ""
  }]

  constructor(private menu: MenuController,
    public router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    this.email = (this.auth.obtenerUsuario());
    this.auth.obtenerNombre(this.email).subscribe(response => this.nombre = response[0])
    this.auth.obtenerDatos(this.email).subscribe(perfil => {
      this.perfilInfo = perfil;
      console.log(this.perfilInfo)
    })
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
