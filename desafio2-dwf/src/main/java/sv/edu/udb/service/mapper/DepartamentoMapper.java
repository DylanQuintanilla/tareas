package sv.edu.udb.service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import sv.edu.udb.controller.request.DepartamentoRequest;
import sv.edu.udb.controller.response.DepartamentoResponse;
import sv.edu.udb.domain.Departamento;
import java.util.List;

@Mapper(componentModel = "spring")
public interface DepartamentoMapper {
    @Mapping(source = "id", target = "idDepartamento") // Mapea el ID de la entidad al campo idDepartamento
    DepartamentoResponse toDepartamentoResponse(Departamento data); // Elimina el mapeo de "contrataciones"
    List<DepartamentoResponse> toDepartamentoResponseList(List<Departamento> departamentos);
    Departamento toDepartamento(DepartamentoRequest request);
}