package sv.edu.udb.service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import sv.edu.udb.controller.request.CargoRequest;
import sv.edu.udb.controller.response.CargoResponse;
import sv.edu.udb.domain.Cargo;
import java.util.List;

@Mapper(componentModel = "spring")
public interface CargoMapper {
    @Mapping(source = "id", target = "idCargo") // Mapea el ID de la entidad al campo idCargo
    CargoResponse toCargoResponse(Cargo data); // Elimina el mapeo de "contrataciones"
    List<CargoResponse> toCargoResponseList(List<Cargo> cargos);
    Cargo toCargo(CargoRequest request);
}