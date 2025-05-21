using CreditosAcademicos.Data;
using CreditosAcademicos.Models;
using CreditosAcademicos.Models.DTO;
using CreditosAcademicos.Services;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CreditosAcademicos.Controllers
{
    [ApiController]
    [Route("api/estudiantes")]
    public class EstudiantesController : ControllerBase
    {
        private readonly RegistroService _registroService;

        public EstudiantesController(RegistroService registroService)
        {
            _registroService = registroService;
        }

        [HttpPost("registrar-materias")]
        public async Task<ActionResult<ResultadoRegistro>> RegistrarMaterias(
            [FromBody] RegistroRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var resultado = await _registroService.RegistrarMateriasAsync(request);

            if (!resultado.Exito)
                return BadRequest(resultado);

            return Ok(resultado);
        }
    }
}
