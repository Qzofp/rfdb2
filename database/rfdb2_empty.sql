-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 13, 2023 at 03:14 PM
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
  `value` varchar(150) NOT NULL,
  `language` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_config`
--

INSERT INTO `tbl_config` (`id`, `name`, `value`, `language`) VALUES
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
(12, 'Errors', 'Invalid page,Page [PAGE] doesn´t exist!', '-');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_settings`
--

DROP TABLE IF EXISTS `tbl_settings`;
CREATE TABLE `tbl_settings` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `value` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbl_settings`
--

INSERT INTO `tbl_settings` (`id`, `name`, `value`) VALUES
(1, 'dashboard', '{\"page\": \"true\", \"theme\": {\"color\": \"#6c3483\"}}'),
(2, 'finance', '{\"page\": \"true\", \"scale\": \"months\", \"theme\": {\"color\": \"#ffd700\"}}'),
(3, 'stock', '{\"page\": \"true\", \"scale\": \"quarters\", \"theme\": {\"color\": \"#228b22\"}}'),
(4, 'savings', '{\"page\": \"true\", \"scale\": \"year\", \"theme\": {\"color\": \"#4169e1\"}}'),
(5, 'crypto', '{\"page\": \"false\", \"scale\": \"quarters\", \"theme\": {\"color\": \"#ff8f00\"}}'),
(6, 'settings', '{\"page\": \"true\", \"theme\": {\"color\": \"\"}}'),
(7, 'misc', '{\"language\": \"NL\"}');

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tbl_settings`
--
ALTER TABLE `tbl_settings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
