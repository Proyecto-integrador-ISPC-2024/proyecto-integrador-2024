-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: campeones_del_mundo
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$600000$KZy6xQ6I2DuAdpmS6EQZPZ$EMWiadb+zsGzuhE1vBwFfh/XF5cM4GOMivHkzfkjwJE=','2024-05-12 01:39:03.390106',1,'gustavo','','','gustavo@gmail.com',1,1,'2024-05-12 01:38:35.544410');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalles_pedido`
--

DROP TABLE IF EXISTS `detalles_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalles_pedido` (
  `ID_detalle` int NOT NULL AUTO_INCREMENT,
  `ID_pedido` int NOT NULL,
  `ID_producto` int NOT NULL,
  `ID_talle` int NOT NULL,
  `Cantidad` int NOT NULL,
  `Subtotal` float NOT NULL,
  PRIMARY KEY (`ID_detalle`),
  KEY `ID_producto_idx` (`ID_producto`),
  KEY `ID_pedido_idx` (`ID_pedido`),
  KEY `id_talle_idx` (`ID_talle`),
  CONSTRAINT `ID_pedido` FOREIGN KEY (`ID_pedido`) REFERENCES `pedidos` (`ID_pedido`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ID_producto` FOREIGN KEY (`ID_producto`) REFERENCES `productos` (`ID_Producto`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `talle_id` FOREIGN KEY (`ID_talle`) REFERENCES `talles` (`ID_talle`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalles_pedido`
--

LOCK TABLES `detalles_pedido` WRITE;
/*!40000 ALTER TABLE `detalles_pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalles_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(6,'sessions','session'),(8,'web','detallespedido'),(7,'web','pedidos');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-05-12 01:38:01.208544'),(2,'auth','0001_initial','2024-05-12 01:38:01.679134'),(3,'admin','0001_initial','2024-05-12 01:38:01.793794'),(4,'admin','0002_logentry_remove_auto_add','2024-05-12 01:38:01.799796'),(5,'admin','0003_logentry_add_action_flag_choices','2024-05-12 01:38:01.807823'),(6,'contenttypes','0002_remove_content_type_name','2024-05-12 01:38:01.883441'),(7,'auth','0002_alter_permission_name_max_length','2024-05-12 01:38:01.944372'),(8,'auth','0003_alter_user_email_max_length','2024-05-12 01:38:01.969848'),(9,'auth','0004_alter_user_username_opts','2024-05-12 01:38:01.979105'),(10,'auth','0005_alter_user_last_login_null','2024-05-12 01:38:02.026133'),(11,'auth','0006_require_contenttypes_0002','2024-05-12 01:38:02.030545'),(12,'auth','0007_alter_validators_add_error_messages','2024-05-12 01:38:02.037616'),(13,'auth','0008_alter_user_username_max_length','2024-05-12 01:38:02.104591'),(14,'auth','0009_alter_user_last_name_max_length','2024-05-12 01:38:02.150818'),(15,'auth','0010_alter_group_name_max_length','2024-05-12 01:38:02.169388'),(16,'auth','0011_update_proxy_permissions','2024-05-12 01:38:02.176561'),(17,'auth','0012_alter_user_first_name_max_length','2024-05-12 01:38:02.230436'),(18,'sessions','0001_initial','2024-05-12 01:38:02.266042');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('u16gor0zc0m3gvdsth0hy0v9hcs8r7y1','.eJxVjEEOwiAQRe_C2pChZSy4dN8zkGGGStVAUtqV8e7apAvd_vfef6lA25rD1tISZlEXZdTpd4vEj1R2IHcqt6q5lnWZo94VfdCmxyrpeT3cv4NMLX9rEAsSpxSFEdh6cHg2g-0cSDJIib0Mthdig85Z3wM6gxMx9146QFbvD-mjN8g:1s5yB5:PTA8Wg_I297o7MEQWofgNSV5Wju3c5sp1xpY3r9WTj4','2024-05-26 01:39:03.393410');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formas_de_pago`
--

DROP TABLE IF EXISTS `formas_de_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formas_de_pago` (
  `ID_Forma_de_pago` int NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(150) NOT NULL,
  PRIMARY KEY (`ID_Forma_de_pago`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formas_de_pago`
--

LOCK TABLES `formas_de_pago` WRITE;
/*!40000 ALTER TABLE `formas_de_pago` DISABLE KEYS */;
INSERT INTO `formas_de_pago` VALUES (1,'Transferencia'),(2,'Debito'),(3,'Tarjeta De Credito');
/*!40000 ALTER TABLE `formas_de_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formas_depago_pedidos`
--

DROP TABLE IF EXISTS `formas_depago_pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formas_depago_pedidos` (
  `ID_Forma_depago_Pedidos` int NOT NULL AUTO_INCREMENT,
  `ID_pedido` int NOT NULL,
  `ID_forma_de_pago` int NOT NULL,
  `ID_tarjeta` int DEFAULT NULL,
  PRIMARY KEY (`ID_Forma_depago_Pedidos`),
  KEY `ID_pedido_idx` (`ID_pedido`),
  KEY `ID_forma_de_pago_idx` (`ID_forma_de_pago`),
  KEY `ID_tarjeta_idx` (`ID_tarjeta`),
  CONSTRAINT `FK_ID_forma_de_pago` FOREIGN KEY (`ID_forma_de_pago`) REFERENCES `formas_de_pago` (`ID_Forma_de_pago`),
  CONSTRAINT `FK_ID_pedido` FOREIGN KEY (`ID_pedido`) REFERENCES `pedidos` (`ID_pedido`),
  CONSTRAINT `FK_ID_tarjeta` FOREIGN KEY (`ID_tarjeta`) REFERENCES `tarjetas` (`ID_Tarjeta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formas_depago_pedidos`
--

LOCK TABLES `formas_depago_pedidos` WRITE;
/*!40000 ALTER TABLE `formas_depago_pedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `formas_depago_pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `ID_pedido` int NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `ID_usuario` int NOT NULL,
  `Total` float NOT NULL,
  `Estado` enum('ACEPTADO','CANCELADO') NOT NULL,
  PRIMARY KEY (`ID_pedido`),
  KEY `ID_usuario_idx` (`ID_usuario`),
  CONSTRAINT `ID_usuario` FOREIGN KEY (`ID_usuario`) REFERENCES `usuarios` (`ID_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `ID_Producto` int NOT NULL AUTO_INCREMENT,
  `Nombre_producto` varchar(45) NOT NULL,
  `Precio` float NOT NULL,
  PRIMARY KEY (`ID_Producto`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'1930 Uruguay Titular',25000),(2,'1930 Uruguay Suplente',20000),(3,'1934 Italia Titular',25000),(4,'1934 Italia Suplente',20000),(5,'1938 Italia Titular',30000),(6,'1938 Italia Suplente',20000),(7,'1950 Uruguay Titular',25000),(8,'1950 Uruguay Suplente',20000),(9,'1954 Alemania Titular',30000),(10,'1954 Alemania Suplente',20000),(11,'1958 Brazil Titular',30000),(12,'1958 Brazil Suplente',25000),(13,'1962 Brazil Titular',30000),(14,'1962 Brazil Suplente',25000),(15,'1966 Inglaterra Titular',30000),(16,'1966 Inglaterra Suplente',25000),(17,'1970 Brazil Titular',30000),(18,'1970 Brazil Suplente',25000),(19,'1974 Alemania Titular',30000),(20,'1974 Alemania Suplente',25000),(21,'1978 Argentina Titular',35000),(22,'1978 Argentina Suplente',30000),(23,'1982 Italia Titular',30000),(24,'1982 Italia Suplente',25000),(25,'1986 Argentina Titular',35000),(26,'1986 Argentina Suplente',30000),(27,'1990 Alemania Titular',25000),(28,'1990 Alemania Suplente',20000),(29,'1994 Brazil Titular',30000),(30,'1994 Brazil Suplente',20000),(31,'1998 Francia Titular',30000),(32,'1998 Francia Suplente',20000),(33,'2002 Brazil Titular',30000),(34,'2002 Brazil Suplente',20000),(35,'2006 Italia Titular',30000),(36,'2006 Italia Suplente',20000),(37,'2010 España Titular',30000),(38,'2010 España Suplente',20000),(39,'2014 Alemania Titular',30000),(40,'2014 Alemania Suplente',20000),(41,'2018 Francia Titular',30000),(42,'2018 Francia Suplente',20000),(43,'2022 Argentina Titular',40000),(44,'2022 Argentina Suplente',30000);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos_talles`
--

DROP TABLE IF EXISTS `productos_talles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos_talles` (
  `ID_producto_talle` int NOT NULL AUTO_INCREMENT,
  `ID_producto` int NOT NULL,
  `ID_talle` int NOT NULL,
  `Stock` int NOT NULL,
  PRIMARY KEY (`ID_producto_talle`),
  KEY `ID_talle_idx` (`ID_talle`),
  KEY `producto_ID_idx` (`ID_producto`),
  CONSTRAINT `ID_talle` FOREIGN KEY (`ID_talle`) REFERENCES `talles` (`ID_talle`),
  CONSTRAINT `producto_ID` FOREIGN KEY (`ID_producto`) REFERENCES `productos` (`ID_Producto`)
) ENGINE=InnoDB AUTO_INCREMENT=233 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_talles`
--

LOCK TABLES `productos_talles` WRITE;
/*!40000 ALTER TABLE `productos_talles` DISABLE KEYS */;
INSERT INTO `productos_talles` VALUES (1,1,1,100),(2,1,2,80),(3,1,3,60),(4,1,4,60),(5,1,5,60),(6,1,6,20),(7,2,1,60),(8,2,2,70),(9,2,3,60),(10,2,4,70),(11,2,5,100),(12,3,1,40),(13,3,2,46),(14,3,3,57),(15,3,4,50),(16,3,5,60),(17,4,1,50),(18,4,2,40),(19,4,3,50),(20,4,4,50),(21,4,5,60),(22,4,6,25),(23,5,1,40),(24,5,2,50),(25,5,3,60),(26,5,4,58),(27,5,5,50),(28,5,6,25),(29,6,1,50),(30,6,2,60),(31,6,3,80),(32,6,4,80),(33,6,5,45),(34,7,1,50),(35,7,2,68),(36,7,3,40),(37,7,4,90),(38,7,5,60),(39,8,1,45),(40,8,2,60),(41,8,3,55),(42,8,4,55),(43,8,5,60),(44,9,1,50),(45,9,2,68),(46,9,3,68),(47,9,4,72),(48,9,5,60),(49,9,6,25),(50,10,1,40),(51,10,2,70),(52,10,3,80),(53,10,4,69),(54,10,5,60),(55,11,1,40),(56,11,2,80),(57,11,3,70),(58,11,4,60),(59,11,5,80),(60,12,1,60),(61,12,2,70),(62,12,3,90),(63,12,4,45),(64,12,5,50),(65,13,1,55),(66,13,2,76),(67,13,3,90),(68,13,4,90),(69,13,5,100),(70,13,6,40),(71,14,1,50),(72,14,2,60),(73,14,3,90),(74,14,4,75),(75,14,5,90),(76,15,1,88),(77,15,2,60),(78,15,3,80),(79,15,4,80),(80,15,5,80),(81,16,1,80),(82,16,2,50),(83,16,3,80),(84,16,4,90),(85,16,5,90),(86,17,1,60),(87,17,2,58),(88,17,3,60),(89,17,4,80),(90,17,5,80),(91,17,6,25),(92,18,1,60),(93,18,2,65),(94,18,3,66),(95,18,4,50),(96,18,5,70),(97,19,1,60),(98,19,2,50),(99,19,3,60),(100,19,4,60),(101,19,5,70),(102,20,1,60),(103,20,2,70),(104,20,3,50),(105,20,4,60),(106,20,5,60),(107,21,1,67),(108,21,2,50),(109,21,3,60),(110,21,4,60),(111,21,5,70),(112,21,6,20),(113,22,1,70),(114,22,2,80),(115,22,3,60),(116,22,4,60),(117,22,5,80),(118,23,1,60),(119,23,2,80),(120,23,3,80),(121,23,4,60),(122,23,5,70),(123,24,1,80),(124,24,2,70),(125,24,3,70),(126,24,4,90),(127,24,5,70),(128,25,1,70),(129,25,2,80),(130,25,3,50),(131,25,4,60),(132,25,5,60),(133,26,1,60),(134,26,2,76),(135,26,3,60),(136,26,4,70),(137,26,5,60),(138,27,1,60),(139,27,2,82),(140,27,3,60),(141,27,4,50),(142,27,5,90),(143,28,1,60),(144,28,2,60),(145,28,3,50),(146,28,4,60),(147,28,5,78),(148,29,1,88),(149,29,2,60),(150,29,3,68),(151,29,4,60),(152,29,5,70),(153,29,6,25),(154,30,1,40),(155,30,2,50),(156,30,3,50),(157,30,4,60),(158,30,5,90),(159,31,1,60),(160,31,2,68),(161,31,3,60),(162,31,4,60),(163,31,5,73),(164,32,1,60),(165,32,2,60),(166,32,3,50),(167,32,4,80),(168,32,5,70),(169,33,1,58),(170,33,2,50),(171,33,3,60),(172,33,4,60),(173,33,5,80),(174,34,1,80),(175,34,2,60),(176,34,3,60),(177,34,4,100),(178,34,5,60),(179,35,1,50),(180,35,2,60),(181,35,3,60),(182,35,4,50),(183,35,5,70),(184,35,6,20),(185,36,1,60),(186,36,2,60),(187,36,3,60),(188,36,4,80),(189,36,5,80),(190,37,1,50),(191,37,2,60),(192,37,3,60),(193,37,4,60),(194,37,5,70),(195,38,1,56),(196,38,2,60),(197,38,3,60),(198,38,4,80),(199,38,5,90),(200,39,1,60),(201,39,2,60),(202,39,3,60),(203,39,4,60),(204,39,5,70),(205,40,1,70),(206,40,2,80),(207,40,3,60),(208,40,4,60),(209,40,5,58),(210,41,1,80),(211,41,2,70),(212,41,3,69),(213,41,4,60),(214,41,5,60),(215,42,1,79),(216,42,2,68),(217,42,3,60),(218,42,4,60),(219,42,5,60),(220,42,6,20),(221,43,1,50),(222,43,2,50),(223,43,3,50),(224,43,4,90),(225,43,5,80),(226,43,6,90),(227,44,1,50),(228,44,2,59),(229,44,3,60),(230,44,4,90),(231,44,5,88),(232,44,6,90);
/*!40000 ALTER TABLE `productos_talles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `talles`
--

DROP TABLE IF EXISTS `talles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `talles` (
  `ID_talle` int NOT NULL AUTO_INCREMENT,
  `Talle` varchar(45) NOT NULL,
  PRIMARY KEY (`ID_talle`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `talles`
--

LOCK TABLES `talles` WRITE;
/*!40000 ALTER TABLE `talles` DISABLE KEYS */;
INSERT INTO `talles` VALUES (1,'XS'),(2,'S'),(3,'M'),(4,'L'),(5,'XL'),(6,'XXL');
/*!40000 ALTER TABLE `talles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarjetas`
--

DROP TABLE IF EXISTS `tarjetas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tarjetas` (
  `ID_Tarjeta` int NOT NULL AUTO_INCREMENT,
  `Nombre_tarjeta` varchar(100) NOT NULL,
  PRIMARY KEY (`ID_Tarjeta`),
  UNIQUE KEY `Nombre_tarjeta_UNIQUE` (`Nombre_tarjeta`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarjetas`
--

LOCK TABLES `tarjetas` WRITE;
/*!40000 ALTER TABLE `tarjetas` DISABLE KEYS */;
INSERT INTO `tarjetas` VALUES (3,'American Express'),(2,'Mastercard'),(4,'Pay Pal'),(1,'Visa');
/*!40000 ALTER TABLE `tarjetas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `ID_usuario` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  `Apellido` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Domicilio` varchar(150) NOT NULL,
  `Rol` enum('CLIENTE','ADMIN') NOT NULL,
  `Password` varchar(120) NOT NULL,
  PRIMARY KEY (`ID_usuario`),
  UNIQUE KEY `Email_UNIQUE` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Jose','Perez','joseperez@gmail.com','Chacabuco 200','CLIENTE',''),(4,'Gustavo ','Toscano','gustavotoscano@gmail.com','Rondeau 400','ADMIN','');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-11 23:39:30
