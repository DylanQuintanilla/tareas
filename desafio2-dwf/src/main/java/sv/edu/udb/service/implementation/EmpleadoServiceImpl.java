package sv.edu.udb.service.implementation;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sv.edu.udb.controller.request.EmpleadoRequest;
import sv.edu.udb.controller.response.EmpleadoResponse;
import sv.edu.udb.repository.EmpleadoRepository;
import sv.edu.udb.service.EmpleadoService;
import sv.edu.udb.service.mapper.EmpleadoMapper;
import sv.edu.udb.domain.Empleado;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmpleadoServiceImpl implements EmpleadoService {
    private final EmpleadoRepository empleadoRepository;
    private final EmpleadoMapper empleadoMapper;

    @Override
    public EmpleadoResponse saveEmpleado(final EmpleadoRequest request) {
        // Crea el empleado sin relaciones
        Empleado empleado = Empleado.builder()
                .nombrePersona(request.getNombrePersona())
                .numeroDUI(request.getNumeroDUI())
                .usuario(request.getUsuario())
                .correoInstitucional(request.getCorreoInstitucional())
                .numeroTelefono(request.getNumeroTelefono())
                .fechaNacimiento(request.getFechaNacimiento())
                .build();

        return empleadoMapper.toEmpleadoResponse(
                empleadoRepository.save(empleado)
        );
    }

    @Override
    public EmpleadoResponse updateEmpleado(final Long id, final EmpleadoRequest request) {
        Empleado empleadoToUpdate = empleadoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Empleado no encontrado con ID: " + id));

        // Actualiza los campos
        empleadoToUpdate.setNombrePersona(request.getNombrePersona());
        empleadoToUpdate.setNumeroDUI(request.getNumeroDUI());
        empleadoToUpdate.setUsuario(request.getUsuario());
        empleadoToUpdate.setCorreoInstitucional(request.getCorreoInstitucional());
        empleadoToUpdate.setNumeroTelefono(request.getNumeroTelefono());
        empleadoToUpdate.setFechaNacimiento(request.getFechaNacimiento());

        Empleado updatedEmpleado = empleadoRepository.save(empleadoToUpdate);
        return empleadoMapper.toEmpleadoResponse(updatedEmpleado);
    }

    @Override
    public List<EmpleadoResponse> findAllEmpleados() {
        return empleadoMapper.toEmpleadoResponseList(empleadoRepository.findAll());
    }

    @Override
    public EmpleadoResponse findEmpleadoById(final Long id) {
        return empleadoMapper.toEmpleadoResponse(
                empleadoRepository.findById(id)
                        .orElseThrow(() -> new EntityNotFoundException("Empleado no encontrado con ID: " + id))
        );
    }

    @Override
    public void deleteEmpleado(final Long id) {
        empleadoRepository.deleteById(id);
    }
}