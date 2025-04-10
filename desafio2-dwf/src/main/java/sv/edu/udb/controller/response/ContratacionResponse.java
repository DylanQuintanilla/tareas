package sv.edu.udb.controller.response;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldNameConstants;

@Getter
@Setter
@Builder(toBuilder = true)
@FieldNameConstants
public class ContratacionResponse {
    private LocalDate fechaContratacion;
    private BigDecimal salario;
    private Boolean estado;

    // Relaciones como IDs
    private Long idEmpleado;
    private Long idDepartamento;
    private Long idCargo;
    private Long idTipoContratacion;

    @Override
    public String toString() {
        return "ContratacionResponse{" +
                "fechaContratacion=" + fechaContratacion +
                ", salario=" + salario +
                ", estado=" + estado +
                ", idEmpleado=" + idEmpleado +
                ", idDepartamento=" + idDepartamento +
                ", idCargo=" + idCargo +
                ", idTipoContratacion=" + idTipoContratacion +
                '}';
    }
}