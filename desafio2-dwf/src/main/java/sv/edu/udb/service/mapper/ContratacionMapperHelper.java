package sv.edu.udb.service.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import sv.edu.udb.controller.request.ContratacionRequest;
import sv.edu.udb.domain.Contratacion;
import sv.edu.udb.repository.CargoRepository;
import sv.edu.udb.repository.DepartamentoRepository;
import sv.edu.udb.repository.EmpleadoRepository;
import sv.edu.udb.repository.TipoContratacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ContratacionMapperHelper {

    @Autowired
    private DepartamentoRepository departamentoRepository;

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @Autowired
    private CargoRepository cargoRepository;

    @Autowired
    private TipoContratacionRepository tipoContratacionRepository;

    public Contratacion toEntity(ContratacionRequest request) {
        Contratacion contratacion = new Contratacion();
        contratacion.setFechaContratacion(request.getFechaContratacion());
        contratacion.setSalario(request.getSalario());
        contratacion.setEstado(request.getEstado());
        contratacion.setDepartamento(departamentoRepository.getReferenceById(request.getIdDepartamento()));
        contratacion.setEmpleado(empleadoRepository.getReferenceById(request.getIdEmpleado()));
        contratacion.setCargo(cargoRepository.getReferenceById(request.getIdCargo()));
        contratacion.setTipoContratacion(tipoContratacionRepository.getReferenceById(request.getIdTipoContratacion()));
        return contratacion;
    }

    public void updateEntityFromRequest(ContratacionRequest request, Contratacion contratacion) {
        if (request.getFechaContratacion() != null) {
            contratacion.setFechaContratacion(request.getFechaContratacion());
        }
        if (request.getSalario() != null) {
            contratacion.setSalario(request.getSalario());
        }
        if (request.getEstado() != null) {
            contratacion.setEstado(request.getEstado());
        }

        contratacion.setDepartamento(departamentoRepository.getReferenceById(request.getIdDepartamento()));
        contratacion.setEmpleado(empleadoRepository.getReferenceById(request.getIdEmpleado()));
        contratacion.setCargo(cargoRepository.getReferenceById(request.getIdCargo()));
        contratacion.setTipoContratacion(tipoContratacionRepository.getReferenceById(request.getIdTipoContratacion()));
    }
}
