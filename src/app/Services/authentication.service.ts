import { userdb } from './../core/entity/user/user.module';
import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { user } from '../core/entity/user/user.module';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FirebaseService } from './firebase.service';
import { myStorage } from '../auth/my-storage/my-storage.module';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  response: boolean;
  
  
  constructor(private auth: Auth, private firebase:FirebaseService) {
    this.response=false;
  }

  login({ email, password }: user) {
    return signInWithEmailAndPassword(this.auth, email, password).then(() => {
      onAuthStateChanged(getAuth(), (user:any) => {
        if (user) {
          myStorage.setItem('RedcalAccessToken',user['accessToken']);
        }
      });
    });
  }

  register({ email, password, name, lastName }: user) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      () => {
        onAuthStateChanged(getAuth(), (user) => {
          if (user) {
            const User:userdb = {
              email: email,
              name: name,
              lastName: lastName,
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

  hasRoles(rol:string[]):boolean{
    if(!myStorage || !myStorage.getItem('RedcalAccessToken')){
      return false;
    }
    const decoded = jwtDecode<any>(
      myStorage.getItem('RedcalAccessToken')
    )
    const response:any = this.firebase.getUser('user',decoded.sub).subscribe(res=>{
        this.response = !!(decoded && rol.some((element)=> element = res[0].roles));
        return response;
        })
        return response;
  }

  isAuthenticated(): boolean {
    if(myStorage.getItem('RedcalAccessToken')){
      return true;
    }
    return false;
  }
}
