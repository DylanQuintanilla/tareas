package sv.edu.udb.service.implementation;

import sv.edu.udb.controller.request.CargoRequest;
import sv.edu.udb.controller.response.CargoResponse;
import sv.edu.udb.service.CargoService;

import java.util.List;

public class CargoServiceImpl implements CargoService {
    @Override
    public List<CargoResponse> findAllCargos() {
        return List.of();
    }

    @Override
    public CargoResponse findCargoById(Long id) {
        return null;
    }

    @Override
    public CargoResponse saveCargo(CargoRequest cargoRequest) {
        return null;
    }

    @Override
    public CargoResponse updateCargo(Long id, CargoRequest cargoRequest) {
        return null;
    }

    @Override
    public void deleteCargo(Long id) {

    }
}
