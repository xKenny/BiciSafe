
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonContent } from '@ionic/angular';
import { comentario } from "../shared/comentario";
import { ComentariosService } from "../services/comentarios.service";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {

  @ViewChild(IonContent) contenido: IonContent
public comentarios : any;
email: string = "";
comentario : comentario = {
  mensaje :"",
  Date : null,
  Usuario : ""
}


  constructor(public modalCtr: ModalController,
    public comentariosServ : ComentariosService,
    private auth: AuthService) { }

  ngOnInit() {
    this.comentariosServ.getBicicletas().subscribe(comen => {
      this.comentarios = comen;
      this.comentarios.forEach(element => {
        element.Date = new Date(element.Date.seconds*1000);
        element.Date=element.Date.toDateString()
      });
    })
    this.email = (this.auth.obtenerUsuario());
    this.auth.obtenerNombre(this.email).subscribe(response => this.comentario.Usuario = response[0])
  }

  salirModal(){
    this.modalCtr.dismiss();
    
  }

  enviarComentario(){
    this.comentario.Date =new Date(Date.now())
    this.comentariosServ.enviarMensaje(this.comentario);
    this.scrollAbajo();
    this.comentario.mensaje = ""
  }

  scrollAbajo(){
    var final = document.getElementById("abajo").offsetTop;
    this.contenido.scrollByPoint(0,final+100,300)
  }
}
