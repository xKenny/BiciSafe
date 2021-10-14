import { Component, OnInit } from '@angular/core';
import {bici, BicicletasService} from '../services/bicicletas.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-bici',
  templateUrl: './registro-bici.page.html',
  styleUrls: ['./registro-bici.page.scss'],
})
export class RegistroBiciPage implements OnInit {
  imgRes: any;
  options: any;

  newBici: bici = {
    id :"",
    marca :"",
    color :"",
    modelo :"",
    nroMarco :"",
    tipo :"",
    valor :"",
    imagen :""
  }
  constructor(public db : BicicletasService,
    public router: Router
    ) { }

  ngOnInit() {
  }

  registrar(){
    console.log(this.newBici.marca);
    const data = this.newBici;
    data.id = this.db.crearId();
    const enlace = 'bicicletas';
    this.db.crearBicicleta<bici>(data,enlace,data.id);
    this.newBici.marca= "";
    this.newBici.modelo = "";
    this.newBici.tipo= "";
    this.newBici.nroMarco = "";
    this.newBici.color= "";
    this.newBici.valor = "";
    alert('Registro exitoso!');
    this.router.navigate(['/mis-bicicletas']);
  }

  salir(){
    this.router.navigate(['/login']);
  }
}
