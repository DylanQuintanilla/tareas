package sv.edu.udb.controller.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldNameConstants;

@Getter
@Setter
@Builder(toBuilder = true)
@FieldNameConstants
public class CargoResponse {
    private Long idCargo; // Agregado para incluir el ID en la respuesta
    private String cargo;
    private String descripcionCargo;
    private Boolean jefatura;
}