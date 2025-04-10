package sv.edu.udb.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import sv.edu.udb.controller.request.ContratacionRequest;
import sv.edu.udb.controller.response.ContratacionResponse;
import sv.edu.udb.domain.Contratacion;

import sv.edu.udb.exception.ResourceNotFoundException;
import sv.edu.udb.repository.ContratacionRepository;
import sv.edu.udb.service.ContratacionService;
import sv.edu.udb.service.mapper.ContratacionMapper;

import java.util.List;

@Service
public class ContratacionServiceImpl implements ContratacionService {

    private final ContratacionRepository contratacionRepository;
    private final ContratacionMapper contratacionMapper;

    @Autowired
    public ContratacionServiceImpl(ContratacionRepository contratacionRepository,
                                   ContratacionMapper contratacionMapper) {
        this.contratacionRepository = contratacionRepository;
        this.contratacionMapper = contratacionMapper;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ContratacionResponse> findAll() {
        List<Contratacion> contrataciones = contratacionRepository.findAll();
        return contratacionMapper.toResponseList(contrataciones);
    }

    @Override
    @Transactional(readOnly = true)
    public ContratacionResponse findById(Long id) {
        Contratacion contratacion = contratacionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contratación no encontrada con ID: " + id));
        return contratacionMapper.toResponse(contratacion);
    }

    @Override
    @Transactional
    public ContratacionResponse save(ContratacionRequest request) {
        Contratacion contratacion = contratacionMapper.toEntity(request);
        contratacion = contratacionRepository.save(contratacion);
        return contratacionMapper.toResponse(contratacion);
    }

    @Override
    @Transactional
    public ContratacionResponse update(Long id, ContratacionRequest request) {
        Contratacion contratacion = contratacionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contratación no encontrada con ID: " + id));

        contratacionMapper.updateEntityFromRequest(request, contratacion);
        contratacion = contratacionRepository.save(contratacion);

        return contratacionMapper.toResponse(contratacion);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!contratacionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Contratación no encontrada con ID: " + id);
        }
        contratacionRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsById(Long id) {
        return contratacionRepository.existsById(id);
    }
}