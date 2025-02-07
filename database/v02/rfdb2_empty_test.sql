-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 05, 2025 at 02:03 PM
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
  `description` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_accounts`
--

INSERT INTO `tbl_accounts` (`id`, `hide`, `account`, `date`, `sid`, `type`, `description`) VALUES
(1, 0, 0xaf4625a6843646707b0f5f09e5992d1bc69ff9e57288fd858c0f1889eeccec17, '2001-04-04 13:53:34', 1, 'finance', 'ING betaalrekening van Rizzo'),
(2, 0, 0x7e8893523f6fb08b2b09adce75818f4145433232d6d151a81b2b0230661a3f5c, '2014-08-14 13:27:52', 2, 'finance', 'ABN AMRO 2de betaalrekening van Rizzo'),
(3, 0, 0xf88222f64335d3d233895fb2919b2b34, '2005-09-22 10:32:37', 1, 'stock', 'ING beleggingsrekening'),
(4, 0, 0xb20fed245787d866d957497b4c301e36, '2016-03-10 10:34:05', 4, 'stock', 'Bank B belegginsrekening'),
(5, 0, 0x1a813d0f78e1d93eb79ad3f4661b6dc4, '2008-07-15 15:16:51', 3, 'savings', 'Bank A spaarrekening'),
(6, 0, 0x03a4d441647a290e6638cd2e18744b80, '2012-12-14 14:59:19', 4, 'savings', 'Bank B spaarrekening'),
(7, 0, 0xc45c341b91a61fb78553024f06cabc1c, '2018-10-17 10:37:51', 6, 'crypto', 'Trezor Wallet #1'),
(8, 0, 0xc45c341b91a61fb78553024f06cabc1c, '2020-01-16 14:50:15', 5, 'crypto', 'Exchange A Wallet #1'),
(9, 0, 0xb90d0dc9d300c028e5de721a2bbd725d, '2022-08-18 10:40:06', 6, 'crypto', 'Trezor Wallet #2');

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

--
-- Dumping data for table `tbl_amount_wallets`
--

INSERT INTO `tbl_amount_wallets` (`id`, `hide`, `vid`, `wid`, `amount`) VALUES
(33, 0, 33, 1, 0.03679673),
(34, 0, 34, 4, 0.05308090),
(35, 0, 34, 3, 0.00011450),
(36, 0, 33, 2, 0.01864570),
(40, 0, 36, 1, 0.03679673),
(41, 0, 37, 4, 0.05308090),
(42, 0, 37, 3, 0.05045750),
(43, 0, 36, 2, 0.01864570),
(47, 0, 39, 1, 0.03679673),
(48, 0, 40, 4, 0.05308090),
(49, 0, 40, 3, 0.05045750),
(50, 0, 39, 2, 0.01864570),
(54, 0, 42, 1, 0.03679673),
(55, 0, 43, 4, 0.05308090),
(56, 0, 43, 3, 0.05045750),
(57, 0, 42, 2, 0.01864570),
(61, 0, 45, 1, 0.03679673),
(62, 0, 46, 4, 0.05308090),
(63, 0, 46, 3, 0.05045750),
(64, 0, 45, 2, 0.01864570),
(65, 0, 47, 1, 0.03679673),
(66, 0, 48, 4, 0.05308090),
(67, 0, 48, 3, 0.05045750),
(68, 0, 47, 2, 0.01864570),
(69, 0, 49, 1, 0.03679673),
(70, 0, 49, 2, 0.01864570),
(71, 0, 50, 3, 0.05045750),
(72, 0, 50, 4, 0.05308090);

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

--
-- Dumping data for table `tbl_businesses`
--

INSERT INTO `tbl_businesses` (`id`, `hide`, `business`, `gid`, `website`, `rad_history`, `desc_history`) VALUES
(1, 0, 'Menzis', 1, 'https://www.menzis.nl', 1, 'Salaris'),
(2, 0, 'VVE', 2, 'https://www.myriade.nl', 2, 'Bijdrage'),
(3, 0, 'Gemeente Emmen', 2, 'https://www.gemeente-emmen.nl', 2, 'Gemeentelijke belastingen'),
(4, 0, 'Shell', 3, 'https://www.shell.nl', -1, NULL),
(5, 0, 'Esso', 3, 'https://www.esso.nl', -1, NULL),
(6, 0, 'Eneco', 4, 'www.eneoco.nl', 2, 'Februari');

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
  `id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `wid` int(11) NOT NULL,
  `deposit` decimal(11,2) DEFAULT NULL,
  `withdrawal` decimal(11,2) DEFAULT NULL,
  `amount` decimal(11,8) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_crypto`
--

INSERT INTO `tbl_crypto` (`id`, `date`, `wid`, `deposit`, `withdrawal`, `amount`, `description`) VALUES
(1, '2024-07-02', 1, 100.00, NULL, 0.00002300, 'Gekocht van Bitonic'),
(2, '2024-07-04', 4, 50.00, NULL, 0.00786120, 'Gekocht op Exchange A'),
(3, '2024-07-10', 1, 150.00, NULL, 0.01243253, 'Gekocht van Bitonic'),
(4, '2024-07-12', 4, NULL, 20.00, -0.00011450, 'Verstuurt naar Trezor Wallet #1, ETH'),
(5, '2024-07-12', 3, 20.00, NULL, 0.00011450, 'Ontvangen van Exchange A wallet'),
(6, '2024-07-14', 2, 200.00, NULL, 0.01834340, 'Gekocht van Bitonic'),
(7, '2024-07-17', 1, 200.00, NULL, 0.02434120, 'Gekocht van Bitonic'),
(8, '2024-07-20', 4, 150.00, NULL, 0.04533420, 'Gekocht op Exchange A'),
(9, '2024-07-21', 2, 50.00, NULL, 0.00030230, 'Gekocht van Bitonic'),
(10, '2024-08-01', 3, 200.00, NULL, 0.05034300, 'Gekocht op Bitvavo');

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

--
-- Dumping data for table `tbl_cryptocurrenties`
--

INSERT INTO `tbl_cryptocurrenties` (`id`, `hide`, `name`, `symbol`, `color`, `website`) VALUES
(1, 0, 'Bitcoin', 'BTC', '#ffc300', 'https://www.bitcoin.org'),
(2, 0, 'Ethereum', 'ETH', '#338aff', 'https://www.ethereum.org');

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
(14, 17, 'rekeningen,Datum,Dienst,Rekeningnummer,Beschrijving,Betaal,Beleggings,Spaar,Crypto'),
(15, 18, 'Zondag,Maandag,Dinsdag,Woensdag,Donderdag,Vrijdag,Zaterdag'),
(16, 19, 'Jan,Feb,Mrt,Apr,Mei,Jun,Jul,Aug,Sep,Okt,Nov,Dec'),
(17, 20, 'Zoek,Balans,Bedrag,Type,Aantal'),
(18, 21, 'Groepen,Groep,Rangorde,Beschrijving'),
(19, 22, 'Bedrijven,Groep,Bedrijf,Rangorde,Website'),
(20, 23, 'Aantal rijen per vel,Tussen 15 en 50,Valutateken,Teken,Start jaar ,Tussen 1970 en ,Wachtwoorden opnieuw invoeren als de salt pharse wijzigd.,Salt phrase,Plaats jouw salt phrase hier'),
(21, 24, 'Betaalrekeningen,Datum,Rekening,Inkomsten,afVast,afOverig,Groep,Bedrijf,Beschrijving'),
(22, 25, 'Beleggingsrekeningen,Datum,Storting,Onttrekking,Dienst,Rekening,Beschrijving'),
(23, 26, 'Spaarrekeningen,Datum,Storting,Onttrekking,Dienst,Rekening,Beschrijving'),
(24, 27, 'Cryptorekeningen,Datum,Storting,Onttrekking,Dienst,Rekening,Aantal,Crypto,Beschrijving'),
(25, 28, 'Cryptomunten,Naam,Symbool,Kleur,Website'),
(26, 29, 'Wallets,Dienst,Rekening,Crypto,Beschrijving'),
(27, 30, 'Activa,Test 1,Test 2'),
(30, 31, 'Datum Waardes,Datum,Deze waardes,Er zijn geen # geselecteerd!,pagina\'s,rekeningen,Selecteer een datum!'),
(31, 32, 'Waarde Rekeningen,Rekeningendiagram,Waardeontwikkeling,Crypto Waardes,Crypto-diagram,Crypto-ontwikkeling'),
(32, 33, 'Type,Dienst,Rekeningen,Rekening,Aantal,Ratio,Waarde'),
(33, 34, 'Naam,Symbool,Ratio,Waarde');

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
(14, 17, 'Accounts,Date,Service,Account Number,Description,Payment ,Investment,Savings,Crypto '),
(15, 18, 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'),
(16, 19, 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'),
(17, 20, 'Search,Balance,Amount,Type,Number'),
(18, 21, 'Groups,Group,Ranking,Description'),
(19, 22, 'Businesses,Group,Business,Ranking,Website'),
(20, 23, 'Number of sheet rows,Between 15 and 50,Currency sign,Sign value,Start year ,Between 1970 and ,Re-enter all user passwords if the salt phrase is changed.,Salt phrase,Put your salt phrase here'),
(21, 24, 'Payment Accounts,Date,Account,Income,xFixed,xOther,Group,Business,Description'),
(22, 25, 'Investment Accounts,Date,Deposit,Withdrawal,Service,Account,Description'),
(23, 26, 'Savings Accounts,Date,Deposit,Withdrawal,Service,Account,Description'),
(24, 27, 'Crypto Accounts,Date,Deposit,Withdrawal,Service,Account,Number,Crypto,Description'),
(25, 28, 'Crypto Currencies,Name,Symbol,Color,Website'),
(26, 29, 'Wallets,Service,Account,Crypto,Description'),
(27, 30, 'Activa,Test 1,Test 2'),
(28, 31, 'Date Values,Date,these values,There are no # enabled!,pages,accounts,Select a date!'),
(29, 32, 'Value Accounts,Accounts Chart,Value Development,Crypto Values,Crypto Chart,Crypto Development'),
(30, 33, 'Type,Service,Accounts,Account,Number,Ratio,Value'),
(31, 34, 'Name,Symbol,Ratio,Value');

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

--
-- Dumping data for table `tbl_finances`
--

INSERT INTO `tbl_finances` (`id`, `date`, `aid`, `income`, `fixed`, `other`, `bid`, `description`) VALUES
(1, '2024-08-05', 1, NULL, 90.00, NULL, 3, 'Gemeentelijke belastingen'),
(2, '2024-08-05', 1, NULL, 150.00, NULL, 2, 'Bijdrage'),
(3, '2024-08-08', 1, NULL, 65.00, NULL, 6, 'Augustus'),
(4, '2024-08-21', 2, 1000.00, NULL, NULL, 1, 'Salaris'),
(5, '2025-02-03', 1, NULL, 50.00, NULL, 6, 'Februari');

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

--
-- Dumping data for table `tbl_rankings`
--

INSERT INTO `tbl_rankings` (`gid`, `bid`, `timestamp`) VALUES
(4, 6, '2025-02-05 12:55:11');

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

--
-- Dumping data for table `tbl_savings`
--

INSERT INTO `tbl_savings` (`id`, `date`, `aid`, `deposit`, `withdrawal`, `description`) VALUES
(1, '2024-10-08', 5, 50.00, NULL, 'Van betaalrekening'),
(2, '2024-10-10', 5, 150.00, NULL, 'Van betaalrekening'),
(3, '2020-12-14', 5, 50.00, NULL, 'Inleg'),
(4, '2020-06-15', 5, 50.00, NULL, 'Inleg'),
(5, '2021-12-20', 5, 50.00, NULL, 'Inleg'),
(6, '2021-05-17', 5, 50.00, NULL, 'Inleg');

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
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `value` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_settings`
--

INSERT INTO `tbl_settings` (`id`, `name`, `value`) VALUES
(1, 'dashboard', '{\"page\": \"true\", \"theme\": {\"color\": \"#6c3483\"}}'),
(2, 'finance', '{\"page\": \"true\", \"show\": \"true\", \"sort\": {\"bsn\": \"false\", \"grp\": \"false\"}, \"scale\": \"months\", \"start\": \"2024\", \"theme\": {\"color\": \"#ffd700\"}}'),
(3, 'stock', '{\"page\": \"true\", \"show\": \"true\", \"scale\": \"year\", \"start\": \"2024\", \"theme\": {\"color\": \"#228b22\"}}'),
(4, 'savings', '{\"page\": \"true\", \"show\": \"true\", \"scale\": \"year\", \"start\": \"2020\", \"theme\": {\"color\": \"#4169e1\"}}'),
(5, 'crypto', '{\"page\": \"true\", \"show\": \"true\", \"scale\": \"year\", \"start\": \"2024\", \"theme\": {\"color\": \"#ff8f00\"}}'),
(6, 'settings', '{\"page\": \"true\", \"rows\": \"25\", \"show\": \"true\", \"sign\": \"€\", \"theme\": {\"color\": \"#536878\"}}'),
(7, 'logout', '{\"page\": \"true\"}'),
(8, 'language', '{\"code\": \"NL\", \"language\": \"Nederlands\"}'),
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
(1, 'Admin', '9e71af2675ef9d36c6d23b737d0be7c1bd828c6cea289f91f7199478d8bcf46e', '2025-02-05 13:33:58', '2025-01-31 13:05:06');

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

--
-- Dumping data for table `tbl_value_accounts`
--

INSERT INTO `tbl_value_accounts` (`id`, `hide`, `date`, `aid`, `value`) VALUES
(38, 0, '2024-01-22', 2, 101.00),
(39, 0, '2024-01-22', 1, 101.50),
(40, 0, '2024-01-22', 4, 201.00),
(41, 0, '2024-01-22', 3, 201.50),
(42, 0, '2024-01-22', 5, 301.00),
(43, 0, '2024-01-22', 6, 301.50),
(45, 0, '2024-02-19', 2, 102.00),
(46, 0, '2024-02-19', 1, 102.50),
(47, 0, '2024-02-19', 4, 202.00),
(48, 0, '2024-02-19', 3, 202.50),
(49, 0, '2024-02-19', 5, 302.00),
(50, 0, '2024-02-19', 6, 302.50),
(52, 0, '2024-03-18', 2, 103.00),
(53, 0, '2024-03-18', 1, 103.50),
(54, 0, '2024-03-18', 4, 203.00),
(55, 0, '2024-03-18', 3, 203.50),
(56, 0, '2024-03-18', 5, 303.00),
(57, 0, '2024-03-18', 6, 303.50),
(59, 0, '2024-04-22', 2, 104.00),
(60, 0, '2024-04-22', 1, 104.50),
(61, 0, '2024-04-22', 4, 204.00),
(62, 0, '2024-04-22', 3, 204.50),
(63, 0, '2024-04-22', 5, 304.00),
(64, 0, '2024-04-22', 6, 304.50),
(66, 0, '2024-05-20', 2, 105.00),
(67, 0, '2024-05-20', 1, 105.50),
(68, 0, '2024-05-20', 4, 205.00),
(69, 0, '2024-05-20', 3, 205.50),
(70, 0, '2024-05-20', 5, 305.00),
(71, 0, '2024-05-20', 6, 305.50),
(73, 0, '2024-06-17', 2, 106.00),
(74, 0, '2024-06-17', 1, 106.50),
(75, 0, '2024-06-17', 4, 206.00),
(76, 0, '2024-06-17', 3, 206.50),
(77, 0, '2024-06-17', 5, 306.00),
(78, 0, '2024-06-17', 6, 306.50),
(80, 0, '2024-07-22', 2, 107.00),
(81, 0, '2024-07-22', 1, 107.50),
(82, 0, '2024-07-22', 4, 207.00),
(83, 0, '2024-07-22', 3, 207.50),
(84, 0, '2024-07-22', 5, 307.00),
(85, 0, '2024-07-22', 6, 307.50),
(87, 0, '2024-08-19', 2, 108.00),
(88, 0, '2024-08-19', 1, 108.50),
(89, 0, '2024-08-19', 4, 208.00),
(90, 0, '2024-08-19', 3, 208.50),
(91, 0, '2024-08-19', 5, 308.00),
(92, 0, '2024-08-19', 6, 308.50),
(94, 0, '2024-09-23', 2, 109.00),
(95, 0, '2024-09-23', 1, 109.50),
(96, 0, '2024-09-23', 4, 209.00),
(97, 0, '2024-09-23', 3, 209.50),
(98, 0, '2024-09-23', 5, 309.00),
(99, 0, '2024-09-23', 6, 309.50),
(101, 0, '2024-10-21', 2, 110.00),
(102, 0, '2024-10-21', 1, 110.50),
(103, 0, '2024-10-21', 4, 210.00),
(104, 0, '2024-10-21', 3, 210.50),
(105, 0, '2024-10-21', 5, 310.00),
(106, 0, '2024-10-21', 6, 310.50),
(108, 0, '2024-11-18', 2, 111.00),
(109, 0, '2024-11-18', 1, 111.50),
(110, 0, '2024-11-18', 4, 211.00),
(111, 0, '2024-11-18', 3, 211.50),
(112, 0, '2024-11-18', 5, 311.00),
(113, 0, '2024-11-18', 6, 311.50),
(114, 0, '2024-12-23', 2, 112.00),
(115, 0, '2024-12-23', 1, 112.50),
(116, 0, '2024-12-23', 4, 212.00),
(117, 0, '2024-12-23', 3, 212.50),
(118, 0, '2024-12-23', 5, 312.00),
(119, 0, '2024-12-23', 6, 312.50),
(120, 0, '2025-01-20', 2, 201.00),
(121, 0, '2025-01-20', 1, 301.00),
(122, 0, '2025-01-20', 4, 401.00),
(123, 0, '2025-01-20', 3, 501.00),
(124, 0, '2025-01-20', 5, 601.00),
(125, 0, '2025-01-20', 6, 701.00);

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

--
-- Dumping data for table `tbl_value_cryptos`
--

INSERT INTO `tbl_value_cryptos` (`id`, `date`, `cid`, `value`) VALUES
(15, '2024-01-22', 1, 40001.00),
(16, '2024-01-22', 2, 1501.00),
(18, '2024-02-19', 1, 42002.00),
(19, '2024-02-19', 2, 1602.00),
(21, '2024-03-18', 1, 44003.00),
(22, '2024-03-18', 2, 1703.00),
(24, '2024-04-22', 1, 46004.00),
(25, '2024-04-22', 2, 1804.00),
(27, '2024-05-20', 1, 48005.00),
(28, '2024-05-20', 2, 1905.00),
(30, '2024-06-17', 1, 49006.00),
(31, '2024-06-17', 2, 2006.00),
(33, '2024-07-22', 1, 50007.00),
(34, '2024-07-22', 2, 2107.00),
(36, '2024-08-19', 1, 51008.00),
(37, '2024-08-19', 2, 2208.00),
(39, '2024-09-23', 1, 52009.00),
(40, '2024-09-23', 2, 2309.00),
(42, '2024-10-21', 1, 53010.00),
(43, '2024-10-21', 2, 2410.00),
(45, '2024-11-18', 1, 54011.00),
(46, '2024-11-18', 2, 2511.00),
(47, '2024-12-23', 1, 56012.00),
(48, '2024-12-23', 2, 2612.00),
(49, '2025-01-20', 1, 58001.00),
(50, '2025-01-20', 2, 2701.00);

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
  `description` varchar(50) DEFAULT NULL
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tbl_amount_wallets`
--
ALTER TABLE `tbl_amount_wallets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `tbl_businesses`
--
ALTER TABLE `tbl_businesses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_config`
--
ALTER TABLE `tbl_config`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `tbl_crypto`
--
ALTER TABLE `tbl_crypto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tbl_cryptocurrenties`
--
ALTER TABLE `tbl_cryptocurrenties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_dutch`
--
ALTER TABLE `tbl_dutch`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `tbl_english`
--
ALTER TABLE `tbl_english`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `tbl_finances`
--
ALTER TABLE `tbl_finances`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_groups`
--
ALTER TABLE `tbl_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_language`
--
ALTER TABLE `tbl_language`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_savings`
--
ALTER TABLE `tbl_savings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_services`
--
ALTER TABLE `tbl_services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_settings`
--
ALTER TABLE `tbl_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tbl_stocks`
--
ALTER TABLE `tbl_stocks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_value_accounts`
--
ALTER TABLE `tbl_value_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;

--
-- AUTO_INCREMENT for table `tbl_value_cryptos`
--
ALTER TABLE `tbl_value_cryptos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `tbl_wallets`
--
ALTER TABLE `tbl_wallets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
