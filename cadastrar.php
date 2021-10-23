<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");

require_once "conexao.php";

$resp = file_get_contents("php://input");
$dados = json_decode($resp, true);

if($dados){

    $query = "insert into funcionarios(nome,sobrenome,nascimento, salario, cargo_id ) values(:nome, :sobrenome, :nascimento, :salario, :cargo)";
    $cad_func = $conn->prepare($query);
    $cad_func->bindParam(':nome', $dados['funcionario']['nome']);
    $cad_func->bindParam(':sobrenome', $dados['funcionario']['sobrenome']);
    $cad_func->bindParam(':nascimento', $dados['funcionario']['nascimento']);
    $cad_func->bindParam(':salario', $dados['funcionario']['salario']);
    $cad_func->bindParam(':cargo', $dados['funcionario']['cargo']);

    $cad_func->execute();

    if($cad_func->rowCount()){
          $response = [
        "erro" => false,
        "mensagem" => "Funcionário cadastrado com sucesso!"
    ];

    }else{
        $response = [
        "erro" => true,
        "mensagem" => "Funcionário não foi cadastrado"
    ];

    }
  
}else{
    $response = [
        "erro" => true,
        "mensagem" => "Funcionário não foi cadastrado"
    ];
}

http_response_code(200);
echo json_encode($response);