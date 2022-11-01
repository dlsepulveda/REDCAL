import {  collection, deleteDoc, doc, query, updateDoc, where } from "firebase/firestore";
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { service, userdb } from '../core/entity/user/user.module';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  userCollection: AngularFirestoreCollection<userdb>;
  serviceCollection: AngularFirestoreCollection<service>;
  capacitacionCollection: AngularFirestoreCollection<any>;
  eventosCollection: AngularFirestoreCollection<any>;
  constructor(private db: AngularFirestore) { 
    this.userCollection = db.collection('/user');
    this.serviceCollection=db.collection('/services');
    this.capacitacionCollection=db.collection('/capacitacion');
    this.eventosCollection=db.collection('/eventos');
  }

  create(user:userdb) {
    return this.userCollection.add({ ...user });
  }

  getUser(colletion:string ,uid:string): Observable<any>{
    return this.db.collection(colletion, ref => ref.where("uid", "==", uid)).valueChanges();
  }

  createService(service:service){
    return this.serviceCollection.add({ ...service });
  }

  createCapacitacion(capacitacion: any){
    return this.capacitacionCollection.add({ ...capacitacion });
  }

  createEventos(eventos: any){
    return this.eventosCollection.add({ ...eventos });
  }

  updateService(service:service){
    return this.db.collection("usuarios").doc(service.uid).update({
      title: service.title,
      detail: service.detail,
      urlImage: service.urlImage,
    });
  }

  delete(id: string) {
    return this.db.collection("usuarios").doc(id).delete();
  }

  getAllServices(){
    return this.serviceCollection.snapshotChanges().pipe();
  }

  getAllCapacitacion(){
    return this.capacitacionCollection.snapshotChanges().pipe();
  }

  getAllEventos(){
    return this.eventosCollection.snapshotChanges().pipe();
  }

}
