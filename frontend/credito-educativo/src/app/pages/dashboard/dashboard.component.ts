import { MatDialog } from '@angular/material/dialog';
import { ModalAlumnosComponent } from '../../components/modal-alumnos/modal-alumnos.component';
import { ApiService } from '../../services/api.service';

export class DashboardComponent {
  // estudianteActual = 1;
  // estudiantes = this.apiService.getTodos();

  // constructor(private dialog: MatDialog, private apiService: ApiService) {}

  // obtenerNombreMateria(id: number): string {
  //   return this.apiService.getNombreMateria(id);
  // }

  // abrirModalCompaneros(idMateria: number) {
  //   const companeros = this.estudiantes.filter(e =>
  //     e.id !== this.estudianteActual.id && e.materiasSeleccionadas.includes(idMateria)
  //   );

  //   this.dialog.open(ModalAlumnosComponent, {
  //     data: {
  //       materia: this.obtenerNombreMateria(idMateria),
  //       companeros
  //     }
  //   });
  // }
}
