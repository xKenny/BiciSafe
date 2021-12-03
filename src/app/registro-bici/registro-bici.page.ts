import { Component, OnInit } from '@angular/core';
import {bici, BicicletasService} from '../services/bicicletas.service'
import { Router } from '@angular/router';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { AuthService } from "../services/auth.service";
import { MenuController } from '@ionic/angular';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-registro-bici',
  templateUrl: './registro-bici.page.html',
  styleUrls: ['./registro-bici.page.scss'],
})
export class RegistroBiciPage implements OnInit {

  public idUser;
  public nombre : string = "";
  public email : string;
  imageCostado: any;
  imageFrente: any;
  imageDoc: any;
  fileimageCostado: any;
  fileimageFrente: any;
  fileimageDoc: any;
  nombreimageCostado: string;
  nombreimageFrente: string;
  nombreimageDoc: string;

  newBici: bici = {
    id :"",
    idUsuario : "",
    marca :"",
    color :"",
    modelo :"",
    nroMarco :"",
    tipo :"",
    valor :"",
    imagenCost :"",
    imagenFren : "",
    imagenDoc : ""
  }
  constructor(private menu: MenuController,
    public db : BicicletasService,
    public router: Router,
    private camera : Camera,
    private auth: AuthService
    ) { }

  ngOnInit() {
    this.menu.enable(true);
    this.email = (this.auth.obtenerUsuario());
    this.auth.obtenerNombre(this.email).subscribe(response => this.nombre = response[0])
    this.auth.obtenerid(this.email).subscribe(response => this.newBici.idUsuario = response[0]);
  }

  ionViewDidEnter(){
    this.menu.enable(true);
    this.menu.close();
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
      this.fileimageCostado = this.base64ToImage(this.imageCostado);
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
      this.fileimageFrente = this.base64ToImage(this.imageFrente);
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
      this.fileimageDoc = this.base64ToImage(this.imageDoc);
    }, (err) =>{
      alert(err)
    })
  }

  base64ToImage(dataURI) {
    const fileDate = dataURI.split(',');
    // const mime = fileDate[0].match(/:(.*?);/)[1];
    const byteString = atob(fileDate[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: 'image/png' });
    return blob;
  }

  async registrar(){
    const data = this.newBici;
    data.id = this.db.crearId();
    this.nombreimageCostado = "Cost" + String(data.id);
    this.nombreimageFrente = "fren" + String(data.id);
    this.nombreimageDoc = "doc" + String(data.id);
    const res1 = await this.db.subirImagen(this.fileimageCostado, this.nombreimageCostado);
    const res2 = await this.db.subirImagen(this.fileimageFrente, this.nombreimageFrente);
    const res3 = await this.db.subirImagen(this.fileimageDoc, this.nombreimageDoc);
    data.imagenCost = (String)(res1);
    data.imagenFren = (String)(res2);
    data.imagenDoc = (String)(res3);
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
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
