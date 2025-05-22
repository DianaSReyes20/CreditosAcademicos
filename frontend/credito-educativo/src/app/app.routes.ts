import { Routes } from '@angular/router';
import { SeleccionMateriasComponent } from './pages/seleccion-materias/seleccion-materias.component';
import { RegistroEstudianteComponent } from './pages/registro-estudiante/registro-estudiante.component';

export const routes: Routes = [
  { path: 'registro-estudiante', component: RegistroEstudianteComponent },
  { path: 'seleccion-materias', component: SeleccionMateriasComponent },
  { path: '', redirectTo: '/registro-estudiante', pathMatch: 'full' }
];