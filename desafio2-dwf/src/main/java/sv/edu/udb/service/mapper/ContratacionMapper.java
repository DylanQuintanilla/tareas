package sv.edu.udb.service.mapper;

import org.mapstruct.Mapper;
import sv.edu.udb.controller.request.ContratacionRequest;
import sv.edu.udb.controller.response.ContratacionResponse;
import sv.edu.udb.domain.Contratacion;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ContratacionMapper {
    ContratacionResponse toContratacionResponse(Contratacion data);
    List<ContratacionResponse> toContratacionResponseList(List<Contratacion> contrataciones);
    Contratacion toContratacion(ContratacionRequest request);
}