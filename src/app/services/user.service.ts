import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, setDoc, doc, docData } from '@angular/fire/firestore';
import { Observable, map, from } from 'rxjs';
import { IUser } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private afs: Firestore
  ) { }

  addUser(user: IUser): Promise<any>{
    return new Promise((resolve, reject)=>{
      setDoc(doc(this.afs, "users", user.id), user)
        .then((res)=>  resolve(res))
        .catch(err => reject(err))
    })
  }

  getUser(id: string): Observable<any> {
    const itemRef = doc(this.afs, `users/${id}`);
    return docData(itemRef, { idField: 'id' })
   
  }
}
