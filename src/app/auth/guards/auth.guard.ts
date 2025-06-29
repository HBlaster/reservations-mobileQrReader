import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('loginToken');

  if (token) {
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
};
