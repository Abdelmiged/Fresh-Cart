import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from '../../../Services/Flowbite/flowbite.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../../Services/Authentication/authentication.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  constructor(private _FlowbiteService:FlowbiteService, protected _Authentication:AuthenticationService, private _Router:Router) {}

  ngOnInit(): void {
      this._FlowbiteService.loadFlowbite(flowbite => {})
  }
}
