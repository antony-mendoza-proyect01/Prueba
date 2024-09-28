import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/data/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private router: Router,
    private authService: AuthService,
    private toast : ToastrService
  ){
  
  }
  
    logout() {
      this.authService.logout();
      this.router.navigate(['/Login']); // Redirige al usuario a la página de inicio de sesión
      this.toast.info('¡Has cerrado sesión!', 'Información');
    }
}
