package sv.edu.udb.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import sv.edu.udb.controller.request.CargoRequest;
import sv.edu.udb.controller.response.CargoResponse;
import sv.edu.udb.service.CargoService;
import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;
import static org.springframework.http.HttpStatus.NO_CONTENT;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/cargos")
public class CargoController {
    private final CargoService cargoService;

    @GetMapping
    public List<CargoResponse> getAllCargos() {
        return cargoService.findAllCargos();
    }

    @GetMapping("/{id}")
    public CargoResponse getCargoById(@PathVariable Long id) {
        return cargoService.findCargoById(id);
    }

    @PostMapping
    @ResponseStatus(CREATED)
    public CargoResponse createCargo(@Valid @RequestBody CargoRequest request) {
        return cargoService.saveCargo(request);
    }

    @PutMapping("/{id}")
    public CargoResponse updateCargo(@PathVariable Long id, @Valid @RequestBody CargoRequest request) {
        return cargoService.updateCargo(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(NO_CONTENT)
    public void deleteCargo(@PathVariable Long id) {
        cargoService.deleteCargo(id);
    }
}