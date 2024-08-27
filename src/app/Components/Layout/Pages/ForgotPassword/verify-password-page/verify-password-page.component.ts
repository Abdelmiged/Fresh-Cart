import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../../Services/Authentication/authentication.service';

@Component({
  selector: 'app-verify-password-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './verify-password-page.component.html',
  styleUrl: './verify-password-page.component.scss'
})
export class VerifyPasswordPageComponent implements AfterViewInit {
  intervalID!:any;
  isLoading!:boolean;
  timer:number = 59;

  constructor(private _Authentication:AuthenticationService, private _Router:Router){}

  ngAfterViewInit(): void {
    if(typeof document !== typeof undefined) {
      let counter = document.querySelector(".time-counter");
      (counter as Element).textContent = "1:00";
      this.intervalID = setInterval(() => {
        (counter as Element).textContent = (this.timer > 10) ? `0:${this.timer}` : `0:0${this.timer}`;
        this.timer--;
        if(this.timer < 0) {
          clearInterval(this.intervalID);
        }
      }, 1000)
    }
  }

  verifyCodeForm:FormGroup = new FormGroup({
    resetCode: new FormControl('', [Validators.required]),
  });

  onSubmit():void {
    this.isLoading = true;
    this._Authentication.verifyCode(this.verifyCodeForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        this._Authentication.resetPasswordSignal.next({signalForgotPassword: true, signalVerifyPassword: true});
        this._Router.navigate(['/reset-password-page']);
      },
      error: (err) => {
        this.isLoading = false;
      }
    })
  }
}
