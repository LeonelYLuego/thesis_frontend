import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const errorsRoutes: Routes = [
  {
    path: '404',
    component: NotFoundComponent,
  },
];

export default errorsRoutes;