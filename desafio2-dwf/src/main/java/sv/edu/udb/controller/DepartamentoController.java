package sv.edu.udb.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import sv.edu.udb.controller.request.DepartamentoRequest;
import sv.edu.udb.controller.response.DepartamentoResponse;
import sv.edu.udb.service.DepartamentoService;
import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/departamentos")
public class DepartamentoController {
    private final DepartamentoService departamentoService;

    @GetMapping
    public List<DepartamentoResponse> getAllDepartamentos() {
        return departamentoService.findAllDepartamentos();
    }

    @GetMapping("/{id}")
    public DepartamentoResponse getDepartamentoById(@PathVariable Long id) {
        return departamentoService.findDepartamentoById(id);
    }

    @PostMapping
    @ResponseStatus(CREATED)
    public DepartamentoResponse createDepartamento(@Valid @RequestBody DepartamentoRequest request) {
        return departamentoService.saveDepartamento(request);
    }

    @PutMapping("/{id}")
    public DepartamentoResponse updateDepartamento(@PathVariable Long id, @Valid @RequestBody DepartamentoRequest request) {
        return departamentoService.updateDepartamento(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(NO_CONTENT)
    public void deleteDepartamento(@PathVariable Long id) {
        departamentoService.deleteDepartamento(id);
    }
}