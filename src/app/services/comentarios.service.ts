import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from 'rxjs/operators';
import { comentario } from "../shared/comentario"

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  comentarios : comentario[]

  constructor(private db : AngularFirestore) { }

  getBicicletas(){
    return this.db.collection("comentarios", ref=> ref.orderBy("Date")).snapshotChanges().pipe(map(comentarios => {
      return comentarios.map(a =>{
        const data = a.payload.doc.data() as comentario;
        return data;
      })
    }))
  }

  crearId(){
    return this.db.createId();
  }

  enviarMensaje<comentario>(coment: comentario){
    let id = this.crearId()
    const ref = this.db.collection("comentarios");
    return ref.doc(id).set(coment)
  }
}
