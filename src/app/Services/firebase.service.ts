import {  collection, query, where } from "firebase/firestore";
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { userdb } from '../core/entity/user/user.module';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private dbPath = '/user'
  userCollection: AngularFirestoreCollection<userdb>;
  constructor(private db: AngularFirestore) { 
    this.userCollection = db.collection(this.dbPath);
  }

  create(user:userdb) {
    return this.userCollection.add({ ...user });
  }

  getUser(uid:string): Observable<any>{
    return this.db.collection("user", ref => ref.where("uid", "==", uid)).valueChanges();
  }

}
