-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         5.7.33-log - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para barbershop
CREATE DATABASE IF NOT EXISTS `barbershop` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `barbershop`;

-- Volcando estructura para tabla barbershop.citas
CREATE TABLE IF NOT EXISTS `citas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `clienteId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `clienteId` (`clienteId`),
  CONSTRAINT `cliente_FK` FOREIGN KEY (`clienteId`) REFERENCES `clientes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla barbershop.citas: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `citas` DISABLE KEYS */;
INSERT INTO `citas` (`id`, `fecha`, `hora`, `clienteId`) VALUES
	(1, '2021-02-22', '13:00:00', 1);
/*!40000 ALTER TABLE `citas` ENABLE KEYS */;

-- Volcando estructura para tabla barbershop.citasservicios
CREATE TABLE IF NOT EXISTS `citasservicios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `citaId` int(11) NOT NULL,
  `servicioId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `citaId` (`citaId`),
  KEY `servicioId` (`servicioId`),
  CONSTRAINT `citas_FK` FOREIGN KEY (`citaId`) REFERENCES `citas` (`id`),
  CONSTRAINT `servicios_FK` FOREIGN KEY (`servicioId`) REFERENCES `servicios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla barbershop.citasservicios: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `citasservicios` DISABLE KEYS */;
INSERT INTO `citasservicios` (`id`, `citaId`, `servicioId`) VALUES
	(1, 1, 2),
	(2, 1, 3),
	(3, 1, 6);
/*!40000 ALTER TABLE `citasservicios` ENABLE KEYS */;

-- Volcando estructura para tabla barbershop.clientes
CREATE TABLE IF NOT EXISTS `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `apellido` varchar(60) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `email` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla barbershop.clientes: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` (`id`, `nombre`, `apellido`, `telefono`, `email`) VALUES
	(1, 'Adolfo', 'Pastelin', '229998244', 'email@email.com');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;

-- Volcando estructura para tabla barbershop.servicios
CREATE TABLE IF NOT EXISTS `servicios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) NOT NULL,
  `precio` decimal(6,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla barbershop.servicios: ~11 rows (aproximadamente)
/*!40000 ALTER TABLE `servicios` DISABLE KEYS */;
INSERT INTO `servicios` (`id`, `nombre`, `precio`) VALUES
	(1, 'Haircut for adult men', 14.00),
	(2, 'Haircut for children', 12.00),
	(3, 'Haircut for adult women', 18.00),
	(4, 'beard cut', 8.00),
	(5, 'Haircut for senior citizens 65 and over', 12.00),
	(6, 'Partial perm', 35.00),
	(7, 'Hair dye', 20.00),
	(8, 'Nails', 10.00),
	(9, 'Hair shampoo', 10.00),
	(10, 'Condition treatment', 60.00),
	(13, 'temp', 1.00);
/*!40000 ALTER TABLE `servicios` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
