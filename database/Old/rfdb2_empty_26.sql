-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 07, 2024 at 12:36 PM
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
-- Table structure for table `tbl_accounts`
--

DROP TABLE IF EXISTS `tbl_accounts`;
CREATE TABLE `tbl_accounts` (
  `id` int NOT NULL,
  `hide` tinyint DEFAULT '0',
  `account` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` datetime DEFAULT NULL,
  `serviceid` int DEFAULT NULL,
  `type` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_accounts`
--

INSERT INTO `tbl_accounts` (`id`, `hide`, `account`, `date`, `serviceid`, `type`, `description`) VALUES
(1, 0, 'NL86 INGB 000x xxxx 00', '1982-03-25 14:15:58', 1, 'finance', 'ING betaalrekening van Rizzo'),
(2, 0, 'NL02 ABNA 000x xxxx xx', '2007-07-12 13:54:30', 2, 'finance', 'ABN AMRO 2de betaalrekening van Rizzo'),
(3, 0, 'NL86 INGB 000x xxxx 01', '2021-11-06 14:43:57', 1, 'finance', 'ING betaalrekening van Rizzo&#39;s vrouw'),
(4, 0, 'H#6463 02', '1996-05-14 14:45:47', 12, 'savings', 'Bank H spaarrekening van Rizzo'),
(5, 1, 'BK#1254', '2023-08-24 15:08:19', 15, 'crypto', 'BitKudo Exchange'),
(6, 0, 'My Wallet #1', '2015-02-24 14:51:50', 16, 'crypto', 'Hardware Wallet'),
(7, 0, 'My Wallet #2', '2024-03-05 11:48:54', 16, 'crypto', ''),
(8, 0, 'Test #1', '2022-05-11 11:52:05', 16, 'crypto', 'Test'),
(9, 0, 'Test #2', '2020-11-28 11:53:46', 16, 'crypto', ''),
(10, 0, 'Test #3', '2024-03-01 11:56:33', 16, 'crypto', ''),
(11, 0, 'ABN#6435', '2020-03-20 11:57:11', 2, 'savings', 'Test'),
(12, 0, 'Test #4', '1994-09-15 11:59:14', 16, 'crypto', 'Test'),
(13, 0, 'C#4567', '2014-06-20 12:00:14', 5, 'savings', 'Test'),
(14, 0, '&amp;122%@', '2024-04-17 12:30:40', 5, 'finance', 'Test ^&amp;*#$@2');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_businesses`
--

DROP TABLE IF EXISTS `tbl_businesses`;
CREATE TABLE `tbl_businesses` (
  `id` int NOT NULL,
  `hide` tinyint DEFAULT '0',
  `business` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gid` int NOT NULL,
  `website` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rad_history` tinyint DEFAULT '-1',
  `desc_history` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_businesses`
--

INSERT INTO `tbl_businesses` (`id`, `hide`, `business`, `gid`, `website`, `rad_history`, `desc_history`) VALUES
(1, 0, 'Gemeente Emmen', 1, 'https://www.gemeente-emmen.nl', -1, ''),
(2, 0, 'VVE', 1, 'http://myriade.nl', -1, ''),
(3, 0, 'Brasserie', 2, 'https://www.debrasserie.nl', -1, NULL),
(4, 0, 'New York Pizza', 2, 'https://newyorkpizza.nl', -1, NULL),
(5, 0, 'Eneco', 3, 'https://www.eneco.nl', -1, NULL),
(6, 0, 'Shell', 4, 'https://www.shell.nl', -1, ''),
(7, 0, 'Esso', 4, 'https://www.esso.nl', -1, NULL),
(8, 0, 'Bruna', 15, 'http://www.bruna.nl', -1, NULL),
(9, 1, 'Texaco', 4, 'https://www.texaco.nl', -1, NULL),
(10, 0, 'Menzis', 12, '', -1, NULL),
(12, 0, 'Futurum', 14, 'http://www.futurum.nl', -1, NULL),
(14, 0, 'Conrad', 10, 'http://conrad.nl', -1, NULL);

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
(15, 'Services', NULL),
(16, 'Messages', NULL),
(17, 'Accounts', NULL),
(18, 'Days', NULL),
(19, 'ShortMonths', NULL),
(20, 'Miscellaneous', NULL),
(21, 'Groups', NULL),
(22, 'Businesses', NULL);

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
(10, 13, 'Aanmelden,Gebruikersnaam,Wachtwoord,controle,is mislukt!,is niet hetzelfde!,is niet sterk genoeg!'),
(11, 14, 'Gebruikers,Naam,Wachtwoord Hash Waarde,Aangemeld,Vorige Aanmelding'),
(12, 15, 'Diensten,Dienst,Financiën,Beleggen,Sparen,Crypto,Website'),
(13, 16, 'voldoet niet!,bestaat al!,# verwijderen?,kan niet worden verwijderd!,De # lijst,is leeg!'),
(14, 17, 'rekeningen,Datum,Dienst,Rekeningnummer,Beschrijving,Betaal,Beleggings,Spaar,Crypto'),
(15, 18, 'Zondag,Maandag,Dinsdag,Woensdag,Donderdag,Vrijdag,Zaterdag'),
(16, 19, 'Jan,Feb,Mrt,Apr,Mei,Jun,Jul,Aug,Sep,Okt,Nov,Dec'),
(17, 20, 'Zoek'),
(18, 21, 'Groepen,Groep,Rangorde,Beschrijving'),
(19, 22, 'Bedrijven,Groep,Bedrijf,Rangorde,Website');

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
(10, 13, 'Sign In,Username,Password,check,failed!,is not the same!,is not strong enough!'),
(11, 14, 'Users,Name,Password Hash Value,Signed In,Previous Signed In'),
(12, 15, 'Services,Service,Finances,Stocks,Savings,Crypto,Website'),
(13, 16, 'is invalid!,already exists!,Delete #?,cannot be deleted!,The # list,is empty!'),
(14, 17, 'Accounts,Date,Service,Account Number,Description,Payment ,Investment ,Savings ,Crypto '),
(15, 18, 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'),
(16, 19, 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'),
(17, 20, 'Search'),
(18, 21, 'Groups,Group,Ranking,Description'),
(19, 22, 'Businesses,Group,Business,Ranking,Website');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_groups`
--

DROP TABLE IF EXISTS `tbl_groups`;
CREATE TABLE `tbl_groups` (
  `id` int NOT NULL,
  `hide` tinyint DEFAULT '0',
  `group` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_groups`
--

INSERT INTO `tbl_groups` (`id`, `hide`, `group`, `description`) VALUES
(1, 0, 'Huis', 'VVE, Gemeente belastingen, e.d.	'),
(2, 0, 'Eten & Drinken', 'Uitgaan, kantine, e.d.'),
(3, 0, 'Energie', 'Water, Gas en Licht'),
(4, 0, 'Vervoer', 'Onderhoud, brandstof, wegenbelasting e.d.'),
(10, 0, 'Computers & Electronica & nog meer', 'Software, hardware, etc.'),
(12, 0, 'Inkomen', 'Salaris, giften en cadeaus'),
(14, 0, 'Hobby', 'Hobbies'),
(15, 0, 'Feest', 'Verjaardagen, Cadeaus, Jubilea, e.d.');

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
-- Table structure for table `tbl_rankings`
--

DROP TABLE IF EXISTS `tbl_rankings`;
CREATE TABLE `tbl_rankings` (
  `gid` int DEFAULT NULL,
  `bid` int DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_rankings`
--

INSERT INTO `tbl_rankings` (`gid`, `bid`, `timestamp`) VALUES
(1, NULL, '2024-03-26 14:53:43'),
(1, NULL, '2024-03-26 14:54:37'),
(1, NULL, '2024-03-26 14:56:42'),
(2, NULL, '2024-03-26 15:11:21'),
(2, NULL, '2024-03-26 15:14:17'),
(NULL, 6, '2024-04-03 15:16:20'),
(NULL, 6, '2024-04-03 15:16:52'),
(2, NULL, '2024-04-03 15:16:52'),
(4, 2, '2024-04-03 15:18:43'),
(1, NULL, '2024-04-03 15:19:52'),
(6, NULL, '2024-04-03 15:19:52'),
(NULL, 6, '2024-04-03 15:20:24'),
(NULL, 2, '2024-04-03 15:20:42');

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
(1, 0, 'ING Particulier', '&#9745;', '&#9744;', '&#9745;', '&#9744;', 'https://www.ing.nl/particulier'),
(2, 0, 'ABN AMRO Bank ABN AMRO Bank', '&#9745;', '&#9744;', '&#9745;', '&#9744;', 'https://www.abnamro.nl/nl/personal/index.html'),
(3, 0, 'Bank A', '&#9745;', '&#9744;', '&#9745;', '&#9744;', 'https://www.banka.nl'),
(4, 1, 'Bank B', '&#9745;', '&#9744;', '&#9745;', '&#9745;', 'https://www.bankb.nl'),
(5, 0, 'Bank C', '&#9745;', '&#9744;', '&#9745;', '&#9744;', 'https://www.bankc.nl'),
(7, 1, 'Bank D', '&#9744;', '&#9745;', '&#9744;', '&#9744;', 'https://www.bankd.nl'),
(8, 0, 'Bank E', '&#9745;', '&#9744;', '&#9744;', '&#9744;', 'https://www.banke.nl'),
(9, 0, 'Bank F', '&#9744;', '&#9744;', '&#9744;', '&#9744;', ''),
(12, 0, 'Bank H', '&#9744;', '&#9744;', '&#9745;', '&#9744;', 'https://www.bankh.nl'),
(14, 0, 'Bank J', '&#9744;', '&#9744;', '&#9744;', '&#9744;', 'https://www.bankj.nl'),
(15, 1, 'BitKudo Exchange', '&#9744;', '&#9744;', '&#9744;', '&#9745;', 'http://www.bitkudo.com'),
(16, 0, 'BTC Wallet', '&#9744;', '&#9744;', '&#9744;', '&#9745;', ''),
(19, 0, 'A & B Bank', '&#9744;', '&#9744;', '&#9745;', '&#9744;', 'http://A&Bbank.nl');

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
(1, 'Admin', '9e71af2675ef9d36c6d23b737d0be7c1bd828c6cea289f91f7199478d8bcf46e', '2024-03-26 14:28:19', '2024-03-16 13:32:40'),
(2, 'Rizzo', '5cc955b91289a48f2bb3a1d31cf4badfe74e2381d69ca68d6a7db63e23871098', '2024-04-07 11:20:57', '2024-04-06 13:36:53'),
(21, 'Test1a', '0a1f92553f4fba387e9c278e1e96cb599044331f717c5a1bd68e3646a1b3ddfe', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_accounts`
--
ALTER TABLE `tbl_accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `account_UNIQUE` (`account`);

--
-- Indexes for table `tbl_businesses`
--
ALTER TABLE `tbl_businesses`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `tbl_groups`
--
ALTER TABLE `tbl_groups`
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
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `service_UNIQUE` (`service`);

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
-- AUTO_INCREMENT for table `tbl_accounts`
--
ALTER TABLE `tbl_accounts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `tbl_businesses`
--
ALTER TABLE `tbl_businesses`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `tbl_config`
--
ALTER TABLE `tbl_config`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `tbl_dutch`
--
ALTER TABLE `tbl_dutch`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `tbl_english`
--
ALTER TABLE `tbl_english`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `tbl_groups`
--
ALTER TABLE `tbl_groups`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `tbl_language`
--
ALTER TABLE `tbl_language`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_services`
--
ALTER TABLE `tbl_services`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `tbl_settings`
--
ALTER TABLE `tbl_settings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
