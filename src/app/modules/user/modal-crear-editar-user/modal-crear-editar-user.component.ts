import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IArea } from 'src/app/data/interfaces/IArea';
import { IUser } from 'src/app/data/interfaces/IUser';
import { AreaService } from 'src/app/data/services/area.service';

@Component({
  selector: 'app-modal-crear-editar-user',
  templateUrl: './modal-crear-editar-user.component.html',
  styleUrls: ['./modal-crear-editar-user.component.css']
})
export class ModalCrearEditarUserComponent {
  form: FormGroup;
  isEditMode: boolean;
  areas: IArea[] = [];
  selectedArea: number | null = null; // Variable to hold the selected area ID

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalCrearEditarUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser,
    private areaService: AreaService
    
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

  ngOnInit(): void {
    this.getAreas(); // Fetch areas on initialization

  }

  getAreas() {
    this.areaService.getAreas().subscribe((data: IArea[]) => {
      this.areas = data;
    });
  }

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value); // Close dialog and return form value
    }
  }

  onCancel(): void {
    this.dialogRef.close(); // Just close the dialog
  }
}
