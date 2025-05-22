import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service'; 

@Component({
  selector: 'app-modal-alumnos',
  imports: [MatDialogModule, CommonModule],
  templateUrl: './modal-alumnos.component.html',
  styleUrl: './modal-alumnos.component.scss'
})
export class ModalAlumnosComponent {
  estudiantes: any[] = [];
  materia: string = '';
  estudiantesMateria: any[] = [];

  constructor(
    private apiService: ApiService
  ) {
    this.estudiantes = this.estudiantesMateria;
    this.materia = 'Nombre de la materia';
  }

  ngOnInit() {
    this.obtenerListadoAlumnosMateria();
    console.log(this.estudiantesMateria);
  }

  obtenerListadoAlumnosMateria() {
    this.apiService.obtenerEstudiantesMateria(3)
      .subscribe(data => {
        this.estudiantesMateria = data;
        console.log('estudiantesMateria: ', data);
      });
  }

  cerrarModal() {
    // Lógica para cerrar el modal
  }
}
