import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { finalize, map } from "rxjs/operators";
import { AngularFireStorage } from "@angular/fire/storage";

export interface bici {
  id :string;
  marca :string;
  color :string;
  modelo :string;
  nroMarco :string;
  tipo :string;
  valor :string;
  imagenCost :string;
  imagenFren:string;
  imagenDoc :string;
}

@Injectable({
  providedIn: 'root'
})
export class BicicletasService {

  constructor(private db : AngularFirestore,
    private storage: AngularFireStorage) { }

  getBicicletas(){
    return this.db.collection("bicicletas").snapshotChanges().pipe(map(bicis => {
      return bicis.map(a =>{
        const data = a.payload.doc.data() as bici;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

  crearBicicleta<tipo>(data: tipo, enlace: string, id: string){
    const ref = this.db.collection("bicicletas");
    return ref.doc(id).set(data)
  }

  crearId(){
    return this.db.createId();
  }

  subirImagen(file : any, nombre: string){
    return new Promise<string>(resolve =>{
      const filePath= 'fotosBicis' + '/' + nombre;
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
