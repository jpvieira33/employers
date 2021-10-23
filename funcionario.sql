CREATE TABLE `funcionarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(300) DEFAULT NULL,
  `sobrenome` varchar(300) DEFAULT NULL,
  `nascimento` date DEFAULT NULL,
  `salario` decimal(10,2) DEFAULT NULL,
  `cargo_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cargo_idx` (`cargo_id`),
  CONSTRAINT `fk_cargo` FOREIGN KEY (`cargo_id`) REFERENCES `cargo` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
