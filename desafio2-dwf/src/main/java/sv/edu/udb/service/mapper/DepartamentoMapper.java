package sv.edu.udb.service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import sv.edu.udb.controller.request.DepartamentoRequest;
import sv.edu.udb.controller.response.DepartamentoResponse;
import sv.edu.udb.domain.Departamento;
import java.util.List;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface DepartamentoMapper {
    @Mapping(source = "id", target = "idDepartamento")
    DepartamentoResponse toDepartamentoResponse(Departamento data);
    List<DepartamentoResponse> toDepartamentoResponseList(List<Departamento> departamentos);
    Departamento toDepartamento(DepartamentoRequest request);
}
