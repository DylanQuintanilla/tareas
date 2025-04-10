package sv.edu.udb.service;

import sv.edu.udb.controller.request.DepartamentoRequest;
import sv.edu.udb.controller.response.DepartamentoResponse;
import java.util.List;

public interface DepartamentoService {
    List<DepartamentoResponse> findAllDepartamentos();
    DepartamentoResponse findDepartamentoById(final Long id);
    DepartamentoResponse saveDepartamento(final DepartamentoRequest departamentoRequest);
    DepartamentoResponse updateDepartamento(final Long id, final DepartamentoRequest departamentoRequest);
    void deleteDepartamento(final Long id);
}