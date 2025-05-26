    -- Script para crear las tablas con relaciones y restricciones básicas en MySQL

    CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
    ) ENGINE=InnoDB;

    CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    correo VARCHAR(255) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    rol_id INT NOT NULL,
    CONSTRAINT fk_usuarios_roles FOREIGN KEY (rol_id) REFERENCES roles(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
    ) ENGINE=InnoDB;

    CREATE TABLE salones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL
    ) ENGINE=InnoDB;

    CREATE TABLE niños (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    salon_id INT NOT NULL,
    docente_id INT NOT NULL,
    padre_id INT NOT NULL,
    CONSTRAINT fk_niños_salones FOREIGN KEY (salon_id) REFERENCES salones(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_niños_docentes FOREIGN KEY (docente_id) REFERENCES usuarios(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_niños_padres FOREIGN KEY (padre_id) REFERENCES usuarios(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
    ) ENGINE=InnoDB;

    CREATE TABLE notas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    niño_id INT NOT NULL,
    fecha DATE NOT NULL,
    periodo ENUM('semanal', 'mensual', 'trimestral') NOT NULL,
    descripcion TEXT,
    calificacion DECIMAL(5,2) NOT NULL,
    CONSTRAINT fk_notas_niños FOREIGN KEY (niño_id) REFERENCES niños(id)
        ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB;

    CREATE TABLE observaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    niño_id INT NOT NULL,
    docente_id INT NOT NULL,
    contenido TEXT NOT NULL,
    fecha DATE NOT NULL,
    CONSTRAINT fk_observaciones_niños FOREIGN KEY (niño_id) REFERENCES niños(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_observaciones_docentes FOREIGN KEY (docente_id) REFERENCES usuarios(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
    ) ENGINE=InnoDB;

    CREATE TABLE credenciales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_archivo VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    fecha_subida DATE NOT NULL,
    salon_id INT NOT NULL,
    CONSTRAINT fk_credenciales_salones FOREIGN KEY (salon_id) REFERENCES salones(id)
        ON DELETE RESTRICT ON UPDATE CASCADE
    ) ENGINE=InnoDB;
