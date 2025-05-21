using CreditosAcademicos.Data;
using CreditosAcademicos.Models;
using CreditosAcademicos.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CreditosAcademicos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstudiantesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EstudiantesController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/estudiantes/registrar
        [HttpPost("registrar")]
        public async Task<IActionResult> RegistrarEstudiante([FromBody] Estudiante estudiante)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _context.Estudiantes.Add(estudiante);
                await _context.SaveChangesAsync();

                // Devuelve 201 Created con la ubicación del nuevo recurso
                return CreatedAtAction(nameof(ObtenerEstudiante), new { id = estudiante.Id }, estudiante);
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Error al registrar estudiante: {ex.InnerException?.Message}");
            }
        }

        // GET: api/estudiantes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Estudiante>> ObtenerEstudiante(int id)
        {
            var estudiante = await _context.Estudiantes
                .Include(e => e.Registros)
                .ThenInclude(r => r.Materia)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (estudiante == null)
            {
                return NotFound($"No se encontró el estudiante con ID {id}");
            }

            return Ok(estudiante);
        }

        // POST: api/estudiantes/1/registrar-materias
        [HttpPost("{id}/registrar-materias")]
        public async Task<IActionResult> RegistrarMaterias(int id, [FromBody] List<int> materiaIds)
        {
            // Validar que el estudiante existe
            var estudiante = await _context.Estudiantes.FindAsync(id);
            if (estudiante == null)
            {
                return NotFound("Estudiante no encontrado");
            }

            // Validar que son exactamente 3 materias
            if (materiaIds.Count != 3)
            {
                return BadRequest("Debe seleccionar exactamente 3 materias");
            }

            // Obtener las materias con sus profesores
            var materias = await _context.Materias
                .Include(m => m.ProfesorId)
                .Where(m => materiaIds.Contains(m.Id))
                .ToListAsync();

            // Validar que todas las materias existen
            if (materias.Count != 3)
            {
                return BadRequest("Una o más materias no existen");
            }

            // Validar profesores distintos
            var profesoresIds = materias.Select(m => m.ProfesorId).Distinct().ToList();
            if (profesoresIds.Count != 3)
            {
                return BadRequest("Debe seleccionar materias con profesores distintos");
            }

            // Crear registros
            var registros = materias.Select(m => new Registro
            {
                EstudianteId = id,
                MateriaId = m.Id,
                FechaRegistro = DateTime.Now
            }).ToList();

            try
            {
                _context.Registros.AddRange(registros);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    Mensaje = "Materias registradas exitosamente",
                    TotalCreditos = materias.Sum(m => m.Creditos),
                    Materias = materias.Select(m => m.Nombre)
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al registrar materias: {ex.Message}");
            }
        }

        // GET: api/estudiantes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Estudiante>>> ObtenerEstudiantes()
        {
            return await _context.Estudiantes
                .Include(e => e.Registros)
                .ThenInclude(r => r.Materia)
                .ToListAsync();
        }
    }
}