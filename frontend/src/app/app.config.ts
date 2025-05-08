import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter }                      from '@angular/router';
import { routes }                             from './app.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { AuthInterceptor }                    from './interceptor/auth-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    // 1) Importa HttpClient y di que use los interceptors de DI
    provideHttpClient(
      withInterceptorsFromDi()
    ),

    // 2) Registra tu interceptor como lo hacías antes
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
};