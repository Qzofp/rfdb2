-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 09, 2024 at 04:45 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

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

-- --------------------------------------------------------

--
-- Table structure for table `tbl_config`
--

CREATE TABLE `tbl_config` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `value` varchar(150) DEFAULT NULL
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
(14, 'Users', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_dutch`
--

CREATE TABLE `tbl_dutch` (
  `id` int(11) NOT NULL,
  `id_config` int(11) NOT NULL,
  `value` varchar(150) NOT NULL
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
(11, 14, 'Gebruikers,Naam,Wachtwoord Hash Waarde,Aangemeld,Vorige Aanmelding');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_english`
--

CREATE TABLE `tbl_english` (
  `id` int(11) NOT NULL,
  `id_config` int(11) NOT NULL,
  `value` varchar(150) NOT NULL
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
(10, 13, 'Sign In,Username,Password,check,failed!,is not the same!,is not strong enough!,is invalid!,already exists!,Delete #?\' '),
(11, 14, 'Users,Name,Password Hash Value,Signed In,Previous Signed In');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_language`
--

CREATE TABLE `tbl_language` (
  `id` int(11) NOT NULL,
  `language` varchar(45) NOT NULL,
  `native` varchar(45) NOT NULL,
  `code` varchar(2) NOT NULL
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
-- Table structure for table `tbl_settings`
--

CREATE TABLE `tbl_settings` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `value` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_settings`
--

INSERT INTO `tbl_settings` (`id`, `name`, `value`) VALUES
(1, 'dashboard', '{\"page\": \"true\", \"theme\": {\"color\": \"#6c3483\"}}'),
(2, 'finance', '{\"page\": \"true\", \"scale\": \"months\", \"show\": \"true\", \"theme\": {\"color\": \"#ffd700\"}}'),
(3, 'stock', '{\"page\": \"true\", \"scale\": \"quarters\", \"show\": \"false\", \"theme\": {\"color\": \"#228b22\"}}'),
(4, 'savings', '{\"page\": \"true\", \"scale\": \"year\", \"show\": \"false\", \"theme\": {\"color\": \"#4169e1\"}}'),
(5, 'crypto', '{\"page\": \"true\", \"scale\": \"year\", \"show\": \"true\", \"theme\": {\"color\": \"#ff8f00\"}}'),
(6, 'settings', '{\"page\": \"true\", \"rows\": 25, \"show\": \"true\", \"theme\": {\"color\": \"#536878\"}}'),
(7, 'logout', '{\"page\": \"true\"}'),
(8, 'language', '{\"code\": \"EN\", \"language\": \"English\"}'),
(9, 'salt', '{\"phrase\":\"Please put your SALT pharse here.\"}');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `id` int(11) NOT NULL,
  `user` varchar(25) NOT NULL,
  `password` varchar(75) NOT NULL,
  `time` datetime DEFAULT NULL,
  `last` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`id`, `user`, `password`, `time`, `last`) VALUES
(1, 'Rizzo', '5cc955b91289a48f2bb3a1d31cf4badfe74e2381d69ca68d6a7db63e23871098', '2024-02-09 13:11:55', '2024-02-07 14:43:09'),
(5, 'Admin', '9e71af2675ef9d36c6d23b737d0be7c1bd828c6cea289f91f7199478d8bcf46e', '2024-02-09 16:09:57', '2024-02-09 16:05:03'),
(6, 'Admin2', '5cc955b91289a48f2bb3a1d31cf4badfe74e2381d69ca68d6a7db63e23871098', NULL, NULL),
(7, 'Rizzo2', '5cc955b91289a48f2bb3a1d31cf4badfe74e2381d69ca68d6a7db63e23871098', NULL, NULL),
(10, 'Test1b', 'ee4f89cd4feb7f0832291f872b4048c92a0d763ccad976a5de932b3e528ddc4c', NULL, NULL),
(12, 'Test3', 'b758265991f2d5fb3a040e6e6fab0e2f3d674a119a057fe2280286a18b50f110', NULL, NULL),
(13, 'Test4b', '0090ea8e9df400e3cd6372b6500e8d7617b6d88a6f1a85fe9d42cb5d1902ecfa', NULL, NULL),
(14, 'Test5', '4a3f937b5f3ccd77ad1965ad60b83e735842ffd899209081ba00235b92017c33', NULL, NULL),
(15, 'Test6', '04f410ec02f0e29eb4aef1a899544ed5d89b5fe87b0599df48793a91bca38eea', NULL, NULL),
(16, 'Test2b', '0a1f92553f4fba387e9c278e1e96cb599044331f717c5a1bd68e3646a1b3ddfe', NULL, NULL);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tbl_dutch`
--
ALTER TABLE `tbl_dutch`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tbl_english`
--
ALTER TABLE `tbl_english`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tbl_language`
--
ALTER TABLE `tbl_language`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_settings`
--
ALTER TABLE `tbl_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
