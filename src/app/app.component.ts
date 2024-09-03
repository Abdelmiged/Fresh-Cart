import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./Components/Layout/navbar/navbar.component";
import { FooterComponent } from './Components/Layout/footer/footer.component';
import { isPlatformBrowser } from '@angular/common';
import { AuthenticationService } from './Services/Authentication/authentication.service';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'E-Commerce';
  constructor(@Inject(PLATFORM_ID) platform_id:Object, _Router:Router, _Authentication:AuthenticationService) {
    if(isPlatformBrowser(platform_id) && localStorage.getItem("userToken")) {
      _Authentication.decodeUserData();
      _Router.navigate([`/${localStorage.getItem("currentPage")}`]);
    }
  }
}
