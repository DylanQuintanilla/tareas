package sv.edu.udb.service.mapper;

import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;
import sv.edu.udb.controller.request.ContratacionRequest;
import sv.edu.udb.controller.response.ContratacionResponse;
import sv.edu.udb.domain.Contratacion;
import sv.edu.udb.domain.Cargo;
import sv.edu.udb.domain.Departamento;
import sv.edu.udb.domain.Empleado;
import sv.edu.udb.domain.Tipocontratacion;
import sv.edu.udb.repository.CargoRepository;
import sv.edu.udb.repository.DepartamentoRepository;
import sv.edu.udb.repository.EmpleadoRepository;
import sv.edu.udb.repository.TipoContratacionRepository;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class ContratacionMapper {

    @Autowired
    protected DepartamentoRepository departamentoRepository;

    @Autowired
    protected EmpleadoRepository empleadoRepository;

    @Autowired
    protected CargoRepository cargoRepository;

    @Autowired
    protected TipoContratacionRepository tipocontratacionRepository;

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "idDepartamento", expression = "java(findDepartamento(request.getIdDepartamento()))")
    @Mapping(target = "empleado", expression = "java(findEmpleado(request.getIdEmpleado()))")
    @Mapping(target = "idCargo", expression = "java(findCargo(request.getIdCargo()))")
    @Mapping(target = "idTipoContratacion", expression = "java(findTipoContratacion(request.getIdTipoContratacion()))")
    public abstract Contratacion toEntity(ContratacionRequest request);

    @Mapping(target = "idEmpleado", source = "empleado.id")
    @Mapping(target = "idDepartamento", source = "idDepartamento.id")
    @Mapping(target = "idCargo", source = "idCargo.id")
    @Mapping(target = "idTipoContratacion", source = "idTipoContratacion.id")
    public abstract ContratacionResponse toResponse(Contratacion contratacion);

    public abstract List<ContratacionResponse> toResponseList(List<Contratacion> contrataciones);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "idDepartamento", expression = "java(findDepartamento(request.getIdDepartamento()))")
    @Mapping(target = "empleado", expression = "java(findEmpleado(request.getIdEmpleado()))")
    @Mapping(target = "idCargo", expression = "java(findCargo(request.getIdCargo()))")
    @Mapping(target = "idTipoContratacion", expression = "java(findTipoContratacion(request.getIdTipoContratacion()))")
    public abstract void updateEntityFromRequest(ContratacionRequest request, @MappingTarget Contratacion contratacion);

    // Métodos auxiliares para convertir IDs a entidades
    protected Departamento findDepartamento(Long id) {
        return id != null ? departamentoRepository.findById(id).orElse(null) : null;
    }

    protected Empleado findEmpleado(Long id) {
        return id != null ? empleadoRepository.findById(id).orElse(null) : null;
    }

    protected Cargo findCargo(Long id) {
        return id != null ? cargoRepository.findById(id).orElse(null) : null;
    }

    protected Tipocontratacion findTipoContratacion(Long id) {
        return id != null ? tipocontratacionRepository.findById(id).orElse(null) : null;
    }
}