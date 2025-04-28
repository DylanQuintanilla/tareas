package sv.edu.udb.domain;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;

@Entity
@Table(name = "departamento")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Departamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idDepartamento", nullable = false)
    private Long id;

    @Column(name = "nombreDepartamento", length = 50)
    private String nombreDepartamento;

    @Lob
    @Column(name = "descripcionDepartamento")
    private String descripcionDepartamento;

    @JsonIgnore
    @OneToMany(mappedBy = "departamento", fetch = FetchType.LAZY)
    private List<Contratacion> contrataciones;

}
