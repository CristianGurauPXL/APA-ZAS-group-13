import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { TestPage } from './test-page/test-page';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'assessment/:id', component: TestPage },
];
