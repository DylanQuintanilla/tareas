<?php
session_start();
require 'db.php';

if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

foreach ($_SESSION['cart'] as $product_id => $quantity) {
    if ($product_id <= 0) {
        unset($_SESSION['cart'][$product_id]);
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $product_id = $_POST['product_id'];

    if (isset($_POST['remove'])) {
        unset($_SESSION['cart'][$product_id]);
    } elseif (isset($_POST['increase'])) {
        $_SESSION['cart'][$product_id]++;
    } elseif (isset($_POST['decrease'])) {
        if ($_SESSION['cart'][$product_id] > 1) {
            $_SESSION['cart'][$product_id]--;
        }
    }

    header("Location: cart.php");
    exit();
}

$total = 0;
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Carrito de Compras</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7" crossorigin="anonymous">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h1 class="mb-4">Carrito de Compras</h1>

        <?php if (empty($_SESSION['cart'])): ?>
            <div class="text-center my-5">
                <p class="mb-4">Tu carrito está vacío.</p>
                <a href="index.php" class="btn btn-primary">Volver a la tienda</a>
            </div>
        <?php else: ?>
            <div class="card shadow-sm mb-4">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Unidades</th>
                                <th>Total</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($_SESSION['cart'] as $product_id => $quantity): 
                                $url = "http://localhost/desafioPractico2/api/obtener_producto/{$product_id}";
                                $client = curl_init($url);
                                curl_setopt($client, CURLOPT_RETURNTRANSFER, true);
                                $response = curl_exec($client);
                                $product_data = json_decode($response, true);

                                if (json_last_error() !== JSON_ERROR_NONE || empty($product_data) || isset($product_data['error'])) {
                                    echo "<tr><td colspan='5'>Error al obtener datos del producto (ID: $product_id).</td></tr>";
                                    continue;
                                }

                                $product_total = $product_data['price'] * $quantity;
                                $total += $product_total;
                            ?>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <img src="<?= htmlspecialchars($product_data['image_url']) ?>" alt="<?= htmlspecialchars($product_data['name']) ?>" class="img-thumbnail me-3" style="width: 50px; height: 50px; object-fit: cover;">
                                            <span><?= htmlspecialchars($product_data['name']) ?></span>
                                        </div>
                                    </td>
                                    <td>$<?= number_format((float)$product_data['price'], 2) ?></td>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <form action="cart.php" method="post" class="d-inline">
                                                <input type="hidden" name="product_id" value="<?= $product_id ?>">
                                                <button type="submit" name="decrease" class="btn btn-sm btn-outline-secondary" <?= $quantity <= 1 ? 'disabled' : '' ?>>-</button>
                                            </form>
                                            
                                            <span class="mx-2"><?= (int)$quantity ?></span>
                                            
                                            <form action="cart.php" method="post" class="d-inline">
                                                <input type="hidden" name="product_id" value="<?= $product_id ?>">
                                                <button type="submit" name="increase" class="btn btn-sm btn-outline-secondary" <?= $quantity >= $product_data['stock'] ? 'disabled' : '' ?>>+</button>
                                            </form>
                                        </div>
                                    </td>
                                    <td>$<?= number_format((float)$product_total, 2) ?></td>
                                    <td>
                                        <form action="cart.php" method="post">
                                            <input type="hidden" name="product_id" value="<?= $product_id ?>">
                                            <button type="submit" name="remove" class="btn btn-sm text-danger">
                                                <i class="bi bi-trash"></i>
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="3" class="text-end fw-bold">Total:</td>
                                <td class="fw-bold">$<?= number_format((float)$total, 2) ?></td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            
            <div class="d-flex justify-content-between">
                <a href="index.php" class="btn btn-outline-primary">Seguir comprando</a>
                <a href="checkout.php" class="btn btn-primary">Proceder al pago</a>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>