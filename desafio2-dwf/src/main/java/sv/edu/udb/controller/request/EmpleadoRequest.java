package sv.edu.udb.controller.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import sv.edu.udb.controller.validation.PhoneNumber;
import sv.edu.udb.controller.validation.Dui;

import java.time.LocalDate;

@Getter
@Setter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true) // Ignora propiedades desconocidas
@JsonInclude(JsonInclude.Include.NON_NULL) // No incluye valores devueltos nulos
public class EmpleadoRequest {
    @NotBlank(message = "El nombre es obligatorio")
    private String nombrePersona;

    @NotBlank(message = "El DUI es requerido")
    @Dui(message = "Formato de DUI inválido. Ejemplo: 06371984-6")
    private String numeroDUI;

    @NotBlank(message = "El usuario es requerido")
    private String usuario;

    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "Formato de correo electrónico inválido")
    private String correoInstitucional;

    @NotBlank(message = "El teléfono es obligatorio")
    @PhoneNumber(message = "Formato de teléfono inválido")
    private String numeroTelefono;

    @NotNull(message = "La fecha de nacimiento es requerida")
    private LocalDate fechaNacimiento;

}