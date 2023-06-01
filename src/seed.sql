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
  `deleted` tinyint(0) NULL DEFAULT 0,
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
  `deleted` tinyint(0) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

INSERT INTO estudiantes (nombre, edad, grado)
VALUES
    ('Juan', 17, 'primero'),
    ('María', 16, 'segundo'),
    ('Pedro', 18, 'primero'),
    ('Ana', 15, 'segundo'),
    ('Carlos', 17, 'cuarto'),
    ('Laura', 16, 'primero'),
    ('Andrés', 18, 'primero'),
    ('Sofía', 15, 'tercero'),
    ('Alejandro', 17, 'cuarto'),
    ('Paula', 16, 'tercero');

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
  `deleted` tinyint(0) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
