import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Estudiante } from '../models/estudiante.model';    
import { Materia } from '../models/materia.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrls = [
    'https://localhost:7105/api',
    'http://localhost:5257/api'
  ];
  private apiUrl = this.apiUrls[1];

  constructor(private http: HttpClient) { }

  registrarEstudiante(estudiante: Estudiante): Observable<Estudiante> {
    return this.http.post<Estudiante>(`${this.apiUrl}/estudiantes/registrar`, estudiante);
  }

  obtenerMateriasDisponibles(): Observable<Materia[]> {
    return this.http.get<Materia[]>(`${this.apiUrl}/materias`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).pipe(
      catchError(error => {
        console.error('Error completo:', error);
        throw 'Error de conexión: Verifica que el backend esté corriendo en '+this.apiUrl;
      })
    );
  }

   obtenerEstudiantesMateria(materiaId: number): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${this.apiUrl}/estudiantes/materia/` + materiaId, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).pipe(
      catchError(error => {
        console.error('Error completo:', error);
        throw 'Error de conexión: Verifica que el backend esté corriendo en '+this.apiUrl;
      })
    );
  }

  seleccionarMaterias(estudianteId: number, materias: number[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/estudiantes/${estudianteId}/registrar-materias`, { materias });
  }

  registrarMaterias(estudianteId: number, materiaIds: number[]): Observable<any> {
    console.log('Registrar materias:', estudianteId, materiaIds);
    // Validación básica antes de enviar
    if (!estudianteId || !materiaIds || materiaIds.length === 0) {
      return throwError(() => new Error('Datos de registro inválidos'));
    }

    return this.http.post(
      `${this.apiUrl}/estudiantes/${estudianteId}/registrar-materias`, 
      { materiaIds: materiaIds }
    ).pipe(
      catchError((error) => {
        console.error('Error al registrar materias:', error);   
        return throwError(() => error);
      })
    );
  }
}