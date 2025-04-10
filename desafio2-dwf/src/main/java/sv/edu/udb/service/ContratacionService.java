package sv.edu.udb.service;

import sv.edu.udb.controller.request.ContratacionRequest;
import sv.edu.udb.controller.response.ContratacionResponse;
import java.util.List;

public interface ContratacionService {
    List<ContratacionResponse> findAllContrataciones();
    ContratacionResponse findContratacionById(final Long id);
    ContratacionResponse saveContratacion(final ContratacionRequest contratacionRequest);
    ContratacionResponse updateContratacion(final Long id, final ContratacionRequest contratacionRequest);
    void deleteContratacion(final Long id);
}
