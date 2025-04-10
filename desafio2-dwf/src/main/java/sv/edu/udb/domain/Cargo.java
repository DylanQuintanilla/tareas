package sv.edu.udb.domain;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "cargos")
public class Cargo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //Probar con SEQUENCY
    @Column(name = "idCargo", nullable = false)
    private Integer id;

    @Column(name = "cargo", length = 50)
    private String cargo;

    @Lob
    @Column(name = "descripcionCargo")
    private String descripcionCargo;

    @Column(name = "jefatura")
    private Boolean jefatura;

}