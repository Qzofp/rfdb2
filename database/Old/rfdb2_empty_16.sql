-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 12, 2024 at 03:14 PM
-- Server version: 8.0.36-0ubuntu0.22.04.1
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
CREATE DATABASE IF NOT EXISTS `rfdb2_empty` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `rfdb2_empty`;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_config`
--

DROP TABLE IF EXISTS `tbl_config`;
CREATE TABLE `tbl_config` (
  `id` int NOT NULL,
  `name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_config`
--

INSERT INTO `tbl_config` (`id`, `name`, `value`) VALUES
(1, 'Project', 'Rizzo\'s Finances Database 2'),
(2, 'Copyrights', '&copy;2023 Rizzo Productions'),
(3, 'Pages', 'dashboard.php,sheet.php#finance,sheet.php#stock,sheet.php#savings,sheet.php#crypto,settings.php,logout.php'),
(4, 'Titles', NULL),
(5, 'Months', NULL),
(6, 'Quarters', NULL),
(7, 'Year', NULL),
(8, 'Settings', NULL),
(9, 'Language', NULL),
(10, 'Scale', NULL),
(11, 'Errors', NULL),
(12, 'Configs', NULL),
(13, 'Login', NULL),
(14, 'Users', NULL),
(15, 'Services', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_dutch`
--

DROP TABLE IF EXISTS `tbl_dutch`;
CREATE TABLE `tbl_dutch` (
  `id` int NOT NULL,
  `id_config` int NOT NULL,
  `value` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_dutch`
--

INSERT INTO `tbl_dutch` (`id`, `id_config`, `value`) VALUES
(1, 4, 'Overzicht,Financiën,Beleggen,Sparen,Crypto,Instellingen,Afmelden'),
(2, 5, 'Januari,Februari,Maart,April,Mei,Juni,Juli,Augustus,September,Oktober,November,December'),
(3, 6, 'Januari - Maart,April - Juni,Juli - September,Oktober - December'),
(4, 7, 'Januari - December'),
(5, 8, 'Pagina\'s,Algemeen,Financiën,Beleggen,Sparen,Crypto'),
(6, 9, 'Taal,Engels,Nederlands'),
(7, 10, 'Schaal,Maanden,Kwartalen,Jaar'),
(8, 11, 'Invalid page,Page [PAGE] doesn´t exist!'),
(9, 12, 'Configuraties,Naam,Waarde'),
(10, 13, 'Aanmelden,Gebruikersnaam,Wachtwoord,controle,is mislukt!,is niet hetzelfde!,is niet sterk genoeg!,voldoet niet!,bestaat al!,# verwijderen?'),
(11, 14, 'Gebruikers,Naam,Wachtwoord Hash Waarde,Aangemeld,Vorige Aanmelding'),
(12, 15, 'Diensten,Dienst,Financiën,Beleggen,Sparen,Crypto,Website');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_english`
--

DROP TABLE IF EXISTS `tbl_english`;
CREATE TABLE `tbl_english` (
  `id` int NOT NULL,
  `id_config` int NOT NULL,
  `value` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_english`
--

INSERT INTO `tbl_english` (`id`, `id_config`, `value`) VALUES
(1, 4, 'Dashboard,Finances,Stocks,Savings,Crypto,Settings,Sign Out'),
(2, 5, 'January,February,March,April,May,June,July,August,September,October,November,December'),
(3, 6, 'January - March, April - June,July - September, October - December'),
(4, 7, 'January - December'),
(5, 8, 'Pages,General,Finances,Stocks,Savings,Crypto'),
(6, 9, 'Language,Dutch,English'),
(7, 10, 'Scale,Months,Quarters,Year'),
(8, 11, 'Invalid page,Page [PAGE] doesn´t exist!'),
(9, 12, 'Configurations,Name,Value'),
(10, 13, 'Sign In,Username,Password,check,failed!,is not the same!,is not strong enough!,is invalid!,already exists!,Delete #?'),
(11, 14, 'Users,Name,Password Hash Value,Signed In,Previous Signed In'),
(12, 15, 'Services,Service,Finances,Stocks,Savings,Crypto,Website');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_language`
--

DROP TABLE IF EXISTS `tbl_language`;
CREATE TABLE `tbl_language` (
  `id` int NOT NULL,
  `language` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `native` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(2) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
-- Table structure for table `tbl_services`
--

DROP TABLE IF EXISTS `tbl_services`;
CREATE TABLE `tbl_services` (
  `id` int NOT NULL,
  `hide` tinyint DEFAULT '0',
  `service` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finance` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT '&#9744;',
  `stock` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT '&#9744;',
  `savings` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT '&#9744;',
  `crypto` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT '&#9744;',
  `website` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_services`
--

INSERT INTO `tbl_services` (`id`, `hide`, `service`, `finance`, `stock`, `savings`, `crypto`, `website`) VALUES
(1, 0, 'ING Particulier	', '&#9745;', '&#9745;', '&#9745;', '&#9745;', 'https://www.ing.nl/particulier'),
(2, 1, 'ABN AMRO Bank', '&#9745;', '&#9744;', '&#9745;', '&#9744;', 'https://www.abnamro.nl/nl/personal/index.html');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_settings`
--

DROP TABLE IF EXISTS `tbl_settings`;
CREATE TABLE `tbl_settings` (
  `id` int NOT NULL,
  `name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` longtext COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_settings`
--

INSERT INTO `tbl_settings` (`id`, `name`, `value`) VALUES
(1, 'dashboard', '{\"page\": \"true\", \"theme\": {\"color\": \"#6c3483\"}}'),
(2, 'finance', '{\"page\": \"true\", \"show\": \"true\", \"scale\": \"months\", \"theme\": {\"color\": \"#ffd700\"}}'),
(3, 'stock', '{\"page\": \"true\", \"show\": \"true\", \"scale\": \"quarters\", \"theme\": {\"color\": \"#228b22\"}}'),
(4, 'savings', '{\"page\": \"true\", \"show\": \"true\", \"scale\": \"year\", \"theme\": {\"color\": \"#4169e1\"}}'),
(5, 'crypto', '{\"page\": \"true\", \"show\": \"true\", \"scale\": \"year\", \"theme\": {\"color\": \"#ff8f00\"}}'),
(6, 'settings', '{\"page\": \"true\", \"rows\": 25, \"show\": \"false\", \"theme\": {\"color\": \"#536878\"}}'),
(7, 'logout', '{\"page\": \"true\"}'),
(8, 'language', '{\"code\": \"EN\", \"language\": \"English\"}'),
(9, 'salt', '{\"phrase\":\"Please put your SALT pharse here.\"}');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

DROP TABLE IF EXISTS `tbl_users`;
CREATE TABLE `tbl_users` (
  `id` int NOT NULL,
  `user` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(75) COLLATE utf8mb4_unicode_ci NOT NULL,
  `time` datetime DEFAULT NULL,
  `last` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`id`, `user`, `password`, `time`, `last`) VALUES
(1, 'Rizzo', '5cc955b91289a48f2bb3a1d31cf4badfe74e2381d69ca68d6a7db63e23871098', '2024-02-12 13:16:32', '2024-02-12 11:30:45'),
(5, 'Admin', '9e71af2675ef9d36c6d23b737d0be7c1bd828c6cea289f91f7199478d8bcf46e', '2024-02-12 15:08:06', '2024-02-12 11:29:44'),
(6, 'Admin2b', 'a7bedba509bb4eb73f7841380f17a82df4452ce364bf9de70c7035fa0c601707', NULL, NULL),
(7, 'Rizzo2', '5cc955b91289a48f2bb3a1d31cf4badfe74e2381d69ca68d6a7db63e23871098', NULL, NULL),
(10, 'Admin3', '0a1f92553f4fba387e9c278e1e96cb599044331f717c5a1bd68e3646a1b3ddfe', NULL, NULL),
(11, 'Admin4', '0090ea8e9df400e3cd6372b6500e8d7617b6d88a6f1a85fe9d42cb5d1902ecfa', NULL, NULL),
(13, 'Test2', 'b758265991f2d5fb3a040e6e6fab0e2f3d674a119a057fe2280286a18b50f110', NULL, NULL),
(14, 'Test3', '1bbb5c2160ab9e8c33459af71cdcffd220e2982dbca423ea90254624e27f0d95', NULL, NULL),
(26, 'Test1', '5cc955b91289a48f2bb3a1d31cf4badfe74e2381d69ca68d6a7db63e23871098', NULL, NULL),
(39, 'Test9', '1705cdcebd15f06bd74e81096d53069dd0721f921779eaedc4e4205ad84be114', NULL, NULL),
(47, 'Test7', 'f9a36b447b53704d1585bd8334822302f8ea61572534d5b14ae4c9981c89a788', NULL, NULL),
(48, 'Test4', '0090ea8e9df400e3cd6372b6500e8d7617b6d88a6f1a85fe9d42cb5d1902ecfa', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_config`
--
ALTER TABLE `tbl_config`
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
-- Indexes for table `tbl_services`
--
ALTER TABLE `tbl_services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_settings`
--
ALTER TABLE `tbl_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_UNIQUE` (`user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_config`
--
ALTER TABLE `tbl_config`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `tbl_dutch`
--
ALTER TABLE `tbl_dutch`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tbl_english`
--
ALTER TABLE `tbl_english`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tbl_language`
--
ALTER TABLE `tbl_language`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_services`
--
ALTER TABLE `tbl_services`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_settings`
--
ALTER TABLE `tbl_settings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
