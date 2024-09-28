import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from 'src/app/data/interfaces/IUser';
import { UserService } from 'src/app/data/services/user.service';
import { ModalCrearEditarUserComponent } from './modal-crear-editar-user/modal-crear-editar-user.component';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  users: IUser[] = [];
  editingUserId: number | null = null;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  displayedColumns: string[] = [ 'nombres','apellidos', 'fechaNacimiento', 'email', 'numeroDocumento', 'area', 'salario', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<any>();

  constructor(private userService: UserService, private toastr: ToastrService, private dialog: MatDialog) {  }

  ngOnInit() {
    this.loadUsers();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async loadUsers() {
    this.userService.getUsers().subscribe({
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
    const dialogRef = this.dialog.open(ModalCrearEditarUserComponent, {
      width: '800px',
      disableClose: true,
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.createUser(result).subscribe({
          next: () => {
            this.toastr.success('Usuario creado con éxito', 'Éxito');
            this.loadUsers();
          },
          error: () => {
            this.toastr.error('Error al crear el usuario', 'Error');
          }
        });
      }
    });
  } else {
    this.userService.getUserById(id).subscribe({
      next: (user) => {
        const dialogRef = this.dialog.open(ModalCrearEditarUserComponent, {
          width: '800px',
          disableClose: true,
          data: user,
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            this.userService.updateUser({ ...result, id }).subscribe({
              next: () => {
                this.toastr.success('Usuario actualizado con éxito', 'Éxito');
                this.loadUsers();
              },
              error: () => {
                this.toastr.error('Error al actualizar el usuario', 'Error');
              }
            });
          }
        });
      },
      error: () => {
        this.toastr.error('Error al obtener los datos del usuario', 'Error');
      }
    });
  }
}

createUser(user: IUser) {
  this.userService.createUser(user).subscribe({
    next: () => {
      this.toastr.success('Usuario creado con éxito', 'Éxito');
      this.loadUsers();
    },
    error: () => {
      this.toastr.error('Error al crear el usuario', 'Error');
    }
  });
}

updateUser(user: IUser) {
  this.userService.updateUser(user).subscribe({
    next: () => {
      this.toastr.success('Usuario actualizado con éxito', 'Éxito');
      this.loadUsers();
    },
    error: () => {
      this.toastr.error('Error al actualizar el usuario', 'Error');
    }
  });
}

deleteUser(id: number) {
  this.userService.deleteUser(id).subscribe({
    next: () => {
      this.toastr.success('Usuario eliminado con éxito', 'Éxito');
      this.loadUsers(); 
    },
    error: (e) => {
      this.toastr.error('Error al eliminar el usuario', 'Error');
      console.log('Error al eliminar el usuario', e);
    }
  });
}
 
}
