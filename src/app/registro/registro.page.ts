import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService, perfil } from '../services/auth.service'
import { Router } from '@angular/router';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { ModalController } from '@ionic/angular';
import { PoliticaPage } from "../politica/politica.page";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  image: any;
  fileImage: any;
  nombreImage: string;
  public email : string;
  public password : string;
  checked = false;
  newPerfil: perfil = {
    id :"",
    Nombres :"",
    Apellidos :"",
    Documento :"",
    Celular :"",
    Correo :"",
    Direccion :"",
    FechaNac : null,
    Foto : ""
  }

  constructor(private menu: MenuController,
    private authService : AuthService,
    public router: Router,
    private camera : Camera,
    public modalController: ModalController
    ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.menu.enable(false);
  }

  takePicture(){
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
      this.image = 'data:image/jpeg;base64,' + imageData;
      this.fileImage = this.base64ToImage(this.image);
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
    const data = this.newPerfil;
    this.nombreImage = "Profile" + data.Correo;
    const res = await this.authService.subirImagen(this.fileImage, this.nombreImage);
    data.Foto = (String)(res);
    data.id = this.authService.crearId();
    const enlace = 'perfiles';
    await this.authService.crearUsuario(data,enlace,data.id)
    this.authService.registro(data.Correo, this.password).then( authService =>{
      alert('Registro exitoso');
      this.router.navigate(['/login']);
    }).catch(err => alert(err))
  }

  cambiarCheck(){
    this.checked = !this.checked;
  }

  async onSubmitRegistro(){
    if(!this.checked){
      alert('Debes aceptar la política de tratamiento de datos')
      return null
    }
    
    const data = this.newPerfil;
    
    data.id = this.authService.crearId();
    
    const enlace = 'perfiles';
    this.authService.crearUsuario(data,enlace,data.id).then(auth =>{
    }).catch(err => alert(err))
    this.authService.registro(data.Correo, this.password).then( authService =>{
      alert('Registro exitoso');
      this.router.navigate(['/login']);
    }).catch(err => alert(err))
  }

  async abrirModal(){
    const modal = await this.modalController.create({
      component: PoliticaPage
    });

    return await modal.present();
  }
}
