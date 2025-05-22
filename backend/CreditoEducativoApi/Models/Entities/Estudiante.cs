namespace CreditosAcademicos.Models.Entities
{
    public class Estudiante
    {
        public int Id { get; set; }
        public required string Nombre { get; set; }
        public required string Apellido { get; set; }
        public required string Email { get; set; }
        public virtual ICollection<Registro>? Registros { get; set; }
    }
}
