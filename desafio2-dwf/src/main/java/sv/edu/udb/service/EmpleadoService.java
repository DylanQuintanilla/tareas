package sv.edu.udb.service;

import sv.edu.udb.controller.request.EmpleadoRequest;
import sv.edu.udb.controller.response.EmpleadoResponse;
import java.util.List;

public interface EmpleadoService {
    List<EmpleadoResponse> findAllEmpleados();
    EmpleadoResponse findEmpleadoById(final Long id);
    EmpleadoResponse saveEmpleado(final EmpleadoRequest empleadoRequest);
    EmpleadoResponse updateEmpleado(final Long id, final EmpleadoRequest empleadoRequest);
    void deleteEmpleado(final Long id);
}