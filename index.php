<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once "conexao.php";

$query = "select f.*, c.nome as cargo from funcionarios f left join cargo c on f.cargo_id = c.id order by id desc";
$result = $conn->prepare($query);
$result->execute();

if(($result) and ($result->rowCount() != 0)){
    while($row = $result->fetch(PDO::FETCH_ASSOC)){
    extract($row);

        $lista_func['registros'][$id] = [
            'id' => $id,
            'Nome' => $nome,
            'Sobrenome' => $sobrenome,
            'Cargo' => $cargo,
            'Nascimento' => date('d/m/Y', strtotime($nascimento)),
            'Salario' => number_format($salario,2,",",".")
        ];
    }

    http_response_code(200);

    echo json_encode($lista_func);

}