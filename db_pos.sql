-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2021 at 05:50 PM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 5.6.37

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_pos`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_category`
--

CREATE TABLE `tb_category` (
  `id_category` int(11) NOT NULL,
  `category` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_category`
--

INSERT INTO `tb_category` (`id_category`, `category`) VALUES
(1, 'dessert'),
(2, 'drink'),
(3, 'food');

-- --------------------------------------------------------

--
-- Table structure for table `tb_history`
--

CREATE TABLE `tb_history` (
  `id` int(11) NOT NULL,
  `invoice` int(20) NOT NULL,
  `cashier` varchar(20) NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_product` int(11) NOT NULL,
  `qty` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_history`
--

INSERT INTO `tb_history` (`id`, `invoice`, `cashier`, `date`, `id_product`, `qty`) VALUES
(11, 10927, 'Cashier 1', '2021-02-06 00:10:33', 15, 1),
(13, 10927, 'Cashier 1', '2021-02-06 00:13:31', 20, 1),
(14, 10928, 'Cashier 1', '2021-02-06 00:14:47', 18, 1),
(15, 10929, 'Cashier 7', '2021-02-06 00:14:47', 16, 1),
(16, 10929, 'Cashier 7', '2021-02-06 00:14:47', 17, 1),
(17, 10930, 'Cashier 2', '2021-02-06 00:57:40', 14, 2),
(18, 10931, 'Cashier 2', '2021-02-06 00:57:40', 16, 3),
(19, 10932, 'Cashier 3', '2021-02-06 00:57:40', 17, 4),
(20, 10933, 'cashier', '2021-02-07 14:29:23', 14, 1),
(21, 10933, 'cashier', '2021-02-07 14:47:52', 12, 1),
(22, 10933, 'cashier', '2021-02-07 14:49:49', 12, 1),
(23, 10933, 'cashier', '2021-02-07 14:49:56', 15, 1),
(24, 10933, 'cashier', '2021-02-07 14:50:01', 14, 1),
(25, 10933, 'cashier', '2021-02-07 14:50:08', 17, 1),
(26, 10933, 'cashier', '2021-02-07 14:51:58', 12, 1),
(27, 10933, 'cashier', '2021-02-07 14:52:14', 17, 1),
(37, 91567, 'cashier', '2021-02-07 15:32:49', 17, 1),
(38, 91567, 'cashier', '2021-02-07 15:32:49', 15, 1),
(39, 98322, 'Della', '2021-02-07 22:09:57', 14, 2),
(40, 98322, 'Della', '2021-02-07 22:09:57', 12, 1),
(41, 98322, 'Della', '2021-02-07 22:09:57', 20, 1),
(42, 9609, 'cashier', '2021-02-08 08:30:21', 13, 1),
(43, 44992, 'cashier', '2021-02-08 08:30:54', 12, 1),
(44, 29583, 'Della', '2021-02-08 10:42:35', 12, 1),
(45, 29583, 'Della', '2021-02-08 10:42:35', 15, 1),
(46, 73279, 'cashier', '2021-03-02 21:31:42', 12, 1),
(47, 73279, 'cashier', '2021-03-02 21:31:42', 13, 1),
(48, 73279, 'cashier', '2021-03-02 21:31:42', 15, 1),
(49, 73279, 'cashier', '2021-03-02 21:32:21', 12, 1),
(50, 73279, 'cashier', '2021-03-02 21:32:21', 13, 1),
(51, 73279, 'cashier', '2021-03-02 21:32:21', 15, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_product`
--

CREATE TABLE `tb_product` (
  `id_product` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `image` text NOT NULL,
  `price` int(11) NOT NULL,
  `images` varchar(255) NOT NULL COMMENT 'Upload image',
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_product`
--

INSERT INTO `tb_product` (`id_product`, `name`, `image`, `price`, `images`, `create_at`, `id_category`) VALUES
(12, 'Espresso', 'menu1', 10000, '1612438608757.png', '2021-02-04 18:36:48', 2),
(13, 'Coffee Latte', 'menu2', 15000, '1612438656512.png', '2021-02-04 18:37:36', 2),
(14, 'Cappucino', 'menu3', 5000, '1612438704597.png', '2021-02-04 18:38:24', 2),
(15, 'Red Velvet Latte', 'menu4', 33000, '1612438751948.png', '2021-02-04 18:39:11', 2),
(16, 'Choco Rum', 'menu5', 28000, '1612438780900.png', '2021-02-04 18:39:40', 1),
(17, 'Black Forest', 'menu6', 30000, '1612438939788.png', '2021-02-04 18:42:19', 1),
(18, 'Chicken Katsu Dabu-dabu', 'menu7', 60000, '1612438970312.png', '2021-02-04 18:42:50', 3),
(19, 'Salmon Truffle Teriyaki', 'menu8', 60000, '1612438998288.png', '2021-02-04 18:43:18', 3),
(20, 'Wiener Schnitzel', 'menu9', 69000, '1612439022301.png', '2021-02-04 18:43:42', 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `access` int(11) NOT NULL COMMENT '0 = admin, 1 = cashier'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `access`) VALUES
(2, 'admin', 'admin@gmail.com', '$2b$10$JLjJoL0aGG6K323dKUAtRuOEzO1JEP9QGeuPq6Lx4QHZRoXPDieMe', 0),
(5, 'cashier', 'cashier@gmail.com', '$2b$10$OeNpsabqrLrqPROF1Ylpwuw7Lrh33TY8ZJDfCdETN/RaMa5nfB0aK', 1),
(6, 'Fadella', 'fadella@gmail.com', '$2b$10$I2lacLERGA3XgSNi.L6M1.GrKgaLHBUtLf3nXr11BvUcEqZcucwBi', 0),
(7, 'Della', 'della@gmail.com', '$2b$10$V41BQnZapnaoNaau4dgX2OIILSv/is4A85Q2SomYuEo1TVW1yuCUa', 1),
(8, 'Fadel', 'fadel@gmail.com', '$2b$10$ysq.xYMzVf2GpoJTftyaRevB/8D2eGy6zsHu47VPhO92hwuJgBl8y', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_category`
--
ALTER TABLE `tb_category`
  ADD PRIMARY KEY (`id_category`);

--
-- Indexes for table `tb_history`
--
ALTER TABLE `tb_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_product` (`id_product`);

--
-- Indexes for table `tb_product`
--
ALTER TABLE `tb_product`
  ADD PRIMARY KEY (`id_product`),
  ADD KEY `FK_category` (`id_category`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_category`
--
ALTER TABLE `tb_category`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tb_history`
--
ALTER TABLE `tb_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `tb_product`
--
ALTER TABLE `tb_product`
  MODIFY `id_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_history`
--
ALTER TABLE `tb_history`
  ADD CONSTRAINT `FK_product` FOREIGN KEY (`id_product`) REFERENCES `tb_product` (`id_product`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tb_product`
--
ALTER TABLE `tb_product`
  ADD CONSTRAINT `FK_category` FOREIGN KEY (`id_category`) REFERENCES `tb_category` (`id_category`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
