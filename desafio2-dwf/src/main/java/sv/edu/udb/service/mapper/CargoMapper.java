package sv.edu.udb.service.mapper;

import org.mapstruct.Mapper;
import sv.edu.udb.controller.request.CargoRequest;
import sv.edu.udb.controller.response.CargoResponse;
import sv.edu.udb.domain.Cargo;
import java.util.List;

@Mapper(componentModel = "spring")
public interface CargoMapper {
    CargoResponse toCargoResponse(Cargo data);
    List<CargoResponse> toCargoResponseList(List<Cargo> cargos);
    Cargo toCargo(CargoRequest request);
}