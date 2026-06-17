import { Routes } from '@angular/router';
import { RootLayoutComponent } from './layouts/root-layout';
import { LoginComponent } from './features/auth/login/login';
import { VisorPanoramaComponent } from './features/visor/visor-panorama/visor-panorama';

export const routes: Routes = [
  {
    path: '',
    component: RootLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
        pathMatch: 'full'
      },
      {
        path: 'visor',
        component: VisorPanoramaComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
