import { Produto } from './../models/produto';
import { Injectable } from '@angular/core';
import { collectionData, CollectionReference, docData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, setDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {


  constructor(
    private afs: Firestore
  ) { }

  addProdutos(prod: any){
    
    const produto =  collection(this.afs, 'produto')
    return addDoc(produto, prod)
  }

  getProdutos(): Observable<any[]>{
    const produto = collection(this.afs, 'produto');
    return collectionData(produto, {idField: 'id'}) as Observable<any[]>;
  }

  getProduto(id: string){
    const produtoRef = doc(this.afs, `produto/${id}`);
    return docData(produtoRef, {idField: 'id'}) as Observable<any[]>;
  }

  updateProduto(produto: Produto){
    const produtoRef = doc(this.afs, `produto/${produto.id}`);
    return setDoc(produtoRef, produto);
  }

  delProduto(produto: Produto){
    const produtoRef = doc(this.afs, `produto/${produto.id}`);
    return deleteDoc(produtoRef);
  }
}
