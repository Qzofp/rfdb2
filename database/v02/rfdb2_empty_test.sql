-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 07, 2024 at 04:44 PM
-- Server version: 8.0.39-0ubuntu0.22.04.1
-- PHP Version: 8.1.2-1ubuntu2.19

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
  `account` varbinary(200) NOT NULL,
  `date` datetime DEFAULT NULL,
  `sid` int DEFAULT NULL,
  `type` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_accounts`
--

INSERT INTO `tbl_accounts` (`id`, `hide`, `account`, `date`, `sid`, `type`, `description`) VALUES
(1, 0, 0xaf4625a6843646707b0f5f09e5992d1bc69ff9e57288fd858c0f1889eeccec17, '2001-04-04 13:53:34', 1, 'finance', 'ING betaalrekening van Rizzo'),
(2, 0, 0x7e8893523f6fb08b2b09adce75818f4145433232d6d151a81b2b0230661a3f5c, '2014-08-14 13:53:19', 2, 'finance', 'ABN AMRO 2de betaalrekening van Rizzo'),
(3, 0, 0xf88222f64335d3d233895fb2919b2b34, '2005-09-22 10:32:37', 1, 'stock', 'ING beleggingsrekening'),
(4, 0, 0xb20fed245787d866d957497b4c301e36, '2016-03-10 10:34:05', 4, 'stock', 'Bank B belegginsrekening'),
(5, 0, 0x1a813d0f78e1d93eb79ad3f4661b6dc4, '2008-07-15 15:16:51', 3, 'savings', 'Bank A spaarrekening'),
(6, 0, 0x03a4d441647a290e6638cd2e18744b80, '2012-12-14 15:16:54', 4, 'savings', 'Bank B spaarrekening'),
(7, 0, 0xc45c341b91a61fb78553024f06cabc1c, '2018-10-17 10:37:51', 6, 'crypto', 'Trezor Wallet #1'),
(8, 0, 0xc45c341b91a61fb78553024f06cabc1c, '2020-01-16 14:50:15', 5, 'crypto', 'Exchange A Wallet #1'),
(9, 0, 0xb90d0dc9d300c028e5de721a2bbd725d, '2022-08-18 10:40:06', 6, 'crypto', 'Trezor Wallet #2');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_amount_wallets`
--

DROP TABLE IF EXISTS `tbl_amount_wallets`;
CREATE TABLE `tbl_amount_wallets` (
  `id` int NOT NULL,
  `hide` tinyint DEFAULT '0',
  `vid` int NOT NULL,
  `wid` int NOT NULL,
  `amount` decimal(11,8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_amount_wallets`
--

INSERT INTO `tbl_amount_wallets` (`id`, `hide`, `vid`, `wid`, `amount`) VALUES
(1, 0, 1, 1, '0.03679673'),
(2, 0, 2, 4, '0.05308090'),
(3, 0, 2, 3, '0.00011450'),
(4, 0, 1, 2, '0.01864570'),
(8, 0, 4, 1, '0.03679673'),
(9, 0, 5, 4, '0.05308090'),
(10, 0, 5, 3, '0.05045750'),
(11, 0, 4, 2, '0.01864570'),
(15, 0, 7, 1, '0.03679673'),
(16, 0, 8, 4, '0.05308090'),
(17, 0, 8, 3, '0.05045750'),
(18, 0, 7, 2, '0.01864570');

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
(1, 0, 'Menzis', 1, 'https://www.menzis.nl', 1, 'Salaris'),
(2, 0, 'VVE', 2, 'https://www.myriade.nl', 2, 'Bijdrage'),
(3, 0, 'Gemeente Emmen', 2, 'https://www.gemeente-emmen.nl', 2, 'Gemeentelijke belastingen'),
(4, 0, 'Shell', 3, 'https://www.shell.nl', -1, NULL),
(5, 0, 'Esso', 3, 'https://www.esso.nl', -1, NULL),
(6, 0, 'Eneco', 4, 'www.eneoco.nl', 2, 'Augustus');

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
(2, 'Copyrights', '&copy;2024 Rizzo Productions'),
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
(34, 'ValueCryptos', NULL);

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
(1, '2024-07-02', 1, '100.00', NULL, '0.00002300', 'Gekocht van Bitonic'),
(2, '2024-07-04', 4, '50.00', NULL, '0.00786120', 'Gekocht op Exchange A'),
(3, '2024-07-10', 1, '150.00', NULL, '0.01243253', 'Gekocht van Bitonic'),
(4, '2024-07-12', 4, NULL, '20.00', '-0.00011450', 'Verstuurt naar Trezor Wallet #1, ETH'),
(5, '2024-07-12', 3, '20.00', NULL, '0.00011450', 'Ontvangen van Exchange A wallet'),
(6, '2024-07-14', 2, '200.00', NULL, '0.01834340', 'Gekocht van Bitonic'),
(7, '2024-07-17', 1, '200.00', NULL, '0.02434120', 'Gekocht van Bitonic'),
(8, '2024-07-20', 4, '150.00', NULL, '0.04533420', 'Gekocht op Exchange A'),
(9, '2024-07-21', 2, '50.00', NULL, '0.00030230', 'Gekocht van Bitonic'),
(10, '2024-08-01', 3, '200.00', NULL, '0.05034300', 'Gekocht op Bitvavo');

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
(1, 0, 'Bitcoin', 'BTC', 'https://www.bitcoin.org'),
(2, 0, 'Ethereum', 'ETH', 'https://www.ethereum.org');

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
(26, 29, 'Wallets,Dienst,Rekening,Crypto,Beschrijving'),
(27, 30, 'Activa,Test 1,Test 2'),
(30, 31, 'Datum Waardes,Datum,Bedrag,Deze waardes,Er zijn geen # geselecteerd!,pagina\'s,rekeningen'),
(31, 32, 'Waarde Rekeningen,Rekeningendiagram,Waardeontwikkeling,Crypto Waardes,Crypto-diagram,Crypto-ontwikkeling'),
(32, 33, 'Type,Dienst,Rekeningen,Rekening,Aantal,Ratio,Waarde'),
(33, 34, 'Naam,Symbool,Waarde');

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
(14, 17, 'Accounts,Date,Service,Account Number,Description,Payment ,Investment,Savings,Crypto '),
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
(26, 29, 'Wallets,Service,Account,Crypto,Description'),
(27, 30, 'Activa,Test 1,Test 2'),
(28, 31, 'Date Values,Date,Amount,these values,There are no # enabled!,pages,accounts'),
(29, 32, 'Value Accounts,Accounts Chart,Value Development,Crypto Values,Crypto Chart,Crypto Development'),
(30, 33, 'Type,Service,Accounts,Account,Number,Ratio,Value'),
(31, 34, 'Name,Symbol,Value');

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
(1, '2024-08-05', 1, NULL, '90.00', NULL, 3, 'Gemeentelijke belastingen'),
(2, '2024-08-05', 1, NULL, '150.00', NULL, 2, 'Bijdrage'),
(3, '2024-08-08', 1, NULL, '65.00', NULL, 6, 'Augustus'),
(4, '2024-08-21', 2, '1000.00', NULL, NULL, 1, 'Salaris');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_groups`
--

DROP TABLE IF EXISTS `tbl_groups`;
CREATE TABLE `tbl_groups` (
  `id` int NOT NULL,
  `hide` tinyint DEFAULT '0',
  `group` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_groups`
--

INSERT INTO `tbl_groups` (`id`, `hide`, `group`, `description`) VALUES
(1, 0, 'Inkomen', 'Salaris, vergoedingen, e.d.'),
(2, 0, 'Huis', 'VVE, Gemeentelijke belastingen, etc.'),
(3, 0, 'Vervoer', 'Brandstof en onderhoud'),
(4, 0, 'Energie', 'Gas, Water &amp; Licht');

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
(2, 3, '2024-09-21 09:24:39'),
(2, 3, '2024-09-21 09:25:20'),
(2, 3, '2024-09-21 09:29:31'),
(2, 3, '2024-09-21 09:33:38'),
(2, 3, '2024-09-21 09:34:40'),
(2, 3, '2024-09-21 09:37:06'),
(2, 3, '2024-09-21 09:39:13'),
(2, 2, '2024-09-21 09:42:28'),
(4, 6, '2024-09-21 09:42:56'),
(1, 1, '2024-09-21 09:43:16');

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
(1, 0, 'ING Particulier', '&#9745;', '&#9745;', '&#9744;', '&#9744;', 'https://www.ing.nl/particulier'),
(2, 0, 'ABN AMRO Bank', '&#9745;', '&#9744;', '&#9744;', '&#9744;', 'https://www.abnamro.nl/nl/personal/index.html'),
(3, 0, 'Bank A', '&#9744;', '&#9744;', '&#9745;', '&#9744;', 'https://banka.com'),
(4, 0, 'Bank B', '&#9744;', '&#9745;', '&#9745;', '&#9744;', 'https://bankb.com'),
(5, 0, 'Crypto Exchange A', '&#9744;', '&#9744;', '&#9744;', '&#9745;', ''),
(6, 0, 'Trezor', '&#9744;', '&#9744;', '&#9744;', '&#9745;', '');

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
(2, 'finance', '{\"page\": \"true\", \"show\": \"true\", \"sort\": {\"bsn\": \"false\", \"grp\": \"false\"}, \"scale\": \"months\", \"start\": \"2024\", \"theme\": {\"color\": \"#ffd700\"}}'),
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
(1, 'Admin', '9e71af2675ef9d36c6d23b737d0be7c1bd828c6cea289f91f7199478d8bcf46e', '2024-10-07 16:21:32', '2024-10-07 14:44:09');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_value_accounts`
--

DROP TABLE IF EXISTS `tbl_value_accounts`;
CREATE TABLE `tbl_value_accounts` (
  `id` int NOT NULL,
  `hide` tinyint DEFAULT '0',
  `date` date NOT NULL,
  `aid` int NOT NULL,
  `value` decimal(11,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_value_accounts`
--

INSERT INTO `tbl_value_accounts` (`id`, `hide`, `date`, `aid`, `value`) VALUES
(1, 0, '2024-07-22', 2, '10.00'),
(2, 0, '2024-07-22', 1, '100.00'),
(3, 0, '2024-07-22', 4, '20.00'),
(4, 0, '2024-07-22', 3, '200.00'),
(5, 0, '2024-07-22', 5, '30.00'),
(6, 0, '2024-07-22', 6, '300.00'),
(8, 0, '2024-08-19', 2, '15.00'),
(9, 0, '2024-08-19', 1, '115.00'),
(10, 0, '2024-08-19', 4, '25.00'),
(11, 0, '2024-08-19', 3, '225.00'),
(12, 0, '2024-08-19', 5, '35.00'),
(13, 0, '2024-08-19', 6, '335.00'),
(15, 0, '2024-09-23', 2, '17.50'),
(16, 0, '2024-09-23', 1, '117.50'),
(17, 0, '2024-09-23', 4, '27.50'),
(18, 0, '2024-09-23', 3, '227.50'),
(19, 0, '2024-09-23', 5, '37.50'),
(20, 0, '2024-09-23', 6, '337.50');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_value_cryptos`
--

DROP TABLE IF EXISTS `tbl_value_cryptos`;
CREATE TABLE `tbl_value_cryptos` (
  `id` int NOT NULL,
  `date` date NOT NULL,
  `cid` int NOT NULL,
  `value` decimal(11,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_value_cryptos`
--

INSERT INTO `tbl_value_cryptos` (`id`, `date`, `cid`, `value`) VALUES
(1, '2024-07-22', 1, '50000.00'),
(2, '2024-07-22', 2, '2000.00'),
(4, '2024-08-19', 1, '50500.00'),
(5, '2024-08-19', 2, '2050.00'),
(7, '2024-09-23', 1, '50700.00'),
(8, '2024-09-23', 2, '2070.00');

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
(1, 0, 7, 1, 'Trezor Wallet #1, BTC'),
(2, 0, 9, 1, 'Trezor Wallet #2, BTC'),
(3, 0, 7, 2, 'Trezor Wallet #1, ETH'),
(4, 0, 8, 2, 'Exchange A Wallet #1, ETH');

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tbl_amount_wallets`
--
ALTER TABLE `tbl_amount_wallets`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `tbl_businesses`
--
ALTER TABLE `tbl_businesses`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_config`
--
ALTER TABLE `tbl_config`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `tbl_crypto`
--
ALTER TABLE `tbl_crypto`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tbl_cryptocurrenties`
--
ALTER TABLE `tbl_cryptocurrenties`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_dutch`
--
ALTER TABLE `tbl_dutch`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `tbl_english`
--
ALTER TABLE `tbl_english`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `tbl_finances`
--
ALTER TABLE `tbl_finances`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_groups`
--
ALTER TABLE `tbl_groups`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_language`
--
ALTER TABLE `tbl_language`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_savings`
--
ALTER TABLE `tbl_savings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_services`
--
ALTER TABLE `tbl_services`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_settings`
--
ALTER TABLE `tbl_settings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tbl_stocks`
--
ALTER TABLE `tbl_stocks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_value_accounts`
--
ALTER TABLE `tbl_value_accounts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `tbl_value_cryptos`
--
ALTER TABLE `tbl_value_cryptos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tbl_wallets`
--
ALTER TABLE `tbl_wallets`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
