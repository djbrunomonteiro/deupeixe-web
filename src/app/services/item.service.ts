import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { Actions} from '@ngrx/effects';
import { Observable} from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private afs: Firestore, private actions$: Actions) {}

  async addItem(item: any){
    if(!item.tank){ return 'error not tank'}
    const itemRef = collection(this.afs, 'itens');
    const docREf = addDoc(itemRef, item.tank);
    return (await docREf).id;
  }

  getItens(): Observable<any[]> {
    const itemRef = collection(this.afs, 'itens');
    return collectionData(itemRef, { idField: 'id' }) as Observable<any[]>;
  }

  getItem(id: string): Observable<any[]> {
    const itemRef = doc(this.afs, `itens/${id}`);
    return docData(itemRef, { idField: 'id' }) as Observable<any[]>;
  }

  updateItem(item: any) {    
    const itemRef = doc(this.afs, `itens/${item.id}`);
    return setDoc(itemRef, item);
  }

  delItem(item: any) {
    const itemRef = doc(this.afs, `itens/${item.id}`);
    return deleteDoc(itemRef);
  }

  teste(idUser: string, item: any){
    const itemRef = collection(this.afs, `data/${idUser}/tanks`);
    // const docREf = addDoc(itemRef, item.tank);
    return addDoc(itemRef, item);
  }
}
