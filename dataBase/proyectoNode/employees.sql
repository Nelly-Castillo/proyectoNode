-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-08-2024 a las 04:27:25
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyectonode`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `employees`
--

CREATE TABLE `employees` (
  `employee_id` int(11) NOT NULL,
  `employee_name` varchar(20) NOT NULL,
  `employee_lastname` varchar(50) NOT NULL,
  `employee_phone` varchar(20) NOT NULL,
  `employee_mail` varchar(50) NOT NULL,
  `employee_address` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `employees`
--

INSERT INTO `employees` (`employee_id`, `employee_name`, `employee_lastname`, `employee_phone`, `employee_mail`, `employee_address`) VALUES
(1, 'Axel', 'Castillo', '5553428400', 'ejemplo@ejemplo.mx', 'C. Montes Urales 445'),
(2, 'Nelly Elizabeth Nanc', 'Castillo', '8888888888', 'nelly@gmail.com', 'tu corazon'),
(3, 'Nelly Elizabeth', 'Castillo', '8888888888', 'nelly@gmail.com', 'tu corazon'),
(4, 'Juan Francisco', 'García Flores', '5553428400', 'ejemplo@ejemplo.mx', 'C. Montes Urales 445'),
(7, 'Jon', 'Doe', '6019521325', 'test@example.us', '1600 Amphitheatre Parkway'),
(8, 'Jon', 'Doe', '6019521325', 'test@example.us', '1600 Amphitheatre Parkway'),
(9, 'Juan Francisco', 'García Flores', '5553428400', 'ejemplo@ejemplo.mx', 'C. Montes Urales 445'),
(10, 'Gottfried', 'Leibniz', '030303986300', 'test@beispiel.de', 'Erika-Mann-Straße 33'),
(11, 'axel', 'qwertyuio', 'qwertyu', 'qwerty@qwertyu.com', 'qwertyu'),
(12, 'Juan Francisco', 'García Flores', '5553428400', 'ejemplo@ejemplo.mx', 'C. Montes Urales 445');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `employees`
--
ALTER TABLE `employees`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
