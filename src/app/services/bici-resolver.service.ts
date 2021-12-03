import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { bici } from "../services/bicicletas.service";
import { AuthService } from "../services/auth.service";
import { BicicletasService } from "../services/bicicletas.service";

@Injectable({
  providedIn: 'root'
})
export class BiciResolverService implements Resolve<bici[]>{
  id: string

  constructor(private authService : AuthService,
    private biciService : BicicletasService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<bici[]>{
    console.log("entre")
    const email = route.paramMap.get('email');
    console.log(email)
    // this.authService.obtenerid(email).subscribe(response => {this.id = response[0]
    //   console.log(this.id)
    //   this.biciService.getBicicletas(this.id).then( bicis => {
    //     console.log(bicis)
    //     return bicis;
    //   });
    // });
    
    return null
  }
}
