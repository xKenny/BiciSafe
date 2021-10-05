import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email : string;
  password : string;

  constructor(private menu: MenuController, 
    private authService : AuthService,
    public router: Router
    ) { }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.menu.enable(false);
  }

  onSubmitLogin(){
    this.authService.login(this.email, this.password).then(res =>{
      this.router.navigate(['/mis-bicicletas']);
    }).catch(err => alert('Los datos ingresados son incorrectos'))
  }
}
