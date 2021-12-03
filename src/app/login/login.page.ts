import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router';
import { datosUsuario } from "../shared/datosUsuario";
import { BicicletasService } from '../services/bicicletas.service';

export var nombres : any[];
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  nombre: string;
  email : string;
  password : string;

  constructor(private menu: MenuController, 
    private authService : AuthService,
    public router: Router,
    public datoUsuario: datosUsuario,
    public biciService : BicicletasService
    ) { }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.menu.enable(false);
    this.datoUsuario.Email = "";
    this.datoUsuario.Id = "";
    this.datoUsuario.Nombre = "";
  }
  async cargarDatos(){
    this.datoUsuario.Email = this.email;
    console.log(this.email)
    await this.authService.obtenerNombre(this.email).subscribe(response => {
      this.datoUsuario.Nombre = response[0]
      console.log("login" + this.datoUsuario.Nombre)
    });
    await this.authService.obtenerid(this.email).subscribe(response => {
      this.datoUsuario.Id = response[0]
      console.log("login" + this.datoUsuario.Id)
    }
      );
  }

  async onSubmitLogin(){
    await this.cargarDatos()
    await this.authService.login(this.email, this.password).then(res =>{
      setTimeout(() => {
        console.log('sleep');
        this.router.navigate(['/mapa']);
      }, 3000);
    }).catch(err => alert('Los datos ingresados son incorrectos'))
  }
}
