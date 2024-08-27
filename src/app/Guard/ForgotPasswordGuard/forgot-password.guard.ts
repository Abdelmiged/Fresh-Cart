import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../../Services/Authentication/authentication.service';
import { inject } from '@angular/core';

export const forgotPasswordGuard: CanActivateFn = (route, state) => {
  let _Authentication:AuthenticationService = inject(AuthenticationService);
  let _Router:Router = inject(Router);
  if(_Authentication.resetPasswordSignal.getValue()?.signalForgotPassword)
    return true;
  return _Router.createUrlTree(["/forgot-password-page"]);
};
