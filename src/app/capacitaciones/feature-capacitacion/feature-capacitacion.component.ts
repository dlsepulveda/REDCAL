import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { UploadCapacitacionComponent } from '../ui/upload-capacitacion/upload-capacitacion.component';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { FirebaseService } from './../../Services/firebase.service';

@Component({
  selector: 'app-feature-capacitacion',
  templateUrl: './feature-capacitacion.component.html',
  styleUrls: ['./feature-capacitacion.component.scss'],
})
export class FeatureCapacitacionComponent implements OnInit {
  uploadPercent!: any;
  urlImage!: any;
  capacitacionItem: any[] = [];
  cuenta: any;
  loading: boolean;
  constructor(
    private dialog: MatDialog,
    private storage: AngularFireStorage,
    private FirebaseService: FirebaseService,
    private authService: AuthenticationService
  ) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.cuenta = this.authService.currentUserValue.value;
    this.FirebaseService.getAllCapacitacion().subscribe((res) => {
      if (res) {
        res.map(item=>{
          const data = {
            urlImage: item?.payload.doc.data().urlImage,
            title: item?.payload.doc.data().title,
            detail: item?.payload.doc.data().detail,
            uid: item?.payload.doc.id,
          };
          this.capacitacionItem.push(data);
        })
        
      }else{
        this.capacitacionItem.push('no hay datos para mostrar');
      };
      this.loading = true;
    });
  }

  loadEvent() {
    this.capacitacionItem.pop();
    this.loading=false;
    this.FirebaseService.getAllEventos().subscribe((res) => {
      const data = {
        urlImage: res[0]?.payload.doc.data().urlImage,
        title: res[0]?.payload.doc.data().title,
        detail: res[0]?.payload.doc.data().detail,
        uid: res[0]?.payload.doc.id,
      };
      this.capacitacionItem.push(data);
      this.loading = true;
    });
  }

  loadCapacitacion(){
    this.capacitacionItem.pop();
    this.loading=false;
    this.FirebaseService.getAllCapacitacion().subscribe((res) => {
      const data = {
        urlImage: res[0]?.payload.doc.data().urlImage,
        title: res[0]?.payload.doc.data().title,
        detail: res[0]?.payload.doc.data().detail,
        uid: res[0]?.payload.doc.id,
      };
      this.capacitacionItem.push(data);
      this.loading = true;
    });
  }

  openModal() {
    const dialogRef = this.dialog.open(UploadCapacitacionComponent, {
      width: 'auto',
      autoFocus: false,
      disableClose: true,
      height: 'auto',
      data: this.uploadCapacitacion(),
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  openModalEvento(){
    const dialogRef = this.dialog.open(UploadCapacitacionComponent, {
      width: 'auto',
      autoFocus: false,
      disableClose: true,
      height: 'auto',
      data: this.uploadEvento(),
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  uploadCapacitacion() {
    const FirebaseService = this.FirebaseService;
    const storageService = this.storage;
    const id = Math.random().toString(36).substring(2);
    return (datos: any, file: string): any => {
      const filePath = `capacitacion/${id}`;
      const ref = storageService.ref(filePath);
      const task = storageService.upload(filePath, file);
      this.uploadPercent = task.percentageChanges();
      return task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            return (this.urlImage = ref.getDownloadURL().subscribe({
              next(x: any) {
                const data = {
                  urlImage: x,
                  title: datos.title,
                  detail: datos.details,
                  uid: '',
                };
                return FirebaseService.createCapacitacion(data)
                  .then(() => {
                    return true;
                  })
                  .catch(() => {
                    return false;
                  });
              },
            }));
          })
        )
        .subscribe();
    };
  }

  uploadEvento() {
    const FirebaseService = this.FirebaseService;
    const storageService = this.storage;
    const id = Math.random().toString(36).substring(2);
    return (datos: any, file: string): any => {
      const filePath = `eventos/${id}`;
      const ref = storageService.ref(filePath);
      const task = storageService.upload(filePath, file);
      this.uploadPercent = task.percentageChanges();
      return task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            return (this.urlImage = ref.getDownloadURL().subscribe({
              next(x: any) {
                const data = {
                  urlImage: x,
                  title: datos.title,
                  detail: datos.details,
                  uid: '',
                };
                return FirebaseService.createEventos(data)
                  .then(() => {
                    return true;
                  })
                  .catch(() => {
                    return false;
                  });
              },
            }));
          })
        )
        .subscribe();
    };
  }

  remove() {
    //throw new Error('Method not implemented.');
  }
  editar() {
    //throw new Error('Method not implemented.');
  }
}
