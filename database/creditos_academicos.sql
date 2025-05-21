-- Tabla Estudiantes
CREATE TABLE Estudiantes (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(100) NOT NULL,
    Apellido NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL
);

-- Tabla Profesores
CREATE TABLE Profesores (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(100) NOT NULL,
    Apellido NVARCHAR(100) NOT NULL
);

-- Tabla Programa
CREATE TABLE Programa (
    Id INT PRIMARY KEY IDENTITY(1,1),
	Codigo NVARCHAR(6),
    Nombre NVARCHAR(100) NOT NULL
);

-- Tabla Materias
CREATE TABLE Materias (
    Id INT PRIMARY KEY IDENTITY(1,1),
	Codigo NVARCHAR(5),
    Nombre NVARCHAR(100) NOT NULL,
    Creditos INT DEFAULT 3,
    ProfesorId INT NOT NULL,
	ProgramaId INT NOT NULL,
    FOREIGN KEY (ProfesorId) REFERENCES Profesores(Id)
);

-- Tabla Registros (por estudiante)
CREATE TABLE Registros (
    Id INT PRIMARY KEY IDENTITY(1,1),
    EstudianteId INT NOT NULL,
    MateriaId INT NOT NULL,
    ProfesorId INT NOT NULL,
    Fecha DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (EstudianteId) REFERENCES Estudiantes(Id),
    FOREIGN KEY (MateriaId) REFERENCES Materias(Id),
    FOREIGN KEY (ProfesorId) REFERENCES Profesores(Id)
);

-- Insertar programa
INSERT INTO Programa (Codigo. Nombre) VALUES 
('ING-S01', 'Ingeniería de sistemas')

-- Insertar profesores
INSERT INTO Profesores (Nombre, Apellido) VALUES 
('Angela', 'Díaz'),
('Jorge', 'Olaya'),
('Andrés', 'Reyes'),
('Karen', 'Torres'),
('Daniel', 'Gómez');

-- Insertar materias
INSERT INTO Materias (Codigo, Nombre, ProfesorId, ProgramaId) VALUES 
('CD-01', 'Cálculo diferecial', 1, 1),
('F-01', 'Física I', 2, 1),
('GP-01', 'Gerencia de proyectos I', 3, 1),
('AL-01', 'Álgebra líneal I', 4, 1),
('F-02', 'Física II', 2, 1),
('MN-01', 'Métodos numéricos', 1, 1),
('PA-01', 'Programación avanzada', 4, 1),
('BD-01', 'Bases de Datos I', 5, 1),
('R-01', 'Redes', 5, 1),
('EL-02', 'Electiva II', 3, 1);