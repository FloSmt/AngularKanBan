-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql:3306
-- Erstellungszeit: 23. Aug 2023 um 09:05
-- Server-Version: 8.1.0
-- PHP-Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `kanban`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `priority`
--

CREATE TABLE `priority` (
  `id` int NOT NULL,
  `color` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(30) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `priority`
--

INSERT INTO `priority` (`id`, `color`, `name`) VALUES
(1, '#7100B8', 'IMPORTANT'),
(2, '#ff0000', 'HIGH'),
(3, '#ffbf00', 'MEDIUM'),
(4, '#22AA09', 'LOW');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `priority`
--
ALTER TABLE `priority`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `priority`
--
ALTER TABLE `priority`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
