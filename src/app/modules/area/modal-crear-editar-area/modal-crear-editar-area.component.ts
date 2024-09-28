import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IArea } from 'src/app/data/interfaces/IArea';

@Component({
  selector: 'app-modal-crear-editar-area',
  templateUrl: './modal-crear-editar-area.component.html',
  styleUrls: ['./modal-crear-editar-area.component.css']
})
export class ModalCrearEditarAreaComponent {
  form: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalCrearEditarAreaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IArea
  ) {
    this.isEditMode = !!data;
    this.form = this.fb.group({
      codigo: [data?.codigo || '', Validators.required],
      nombre: [data?.nombre || '', Validators.required],
      lider: [data?.lider || '', Validators.required],
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
