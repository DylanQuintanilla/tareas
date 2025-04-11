package sv.edu.udb.controller.response;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldNameConstants;

@Getter
@Setter
@Builder(toBuilder = true)
@FieldNameConstants
public class EmpleadoResponse {
    private Long idEmpleado;
    private String nombrePersona;
    private String usuario;
    private String numeroDUI;
    private String numeroTelefono;
    private String correoInstitucional;
    private LocalDate fechaNacimiento;
}