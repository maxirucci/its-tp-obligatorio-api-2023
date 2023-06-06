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
-- Records of cursos
-- ----------------------------
INSERT INTO `cursos` VALUES (1, 'Nombre del curso', 'Descripción del curso');
INSERT INTO `cursos` VALUES (2, 'Programación en C', 'Aprende los fundamentos de la programación en lenguaje C');
INSERT INTO `cursos` VALUES (4, 'Inglés avanzado', 'Perfecciona tus habilidades en el idioma inglés');
INSERT INTO `cursos` VALUES (5, 'Marketing digital', 'Aprende estrategias y técnicas de marketing en el entorno digital');
INSERT INTO `cursos` VALUES (6, 'Fotografía creativa', 'Descubre cómo capturar imágenes impactantes con tu cámara');
INSERT INTO `cursos` VALUES (7, 'Gestión de proyectos', 'Aprende a planificar, ejecutar y controlar proyectos exitosos');
INSERT INTO `cursos` VALUES (8, 'Introducción a la inteligencia artificial', 'Explora los conceptos básicos de la inteligencia artificial y sus aplicaciones');


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
-- Records of estudiantes
-- ----------------------------
INSERT INTO `estudiantes` VALUES (1, 'Nombre del alumno', 12, 'quinto');
INSERT INTO `estudiantes` VALUES (3, 'Pedro García', 18, 'primero');
INSERT INTO `estudiantes` VALUES (4, 'Ana Martínez', 15, 'segundo');
INSERT INTO `estudiantes` VALUES (5, 'Carlos López', 17, 'cuarto');
INSERT INTO `estudiantes` VALUES (6, 'Laura Pérez', 16, 'primero');
INSERT INTO `estudiantes` VALUES (7, 'Andrés González', 18, 'primero');
INSERT INTO `estudiantes` VALUES (8, 'Sofía Hernández', 15, 'tercero');
INSERT INTO `estudiantes` VALUES (9, 'Julieta Rodríguez', 17, 'cuarto');
INSERT INTO `estudiantes` VALUES (10, 'Paula Ramírez', 16, 'tercero');
INSERT INTO `estudiantes` VALUES (11, 'Luisa Ramírez', 20, 'primero');
INSERT INTO `estudiantes` VALUES (12, 'Miguel Torres', 19, 'cuarto');
INSERT INTO `estudiantes` VALUES (13, 'Isabella García', 22, 'segundo');
INSERT INTO `estudiantes` VALUES (15, 'Sofía García', 12, 'tercero');
INSERT INTO `estudiantes` VALUES (16, 'Mateo Rodríguez', 13, 'cuarto');
INSERT INTO `estudiantes` VALUES (17, 'Valentina López', 21, 'segundo');
INSERT INTO `estudiantes` VALUES (18, 'Sebastián González', 16, 'tercero');
INSERT INTO `estudiantes` VALUES (19, 'Isabella Martínez', 14, 'primero');
INSERT INTO `estudiantes` VALUES (22, 'Santiago Ramírez', 12, 'primero');
INSERT INTO `estudiantes` VALUES (23, 'Camila Pérez', 11, 'cuarto');
INSERT INTO `estudiantes` VALUES (24, 'Juan Torres', 17, 'tercero');
INSERT INTO `estudiantes` VALUES (25, 'Valeria Herrera', 15, 'segundo');
INSERT INTO `estudiantes` VALUES (26, 'Daniel Castro', 17, 'segundo');
INSERT INTO `estudiantes` VALUES (27, 'Mariana Silva', 15, 'segundo');
INSERT INTO `estudiantes` VALUES (28, 'Nicolás Vargas', 14, 'tercero');
INSERT INTO `estudiantes` VALUES (29, 'Lucía Morales', 11, 'tercero');
INSERT INTO `estudiantes` VALUES (30, 'Alejandro Castro', 10, 'primero');
INSERT INTO `estudiantes` VALUES (31, 'Emma Fernández', 20, 'quinto');


-- ----------------------------
-- Table structure for estudiantes_cursos
-- ----------------------------
DROP TABLE IF EXISTS `estudiantes_cursos`;
CREATE TABLE `estudiantes_cursos`  (
	`id_estudiante` int(0) NOT NULL,
  `id_curso` int(0) NOT NULL,
  INDEX `FK_curso`(`id_curso`) USING BTREE,
  INDEX `FK_estudiante`(`id_estudiante`) USING BTREE,
  CONSTRAINT `FK_curso` FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_estudiante` FOREIGN KEY (`id_estudiante`) REFERENCES `estudiantes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of estudiantes_cursos
-- ----------------------------
INSERT INTO `estudiantes_cursos` VALUES (1, 2);
INSERT INTO `estudiantes_cursos` VALUES (3, 6);
INSERT INTO `estudiantes_cursos` VALUES (4, 8);
INSERT INTO `estudiantes_cursos` VALUES (5, 1);
INSERT INTO `estudiantes_cursos` VALUES (7, 5);
INSERT INTO `estudiantes_cursos` VALUES (8, 7);
INSERT INTO `estudiantes_cursos` VALUES (10, 6);
INSERT INTO `estudiantes_cursos` VALUES (11, 1);
INSERT INTO `estudiantes_cursos` VALUES (12, 4);
INSERT INTO `estudiantes_cursos` VALUES (13, 7);
INSERT INTO `estudiantes_cursos` VALUES (4, 4);
INSERT INTO `estudiantes_cursos` VALUES (7, 4);
INSERT INTO `estudiantes_cursos` VALUES (15, 4);
INSERT INTO `estudiantes_cursos` VALUES (16, 2);
INSERT INTO `estudiantes_cursos` VALUES (17, 2);
INSERT INTO `estudiantes_cursos` VALUES (18, 6);
INSERT INTO `estudiantes_cursos` VALUES (19, 2);
INSERT INTO `estudiantes_cursos` VALUES (22, 2);
INSERT INTO `estudiantes_cursos` VALUES (23, 2);
INSERT INTO `estudiantes_cursos` VALUES (24, 2);
INSERT INTO `estudiantes_cursos` VALUES (25, 2);
INSERT INTO `estudiantes_cursos` VALUES (26, 2);
INSERT INTO `estudiantes_cursos` VALUES (27, 2);


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

-- ----------------------------
-- Records of profesores
-- ----------------------------
INSERT INTO `profesores` VALUES (2, 'María Gómez', 'Programación', 'maria.gomez@example.com');
INSERT INTO `profesores` VALUES (3, 'Carlos Rodríguez', 'Diseño gráfico', 'carlos.rodriguez@example.com');
INSERT INTO `profesores` VALUES (4, 'Ana López', 'Inglés', 'ana.lopez@example.com');
INSERT INTO `profesores` VALUES (5, 'Pedro Sánchez', 'Marketing', 'pedro.sanchez@example.com');
INSERT INTO `profesores` VALUES (6, 'Alejandro García', 'Matemáticas', 'alejandro.garcia@example.com');


-- ----------------------------
-- Procedure structure for SP_cursos_nuevoEstudiante
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_cursos_nuevoEstudiante`;
delimiter ;;
CREATE PROCEDURE `SP_cursos_nuevoEstudiante`(IN pIdCurso INT,
	IN pNombre VARCHAR(100),
	IN pEdad INT,
	IN pGrado VARCHAR(100))
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
	END;
	
	START TRANSACTION;

	-- Inserción en la tabla "estudiantes"
	INSERT INTO estudiantes (nombre, edad, grado)
	VALUES (pNombre, pEdad, pGrado);

	-- Obtener el ID generado en la estudiantes
	SET @id_estudiante = LAST_INSERT_ID();

	-- Inserción en la tabla "estudiantes_cursos" utilizando el ID de la estudiantes
	INSERT INTO estudiantes_cursos (id_estudiante, id_curso)
	VALUES (@id_estudiante, pIdCurso);

	COMMIT;
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;

