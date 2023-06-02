/*
 Source Server Type    : MySQL
 Source Server Version : 80029

 Target Server Type    : MySQL
 Target Server Version : 80029

 Date: 01/06/2023 00:25:56
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cursos
-- ----------------------------
DROP TABLE IF EXISTS `cursos`;
CREATE TABLE `cursos`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `descripcion` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;


-- ----------------------------
-- Table structure for estudiantes
-- ----------------------------
DROP TABLE IF EXISTS `estudiantes`;
CREATE TABLE `estudiantes`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `edad` int(0) NOT NULL,
  `grado` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;


-- ----------------------------
-- Table structure for estudiantes_cursos
-- ----------------------------
DROP TABLE IF EXISTS `estudiantes_cursos`;
CREATE TABLE `estudiantes_cursos`  (
  `id_estudiante` int(0) NOT NULL,
  `id_curso` int(0) NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;


-- ----------------------------
-- Table structure for profesores
-- ----------------------------
DROP TABLE IF EXISTS `profesores`;
CREATE TABLE `profesores`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `especialidad` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `mail` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;

-- ----------------------------
-- ----------------------------

-- ----------------------------
-- Data for cursos
-- ----------------------------
INSERT INTO cursos (nombre, descripcion)
VALUES
    ('Matemáticas básicas', 'Curso introductorio de matemáticas para principiantes'),
    ('Programación en C', 'Aprende los fundamentos de la programación en lenguaje C'),
    ('Diseño gráfico', 'Curso completo sobre diseño gráfico'),
    ('Inglés avanzado', 'Perfecciona tus habilidades en el idioma inglés'),
    ('Marketing digital', 'Aprende estrategias y técnicas de marketing en el entorno digital'),
    ('Fotografía creativa', 'Descubre cómo capturar imágenes impactantes con tu cámara'),
    ('Gestión de proyectos', 'Aprende a planificar, ejecutar y controlar proyectos exitosos'),
    ('Introducción a la inteligencia artificial', 'Explora los conceptos básicos de la inteligencia artificial y sus aplicaciones');


-- ----------------------------
-- Data for estudiantes
-- ----------------------------
INSERT INTO estudiantes (nombre, edad, grado)
VALUES
    ('Juan Rodríguez', 17, 'primero'),
    ('María Gómez', 16, 'segundo'),
    ('Pedro García', 18, 'primero'),
    ('Ana Martínez', 15, 'segundo'),
    ('Carlos López', 17, 'cuarto'),
    ('Laura Pérez', 16, 'primero'),
    ('Andrés González', 18, 'primero'),
    ('Sofía Hernández', 15, 'tercero'),
    ('Alejandro Torres', 17, 'cuarto'),
    ('Paula Ramírez', 16, 'tercero'),
    ('Luisa Ramírez', 20, 'primero'),
    ('Miguel Torres', 19, 'cuarto'),
    ('Isabella García', 22, 'segundo');


-- ----------------------------
-- Data for estudiantes_cursos
-- ----------------------------
INSERT INTO estudiantes_cursos (id_estudiante, id_curso)
VALUES
    (1, 2),
    (2, 4),
    (3, 6),
    (4, 8),
    (5, 1),
    (6, 3),
    (7, 5),
    (8, 7),
    (9, 3),
    (10, 6),
    (11, 1),
    (12, 4),
    (13, 7);


-- ----------------------------
-- Data for profesores
-- ----------------------------
INSERT INTO profesores (nombre, especialidad, mail)
VALUES
    ('Juan Pérez', 'Matemáticas', 'juan.perez@example.com'),
    ('María Gómez', 'Programación', 'maria.gomez@example.com'),
    ('Carlos Rodríguez', 'Diseño gráfico', 'carlos.rodriguez@example.com'),
    ('Ana López', 'Inglés', 'ana.lopez@example.com'),
    ('Pedro Sánchez', 'Marketing', 'pedro.sanchez@example.com');