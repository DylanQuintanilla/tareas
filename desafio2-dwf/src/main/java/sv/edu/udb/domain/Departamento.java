package sv.edu.udb.domain;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "departamento")
public class Departamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idDepartamento", nullable = false)
    private Integer id;

    @Column(name = "nombreDepartamento", length = 50)
    private String nombreDepartamento;

    @Lob
    @Column(name = "descripcionDepartamento")
    private String descripcionDepartamento;

}