import { Routes } from '@angular/router';
import { authGuard, notAuthGuard } from '@core/guards/auth.guard';
import { LandingComponent } from '@lading/landing.component';
import { BaseComponent } from './shared/layout/base/base.component';

export const routes: Routes = [
  {
    path: 'landing',
    component: LandingComponent,
    canActivate: [notAuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('@auth/auth.routes'),
    canActivate: [notAuthGuard],
  },
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'errors',
        loadChildren: () => import('@errors/errors.routes'),
      },
      {
        path: '**',
        redirectTo: 'errors/404',
      },
    ],
    canActivate: [authGuard],
  },
];
