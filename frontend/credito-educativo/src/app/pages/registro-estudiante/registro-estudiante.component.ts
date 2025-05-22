import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Estudiante } from '../../models/estudiante.model'
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-estudiante',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-estudiante.component.html',
  styleUrl: './registro-estudiante.component.scss'
})
export class RegistroEstudianteComponent {
  registroEstudianteForm: FormGroup;
  defaultProgram = 'Ingeniería de Sistemas';
  registrationSuccess = false;
  registrationError = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.registroEstudianteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      programa: [this.defaultProgram, Validators.required]
    });
  }

  onSubmit() {
    if (this.registroEstudianteForm.valid) {
      this.loading = true;
      this.registrationSuccess = false;
      this.registrationError = '';

      const formValue = {...this.registroEstudianteForm.value};
    
      // Eliminar el campo programa ya que no es parte del objeto Estudiante
      delete formValue.programa;

      const nuevoEstudiante: Estudiante = {
        ...this.registroEstudianteForm.value,
      };
      
      this.apiService.registrarEstudiante(nuevoEstudiante).subscribe({
        next: (response) => {
          this.loading = false;
          this.registrationSuccess = true;

          setTimeout(() => {
            this.router.navigate(['/seleccion-materias', response.id]);
          }, 3000);
        },
        error: (err) => {
          this.loading = false;
          this.registrationError = 'Error al registrar estudiante.';
        }
      });
    }
  }
}
