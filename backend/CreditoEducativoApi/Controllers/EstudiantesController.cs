using Azure.Core;
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
        public async Task<IActionResult> RegistrarMaterias(int id, [FromBody] RegistroMateriasRequest request)
        {
            // Cambiar List<int> por clase RegistroMateriasRequest
            if (request?.MateriaIds == null)
            {
                return BadRequest("La lista de materias es requerida, por favor diligenciarla");
            }

            var materiaIds = request.MateriaIds;

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
                .Include(e => e.Profesor)
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
                ProfesorId = m.ProfesorId,
                Fecha = DateTime.Now
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
        [HttpGet("registros")]
        public async Task<ActionResult<List<Estudiante>>> ObtenerEstudiantes()
        {
            var estudiantes = await _context.Estudiantes
            .Include(e => e.Registros)
                .ThenInclude(r => r.Materia)
            .Where(e => e.Registros.Any())
            .ToListAsync();

                // Tomar solo el primer registro por estudiante (por ejemplo, por Fecha)
                foreach (var estudiante in estudiantes)
                {
                    estudiante.Registros = estudiante.Registros
                        .OrderBy(r => r.Fecha) // o por ID
                        .Take(1)
                        .ToList();
                }

            return Ok(estudiantes);
        }

        // GET: api/estudiantes/materias/{id}
        [HttpGet("{id}/materias")]
        public async Task<ActionResult<IEnumerable<object>>> ObtenerEstudianteMateria(int id)
        {
            var estudiante = await _context.Estudiantes
                .Include(e => e.Registros)
                    .ThenInclude(r => r.Materia)
                .ThenInclude(m => m.Profesor)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (estudiante == null)
            {
                return NotFound($"No se encontró estudiante registrados en la materia con ID {id}");
            }

            var materias = estudiante.Registros.Select(r => new
            {
                MateriaId = r.Materia.Id,
                Nombre = r.Materia.Nombre,
                Creditos = r.Materia.Creditos,
                Profesor = r.Materia.Profesor?.Nombre + ' ' + r.Materia.Profesor?.Apellido,
                FechaRegistro = r.Fecha
            }).ToList();

            return Ok(materias);
        }
    }
    public class RegistroMateriasRequest
    {
        public List<int> MateriaIds { get; set; }
    }
}