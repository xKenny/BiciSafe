import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorage } from '@angular/fire/storage'
import { finalize } from 'rxjs/operators';

export interface perfil {
  id :string;
  Nombres :string;
  Apellidos :string;
  Documento :string;
  Telefono :string;
  Correo :string;
  Direccion :string;
  FechaNac : Date;
  Foto :string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth : AngularFireAuth,
    private storage: AngularFireStorage,
    private db : AngularFirestore) { }

  login(email:string, password:string){
    
    return new Promise((resolve, rejected) => {
      this.AFauth.auth.signInWithEmailAndPassword(email, password).then(user =>{
        resolve(user)
      }).catch(err => rejected(err));
    });
  }

  registro(email:string, password: string){
    return new Promise((resolve,reject) => {
      this.AFauth.auth.createUserWithEmailAndPassword(email, password).then( res =>{
        resolve(res)
      }).catch( err => reject(err));
    });
  }

  crearUsuario<tipo>(data: tipo, enlace: string, id: string){
    try {
      const ref = this.db.collection("perfiles");
      console.log("me registre");
      return ref.doc(id).set(data);
    } catch (error) {
      console.error(error);
    }
  }

  crearId(){
    return this.db.createId();
  }

  subirImagen(file : any, nombre: string){
    return new Promise<string>(resolve =>{
      const filePath= 'fotosPerfil' + '/' + nombre;
      const ref= this.storage.ref(filePath);
      const task= ref.put(file);
      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe(res =>{
            const downloadURL = res;
            resolve(downloadURL);
            return;
          });
        })
      )
      .subscribe()
    }).catch(err =>{
      alert(err);
      console.log(err);
    })
  }
}
