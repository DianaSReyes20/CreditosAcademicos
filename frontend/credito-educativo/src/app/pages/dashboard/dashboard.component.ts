import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalAlumnosComponent } from '../../components/modal-alumnos/modal-alumnos.component';
import { ApiService } from '../../services/api.service'; 
import { CommonModule } from '@angular/common'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, MatProgressSpinnerModule, MatIconModule, MatListModule],
})
export class DashboardComponent {

  materiasSeleccionadas: any[] = [];
  otrosEstudiantes: any[] = [
    { nombre:"Andrea", apellido:"Reyes"},
    { nombre:"Sofia", apellido:"Carvajal"}
  ];
  estudianteId: number = 0;
  isLoading: boolean = true;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Obtener ID del estudiante por snapshot
    this.estudianteId = +this.route.snapshot.params['id'];

    this.obtenerMateriasSeleccionadas();
  }

  obtenerMateriasSeleccionadas() {
    this.apiService.obtenerMateriasEstudiante(this.estudianteId)
      .subscribe(data => {
        this.materiasSeleccionadas = data;
        this.isLoading = false;
      });
  }

  obtenerEstudiantesRegistrados() {
    this.apiService.obtenerEstudiantesMateria(this.estudianteId)
      .subscribe(data => {
        this.otrosEstudiantes = data;
        this.isLoading = false;
      });
  }

  abrirModalAlumnos(materiaId: number) {
    var materia = this.materiasSeleccionadas.find(m => m.materiaId === materiaId);

    this.dialog.open(ModalAlumnosComponent, { data: { materia } });
  }

  verRegistroEstudiante(estudianteId: number){

  }
}
