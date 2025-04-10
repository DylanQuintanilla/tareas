package sv.edu.udb.controller;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import sv.edu.udb.controller.request.EmpleadoRequest;
import sv.edu.udb.controller.response.EmpleadoResponse;
import sv.edu.udb.service.EmpleadoService;

@RestController
@RequestMapping("/empleados")
@RequiredArgsConstructor
public class EmpleadoController {
    private final EmpleadoService empleadoService;

    @GetMapping("/{id}")
    public ResponseEntity<EmpleadoResponse> getEmpleadoById(@PathVariable Long id) {
        EmpleadoResponse empleado = empleadoService.findEmpleadoById(id);
        return ResponseEntity.ok(empleado);
    }

    @GetMapping
    public ResponseEntity<List<EmpleadoResponse>> getAllEmpleados() {
        List<EmpleadoResponse> empleados = empleadoService.findAllEmpleados();
        System.out.println("Empleados encontrados: " + empleados); // Depuración
        return ResponseEntity.ok(empleados);
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