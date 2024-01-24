import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '@auth/auth.service';
import { MaterialModule } from '@core/material.module';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
})
export class LogInComponent implements OnInit {
  logInForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-z.]*$/),
    ]),
    password: new FormControl('', [Validators.required]),
  });
  publicKey?: string;
  redirectTo?: string;

  constructor(
    private authService: AuthService,
    private matSnackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.publicKey = this.route.snapshot.queryParams['publicKey'];
    this.redirectTo = this.route.snapshot.queryParams['redirectTo'];
  }

  goSignUp(): void {
    this.router.navigate(['/', 'auth', 'sign-up'], {
      queryParams:
        this.publicKey && this.redirectTo
          ? { publicKey: this.publicKey, redirectTo: this.redirectTo }
          : undefined,
    });
  }

  async logIn(): Promise<void> {
    if (this.logInForm.valid) {
      const values = this.logInForm.value;
      try {
        const response = await this.authService.logIn({
          username: values.username!,
          password: values.password!,
        });
        localStorage.setItem('token', response.token);
        localStorage.setItem('account', JSON.stringify(response.account));
        if (this.publicKey && this.redirectTo)
          this.router.navigate(['/', 'oauth'], {
            queryParams: {
              publicKey: this.publicKey,
              redirectTo: this.redirectTo,
            },
          });
        else this.router.navigate(['/']);
      } catch (ex: any) {
        if (ex.status && ex.status == 401)
          this.matSnackBar.open(
            'Nombre de usuario o contraseña incorrecto',
            undefined,
            {
              verticalPosition: 'bottom',
              horizontalPosition: 'end',
              duration: 2000,
              panelClass: 'primary-snackbar',
            }
          );
      }
    }
  }
}
