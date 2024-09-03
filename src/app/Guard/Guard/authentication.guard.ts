import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../../Services/Authentication/authentication.service';
import { isPlatformServer } from '@angular/common';

export const authenticationGuard: CanActivateFn = (route, state) => {
  let _Authentication:AuthenticationService = inject(AuthenticationService);
  let _Router:Router = inject(Router);
  let platformID:Object = inject(PLATFORM_ID);
  if(_Authentication.userData.getValue() !== null) {
    return true;
  }
  return (isPlatformServer(platformID)) ? false : _Router.createUrlTree(['/login-page']);
};
