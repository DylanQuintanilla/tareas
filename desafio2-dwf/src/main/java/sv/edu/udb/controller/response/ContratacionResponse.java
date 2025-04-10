package sv.edu.udb.controller.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldNameConstants;
import sv.edu.udb.domain.Cargo;
import sv.edu.udb.domain.Departamento;
import sv.edu.udb.domain.Empleado;
import sv.edu.udb.domain.Tipocontratacion;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Builder(toBuilder = true)
@FieldNameConstants
public class ContratacionResponse {
    private Long id;
    private LocalDate fechaContratacion;
    private BigDecimal salario;
    private Boolean estado;

    // Relaciones como IDs
    private Long idEmpleado;
    private Long idDepartamento;
    private Long idCargo;
    private Long idTipoContratacion;
}