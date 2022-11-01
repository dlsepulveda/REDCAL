import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-capacitacion',
  templateUrl: './upload-capacitacion.component.html',
  styleUrls: ['./upload-capacitacion.component.scss'],
})
export class UploadCapacitacionComponent implements OnInit {
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
    });
  }

  file(imagen: any) {
    this.image = imagen.target.files[0];
  }

  submit() {
    this.loading = true;
    this.delegado(this.formulario.value, this.image);
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
