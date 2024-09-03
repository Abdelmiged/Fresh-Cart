import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { tokenAuthenticationInterceptor } from './Interceptors/TokenAuthentication/token-authentication.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loaderSequenceInterceptor } from './Interceptors/LoaderSequence/loader-sequence.interceptor';
import { errorHandlerInterceptor } from './Interceptors/ErrorHandler/error-handler.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withViewTransitions()),provideAnimations(), provideToastr(), provideClientHydration(), provideHttpClient(withFetch(), withInterceptors([tokenAuthenticationInterceptor, errorHandlerInterceptor, loaderSequenceInterceptor])), importProvidersFrom(BrowserAnimationsModule, RouterModule, NgxSpinnerModule)]
};
