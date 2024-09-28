import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { IArea } from 'src/app/data/interfaces/IArea';
import { AreaService } from 'src/app/data/services/area.service';
import { ModalCrearEditarAreaComponent } from './modal-crear-editar-area/modal-crear-editar-area.component';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent {
  areas: IArea[] = []; 
  editingUserId: number | null = null;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  displayedColumns: string[] = [ 'codigo','nombre','lider', 'estado','acciones'];
  dataSource = new MatTableDataSource<any>();

  constructor(private areaService: AreaService, private toastr: ToastrService, private dialog: MatDialog) {  }

  ngOnInit() {
    this.loadUsers();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async loadUsers() {
    this.areaService.getAreas().subscribe({
     next: (data) => {
       if (data) {
         this.dataSource.data = data;
         console.log(data,'CARGAR EMTREVISTA' )
         this.dataSource._updateChangeSubscription();
       } else {
         console.log('No se encontraron datos');
       }
     },
     error: (e) => {
       this.toastr.warning('Ha ocurrido un error al obtener las entrevistas', 'Alerta');
       console.log('Ha ocurrido un error');

     },
   });
 }
 openDialog(id: number) {
  if (id === 0) {
    const dialogRef = this.dialog.open(ModalCrearEditarAreaComponent, {
      width: '800px',
      disableClose: true,
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.areaService.createArea(result).subscribe({
          next: () => {
            this.toastr.success('Area creado con éxito', 'Éxito');
            this.loadUsers();
          },
          error: () => {
            this.toastr.error('Error al crear el Area', 'Error');
          }
        });
      }
    });
  } else {
    this.areaService.getAreaById(id).subscribe({
      next: (user) => {
        const dialogRef = this.dialog.open(ModalCrearEditarAreaComponent, {
          width: '800px',
          disableClose: true,
          data: user,
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.areaService.updateArea({ ...result, id }).subscribe({
              next: () => {
                this.toastr.success('Area actualizado con éxito', 'Éxito');
                this.loadUsers();
              },
              error: () => {
                this.toastr.error('Error al actualizar el Area', 'Error');
              }
            });
          }
        });
      },
      error: () => {
        this.toastr.error('Error al obtener los datos del Area', 'Error');
      }
    });
  }
}

createUser(user: IArea) {
  this.areaService.createArea(user).subscribe({
    next: () => {
      this.toastr.success('Area creado con éxito', 'Éxito');
      this.loadUsers();
    },
    error: () => {
      this.toastr.error('Error al crear el Area', 'Error');
    }
  });
}

updateUser(user: IArea) {
  this.areaService.updateArea(user).subscribe({
    next: () => {
      this.toastr.success('Area actualizado con éxito', 'Éxito');
      this.loadUsers();
    },
    error: () => {
      this.toastr.error('Error al actualizar el Area', 'Error');
    }
  });
}

deleteUser(id: number) {
  this.areaService.deleteArea(id).subscribe({
    next: () => {
      this.toastr.success('Area eliminado con éxito', 'Éxito');
      this.loadUsers(); 
    },
    error: (e) => {
      this.toastr.error('Error al eliminar el Area', 'Error');
      console.log('Error al Area el usuario', e);
    }
  });
}
}
