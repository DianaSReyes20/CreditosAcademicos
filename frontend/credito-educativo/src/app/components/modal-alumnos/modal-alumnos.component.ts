import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../services/api.service'; 

@Component({
  selector: 'app-modal-alumnos',
  imports: [CommonModule, MatDialogModule, MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './modal-alumnos.component.html',
  styleUrl: './modal-alumnos.component.scss'
})
export class ModalAlumnosComponent {
  estudiantes: any[] = [];
  materia: string = '';
  estudiantesMateria: any[] = [];

  constructor(
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
  }

  ngOnInit() {
    console.log('Data del modal:', this.data);
    this.materia = this.data.materia.nombre;
    this.estudiantes = this.estudiantesMateria;
    this.obtenerListadoAlumnosMateria();
  }

  obtenerListadoAlumnosMateria() {
    this.apiService.obtenerEstudiantesMateria(this.data.materia.materiaId)
      .subscribe(data => {
        this.estudiantesMateria = data;
      });
  }

  cerrarModal() {
    // Lógica para cerrar el modal
  }
}
