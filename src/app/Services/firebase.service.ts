import {  collection, query, where } from "firebase/firestore";
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
  constructor(private db: AngularFirestore) { 
    this.userCollection = db.collection('/user');
    this.serviceCollection=db.collection('/services');
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

  getAllServices(){
    return this.serviceCollection.valueChanges();
  }

}
