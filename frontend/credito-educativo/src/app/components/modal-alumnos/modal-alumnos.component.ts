import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-alumnos',
  imports: [MatDialogModule, CommonModule],
  templateUrl: './modal-alumnos.component.html',
  styleUrl: './modal-alumnos.component.scss'
})
export class ModalAlumnosComponent {
  estudiantes: any[] = [];
  materia: string = '';
  data: any = {
    estudiantes: [],
    materia: ''
  };

  constructor(
    //@Inject('data') private data: any
  ) {
    this.estudiantes = this.data.estudiantes;
    this.materia = this.data.materia;
  }

  cerrarModal() {
    // Lógica para cerrar el modal
  }

  ngOnInit() {
    console.log(this.estudiantes);
  }
}
