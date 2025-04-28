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

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public abstract class ContratacionMapper {

    @Autowired protected DepartamentoRepository departamentoRepository;
    @Autowired protected EmpleadoRepository empleadoRepository;
    @Autowired protected CargoRepository cargoRepository;
    @Autowired protected TipoContratacionRepository tipoContratacionRepository;

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "departamento",
            expression = "java(referenceDepartamento(request.getIdDepartamento()))")
    @Mapping(target = "empleado",
            expression = "java(referenceEmpleado(request.getIdEmpleado()))")
    @Mapping(target = "cargo",
            expression = "java(referenceCargo(request.getIdCargo()))")
    @Mapping(target = "tipoContratacion",
            expression = "java(referenceTipoContratacion(request.getIdTipoContratacion()))")
    public abstract Contratacion toEntity(ContratacionRequest request);

    @Mapping(target = "idContratacion", source = "id") // Map the ID field to idContratacion
    @Mapping(target = "idDepartamento", source = "departamento.id")
    @Mapping(target = "idEmpleado", source = "empleado.id")
    @Mapping(target = "idCargo", source = "cargo.id")
    @Mapping(target = "idTipoContratacion", source = "tipoContratacion.id")
    public abstract ContratacionResponse toResponse(Contratacion contratacion);

    public abstract List<ContratacionResponse> toResponseList(List<Contratacion> contrataciones);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "departamento",
            expression = "java(referenceDepartamento(request.getIdDepartamento()))")
    @Mapping(target = "empleado",
            expression = "java(referenceEmpleado(request.getIdEmpleado()))")
    @Mapping(target = "cargo",
            expression = "java(referenceCargo(request.getIdCargo()))")
    @Mapping(target = "tipoContratacion",
            expression = "java(referenceTipoContratacion(request.getIdTipoContratacion()))")
    public abstract void updateEntityFromRequest(
            ContratacionRequest request,
            @MappingTarget Contratacion contratacion
    );

    // proxies sin cargar entidades completas
    protected Departamento referenceDepartamento(Long id) {
        return id != null ? departamentoRepository.getReferenceById(id) : null;
    }
    protected Empleado referenceEmpleado(Long id) {
        return id != null ? empleadoRepository.getReferenceById(id) : null;
    }
    protected Cargo referenceCargo(Long id) {
        return id != null ? cargoRepository.getReferenceById(id) : null;
    }
    protected Tipocontratacion referenceTipoContratacion(Long id) {
        return id != null
                ? tipoContratacionRepository.getReferenceById(id)
                : null;
    }
}

