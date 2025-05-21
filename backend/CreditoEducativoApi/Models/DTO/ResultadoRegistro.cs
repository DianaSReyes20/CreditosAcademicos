namespace CreditosAcademicos.Models.DTO
{
    public class ResultadoRegistro
    {
        public bool Exito { get; set; }
        public string Mensaje { get; set; }
        public object Data { get; set; } // Opcional para datos adicionales

        // Constructor completo
        public ResultadoRegistro(bool exito, string mensaje, object data = null)
        {
            Exito = exito;
            Mensaje = mensaje;
            Data = data;
        }

        // Constructor simplificado
        public ResultadoRegistro() { }
    }
}
