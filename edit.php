<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");

require_once "conexao.php";

$response_json = file_get_contents("php://input");
$dados = json_decode($response_json, true);

$query ="update funcionarios set nome=:nome, sobrenome=:sobrenome, nascimento=:nascimento, salario=:salario, cargo_id=:cargo_id where id=:id";
$result = $conn->prepare($query);
$result->bindParam(':nome', $dados['nome']);
$result->bindParam(':sobrenome', $dados['sobrenome']);
$result->bindParam(':nascimento', $dados['nascimento']);
$result->bindParam(':salario', $dados['salario']);
$result->bindParam(':cargo_id', $dados['cargo_id'], PDO::PARAM_INT);
$result->bindParam(':id', $dados['id'],PDO::PARAM_INT);

$result->execute();

if($result->rowCount()){
    $response = [
    "erro" => false,
    "mensagem" => "Funcionário editado com sucesso!",
];

}else{
$response = [
    "erro" => true,
    "mensagem" => "Não conseguimos editar o funcionário",
];
}

http_response_code(200);
echo json_encode($response);