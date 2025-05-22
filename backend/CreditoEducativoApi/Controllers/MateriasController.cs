using CreditosAcademicos.Data;
using CreditosAcademicos.Models;
using CreditosAcademicos.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CreditosAcademicos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MateriasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MateriasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/materias
        [HttpGet]
        public async Task<ActionResult<List<Materia>>> ObtenerMaterias()
        {
            return await _context.Materias
                .Include(e => e.Profesor)
                .ToListAsync();
        }

        // GET: api/materias/{id}/estudiantes
        [HttpGet("{id}/estudiantes")]
        public async Task<ActionResult<IEnumerable<object>>> ObtenerMateriasPorEstudiante(int id)
        {
            var estudiantes = await _context.Registros
            .Where(em => em.MateriaId == id)
            .Select(em => new {
                em.Estudiante.Id,
                em.Estudiante.Nombre,
                em.Estudiante.Apellido
            })
            .ToListAsync();

            if (estudiantes == null || estudiantes.Count == 0)
            {
                return NotFound($"No se encontraron estudiantes para la materia con ID {id}");
            }

            return Ok(estudiantes);
        }
    }
}