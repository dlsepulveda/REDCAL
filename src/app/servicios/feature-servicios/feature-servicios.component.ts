import { FirebaseService } from './../../Services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadServiceComponent } from '../ui/upload-service/upload-service.component';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-feature-servicios',
  templateUrl: './feature-servicios.component.html',
  styleUrls: ['./feature-servicios.component.scss'],
})
export class FeatureServiciosComponent implements OnInit {
  uploadPercent!: any;
  urlImage!: any;
  servicesItem: any;
  constructor(
    private dialog: MatDialog,
    private storage: AngularFireStorage,
    private FirebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.FirebaseService.getAllServices().subscribe(res=>{
      this.servicesItem = res;
    })
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
}
