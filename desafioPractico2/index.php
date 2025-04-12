<?php
require 'db.php';

$stmt = $pdo->query("SELECT * FROM categories");
$categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Desafio</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7" crossorigin="anonymous">
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="#">Ecomerce</a>
            <div class="navbar-collapse collapse">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="index.php">Inicio</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="cart.php">🛒 Carrito</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container mt-5">
        <h1 class="mb-4">Nuestros Productos</h1>
        <?php foreach ($categories as $category): ?>
            <h2 class="mt-4"><?=($category['name']) ?></h2>
            <div class="row">
                <?php
                //Aqui se hace la consulta con el api
                $url = "http://localhost/desafioPractico2/api/listar_por_categoria/" . $category['id'];
                $client = curl_init($url);
                curl_setopt($client, CURLOPT_RETURNTRANSFER, true);
                $response = curl_exec($client);
                $products = json_decode($response, true);
                ?>

                <?php foreach ($products as $product): ?>
                    <div class="col-md-4 mb-4">
                        <div class="card h-100">
                            <img src="<?=($product['image_url']) ?>" class="card-img-top" alt="<?= ($product['name']) ?>" style="height: 200px; object-fit: cover;">
                            <div class="card-body">
                                <h5 class="card-title"><?= ($product['name']) ?></h5>
                                <p class="card-text">$<?= number_format((float)$product['price'], 2) ?></p>
                                <p class="card-text">Stock: <?= (int)$product['stock'] ?></p>
                                <form action="add_to_cart.php" method="post">
                                    <input type="hidden" name="product_id" value="<?= (int)$product['id'] ?>">
                                    <input type="number" name="quantity" min="1" max="<?= (int)$product['stock'] ?>" value="1" class="form-control mb-2" style="width: 80px;">
                                    <button type="submit" class="btn btn-primary w-100">Agregar al carrito</button>
                                </form>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endforeach; ?>
    </div>
</body>
</html>