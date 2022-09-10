import { MiscService } from './misc.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, setDoc, doc, docData } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { IUser } from '../models/User';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  BASE_URL: string = environment.apiUrl;

  constructor(
    private afs: Firestore,
    private http: HttpClient,
    private misc: MiscService
  ) { }

  addUser(user: IUser): Observable<any> {
    let result= null;
    const userRef = doc(this.afs,"users", user.id);
    setDoc(userRef,user,{ merge: true } ).then((res)=>{
      result = user;
    })
    .catch(err => {
      result = err
      console.error(err)
    })
    return of(result)
  }

  addOne(data: IUser){
    return this.http.post(`${this.BASE_URL}/sign_up`, data)
  }

  getOne(id: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/user`, {})

    // const itemRef = doc(this.afs, `users/${id}`);
    // return docData(itemRef, { idField: 'id' })
   
  }
}
