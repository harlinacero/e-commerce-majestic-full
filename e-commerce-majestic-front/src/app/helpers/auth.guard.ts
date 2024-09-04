import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';// Asegúrate de importar tu servicio de almacenamiento
import { StorageService } from '../services/storage.service';

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  const user = storageService.getUser()
  const allowedRoles = route.data['roles'] as Array<string>;

  if (storageService.isLoggedIn() && user) {
    if (allowedRoles.includes(user.rolename)) {
      return true;
    } else {
      router.navigate(['/component/forbidden']);
      return false;
    }
  } else {
    router.navigate(['/login']);
    return false;
  }
};