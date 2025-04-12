<?php
header("Content-Type: application/json");
require_once 'db.php';

if (isset($_GET['opc']) && $_GET['opc'] != "") {
    switch ($_GET['opc']) {
        case "listar_por_categoria":
            $category_id = filter_input(INPUT_GET, 'category_id', FILTER_VALIDATE_INT);
            if (!$category_id) {
                sendResponse(400, ["error" => "ID de categoría inválido"]);
            }
            sendResponse(200, obtenerProductosPorCategoria($pdo, $category_id));
            break;

        case "obtener_producto":
            $product_id = filter_input(INPUT_GET, 'product_id', FILTER_VALIDATE_INT);
            if (!$product_id) {
                sendResponse(400, ["error" => "ID de producto inválido"]);
            }
            sendResponse(200, obtenerProducto($pdo, $product_id));
            break;

        default:
            sendResponse(400, ["error" => "Operación no válida"]);
    }
} else {
    sendResponse(400, ["error" => "No se especificó ninguna operación"]);
}

function sendResponse($status, $data) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

function obtenerProductosPorCategoria($pdo, $category_id) {
    try {
        $stmt = $pdo->prepare("SELECT * FROM products WHERE category_id = ? ORDER BY price ASC");
        $stmt->execute([$category_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC); // Devuelve directamente los datos
    } catch (PDOException $e) {
        return ["error" => "Error interno del servidor: " . $e->getMessage()];
    }
}

function obtenerProducto($pdo, $product_id) {
    try {
        $stmt = $pdo->prepare("SELECT * FROM products WHERE id = ?");
        $stmt->execute([$product_id]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$result) {
            return ["error" => "Producto no encontrado"];
        }
        return $result;
    } catch (PDOException $e) {
        return ["error" => "Error interno del servidor"];
    }
}