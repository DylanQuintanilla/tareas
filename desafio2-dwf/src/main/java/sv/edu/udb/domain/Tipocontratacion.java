package sv.edu.udb.domain;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "tipocontratacion")
public class Tipocontratacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idTipoContratacion", nullable = false)
    private Integer id;

    @Column(name = "tipoContratacion", length = 100)
    private String tipoContratacion;

}