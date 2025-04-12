<?php
session_start();
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $dui = $_POST['dui'];
    $card = $_POST['card'];
    $exp = $_POST['exp'];
    $email = $_POST['email'];

    if (!preg_match('/^\d{8}-\d{1}$/', $dui)) $errors[] = 'DUI inválido (formato: 12345678-9)';
    if (!preg_match('/^\d{16}$/', $card)) $errors[] = 'Número de tarjeta inválido (16 dígitos)';
    if (!preg_match('/^(0[1-9]|1[0-2])\/\d{2}$/', $exp)) $errors[] = 'Fecha de vencimiento inválida (MM/YY)';
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Email inválido';

    if (empty($errors)) {
        echo "<div class='alert alert-success'>¡Compra realizada con éxito!</div>";
        session_destroy(); 
        header("Location: index.php");
        exit();
    }
}

$total = 0;
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Finalizar Compra</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7" crossorigin="anonymous">
</head>
<body>
    <div class="container mt-5">
        <h1 class="mb-4">Finalizar Compra</h1>
        <div class="row">
            <div class="col-md-7">
                <h4>Información de Pago</h4>
                <?php if (!empty($errors)): ?>
                    <div class="alert alert-danger">
                        <?php foreach ($errors as $error): ?>
                            <p><?= $error ?></p>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
                <form method="post">
                    <div class="mb-3">
                        <label class="form-label">Nombre completo:</label>
                        <input type="text" name="name" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">DUI (formato: 12345678-9):</label>
                        <input type="text" name="dui" class="form-control" pattern="\d{8}-\d{1}" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Número de tarjeta (16 dígitos):</label>
                        <input type="text" name="card" class="form-control" pattern="\d{16}" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Fecha de vencimiento (MM/YY):</label>
                        <input type="text" name="exp" class="form-control" pattern="^(0[1-9]|1[0-2])/\d{2}$" required>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Correo electrónico:</label>
                        <input type="email" name="email" class="form-control" required>
                    </div>
                    <div class="d-flex justify-content-between">
                        <a href="cart.php" class="btn btn-outline-primary">Volver al carrito</a>
                        <button type="submit" class="btn btn-primary">Completar compra</button>
                    </div>
                </form>
            </div>

            <div class="col-md-5">
                <h4>Resumen de la orden</h4>
                <div class="card">
                    <div class="card-body">
                        <?php foreach ($_SESSION['cart'] as $product_id => $quantity): 
                            // Consumir el WebService para obtener datos del producto
                            $url = "http://localhost/desafioPractico2/api/obtener_producto/{$product_id}";
                            $client = curl_init($url);
                            curl_setopt($client, CURLOPT_RETURNTRANSFER, true);
                            $response = curl_exec($client);
                            $product_data = json_decode($response, true);

                            if (json_last_error() !== JSON_ERROR_NONE || empty($product_data) || isset($product_data['error'])) {
                                echo "<p>Error al obtener datos del producto (ID: $product_id).</p>";
                                continue;
                            }

                            $product_total = $product_data['price'] * $quantity;
                            $total += $product_total;
                        ?>
                            <div class="d-flex justify-content-between">
                                <span><?= htmlspecialchars($product_data['name']) ?> (<?= $quantity ?> x $<?= number_format((float)$product_data['price'], 2) ?>)</span>
                                <span>$<?= number_format((float)$product_total, 2) ?></span>
                            </div>
                        <?php endforeach; ?>
                        <hr>
                        <div class="d-flex justify-content-between fw-bold">
                            <span>Total:</span>
                            <span>$<?= number_format((float)$total, 2) ?></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>