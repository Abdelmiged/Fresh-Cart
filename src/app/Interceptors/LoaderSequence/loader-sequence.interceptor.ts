import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, } from 'rxjs';

export const loaderSequenceInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.method.match(/(POST|PUT|DELETE)/gi)) {
    return next(req);
  }

  let _NgxSpinnerService:NgxSpinnerService = inject(NgxSpinnerService);
  _NgxSpinnerService.show();

  return next(req).pipe(finalize(() => {
    _NgxSpinnerService.hide();
  }));
};
