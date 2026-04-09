import { Routes } from '@angular/router';
import { NotFound } from '../pages/not-found/not-found';
import { Home } from '../pages/home/home';
import { Connection } from '../pages/connection/connection';

export const routes: Routes = [
  // Routgae vers la page "Home"
  {
    path: '',
    component: Home,
    title: 'LocMNS - Accueil',
  },
  // Routgae vers la page "Connection"
  {
    path: 'connection',
    component: Connection,
    title: 'LocMNS - Connexion',
  },
  // Routgae vers la page "Erreur 404"
  {
    path: '**',
    component: NotFound,
    title: '404 - Not Found',
  },
];
