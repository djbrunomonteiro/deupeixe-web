/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, from } from 'rxjs';
import {
  catchError,
  map,
  tap,
  switchMap,
  retry,
  finalize,
  filter,
  take,
} from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { selectToken } from '../store/app-selectors';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  id_user = 0;
  token = '';
  refresh_token = '';

  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(private auth: AuthService, private store: Store) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.store.select(selectToken).subscribe((res) => {
      this.token = res?.token;
    });

    if (!request.headers.keys().length && this.token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${this.token}` },
      });
    }

    return next.handle(request).pipe(
      retry(3),
      catchError((err) => {
        let newRequest;
        if (err instanceof HttpErrorResponse && err.status === 401) {
          if (err.error.message === 'Token not found.') {
            newRequest = request.clone({
              setHeaders: { Authorization: `Bearer ${this.token}` },
            });
            return next.handle(newRequest);
          } else {
            return throwError(() => err);
          }
        } else {
          return throwError(() => err);
        }
      })
    );

    //  return next.handle(request)

    //     .pipe(retry(2),
    //         catchError(err => {
    //             let newRequest;
    //             if (err instanceof HttpErrorResponse && err.status === 401) {
    //                 if (err.error.message === 'Expired token') {
    //                     if (this.refreshTokenInProgress) {
    //                         return this.refreshTokenSubject.pipe(
    //                             filter(result => result !== null),
    //                             take(1),
    //                             switchMap(() => {
    //                                 newRequest = request.clone({ setHeaders: { Authorization: `Bearer ${this.token}` } });
    //                                 return next.handle(newRequest);
    //                             })
    //                         );
    //                     } else {
    //                         this.refreshTokenInProgress = true;
    //                         this.refreshTokenSubject.next(null);
    //                         const data = {
    //                             user_id: this.id_user,
    //                             refreshToken: this.refresh_token
    //                         };
    //                         return this.auth.refreshToken(data).pipe(
    //                             tap((res: any) => {
    //                                 if (res.token) {
    //                                     this.token = res.token;
    //                                     this.store.set('refresh_token', res.refresh);
    //                                     this.storage.set('access_token', this.token);
    //                                 }
    //                             }),
    //                             map(() => request.clone({ setHeaders: { Authorization: `Bearer ${this.token}` } })),
    //                             switchMap(() => {
    //                                 this.refreshTokenSubject.next(request);
    //                                 return next.handle(request);
    //                             }),
    //                             finalize(() => (this.refreshTokenInProgress = false))
    //                         );
    //                     }
    //                 } else if (err.error.message === 'Token not found.') {
    //                     newRequest = request.clone({ setHeaders: { Authorization: `Bearer ${this.token}` } });
    //                     return next.handle(newRequest);
    //                     // this.requestRefreshToken();
    //                 } else {
    //                     return throwError(err);
    //                 }
    //             } else {
    //                 return throwError(err);
    //             }
    //         })
    //     );
  }
}
