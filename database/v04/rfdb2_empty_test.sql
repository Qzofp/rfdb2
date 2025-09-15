-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 15, 2025 at 04:36 PM
-- Server version: 8.0.43-0ubuntu0.22.04.1
-- PHP Version: 8.1.2-1ubuntu2.22

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
  `id` int NOT NULL,
  `hide` tinyint DEFAULT '0',
  `account` varbinary(200) NOT NULL,
  `date` datetime DEFAULT NULL,
  `sid` int DEFAULT NULL,
  `type` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `description` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_accounts`
--

INSERT INTO `tbl_accounts` (`id`, `hide`, `account`, `date`, `sid`, `type`, `color`, `description`) VALUES
(1, 0, 0xcb15615875a759ac50c847b951f0d5c8, '2020-01-01 15:44:11', 1, 'stock', '#ff8000', 'ING Beleggingsrekening'),
(2, 0, 0x2cc9cf6f392ff5fe2f0d061897394caa, '2020-01-01 15:44:03', 2, 'stock', '#00ff00', 'Meesman ETF beleggingsrekening'),
(3, 0, 0x2a60105af0b32e6dc673d60dcc102ff8, '2020-01-01 15:45:24', 3, 'savings', '#0080ff', 'ABN AMRO Spaarrekening'),
(4, 0, 0xa5e9c3b5f6fa37029d3f4e170d6cd2cf, '2020-01-01 15:46:09', 1, 'savings', '#ffff00', 'ING Spaarekening'),
(5, 0, 0x69b89e2b1041db039763db74fefb80e8, '2020-01-01 13:30:38', 4, 'crypto', '-', 'Trezor Wallet 1'),
(6, 0, 0x8afc6c8e1b2917a88994c3fb05105008ce70fe73717347d5fcfa7003b5b6ff05, '2020-01-01 13:36:19', 1, 'finance', '#ffa500', 'Betaalrekening');

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
(1, 0, 1, 1, '0.01186575'),
(2, 0, 4, 1, '0.01186575'),
(3, 0, 5, 2, '0.82535490');

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
(1, 0, 'ING Bank', 1, 'https://www.ing.nl/particulier', 3, 'Naar spaarrekening'),
(2, 0, 'ABN Amro Bank', 1, 'https://www.abnamro.nl/nl/prive', 3, 'Naar spaarrekening'),
(3, 0, 'Meesman', 1, 'https://www.meesman.nl', 3, 'Inleg ETF beleggingsfonds'),
(4, 0, 'Bitonic', 1, 'https://bitonic.nl', 3, '0,00110002 BTC gekocht'),
(5, 0, 'Bitvavo', 1, 'https://bitvavo.com/nl', 3, '0,04739696 ETH gekocht'),
(6, 0, 'Capgemini', 2, 'https://www.capgemini.com/nl-nl', 1, 'Salaris'),
(7, 0, 'Test (lasten)', 3, '', 2, 'Boodschappen, energie, vervoer, etc.');

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
(1, '2020-01-01', 1, '100.00', NULL, '0.01186575', 'Gekocht van Bitonic (&euro; 8.427,62)'),
(2, '2020-03-01', 2, '100.00', NULL, '0.82535490', 'Gekocht van Bitvavo (&euro; 121,16)'),
(3, '2020-04-01', 1, '100.00', NULL, '0.01263941', 'Gekocht van Bitonic (&euro; 7.911,76)'),
(4, '2020-06-01', 2, '100.00', NULL, '0.49640109', 'Gekocht van Bitvavo (&euro; 201,45)'),
(5, '2020-07-01', 1, '100.00', NULL, '0.01040211', 'Gekocht van Bitonic (&euro; 9.613,43)'),
(6, '2020-09-01', 2, '100.00', NULL, '0.32569046', 'Gekocht van Bitvavo (&euro; 307,04)'),
(7, '2020-10-01', 1, '100.00', NULL, '0.00847362', 'Gekocht van Bitonic (&euro; 11.801,33)'),
(8, '2020-12-01', 2, '100.00', NULL, '0.16556566', 'Gekocht van Bitvavo (&euro; 603,99)'),
(9, '2021-01-01', 1, '100.00', NULL, '0.00366084', 'Gekocht van Bitonic (&euro; 27.316,10)'),
(10, '2021-03-01', 2, '100.00', NULL, '0.06113217', 'Gekocht van Bitvavo (&euro; 1.635,80)'),
(11, '2021-04-01', 1, '100.00', NULL, '0.00208129', 'Gekocht van Bitonic (&euro; 48.047,05)'),
(12, '2021-06-01', 2, '100.00', NULL, '0.05212514', 'Gekocht van Bitvavo (&euro; 1.918,46)'),
(13, '2021-07-01', 1, '100.00', NULL, '0.00285085', 'Gekocht van Bitonic (&euro; 35.077,27)'),
(14, '2021-09-01', 2, '100.00', NULL, '0.03855808', 'Gekocht van Bitvavo (&euro; 2.593,49)'),
(15, '2021-10-01', 1, '100.00', NULL, '0.00188464', 'Gekocht van Bitonic (&euro; 53.060,58)'),
(16, '2021-12-01', 2, '100.00', NULL, '0.03088536', 'Gekocht van Bitvavo (&euro; 3.237,78)'),
(17, '2022-01-01', 1, '100.00', NULL, '0.00291797', 'Gekocht van Bitonic (&euro; 34.270,42)'),
(18, '2022-03-01', 2, '100.00', NULL, '0.03374309', 'Gekocht van Bitvavo (&euro; 2.963,57)'),
(19, '2022-04-01', 1, '100.00', NULL, '0.00279563', 'Gekocht van Bitonic (&euro; 35.770,07)'),
(20, '2022-06-01', 2, '100.00', NULL, '0.09818071', 'Gekocht van Bitvavo (&euro; 1.018,53)'),
(21, '2022-07-01', 1, '100.00', NULL, '0.00437411', 'Gekocht van Bitonic (&euro; 22.861,78)'),
(22, '2022-09-01', 2, '100.00', NULL, '0.07381163', 'Gekocht van Bitvavo (&euro; 1.354,80)'),
(23, '2022-10-01', 1, '100.00', NULL, '0.00482326', 'Gekocht van Bitonic (&euro; 20.732,87)'),
(24, '2022-12-01', 2, '100.00', NULL, '0.08962822', 'Gekocht van Bitvavo (&euro; 1.115,72)'),
(25, '2023-01-01', 1, '100.00', NULL, '0.00469440', 'Gekocht van Bitonic (&euro; 21.301,98)'),
(26, '2023-03-01', 2, '100.00', NULL, '0.05964523', 'Gekocht van Bitvavo (&euro; 1.676,58)'),
(27, '2023-04-01', 1, '100.00', NULL, '0.00376195', 'Gekocht van Bitonic (&euro; 26.581,93)'),
(28, '2023-06-01', 2, '100.00', NULL, '0.05646846', 'Gekocht van Bitvavo (&euro; 1.770,90)'),
(29, '2023-07-01', 1, '100.00', NULL, '0.00376267', 'Gekocht van Bitonic (&euro; 26.576,84)'),
(30, '2023-09-01', 2, '100.00', NULL, '0.06331117', 'Gekocht van Bitvavo (&euro; 1.579,50)'),
(31, '2023-10-01', 1, '100.00', NULL, '0.00305140', 'Gekocht van Bitonic (&euro; 32.771,80)'),
(32, '2023-12-01', 2, '100.00', NULL, '0.04837953', 'Gekocht van Bitvavo (&euro; 2.066,99)'),
(33, '2024-01-01', 1, '100.00', NULL, '0.00253815', 'Gekocht van Bitonic (&euro; 39.398,70)'),
(34, '2024-03-01', 2, '100.00', NULL, '0.02958729', 'Gekocht van Bitvavo (&euro; 3.379,83)'),
(35, '2024-04-01', 1, '100.00', NULL, '0.00175902', 'Gekocht van Bitonic (&euro; 56.849,72)'),
(36, '2024-06-01', 2, '100.00', NULL, '0.03127248', 'Gekocht van Bitvavo (&euro; 3.197,70)'),
(37, '2024-07-01', 1, '100.00', NULL, '0.00167518', 'Gekocht van Bitonic (&euro; 59.695,00)'),
(38, '2024-09-01', 2, '100.00', NULL, '0.04278496', 'Gekocht van Bitvavo (&euro; 2.337,27)'),
(39, '2024-10-01', 1, '100.00', NULL, '0.00155027', 'Gekocht van Bitonic (&euro; 64.505,08)'),
(40, '2024-12-01', 2, '100.00', NULL, '0.03105744', 'Gekocht van Bitvavo (&euro; 3.219,84)'),
(41, '2025-01-01', 1, '100.00', NULL, '0.00101182', 'Gekocht van Bitonic (&euro; 98.832,22)'),
(42, '2025-03-01', 2, '100.00', NULL, '0.05932359', 'Gekocht van Bitvavo (&euro; 1.685,67)'),
(43, '2025-04-01', 1, '100.00', NULL, '0.00120212', 'Gekocht van Bitonic (&euro; 83.186,37)'),
(44, '2025-06-01', 2, '100.00', NULL, '0.04739696', 'Gekocht van Bitvavo (&euro; 2.109,84)'),
(45, '2025-07-01', 1, '100.00', NULL, '0.00110002', 'Gekocht van Bitonic (&euro; 90.907,65)');

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
  `color` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `website` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_cryptocurrenties`
--

INSERT INTO `tbl_cryptocurrenties` (`id`, `hide`, `name`, `symbol`, `color`, `website`) VALUES
(1, 0, 'Bitcoin', 'BTC', '#ff8c00', 'https://bitcoin.org'),
(2, 0, 'Ethereum', 'ETH', '#6a5acd', 'https://ethereum.org');

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
(1, '2020-01-01', 6, NULL, NULL, '100.00', 4, '0,01186575 BTC gekocht'),
(2, '2020-01-06', 6, NULL, NULL, '50.00', 1, 'Naar beleggingsrekening'),
(3, '2020-01-13', 6, NULL, NULL, '100.00', 3, 'Inleg ETF beleggingsfonds'),
(4, '2020-01-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(5, '2020-01-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(6, '2020-02-03', 6, NULL, NULL, '30.00', 2, 'Naar spaarrekening'),
(7, '2020-02-10', 6, NULL, NULL, '60.00', 1, 'Naar spaarrekening'),
(8, '2020-02-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(9, '2020-02-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(10, '2020-03-01', 6, NULL, NULL, '100.00', 5, '0,82535490 ETH gekocht'),
(11, '2020-03-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(12, '2020-03-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(13, '2020-04-01', 6, NULL, NULL, '100.00', 4, '0,01263941 BTC gekocht'),
(14, '2020-04-06', 6, NULL, NULL, '50.00', 1, 'Naar beleggingsrekening'),
(15, '2020-04-13', 6, NULL, NULL, '100.00', 3, 'Inleg ETF beleggingsfonds'),
(16, '2020-04-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(17, '2020-04-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(18, '2020-05-04', 6, NULL, NULL, '30.00', 2, 'Naar spaarrekening'),
(19, '2020-05-11', 6, NULL, NULL, '60.00', 1, 'Naar spaarrekening'),
(20, '2020-05-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(21, '2020-05-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(22, '2020-06-01', 6, NULL, NULL, '100.00', 5, '0,49640109 ETH gekocht'),
(23, '2020-06-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(24, '2020-06-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(25, '2020-07-06', 6, NULL, NULL, '50.00', 1, 'Naar beleggingsrekening'),
(26, '2020-07-13', 6, NULL, NULL, '100.00', 3, 'Inleg ETF beleggingsfonds'),
(27, '2020-07-01', 6, NULL, NULL, '100.00', 4, '0,01040211 BTC gekocht'),
(28, '2020-07-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(29, '2020-07-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(30, '2020-08-03', 6, NULL, NULL, '30.00', 2, 'Naar spaarrekening'),
(31, '2020-08-10', 6, NULL, NULL, '60.00', 1, 'Naar spaarrekening'),
(32, '2020-08-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(33, '2020-08-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(34, '2020-09-01', 6, NULL, NULL, '100.00', 5, '0,32569046 ETH gekocht'),
(35, '2020-09-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(36, '2020-09-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(37, '2020-10-01', 6, NULL, NULL, '100.00', 4, '0,00847362 BTC gekocht'),
(38, '2020-10-05', 6, NULL, NULL, '50.00', 1, 'Naar beleggingsrekening'),
(39, '2020-10-12', 6, NULL, NULL, '100.00', 3, 'Inleg ETF beleggingsfonds'),
(40, '2020-10-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(41, '2020-10-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(42, '2020-11-02', 6, NULL, NULL, '30.00', 2, 'Naar spaarrekening'),
(43, '2020-11-09', 6, NULL, NULL, '60.00', 1, 'Naar spaarrekening'),
(44, '2020-11-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(45, '2020-11-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(46, '2020-12-01', 6, NULL, NULL, '100.00', 5, '0,16556566 ETH gekocht'),
(47, '2020-12-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(48, '2020-12-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(49, '2021-01-01', 6, NULL, NULL, '100.00', 4, '0,00366084 BTC gekocht'),
(50, '2021-01-04', 6, NULL, NULL, '50.00', 1, 'Naar beleggingsrekening'),
(51, '2021-01-11', 6, NULL, NULL, '100.00', 3, 'Inleg ETF beleggingsfonds'),
(52, '2021-01-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(53, '2021-01-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(54, '2021-02-01', 6, NULL, NULL, '30.00', 2, 'Naar spaarrekening'),
(55, '2021-02-08', 6, NULL, NULL, '60.00', 1, 'Naar spaarrekening'),
(56, '2021-02-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(57, '2021-02-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(58, '2021-03-01', 6, NULL, NULL, '100.00', 5, '0,06113217 ETH gekocht'),
(59, '2021-03-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(60, '2021-03-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(61, '2021-04-01', 6, NULL, NULL, '100.00', 4, '0,00208129 BTC gekocht'),
(62, '2021-04-05', 6, NULL, NULL, '50.00', 1, 'Naar beleggingsrekening'),
(63, '2021-04-12', 6, NULL, NULL, '100.00', 3, 'Inleg ETF beleggingsfonds'),
(64, '2021-04-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(65, '2021-04-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(66, '2021-05-03', 6, NULL, NULL, '30.00', 2, 'Naar spaarrekening'),
(67, '2021-05-10', 6, NULL, NULL, '60.00', 1, 'Naar spaarrekening'),
(68, '2021-05-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(69, '2021-05-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(70, '2021-06-01', 6, NULL, NULL, '100.00', 5, '0,05212514 ETH gekocht'),
(71, '2021-06-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(72, '2021-06-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(73, '2021-07-01', 6, NULL, NULL, '100.00', 4, '0,00285085 BTC gekocht'),
(74, '2021-07-05', 6, NULL, NULL, '50.00', 1, 'Naar beleggingsrekening'),
(75, '2021-07-12', 6, NULL, NULL, '100.00', 3, 'Inleg ETF beleggingsfonds'),
(76, '2021-07-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(77, '2021-07-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(78, '2021-08-02', 6, NULL, NULL, '30.00', 2, 'Naar spaarrekening'),
(79, '2021-08-09', 6, NULL, NULL, '60.00', 1, 'Naar spaarrekening'),
(80, '2021-08-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(81, '2021-08-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(82, '2021-09-01', 6, NULL, NULL, '100.00', 5, '0,03855808 ETH gekocht'),
(83, '2021-09-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(84, '2021-09-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(85, '2021-10-01', 6, NULL, NULL, '100.00', 4, '0,00188464 BTC gekocht'),
(86, '2021-10-04', 6, NULL, NULL, '50.00', 1, 'Naar beleggingsrekening'),
(87, '2021-10-11', 6, NULL, NULL, '100.00', 3, 'Inleg ETF beleggingsfonds'),
(88, '2021-10-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(89, '2021-10-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(90, '2021-11-01', 6, NULL, NULL, '30.00', 2, 'Naar spaarrekening'),
(91, '2021-11-08', 6, NULL, NULL, '60.00', 1, 'Naar spaarrekening'),
(92, '2021-11-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(93, '2021-11-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(94, '2021-12-01', 6, NULL, NULL, '100.00', 5, '0,03088536 ETH gekocht'),
(95, '2021-12-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(96, '2021-12-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(97, '2022-01-01', 6, NULL, NULL, '100.00', 4, '0,00291797 BTC gekocht'),
(98, '2022-01-03', 6, NULL, NULL, '50.00', 1, 'Naar beleggingsrekening'),
(99, '2022-01-10', 6, NULL, NULL, '100.00', 3, 'Inleg ETF beleggingsfonds'),
(100, '2022-01-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(101, '2022-01-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(102, '2022-02-07', 6, NULL, NULL, '30.00', 2, 'Naar spaarrekening'),
(103, '2022-02-14', 6, NULL, NULL, '60.00', 1, 'Naar spaarrekening'),
(104, '2022-02-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(105, '2022-02-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(106, '2022-03-01', 6, NULL, NULL, '100.00', 5, '0,03374309 ETH gekocht'),
(107, '2022-03-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(108, '2022-03-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(109, '2022-04-01', 6, NULL, NULL, '100.00', 4, '0,00279563 BTC gekocht'),
(110, '2022-04-04', 6, NULL, NULL, '50.00', 1, 'Naar beleggingsrekening'),
(111, '2022-04-11', 6, NULL, NULL, '100.00', 3, 'Inleg ETF beleggingsfonds'),
(112, '2022-04-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(113, '2022-04-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(114, '2022-05-02', 6, NULL, NULL, '30.00', 2, 'Naar spaarrekening'),
(115, '2022-05-09', 6, NULL, NULL, '60.00', 1, 'Naar spaarrekening'),
(116, '2022-05-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(117, '2022-05-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(118, '2022-06-01', 6, NULL, NULL, '100.00', 5, '0,09818071 ETH gekocht'),
(119, '2022-06-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(120, '2022-06-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(121, '2022-07-01', 6, NULL, NULL, '100.00', 4, '0,00437411 BTC gekocht'),
(122, '2022-07-04', 6, NULL, NULL, '50.00', 1, 'Naar beleggingsrekening'),
(123, '2022-07-11', 6, NULL, NULL, '100.00', 3, 'Inleg ETF beleggingsfonds'),
(124, '2022-07-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(125, '2022-07-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(126, '2022-08-01', 6, NULL, NULL, '30.00', 2, 'Naar spaarrekening'),
(127, '2022-08-08', 6, NULL, NULL, '60.00', 1, 'Naar spaarrekening'),
(128, '2022-08-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(129, '2022-08-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(130, '2022-09-01', 6, NULL, NULL, '100.00', 5, '0,07381163 ETH gekocht'),
(131, '2022-09-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(132, '2022-09-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(133, '2022-10-01', 6, NULL, NULL, '100.00', 4, '0,00482326 BTC gekocht'),
(134, '2022-10-03', 6, NULL, NULL, '50.00', 1, 'Naar beleggingsrekening'),
(135, '2022-10-10', 6, NULL, NULL, '100.00', 3, 'Inleg ETF beleggingsfonds'),
(136, '2022-10-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(137, '2022-10-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(138, '2022-11-07', 6, NULL, NULL, '30.00', 2, 'Naar spaarrekening'),
(139, '2022-11-14', 6, NULL, NULL, '60.00', 1, 'Naar spaarrekening'),
(140, '2022-11-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(141, '2022-11-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(142, '2022-12-01', 6, NULL, NULL, '100.00', 5, '0,08962822 ETH gekocht'),
(143, '2022-12-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(144, '2022-12-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(146, '2023-01-01', 6, NULL, NULL, '100.00', 4, '0,00469440 BTC gekocht'),
(147, '2023-01-02', 6, NULL, NULL, '50.00', 1, 'Naar beleggingsrekening'),
(148, '2023-01-09', 6, NULL, NULL, '100.00', 3, 'Inleg ETF beleggingsfonds'),
(149, '2023-01-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(150, '2023-01-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(151, '2023-02-06', 6, NULL, NULL, '30.00', 2, 'Naar spaarrekening'),
(152, '2023-02-13', 6, NULL, NULL, '60.00', 1, 'Naar spaarrekening'),
(153, '2023-02-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(154, '2023-02-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(155, '2023-03-01', 6, NULL, NULL, '100.00', 5, '0,05964523 ETH gekocht'),
(156, '2023-03-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(157, '2023-03-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(158, '2023-04-01', 6, NULL, NULL, '100.00', 4, '0,00376195 BTC gekocht'),
(159, '2023-04-03', 6, NULL, NULL, '50.00', 1, 'Naar beleggingsrekening'),
(160, '2023-04-10', 6, NULL, NULL, '100.00', 3, 'Inleg ETF beleggingsfonds'),
(161, '2023-04-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(162, '2023-04-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(163, '2023-05-01', 6, NULL, NULL, '30.00', 2, 'Naar spaarrekening'),
(164, '2023-05-08', 6, NULL, NULL, '60.00', 1, 'Naar spaarrekening'),
(165, '2023-05-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(166, '2023-05-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(167, '2023-06-01', 6, NULL, NULL, '100.00', 5, '0,05646846 ETH gekocht'),
(168, '2023-06-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(169, '2023-06-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(170, '2023-07-01', 6, NULL, NULL, '100.00', 4, '0,00376267 BTC gekocht'),
(171, '2023-07-03', 6, NULL, NULL, '50.00', 1, 'Naar beleggingsrekening'),
(172, '2023-07-10', 6, NULL, NULL, '100.00', 3, 'Inleg ETF beleggingsfonds'),
(173, '2023-07-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(174, '2023-07-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(175, '2023-08-07', 6, NULL, NULL, '30.00', 2, 'Naar spaarrekening'),
(176, '2023-08-14', 6, NULL, NULL, '60.00', 1, 'Naar spaarrekening'),
(177, '2023-08-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(178, '2023-08-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(179, '2023-09-01', 6, NULL, NULL, '100.00', 5, '0,06331117 ETH gekocht'),
(180, '2023-09-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(181, '2023-09-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(182, '2023-10-01', 6, NULL, NULL, '100.00', 4, '0,00305140 BTC gekocht'),
(183, '2023-10-02', 6, NULL, NULL, '50.00', 1, 'Naar beleggingsrekening'),
(184, '2023-10-09', 6, NULL, NULL, '100.00', 3, 'Inleg ETF beleggingsfonds'),
(185, '2023-10-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(186, '2023-10-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(187, '2023-11-06', 6, NULL, NULL, '30.00', 2, 'Naar spaarrekening'),
(188, '2023-11-13', 6, NULL, NULL, '60.00', 1, 'Naar spaarrekening'),
(189, '2023-11-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(190, '2023-11-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(191, '2023-12-01', 6, NULL, NULL, '100.00', 5, '0,04837953 ETH gekocht'),
(192, '2023-12-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(193, '2023-12-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(194, '2024-01-01', 6, NULL, NULL, '100.00', 4, '0,00253815 BTC gekocht'),
(195, '2024-01-08', 6, NULL, NULL, '50.00', 1, 'Naar beleggingsrekening'),
(196, '2024-01-15', 6, NULL, NULL, '100.00', 3, 'Inleg ETF beleggingsfonds'),
(197, '2024-01-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(198, '2024-01-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(199, '2024-02-05', 6, NULL, NULL, '30.00', 2, 'Naar spaarrekening'),
(200, '2024-02-12', 6, NULL, NULL, '100.00', 1, 'Naar spaarrekening'),
(201, '2024-02-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(202, '2024-02-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(203, '2024-03-01', 6, NULL, NULL, '100.00', 5, '0,02958729 ETH gekocht'),
(204, '2024-03-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(205, '2024-03-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(206, '2024-04-01', 6, NULL, NULL, '100.00', 4, '0,00175902 BTC gekocht'),
(207, '2024-04-08', 6, NULL, NULL, '50.00', 1, 'Naar beleggingsrekening'),
(208, '2024-04-15', 6, NULL, NULL, '100.00', 3, 'Inleg ETF beleggingsfonds'),
(209, '2024-04-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(210, '2024-04-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(211, '2024-05-06', 6, NULL, NULL, '30.00', 2, 'Naar spaarrekening'),
(212, '2024-05-13', 6, NULL, NULL, '60.00', 1, 'Naar spaarrekening'),
(213, '2024-05-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(214, '2024-05-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(215, '2024-06-01', 6, NULL, NULL, '100.00', 5, '0,03127248 ETH gekocht'),
(216, '2024-06-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(217, '2024-06-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(218, '2024-07-01', 6, NULL, NULL, '100.00', 4, '0,00167518 BTC gekocht'),
(219, '2024-07-08', 6, NULL, NULL, '50.00', 1, 'Naar beleggingsrekening'),
(220, '2024-07-15', 6, NULL, NULL, '100.00', 3, 'Inleg ETF beleggingsfonds'),
(221, '2024-07-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(222, '2024-07-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(223, '2024-08-05', 6, NULL, NULL, '30.00', 2, 'Naar spaarrekening'),
(224, '2024-08-12', 6, NULL, NULL, '60.00', 1, 'Naar spaarrekening'),
(225, '2024-08-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(226, '2024-08-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(227, '2024-09-01', 6, NULL, NULL, '100.00', 5, '0,04278496 ETH gekocht'),
(228, '2024-09-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(229, '2024-09-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(230, '2024-10-01', 6, NULL, NULL, '100.00', 4, '0,00155027 BTC gekocht'),
(231, '2024-10-07', 6, NULL, NULL, '50.00', 1, 'Naar beleggingsrekening'),
(232, '2024-10-14', 6, NULL, NULL, '100.00', 3, 'Inleg ETF beleggingsfonds'),
(233, '2024-10-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(234, '2024-10-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(235, '2024-11-04', 6, NULL, NULL, '30.00', 2, 'Naar spaarrekening'),
(236, '2024-11-11', 6, NULL, NULL, '60.00', 1, 'Naar spaarrekening'),
(237, '2024-11-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(238, '2024-11-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(239, '2024-12-01', 6, NULL, NULL, '100.00', 5, '0,03105744 ETH gekocht'),
(240, '2024-12-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(241, '2024-12-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(242, '2025-01-01', 6, NULL, NULL, '100.00', 4, '0,00101182 BTC gekocht'),
(243, '2025-01-06', 6, NULL, NULL, '50.00', 1, 'Naar beleggingsrekening'),
(244, '2025-01-13', 6, NULL, NULL, '100.00', 3, 'Inleg ETF beleggingsfonds'),
(245, '2025-01-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(246, '2025-01-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(247, '2025-02-03', 6, NULL, NULL, '30.00', 2, 'Naar spaarrekening'),
(248, '2025-02-10', 6, NULL, NULL, '60.00', 1, 'Naar spaarrekening'),
(249, '2025-02-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(250, '2025-02-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(251, '2025-03-01', 6, NULL, NULL, '100.00', 5, '0,05932359 ETH gekocht'),
(252, '2025-03-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(253, '2025-03-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(254, '2025-04-01', 6, NULL, NULL, '100.00', 4, '0,00120212 BTC gekocht'),
(255, '2025-04-07', 6, NULL, NULL, '50.00', 1, 'Naar beleggingsrekening'),
(256, '2025-04-14', 6, NULL, NULL, '100.00', 3, 'Inleg ETF beleggingsfonds'),
(257, '2025-04-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(258, '2025-04-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(259, '2025-05-05', 6, NULL, NULL, '30.00', 2, 'Naar spaarrekening'),
(260, '2025-05-12', 6, NULL, NULL, '60.00', 1, 'Naar spaarrekening'),
(261, '2025-05-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(262, '2025-05-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(263, '2025-06-01', 6, NULL, NULL, '100.00', 5, '0,04739696 ETH gekocht'),
(264, '2025-06-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(265, '2025-06-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(266, '2025-07-01', 6, NULL, NULL, '100.00', 4, '0,00110002 BTC gekocht'),
(267, '2025-07-07', 6, NULL, NULL, '50.00', 1, 'Naar beleggingsrekening'),
(268, '2025-07-14', 6, NULL, NULL, '100.00', 3, 'Inleg ETF beleggingsfonds'),
(269, '2025-07-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(270, '2025-07-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.'),
(271, '2025-08-04', 6, NULL, NULL, '30.00', 2, 'Naar spaarrekening'),
(272, '2025-08-11', 6, NULL, NULL, '60.00', 1, 'Naar spaarrekening'),
(273, '2025-08-20', 6, '1000.00', NULL, NULL, 6, 'Salaris'),
(274, '2025-08-27', 6, NULL, '600.00', NULL, 7, 'Boodschappen, energie, vervoer, etc.');

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
(1, 0, 'Sparen &amp; Beleggen', 'Groep voor investeringen (beleggen, sparen, crypto, etc.)'),
(2, 0, 'Inkomsten', 'Inkomsten uit werk of vergoedingen'),
(3, 0, 'Overige', 'Testgroep');

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
(1, 4, '2025-09-14 12:09:09'),
(1, 1, '2025-09-14 12:09:56'),
(1, 3, '2025-09-14 12:11:15'),
(2, 6, '2025-09-14 12:12:02'),
(3, 7, '2025-09-14 12:13:02'),
(1, 2, '2025-09-14 14:45:45'),
(1, 1, '2025-09-14 14:46:18'),
(2, 6, '2025-09-14 14:46:57'),
(3, 7, '2025-09-14 14:47:18'),
(1, 5, '2025-09-14 14:48:41'),
(2, 6, '2025-09-14 14:49:22'),
(3, 7, '2025-09-14 14:49:36'),
(1, 4, '2025-09-14 14:50:51'),
(1, 1, '2025-09-14 14:51:31'),
(1, 3, '2025-09-14 14:51:46'),
(2, 6, '2025-09-14 14:52:24'),
(3, 7, '2025-09-14 14:52:34'),
(1, 2, '2025-09-14 14:54:08'),
(1, 1, '2025-09-14 14:54:29'),
(2, 6, '2025-09-14 14:54:57'),
(3, 7, '2025-09-14 14:55:12'),
(1, 5, '2025-09-14 14:56:34'),
(2, 6, '2025-09-14 14:57:08'),
(3, 7, '2025-09-14 14:57:21'),
(1, 1, '2025-09-14 14:59:04'),
(1, 3, '2025-09-14 14:59:15'),
(1, 4, '2025-09-14 14:59:43'),
(2, 6, '2025-09-14 15:00:07'),
(3, 7, '2025-09-14 15:00:18'),
(1, 2, '2025-09-14 15:00:55'),
(1, 1, '2025-09-14 15:01:20'),
(2, 6, '2025-09-14 15:01:35'),
(3, 7, '2025-09-14 15:01:49'),
(1, 5, '2025-09-14 15:02:30'),
(2, 6, '2025-09-14 15:02:52'),
(3, 7, '2025-09-14 15:03:02'),
(1, 4, '2025-09-14 15:03:36'),
(1, 1, '2025-09-14 15:03:59'),
(1, 3, '2025-09-14 15:04:14'),
(2, 6, '2025-09-14 15:04:25'),
(3, 7, '2025-09-14 15:04:36'),
(1, 2, '2025-09-14 15:05:15'),
(1, 1, '2025-09-14 15:05:32'),
(2, 6, '2025-09-14 15:05:42'),
(3, 7, '2025-09-14 15:05:55'),
(1, 5, '2025-09-14 15:06:30'),
(2, 6, '2025-09-14 15:06:54'),
(3, 7, '2025-09-14 15:07:15'),
(1, 4, '2025-09-15 09:51:45'),
(1, 1, '2025-09-15 09:52:10'),
(1, 3, '2025-09-15 09:52:24'),
(2, 6, '2025-09-15 09:52:34'),
(3, 7, '2025-09-15 09:52:44'),
(1, 2, '2025-09-15 09:53:18'),
(1, 1, '2025-09-15 09:53:31'),
(2, 6, '2025-09-15 09:53:42'),
(3, 7, '2025-09-15 09:53:55'),
(1, 5, '2025-09-15 09:54:32'),
(2, 6, '2025-09-15 09:54:49'),
(3, 7, '2025-09-15 09:54:59'),
(1, 4, '2025-09-15 09:55:39'),
(1, 1, '2025-09-15 09:56:01'),
(1, 3, '2025-09-15 09:56:15'),
(2, 6, '2025-09-15 09:56:26'),
(3, 7, '2025-09-15 09:56:40'),
(1, 2, '2025-09-15 09:57:33'),
(1, 1, '2025-09-15 09:57:55'),
(2, 6, '2025-09-15 09:58:07'),
(3, 7, '2025-09-15 09:58:19'),
(1, 5, '2025-09-15 09:58:56'),
(2, 6, '2025-09-15 09:59:07'),
(3, 7, '2025-09-15 09:59:16'),
(1, 4, '2025-09-15 11:04:21'),
(1, 1, '2025-09-15 11:04:40'),
(1, 3, '2025-09-15 11:04:55'),
(2, 6, '2025-09-15 11:05:04'),
(3, 7, '2025-09-15 11:05:14'),
(1, 2, '2025-09-15 11:05:32'),
(1, 1, '2025-09-15 11:05:51'),
(2, 6, '2025-09-15 11:06:01'),
(3, 7, '2025-09-15 11:06:15'),
(1, 5, '2025-09-15 11:06:58'),
(2, 6, '2025-09-15 11:07:08'),
(3, 7, '2025-09-15 11:07:17'),
(1, 4, '2025-09-15 11:07:56'),
(1, 1, '2025-09-15 11:08:13'),
(1, 3, '2025-09-15 11:08:34'),
(2, 6, '2025-09-15 11:08:44'),
(3, 7, '2025-09-15 11:08:54'),
(1, 2, '2025-09-15 11:09:13'),
(1, 1, '2025-09-15 11:09:29'),
(2, 6, '2025-09-15 11:09:47'),
(3, 7, '2025-09-15 11:10:00'),
(1, 5, '2025-09-15 11:10:26'),
(2, 6, '2025-09-15 11:10:37'),
(3, 7, '2025-09-15 11:10:47'),
(1, 4, '2025-09-15 11:56:14'),
(1, 1, '2025-09-15 11:56:41'),
(1, 3, '2025-09-15 11:56:53'),
(2, 6, '2025-09-15 11:57:04'),
(3, 7, '2025-09-15 11:57:14'),
(1, 2, '2025-09-15 11:57:43'),
(1, 1, '2025-09-15 11:58:04'),
(2, 6, '2025-09-15 11:58:14'),
(3, 7, '2025-09-15 11:58:25'),
(1, 5, '2025-09-15 11:58:50'),
(2, 6, '2025-09-15 11:59:15'),
(3, 7, '2025-09-15 11:59:47'),
(1, 4, '2025-09-15 12:00:23'),
(1, 1, '2025-09-15 12:00:46'),
(1, 3, '2025-09-15 12:01:01'),
(2, 6, '2025-09-15 12:01:10'),
(3, 7, '2025-09-15 12:01:20'),
(1, 2, '2025-09-15 12:01:39'),
(1, 1, '2025-09-15 12:01:54'),
(2, 6, '2025-09-15 12:02:05'),
(3, 7, '2025-09-15 12:02:18'),
(1, 5, '2025-09-15 12:02:43'),
(2, 6, '2025-09-15 12:02:53'),
(3, 7, '2025-09-15 12:03:03'),
(1, 4, '2025-09-15 12:03:34'),
(1, 1, '2025-09-15 12:03:54'),
(1, 3, '2025-09-15 12:04:03'),
(2, 6, '2025-09-15 12:04:11'),
(3, 7, '2025-09-15 12:04:21'),
(1, 2, '2025-09-15 12:04:48'),
(1, 1, '2025-09-15 12:05:06'),
(2, 6, '2025-09-15 12:05:17'),
(3, 7, '2025-09-15 12:05:26'),
(1, 5, '2025-09-15 12:05:55'),
(2, 6, '2025-09-15 12:06:04'),
(3, 7, '2025-09-15 12:06:16'),
(1, 4, '2025-09-15 12:06:55'),
(1, 1, '2025-09-15 12:07:22'),
(1, 3, '2025-09-15 12:07:31'),
(2, 6, '2025-09-15 12:07:40'),
(3, 7, '2025-09-15 12:07:49'),
(1, 2, '2025-09-15 12:08:12'),
(1, 1, '2025-09-15 12:08:40'),
(2, 6, '2025-09-15 12:08:49'),
(3, 7, '2025-09-15 12:08:59'),
(1, 5, '2025-09-15 12:09:39'),
(2, 6, '2025-09-15 12:09:49'),
(3, 7, '2025-09-15 12:09:59'),
(1, 4, '2025-09-15 12:40:32'),
(1, 4, '2025-09-15 12:41:29'),
(1, 1, '2025-09-15 12:41:57'),
(1, 3, '2025-09-15 12:42:12'),
(2, 6, '2025-09-15 12:42:22'),
(3, 7, '2025-09-15 12:42:32'),
(1, 2, '2025-09-15 12:43:05'),
(1, 1, '2025-09-15 12:43:16'),
(2, 6, '2025-09-15 12:43:28'),
(3, 7, '2025-09-15 12:43:38'),
(1, 5, '2025-09-15 12:44:04'),
(2, 6, '2025-09-15 12:44:15'),
(3, 7, '2025-09-15 12:44:27'),
(1, 4, '2025-09-15 12:45:17'),
(1, 1, '2025-09-15 12:45:38'),
(1, 3, '2025-09-15 12:45:46'),
(2, 6, '2025-09-15 12:46:00'),
(3, 7, '2025-09-15 12:46:09'),
(1, 2, '2025-09-15 12:46:28'),
(1, 1, '2025-09-15 12:46:43'),
(2, 6, '2025-09-15 12:46:54'),
(3, 7, '2025-09-15 12:47:05'),
(1, 5, '2025-09-15 12:47:31'),
(2, 6, '2025-09-15 12:47:39'),
(3, 7, '2025-09-15 12:47:48'),
(1, 4, '2025-09-15 12:48:15'),
(1, 1, '2025-09-15 12:48:31'),
(1, 3, '2025-09-15 12:48:44'),
(2, 6, '2025-09-15 12:48:58'),
(3, 7, '2025-09-15 12:49:10'),
(1, 2, '2025-09-15 12:49:32'),
(1, 1, '2025-09-15 12:49:50'),
(2, 6, '2025-09-15 12:50:02'),
(3, 7, '2025-09-15 12:50:21'),
(1, 5, '2025-09-15 12:51:42'),
(2, 6, '2025-09-15 12:51:52'),
(3, 7, '2025-09-15 12:52:02'),
(1, 4, '2025-09-15 12:52:35'),
(1, 1, '2025-09-15 12:52:52'),
(1, 3, '2025-09-15 12:53:01'),
(2, 6, '2025-09-15 12:53:10'),
(3, 7, '2025-09-15 12:53:20'),
(1, 2, '2025-09-15 12:53:38'),
(1, 1, '2025-09-15 12:53:55'),
(2, 6, '2025-09-15 12:54:04'),
(3, 7, '2025-09-15 12:54:12'),
(1, 5, '2025-09-15 12:54:38'),
(2, 6, '2025-09-15 12:54:46'),
(3, 7, '2025-09-15 12:54:59'),
(1, 4, '2025-09-15 12:59:25'),
(1, 1, '2025-09-15 12:59:52'),
(1, 3, '2025-09-15 13:00:03'),
(2, 6, '2025-09-15 13:00:14'),
(3, 7, '2025-09-15 13:00:25'),
(1, 2, '2025-09-15 13:00:42'),
(1, 1, '2025-09-15 13:00:57'),
(2, 6, '2025-09-15 13:01:08'),
(3, 7, '2025-09-15 13:01:18'),
(1, 5, '2025-09-15 13:01:43'),
(2, 6, '2025-09-15 13:01:52'),
(3, 7, '2025-09-15 13:02:07'),
(1, 4, '2025-09-15 13:02:43'),
(1, 1, '2025-09-15 13:04:23'),
(1, 3, '2025-09-15 13:04:35'),
(2, 6, '2025-09-15 13:04:44'),
(3, 7, '2025-09-15 13:04:53'),
(1, 2, '2025-09-15 13:05:13'),
(1, 1, '2025-09-15 13:05:34'),
(2, 6, '2025-09-15 13:05:52'),
(3, 7, '2025-09-15 13:06:03'),
(1, 5, '2025-09-15 13:06:29'),
(2, 6, '2025-09-15 13:06:40'),
(3, 7, '2025-09-15 13:06:48'),
(1, 4, '2025-09-15 13:07:17'),
(1, 1, '2025-09-15 13:07:36'),
(1, 3, '2025-09-15 13:07:49'),
(2, 6, '2025-09-15 13:07:59'),
(3, 7, '2025-09-15 13:08:07'),
(1, 2, '2025-09-15 13:08:46'),
(1, 1, '2025-09-15 13:08:59'),
(2, 6, '2025-09-15 13:09:09'),
(3, 7, '2025-09-15 13:09:18'),
(1, 5, '2025-09-15 13:09:47'),
(2, 6, '2025-09-15 13:09:58'),
(3, 7, '2025-09-15 13:10:15'),
(1, 4, '2025-09-15 13:11:03'),
(1, 1, '2025-09-15 13:11:19'),
(1, 3, '2025-09-15 13:11:30'),
(2, 6, '2025-09-15 13:11:41'),
(3, 7, '2025-09-15 13:11:52'),
(1, 2, '2025-09-15 13:12:16'),
(1, 1, '2025-09-15 13:12:37'),
(2, 6, '2025-09-15 13:12:48'),
(3, 7, '2025-09-15 13:12:57'),
(1, 5, '2025-09-15 13:13:26'),
(2, 6, '2025-09-15 13:13:39'),
(3, 7, '2025-09-15 13:13:56'),
(1, 4, '2025-09-15 13:19:16'),
(1, 1, '2025-09-15 13:19:35'),
(1, 3, '2025-09-15 13:19:55'),
(2, 6, '2025-09-15 13:20:05'),
(3, 7, '2025-09-15 13:20:12'),
(1, 2, '2025-09-15 13:20:28'),
(1, 1, '2025-09-15 13:20:47'),
(2, 6, '2025-09-15 13:20:58'),
(3, 7, '2025-09-15 13:21:08'),
(1, 5, '2025-09-15 13:21:35'),
(2, 6, '2025-09-15 13:21:43'),
(3, 7, '2025-09-15 13:21:51'),
(1, 4, '2025-09-15 13:22:27'),
(1, 1, '2025-09-15 13:22:44'),
(1, 3, '2025-09-15 13:22:54'),
(2, 6, '2025-09-15 13:23:02'),
(3, 7, '2025-09-15 13:23:17'),
(1, 2, '2025-09-15 13:23:36'),
(1, 1, '2025-09-15 13:23:48'),
(2, 6, '2025-09-15 13:23:56'),
(3, 7, '2025-09-15 13:24:04'),
(1, 5, '2025-09-15 13:24:42'),
(2, 6, '2025-09-15 13:24:52'),
(3, 7, '2025-09-15 13:25:04'),
(1, 4, '2025-09-15 13:25:31'),
(1, 1, '2025-09-15 13:25:57'),
(1, 3, '2025-09-15 13:26:09'),
(2, 6, '2025-09-15 13:26:20'),
(3, 7, '2025-09-15 13:26:30'),
(1, 2, '2025-09-15 13:27:04'),
(1, 1, '2025-09-15 13:27:21'),
(2, 6, '2025-09-15 13:27:34'),
(3, 7, '2025-09-15 13:27:42');

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
(1, '2020-02-03', 3, '30.00', NULL, 'Van betaalrekening'),
(2, '2020-02-10', 4, '60.00', NULL, 'Van betaalrekening'),
(3, '2020-05-04', 3, '30.00', NULL, 'Van betaalrekening'),
(4, '2020-05-11', 4, '60.00', NULL, 'Van betaalrekening'),
(5, '2020-08-03', 3, '30.00', NULL, 'Van betaalrekening'),
(6, '2020-08-10', 4, '60.00', NULL, 'Van betaalrekening'),
(7, '2020-11-02', 3, '30.00', NULL, 'Van betaalrekening'),
(8, '2020-11-09', 4, '60.00', NULL, 'Van betaalrekening'),
(9, '2021-02-01', 3, '30.00', NULL, 'Van betaalrekening'),
(10, '2021-02-08', 4, '60.00', NULL, 'Van betaalrekening'),
(11, '2021-05-03', 3, '30.00', NULL, 'Van betaalrekening'),
(12, '2021-05-10', 4, '60.00', NULL, 'Van betaalrekening'),
(13, '2021-08-02', 3, '30.00', NULL, 'Van betaalrekening'),
(14, '2021-08-09', 4, '60.00', NULL, 'Van betaalrekening'),
(15, '2021-11-01', 3, '30.00', NULL, 'Van betaalrekening'),
(16, '2021-11-08', 4, '60.00', NULL, 'Van betaalrekening'),
(17, '2022-02-07', 3, '30.00', NULL, 'Van betaalrekening'),
(18, '2022-02-14', 4, '60.00', NULL, 'Van betaalrekening'),
(19, '2022-05-02', 3, '30.00', NULL, 'Van betaalrekening'),
(20, '2022-05-09', 4, '60.00', NULL, 'Van betaalrekening'),
(21, '2022-08-01', 3, '30.00', NULL, 'Van betaalrekening'),
(22, '2022-08-08', 4, '60.00', NULL, 'Van betaalrekening'),
(23, '2022-11-07', 3, '30.00', NULL, 'Van betaalrekening'),
(24, '2022-11-14', 4, '60.00', NULL, 'Van betaalrekening'),
(25, '2023-02-06', 3, '30.00', NULL, 'Van betaalrekening'),
(26, '2023-02-13', 4, '60.00', NULL, 'Van betaalrekening'),
(27, '2023-05-01', 3, '30.00', NULL, 'Van betaalrekening'),
(28, '2023-05-08', 4, '60.00', NULL, 'Van betaalrekening'),
(29, '2023-08-07', 3, '30.00', NULL, 'Van betaalrekening'),
(30, '2023-08-14', 4, '60.00', NULL, 'Van betaalrekening'),
(31, '2023-11-06', 3, '30.00', NULL, 'Van betaalrekening'),
(32, '2023-11-13', 4, '60.00', NULL, 'Van betaalrekening'),
(33, '2024-02-05', 3, '30.00', NULL, 'Van betaalrekening'),
(34, '2024-02-12', 4, '60.00', NULL, 'Van betaalrekening'),
(35, '2024-05-06', 3, '30.00', NULL, 'Van betaalrekening'),
(36, '2024-05-13', 4, '60.00', NULL, 'Van betaalrekening'),
(37, '2024-08-05', 3, '30.00', NULL, 'Van betaalrekening'),
(38, '2024-08-12', 4, '60.00', NULL, 'Van betaalrekening'),
(39, '2024-11-04', 3, '30.00', NULL, 'Van betaalrekening'),
(40, '2024-11-11', 4, '60.00', NULL, 'Van betaalrekening'),
(41, '2025-02-03', 3, '30.00', NULL, 'Van betaalrekening'),
(42, '2025-02-10', 4, '60.00', NULL, 'Van betaalrekening'),
(43, '2025-05-05', 3, '30.00', NULL, 'Van betaalrekening'),
(44, '2025-05-12', 4, '60.00', NULL, 'Van betaalrekening'),
(45, '2025-08-04', 3, '30.00', NULL, 'Van betaalrekening'),
(46, '2025-08-11', 4, '60.00', NULL, 'Van betaalrekening'),
(47, '2025-11-03', 3, '30.00', NULL, 'Van betaalrekening'),
(48, '2025-11-10', 4, '60.00', NULL, 'Van betaalrekening');

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
(1, 0, 'ING Particulier', '&#9745;', '&#9745;', '&#9745;', '&#9744;', 'https://www.ing.nl'),
(2, 0, 'Meesman', '&#9744;', '&#9745;', '&#9744;', '&#9744;', 'https://www.meesman.nl'),
(3, 0, 'ABN AMRO', '&#9744;', '&#9744;', '&#9745;', '&#9744;', 'https://www.abnamro.nl'),
(4, 0, 'Trezor', '&#9744;', '&#9744;', '&#9744;', '&#9745;', 'https://trezor.io');

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
(2, 'finance', '{\"page\": \"true\", \"show\": \"true\", \"sort\": {\"bsn\": \"false\", \"grp\": \"false\"}, \"scale\": \"quarters\", \"start\": \"2020\", \"theme\": {\"color\": \"#ffd700\"}}'),
(3, 'stock', '{\"page\": \"true\", \"show\": \"true\", \"scale\": \"quarters\", \"start\": \"2020\", \"theme\": {\"color\": \"#228b22\"}}'),
(4, 'savings', '{\"page\": \"true\", \"show\": \"true\", \"scale\": \"quarters\", \"start\": \"2020\", \"theme\": {\"color\": \"#4169e1\"}}'),
(5, 'crypto', '{\"page\": \"true\", \"show\": \"true\", \"scale\": \"year\", \"start\": \"2020\", \"theme\": {\"color\": \"#ff8f00\"}}'),
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
(1, '2020-01-06', 1, '50.00', NULL, 'Van betaalrekening'),
(2, '2020-01-13', 2, '100.00', NULL, 'Van betaalrekening'),
(3, '2020-04-06', 1, '50.00', NULL, 'Van betaalrekening'),
(4, '2020-04-13', 2, '100.00', NULL, 'Van betaalrekening'),
(5, '2020-07-06', 1, '50.00', NULL, 'Van betaalrekening'),
(6, '2020-07-13', 2, '100.00', NULL, 'Van betaalrekening'),
(7, '2020-10-05', 1, '50.00', NULL, 'Van betaalrekening'),
(8, '2020-10-12', 2, '100.00', NULL, 'Van betaalrekening'),
(9, '2021-01-04', 1, '50.00', NULL, 'Van betaalrekening'),
(10, '2021-01-11', 2, '100.00', NULL, 'Van betaalrekening'),
(11, '2021-04-05', 1, '50.00', NULL, 'Van betaalrekening'),
(12, '2021-04-12', 2, '100.00', NULL, 'Van betaalrekening'),
(13, '2021-07-05', 1, '50.00', NULL, 'Van betaalrekening'),
(14, '2021-07-12', 2, '100.00', NULL, 'Van betaalrekening'),
(15, '2021-10-04', 1, '50.00', NULL, 'Van betaalrekening'),
(16, '2021-10-11', 2, '100.00', NULL, 'Van betaalrekening'),
(17, '2022-01-03', 1, '50.00', NULL, 'Van betaalrekening'),
(18, '2022-01-10', 2, '100.00', NULL, 'Van betaalrekening'),
(19, '2022-04-04', 1, '50.00', NULL, 'Van betaalrekening'),
(20, '2022-04-11', 2, '100.00', NULL, 'Van betaalrekening'),
(21, '2022-07-04', 1, '50.00', NULL, 'Van betaalrekening'),
(22, '2022-07-11', 2, '100.00', NULL, 'Van betaalrekening'),
(23, '2022-10-03', 1, '50.00', NULL, 'Van betaalrekening'),
(24, '2022-10-10', 2, '100.00', NULL, 'Van betaalrekening'),
(25, '2023-01-02', 1, '50.00', NULL, 'Van betaalrekening'),
(26, '2023-01-09', 2, '100.00', NULL, 'Van betaalrekening'),
(27, '2023-04-03', 1, '50.00', NULL, 'Van betaalrekening'),
(28, '2023-04-10', 2, '100.00', NULL, 'Van betaalrekening'),
(29, '2023-07-03', 1, '50.00', NULL, 'Van betaalrekening'),
(30, '2023-07-10', 2, '100.00', NULL, 'Van betaalrekening'),
(31, '2023-10-02', 1, '50.00', NULL, 'Van betaalrekening'),
(32, '2023-10-09', 2, '100.00', NULL, 'Van betaalrekening'),
(33, '2024-01-08', 1, '50.00', NULL, 'Van betaalrekening'),
(34, '2024-01-15', 2, '100.00', NULL, 'Van betaalrekening'),
(35, '2024-04-08', 1, '50.00', NULL, 'Van betaalrekening'),
(36, '2024-04-15', 2, '100.00', NULL, 'Van betaalrekening'),
(37, '2024-07-08', 1, '50.00', NULL, 'Van betaalrekening'),
(38, '2024-07-15', 2, '100.00', NULL, 'Van betaalrekening'),
(39, '2024-10-07', 1, '50.00', NULL, 'Van betaalrekening'),
(40, '2024-10-14', 2, '100.00', NULL, 'Van betaalrekening'),
(41, '2025-01-06', 1, '50.00', NULL, 'Van betaalrekening'),
(42, '2025-01-13', 2, '100.00', NULL, 'Van betaalrekening'),
(43, '2025-04-07', 1, '50.00', NULL, 'Van betaalrekening'),
(44, '2025-04-14', 2, '100.00', NULL, 'Van betaalrekening'),
(45, '2025-07-07', 1, '50.00', NULL, 'Van betaalrekening'),
(46, '2025-07-14', 2, '100.00', NULL, 'Van betaalrekening'),
(47, '2025-10-06', 1, '50.00', NULL, 'Van betaalrekening'),
(48, '2025-10-13', 2, '100.00', NULL, 'Van betaalrekening');

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
(1, 'Admin', '9e71af2675ef9d36c6d23b737d0be7c1bd828c6cea289f91f7199478d8bcf46e', '2025-09-15 13:55:28', '2025-09-15 13:03:16');

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
(1, 0, '2020-01-01', 6, '0.00'),
(2, 0, '2020-01-01', 1, '0.00'),
(3, 0, '2020-01-01', 2, '0.00'),
(4, 0, '2020-01-01', 3, '0.00'),
(5, 0, '2020-01-01', 4, '0.00'),
(8, 0, '2020-03-31', 6, '760.00'),
(9, 0, '2020-03-31', 1, '51.65'),
(10, 0, '2020-03-31', 2, '106.40'),
(11, 0, '2020-03-31', 3, '30.00'),
(12, 0, '2020-03-31', 4, '60.00');

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
(1, '2020-01-01', 1, '8427.62'),
(2, '2020-01-01', 2, '162.38'),
(4, '2020-03-31', 1, '8427.62'),
(5, '2020-03-31', 2, '162.38');

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
  `color` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `description` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_wallets`
--

INSERT INTO `tbl_wallets` (`id`, `hide`, `aid`, `cid`, `color`, `description`) VALUES
(1, 0, 5, 1, '#ff8c00', 'Trezor BTC Wallet 1 '),
(2, 0, 5, 2, '#6a5acd', 'Trezor ETH Wallet 1');

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_amount_wallets`
--
ALTER TABLE `tbl_amount_wallets`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_businesses`
--
ALTER TABLE `tbl_businesses`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbl_config`
--
ALTER TABLE `tbl_config`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `tbl_crypto`
--
ALTER TABLE `tbl_crypto`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `tbl_cryptocurrenties`
--
ALTER TABLE `tbl_cryptocurrenties`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_dutch`
--
ALTER TABLE `tbl_dutch`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `tbl_english`
--
ALTER TABLE `tbl_english`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `tbl_finances`
--
ALTER TABLE `tbl_finances`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=275;

--
-- AUTO_INCREMENT for table `tbl_groups`
--
ALTER TABLE `tbl_groups`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_language`
--
ALTER TABLE `tbl_language`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_savings`
--
ALTER TABLE `tbl_savings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `tbl_services`
--
ALTER TABLE `tbl_services`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_settings`
--
ALTER TABLE `tbl_settings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tbl_stocks`
--
ALTER TABLE `tbl_stocks`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_value_accounts`
--
ALTER TABLE `tbl_value_accounts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tbl_value_cryptos`
--
ALTER TABLE `tbl_value_cryptos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_wallets`
--
ALTER TABLE `tbl_wallets`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
