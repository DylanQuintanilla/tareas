package sv.edu.udb.service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import sv.edu.udb.controller.request.CargoRequest;
import sv.edu.udb.controller.response.CargoResponse;
import sv.edu.udb.domain.Cargo;

import java.util.List;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface CargoMapper {

    @Mapping(source = "id", target = "idCargo")
    CargoResponse toCargoResponse(Cargo data);

    List<CargoResponse> toCargoResponseList(List<Cargo> cargos);

    Cargo toCargo(CargoRequest request);
}
