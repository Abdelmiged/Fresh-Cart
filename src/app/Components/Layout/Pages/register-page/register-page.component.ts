import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../../../../Services/Authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  registerFailed!:boolean;
  isLoading!:boolean;
  constructor(private _Authentication:AuthenticationService, private _Router:Router){}

  registerForm:FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      rePassword: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^((\+20)|(0))?(10|11|12|15){1}[0-9]{8}$/)])
    }, this.isSamePassword)

  isSamePassword(formGroup: AbstractControl) {
    if(formGroup.get('password')?.value === formGroup.get('rePassword')?.value)
      return null;
    else {
      formGroup.get('rePassword')?.setErrors({mismatch: true});
      return {mismatch: true};
    }
  }

  onSubmit() {
    this.isLoading = true;
    this._Authentication.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.registerFailed = false;
        this._Router.navigate(["/login-page"]);
        this.isLoading = false;
      },
      error: (err) => {
        this.registerFailed = true;
        this.isLoading = false;
      },
    });
  }
}
