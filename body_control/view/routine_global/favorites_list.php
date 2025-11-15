<?php
require_once($_SERVER['DOCUMENT_ROOT'] . "/view/body_control/model/RoutineGlobalModel.php");

// Recibir filtros
$imc_category = $_REQUEST['imc_category'] ?? null;
$objective = $_REQUEST['objective'] ?? null;
$status = $_REQUEST['status'] ?? null;

$filters = [
    'imc_category' => $imc_category,
    'objective' => $objective,
    'status' => $status
];

$employee_id = $_SESSION['iu'] ?? '';
$favoritos = getFavoriteRoutines($employee_id, $filters);

if (!empty($favoritos)) {
?>
    <div class="table-responsive">
        <table class="table table-striped table-bordered" id="FavoritesTable">
            <thead>
                <tr>
                    <th scope="col" class="fw-bold text-center">#</th>
                    <th scope="col" class="fw-bold text-center">Título</th>
                    <th scope="col" class="fw-bold text-center">Categorías IMC</th>
                    <th scope="col" class="fw-bold text-center">Objetivo</th>
                    <th scope="col" class="fw-bold text-center">Creador</th>
                    <th scope="col" class="fw-bold text-center">Fecha</th>
                    <th scope="col" class="fw-bold text-center">Estado</th>
                    <th scope="col" class="fw-bold text-center">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($favoritos as $index => $data) { ?>
                    <tr>
                        <td class="text-center"><?= $index + 1 ?></td>
                        <td>
                            <i class="bi bi-star-fill text-warning me-1"></i>
                            <?= htmlspecialchars($data['title']) ?>
                        </td>
                        <td>
                            <?php 
                            $categories = explode(',', $data['imc_category']);
                            foreach ($categories as $category): 
                            ?>
                                <span class="badge bg-info mb-1"><?= htmlspecialchars(trim($category)) ?></span>
                            <?php endforeach; ?>
                        </td>
                        <td><?= htmlspecialchars($data['objective']) ?></td>
                        <td><?= htmlspecialchars($data['creator_name']) ?></td>
                        <td class="text-center"><?= htmlspecialchars(date('d/m/Y', strtotime($data['created_at']))) ?></td>
                        <td class="text-center">
                            <?php
                            $statusClass = $data['status'] === 'Activa' ? 'success' : 'secondary';
                            ?>
                            <span class="badge bg-<?= $statusClass ?>">
                                <?= htmlspecialchars($data['status']) ?>
                            </span>
                        </td>
                        <td class="text-center">
                            <div class="btn-group dropup" role="group">
                                <button type="button" class="btn-siif btn-solid-2 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    Acción <i class='bi bi-wrench-adjustable-circle'></i>
                                </button>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a class="dropdown-item" href="#" onclick="viewPDFGlobal('<?= htmlspecialchars($data['path']) ?>', '<?= htmlspecialchars($data['title']) ?>')">
                                            <i class="bi bi-eye"></i> Ver PDF
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="#" onclick="toggleFavorite(<?= $data['id'] ?>)">
                                            <i class="bi bi-star-fill text-warning"></i> Quitar de Favoritos
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                <?php } ?>
            </tbody>
        </table>
    </div>
    <style>
        #FavoritesTable td {
            white-space: normal !important;
            word-wrap: break-word !important;
            vertical-align: middle !important;
        }
        #FavoritesTable th {
            white-space: nowrap !important;
        }
    </style>
    <script>
        $(document).ready(function() {
            $("#FavoritesTable").DataTable({
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json"
                },
                "order": [[5, 'desc']],
                "columnDefs": [
                    { "width": "5%", "targets": 0 },
                    { "width": "20%", "targets": 1 },
                    { "width": "15%", "targets": 2 },
                    { "width": "15%", "targets": 3 },
                    { "width": "15%", "targets": 4 },
                    { "width": "10%", "targets": 5 },
                    { "width": "10%", "targets": 6 },
                    { "width": "10%", "targets": 7 }
                ],
                "autoWidth": false,
                "responsive": false
            });
        });
    </script>
<?php
} else {
?>
    <div class="custom-card p-3 text-center position-relative">
        <i class="bi bi-star" style="color: #f1c40f; font-size: 50px;"></i>
        <h2 class="fw-bold mt-3">No tienes rutinas favoritas...</h2>
        <p class="text-muted">Agrega rutinas a tus favoritos haciendo clic en el ícono de estrella.</p>
        <button class="btn-siif btn-solid mt-3" onclick="document.getElementById('all-tab').click()">
            <i class="bi bi-arrow-left"></i> Explorar Rutinas
        </button>
    </div>
<?php
}
?>