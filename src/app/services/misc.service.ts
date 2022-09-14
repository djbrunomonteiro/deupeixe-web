import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MiscService {

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  converGramas(value: any){
    if(!value) return 0;
    return value / 1000
  }

  reloadPagina(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  notificacao(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      panelClass: ['snackbar'],
      horizontalPosition: "right",
      verticalPosition: "bottom"
    })

  }

  formataDataBr(data: string | number | Date){
    if(!data) {return;};
    const dataF = new Date(data).toLocaleDateString('pt-br', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
    if(dataF === 'Invalid Date'){return '';};
    return dataF;
  }

  getDataBr(data: string | number | Date){
    if(!data) {return;}
    const dataRef = new Date(data).toLocaleDateString('pt-br', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });

    if(dataRef === 'Invalid Date'){
      return '';
    }

    return dataRef;
  }

  checkError(res: any){
    if(res.hasOwnProperty('error')){
      console.error(res.message);
      return true;
    } else{
      return false;
    }
  }

  validJsonStr(str: any) {
    if(str === null || str === 'null') {return false;};
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  extractData(res: Response){
    const body = res;
    return body;
  }

  handleError(error: Response | any){
    let message: string;
    if (error instanceof Response){
      const err = error || '';
      message = `${error.status} - ${error.statusText} || '' ${err}`;
    } else {
      message = error.message ? error.message : error.toString();
    }
    return of(message);
  }

  
}
