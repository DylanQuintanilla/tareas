package sv.edu.udb.service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import sv.edu.udb.controller.request.TipoContratacionRequest;
import sv.edu.udb.controller.response.TipoContratacionResponse;
import sv.edu.udb.domain.Tipocontratacion;
import java.util.List;

@Mapper(componentModel = "spring")
public interface TipoContratacionMapper {
    @Mapping(source = "id", target = "idTipoContratacion") // Mapea el ID de la entidad al campo idTipoContratacion
    TipoContratacionResponse toTipoContratacionResponse(Tipocontratacion data); // Elimina el mapeo de "contrataciones"
    List<TipoContratacionResponse> toTipoContratacionResponseList(List<Tipocontratacion> tiposContratacion);
    Tipocontratacion toTipoContratacion(TipoContratacionRequest request);
}