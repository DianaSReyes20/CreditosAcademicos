# Créditos Académicos

Aplicación web responsive para el registro de créditos o materias académicas

## Características principales

- Regitro de estudiantes
- Selección y registro de materias
- Dashboard de estudiante y listado de compañeros

NOTAS IMPORTANTES: 
1. Solo se puede hacer el registro de estudiante una única vez según email.
2. El sistema realizará las validaciones respectivas de las materias a seleccionar según profesor y número de créditos.

## Lenguajes y Tecnologías usadas
.NetCore, Angular, Angular Material y SQL Server.

## URL's y puertos
Backend: Puertos: [7105, 5257] || Ejemplo de Endpoint: https://localhost:7105/api/estudiantes/13/materias/
Frontend: Puerto: [4200] 

## Instalación rápida

```bash
# Clonar repositorio
git clone https://github.com/DianaSReyes20/CreditosAcademicos

# Instalar dependencias (Proyecto frontend)
npm install

# Ejecutar localmente
Frontend: ng serve

# Creación BD SQL Server localmente
Revisar repositorio /database/creditos_academicos.sql
