import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/data/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  hidePassword = true;

  constructor(private router: Router,
    private fb: FormBuilder,
    private toast : ToastrService,
    private authService: AuthService 


  ){
    this.form = this.fb.group({
      id: [0],
      username: ['', Validators.required],
      password: ['',Validators.required],

    })
    this.form.valueChanges.subscribe(( e) => console.log(e))
  }


  login() {
    const { username, password } = this.form.value;
    this.authService.login(username, password).subscribe({
      next: (response) => {
        console.log(response, 'respuesta');
        this.router.navigate(['/Home']);
        this.toast.success('¡Inicio de sesión exitoso!', 'Bienvenido');
      },
      error: (error) => {
        console.log(error, 'respuesta');
        this.toast.error('Credenciales incorrectas', 'Error de autenticación');
      }
    });
  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
