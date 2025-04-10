package sv.edu.udb.service.implementation;

import jakarta.persistence.EntityNotFoundException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sv.edu.udb.controller.request.CargoRequest;
import sv.edu.udb.controller.response.CargoResponse;
import sv.edu.udb.repository.CargoRepository;
import sv.edu.udb.domain.Cargo;
import sv.edu.udb.service.CargoService;
import sv.edu.udb.service.mapper.CargoMapper;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CargoServiceImpl implements CargoService {
    @NonNull
    private final CargoRepository cargoRepository;
    @NonNull
    private final CargoMapper cargoMapper;

    @Override
    public List<CargoResponse> findAllCargos() {
        return cargoMapper.toCargoResponseList(cargoRepository.findAll());
    }

    @Override
    public CargoResponse findCargoById(final Long id) {
        return cargoMapper.toCargoResponse(
                cargoRepository.findById(id)
                        .orElseThrow(() -> new EntityNotFoundException("Cargo no encontrado con ID: " + id))
        );
    }

    @Override
    public CargoResponse saveCargo(final CargoRequest request) {
        Cargo cargo = cargoMapper.toCargo(request);
        return cargoMapper.toCargoResponse(cargoRepository.save(cargo));
    }

    @Override
    public CargoResponse updateCargo(final Long id, final CargoRequest request) {
        Cargo cargoToUpdate = cargoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cargo no encontrado con ID: " + id));

        cargoToUpdate.setCargo(request.getCargo());
        cargoToUpdate.setDescripcionCargo(request.getDescripcionCargo());
        cargoToUpdate.setJefatura(request.getJefatura());

        Cargo updatedCargo = cargoRepository.save(cargoToUpdate);
        return cargoMapper.toCargoResponse(updatedCargo);
    }

    @Override
    public void deleteCargo(final Long id) {
        cargoRepository.deleteById(id);
    }
}