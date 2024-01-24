import { Routes } from '@angular/router';
import { OAuthComponent } from './oauth/oauth.component';

const oauthRoutes: Routes = [
  {
    path: '',
    component: OAuthComponent,
  },
];

export default oauthRoutes;
