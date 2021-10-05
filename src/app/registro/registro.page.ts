import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(private menu: MenuController,
    private authService : AuthService
    ) { }

  public email : string;
  public password : string;

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.menu.enable(false);
  }

  onSubmitRegistro(){
    this.authService.registro(this.email, this.password).then( authService =>{
      console.log(authService)
    }).catch(err => console.log(err))
  }
}
