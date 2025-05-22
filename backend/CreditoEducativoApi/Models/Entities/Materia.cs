namespace CreditosAcademicos.Models.Entities
{
    public class Materia
    {
        public int Id { get; set; }
        public required string Codigo { get; set; }
        public required string Nombre { get; set; }
        public required int Creditos { get; set; } = 3;
        public Profesor? Profesor { get; set; }
        public int ProfesorId { get; set; }
        public int ProgramaId { get; set; }
    }
}
