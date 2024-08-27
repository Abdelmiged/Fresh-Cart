import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../../Services/Authentication/authentication.service';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationSuccess } from '../../../../Interfaces/AuthenticationSuccess/authentication-success';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  loginFailed!:boolean;
  isLoading!:boolean;

  constructor(private _Authentication:AuthenticationService, private _Router:Router){}

  loginForm:FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  onSubmit() {
    this.isLoading = true;
    this._Authentication.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.loginFailed = false;
        this.isLoading = false;
        localStorage.setItem("userToken", (res as AuthenticationSuccess).token)
        this._Authentication.decodeUserData();
        this._Router.navigate(["/home-page"]);
      },
      error: (err) => {
        this.loginFailed = true;
        this.isLoading = false;
      }
    })
  }
}
