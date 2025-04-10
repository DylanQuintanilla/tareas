package sv.edu.udb.service.implementation;

import jakarta.persistence.EntityNotFoundException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sv.edu.udb.controller.request.EmpleadoRequest;
import sv.edu.udb.controller.response.EmpleadoResponse;
import sv.edu.udb.repository.EmpleadoRepository;
import sv.edu.udb.domain.Empleado;
import sv.edu.udb.service.EmpleadoService;
import sv.edu.udb.service.mapper.EmpleadoMapper;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmpleadoServiceImpl implements EmpleadoService {
    @NonNull
    private final EmpleadoRepository empleadoRepository;
    @NonNull
    private final EmpleadoMapper empleadoMapper;

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
    public EmpleadoResponse saveEmpleado(final EmpleadoRequest request) {
        Empleado empleado = empleadoMapper.toEmpleado(request);
        return empleadoMapper.toEmpleadoResponse(empleadoRepository.save(empleado));
    }

    @Override
    public EmpleadoResponse updateEmpleado(final Long id, final EmpleadoRequest request) {
        Empleado empleadoToUpdate = empleadoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Empleado no encontrado con ID: " + id));

        // Actualiza los campos del empleado con los datos del request
        empleadoToUpdate.setNumeroDUI(request.getNumeroDUI());
        empleadoToUpdate.setNombrePersona(request.getNombrePersona());
        empleadoToUpdate.setNumeroDUI(request.getUsuario());
        empleadoToUpdate.setCorreoInstitucional(request.getCorreoInstitucional());
        empleadoToUpdate.setNumeroTelefono(request.getNumeroTelefono());
        empleadoToUpdate.setFechaNacimiento(request.getFechaNacimiento());



        Empleado updatedEmpleado = empleadoRepository.save(empleadoToUpdate);
        return empleadoMapper.toEmpleadoResponse(updatedEmpleado);
    }

    @Override
    public void deleteEmpleado(final Long id) {
        empleadoRepository.deleteById(id);
    }
}
