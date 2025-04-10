package sv.edu.udb.controller.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import sv.edu.udb.controller.validation.Dui;
import sv.edu.udb.controller.validation.PhoneNumber;

import java.time.LocalDate;

@Getter
@Setter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EmpleadoRequest {
    @NotBlank(message = "El nombre es obligatorio")
    @Dui(message = "Formato de DUI inválido")
    private String nombrePersona;

    @NotBlank(message = "Favor digitar el numero de DUI")
    private String numeroDUI;

    @NotBlank(message = "El usuario es requerido")
    private String usuario;

    @NotBlank(message = "El correo es obligatorio")
    private String correoInstitucional;

    @NotBlank(message = "El teléfono es obligatorio")
    @PhoneNumber(message = "Formato de teléfono inválido", pattern = "^\\d{4}-\\d{4}$")
    private String numeroTelefono;

    @NotNull(message = "La fecha de nacimiento es requerida")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate fechaNacimiento;

}