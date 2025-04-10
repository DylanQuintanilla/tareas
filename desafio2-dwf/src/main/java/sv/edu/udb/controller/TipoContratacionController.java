package sv.edu.udb.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import sv.edu.udb.controller.request.TipoContratacionRequest;
import sv.edu.udb.controller.response.TipoContratacionResponse;
import sv.edu.udb.service.TipoContratacionService;
import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/tipos-contratacion")
public class TipoContratacionController {
    private final TipoContratacionService tipoContratacionService;

    @GetMapping
    public List<TipoContratacionResponse> getAllTiposContratacion() {
        return tipoContratacionService.findAllTiposContratacion();
    }

    @GetMapping("/{id}")
    public TipoContratacionResponse getTipoContratacionById(@PathVariable Long id) {
        return tipoContratacionService.findTipoContratacionById(id);
    }

    @PostMapping
    @ResponseStatus(CREATED)
    public TipoContratacionResponse createTipoContratacion(@Valid @RequestBody TipoContratacionRequest request) {
        return tipoContratacionService.saveTipoContratacion(request);
    }

    @PutMapping("/{id}")
    public TipoContratacionResponse updateTipoContratacion(@PathVariable Long id, @Valid @RequestBody TipoContratacionRequest request) {
        return tipoContratacionService.updateTipoContratacion(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(NO_CONTENT)
    public void deleteTipoContratacion(@PathVariable Long id) {
        tipoContratacionService.deleteTipoContratacion(id);
    }
}