package sv.edu.udb.controller.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
@JsonIgnoreProperties(ignoreUnknown = true) // Ignora propiedades desconocidas
@JsonInclude(JsonInclude.Include.NON_NULL) // No incluye valores nulos
public class CargoRequest {
    @NotBlank // No acepta valores nulos ni vacíos
    private String cargo; // Nombre del cargo (ej.: "Desarrollador")

    @NotBlank // Asegura que la descripción no esté vacía
    private String descripcionCargo; // Descripción del cargo

    @NotNull // Asegura que se especifique si es jefatura
    private Boolean jefatura; // Indica si es un cargo de jefatura (true/false)
}