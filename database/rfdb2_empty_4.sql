-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 27, 2023 at 03:05 PM
-- Server version: 8.0.35-0ubuntu0.22.04.1
-- PHP Version: 8.1.2-1ubuntu2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rfdb2_empty`
--
CREATE DATABASE IF NOT EXISTS `rfdb2_empty` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `rfdb2_empty`;

-- --------------------------------------------------------

--
-- Table structure for table `tblFirm`
--

DROP TABLE IF EXISTS `tblFirm`;
CREATE TABLE `tblFirm` (
  `id` int NOT NULL,
  `firmname` varchar(100) NOT NULL,
  `id_grp` int DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `sumtype` enum('1','2','3') DEFAULT NULL,
  `hide` tinyint(1) DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `tblGroup`
--

DROP TABLE IF EXISTS `tblGroup`;
CREATE TABLE `tblGroup` (
  `id` int NOT NULL,
  `groupname` varchar(100) NOT NULL,
  `hide` tinyint(1) DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `tblMoney`
--

DROP TABLE IF EXISTS `tblMoney`;
CREATE TABLE `tblMoney` (
  `id` int NOT NULL,
  `date` date NOT NULL,
  `costs` decimal(11,2) DEFAULT NULL,
  `fixed` decimal(11,2) DEFAULT NULL,
  `income` decimal(11,2) DEFAULT NULL,
  `id_frm` int DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_config`
--

DROP TABLE IF EXISTS `tbl_config`;
CREATE TABLE `tbl_config` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `value` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_config`
--

INSERT INTO `tbl_config` (`id`, `name`, `value`) VALUES
(1, 'Project', 'Rizzo\'s Finances Database 2'),
(2, 'Copyrights', '&copy;2023 Rizzo Productions'),
(3, 'Pages', 'index.html,sheet.html#finance,sheet.html#stock,sheet.html#savings,sheet.html#crypto,settings.html'),
(4, 'Titles', NULL),
(5, 'Months', NULL),
(6, 'Quarters', NULL),
(7, 'Year', NULL),
(8, 'Settings', NULL),
(9, 'Language', NULL),
(10, 'Scale', NULL),
(11, 'Errors', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_config_old`
--

DROP TABLE IF EXISTS `tbl_config_old`;
CREATE TABLE `tbl_config_old` (
  `id` int NOT NULL,
  `name` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `value` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `language` varchar(2) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_config_old`
--

INSERT INTO `tbl_config_old` (`id`, `name`, `value`, `language`) VALUES
(1, 'Project', 'Rizzo\'s Finances Database 2', '-'),
(2, 'Copyrights', '&copy;2023 Rizzo Productions', '-'),
(3, 'Titels', 'Overzicht,Financiën,Beleggen,Sparen,Crypto,Instellingen', 'NL'),
(4, 'Titles', 'Dashboard,Finances,Stocks,Savings,Crypto,Settings', 'EN'),
(5, 'Maanden', 'Januari,Februari,Maart,April,Mei,Juni,Juli,Augustus,September,Oktober,November,December', 'NL'),
(6, 'Months', 'January,February,March,April,May,June,July,August,September,October,November,December', 'EN'),
(7, 'Kwartalen', 'Januari - Maart,April - Juni,Juli - September,Oktober - December', 'NL'),
(8, 'Quarters', 'January - March, April, June,July - September, October - December', 'EN'),
(9, 'Jaar', 'Januari - December', 'NL'),
(10, 'Year', 'January - December', 'EN'),
(11, 'Pages', 'index.html,sheet.html#finance,sheet.html#stock,sheet.html#savings,sheet.html#crypto,settings.html', '-'),
(12, 'Errors', 'Invalid page,Page [PAGE] doesn´t exist!', '-'),
(13, 'Instellingen', 'Algemeen,Financiën,Beleggen,Sparen,Crypto', 'NL'),
(14, 'Settings', 'General,Finances,Stocks,Savings,Crypto', 'EN'),
(15, 'Taal', 'Taal,Engels,Nederlands', 'NL'),
(16, 'Language', 'Language,Dutch,English', 'EN'),
(17, 'Schaal', 'Schaal,Maanden,Kwartalen,Jaar', 'NL'),
(18, 'Scale', 'Scale,Months,Quarters,Year', 'EN');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_dutch`
--

DROP TABLE IF EXISTS `tbl_dutch`;
CREATE TABLE `tbl_dutch` (
  `id` int NOT NULL,
  `id_config` int NOT NULL,
  `value` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_dutch`
--

INSERT INTO `tbl_dutch` (`id`, `id_config`, `value`) VALUES
(1, 4, 'Overzicht,Financiën,Beleggen,Sparen,Crypto,Instellingen'),
(2, 5, 'Januari,Februari,Maart,April,Mei,Juni,Juli,Augustus,September,Oktober,November,December'),
(3, 6, 'Januari - Maart,April - Juni,Juli - September,Oktober - December'),
(4, 7, 'Januari - December'),
(5, 8, 'Pagina\'s,Algemeen,Financiën,Beleggen,Sparen,Crypto'),
(6, 9, 'Taal,Engels,Nederlands'),
(7, 10, 'Schaal,Maanden,Kwartalen,Jaar'),
(8, 11, 'Invalid page,Page [PAGE] doesn´t exist!');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_english`
--

DROP TABLE IF EXISTS `tbl_english`;
CREATE TABLE `tbl_english` (
  `id` int NOT NULL,
  `id_config` int NOT NULL,
  `value` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_english`
--

INSERT INTO `tbl_english` (`id`, `id_config`, `value`) VALUES
(1, 4, 'Dashboard,Finances,Stocks,Savings,Crypto,Settings'),
(2, 5, 'January,February,March,April,May,June,July,August,September,October,November,December'),
(3, 6, 'January - March, April, June,July - September, October - December'),
(4, 7, 'January - December'),
(5, 8, 'Pages,General,Finances,Stocks,Savings,Crypto'),
(6, 9, 'Language,Dutch,English'),
(7, 10, 'Scale,Months,Quarters,Year'),
(8, 11, 'Invalid page,Page [PAGE] doesn´t exist!');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_language`
--

DROP TABLE IF EXISTS `tbl_language`;
CREATE TABLE `tbl_language` (
  `id` int NOT NULL,
  `language` varchar(45) NOT NULL,
  `native` varchar(45) NOT NULL,
  `code` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_language`
--

INSERT INTO `tbl_language` (`id`, `language`, `native`, `code`) VALUES
(1, 'Dutch', 'Nederlands', 'NL'),
(2, 'Niederländisch', 'Nederlands', 'NL'),
(3, 'Engels', 'English', 'EN'),
(4, 'Englisch', 'English', 'EN'),
(5, 'Duits', 'Deutsch', 'DE'),
(6, 'German', 'Deutsch', 'DE');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_settings`
--

DROP TABLE IF EXISTS `tbl_settings`;
CREATE TABLE `tbl_settings` (
  `id` int NOT NULL,
  `name` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ;

--
-- Dumping data for table `tbl_settings`
--

INSERT INTO `tbl_settings` (`id`, `name`, `value`) VALUES
(1, 'dashboard', '{\"page\": \"true\", \"theme\": {\"color\": \"#6c3483\"}}'),
(2, 'finance', '{\"page\": \"true\", \"scale\": \"months\", \"theme\": {\"color\": \"#ffd700\"}}'),
(3, 'stock', '{\"page\": \"true\", \"scale\": \"quarters\", \"theme\": {\"color\": \"#228b22\"}}'),
(4, 'savings', '{\"page\": \"true\", \"scale\": \"year\", \"theme\": {\"color\": \"#4169e1\"}}'),
(5, 'crypto', '{\"page\": \"false\", \"scale\": \"year\", \"theme\": {\"color\": \"#ff8f00\"}}'),
(6, 'settings', '{\"page\": \"true\", \"theme\": {\"color\": \"#536878\"}}'),
(7, 'language', '{\"language\": \"Nederlands\",\"code\":\"NL\"}');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tblFirm`
--
ALTER TABLE `tblFirm`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_grp` (`id_grp`);

--
-- Indexes for table `tblGroup`
--
ALTER TABLE `tblGroup`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tblMoney`
--
ALTER TABLE `tblMoney`
  ADD PRIMARY KEY (`id`),
  ADD KEY `date` (`date`),
  ADD KEY `id_frm` (`id_frm`);

--
-- Indexes for table `tbl_config`
--
ALTER TABLE `tbl_config`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_config_old`
--
ALTER TABLE `tbl_config_old`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_dutch`
--
ALTER TABLE `tbl_dutch`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_english`
--
ALTER TABLE `tbl_english`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_language`
--
ALTER TABLE `tbl_language`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `language_UNIQUE` (`language`);

--
-- Indexes for table `tbl_settings`
--
ALTER TABLE `tbl_settings`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tblFirm`
--
ALTER TABLE `tblFirm`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=372;

--
-- AUTO_INCREMENT for table `tblGroup`
--
ALTER TABLE `tblGroup`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `tblMoney`
--
ALTER TABLE `tblMoney`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15043;

--
-- AUTO_INCREMENT for table `tbl_config`
--
ALTER TABLE `tbl_config`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tbl_config_old`
--
ALTER TABLE `tbl_config_old`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `tbl_dutch`
--
ALTER TABLE `tbl_dutch`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tbl_english`
--
ALTER TABLE `tbl_english`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tbl_language`
--
ALTER TABLE `tbl_language`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_settings`
--
ALTER TABLE `tbl_settings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
