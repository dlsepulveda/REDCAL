import { userdb } from './../core/entity/user/user.module';
import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { user } from '../core/entity/user/user.module';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  
  constructor(private auth: Auth, private firebase:FirebaseService) {}

  login({ email, password }: user) {
    return signInWithEmailAndPassword(this.auth, email, password).then(() => {
      onAuthStateChanged(getAuth(), (user) => {
        if (user) {
          this.firebase.getUser(user.uid).subscribe(user=>{
            console.log(user)
          });
        }
      });
    });
  }

  register({ email, password }: user) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      () => {
        onAuthStateChanged(getAuth(), (user) => {
          if (user) {
            const User:userdb = {
              email: email,
              roles: 'user',
              uid: user.uid
            }
            this.firebase.create(User);
          }
        });
      }
    );
  }

  logout() {
    return signOut(this.auth);
  }
}
