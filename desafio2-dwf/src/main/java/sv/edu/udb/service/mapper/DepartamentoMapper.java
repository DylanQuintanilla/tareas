package sv.edu.udb.service.mapper;

import org.mapstruct.Mapper;
import sv.edu.udb.controller.request.DepartamentoRequest;
import sv.edu.udb.controller.response.DepartamentoResponse;
import sv.edu.udb.domain.Departamento;
import java.util.List;

@Mapper(componentModel = "spring")
public interface DepartamentoMapper {
    DepartamentoResponse toDepartamentoResponse(Departamento data);
    List<DepartamentoResponse> toDepartamentoResponseList(List<Departamento> departamentos);
    Departamento toDepartamento(DepartamentoRequest request);
}