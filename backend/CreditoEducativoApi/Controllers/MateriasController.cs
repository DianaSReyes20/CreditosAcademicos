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
    }
}