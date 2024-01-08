import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '@auth/auth.service';

export const authGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  try {
    await authService.logged();
    return true;
  } catch {
    localStorage.clear();
    return router.navigateByUrl('/landing');
  }
};

export const notAuthGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  try {
    await authService.logged();
    return router.navigateByUrl('errors/404');
  } catch (ex: any) {
    return true;
  }
};
