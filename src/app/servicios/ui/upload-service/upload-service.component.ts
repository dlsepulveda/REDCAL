import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-service',
  templateUrl: './upload-service.component.html',
  styleUrls: ['./upload-service.component.scss'],
})
export class UploadServiceComponent implements OnInit {
  formulario!: FormGroup;
  loading: boolean;
  image: any;
  constructor(
    private FormBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public delegado: any
  ) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.formulario = this.FormBuilder.group({
      title: ['', Validators.required],
      details: ['', Validators.required],
      uid: [''],
    });

    if (this.delegado.data) {
      this.formulario.get('fecha')?.setValue(this.delegado.data.fecha);
      this.formulario.get('title')?.setValue(this.delegado.data.title);
      this.formulario.get('details')?.setValue(this.delegado.data.detail);
      this.formulario.get('link')?.setValue(this.delegado.data.link);
      this.formulario.get('fecha')?.setValue(this.delegado.data.fecha);
      this.formulario.get('uid')?.setValue(this.delegado.data.uid);
    }
  }

  file(imagen: any) {
    this.image = imagen.target.files[0];
  }

  submit() {
    if (this.delegado.data) {
      this.delegado.aplicacion(this.formulario.value, this.image);
    } else {
      this.loading = true;
      this.delegado(this.formulario.value, this.image);
    }
  }

  getErrorMessage() {
    if (this.formulario.get('title')?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.formulario.get('title')?.hasError('email')
      ? 'Not a valid email'
      : '';
  }
}
