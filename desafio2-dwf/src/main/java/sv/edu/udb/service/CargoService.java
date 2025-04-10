package sv.edu.udb.service;

import sv.edu.udb.controller.request.CargoRequest;
import sv.edu.udb.controller.response.CargoResponse;
import java.util.List;

public interface CargoService {
    List<CargoResponse> findAllCargos();
    CargoResponse findCargoById(final Long id);
    CargoResponse saveCargo(final CargoRequest cargoRequest);
    CargoResponse updateCargo(final Long id, final CargoRequest cargoRequest);
    void deleteCargo(final Long id);
}