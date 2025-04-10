package sv.edu.udb.service.mapper;

import org.mapstruct.Mapper;
import sv.edu.udb.controller.request.TipoContratacionRequest;
import sv.edu.udb.controller.response.TipoContratacionResponse;
import sv.edu.udb.domain.Tipocontratacion;
import java.util.List;

@Mapper(componentModel = "spring")
public interface TipoContratacionMapper {
    TipoContratacionResponse toTipoContratacionResponse(Tipocontratacion data);
    List<TipoContratacionResponse> toTipoContratacionResponseList(List<Tipocontratacion> tiposContratacion);
    Tipocontratacion toTipoContratacion(TipoContratacionRequest request);
}