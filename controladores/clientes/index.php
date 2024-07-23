<?php
require '../../model/Cliente.php';
header('Content-Type: application/json; charset=UTF-8');

$metodo = $_SERVER['REQUEST_METHOD'];
$tipo = $_REQUEST['tipo'];


try {
    switch ($metodo) {
        case 'POST':
            $Cliente = new Cliente($_POST);
            switch ($tipo) {
                case '1':

                    $ejecucion = $Cliente->guardar();
                    $mensaje = "Cliente Guardado correctamente";
                    break;

                default:

                    break;
            }
            echo json_encode([
                "mensaje" => $mensaje,
                "codigo" => 1
            ]);
            break;
        case 'GET':
            $Cliente = new Cliente($_GET);
            $Clientes = $Cliente->buscar();
            echo json_encode($Clientes);
            break;

        default:
            http_response_code(405);
            echo json_encode([
                "mensaje" => "Método no permitido",
                "codigo" => 9,
            ]);
            break;
    }
} catch (Exception $e) {
    echo json_encode([
        "detalle" => $e->getMessage(),
        "mensaje" => "Error de ejecución",
        "codigo" => 0,
    ]);
}

exit;