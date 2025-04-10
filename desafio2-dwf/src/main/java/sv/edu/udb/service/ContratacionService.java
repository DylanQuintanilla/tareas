package sv.edu.udb.service;

import sv.edu.udb.controller.request.ContratacionRequest;
import sv.edu.udb.controller.response.ContratacionResponse;

import java.util.List;

public interface ContratacionService {

    List<ContratacionResponse> findAll();

    ContratacionResponse findById(Long id);

    ContratacionResponse save(ContratacionRequest request);

    ContratacionResponse update(Long id, ContratacionRequest request);

    void delete(Long id);

    boolean existsById(Long id);
}
