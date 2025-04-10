package sv.edu.udb.service;

import sv.edu.udb.controller.request.TipoContratacionRequest;
import sv.edu.udb.controller.response.TipoContratacionResponse;
import java.util.List;

public interface TipoContratacionService {
    List<TipoContratacionResponse> findAllTiposContratacion();
    TipoContratacionResponse findTipoContratacionById(final Long id);
    TipoContratacionResponse saveTipoContratacion(final TipoContratacionRequest tipoContratacionRequest);
    TipoContratacionResponse updateTipoContratacion(final Long id, final TipoContratacionRequest tipoContratacionRequest);
    void deleteTipoContratacion(final Long id);
}