<?php
session_start();
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $product_id = $_POST['product_id'];
    $quantity = (int) $_POST['quantity'];

    // Verificar stock
    $stmt = $pdo->prepare("SELECT stock FROM products WHERE id = ?");
    $stmt->execute([$product_id]);
    $stock = $stmt->fetchColumn();

    if ($quantity > $stock) {
        die("No hay suficiente stock para este producto.");
    }

    // Actualizar carrito
    if (isset($_SESSION['cart'][$product_id])) {
        $_SESSION['cart'][$product_id] += $quantity;
    } else {
        $_SESSION['cart'][$product_id] = $quantity;
    }

    header("Location: index.php");
    exit();
}
?>