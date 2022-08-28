import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MiscService {

  constructor(
    private router: Router
  ) { }

  converGramas(value: any){
    if(!value) return 0;
    return value / 1000
  }

  reloadPagina(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  
}
