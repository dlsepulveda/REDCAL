import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorMessageService } from 'src/app/Services/error-message.service';

@Component({
  selector: 'app-upload-capacitacion',
  templateUrl: './upload-capacitacion.component.html',
  styleUrls: ['./upload-capacitacion.component.scss'],
})
export class UploadCapacitacionComponent implements OnInit {
  formulario!: FormGroup;
  loading: boolean;
  image: any;
  public fechaActual = new Date();
  public fechaMinFin = new Date();
  constructor(
    private FormBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public delegado: any,
    private errorMessageService: ErrorMessageService
  ) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.formulario = this.FormBuilder.group({
      title: [, Validators.required],
      details: ['', Validators.required],
      link: ['', Validators.required],
      fecha: ['', Validators.required],
    });

    if(this.delegado.data){
      this.formulario.get('fecha')?.setValue(this.delegado.data.fecha);
      this.formulario.get('title')?.setValue(this.delegado.data.title);
      this.formulario.get('details')?.setValue(this.delegado.data.detail);
      this.formulario.get('link')?.setValue(this.delegado.data.link);
      this.formulario.get('fecha')?.setValue(this.delegado.data.fecha);
    }
  }

  public errorFormulario(campo: string): string {
    return this.errorMessageService.getObtenerMensajeErrorForm(
      campo,
      this.formulario
    );
  }

  public cambiarFechaMin($event: Date) {
    this.fechaMinFin = $event;
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
