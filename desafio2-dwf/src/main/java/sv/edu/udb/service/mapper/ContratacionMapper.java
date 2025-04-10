package sv.edu.udb.service.mapper;

import org.mapstruct.Mapper;
import sv.edu.udb.controller.request.ContratacionRequest;
import sv.edu.udb.controller.response.ContratacionResponse;
import sv.edu.udb.domain.*;

import java.util.List;

// ContratacionMapper.java
@Mapper(componentModel = "spring")
public interface ContratacionMapper {
    // Mapeo principal
    ContratacionResponse toContratacionResponse(Contratacion data);
    List<ContratacionResponse> toContratacionResponseList(List<Contratacion> contrataciones);
    Contratacion toContratacion(ContratacionRequest request);

    // Métodos personalizados para mapear entidades a IDs
    default Long empleadoToId(Empleado empleado) {
        return empleado != null ? empleado.getId() : null;
    }

    default Long departamentoToId(Departamento departamento) {
        return departamento != null ? departamento.getId() : null;
    }

    default Long cargoToId(Cargo cargo) {
        return cargo != null ? cargo.getId() : null;
    }

    default Long tipoContratacionToId(Tipocontratacion tipo) {
        return tipo != null ? tipo.getId() : null;
    }
}