import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { UploadCapacitacionComponent } from '../ui/upload-capacitacion/upload-capacitacion.component';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { FirebaseService } from './../../Services/firebase.service';
import * as moment from 'moment';
import { InscribirComponent } from '../ui/inscribir/inscribir.component';

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
    this.capacitacionItem = [];
    this.cuenta = this.authService.currentUserValue.value;
    this.FirebaseService.getAllCapacitacion().subscribe((res) => {
      if (res) {
        res.map((item) => {
          const data = {
            urlImage: item?.payload.doc.data().urlImage,
            title: item?.payload.doc.data().title,
            detail: item?.payload.doc.data().detail,
            uid: item?.payload.doc.id,
            link: item?.payload.doc.data().link,
            fecha: item?.payload.doc.data().fecha,
          };
          this.capacitacionItem.push(data);
        });
      }
      this.loading = true;
    });
  }

  loadEvent() {
    this.capacitacionItem = [];
    this.loading = false;
    this.FirebaseService.getAllEventos().subscribe((res) => {
      if (res) {
        res.map((item) => {
          const data = {
            urlImage: item?.payload.doc.data().urlImage,
            title: item?.payload.doc.data().title,
            detail: item?.payload.doc.data().detail,
            uid: item?.payload.doc.id,
            link: item?.payload.doc.data().link,
            fecha: item?.payload.doc.data().fecha,
          };
          this.capacitacionItem.push(data);
        });
      }
      this.loading = true;
    });
  }

  loadCapacitacion() {
    this.capacitacionItem = [];
    this.loading = false;
    this.FirebaseService.getAllCapacitacion().subscribe((res) => {
      if (res) {
        res.map((item) => {
          const data = {
            urlImage: item?.payload.doc.data().urlImage,
            title: item?.payload.doc.data().title,
            detail: item?.payload.doc.data().detail,
            uid: item?.payload.doc.id,
            link: item?.payload.doc.data().link,
            fecha: item?.payload.doc.data().fecha,
          };
          this.capacitacionItem.push(data);
        });
      }
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

  openModalEvento() {
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
                  fecha: moment(datos.fecha).format('DD-MM-YYYY'),
                  link: datos.link,
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
                  fecha: datos.fecha,
                  link: datos.link,
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

  remove(item: any) {
    this.FirebaseService.deleteCapacitacion(item.uid);
    this.uploadCapacitacion();
  }
  editar(item: any) {
    const dialogRef = this.dialog.open(UploadCapacitacionComponent, {
      width: 'auto',
      autoFocus: false,
      disableClose: true,
      height: 'auto',
      data: { aplicacion: this.uploadCapacitacion(), data: item },
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  inscribir(uid: string) {
    const dialogRef = this.dialog.open(InscribirComponent, {
      width: 'auto',
      autoFocus: false,
      disableClose: true,
      height: 'auto',
      data: { aplicacion: this.inscribirUser(), data: uid },
    });
  }

  inscribirUser() {
    const FirebaseService = this.FirebaseService;
    return (datos: any): any => {
      const data = {
        title: datos.title,
        detail: datos.details,
        fecha: datos.fecha,
        link: datos.link,
        uidCapacitacion: datos.uidCapacitacion,
      };
      return FirebaseService.createUserCapacitacion(data)
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        });
    };
  }
}
