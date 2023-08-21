-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql:3306
-- Erstellungszeit: 21. Aug 2023 um 07:15
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
-- Tabellenstruktur für Tabelle `status`
--

CREATE TABLE `status` (
  `id` int NOT NULL,
  `title` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `color` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `limits` tinyint(1) NOT NULL,
  `max` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `status`
--

INSERT INTO `status` (`id`, `title`, `color`, `limits`, `max`) VALUES
(1, 'ToDo', '#c143aa', 1, 2),
(2, 'In Progress', '#1fc2ff', 1, 4),
(3, 'Test', '#ffc634', 1, 3),
(4, 'Done', '#1bcc00', 0, 0);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `status`
--
ALTER TABLE `status`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
