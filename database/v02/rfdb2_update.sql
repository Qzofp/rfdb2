-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 18, 2024 at 02:27 PM
-- Server version: 8.0.40-0ubuntu0.22.04.1
-- PHP Version: 8.1.2-1ubuntu2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rfdb2`
--

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
(33, 0, 33, 1, '0.03679673'),
(34, 0, 34, 4, '0.05308090'),
(35, 0, 34, 3, '0.00011450'),
(36, 0, 33, 2, '0.01864570'),
(40, 0, 36, 1, '0.03679673'),
(41, 0, 37, 4, '0.05308090'),
(42, 0, 37, 3, '0.05045750'),
(43, 0, 36, 2, '0.01864570'),
(47, 0, 39, 1, '0.03679673'),
(48, 0, 40, 4, '0.05308090'),
(49, 0, 40, 3, '0.05045750'),
(50, 0, 39, 2, '0.01864570'),
(54, 0, 42, 1, '0.03679673'),
(55, 0, 43, 4, '0.05308090'),
(56, 0, 43, 3, '0.05045750'),
(57, 0, 42, 2, '0.01864570'),
(61, 0, 45, 1, '0.03679673'),
(62, 0, 46, 4, '0.05308090'),
(63, 0, 46, 3, '0.05045750'),
(64, 0, 45, 2, '0.01864570');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_config`
--

DROP TABLE IF EXISTS `tbl_config`;
CREATE TABLE `tbl_config` (
  `id` int NOT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
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
-- Table structure for table `tbl_dutch`
--

DROP TABLE IF EXISTS `tbl_dutch`;
CREATE TABLE `tbl_dutch` (
  `id` int NOT NULL,
  `id_config` int NOT NULL,
  `value` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
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
(17, 20, 'Zoek,Balans,Bedrag,Type,Aantal'),
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
(30, 31, 'Datum Waardes,Datum,Deze waardes,Er zijn geen # geselecteerd!,pagina\'s,rekeningen,Selecteer een datum!'),
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
  `value` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
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
(17, 20, 'Search,Balance,Amount,Type,Number'),
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
(28, 31, 'Date Values,Date,these values,There are no # enabled!,pages,accounts,Select a date!'),
(29, 32, 'Value Accounts,Accounts Chart,Value Development,Crypto Values,Crypto Chart,Crypto Development'),
(30, 33, 'Type,Service,Accounts,Account,Number,Ratio,Value'),
(31, 34, 'Name,Symbol,Value');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_settings`
--

DROP TABLE IF EXISTS `tbl_settings`;
CREATE TABLE `tbl_settings` (
  `id` int NOT NULL,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
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
(38, 0, '2024-01-22', 2, '101.00'),
(39, 0, '2024-01-22', 1, '101.50'),
(40, 0, '2024-01-22', 4, '201.00'),
(41, 0, '2024-01-22', 3, '201.50'),
(42, 0, '2024-01-22', 5, '301.00'),
(43, 0, '2024-01-22', 6, '301.50'),
(45, 0, '2024-02-19', 2, '102.00'),
(46, 0, '2024-02-19', 1, '102.50'),
(47, 0, '2024-02-19', 4, '202.00'),
(48, 0, '2024-02-19', 3, '202.50'),
(49, 0, '2024-02-19', 5, '302.00'),
(50, 0, '2024-02-19', 6, '302.50'),
(52, 0, '2024-03-18', 2, '103.00'),
(53, 0, '2024-03-18', 1, '103.50'),
(54, 0, '2024-03-18', 4, '203.00'),
(55, 0, '2024-03-18', 3, '203.50'),
(56, 0, '2024-03-18', 5, '303.00'),
(57, 0, '2024-03-18', 6, '303.50'),
(59, 0, '2024-04-22', 2, '104.00'),
(60, 0, '2024-04-22', 1, '104.50'),
(61, 0, '2024-04-22', 4, '204.00'),
(62, 0, '2024-04-22', 3, '204.50'),
(63, 0, '2024-04-22', 5, '304.00'),
(64, 0, '2024-04-22', 6, '304.50'),
(66, 0, '2024-05-20', 2, '105.00'),
(67, 0, '2024-05-20', 1, '105.50'),
(68, 0, '2024-05-20', 4, '205.00'),
(69, 0, '2024-05-20', 3, '205.50'),
(70, 0, '2024-05-20', 5, '305.00'),
(71, 0, '2024-05-20', 6, '305.50'),
(73, 0, '2024-06-17', 2, '106.00'),
(74, 0, '2024-06-17', 1, '106.50'),
(75, 0, '2024-06-17', 4, '206.00'),
(76, 0, '2024-06-17', 3, '206.50'),
(77, 0, '2024-06-17', 5, '306.00'),
(78, 0, '2024-06-17', 6, '306.50'),
(80, 0, '2024-07-22', 2, '107.00'),
(81, 0, '2024-07-22', 1, '107.50'),
(82, 0, '2024-07-22', 4, '207.00'),
(83, 0, '2024-07-22', 3, '207.50'),
(84, 0, '2024-07-22', 5, '307.00'),
(85, 0, '2024-07-22', 6, '307.50'),
(87, 0, '2024-08-19', 2, '108.00'),
(88, 0, '2024-08-19', 1, '108.50'),
(89, 0, '2024-08-19', 4, '208.00'),
(90, 0, '2024-08-19', 3, '208.50'),
(91, 0, '2024-08-19', 5, '308.00'),
(92, 0, '2024-08-19', 6, '308.50'),
(94, 0, '2024-09-23', 2, '109.00'),
(95, 0, '2024-09-23', 1, '109.50'),
(96, 0, '2024-09-23', 4, '209.00'),
(97, 0, '2024-09-23', 3, '209.50'),
(98, 0, '2024-09-23', 5, '309.00'),
(99, 0, '2024-09-23', 6, '309.50'),
(101, 0, '2024-10-21', 2, '110.00'),
(102, 0, '2024-10-21', 1, '110.50'),
(103, 0, '2024-10-21', 4, '210.00'),
(104, 0, '2024-10-21', 3, '210.50'),
(105, 0, '2024-10-21', 5, '310.00'),
(106, 0, '2024-10-21', 6, '310.50'),
(108, 0, '2024-11-18', 2, '111.00'),
(109, 0, '2024-11-18', 1, '111.50'),
(110, 0, '2024-11-18', 4, '211.00'),
(111, 0, '2024-11-18', 3, '211.50'),
(112, 0, '2024-11-18', 5, '311.00'),
(113, 0, '2024-11-18', 6, '311.50');

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
(15, '2024-01-22', 1, '40001.00'),
(16, '2024-01-22', 2, '1501.00'),
(18, '2024-02-19', 1, '42002.00'),
(19, '2024-02-19', 2, '1602.00'),
(21, '2024-03-18', 1, '44003.00'),
(22, '2024-03-18', 2, '1703.00'),
(24, '2024-04-22', 1, '46004.00'),
(25, '2024-04-22', 2, '1804.00'),
(27, '2024-05-20', 1, '48005.00'),
(28, '2024-05-20', 2, '1905.00'),
(30, '2024-06-17', 1, '49006.00'),
(31, '2024-06-17', 2, '2006.00'),
(33, '2024-07-22', 1, '50007.00'),
(34, '2024-07-22', 2, '2107.00'),
(36, '2024-08-19', 1, '51008.00'),
(37, '2024-08-19', 2, '2208.00'),
(39, '2024-09-23', 1, '52009.00'),
(40, '2024-09-23', 2, '2309.00'),
(42, '2024-10-21', 1, '53010.00'),
(43, '2024-10-21', 2, '2410.00'),
(45, '2024-11-18', 1, '54011.00'),
(46, '2024-11-18', 2, '2511.00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_amount_wallets`
--
ALTER TABLE `tbl_amount_wallets`
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
-- Indexes for table `tbl_settings`
--
ALTER TABLE `tbl_settings`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_amount_wallets`
--
ALTER TABLE `tbl_amount_wallets`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `tbl_config`
--
ALTER TABLE `tbl_config`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

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
-- AUTO_INCREMENT for table `tbl_settings`
--
ALTER TABLE `tbl_settings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tbl_value_accounts`
--
ALTER TABLE `tbl_value_accounts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT for table `tbl_value_cryptos`
--
ALTER TABLE `tbl_value_cryptos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
