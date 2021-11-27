import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { BicicletasService, bici } from "../services/bicicletas.service";
import { Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { datosUsuario } from '../shared/datosUsuario';


@Component({
  selector: 'app-mis-bicicletas',
  templateUrl: './mis-bicicletas.page.html',
  styleUrls: ['./mis-bicicletas.page.scss'],
})
export class MisBicicletasPage implements OnInit {

  public bicicletas : any = [];
  public nombre : string = "";
  public email : string = "";
  private idUsuario : string = "";

  constructor(private menu: MenuController, 
    public biciService : BicicletasService,
    public router: Router,
    private auth: AuthService,
    public datoUsuario: datosUsuario) {
      this.email = this.datoUsuario.Email;
      this.nombre = this.datoUsuario.Nombre;
      this.idUsuario = this.datoUsuario.Id;
     }

  ngOnInit() {
    this.menu.enable(true);
  }
  
  async ionViewDidEnter(){
    this.menu.enable(true);
    this.menu.close();
    await this.biciService.getBicicletas(this.idUsuario).subscribe( bicis => {
      this.bicicletas = bicis;
    });
  }

  registrar(){
    this.router.navigate(['/registro-bici']);
  }

  salir(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
