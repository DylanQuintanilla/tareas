package sv.edu.udb.controller.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ContratacionRequest {

    @NotNull(message = "El ID del departamento es requerido")
    private Long idDepartamento;

    @NotNull(message = "El ID del empleado es requerido")
    private Long idEmpleado;

    @NotNull(message = "El ID del cargo es requerido")
    private Long idCargo;

    @NotNull(message = "El ID del tipo de contratación es requerido")
    private Long idTipoContratacion;

    @NotNull(message = "La fecha de contratación es requerida")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate fechaContratacion;

    @NotNull(message = "El salario es requerido")
    private BigDecimal salario;

    @NotNull(message = "El estado es requerido")
    private Boolean estado;
}