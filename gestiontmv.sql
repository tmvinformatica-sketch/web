-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-10-2025 a las 17:40:59
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestiontmv`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `codigo` varchar(15) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `cif` varchar(9) NOT NULL,
  `direccion` varchar(30) NOT NULL,
  `cp` int(5) NOT NULL,
  `provincia` varchar(10) NOT NULL,
  `poblacion` varchar(15) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `email` varchar(25) DEFAULT NULL,
  `otro` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `conceptofactura`
--

CREATE TABLE `conceptofactura` (
  `codigo` varchar(15) NOT NULL,
  `concepto` varchar(35) NOT NULL,
  `cantidad` int(6) NOT NULL,
  `precio` int(8) NOT NULL,
  `total` int(9) NOT NULL,
  `cliente` varchar(15) NOT NULL,
  `codigofacturas` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas`
--

CREATE TABLE `facturas` (
  `codigo` varchar(15) NOT NULL,
  `fecha` date NOT NULL,
  `fechahora` datetime NOT NULL,
  `numero` varchar(9) NOT NULL,
  `baseimponible` int(11) NOT NULL,
  `impuesto` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `sha` varchar(64) NOT NULL,
  `shaanterior` varchar(64) NOT NULL,
  `codigocliente` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish2_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `conceptofactura`
--
ALTER TABLE `conceptofactura`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `FxFacturasConceptosfactura` (`codigofacturas`);

--
-- Indices de la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `FxFacturasClientes` (`codigocliente`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `conceptofactura`
--
ALTER TABLE `conceptofactura`
  ADD CONSTRAINT `conceptofactura_ibfk_1` FOREIGN KEY (`codigofacturas`) REFERENCES `facturas` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD CONSTRAINT `facturas_ibfk_1` FOREIGN KEY (`codigocliente`) REFERENCES `clientes` (`codigo`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
