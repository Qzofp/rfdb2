-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 27, 2024 at 12:27 PM
-- Server version: 8.0.37-0ubuntu0.22.04.3
-- PHP Version: 8.1.2-1ubuntu2.18

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
-- Table structure for table `tbl_accounts`
--

DROP TABLE IF EXISTS `tbl_accounts`;
CREATE TABLE `tbl_accounts` (
  `id` int NOT NULL,
  `hide` tinyint DEFAULT '0',
  `account` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` datetime DEFAULT NULL,
  `sid` int DEFAULT NULL,
  `type` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_accounts`
--

INSERT INTO `tbl_accounts` (`id`, `hide`, `account`, `date`, `sid`, `type`, `description`) VALUES
(1, 0, 'NL86 INGB 000x xxxx 00', '1982-03-25 14:15:58', 1, 'finance', 'ING betaalrekening van Rizzo'),
(2, 0, 'NL02 ABNA 000x xxxx xx', '2007-07-12 13:54:30', 2, 'finance', 'ABN AMRO 2de betaalrekening van Rizzo'),
(3, 0, 'NL86 INGB 000x xxxx 01', '2021-11-06 14:43:57', 1, 'finance', 'ING betaalrekening van Rizzo&#39;s vrouw'),
(4, 0, 'H#6463 02', '1996-05-14 14:45:47', 12, 'savings', 'Bank H spaarrekening van Rizzo'),
(5, 0, 'BK#1254', '2023-08-24 11:33:04', 15, 'crypto', 'BitKudo Exchange'),
(6, 0, 'My Wallet #1', '2015-02-24 12:14:15', 16, 'crypto', 'Hardware Wallet'),
(7, 0, 'My Wallet #2', '2024-03-05 11:56:39', 16, 'crypto', ''),
(11, 0, 'ABN#6435', '2020-03-20 13:08:54', 2, 'savings', 'Spaarrekening ABN AMRO'),
(13, 0, 'C#4567', '2014-06-20 12:00:14', 5, 'savings', 'Test'),
(14, 1, '&amp;122%@', '2024-04-17 13:19:31', 5, 'finance', 'Test ^&amp;*#$@2'),
(16, 0, 'AB-STK-0012', '2020-02-05 10:46:49', 19, 'stock', 'Aandelen Beleggingsrekening'),
(17, 0, 'ING-0001-0022', '1998-05-14 10:45:20', 1, 'stock', 'ING Belegginsrekening'),
(18, 0, 'AB-ETF-0198', '2022-09-29 10:46:29', 19, 'stock', 'ETF Beleggingsrekening'),
(19, 0, 'ING-001-236', '2001-07-12 13:09:43', 1, 'savings', 'ING Spaarekening'),
(20, 0, 'AB-SPAAR-23', '2024-06-18 13:55:23', 19, 'savings', 'A & B Bank Spaarrekening'),
(21, 0, 'TST#3', '2024-06-21 11:46:53', 16, 'crypto', 'Test 3');

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
(22, 'Businesses', NULL),
(23, 'Setconfigs', NULL),
(24, 'Payment', NULL),
(25, 'Investment', NULL),
(26, 'Savings', NULL),
(27, 'Crypto', NULL),
(28, 'Cryptocurrenties', NULL),
(29, 'Wallets', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_crypto`
--

DROP TABLE IF EXISTS `tbl_crypto`;
CREATE TABLE `tbl_crypto` (
  `id` int NOT NULL,
  `date` date DEFAULT NULL,
  `wid` int NOT NULL,
  `deposit` decimal(11,2) DEFAULT NULL,
  `withdrawal` decimal(11,2) DEFAULT NULL,
  `amount` decimal(11,8) DEFAULT NULL,
  `description` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_crypto`
--

INSERT INTO `tbl_crypto` (`id`, `date`, `wid`, `deposit`, `withdrawal`, `amount`, `description`) VALUES
(1, '2024-03-07', 1, '100.00', NULL, '0.10000000', 'Voor 100 Euro 0,1 BTC gekocht van Bitonic'),
(2, '2024-05-31', 1, NULL, '50.00', '0.02000000', 'Voor 50 Euro 0,02 BTC verkocht aan Bitonic'),
(3, '2024-06-04', 10, '250.00', NULL, '1.00000000', 'Storting van ING betaalrekening naar BitKudo Exchange'),
(4, '2024-06-04', 10, NULL, NULL, '12.47300000', 'Ethereum gekocht van de BitKudo Exchange'),
(8, '2024-07-09', 2, '150.99', NULL, '0.12000000', 'Test'),
(9, '2024-07-09', 2, '52.20', NULL, '0.01200000', 'Test'),
(10, '2024-07-09', 2, NULL, '25.00', '0.00312000', 'Test'),
(11, '2024-07-10', 3, NULL, '180.00', '-0.01290000', 'Test 2'),
(12, '2024-07-10', 2, '180.00', NULL, '2.34500000', 'Test'),
(13, '2024-07-24', 22, '50.00', NULL, '65.35400000', 'Ada test'),
(14, '2024-07-18', 24, '75.00', NULL, '143.34000000', 'Ada 2 test');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_cryptocurrenties`
--

DROP TABLE IF EXISTS `tbl_cryptocurrenties`;
CREATE TABLE `tbl_cryptocurrenties` (
  `id` int NOT NULL,
  `hide` tinyint DEFAULT '0',
  `name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `symbol` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `website` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_cryptocurrenties`
--

INSERT INTO `tbl_cryptocurrenties` (`id`, `hide`, `name`, `symbol`, `website`) VALUES
(1, 0, 'Bitcoin', 'BTC', 'https://bitcoin.org'),
(2, 0, 'Ethereum', 'ETH', 'https://ethereum.org'),
(4, 1, 'XRP', 'XRP', 'https://xrpl.org'),
(8, 0, 'Cardano', 'ADA', 'https://www.cardano.org');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_dutch`
--

DROP TABLE IF EXISTS `tbl_dutch`;
CREATE TABLE `tbl_dutch` (
  `id` int NOT NULL,
  `id_config` int NOT NULL,
  `value` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL
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
(13, 16, 'voldoet niet!,bestaat al!,# verwijderen?,kan niet worden verwijderd!,De # lijst,is leeg!,of,en'),
(14, 17, 'rekeningen,Datum,Dienst,Rekeningnummer,Beschrijving,Betaal,Beleggings,Spaar,Crypto'),
(15, 18, 'Zondag,Maandag,Dinsdag,Woensdag,Donderdag,Vrijdag,Zaterdag'),
(16, 19, 'Jan,Feb,Mrt,Apr,Mei,Jun,Jul,Aug,Sep,Okt,Nov,Dec'),
(17, 20, 'Zoek,Balans,Bedrag,Type'),
(18, 21, 'Groepen,Groep,Rangorde,Beschrijving'),
(19, 22, 'Bedrijven,Groep,Bedrijf,Rangorde,Website'),
(20, 23, 'Aantal rijen per vel,Tussen 15 en 50,Valutateken,Teken,Start jaar ,Tussen 1970 en ,Wachtwoorden opnieuw invoeren als de salt pharse wijzigd.,Salt phrase,Plaats jouw salt phrase hier'),
(21, 24, 'Betaalrekeningen,Datum,Rekening,Inkomsten,afVast,afOverig,Groep,Bedrijf,Beschrijving'),
(22, 25, 'Beleggingsrekeningen,Datum,Storting,Onttrekking,Dienst,Rekening,Beschrijving'),
(23, 26, 'Spaarrekeningen,Datum,Storting,Onttrekking,Dienst,Rekening,Beschrijving'),
(24, 27, 'Cryptorekeningen,Datum,Storting,Onttrekking,Dienst,Rekening,Aantal,Crypto,Beschrijving'),
(25, 28, 'Cryptomunten,Naam,Symbool,Website'),
(26, 29, 'Wallets,Dienst,Rekening,Crypto,Beschrijving');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_english`
--

DROP TABLE IF EXISTS `tbl_english`;
CREATE TABLE `tbl_english` (
  `id` int NOT NULL,
  `id_config` int NOT NULL,
  `value` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL
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
(13, 16, 'is invalid!,already exists!,Delete #?,cannot be deleted!,The # list,is empty!,or,and'),
(14, 17, 'Accounts,Date,Service,Account Number,Description,Payment ,Investment ,Savings ,Crypto '),
(15, 18, 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'),
(16, 19, 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'),
(17, 20, 'Search,Balance,Amount,Type'),
(18, 21, 'Groups,Group,Ranking,Description'),
(19, 22, 'Businesses,Group,Business,Ranking,Website'),
(20, 23, 'Number of sheet rows,Between 15 and 50,Currency sign,Sign value,Start year ,Between 1970 and ,Re-enter all user passwords if the salt phrase is changed.,Salt phrase,Put your salt phrase here'),
(21, 24, 'Payment Accounts,Date,Account,Income,xFixed,xOther,Group,Business,Description'),
(22, 25, 'Investment Accounts,Date,Deposit,Withdrawal,Service,Account,Description'),
(23, 26, 'Savings Accounts,Date,Deposit,Withdrawal,Service,Account,Description'),
(24, 27, 'Crypto Accounts,Date,Deposit,Withdrawal,Service,Account,Number,Crypto,Description'),
(25, 28, 'Crypto Currencies,Name,Symbol,Website'),
(26, 29, 'Wallets,Service,Account,Crypto,Description');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_finances`
--

DROP TABLE IF EXISTS `tbl_finances`;
CREATE TABLE `tbl_finances` (
  `id` int NOT NULL,
  `date` date NOT NULL,
  `aid` int DEFAULT NULL,
  `income` decimal(11,2) DEFAULT NULL,
  `fixed` decimal(11,2) DEFAULT NULL,
  `other` decimal(11,2) DEFAULT NULL,
  `bid` int DEFAULT NULL,
  `description` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_finances`
--

INSERT INTO `tbl_finances` (`id`, `date`, `aid`, `income`, `fixed`, `other`, `bid`, `description`) VALUES
(1, '2024-04-30', 1, NULL, '9999.99', NULL, 4, 'Dit is een test regel. Test Test Test.'),
(2, '2024-04-30', 1, '199.00', NULL, NULL, 14, 'Nog een hele hele lange test regel regel, test test test,'),
(4, '2024-04-24', 2, '5.10', NULL, NULL, 10, 'Dit is een ABNA Test.'),
(5, '2024-04-25', 2, NULL, NULL, '389.99', 1, 'Dit nog een ABNA test.'),
(6, '2024-07-01', 3, '100.00', NULL, NULL, 4, 'Pizza'),
(7, '2024-07-02', 2, NULL, '1.20', NULL, 5, 'Stroom'),
(8, '2024-07-02', 2, NULL, NULL, '1999.99', 12, 'Fiets'),
(9, '2024-07-03', 2, '199.59', NULL, NULL, 1, 'Gemeente'),
(10, '2024-07-03', 2, NULL, '150.10', NULL, 5, 'Stroom test'),
(11, '2024-07-03', 2, NULL, '100.00', NULL, 8, 'Feestje'),
(12, '2024-07-04', 2, NULL, NULL, '15.00', 14, 'Computer'),
(13, '2024-07-05', 2, '100.00', NULL, NULL, 8, 'Meer feest'),
(14, '2024-07-05', 1, NULL, '1000.00', NULL, 5, 'Energie'),
(15, '2024-07-04', 3, NULL, NULL, '150.00', 8, 'Feest'),
(16, '2024-07-05', 2, NULL, NULL, '100.00', 6, 'Benzine'),
(17, '2024-07-05', 2, '99.69', NULL, NULL, 7, 'Diesel'),
(18, '2024-07-05', 2, NULL, '99.69', NULL, 12, 'Banden'),
(19, '2024-07-05', 2, NULL, NULL, '10.59', 8, 'Kaartje'),
(20, '2024-07-05', 3, '5000.00', NULL, NULL, 10, 'Salaris'),
(21, '2024-07-06', 2, NULL, '100.00', NULL, 12, 'Fiets'),
(22, '2024-07-06', 2, '150.00', NULL, NULL, 2, 'Teruggave'),
(23, '2024-07-06', 1, NULL, NULL, '199.00', 8, 'Kaartje'),
(24, '2024-07-06', 2, '190.00', NULL, NULL, 8, 'Test'),
(29, '2024-07-07', 3, NULL, '10.00', NULL, 6, 'Benzine'),
(30, '2024-07-07', 1, NULL, '5.96', NULL, 3, 'Drinken'),
(31, '2024-07-07', 1, NULL, '6.72', NULL, 12, 'Onderdeel'),
(32, '2024-07-07', 3, '1500.00', NULL, NULL, 10, 'Vergoeding'),
(33, '2024-07-07', 1, NULL, '6.00', NULL, 12, 'Onderdeel'),
(34, '2024-07-08', 2, NULL, NULL, '145.00', 2, 'Bijdrage'),
(35, '2024-07-08', 2, NULL, NULL, '3.95', 3, 'Drinken'),
(36, '2024-07-08', 1, NULL, '12.00', NULL, 7, 'Benzine'),
(37, '2024-07-08', 1, NULL, '52.71', NULL, 12, 'Onderdeel'),
(49, '2024-07-08', 1, '100.00', NULL, NULL, 8, 'Test'),
(50, '2024-07-08', 2, NULL, '14.99', NULL, 8, 'Test'),
(51, '2024-07-08', 3, NULL, '25.05', NULL, 6, 'Benzine'),
(52, '2024-07-08', 1, NULL, '52.53', NULL, 6, 'Benzine'),
(53, '2024-07-08', 2, NULL, '40.00', NULL, 10, 'Vergoeding'),
(55, '2024-07-09', 1, '50.91', NULL, NULL, 10, 'Vergoeding'),
(63, '2024-07-09', 2, '10.00', NULL, NULL, 10, 'Vergoeding'),
(65, '2024-07-10', 2, '10.00', NULL, NULL, 10, 'Vergoeding'),
(74, '2024-07-10', 1, '20.00', NULL, NULL, 10, 'Vergoeding'),
(75, '2024-07-11', 1, '10.00', NULL, NULL, 10, 'Vergoeding'),
(76, '2024-07-11', 2, '10.00', NULL, NULL, 10, 'Vergoeding'),
(77, '2024-07-11', 1, NULL, '6.95', NULL, 8, 'Feestje'),
(80, '2024-06-01', 2, '200.00', NULL, NULL, 10, 'Vergoeding'),
(81, '2024-06-01', 1, NULL, '110.00', NULL, 2, 'Bijdrage'),
(84, '2024-06-02', 1, NULL, '30.00', NULL, 7, 'Diesel'),
(85, '2024-06-02', 1, NULL, NULL, '15.00', 4, 'Pizza'),
(86, '2024-01-10', 2, '300.00', NULL, NULL, 10, 'Vergoeding'),
(87, '2024-06-03', 3, NULL, '45.00', NULL, 12, 'Onderdeel'),
(88, '2024-07-12', 1, NULL, '50.00', NULL, 7, 'Diesel'),
(95, '2024-07-15', 3, NULL, NULL, '50.00', 2, '3');

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
(50, 2, '2024-07-22 13:18:13');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_savings`
--

DROP TABLE IF EXISTS `tbl_savings`;
CREATE TABLE `tbl_savings` (
  `id` int NOT NULL,
  `date` date DEFAULT NULL,
  `aid` int NOT NULL,
  `deposit` decimal(11,2) DEFAULT NULL,
  `withdrawal` decimal(11,2) DEFAULT NULL,
  `description` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_savings`
--

INSERT INTO `tbl_savings` (`id`, `date`, `aid`, `deposit`, `withdrawal`, `description`) VALUES
(1, '2024-02-24', 11, '50.00', NULL, 'Storing van ABN betaalrekening'),
(2, '2024-03-01', 19, '150.00', NULL, 'Storing van ING betaalrekening'),
(3, '2024-03-14', 19, '75.00', NULL, 'Storting van ING betaalrekening'),
(4, '2024-04-06', 11, NULL, '35.00', 'Onttrekking naar ABN betaalrekening'),
(5, '2024-04-07', 4, '600.00', NULL, 'Storing van Bank H betaalrekening'),
(7, '2024-05-01', 19, NULL, '80.00', 'Onttrekking naar ING betaalrekening'),
(8, '2024-05-18', 19, '80.00', NULL, 'Storting van ING betaalrekening'),
(9, '2024-07-03', 19, '50.00', NULL, 'ING Test'),
(10, '2024-07-04', 20, '50.00', NULL, 'AB Test'),
(22, '2024-07-10', 19, NULL, '10.00', 'ING Test'),
(29, '2024-10-07', 20, '1999.99', NULL, 'Test');

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
(1, 0, 'ING Particulier', '&#9745;', '&#9745;', '&#9745;', '&#9744;', 'https://www.ing.nl/particulier'),
(2, 0, 'ABN AMRO Bank ABN AMRO Bank', '&#9745;', '&#9744;', '&#9745;', '&#9744;', 'https://www.abnamro.nl/nl/personal/index.html'),
(3, 0, 'Bank A', '&#9745;', '&#9744;', '&#9745;', '&#9744;', 'https://www.banka.nl'),
(4, 1, 'Bank B', '&#9745;', '&#9744;', '&#9745;', '&#9745;', 'https://www.bankb.nl'),
(5, 0, 'Bank C', '&#9745;', '&#9744;', '&#9745;', '&#9744;', 'https://www.bankc.nl'),
(7, 1, 'Bank D', '&#9744;', '&#9745;', '&#9744;', '&#9744;', 'https://www.bankd.nl'),
(8, 0, 'Bank E', '&#9745;', '&#9744;', '&#9744;', '&#9744;', 'https://www.banke.nl'),
(9, 0, 'Bank F', '&#9744;', '&#9744;', '&#9744;', '&#9744;', ''),
(12, 0, 'Bank H', '&#9744;', '&#9744;', '&#9745;', '&#9744;', 'https://www.bankh.nl'),
(14, 0, 'Bank J', '&#9744;', '&#9744;', '&#9744;', '&#9744;', 'https://www.bankj.nl'),
(15, 0, 'BitKudo Exchange', '&#9744;', '&#9744;', '&#9744;', '&#9745;', 'http://www.bitkudo.com'),
(16, 0, 'Trezor', '&#9744;', '&#9744;', '&#9744;', '&#9745;', ''),
(19, 0, 'A & B Bank', '&#9744;', '&#9745;', '&#9745;', '&#9744;', 'http://A&Bbank.nl');

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
(2, 'finance', '{\"page\": \"true\", \"show\": \"true\", \"sort\": {\"bsn\": \"true\", \"grp\": \"false\"}, \"scale\": \"months\", \"start\": \"2001\", \"theme\": {\"color\": \"#ffd700\"}}'),
(3, 'stock', '{\"page\": \"true\", \"show\": \"true\", \"scale\": \"year\", \"start\": \"2024\", \"theme\": {\"color\": \"#228b22\"}}'),
(4, 'savings', '{\"page\": \"true\", \"show\": \"true\", \"scale\": \"quarters\", \"start\": \"2024\", \"theme\": {\"color\": \"#4169e1\"}}'),
(5, 'crypto', '{\"page\": \"true\", \"show\": \"true\", \"scale\": \"year\", \"start\": \"2024\", \"theme\": {\"color\": \"#ff8f00\"}}'),
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
  `id` int NOT NULL,
  `date` date DEFAULT NULL,
  `aid` int NOT NULL,
  `deposit` decimal(11,2) DEFAULT NULL,
  `withdrawal` decimal(11,2) DEFAULT NULL,
  `description` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_stocks`
--

INSERT INTO `tbl_stocks` (`id`, `date`, `aid`, `deposit`, `withdrawal`, `description`) VALUES
(1, '2024-05-01', 16, '150.00', NULL, 'Aankoop 5 Aandelen Shell'),
(2, '2024-05-02', 17, '500.00', NULL, 'Aankoop 15 Aandelen Unilever'),
(3, '2024-05-05', 18, '50.00', NULL, 'Aankoop 2 ETF Northern Trust World'),
(4, '2024-05-11', 17, NULL, '100.00', 'Verkoop 3 Aandelen Unilever'),
(5, '2024-06-11', 18, '1000.00', NULL, 'Test'),
(6, '2024-06-12', 17, '500.00', NULL, 'Test 2'),
(10, '2024-06-13', 18, NULL, '100.99', 'Test 3'),
(13, '2024-06-15', 18, NULL, '1000.99', 'Test 4'),
(14, '2024-06-15', 17, '2000.00', NULL, 'Test 5'),
(15, '2024-06-18', 17, NULL, '500.00', 'Test 6'),
(16, '2024-06-20', 16, NULL, '100.00', 'Test 7');

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
(1, 'Admin', '9e71af2675ef9d36c6d23b737d0be7c1bd828c6cea289f91f7199478d8bcf46e', '2024-04-22 13:48:51', '2024-04-19 11:19:47'),
(2, 'Rizzo', '5cc955b91289a48f2bb3a1d31cf4badfe74e2381d69ca68d6a7db63e23871098', '2024-07-27 11:00:31', '2024-07-22 13:50:35'),
(21, 'Test1', 'a7bedba509bb4eb73f7841380f17a82df4452ce364bf9de70c7035fa0c601707', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_wallets`
--

DROP TABLE IF EXISTS `tbl_wallets`;
CREATE TABLE `tbl_wallets` (
  `id` int NOT NULL,
  `hide` tinyint DEFAULT '0',
  `aid` int NOT NULL,
  `cid` int NOT NULL,
  `description` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_wallets`
--

INSERT INTO `tbl_wallets` (`id`, `hide`, `aid`, `cid`, `description`) VALUES
(1, 0, 6, 1, 'Trezor BTC Wallet'),
(2, 0, 7, 2, 'Trezor ETH Wallet'),
(3, 0, 5, 1, 'BitKudo Exchange BTC Wallet'),
(7, 0, 6, 2, 'Testje 3'),
(9, 1, 5, 4, 'Testje 4'),
(10, 0, 5, 2, 'BitKudo Exchange ETH Wallet'),
(22, 0, 21, 8, ''),
(24, 0, 7, 8, 'ADA Wallet');

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `tbl_businesses`
--
ALTER TABLE `tbl_businesses`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `tbl_config`
--
ALTER TABLE `tbl_config`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `tbl_crypto`
--
ALTER TABLE `tbl_crypto`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tbl_cryptocurrenties`
--
ALTER TABLE `tbl_cryptocurrenties`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tbl_dutch`
--
ALTER TABLE `tbl_dutch`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `tbl_english`
--
ALTER TABLE `tbl_english`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `tbl_finances`
--
ALTER TABLE `tbl_finances`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

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
-- AUTO_INCREMENT for table `tbl_savings`
--
ALTER TABLE `tbl_savings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

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
-- AUTO_INCREMENT for table `tbl_stocks`
--
ALTER TABLE `tbl_stocks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `tbl_wallets`
--
ALTER TABLE `tbl_wallets`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
