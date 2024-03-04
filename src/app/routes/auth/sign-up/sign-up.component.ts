import { AccountsService } from '@accounts/accounts.service';
import { CreateAccountInterface } from '@accounts/models/account.interface';
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
import { MaterialModule } from '@core/material.module';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnInit {
  signUpForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-z.]*$/),
      Validators.maxLength(32),
    ]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.maxLength(64),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.maxLength(64),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{10}$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
      Validators.maxLength(64),
    ]),
    repeatPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
      Validators.maxLength(64),
    ]),
  });
  publicKey?: string;
  redirectTo?: string;

  constructor(
    private accountsService: AccountsService,
    private matSnackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.publicKey = this.route.snapshot.queryParams['publicKey'];
    this.redirectTo = this.route.snapshot.queryParams['redirectTo'];
  }

  validatePassword(): void {
    const passForm = this.signUpForm.controls.password;
    passForm.updateValueAndValidity();
    if (passForm.value)
      if (!/[a-z]/.test(passForm.value))
        passForm.setErrors({ lowerCase: true });
      else if (!/[A-Z]/.test(passForm.value))
        passForm.setErrors({ upperCase: true });
      else if (!/\d/.test(passForm.value)) passForm.setErrors({ number: true });
      else if (!/[a-zA-Z\d]{8,}/.test(passForm.value))
        passForm.setErrors({ minimum: true });
  }

  validateRepeatPassword(): void {
    const passForm = this.signUpForm.controls.repeatPassword;
    passForm.updateValueAndValidity();
    if (passForm.value)
      if (!/[a-z]/.test(passForm.value))
        passForm.setErrors({ lowerCase: true });
      else if (!/[A-Z]/.test(passForm.value))
        passForm.setErrors({ upperCase: true });
      else if (!/\d/.test(passForm.value)) passForm.setErrors({ number: true });
      else if (!/[a-zA-Z\d]{8,}/.test(passForm.value))
        passForm.setErrors({ minimum: true });
  }

  async signUp(): Promise<void> {
    this.signUpForm.controls.password.updateValueAndValidity();
    this.signUpForm.controls.repeatPassword.updateValueAndValidity();
    const values = this.signUpForm.value;
    if (values.password != values.repeatPassword) {
      this.signUpForm.controls.password.setErrors({ different: true });
      this.signUpForm.controls.repeatPassword.setErrors({ different: true });
    }

    if (this.signUpForm.valid) {
      try {
        delete values['repeatPassword'];
        await this.accountsService.create(values as CreateAccountInterface);
        if (this.publicKey && this.redirectTo)
          this.router.navigate(['/', 'auth', 'log-in'], {
            queryParams: {
              publicKey: this.publicKey,
              redirectTo: this.redirectTo,
            },
          });
        else this.router.navigate(['/', 'auth', 'log-in']);
      } catch (ex: any) {
        if (ex.status && ex.status == 400) {
          this.signUpForm.controls.username.setErrors({ incorrect: true });
          this.matSnackBar.open('Nombre de usuario ya existente', undefined, {
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
            duration: 2000,
            panelClass: 'primary-snackbar',
          });
        }
      }
    }
  }
}
