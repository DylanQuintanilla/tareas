package sv.edu.udb.service.implementation;

import jakarta.persistence.EntityNotFoundException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sv.edu.udb.controller.request.TipoContratacionRequest;
import sv.edu.udb.controller.response.TipoContratacionResponse;
import sv.edu.udb.repository.TipoContratacionRepository;
import sv.edu.udb.domain.Tipocontratacion;
import sv.edu.udb.service.TipoContratacionService;
import sv.edu.udb.service.mapper.TipoContratacionMapper;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TipoContratacionServiceImpl implements TipoContratacionService {
    @NonNull
    private final TipoContratacionRepository tipoContratacionRepository;
    @NonNull
    private final TipoContratacionMapper tipoContratacionMapper;

    @Override
    public List<TipoContratacionResponse> findAllTiposContratacion() {
        return tipoContratacionMapper.toTipoContratacionResponseList(tipoContratacionRepository.findAll());
    }

    @Override
    public TipoContratacionResponse findTipoContratacionById(final Long id) {
        return tipoContratacionMapper.toTipoContratacionResponse(
                tipoContratacionRepository.findById(id)
                        .orElseThrow(() -> new EntityNotFoundException("Tipo de contratación no encontrado con ID: " + id))
        );
    }

    @Override
    public TipoContratacionResponse saveTipoContratacion(final TipoContratacionRequest request) {
        Tipocontratacion tipoContratacion = tipoContratacionMapper.toTipoContratacion(request);
        return tipoContratacionMapper.toTipoContratacionResponse(
                tipoContratacionRepository.save(tipoContratacion)
        );
    }

    @Override
    public TipoContratacionResponse updateTipoContratacion(final Long id, final TipoContratacionRequest request) {
        Tipocontratacion tipoContratacionToUpdate = tipoContratacionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Tipo de contratación no encontrado con ID: " + id));

        tipoContratacionToUpdate.setTipoContratacion(request.getTipoContratacion());

        Tipocontratacion updatedTipo = tipoContratacionRepository.save(tipoContratacionToUpdate);
        return tipoContratacionMapper.toTipoContratacionResponse(updatedTipo);
    }

    @Override
    public void deleteTipoContratacion(final Long id) {
        tipoContratacionRepository.deleteById(id);
    }
}