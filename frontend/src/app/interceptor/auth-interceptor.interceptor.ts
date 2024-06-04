// FiX HERE CUANDO TENGAMOS LA AUTENTICACIÓN CON TOKEN DESDE EL BACKEND.

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {  
  const authService = inject(AuthService);
  const token = authService.getToken(); // obtener el token del --> servicio de autenticación.

  if (token) {
    const clonedReq = req.clone({  // Clonamos la solicitud 
      setHeaders: { Authorization: `Bearer ${token}` } // agregamos el token en la cabecera de autorización si el token está.
    });
    return next(clonedReq);
  }

  return next(req);
};
