package sv.edu.udb.service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import sv.edu.udb.controller.request.EmpleadoRequest;
import sv.edu.udb.controller.response.EmpleadoResponse;
import sv.edu.udb.domain.Empleado;

import java.util.List;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface EmpleadoMapper {
    @Mapping(source = "id", target = "idEmpleado")
    EmpleadoResponse toEmpleadoResponse(Empleado data);
    List<EmpleadoResponse> toEmpleadoResponseList(List<Empleado> empleados);
    Empleado toEmpleado(EmpleadoRequest request);
}
