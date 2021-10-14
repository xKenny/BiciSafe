import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { BicicletasService, bici } from "../services/bicicletas.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-mis-bicicletas',
  templateUrl: './mis-bicicletas.page.html',
  styleUrls: ['./mis-bicicletas.page.scss'],
})
export class MisBicicletasPage implements OnInit {

  public bicicletas : any = [];

  constructor(private menu: MenuController, 
    public biciService : BicicletasService,
    public router: Router) { }

  ngOnInit() {
    this.menu.enable(true);
    this.biciService.getBicicletas().subscribe( bicis => {
      this.bicicletas = bicis;
    })
    console.log(this.bicicletas)
  }
  ionViewDidEnter(){
    this.menu.enable(true);
    this.menu.close();
  }

  registrar(){
    this.router.navigate(['/registro-bici']);
  }

  salir(){
    this.router.navigate(['/login']);
  }
}
