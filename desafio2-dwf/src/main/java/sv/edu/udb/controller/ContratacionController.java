package sv.edu.udb.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import sv.edu.udb.controller.request.ContratacionRequest;
import sv.edu.udb.controller.response.ContratacionResponse;
import sv.edu.udb.service.ContratacionService;
import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/contrataciones") // Plural para seguir convención REST
public class ContratacionController {
    private final ContratacionService contratacionService;

    @GetMapping
    public List<ContratacionResponse> findAllContrataciones() {
        return contratacionService.findAll();
    }

    @GetMapping("/{id}")
    public ContratacionResponse getContratacionById(@PathVariable(name = "id") final Long id) {
        return contratacionService.findById(id);
    }

    @PostMapping
    @ResponseStatus(CREATED)
    public ContratacionResponse saveContratacion(@Valid @RequestBody final ContratacionRequest request) {
        return contratacionService.save(request);
    }

    @PutMapping("/{id}")
    public ContratacionResponse updateContratacion(
            @PathVariable(name = "id") final Long id,
            @Valid @RequestBody final ContratacionRequest request) {
        return contratacionService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(NO_CONTENT)
    public void deleteContratacion(@PathVariable(name = "id") final Long id) {
        contratacionService.delete(id);
    }
}