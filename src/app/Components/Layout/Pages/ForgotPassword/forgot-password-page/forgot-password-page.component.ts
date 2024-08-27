import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../../../Services/Authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password-page.component.html',
  styleUrl: './forgot-password-page.component.scss'
})
export class ForgotPasswordPageComponent {
  isLoading!:boolean;

  constructor(private _Authentication:AuthenticationService, private _Router:Router){}

  forgotPasswordForm:FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  onSubmit():void {
    this.isLoading = true;
    this._Authentication.resetPassword(this.forgotPasswordForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        this._Authentication.resetPasswordSignal.next({signalForgotPassword: true, signalVerifyPassword: false});
        this._Router.navigate(['/verify-password-page']);
      },
      error: (err) => {
        this.isLoading = false;
      }
    })
  }
}
