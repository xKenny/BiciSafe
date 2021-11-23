import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from "../services/auth.service";

declare var google;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  map = null;
  public nombre : string = "";
  public email : string;

  constructor(private menu: MenuController,
    public router: Router,
    private auth: AuthService) { 
  }

  ngOnInit() {
    this.loadMap();
    this.email = (this.auth.obtenerUsuario());
    this.auth.obtenerNombre(this.email).subscribe(response => this.nombre = response[0])
  }
  
  ionViewDidEnter(){
    this.menu.enable(true);
    this.menu.close();
  }

  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // create LatLng object
    const myLatLng = {lat: 4.658383846282959, lng: -74.09394073486328};
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
    });
  }

  salir(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
