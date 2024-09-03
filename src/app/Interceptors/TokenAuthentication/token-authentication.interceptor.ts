import { HttpInterceptorFn } from '@angular/common/http';

export const tokenAuthenticationInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({
    headers: req.headers.append('token', localStorage.getItem("userToken") || '')
  })
  return next(req);
};
