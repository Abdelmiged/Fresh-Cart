import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../../../Services/Authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password-page.component.html',
  styleUrl: './reset-password-page.component.scss'
})
export class ResetPasswordPageComponent {
  isLoading!:boolean;
  constructor(private _Authentication:AuthenticationService, private _Router:Router){}

  resetPasswordForm:FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  onSubmit():void {
    this.isLoading = true;
    this._Authentication.newPassword(this.resetPasswordForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        localStorage.setItem("userToken", (res as {token:string}).token);
        this._Authentication.decodeUserData();
        this._Router.navigate(["/home-page"]);
      },
      error: (err) => {
        this.isLoading = false;
      }
    })
  }
}
