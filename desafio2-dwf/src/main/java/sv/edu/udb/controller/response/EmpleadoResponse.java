package sv.edu.udb.controller.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldNameConstants;
import java.time.LocalDate;

@Getter
@Setter
@Builder(toBuilder = true)
@FieldNameConstants
public class EmpleadoResponse {
    private String nombre;
    private String correoInstitucional;
    private String numeroTelefono;
    private LocalDate fechaNacimiento;
    private Long idDepartamento;
    private Long idCargo;
}
