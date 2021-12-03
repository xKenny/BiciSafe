import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { AuthService } from "../services/auth.service";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ComentariosPage } from '../comentarios/comentarios.page';


interface MarkerType{
  position:{
    lat: number,
    lng: number,
  };
  title: string;
}

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  map: any;
  public nombre : string = "";
  public email : string = "";
  lati;
  long;
  locat;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  public markerOrigin: any;
  public markerDestin: any;

  constructor(private menu: MenuController,
    public router: Router,
    private auth: AuthService,
    private geolocation: Geolocation,
    public modalController : ModalController
    ) { 
  }

  ngOnInit() {
    this.loadMap();
    this.email = (this.auth.obtenerUsuario());
    this.auth.obtenerNombre(this.email).subscribe(response => this.nombre = response[0])
    this.loadsearchBar()
  }
  
  ionViewDidEnter(){
    this.menu.enable(true);
    this.menu.close();
  }

  loadsearchBar(){
    const input = document.getElementById("pac-input") as HTMLInputElement;
    const searchBox = new google.maps.places.SearchBox(input);
    let markers: google.maps.Marker[] = [];
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];

      const bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }
        let markernew = new google.maps.Marker({
          map : this.map,
          title: place.name,
          position: place.geometry.location,
          })
        markers.push(
          markernew
        );
        this.markerDestin = {lat: markernew.getPosition().lat(), lng: markernew.getPosition().lng()}
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      this.map.fitBounds(bounds);
    })
  }

  async loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // create LatLng object
    this.locat =await this.geolocation.getCurrentPosition()
    const myLatLng = {lat: this.locat.coords.latitude, lng: this.locat.coords.longitude};
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 18
    });

    this.directionsDisplay.setMap(this.map)
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      let marker = {
        position:{
          lat: myLatLng.lat,
          lng: myLatLng.lng,
        },
        title: "Marcador 1"
      }
      this.markerOrigin = myLatLng;
      this.addMarker(marker);
    });
  }

  addMarker(marker: MarkerType){
      return new google.maps.Marker({
        position: marker.position,
        map: this.map,
        title: marker.title
      });
  }

  trazarRuta(){
    this.directionsService.route({
      origin: this.markerOrigin,
      destination: this.markerDestin,
      travelMode: google.maps.TravelMode.DRIVING,
    },(response, status) =>{
      if(status === google.maps.DirectionsStatus.OK){
        this.directionsDisplay.setDirections(response);
      }else{
        alert('No se puede trazar la ruta debido a: ' + status);
      }
    });
  }

  async verComentarios(){
    const modal = await this.modalController.create({
      component: ComentariosPage
    });

    return await modal.present();
  }

  salir(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

