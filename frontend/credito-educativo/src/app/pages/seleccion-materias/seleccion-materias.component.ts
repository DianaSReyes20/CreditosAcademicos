import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Materia } from '../../models/materia.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seleccion-materias',
  templateUrl: './seleccion-materias.component.html',
  styleUrls: ['./seleccion-materias.component.scss'],
  imports: [CommonModule, MatProgressSpinnerModule, MatIconModule, MatTooltipModule]
})
export class SeleccionMateriasComponent implements OnInit {
  materias: Materia[] = [];
  materiasSeleccionadas: number[] = []; // Almacena IDs de materias
  estudianteId: number | null = null;
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtener ID del estudiante por snapshot
    this.estudianteId = +this.route.snapshot.params['id'];
    
    if (!this.estudianteId) {
      this.router.navigate(['/registro']);
      return;
    }

    this.cargarMaterias();
  }

  cargarMaterias(): void {
    this.isLoading = true;
    this.apiService.obtenerMateriasDisponibles().subscribe({
      next: (materias) => {
        this.materias = materias;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar materias. Intenta nuevamente.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  toggleSeleccion(materiaId: number): void {
    if (this.materiasSeleccionadas.includes(materiaId)) {
      // Deseleccionar
      this.materiasSeleccionadas = this.materiasSeleccionadas.filter(id => id !== materiaId);
    } else {
      // Verificar que no exceda el límite
      if (this.materiasSeleccionadas.length >= 3) {
        this.errorMessage = 'Solo puedes seleccionar 3 materias como máximo';
        return;
      }
      
      // Verificar profesores distintos
      const nuevaMateria = this.materias.find(m => m.id === materiaId);
      if (nuevaMateria && this.tieneMismoProfesor(nuevaMateria.profesorId)) {
        this.errorMessage = 'No puedes seleccionar materias con el mismo profesor';
        return;
      }

      this.materiasSeleccionadas.push(materiaId);
      this.errorMessage = '';
    }
  }

  tieneMismoProfesor(profesorId: number): boolean {
    return this.materiasSeleccionadas.some(id => {
      const materia = this.materias.find(m => m.id === id);
      return materia?.profesorId === profesorId;
    });
  }

  calcularCreditos(): number {
    return this.materiasSeleccionadas.reduce((total, id) => {
      const materia = this.materias.find(m => m.id === id);
      return total + (materia?.creditos || 0);
    }, 0);
  }

  confirmarSeleccion(): void {
    if (!this.estudianteId || this.materiasSeleccionadas.length !== 3) {
      this.errorMessage = 'Debes seleccionar exactamente 3 materias';
      return;
    }

    this.isLoading = true;
    this.apiService.registrarMaterias(this.estudianteId, this.materiasSeleccionadas).subscribe({
      next: () => {
        this.router.navigate(['/dashboard', this.estudianteId]);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Error al registrar materias';
        this.isLoading = false;
      }
    });
  }

  materiaEstaSeleccionada(materiaId: number): boolean {
    return this.materiasSeleccionadas.includes(materiaId);
  }
}