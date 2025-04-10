package sv.edu.udb.service.implementation;

import jakarta.persistence.EntityNotFoundException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sv.edu.udb.controller.request.ContratacionRequest;
import sv.edu.udb.controller.response.ContratacionResponse;
import sv.edu.udb.domain.*;
import sv.edu.udb.repository.*;
import sv.edu.udb.service.ContratacionService;
import sv.edu.udb.service.mapper.ContratacionMapper;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ContratacionServiceImpl implements ContratacionService {
    private final EmpleadoRepository empleadoRepository;
    private final DepartamentoRepository departamentoRepository;
    private final CargoRepository cargoRepository;
    private final TipoContratacionRepository tipoContratacionRepository;
    @NonNull
    private final ContratacionRepository contratacionRepository;
    @NonNull
    private final ContratacionMapper contratacionMapper;

    @Override
    public List<ContratacionResponse> findAllContrataciones() {
        return contratacionMapper.toContratacionResponseList(contratacionRepository.findAll());
    }

    @Override
    public ContratacionResponse findContratacionById(final Long id) {
        return contratacionMapper.toContratacionResponse(
                contratacionRepository.findById(id)
                        .orElseThrow(() -> new EntityNotFoundException("Contratación no encontrada con ID: " + id))
        );
    }


    @Override
    public ContratacionResponse updateContratacion(final Long id, final ContratacionRequest request) {
        // Carga la contratación existente
        Contratacion contratacionToUpdate = contratacionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Contratación no encontrada con ID: " + id));

        // Carga las entidades relacionadas por sus IDs
        Departamento departamento = departamentoRepository.findById(request.getIdDepartamento())
                .orElseThrow(() -> new EntityNotFoundException("Departamento no encontrado"));

        Empleado empleado = empleadoRepository.findById(request.getIdEmpleado())
                .orElseThrow(() -> new EntityNotFoundException("Empleado no encontrado"));

        Cargo cargo = cargoRepository.findById(request.getIdCargo())
                .orElseThrow(() -> new EntityNotFoundException("Cargo no encontrado"));

        Tipocontratacion tipoContratacion = tipoContratacionRepository.findById(request.getIdTipoContratacion())
                .orElseThrow(() -> new EntityNotFoundException("Tipo de contratación no encontrado"));

        // Actualiza los campos
        contratacionToUpdate.setIdDepartamento(departamento);
        contratacionToUpdate.setIdEmpleado(empleado);
        contratacionToUpdate.setIdCargo(cargo);
        contratacionToUpdate.setIdTipoContratacion(tipoContratacion); // Ahora es una entidad

        // Guarda los cambios
        return contratacionMapper.toContratacionResponse(
                contratacionRepository.save(contratacionToUpdate)
        );
    }

    @Override
    public void deleteContratacion(final Long id) {
        contratacionRepository.deleteById(id);
    }

    @Override
    public ContratacionResponse saveContratacion(ContratacionRequest request) {
        // Carga las entidades por ID
        Empleado empleado = empleadoRepository.findById(request.getIdEmpleado())
                .orElseThrow(() -> new EntityNotFoundException("Empleado no encontrado"));

        Departamento departamento = departamentoRepository.findById(request.getIdDepartamento())
                .orElseThrow(() -> new EntityNotFoundException("Departamento no encontrado"));

        Cargo cargo = cargoRepository.findById(request.getIdCargo())
                .orElseThrow(() -> new EntityNotFoundException("Cargo no encontrado"));

        Tipocontratacion tipo = tipoContratacionRepository.findById(request.getIdTipoContratacion())
                .orElseThrow(() -> new EntityNotFoundException("Tipo de contratación no encontrado"));

        // Crea la contratación
        Contratacion contratacion = Contratacion.builder()
                .fechaContratacion(request.getFechaContratacion())
                .salario(request.getSalario())
                .estado(request.getEstado())
                .idEmpleado(empleado)
                .idDepartamento(departamento)
                .idCargo(cargo)
                .idTipoContratacion(tipo)
                .build();

        return contratacionMapper.toContratacionResponse(
                contratacionRepository.save(contratacion)
        );
    }
}