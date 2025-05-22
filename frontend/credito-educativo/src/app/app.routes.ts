import { Routes } from '@angular/router';
import { SeleccionMateriasComponent } from './pages/seleccion-materias/seleccion-materias.component';
import { RegistroEstudianteComponent } from './pages/registro-estudiante/registro-estudiante.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'registro-estudiante', component: RegistroEstudianteComponent },
  { path: 'seleccion-materias/:id', component: SeleccionMateriasComponent },
  { path: 'dashboard/:id', component: DashboardComponent },
  { path: '', redirectTo: '/registro-estudiante', pathMatch: 'full' }
];