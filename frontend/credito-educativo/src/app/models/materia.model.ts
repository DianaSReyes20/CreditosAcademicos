// Modelo de Materia
export interface Materia {
  id: number;
  codigo: string;
  nombre: string;
  creditos: number;
  profesorId: number;
  profesor?: {
    id: number;
    nombre: string;
    apellido: string;
  };
  programaId?: number;
  programa?: {
    id: number;
    nombre: string;
  };
}
  