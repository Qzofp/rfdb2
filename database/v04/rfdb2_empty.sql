-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 12, 2025 at 05:37 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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
DROP DATABASE IF EXISTS `rfdb2_empty`;
CREATE DATABASE IF NOT EXISTS `rfdb2_empty` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `rfdb2_empty`;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_accounts`
--

DROP TABLE IF EXISTS `tbl_accounts`;
CREATE TABLE `tbl_accounts` (
  `id` int(11) NOT NULL,
  `hide` tinyint(4) DEFAULT 0,
  `account` varbinary(200) NOT NULL,
  `date` datetime DEFAULT NULL,
  `sid` int(11) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `color` varchar(10) NOT NULL DEFAULT '',
  `description` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_accounts`
--

INSERT INTO `tbl_accounts` (`id`, `hide`, `account`, `date`, `sid`, `type`, `color`, `description`) VALUES
(1, 0, 0xcb15615875a759ac50c847b951f0d5c8, '2020-01-01 15:44:11', 1, 'stock', '#ff8000', 'ING Beleggingsrekening'),
(2, 0, 0x2cc9cf6f392ff5fe2f0d061897394caa, '2020-01-01 15:44:03', 2, 'stock', '#00ff00', 'Meesman ETF beleggingsrekening'),
(3, 0, 0x2a60105af0b32e6dc673d60dcc102ff8, '2020-01-01 15:45:24', 3, 'savings', '#0080ff', 'ABN AMRO Spaarrekening'),
(4, 0, 0xa5e9c3b5f6fa37029d3f4e170d6cd2cf, '2020-01-01 15:46:09', 1, 'savings', '#ffff00', 'ING Spaarekening');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_amount_wallets`
--

DROP TABLE IF EXISTS `tbl_amount_wallets`;
CREATE TABLE `tbl_amount_wallets` (
  `id` int(11) NOT NULL,
  `hide` tinyint(4) DEFAULT 0,
  `vid` int(11) NOT NULL,
  `wid` int(11) NOT NULL,
  `amount` decimal(11,8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_businesses`
--

DROP TABLE IF EXISTS `tbl_businesses`;
CREATE TABLE `tbl_businesses` (
  `id` int(11) NOT NULL,
  `hide` tinyint(4) DEFAULT 0,
  `business` varchar(50) NOT NULL,
  `gid` int(11) NOT NULL,
  `website` varchar(50) DEFAULT NULL,
  `rad_history` tinyint(4) DEFAULT -1,
  `desc_history` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_config`
--

DROP TABLE IF EXISTS `tbl_config`;
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
(2, 'Copyrights', '&copy;2025 Rizzo Productions'),
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
(22, 'Businesses', NULL),
(23, 'Setconfigs', NULL),
(24, 'Payment', NULL),
(25, 'Investment', NULL),
(26, 'Savings', NULL),
(27, 'Crypto', NULL),
(28, 'CryptoCurrenties', NULL),
(29, 'Wallets', NULL),
(30, 'DashSlides', NULL),
(31, 'DashMisc', NULL),
(32, 'DashLabels', NULL),
(33, 'ValueAccounts', NULL),
(34, 'ValueCryptos', NULL),
(35, 'Overview', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_crypto`
--

DROP TABLE IF EXISTS `tbl_crypto`;
CREATE TABLE `tbl_crypto` (
  `id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `wid` int(11) NOT NULL,
  `deposit` decimal(11,2) DEFAULT NULL,
  `withdrawal` decimal(11,2) DEFAULT NULL,
  `amount` decimal(11,8) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_cryptocurrenties`
--

DROP TABLE IF EXISTS `tbl_cryptocurrenties`;
CREATE TABLE `tbl_cryptocurrenties` (
  `id` int(11) NOT NULL,
  `hide` tinyint(4) DEFAULT 0,
  `name` varchar(45) NOT NULL,
  `symbol` varchar(5) NOT NULL,
  `color` varchar(10) NOT NULL,
  `website` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_dutch`
--

DROP TABLE IF EXISTS `tbl_dutch`;
CREATE TABLE `tbl_dutch` (
  `id` int(11) NOT NULL,
  `id_config` int(11) NOT NULL,
  `value` varchar(200) NOT NULL
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
(13, 16, 'voldoet niet!,bestaat al!,De # rij verwijderen?,kan niet worden verwijderd!,De # lijst,is leeg!,of,en'),
(14, 17, 'rekeningen,Datum,Dienst,Rekeningnummer,Kleur,Beschrijving,Betaal,Beleggings,Spaar,Crypto'),
(15, 18, 'Zondag,Maandag,Dinsdag,Woensdag,Donderdag,Vrijdag,Zaterdag'),
(16, 19, 'Jan,Feb,Mrt,Apr,Mei,Jun,Jul,Aug,Sep,Okt,Nov,Dec'),
(17, 20, 'Zoek,Balans,Bedrag,Type,Aantal,thema,Kleur,Vermogen'),
(18, 21, 'Groepen,Groep,Rangorde,Beschrijving'),
(19, 22, 'Bedrijven,Groep,Bedrijf,Rangorde,Website'),
(20, 23, 'Aantal rijen per vel,Tussen 15 en 50,Valutateken,Teken,Start jaar ,Tussen 1970 en ,Wachtwoorden opnieuw invoeren als de salt pharse wijzigd.,Salt phrase,Plaats jouw salt phrase hier'),
(21, 24, 'Betaalrekeningen,Datum,Rekening,Inkomsten,afVast,afOverig,Groep,Bedrijf,Beschrijving'),
(22, 25, 'Beleggingsrekeningen,Datum,Storting,Onttrekking,Dienst,Rekening,Beschrijving'),
(23, 26, 'Spaarrekeningen,Datum,Storting,Onttrekking,Dienst,Rekening,Beschrijving'),
(24, 27, 'Cryptorekeningen,Datum,Storting,Onttrekking,Dienst,Rekening,Aantal,Crypto,Beschrijving'),
(25, 28, 'Cryptomunten,Naam,Symbool,Kleur,Website'),
(26, 29, 'Wallets,Dienst,Rekening,Crypto,Kleur,Beschrijving'),
(27, 30, 'Activa,Test 1,Test 2'),
(30, 31, 'Datum Waardes,Datum,Deze waardes,Er zijn geen # geselecteerd!,pagina\'s,rekeningen,Selecteer een datum!'),
(31, 32, 'Waarde Rekeningen,Rekeningendiagram,Waardeontwikkeling,Crypto Waardes,Crypto-diagram,Crypto-ontwikkeling'),
(32, 33, 'Type,Dienst,Rekeningen,Rekening,Aantal,Ratio,Waarde'),
(33, 34, 'Naam,Symbool,Ratio,Waarde'),
(34, 35, 'Jaaroverzicht,(kwartalen),(maanden),Overzicht in Jaren');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_english`
--

DROP TABLE IF EXISTS `tbl_english`;
CREATE TABLE `tbl_english` (
  `id` int(11) NOT NULL,
  `id_config` int(11) NOT NULL,
  `value` varchar(200) NOT NULL
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
(13, 16, 'is invalid!,already exists!,Delete the # row?,cannot be deleted!,The # list,is empty!,or,and'),
(14, 17, 'Accounts,Date,Service,Account Number,Color,Description,Payment ,Investment ,Savings ,Crypto '),
(15, 18, 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'),
(16, 19, 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'),
(17, 20, 'Search,Balance,Amount,Type,Number,theme,Color,Assets'),
(18, 21, 'Groups,Group,Ranking,Description'),
(19, 22, 'Businesses,Group,Business,Ranking,Website'),
(20, 23, 'Number of sheet rows,Between 15 and 50,Currency sign,Sign value,Start year ,Between 1970 and ,Re-enter all user passwords if the salt phrase is changed.,Salt phrase,Put your salt phrase here'),
(21, 24, 'Payment Accounts,Date,Account,Income,xFixed,xOther,Group,Business,Description'),
(22, 25, 'Investment Accounts,Date,Deposit,Withdrawal,Service,Account,Description'),
(23, 26, 'Savings Accounts,Date,Deposit,Withdrawal,Service,Account,Description'),
(24, 27, 'Crypto Accounts,Date,Deposit,Withdrawal,Service,Account,Number,Crypto,Description'),
(25, 28, 'Crypto Currencies,Name,Symbol,Color,Website'),
(26, 29, 'Wallets,Service,Account,Crypto,Color,Description'),
(27, 30, 'Activa,Test 1,Test 2'),
(28, 31, 'Date Values,Date,these values,There are no # enabled!,pages,accounts,Select a date!'),
(29, 32, 'Value Accounts,Accounts Chart,Value Development,Crypto Values,Crypto Chart,Crypto Development'),
(30, 33, 'Type,Service,Accounts,Account,Number,Ratio,Value'),
(31, 34, 'Name,Symbol,Ratio,Value'),
(32, 35, 'Year Overview,(quarters),(months),Overview of Years');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_finances`
--

DROP TABLE IF EXISTS `tbl_finances`;
CREATE TABLE `tbl_finances` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `aid` int(11) DEFAULT NULL,
  `income` decimal(11,2) DEFAULT NULL,
  `fixed` decimal(11,2) DEFAULT NULL,
  `other` decimal(11,2) DEFAULT NULL,
  `bid` int(11) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_groups`
--

DROP TABLE IF EXISTS `tbl_groups`;
CREATE TABLE `tbl_groups` (
  `id` int(11) NOT NULL,
  `hide` tinyint(4) DEFAULT 0,
  `group` varchar(50) NOT NULL,
  `description` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_language`
--

DROP TABLE IF EXISTS `tbl_language`;
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
-- Table structure for table `tbl_rankings`
--

DROP TABLE IF EXISTS `tbl_rankings`;
CREATE TABLE `tbl_rankings` (
  `gid` int(11) DEFAULT NULL,
  `bid` int(11) DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_savings`
--

DROP TABLE IF EXISTS `tbl_savings`;
CREATE TABLE `tbl_savings` (
  `id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `aid` int(11) NOT NULL,
  `deposit` decimal(11,2) DEFAULT NULL,
  `withdrawal` decimal(11,2) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_services`
--

DROP TABLE IF EXISTS `tbl_services`;
CREATE TABLE `tbl_services` (
  `id` int(11) NOT NULL,
  `hide` tinyint(4) DEFAULT 0,
  `service` varchar(45) NOT NULL,
  `finance` varchar(10) DEFAULT '&#9744;',
  `stock` varchar(10) DEFAULT '&#9744;',
  `savings` varchar(10) DEFAULT '&#9744;',
  `crypto` varchar(10) DEFAULT '&#9744;',
  `website` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_services`
--

INSERT INTO `tbl_services` (`id`, `hide`, `service`, `finance`, `stock`, `savings`, `crypto`, `website`) VALUES
(1, 0, 'ING Particulier', '&#9744;', '&#9745;', '&#9745;', '&#9744;', 'https://www.ing.nl'),
(2, 0, 'Meesman', '&#9744;', '&#9745;', '&#9744;', '&#9744;', 'https://www.meesman.nl'),
(3, 0, 'ABN AMRO', '&#9744;', '&#9744;', '&#9745;', '&#9744;', 'https://www.abnamro.nl');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_settings`
--

DROP TABLE IF EXISTS `tbl_settings`;
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
(2, 'finance', '{\"page\": \"true\", \"show\": \"true\", \"sort\": {\"bsn\": \"false\", \"grp\": \"false\"}, \"scale\": \"months\", \"start\": \"2020\", \"theme\": {\"color\": \"#ffd700\"}}'),
(3, 'stock', '{\"page\": \"true\", \"show\": \"true\", \"scale\": \"year\", \"start\": \"2020\", \"theme\": {\"color\": \"#228b22\"}}'),
(4, 'savings', '{\"page\": \"true\", \"show\": \"true\", \"scale\": \"quarters\", \"start\": \"2020\", \"theme\": {\"color\": \"#4169e1\"}}'),
(5, 'crypto', '{\"page\": \"true\", \"show\": \"true\", \"scale\": \"year\", \"start\": \"2020\", \"theme\": {\"color\": \"#ff8f00\"}}'),
(6, 'settings', '{\"page\": \"true\", \"rows\": \"25\", \"show\": \"true\", \"sign\": \"€\", \"theme\": {\"color\": \"#536878\"}}'),
(7, 'logout', '{\"page\": \"true\"}'),
(8, 'language', '{\"code\": \"EN\", \"language\": \"English\"}'),
(9, 'salt', '{\"phrase\": \"Please put your SALT pharse here.\"}');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_stocks`
--

DROP TABLE IF EXISTS `tbl_stocks`;
CREATE TABLE `tbl_stocks` (
  `id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `aid` int(11) NOT NULL,
  `deposit` decimal(11,2) DEFAULT NULL,
  `withdrawal` decimal(11,2) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_stocks`
--

INSERT INTO `tbl_stocks` (`id`, `date`, `aid`, `deposit`, `withdrawal`, `description`) VALUES
(1, '2020-01-06', 1, 50.00, NULL, 'Van betaalrekening'),
(2, '2020-01-13', 2, 100.00, NULL, 'Van betaalrekening'),
(3, '2020-04-06', 1, 50.00, NULL, 'Van betaalrekening'),
(4, '2020-04-13', 2, 100.00, NULL, 'Van betaalrekening'),
(5, '2020-07-06', 1, 50.00, NULL, 'Van betaalrekening'),
(6, '2020-07-13', 2, 100.00, NULL, 'Van betaalrekening'),
(7, '2020-10-05', 1, 50.00, NULL, 'Van betaalrekening'),
(8, '2020-10-12', 2, 100.00, NULL, 'Van betaalrekening'),
(9, '2021-01-04', 1, 50.00, NULL, 'Van betaalrekening'),
(10, '2021-01-11', 2, 100.00, NULL, 'Van betaalrekening'),
(11, '2021-04-05', 1, 50.00, NULL, 'Van betaalrekening'),
(12, '2021-04-12', 2, 100.00, NULL, 'Van betaalrekening'),
(13, '2021-07-05', 1, 50.00, NULL, 'Van betaalrekening'),
(14, '2021-07-12', 2, 100.00, NULL, 'Van betaalrekening'),
(15, '2021-10-04', 1, 50.00, NULL, 'Van betaalrekening'),
(16, '2021-10-11', 2, 100.00, NULL, 'Van betaalrekening'),
(17, '2022-01-03', 1, 50.00, NULL, 'Van betaalrekening'),
(18, '2022-01-10', 2, 100.00, NULL, 'Van betaalrekening'),
(19, '2022-04-04', 1, 50.00, NULL, 'Van betaalrekening'),
(20, '2022-04-11', 2, 100.00, NULL, 'Van betaalrekening'),
(21, '2022-07-04', 1, 50.00, NULL, 'Van betaalrekening'),
(22, '2022-07-11', 2, 100.00, NULL, 'Van betaalrekening'),
(23, '2022-10-03', 1, 50.00, NULL, 'Van betaalrekening'),
(24, '2022-10-10', 2, 100.00, NULL, 'Van betaalrekening'),
(25, '2023-01-02', 1, 50.00, NULL, 'Van betaalrekening'),
(26, '2023-01-09', 2, 100.00, NULL, 'Van betaalrekening'),
(27, '2023-04-03', 1, 50.00, NULL, 'Van betaalrekening'),
(28, '2023-04-10', 2, 100.00, NULL, 'Van betaalrekening'),
(29, '2023-07-03', 1, 50.00, NULL, 'Van betaalrekening'),
(30, '2023-07-10', 2, 100.00, NULL, 'Van betaalrekening'),
(31, '2023-10-02', 1, 50.00, NULL, 'Van betaalrekening'),
(32, '2023-10-09', 2, 100.00, NULL, 'Van betaalrekening'),
(33, '2024-01-08', 1, 50.00, NULL, 'Van betaalrekening'),
(34, '2024-01-15', 2, 100.00, NULL, 'Van betaalrekening'),
(35, '2024-04-08', 1, 50.00, NULL, 'Van betaalrekening'),
(36, '2024-04-15', 2, 100.00, NULL, 'Van betaalrekening'),
(37, '2024-07-08', 1, 50.00, NULL, 'Van betaalrekening'),
(38, '2024-07-15', 2, 100.00, NULL, 'Van betaalrekening'),
(39, '2024-10-07', 1, 50.00, NULL, 'Van betaalrekening'),
(40, '2024-10-14', 2, 100.00, NULL, 'Van betaalrekening'),
(41, '2025-01-06', 1, 50.00, NULL, 'Van betaalrekening'),
(42, '2025-01-13', 2, 100.00, NULL, 'Van betaalrekening'),
(43, '2025-04-07', 1, 50.00, NULL, 'Van betaalrekening'),
(44, '2025-04-14', 2, 100.00, NULL, 'Van betaalrekening'),
(45, '2025-07-07', 1, 50.00, NULL, 'Van betaalrekening'),
(46, '2025-07-14', 2, 100.00, NULL, 'Van betaalrekening'),
(47, '2025-10-06', 1, 50.00, NULL, 'Van betaalrekening'),
(48, '2025-10-13', 2, 100.00, NULL, 'Van betaalrekening');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

DROP TABLE IF EXISTS `tbl_users`;
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
(1, 'Admin', '9e71af2675ef9d36c6d23b737d0be7c1bd828c6cea289f91f7199478d8bcf46e', '2025-09-12 15:21:14', '2025-05-24 12:43:59');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_value_accounts`
--

DROP TABLE IF EXISTS `tbl_value_accounts`;
CREATE TABLE `tbl_value_accounts` (
  `id` int(11) NOT NULL,
  `hide` tinyint(4) DEFAULT 0,
  `date` date NOT NULL,
  `aid` int(11) NOT NULL,
  `value` decimal(11,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_value_cryptos`
--

DROP TABLE IF EXISTS `tbl_value_cryptos`;
CREATE TABLE `tbl_value_cryptos` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `cid` int(11) NOT NULL,
  `value` decimal(11,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_wallets`
--

DROP TABLE IF EXISTS `tbl_wallets`;
CREATE TABLE `tbl_wallets` (
  `id` int(11) NOT NULL,
  `hide` tinyint(4) DEFAULT 0,
  `aid` int(11) NOT NULL,
  `cid` int(11) NOT NULL,
  `color` varchar(10) DEFAULT '',
  `description` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_accounts`
--
ALTER TABLE `tbl_accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_amount_wallets`
--
ALTER TABLE `tbl_amount_wallets`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `tbl_crypto`
--
ALTER TABLE `tbl_crypto`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_cryptocurrenties`
--
ALTER TABLE `tbl_cryptocurrenties`
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
-- Indexes for table `tbl_finances`
--
ALTER TABLE `tbl_finances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `date` (`date`),
  ADD KEY `bid` (`bid`);

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
-- Indexes for table `tbl_savings`
--
ALTER TABLE `tbl_savings`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `tbl_stocks`
--
ALTER TABLE `tbl_stocks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_UNIQUE` (`user`);

--
-- Indexes for table `tbl_value_accounts`
--
ALTER TABLE `tbl_value_accounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `date` (`date`);

--
-- Indexes for table `tbl_value_cryptos`
--
ALTER TABLE `tbl_value_cryptos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `date` (`date`);

--
-- Indexes for table `tbl_wallets`
--
ALTER TABLE `tbl_wallets`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_accounts`
--
ALTER TABLE `tbl_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_amount_wallets`
--
ALTER TABLE `tbl_amount_wallets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_businesses`
--
ALTER TABLE `tbl_businesses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_config`
--
ALTER TABLE `tbl_config`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `tbl_crypto`
--
ALTER TABLE `tbl_crypto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_cryptocurrenties`
--
ALTER TABLE `tbl_cryptocurrenties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_dutch`
--
ALTER TABLE `tbl_dutch`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `tbl_english`
--
ALTER TABLE `tbl_english`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `tbl_finances`
--
ALTER TABLE `tbl_finances`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_groups`
--
ALTER TABLE `tbl_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_language`
--
ALTER TABLE `tbl_language`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_savings`
--
ALTER TABLE `tbl_savings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_services`
--
ALTER TABLE `tbl_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_settings`
--
ALTER TABLE `tbl_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tbl_stocks`
--
ALTER TABLE `tbl_stocks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_value_accounts`
--
ALTER TABLE `tbl_value_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_value_cryptos`
--
ALTER TABLE `tbl_value_cryptos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_wallets`
--
ALTER TABLE `tbl_wallets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
