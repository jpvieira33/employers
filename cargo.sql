CREATE TABLE `cargo` (
  `id` int NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

INSERT INTO cargo (id,nome) VALUES
	 (1,'Analista'),
	 (2,'Desenvolvedor'),
	 (3,'Tester');
