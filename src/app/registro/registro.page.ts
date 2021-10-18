import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  image: string;
  public email : string;
  public password : string;

  constructor(private menu: MenuController,
    private authService : AuthService,
    public router: Router,
    private camera : Camera
    ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.menu.enable(false);
  }

  takePicture(){
    const options: CameraOptions = {
      quality: 100,
      targetWidth:480,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.camera.getPicture(options)
    .then((imageData) => {
      this.image = 'data:image/jpeg;base64,' + imageData;
    }, (err) =>{
      alert(err)
    })
  }

  onSubmitRegistro(){
    this.authService.registro(this.email, this.password).then( authService =>{
      console.log(authService);
      alert('Registro exitoso');
      this.router.navigate(['/login']);
    }).catch(err => alert(err))
  }
}
