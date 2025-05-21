using CreditosAcademicos.Data;
using CreditosAcademicos.Models;
using CreditosAcademicos.Models.DTO;
using CreditosAcademicos.Models.Entities;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CreditosAcademicos.Services
{
    public class RegistroService
    {
        private readonly AppDbContext _context;

        public RegistroService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ResultadoRegistro> RegistrarMateriasAsync(RegistroRequest request)
        {
            try
            {
                // Validación de estudiante
                var estudiante = await _context.Estudiantes.FindAsync(request.EstudianteId);
                if (estudiante == null)
                    return new ResultadoRegistro(false, "Estudiante no encontrado");

                // Validación de cantidad de materias
                if (request.Materias.Count != 3)
                    return new ResultadoRegistro(false, "Debe seleccionar exactamente 3 materias");

                // Obtener materias con profesores
                var materias = await _context.Materias
                    .Include(m => m.ProfesorId)
                    .Where(m => request.Materias.Contains(m.Id))
                    .ToListAsync();

                // Validar profesores únicos
                var profesoresIds = materias.Select(m => m.ProfesorId).Distinct().ToList();
                if (profesoresIds.Count != 3)
                    return new ResultadoRegistro(false, "Debe seleccionar materias con profesores distintos");

                // Crear registros
                var registros = materias.Select(m => new Registro
                {
                    EstudianteId = request.EstudianteId,
                    MateriaId = m.Id,
                    ProfesorId = m.ProfesorId,
                    FechaRegistro = DateTime.Now
                }).ToList();

                _context.Registros.AddRange(registros);
                await _context.SaveChangesAsync();

                return new ResultadoRegistro(
                    true,
                    "Registro exitoso",
                    new
                    {
                        TotalCreditos = materias.Sum(m => m.Creditos),
                        Materias = materias.Select(m => m.Nombre)
                    });
            }
            catch (Exception ex)
            {
                return new ResultadoRegistro(false, $"Error interno: {ex.Message}");
            }
        }
    }
}
