import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { MiscService } from './misc.service';

@Injectable({
  providedIn: 'root'
})
export class TankService {

  BASE_URL: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private misc: MiscService
  ) { }

  addOne(data: any): Observable<any> {
    return this.http.post(`${this.BASE_URL}/tank`, data).pipe(
      map(this.misc.extractData),
      catchError(this.misc.handleError)
    )
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/tank`).pipe(
      map(this.misc.extractData),
      catchError(this.misc.handleError)
    );
  }
}
