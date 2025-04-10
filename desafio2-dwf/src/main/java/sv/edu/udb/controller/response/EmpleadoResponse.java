package sv.edu.udb.controller.response;

import lombok.*;
import lombok.experimental.FieldNameConstants;

import java.time.LocalDate;

@Getter
@Setter
@Builder(toBuilder = true)
@FieldNameConstants
public class EmpleadoResponse {
    private String nombrePersona;
    private String usuario;
    private String numeroDUI;
    private String numeroTelefono;
    private String correoInstitucional;
    private LocalDate fechaNacimiento;
}