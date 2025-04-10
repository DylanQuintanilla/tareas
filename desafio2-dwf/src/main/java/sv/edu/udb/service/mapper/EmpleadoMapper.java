package sv.edu.udb.service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import sv.edu.udb.controller.request.EmpleadoRequest;
import sv.edu.udb.controller.response.EmpleadoResponse;
import sv.edu.udb.domain.Empleado;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EmpleadoMapper {
    @Mapping(source = "id", target = "idEmpleado") // Mapea el ID de la entidad al campo idEmpleado
    EmpleadoResponse toEmpleadoResponse(Empleado data); // Elimina el mapeo de "contrataciones"
    List<EmpleadoResponse> toEmpleadoResponseList(List<Empleado> empleados);
    Empleado toEmpleado(EmpleadoRequest request);
}