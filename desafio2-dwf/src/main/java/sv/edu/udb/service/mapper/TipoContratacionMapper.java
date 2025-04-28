package sv.edu.udb.service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import sv.edu.udb.controller.request.TipoContratacionRequest;
import sv.edu.udb.controller.response.TipoContratacionResponse;
import sv.edu.udb.domain.Tipocontratacion;
import java.util.List;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface TipoContratacionMapper {
    @Mapping(source = "id", target = "idTipoContratacion")
    TipoContratacionResponse toTipoContratacionResponse(Tipocontratacion data);
    List<TipoContratacionResponse> toTipoContratacionResponseList(List<Tipocontratacion> tiposContratacion);
    Tipocontratacion toTipoContratacion(TipoContratacionRequest request);
}
