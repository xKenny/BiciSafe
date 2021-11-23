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
  }
  cargarDatos(){
    this.datoUsuario.Email = this.email;
    this.authService.obtenerNombre(this.email).subscribe(response => this.datoUsuario.Nombre = response[0]);
    this.authService.obtenerid(this.email).subscribe(response => this.datoUsuario.Id = response[0]);
  }

  onSubmitLogin(){
    this.authService.login(this.email, this.password).then(res =>{
      this.cargarDatos()
      this.router.navigate(['/mapa']);
    }).catch(err => alert('Los datos ingresados son incorrectos'))
  }
}
