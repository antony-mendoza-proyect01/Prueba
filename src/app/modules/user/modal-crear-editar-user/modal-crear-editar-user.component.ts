import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUser } from 'src/app/data/interfaces/IUser';

@Component({
  selector: 'app-modal-crear-editar-user',
  templateUrl: './modal-crear-editar-user.component.html',
  styleUrls: ['./modal-crear-editar-user.component.css']
})
export class ModalCrearEditarUserComponent {
  form: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalCrearEditarUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser
  ) {
    this.isEditMode = !!data;
    this.form = this.fb.group({
      nombres: [data?.nombres || '', Validators.required],
      apellidos: [data?.apellidos || '', Validators.required],
      fechaNacimiento: [data?.fechaNacimiento || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      numeroDocumento: [data?.numeroDocumento || null, [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
      area: [data?.area || null, [Validators.required]],
      salario: [data?.salario || null, [Validators.required]],
      estado: [data?.estado || 'Activo'] 
    });
  }

  ngOnInit(): void {}

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value); 
    }
  }
  onCancel(): void {
    this.dialogRef.close(); 
  }
}
