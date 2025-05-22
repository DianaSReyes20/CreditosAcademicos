import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAlumnosComponent } from '../../components/modal-alumnos/modal-alumnos.component';
import { ApiService } from '../../services/api.service'; 
import { CommonModule } from '@angular/common'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, MatProgressSpinnerModule],
})
export class DashboardComponent {

  materiasSeleccionadas: any[] = [];
  estudianteId: number = 1; // Simulado
  isLoading: boolean = true;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.obtenerMateriasSeleccionadas();
  }

  obtenerMateriasSeleccionadas() {
    this.apiService.obtenerMateriasEstudiante(13)
      .subscribe(data => {
        this.materiasSeleccionadas = data;
        this.isLoading = false;
        console.log('materiasSeleccionadas: ', this.materiasSeleccionadas);
      });
  }

  abrirModalCompaneros(materiaId: number) {
    var estudianteActual = 13;
    var estudiantes = this.apiService.obtenerEstudiantesMateria(estudianteActual);

    this.dialog.open(ModalAlumnosComponent, {
      data: {
        materia: "Nombre de la materia",
        estudiantes: estudiantes,
      }
    });
  }
}
