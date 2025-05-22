import { MatDialog } from '@angular/material/dialog';
import { ModalAlumnosComponent } from '../../components/modal-alumnos/modal-alumnos.component';
import { ApiService } from '../../services/api.service';

export class DashboardComponent {

  constructor(private dialog: MatDialog, private apiService: ApiService) {}

  abrirModalCompaneros(materiaId: number) {
    var estudianteActual = 1;
    var estudiantes = this.apiService.obtenerEstudiantesMateria(estudianteActual);

    this.dialog.open(ModalAlumnosComponent, {
      data: {
        materia: "Nombre de la materia",
        estudiantes: estudiantes,
      }
    });
  }
}
