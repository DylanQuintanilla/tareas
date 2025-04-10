package sv.edu.udb.controller.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DepartamentoRequest {
    @NotBlank(message = "El nombre del departamento es obligatorio")
    private String nombreDepartamento;

    @NotBlank(message = "La descripción es obligatoria")
    private String descripcionDepartamento;

}