namespace CreditosAcademicos.Models.DTO
{
    public class RegistroRequest
    {
        public int EstudianteId { get; set; }
        public List<int> Materias { get; set; } = new List<int>();
    }
}
