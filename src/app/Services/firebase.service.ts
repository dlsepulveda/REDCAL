import {
  collection,
  deleteDoc,
  doc,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { service, userdb } from '../core/entity/user/user.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  userCollection: AngularFirestoreCollection<userdb>;
  serviceCollection: AngularFirestoreCollection<service>;
  capacitacionCollection: AngularFirestoreCollection<any>;
  eventosCollection: AngularFirestoreCollection<any>;
  usercapacitacionCollection: AngularFirestoreCollection<any>;
  constructor(private db: AngularFirestore) {
    this.userCollection = db.collection('/user');
    this.serviceCollection = db.collection('/services');
    this.capacitacionCollection = db.collection('/capacitacion');
    this.eventosCollection = db.collection('/eventos');
    this.usercapacitacionCollection = db.collection('/userCapacitacion');
  }

  create(user: userdb) {
    return this.userCollection.add({ ...user });
  }

  getUser(colletion: string, uid: string): Observable<any> {
    return this.db
      .collection(colletion, (ref) => ref.where('uid', '==', uid))
      .valueChanges();
  }

  async createService(service: service) {
    const data = await this.serviceCollection.add({ ...service });
    data.update({ uid: data.id });
  }

  async createCapacitacion(capacitacion: any) {
    const data = await this.capacitacionCollection.add({ ...capacitacion });
    data.update({ uid: data.id });
  }

  deleteCapacitacion(document: string, collection:string) {
    return this.db.collection(collection).doc(document).delete();
  }

  deleteServices(document: string) {
    const doc = this.db.collection('services').doc(document).delete();
  }

  async createEventos(eventos: any) {
    const data = await this.eventosCollection.add({ ...eventos });
    data.update({ uid: data.id });
  }

  // updateService(service:service){
  //   return this.db.collection("usuarios").doc(service.uid).update({
  //     title: service.title,
  //     detail: service.detail,
  //     urlImage: service.urlImage,
  //   });
  // }

  delete(id: string) {
    return this.db.collection('usuarios').doc(id).delete();
  }

  getAllServices() {
    return this.serviceCollection.snapshotChanges().pipe();
  }

  getAllCapacitacion() {
    return this.capacitacionCollection.snapshotChanges().pipe();
  }

  getAllEventos() {
    return this.eventosCollection.snapshotChanges().pipe();
  }

  createUserCapacitacion(userCapacitacion: any) {
    return this.usercapacitacionCollection.add({ ...userCapacitacion });
  }

  updateCapacitacion(data: any) {
    this.capacitacionCollection.doc(data.uid).update({
      detail: data.detail,
      fecha: data.fecha,
      link: data.link,
      title: data.title,
      urlImage: data.urlImage,
    });
  }

  updateEvento(data: any) {
    this.eventosCollection.doc(data.uid).update({
      detail: data.detail,
      fecha: data.fecha,
      link: data.link,
      title: data.title,
      urlImage: data.urlImage,
    });
  }

  updateServices(data: any) {
    this.serviceCollection.doc(data.uid).update({
      detail: data.detail,
      title: data.title,
      urlImage: data.urlImage,
    });
  }
}
