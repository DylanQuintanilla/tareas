<div id="templateModule"></div>


<script>
    $("#templateModule").load("/template/template_module_header.php", {
        title: 'Módulo de Control Corporal',
        subtitle: 'Academias Deportivas'
    });
</script>

<div class="container my-5">
    <h2 class="text-center text-uppercase fw-bold">Rutinas</h2>
    <img src="images/barra-siif.png" class="img-fluid d-block mx-auto mb-5" alt="detail" style="height: 5px;">

    <div class="row">
        <div class="col-md-4 mb-3">
            <div class="card">
                <div class="card-body">
                    <div class="text-center">
                        <i class="bi bi-clipboard"  style="font-size: 5rem; color: #3971FF;"></i>
                    </div>
                    <hr>
                    <a href="?view=routines&module=routinesRequest" style="text-decoration: none;">
                        <button type="button" class="btn-siif btn-solid d-block mx-auto my-2 px-5">
                            Solicitudes de rutina <i class="bi bi-arrow-right-circle"></i> 
                        </button>
                    </a>
                </div>
            </div>
        </div>

        <div class="col-md-4 mb-3">
            <div class="card">
                <div class="card-body">
                    <div class="text-center">
                        <i class="bi bi-clipboard"  style="font-size: 5rem; color: #3971FF;"></i>
                    </div>
                    <hr>
                    <a href="?view=routines&module=routinesGlobal" style="text-decoration: none;">
                        <button type="button" class="btn-siif btn-solid d-block mx-auto my-2 px-5">
                            Rutinas globales <i class="bi bi-arrow-right-circle"></i> 
                        </button>
                    </a>
                </div>
            </div>
        </div>
    </div>

    
</div>
