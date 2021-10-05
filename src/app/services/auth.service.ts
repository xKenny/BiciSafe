import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth : AngularFireAuth) { }

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
}
