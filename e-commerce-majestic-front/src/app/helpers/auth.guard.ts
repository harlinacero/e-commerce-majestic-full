import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';// Asegúrate de importar tu servicio de almacenamiento
import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = () => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  if (storageService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};