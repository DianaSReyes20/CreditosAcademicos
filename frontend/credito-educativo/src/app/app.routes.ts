import { Routes } from '@angular/router';
import { SeleccionMateriasComponent } from './pages/seleccion-materias/seleccion-materias.component';

export const routes: Routes = [
  { path: 'seleccion-materias', component: SeleccionMateriasComponent },
  { path: '', redirectTo: '/seleccion-materias', pathMatch: 'full' }
];