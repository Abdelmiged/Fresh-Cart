import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../../Services/Authentication/authentication.service';
import { inject } from '@angular/core';

export const verifyPasswordGuard: CanActivateFn = (route, state) => {
  let _Authentication:AuthenticationService = inject(AuthenticationService);
  let _Router:Router = inject(Router);
  if(_Authentication.resetPasswordSignal.getValue()?.signalForgotPassword && _Authentication.resetPasswordSignal.getValue()?.signalVerifyPassword) {
    _Authentication.resetPasswordSignal.next({signalForgotPassword: false, signalVerifyPassword: false});
    return true;
  }
  return _Router.createUrlTree(['/verify-password-page']);
};
