package sv.edu.udb.service.mapper;

import org.mapstruct.Mapper;
import sv.edu.udb.controller.request.EmpleadoRequest;
import sv.edu.udb.controller.response.EmpleadoResponse;
import sv.edu.udb.domain.Empleado;
import java.util.List;

@Mapper(componentModel = "spring")
public interface EmpleadoMapper {
    EmpleadoResponse toEmpleadoResponse(Empleado data);
    List<EmpleadoResponse> toEmpleadoResponseList(List<Empleado> empleados);
    Empleado toEmpleado(EmpleadoRequest request);
}