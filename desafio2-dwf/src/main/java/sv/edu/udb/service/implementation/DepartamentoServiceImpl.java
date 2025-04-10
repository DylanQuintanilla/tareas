package sv.edu.udb.service.implementation;

import jakarta.persistence.EntityNotFoundException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sv.edu.udb.controller.request.DepartamentoRequest;
import sv.edu.udb.controller.response.DepartamentoResponse;
import sv.edu.udb.repository.DepartamentoRepository;
import sv.edu.udb.domain.Departamento;
import sv.edu.udb.service.DepartamentoService;
import sv.edu.udb.service.mapper.DepartamentoMapper;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartamentoServiceImpl implements DepartamentoService {
    @NonNull
    private final DepartamentoRepository departamentoRepository;
    @NonNull
    private final DepartamentoMapper departamentoMapper;

    @Override
    public List<DepartamentoResponse> findAllDepartamentos() {
        return departamentoMapper.toDepartamentoResponseList(departamentoRepository.findAll());
    }

    @Override
    public DepartamentoResponse findDepartamentoById(final Long id) {
        return departamentoMapper.toDepartamentoResponse(
                departamentoRepository.findById(id)
                        .orElseThrow(() -> new EntityNotFoundException("Departamento no encontrado con ID: " + id))
        );
    }

    @Override
    public DepartamentoResponse saveDepartamento(final DepartamentoRequest request) {
        Departamento departamento = departamentoMapper.toDepartamento(request);
        return departamentoMapper.toDepartamentoResponse(departamentoRepository.save(departamento));
    }

    @Override
    public DepartamentoResponse updateDepartamento(final Long id, final DepartamentoRequest request) {
        Departamento departamentoToUpdate = departamentoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Departamento no encontrado con ID: " + id));

        departamentoToUpdate.setNombreDepartamento(request.getNombreDepartamento());
        departamentoToUpdate.setDescripcionDepartamento(request.getDescripcionDepartamento());

        Departamento updatedDepartamento = departamentoRepository.save(departamentoToUpdate);
        return departamentoMapper.toDepartamentoResponse(updatedDepartamento);
    }

    @Override
    public void deleteDepartamento(final Long id) {
        departamentoRepository.deleteById(id);
    }
}
