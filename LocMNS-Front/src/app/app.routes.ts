import { Routes } from '@angular/router';
import { NotFound } from '../pages/not-found/not-found.component';
import { Home } from '../pages/home/home.component';
import { Login } from '../pages/login/login.component';
import { Equipments } from '../pages/equipments/equipments.component';
import { EquipmentInfo } from '../pages/equipment-info/equipment-info';
import { EquipmentBooking } from '../pages/equipment-booking/equipment-booking';
import { UserReservations } from '../pages/user-reservations/user-reservations';

export const routes: Routes = [
  // Routage vers la page "Home"
  {
    path: '',
    component: Home,
    title: 'LocMNS - Accueil',
  },
  // Routage vers la page "Login"
  {
    path: 'login',
    component: Login,
    title: 'LocMNS - Connexion',
  },
  // Routage vers la page "equipments"
  {
    path: 'equipments',
    component: Equipments,
    title: 'LocMNS - Equipements',
  },
  // Routage vers la page "equipment-info"
  {
    path: 'equipment-info/:id',
    component: EquipmentInfo,
    title: 'LocMNS - Informations Equipement',
  },
  // Routage vers la page "equipment-booking"
  {
    path: 'equipment-booking/:id',
    component: EquipmentBooking,
    title: 'LocMNS - Réservation Equipement',
  },
  // Routage vers la page "user-reservations"
  {
    path: 'user-reservations/:id',
    component: UserReservations,
    title: 'LocMNS - Espace utilisateur',
  },
  // Routage vers la page "Erreur 404"
  {
    path: '**',
    component: NotFound,
    title: '404 - Not Found',
  },
];
