import { Component, OnInit } from '@angular/core';
import {bici, BicicletasService} from '../services/bicicletas.service'
import { Router } from '@angular/router';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

@Component({
  selector: 'app-registro-bici',
  templateUrl: './registro-bici.page.html',
  styleUrls: ['./registro-bici.page.scss'],
})
export class RegistroBiciPage implements OnInit {
  imageCostado: string;
  imageFrente: string;
  imageDoc: string;

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
    public router: Router,
    private camera : Camera
    ) { }

  ngOnInit() {
  }

  takePictureCostado(){
    const options: CameraOptions = {
      quality: 100,
      targetWidth:100,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.camera.getPicture(options)
    .then((imageData) => {
      this.imageCostado = 'data:image/jpeg;base64,' + imageData;
    }, (err) =>{
      alert(err)
    })
  }
  
  takePictureFrente(){
    const options: CameraOptions = {
      quality: 100,
      targetWidth:100,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.camera.getPicture(options)
    .then((imageData) => {
      this.imageFrente = 'data:image/jpeg;base64,' + imageData;
    }, (err) =>{
      alert(err)
    })
  }
  takePictureDoc(){
    const options: CameraOptions = {
      quality: 100,
      targetWidth:100,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.camera.getPicture(options)
    .then((imageData) => {
      this.imageDoc = 'data:image/jpeg;base64,' + imageData;
    }, (err) =>{
      alert(err)
    })
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
