import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const detailsGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (isNaN(Number(route.params['id'])) || Number(route.params['id']) < 0) {
    router.navigateByUrl('');
    return false;
  } else {
    return true;
  }
};
