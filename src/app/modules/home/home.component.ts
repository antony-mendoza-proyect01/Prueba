import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/data/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


  menuRol = [
    {
      urlImagen: '/assets/img/usuarios.jpg',
      titulo: 'USUARIOS',
      contenido: 'Entra sesion podra visalizar,crear, editar y eliminar usuarios',
      ruta: '/User' 
    },
    {
      urlImagen: '/assets/img/areas.jpg',
      titulo: 'AREAS',
      contenido: 'Entra sesion podra visalizar,crear, editar y eliminar areas',
      ruta: '/Area' 
    },
    {
      urlImagen: '/assets/img/dashboard.jpg',
      titulo: 'DASHBOARD',
      contenido: 'Visualizacion de dashboard',
      ruta: '/Dashboard'
    }
  ];
}
