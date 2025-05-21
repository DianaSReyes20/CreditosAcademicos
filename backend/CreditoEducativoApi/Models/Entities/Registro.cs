namespace CreditosAcademicos.Models.Entities
{
    public class Registro
    {
        public int Id { get; set; }
        public int EstudianteId { get; set; }
        public Estudiante? Estudiante { get; set; }
        public int MateriaId { get; set; }
        public Materia? Materia { get; set; }
        public int? ProfesorId { get; set; }
        public Profesor? Profesor { get; set; }
        public DateTime FechaRegistro { get; set; } = DateTime.Now;
    }
}
