<?php
require '../../model/Cliente.php';
header('Content-Type: application/json; charset=UTF-8');

$metodo = $_SERVER['REQUEST_METHOD'];
$tipo = $_REQUEST['tipo'];

try {
    $mensaje = "";
    $codigo = 0;

    switch ($metodo) {
        case 'POST':
            if ($tipo === '1') {
                $Cliente = new Cliente($_POST);
                $ejecucion = $Cliente->guardar();
                $mensaje = "Cliente Guardado correctamente";
                $codigo = 1;
            } elseif ($tipo === "2") {
                $Cliente = new Cliente($_POST);
                $ejecucion = $Cliente->modificar();
                $mensaje = "Cliente Modificado correctamente";
                $codigo = 2;
            } elseif ($tipo === "3") {
                $Cliente = new Cliente($_POST);
                $ejecucion = $Cliente->eliminar();
                $mensaje = "Cliente Eliminado correctamente";
                $codigo = 3;
            } else {
                $mensaje = 'Tipo No encontrado';
                $codigo = 5;
            }
            break;

        case 'GET':
            $Cliente = new Cliente($_GET);
            $Clientes = $Cliente->buscar();
            echo json_encode($Clientes);
            exit;

        default:
            http_response_code(405);
            $mensaje = "Método no permitido";
            $codigo = 9;
            break;
    }

    echo json_encode([
        "mensaje" => $mensaje,
        "codigo" => $codigo
    ]);
} catch (Exception $e) {
    echo json_encode([
        "detalle" => $e->getMessage(),
        "mensaje" => "Error de ejecución",
        "codigo" => 0,
    ]);
}

exit;
