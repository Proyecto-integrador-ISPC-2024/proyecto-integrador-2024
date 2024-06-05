import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Route, UrlSegment } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAuth()) {
    return true;
  } else {
    alert("Por favor, inicia sesión antes de acceder a esta página.");
    const urltreeReturn = router.createUrlTree(['/']); //rediraccionamos a la landing page
    return urltreeReturn;
  }
};
/*  CODIGO A USAR PARA VERIFICAR SI EL USUARIO ESTA AUTENTICADO O NO, Y REDIRIGIRLO.
FIX HERE CUANDO TENGAMOS LA AUTENTICACIÓN CON TOKEN DESDE EL BACKEND.
if (authService.isLoggedIn()) {  // Verifica si el usuario está autenticado.
  return true;
} else {
  router.navigate(['/']);  // Redirige al usuario a la página de login si no está autenticado, sino podemos rediirigirlo a la landing page. 
  return false;
} */
