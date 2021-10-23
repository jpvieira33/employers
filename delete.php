<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");

require_once "conexao.php";

$id = filter_input(INPUT_GET,"id");

$query = "delete from funcionarios where id =:id ";
$result = $conn->prepare($query);
$result->bindParam(":id", $id);
$result->execute();

if($result->execute()){
    $response = [
    "erro" => false,
    "mensagem" => "Funcionário deletado com sucesso!"
    ];

} else {
    $response = [
    "erro" => true,
    "mensagem" => "Erro no delete!"
    ];

}



http_response_code(200);
echo json_encode($response);
