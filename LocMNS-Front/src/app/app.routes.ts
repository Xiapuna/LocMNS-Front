import { Routes } from '@angular/router';
import { NotFound } from '../pages/not-found/not-found.component';
import { Home } from '../pages/home/home.component';
import { Login } from '../pages/login/login.component';

export const routes: Routes = [
  // Routgae vers la page "Home"
  {
    path: '',
    component: Home,
    title: 'LocMNS - Accueil',
  },
  // Routgae vers la page "Login"
  {
    path: 'login',
    component: Login,
    title: 'LocMNS - Connexion',
  },
  // Routgae vers la page "Erreur 404"
  {
    path: '**',
    component: NotFound,
    title: '404 - Not Found',
  },
];
