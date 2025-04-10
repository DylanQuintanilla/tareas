package sv.edu.udb.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import sv.edu.udb.controller.request.EmpleadoRequest;
import sv.edu.udb.controller.response.EmpleadoResponse;
import sv.edu.udb.service.EmpleadoService;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/empleados")
public class EmpleadoController {
    private final EmpleadoService empleadoService;

    @GetMapping
    public List<EmpleadoResponse> getAllEmpleados() {
        return empleadoService.findAllEmpleados();
    }

    @GetMapping("/{id}")
    public EmpleadoResponse getEmpleadoById(@PathVariable(name = "id") final Long id) {
        return empleadoService.findEmpleadoById(id);
    }

    @PostMapping
    @ResponseStatus(CREATED)
    public EmpleadoResponse createEmpleado(@Valid @RequestBody final EmpleadoRequest request) {
        return empleadoService.saveEmpleado(request);
    }

    @PutMapping("/{id}")
    public EmpleadoResponse updateEmpleado(
            @PathVariable(name = "id") final Long id,
            @Valid @RequestBody final EmpleadoRequest request) {
        return empleadoService.updateEmpleado(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(NO_CONTENT)
    public void deleteEmpleado(@PathVariable(name = "id") final Long id) {
        empleadoService.deleteEmpleado(id);
    }
}