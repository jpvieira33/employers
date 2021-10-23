<?php
  $host = "localhost";
  $user ="root";
  $password = "salmos271";
  $dbname = "desafio";
  $port = "3307";

  $conn = new PDO("mysql:host=$host;port=$port;dbname=" . $dbname, $user, $password);