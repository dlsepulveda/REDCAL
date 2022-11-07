import { FirebaseService } from './../../Services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadServiceComponent } from '../ui/upload-service/upload-service.component';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-feature-servicios',
  templateUrl: './feature-servicios.component.html',
  styleUrls: ['./feature-servicios.component.scss'],
})
export class FeatureServiciosComponent implements OnInit {
  uploadPercent!: any;
  urlImage!: any;
  servicesItem: any[] = [];
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
    this.FirebaseService.getAllServices().subscribe((res) => {
      if(res){
        res.map(item=>{
          const data = {
            urlImage: item?.payload.doc.data().urlImage,
            title: item?.payload.doc.data().title,
            detail: item?.payload.doc.data().detail,
            uid: item?.payload.doc.id
          };
          this.servicesItem.push(data);
          this.loading = true;
        })
      }
    });
  }

  openModal() {
    const dialogRef = this.dialog.open(UploadServiceComponent, {
      width: 'auto',
      autoFocus: false,
      disableClose: true,
      height: 'auto',
      data: this.uploadServices(),
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  uploadServices() {
    const FirebaseService = this.FirebaseService;
    const storageService = this.storage;
    const id = Math.random().toString(36).substring(2);
    return (datos: any, file: string): any => {
      const filePath = `servicios/${id}`;
      const ref = storageService.ref(filePath);
      const task = storageService.upload(filePath, file);
      this.uploadPercent = task.percentageChanges();
      return task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            return (this.urlImage = ref.getDownloadURL().subscribe({
              next(x) {
                const data = {
                  urlImage: x,
                  title: datos.title,
                  detail: datos.details,
                  uid: '',
                };
                return FirebaseService.createService(data)
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
