-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 15, 2025 at 02:10 PM
-- Server version: 8.0.41-0ubuntu0.22.04.1
-- PHP Version: 8.1.2-1ubuntu2.20

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
(34, 'ValueCryptos', NULL),
(35, 'Overview', NULL);

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
(1, 0, 'Bitcoin', 'BTC', '#ffc300', 'https://www.bitcoin.org'),
(2, 0, 'Ethereum', 'ETH', '#338aff', 'https://www.ethereum.org');

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
(33, 34, 'Naam,Symbool,Ratio,Waarde'),
(34, 35, 'Jaaroverzicht,Jaaroverzicht (kwartalen),Jaaroverzicht (maanden) ');

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
(31, 34, 'Name,Symbol,Ratio,Value'),
(32, 35, 'Year Overview,Year Overview (quarters),Year Overview (months)');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_config`
--
ALTER TABLE `tbl_config`
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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_config`
--
ALTER TABLE `tbl_config`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `tbl_cryptocurrenties`
--
ALTER TABLE `tbl_cryptocurrenties`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
