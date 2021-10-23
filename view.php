<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once "conexao.php";

//$id = 4;

$id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_NUMBER_INT);
$response = [];

$query = "select f.*, c.nome as cargo from funcionarios f left join cargo c on f.cargo_id = c.id where f.id=:id limit 1";
$result = $conn->prepare($query);
$result->bindParam(':id', $id, PDO::PARAM_INT);
$result->execute();

if(($result) and ($result->rowCount() != 0)){
    $row = $result->fetch(PDO::FETCH_ASSOC);
    extract($row);

    $funcionario = [
        'id' => $id,
            'Nome' => $nome,
            'Sobrenome' => $sobrenome,
            'Cargo' => $cargo,
            'IdCargo' => $cargo_id,
            'Nascimento' => date('d/m/Y', strtotime($nascimento)),
            'Salario' => number_format($salario,2,",",".")
    ];

    $response = [
        'erro' => false,
        'funcionario' => $funcionario
    ];

}else {
    $response = [
        'erro' => true,
        'mensagem' => 'Funcionário não encontrado!'
    ];
}

http_response_code(200);
echo json_encode($response);