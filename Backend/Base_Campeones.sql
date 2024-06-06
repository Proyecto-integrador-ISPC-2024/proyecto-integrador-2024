-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: campeones
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
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add formas de pago',6,'add_formasdepago'),(22,'Can change formas de pago',6,'change_formasdepago'),(23,'Can delete formas de pago',6,'delete_formasdepago'),(24,'Can view formas de pago',6,'view_formasdepago'),(25,'Can add productos',7,'add_productos'),(26,'Can change productos',7,'change_productos'),(27,'Can delete productos',7,'delete_productos'),(28,'Can view productos',7,'view_productos'),(29,'Can add talles',8,'add_talles'),(30,'Can change talles',8,'change_talles'),(31,'Can delete talles',8,'delete_talles'),(32,'Can view talles',8,'view_talles'),(33,'Can add tarjetas',9,'add_tarjetas'),(34,'Can change tarjetas',9,'change_tarjetas'),(35,'Can delete tarjetas',9,'delete_tarjetas'),(36,'Can view tarjetas',9,'view_tarjetas'),(37,'Can add productos talles',10,'add_productostalles'),(38,'Can change productos talles',10,'change_productostalles'),(39,'Can delete productos talles',10,'delete_productostalles'),(40,'Can view productos talles',10,'view_productostalles'),(41,'Can add pedidos',11,'add_pedidos'),(42,'Can change pedidos',11,'change_pedidos'),(43,'Can delete pedidos',11,'delete_pedidos'),(44,'Can view pedidos',11,'view_pedidos'),(45,'Can add formas depago pedidos',12,'add_formasdepagopedidos'),(46,'Can change formas depago pedidos',12,'change_formasdepagopedidos'),(47,'Can delete formas depago pedidos',12,'delete_formasdepagopedidos'),(48,'Can view formas depago pedidos',12,'view_formasdepagopedidos'),(49,'Can add detalles pedido',13,'add_detallespedido'),(50,'Can change detalles pedido',13,'change_detallespedido'),(51,'Can delete detalles pedido',13,'delete_detallespedido'),(52,'Can view detalles pedido',13,'view_detallespedido'),(53,'Can add usuarios',14,'add_usuarios'),(54,'Can change usuarios',14,'change_usuarios'),(55,'Can delete usuarios',14,'delete_usuarios'),(56,'Can view usuarios',14,'view_usuarios');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalles_pedido`
--

DROP TABLE IF EXISTS `detalles_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalles_pedido` (
  `ID_detalle` int NOT NULL AUTO_INCREMENT,
  `Cantidad` int NOT NULL,
  `Subtotal` double NOT NULL,
  `ID_pedido` int NOT NULL,
  `ID_producto` int NOT NULL,
  `ID_talle` int NOT NULL,
  PRIMARY KEY (`ID_detalle`),
  KEY `detalles_pedido_ID_pedido_1c370254_fk_pedidos_ID_pedido` (`ID_pedido`),
  KEY `detalles_pedido_ID_producto_1036b86b_fk_productos_ID_Producto` (`ID_producto`),
  KEY `detalles_pedido_ID_talle_f1d2ddf4_fk_talles_ID_talle` (`ID_talle`),
  CONSTRAINT `detalles_pedido_ID_pedido_1c370254_fk_pedidos_ID_pedido` FOREIGN KEY (`ID_pedido`) REFERENCES `pedidos` (`ID_pedido`),
  CONSTRAINT `detalles_pedido_ID_producto_1036b86b_fk_productos_ID_Producto` FOREIGN KEY (`ID_producto`) REFERENCES `productos` (`ID_Producto`),
  CONSTRAINT `detalles_pedido_ID_talle_f1d2ddf4_fk_talles_ID_talle` FOREIGN KEY (`ID_talle`) REFERENCES `talles` (`ID_talle`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalles_pedido`
--

LOCK TABLES `detalles_pedido` WRITE;
/*!40000 ALTER TABLE `detalles_pedido` DISABLE KEYS */;
INSERT INTO `detalles_pedido` VALUES (1,1,25000,1,1,4),(2,2,50000,2,1,5),(3,1,25000,8,1,4),(4,1,25000,9,1,4),(5,2,50000,10,1,5);
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
  KEY `django_admin_log_user_id_c564eba6_fk_usuarios_id_usuario` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_usuarios_id_usuario` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id_usuario`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2024-05-31 03:07:26.482343','1','ID: 1, TALLE: XS',1,'[{\"added\": {}}]',8,1),(2,'2024-05-31 03:07:37.842354','2','ID: 2, TALLE: S',1,'[{\"added\": {}}]',8,1),(3,'2024-05-31 03:07:45.810281','3','ID: 3, TALLE: M',1,'[{\"added\": {}}]',8,1),(4,'2024-05-31 03:07:57.210921','4','ID: 4, TALLE: M',1,'[{\"added\": {}}]',8,1),(5,'2024-05-31 03:08:18.484568','4','ID: 4, TALLE: L',2,'[{\"changed\": {\"fields\": [\"Talle\"]}}]',8,1),(6,'2024-05-31 03:08:25.967669','5','ID: 5, TALLE: XL',1,'[{\"added\": {}}]',8,1),(7,'2024-05-31 03:11:06.092394','1','ID: 1, ID_PRODUCTO: 1,NOMBRE DEL PRODUCTO:1930 Uruguay Titular TALLE: XS, STOCK: 100',1,'[{\"added\": {}}]',10,1),(8,'2024-05-31 03:11:23.836279','2','ID: 2, ID_PRODUCTO: 1,NOMBRE DEL PRODUCTO:1930 Uruguay Titular TALLE: S, STOCK: 100',1,'[{\"added\": {}}]',10,1),(9,'2024-05-31 03:11:41.727355','3','ID: 3, ID_PRODUCTO: 1,NOMBRE DEL PRODUCTO:1930 Uruguay Titular TALLE: M, STOCK: 100',1,'[{\"added\": {}}]',10,1),(10,'2024-05-31 03:16:10.201294','4','ID: 4, ID_PRODUCTO: 1,NOMBRE DEL PRODUCTO:1930 Uruguay Titular TALLE: L, STOCK: 100',1,'[{\"added\": {}}]',10,1),(11,'2024-05-31 03:16:19.923264','5','ID: 5, ID_PRODUCTO: 1,NOMBRE DEL PRODUCTO:1930 Uruguay Titular TALLE: XL, STOCK: 100',1,'[{\"added\": {}}]',10,1),(12,'2024-05-31 03:34:11.093893','1','ID: 1, NOMBRE: Visa',1,'[{\"added\": {}}]',9,1),(13,'2024-05-31 03:34:36.036239','2','ID: 2, NOMBRE: Mastercard',1,'[{\"added\": {}}]',9,1),(14,'2024-05-31 03:34:55.065785','3','ID: 3, NOMBRE: American Express',1,'[{\"added\": {}}]',9,1),(15,'2024-05-31 03:35:17.180014','4','ID: 4, NOMBRE: Naranja X',1,'[{\"added\": {}}]',9,1),(16,'2024-05-31 10:22:36.108966','39','Producto ID: 39, Nombre del producto: ejemplo, Precio: 12234.0,Imagen: ',3,'',7,1),(17,'2024-05-31 10:22:57.125322','38','Producto ID: 38, Nombre del producto: ejemplo, Precio: 12234.0,Imagen: ',3,'',7,1),(18,'2024-05-31 10:23:49.367448','1','ID: 1, ID_PRODUCTO: 1,NOMBRE DEL PRODUCTO:1930 Uruguay Titular TALLE: XS, STOCK: 0',2,'[{\"changed\": {\"fields\": [\"Stock\"]}}]',10,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'contenttypes','contenttype'),(5,'sessions','session'),(14,'users','usuarios'),(13,'web','detallespedido'),(6,'web','formasdepago'),(12,'web','formasdepagopedidos'),(11,'web','pedidos'),(7,'web','productos'),(10,'web','productostalles'),(8,'web','talles'),(9,'web','tarjetas');
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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2024-05-30 23:23:07.139214'),(2,'contenttypes','0002_remove_content_type_name','2024-05-30 23:23:07.194330'),(3,'auth','0001_initial','2024-05-30 23:23:07.383610'),(4,'auth','0002_alter_permission_name_max_length','2024-05-30 23:23:07.425271'),(5,'auth','0003_alter_user_email_max_length','2024-05-30 23:23:07.432424'),(6,'auth','0004_alter_user_username_opts','2024-05-30 23:23:07.438802'),(7,'auth','0005_alter_user_last_login_null','2024-05-30 23:23:07.445461'),(8,'auth','0006_require_contenttypes_0002','2024-05-30 23:23:07.449521'),(9,'auth','0007_alter_validators_add_error_messages','2024-05-30 23:23:07.455680'),(10,'auth','0008_alter_user_username_max_length','2024-05-30 23:23:07.464972'),(11,'auth','0009_alter_user_last_name_max_length','2024-05-30 23:23:07.470972'),(12,'auth','0010_alter_group_name_max_length','2024-05-30 23:23:07.489925'),(13,'auth','0011_update_proxy_permissions','2024-05-30 23:23:07.500125'),(14,'auth','0012_alter_user_first_name_max_length','2024-05-30 23:23:07.507135'),(15,'users','0001_initial','2024-05-30 23:23:07.762584'),(16,'admin','0001_initial','2024-05-30 23:23:07.883817'),(17,'admin','0002_logentry_remove_auto_add','2024-05-30 23:23:07.889330'),(18,'admin','0003_logentry_add_action_flag_choices','2024-05-30 23:23:07.898669'),(19,'sessions','0001_initial','2024-05-30 23:23:07.940891'),(20,'web','0001_initial','2024-05-30 23:23:08.464469'),(21,'web','0002_alter_productostalles_productos','2024-05-31 09:11:57.752950'),(22,'web','0003_rename_productos_productostalles_id_producto_and_more','2024-05-31 22:29:40.285866'),(23,'web','0004_alter_productostalles_id_producto','2024-06-01 01:25:14.486008'),(24,'web','0005_rename_pedidos_detallespedido_id_pedido_and_more','2024-06-02 09:02:32.388281'),(25,'web','0006_alter_detallespedido_id_pedido_and_more','2024-06-03 16:04:15.625220');
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
INSERT INTO `django_session` VALUES ('gv5wuz47mgt1mobyx7xpd4ykqk1ctvl6','.eJxVjEEOwiAQRe_C2hBgoKBL9z0DGWaoVA0kpV0Z765NutDtf-_9l4i4rSVuPS9xZnERWpx-t4T0yHUHfMd6a5JaXZc5yV2RB-1ybJyf18P9OyjYy7cmyAOBDkhaW49sMkIKZxMMAgJNOpF1VjmvzcAWrVKMKjGDmdB568T7A-ctN9M:1sCp86:eMY1qfBn-nNxUfGUvVoBbbtwPKL7_-Me3GD53tws-X0','2024-06-13 23:24:18.000776'),('mx63ojqymv6xybl2ldoz2gh0zg29mwd8','.eJxVjEEOwiAQRe_C2hBgoKBL9z0DGWaoVA0kpV0Z765NutDtf-_9l4i4rSVuPS9xZnERWpx-t4T0yHUHfMd6a5JaXZc5yV2RB-1ybJyf18P9OyjYy7cmyAOBDkhaW49sMkIKZxMMAgJNOpF1VjmvzcAWrVKMKjGDmdB568T7A-ctN9M:1sCsbU:fl0YIo0KiFgMFuSOBgH8NlJZtRbNizQI61I3V4DrU7M','2024-06-14 03:06:52.102480');
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
INSERT INTO `formas_de_pago` VALUES (1,'Transferencia'),(2,'Debito'),(3,'Credito');
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
  `ID_forma_de_pago` int NOT NULL,
  `ID_pedido` int NOT NULL,
  `ID_tarjeta` int DEFAULT NULL,
  PRIMARY KEY (`ID_Forma_depago_Pedidos`),
  KEY `formas_depago_pedido_ID_forma_de_pago_85580cd3_fk_formas_de` (`ID_forma_de_pago`),
  KEY `formas_depago_pedidos_ID_pedido_ffd03ccc_fk_pedidos_ID_pedido` (`ID_pedido`),
  KEY `formas_depago_pedidos_ID_tarjeta_fb9963d1_fk_tarjetas_ID_Tarjeta` (`ID_tarjeta`),
  CONSTRAINT `formas_depago_pedido_ID_forma_de_pago_85580cd3_fk_formas_de` FOREIGN KEY (`ID_forma_de_pago`) REFERENCES `formas_de_pago` (`ID_Forma_de_pago`),
  CONSTRAINT `formas_depago_pedidos_ID_pedido_ffd03ccc_fk_pedidos_ID_pedido` FOREIGN KEY (`ID_pedido`) REFERENCES `pedidos` (`ID_pedido`),
  CONSTRAINT `formas_depago_pedidos_ID_tarjeta_fb9963d1_fk_tarjetas_ID_Tarjeta` FOREIGN KEY (`ID_tarjeta`) REFERENCES `tarjetas` (`ID_Tarjeta`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formas_depago_pedidos`
--

LOCK TABLES `formas_depago_pedidos` WRITE;
/*!40000 ALTER TABLE `formas_depago_pedidos` DISABLE KEYS */;
INSERT INTO `formas_depago_pedidos` VALUES (1,1,1,NULL),(2,3,2,3),(3,1,8,NULL),(4,1,9,NULL),(5,1,10,NULL);
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
  `Total` double NOT NULL,
  `Estado` varchar(9) NOT NULL,
  `ID_usuario` int NOT NULL,
  PRIMARY KEY (`ID_pedido`),
  KEY `pedidos_ID_usuario_57dafa54_fk_usuarios_id_usuario` (`ID_usuario`),
  CONSTRAINT `pedidos_ID_usuario_57dafa54_fk_usuarios_id_usuario` FOREIGN KEY (`ID_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (1,'2024-05-28',25000,'CANCELADO',1),(2,'2024-05-28',50000,'ACEPTADO',1),(8,'2024-06-05',25000,'ACEPTADO',1),(9,'2024-06-05',25000,'ACEPTADO',1),(10,'2024-06-05',50000,'CANCELADO',1);
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
  `Precio` double NOT NULL,
  `Imagen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID_Producto`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'1930 Uruguay Titular',25000,'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076546/tienda-de-campeones/uruguay/Uruguay-1930-Primera_wjjc0z.webp'),(2,'1934 Italia Titular',25000,'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076437/tienda-de-campeones/italy/Italia-1934-Primera_wktiv4.webp'),(3,'1938 Italia Suplente',30000,'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076439/tienda-de-campeones/italy/Italia-1938-Segunda_g2ywc2.webp'),(4,'1950 Uruguay Titular',25000,'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076548/tienda-de-campeones/uruguay/Uruguay-1950-Primera_sacfhk.webp'),(5,'1954 Alemania Titular',30000,'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076399/tienda-de-campeones/germany/Alemania-1954-primera_deols9.webp'),(6,'1954 Alemania Suplente',20000,'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076401/tienda-de-campeones/germany/Alemania-1954-segunda_oatm0i.webp'),(7,'1958 Brazil Titular',30000,'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076290/tienda-de-campeones/brazil/Brasil-1958-primera_g7lr6l.webp'),(8,'1962 Brazil Titular',30000,'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076291/tienda-de-campeones/brazil/Brasil-1962-primera_d3himb.webp'),(9,'1966 Inglaterra Titular',30000,'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076344/tienda-de-campeones/england/Inglaterra-1968-Primera_pon8eg.webp'),(10,'1966 Inglaterra Suplente',25000,'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076344/tienda-de-campeones/england/Inglaterra-1966-Segunda_i0pwna.webp'),(11,'1970 Brazil Titular',30000,'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076293/tienda-de-campeones/brazil/Brasil-1970-primera_xpmnsi.webp'),(12,'1970 Brazil Suplente',25000,'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076296/tienda-de-campeones/brazil/Brasil-1970-segunda_soddid.webp'),(13,'1974 Alemania Titular',30000,'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076402/tienda-de-campeones/germany/Alemania-1974-primera_fypnc6.webp'),(14,'1974 Alemania Suplente',25000,'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076404/tienda-de-campeones/germany/Alemania-1974-segunda_r3wahp.webp'),(15,'1978 Argentina Titular',35000,'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076237/tienda-de-campeones/argentina/Argentina-1978-primera_cyaewt.webp'),(16,'1978 Argentina Suplente',30000,'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076238/tienda-de-campeones/argentina/Argentina-1978-segunda_ehtywr.webp'),(17,'1982 Italia Titular',30000,'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076441/tienda-de-campeones/italy/Italia-1982-Primera_jywdi3.webp'),(18,'1982 Italia Suplente',25000,'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076443/tienda-de-campeones/italy/Italia-1982-Segunda_plalym.webp'),(19,'1986 Argentina Titular',35000,'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076239/tienda-de-campeones/argentina/Argentina-1986-primera_qhimxk.webp'),(20,'1986 Argentina Suplente',30000,'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076239/tienda-de-campeones/argentina/Argentina-1986-segunda_obwyax.webp'),(23,'1994 Brazil Titular',30000,'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076299/tienda-de-campeones/brazil/Brasil-1994-primera_jzmckh.webp'),(24,'1994 Brazil Suplente',20000,'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076304/tienda-de-campeones/brazil/Brasil-1994-segunda_ypahip.webp'),(25,'1998 Francia Titular',30000,'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076366/tienda-de-campeones/france/Francia-1998-primera_ygyavf.webp'),(26,'1998 Francia Suplente',20000,'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076371/tienda-de-campeones/france/Francia-1998-segunda_pqqsit.webp'),(27,'2002 Brazil Titular',30000,'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076301/tienda-de-campeones/brazil/Brasil-2002-primera_b9hdli.webp'),(28,'2002 Brazil Suplente',20000,'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076305/tienda-de-campeones/brazil/Brasil-2002-segunda_gczeza.webp'),(29,'2006 Italia Titular',30000,'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076445/tienda-de-campeones/italy/Italia-2006-Primera_dc6vuf.webp'),(30,'2006 Italia Suplente',20000,'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076449/tienda-de-campeones/italy/Italia-2006-Segunda_yere4v.webp'),(31,'2010 España Titular',30000,'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076497/tienda-de-campeones/spain/Espa%C3%B1a-2010-primera_dcexdq.webp'),(32,'2010 España Suplente',20000,'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076499/tienda-de-campeones/spain/Espa%C3%B1a-2010-segunda_y15col.webp'),(33,'2014 Alemania Titular',30000,'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076409/tienda-de-campeones/germany/Alemania-2014-primera_jppxzj.webp'),(34,'2014 Alemania Suplente',20000,'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076410/tienda-de-campeones/germany/Alemania-2014-segunda_ae70fz.webp'),(37,'2022 Argentina Titular',40000,'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076239/tienda-de-campeones/argentina/Argentina-2021-Primera_txaoeb.webp');
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
  `Stock` int NOT NULL,
  `ID_producto` int NOT NULL,
  `ID_talle` int NOT NULL,
  PRIMARY KEY (`ID_producto_talle`),
  KEY `productos_talles_ID_producto_502c0260_fk_productos_ID_Producto` (`ID_producto`),
  KEY `productos_talles_ID_talle_7f6e9245_fk_talles_ID_talle` (`ID_talle`),
  CONSTRAINT `productos_talles_ID_producto_502c0260_fk_productos_ID_Producto` FOREIGN KEY (`ID_producto`) REFERENCES `productos` (`ID_Producto`),
  CONSTRAINT `productos_talles_ID_talle_7f6e9245_fk_talles_ID_talle` FOREIGN KEY (`ID_talle`) REFERENCES `talles` (`ID_talle`),
  CONSTRAINT `valor_positivo` CHECK ((`Stock` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=196 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_talles`
--

LOCK TABLES `productos_talles` WRITE;
/*!40000 ALTER TABLE `productos_talles` DISABLE KEYS */;
INSERT INTO `productos_talles` VALUES (4,38,1,4),(5,102,1,5),(8,60,2,3),(9,70,2,4),(10,100,2,5),(13,57,3,3),(14,50,3,4),(15,60,3,5),(18,50,4,3),(19,50,4,4),(20,60,4,5),(23,60,5,3),(24,58,5,4),(25,50,5,5),(28,80,6,3),(29,80,6,4),(30,45,6,5),(33,40,7,3),(34,90,7,4),(35,60,7,5),(38,55,8,3),(39,55,8,4),(40,60,8,5),(43,68,9,3),(44,72,9,4),(45,60,9,5),(48,80,10,3),(49,69,10,4),(50,60,10,5),(53,70,11,3),(54,60,11,4),(55,80,11,5),(58,90,12,3),(59,45,12,4),(60,50,12,5),(63,90,13,3),(64,90,13,4),(65,100,13,5),(68,90,14,3),(69,75,14,4),(70,90,14,5),(73,80,15,3),(74,80,15,4),(75,80,15,5),(78,80,16,3),(79,90,16,4),(80,90,16,5),(83,60,17,3),(84,80,17,4),(85,80,17,5),(88,66,18,3),(89,50,18,4),(90,70,18,5),(93,60,19,3),(94,60,19,4),(95,70,19,5),(98,50,20,3),(99,60,20,4),(100,60,20,5),(113,80,23,3),(114,60,23,4),(115,70,23,5),(118,70,24,3),(119,90,24,4),(120,70,24,5),(123,50,25,3),(124,60,25,4),(125,60,25,5),(128,60,26,3),(129,70,26,4),(130,60,26,5),(133,60,27,3),(134,50,27,4),(135,90,27,5),(138,50,28,3),(139,60,28,4),(140,78,28,5),(143,68,29,3),(144,60,29,4),(145,70,29,5),(148,50,30,3),(149,60,30,4),(150,90,30,5),(153,60,31,3),(154,60,31,4),(155,73,31,5),(158,50,32,3),(159,80,32,4),(160,70,32,5),(163,60,33,3),(164,60,33,4),(165,80,33,5),(168,60,34,3),(169,100,34,4),(170,60,34,5),(183,60,37,3),(184,60,37,4),(185,70,37,5);
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
  PRIMARY KEY (`ID_talle`),
  UNIQUE KEY `Talle_UNIQUE` (`Talle`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `talles`
--

LOCK TABLES `talles` WRITE;
/*!40000 ALTER TABLE `talles` DISABLE KEYS */;
INSERT INTO `talles` VALUES (4,'L'),(3,'M'),(5,'XL');
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
  UNIQUE KEY `Nombre_tarjeta` (`Nombre_tarjeta`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarjetas`
--

LOCK TABLES `tarjetas` WRITE;
/*!40000 ALTER TABLE `tarjetas` DISABLE KEYS */;
INSERT INTO `tarjetas` VALUES (3,'American Express'),(2,'Mastercard'),(4,'Naranja X'),(1,'Visa');
/*!40000 ALTER TABLE `tarjetas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `domicilio` varchar(150) NOT NULL,
  `rol` varchar(7) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES ('pbkdf2_sha256$600000$tV6mEygbarf544sBZYM47T$2b9GzF9EkZpkNNKtuTinR93sa7GVRvKF1+Y7eqggDF8=','2024-05-31 03:06:52.098896',1,1,'gustavo','toscano','gustavo@gmail.com','','',1,1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_groups`
--

DROP TABLE IF EXISTS `usuarios_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `usuarios_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuarios_groups_usuarios_id_group_id_d3682510_uniq` (`usuarios_id`,`group_id`),
  KEY `usuarios_groups_group_id_18c61092_fk_auth_group_id` (`group_id`),
  CONSTRAINT `usuarios_groups_group_id_18c61092_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `usuarios_groups_usuarios_id_a9fa29e6_fk_usuarios_id_usuario` FOREIGN KEY (`usuarios_id`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_groups`
--

LOCK TABLES `usuarios_groups` WRITE;
/*!40000 ALTER TABLE `usuarios_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_user_permissions`
--

DROP TABLE IF EXISTS `usuarios_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `usuarios_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuarios_user_permission_usuarios_id_permission_i_0cd0bc89_uniq` (`usuarios_id`,`permission_id`),
  KEY `usuarios_user_permis_permission_id_af615ca1_fk_auth_perm` (`permission_id`),
  CONSTRAINT `usuarios_user_permis_permission_id_af615ca1_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `usuarios_user_permis_usuarios_id_cdb60ce9_fk_usuarios_` FOREIGN KEY (`usuarios_id`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_user_permissions`
--

LOCK TABLES `usuarios_user_permissions` WRITE;
/*!40000 ALTER TABLE `usuarios_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-05 21:30:45
