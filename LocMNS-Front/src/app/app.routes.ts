import { Routes } from '@angular/router';
import { NotFound } from '../pages/not-found/not-found.component';
import { Home } from '../pages/home/home.component';
import { Login } from '../pages/login/login.component';
import { Equipments } from '../pages/equipments/equipments.component';
import { EquipmentInfo } from '../pages/equipment-info/equipment-info';
import { EquipmentBooking } from '../pages/equipment-booking/equipment-booking';
import { UserReservations } from '../pages/user-reservations/user-reservations';
import { UserDashboard } from '../pages/user-dashboard/user-dashboard';
import { userGuard } from './guards/user-guard';
import { adminGuard } from './guards/admin-guard';
import { AdminRequests } from '../pages/admin/admin-requests/admin-requests';
import { AdminDashboard } from '../pages/admin/admin-dashboard/admin-dashboard';

export const routes: Routes = [
  // Routage vers la page "Home"
  {
    path: '',
    component: Home,
    canActivate: [userGuard],
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
    canActivate: [userGuard],
    title: 'LocMNS - Equipements',
  },
  // Routage vers la page "equipment-info"
  {
    path: 'equipment-info/:equipmentId',
    component: EquipmentInfo,
    canActivate: [userGuard],
    title: 'LocMNS - Informations Equipement',
  },
  // Routage vers la page "equipment-booking"
  {
    path: 'equipment-booking/:equipmentId',
    component: EquipmentBooking,
    canActivate: [userGuard],
    title: 'LocMNS - Réservation Equipement',
  },
  // Routage vers la page "user-reservations"
  {
    path: 'user-reservations',
    component: UserReservations,
    canActivate: [userGuard],
    title: 'LocMNS - Réservations utilisateur',
  },
  // Routage vers la page "user-dashboard"
  {
    path: 'user-dashboard',
    component: UserDashboard,
    canActivate: [userGuard],
    title: 'LocMNS - Espace utilisateur',
  },
  {
    path: 'admin/requests',
    component: AdminRequests,
    canActivate: [adminGuard],
    title: 'LocMNS - Espace utilisateur',
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboard,
    canActivate: [adminGuard],
    title: 'LocMNS - Espace administrateur',
  },
  // Routage vers la page "Erreur 404"
  {
    path: '**',
    component: NotFound,
    canActivate: [userGuard],
    title: '404 - Not Found',
  },
];
