package sv.edu.udb.service.mapper;

import org.mapstruct.*;
import sv.edu.udb.controller.response.ContratacionResponse;
import sv.edu.udb.domain.Contratacion;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ContratacionMapper {

    @Mapping(target = "idContratacion", source = "id")
    @Mapping(target = "idDepartamento", source = "departamento.id")
    @Mapping(target = "idEmpleado", source = "empleado.id")
    @Mapping(target = "idCargo", source = "cargo.id")
    @Mapping(target = "idTipoContratacion", source = "tipoContratacion.id")
    ContratacionResponse toResponse(Contratacion contratacion);

    List<ContratacionResponse> toResponseList(List<Contratacion> contrataciones);
}
