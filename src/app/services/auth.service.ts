import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorage } from '@angular/fire/storage'
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

export interface perfil {
  id :string;
  Nombres :string;
  Apellidos :string;
  Documento :string;
  Celular :string;
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

  login(email:string, password:string): Promise<any>{
    
    return new Promise((resolve, rejected) => {
      this.AFauth.auth.signInWithEmailAndPassword(email, password).then(user =>{
        resolve(user)
      }).catch(err => rejected(err));
    });
  }

  logout(){
    this.AFauth.auth.signOut();
  }

  obtenerNombre(email: string){
    return this.db.collection("perfiles", ref => ref.where("Correo", '==', email)).snapshotChanges().pipe(map(perfiles => {
      return perfiles.map(a =>{
        const data = a.payload.doc.data() as perfil;
        data.id = a.payload.doc.id;
        return data.Nombres;
      })
    }))
  }
  obtenerid(email: string){
    return this.db.collection("perfiles", ref => ref.where("Correo", '==', email)).snapshotChanges().pipe(map(perfiles => {
      return perfiles.map(a =>{
        const data = a.payload.doc.data() as perfil;
        data.id = a.payload.doc.id;
        return data.id;
      })
    }))
  }

  obtenerDatos(email: string){
    return this.db.collection("perfiles", ref => ref.where("Correo", '==', email)).snapshotChanges().pipe(map(perfiles => {
      return perfiles.map(a =>{
        const data = a.payload.doc.data() as perfil;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

  registro(email:string, password: string){
    return new Promise((resolve,reject) => {
      this.AFauth.auth.createUserWithEmailAndPassword(email, password).then( res =>{
        resolve(res)
      }).catch( err => reject(err));
    });
  }

  obtenerUsuario(){
    return this.AFauth.auth.currentUser.email;
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
